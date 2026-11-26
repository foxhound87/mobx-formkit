import {
  observable,
  observe,
  action,
  computed,
  isObservableArray,
  toJS,
  untracked,
  autorun,
  runInAction,
} from "mobx";
import { makeObservable } from "./compat";
import { isEmpty, isEqual, isNil, isPlainObject, debounce, omit } from "lodash";
import Base from "./Base";

import {
  $try,
  hasFiles,
  isBool,
  isEvent,
  pathToStruct,
  isArrayFromStruct,
  getObservableMapValues,
  cloneValues,
} from "./utils";

import { parseInput, parseCheckOutput, defaultValue } from "./parser";

import { OptionsModel, OptionsEnum } from "./models/OptionsModel";
import { FieldInterface, FieldConstructor } from "./models/FieldInterface";
import { FieldPropsEnum } from "./models/FieldProps";

const applyFieldPropFunc = (instance: any, prop: any): any => {
    if (typeof prop !== "function") return prop;
  return prop({
    field: instance,
    form: instance.state.form,
  });
};

const retrieveFieldPropFunc = (prop: any): Function | any | undefined =>
  typeof prop === "function" ? prop : undefined;

const propGetter = (instance: any, prop: FieldPropsEnum): any =>
  typeof instance[`_${prop}`] === "function"
    ? instance[`_${prop}`].apply(instance, [
        {
          form: instance.state.form,
          field: instance,
        },
      ])
    : instance[`$${prop}`];

const setupFieldProps = (instance: any, props: any, data: any) =>
  Object.assign(instance, {
    // retrieve functions
    _label: retrieveFieldPropFunc(props.$label ?? data?.label),
    _placeholder: retrieveFieldPropFunc(
      props.$placeholder ?? data?.placeholder,
    ),
    _disabled: retrieveFieldPropFunc(props.$disabled ?? data?.disabled),
    _rules: retrieveFieldPropFunc(props.$rules ?? data?.rules),
    _related: retrieveFieldPropFunc(props.$related ?? data?.related),
    _deleted: retrieveFieldPropFunc(props.$deleted ?? data?.deleted),
    _validators: retrieveFieldPropFunc(props.$validators ?? data?.validators),
    _validatedWith: retrieveFieldPropFunc(
      props.$validatedWith ?? data?.validatedWith,
    ),
    _bindings: retrieveFieldPropFunc(props.$bindings ?? data?.bindings),
    _extra: retrieveFieldPropFunc(props.$extra ?? data?.extra),
    _options: retrieveFieldPropFunc(props.$options ?? data?.options),
    _autoFocus: retrieveFieldPropFunc(props.$autoFocus ?? data?.autoFocus),
    _inputMode: retrieveFieldPropFunc(props.$inputMode ?? data?.inputMode),
    // apply functions or value
    $label: applyFieldPropFunc(instance, props.$label ?? data?.label ?? ""),
    $placeholder: applyFieldPropFunc(
      instance,
      props.$placeholder ?? data?.placeholder ?? "",
    ),
    $disabled: applyFieldPropFunc(
      instance,
      props.$disabled ?? data?.disabled ?? false,
    ),
    $rules: applyFieldPropFunc(instance, props.$rules ?? data?.rules ?? null),
    $related: applyFieldPropFunc(
      instance,
      props.$related ?? data?.related ?? [],
    ),
    $deleted: applyFieldPropFunc(
      instance,
      props.$deleted ?? data?.deleted ?? false,
    ),
    $validatedWith: applyFieldPropFunc(
      instance,
      props.$validatedWith ?? data?.validatedWith ?? FieldPropsEnum.value,
    ),
    $bindings: applyFieldPropFunc(
      instance,
      props.$bindings ?? data?.bindings ?? FieldPropsEnum.default,
    ),
    $extra: applyFieldPropFunc(instance, props.$extra ?? data?.extra ?? null),
    $options: applyFieldPropFunc(
      instance,
      props.$options ?? data?.options ?? {},
    ),
    $autoFocus: applyFieldPropFunc(
      instance,
      props.$autoFocus ?? data?.autoFocus ?? false,
    ),
    $inputMode: applyFieldPropFunc(
      instance,
      props.$inputMode ?? data?.inputMode ?? undefined,
    ),
    $validators: applyFieldPropFunc(
      instance,
      props.$validators ?? data?.validators ?? null,
    ),
    // other props
    $hooks: props.$hooks ?? data?.hooks ?? {},
    $handlers: props.$handlers ?? data?.handlers ?? {},
    $observers: props.$observers ?? data?.observers ?? null,
    $interceptors: props.$interceptors ?? data?.interceptors ?? null,
    $ref: props.$ref ?? data?.ref ?? undefined,
    $nullable: props.$nullable ?? data?.nullable ?? false,
    $autoComplete: props.$autoComplete ?? data?.autoComplete ?? undefined,
  });

const setupDefaultProp = (
  instance: Field,
  data: any,
  props: any,
  update: boolean,
  {
    isEmptyArray,
    fallbackValueOption,
  }: { isEmptyArray: boolean; fallbackValueOption: any },
) =>
  parseInput((val: any) => val, {
    isEmptyArray,
    type: instance.type,
    unified: update
      ? defaultValue({
          fallbackValueOption,
          type: instance.type,
          value: instance.value,
        })
      : data?.default,
    separated: props.$default,
    fallback: instance.$initial,
  });

export default class Field<T = any> extends Base<Record<string, any>> implements FieldInterface<T> {
  hasInitialNestedFields = false;
  incremental = false;

  id: any;
  key: any;
  name: any;

  $observers: any;
  $interceptors: any;

  $converter = ($: any) => $;
  $input = ($: any) => $;
  $output = ($: any) => $;

  _value!: Function;
  _label!: Function;
  _placeholder!: Function;
  _disabled!: Function;
  _rules!: Function;
  _related!: Function;
  _deleted!: Function;
  _validatedWith!: Function;
  _validators!: Function;
  _bindings!: Function;
  _extra!: Function;
  _options!: Function;
  _autoFocus!: Function;
  _inputMode!: Function;

  $options: OptionsModel | undefined = undefined;
  $value: any = undefined;
  $type: string | undefined = undefined;
  $label: string | undefined = undefined;
  $placeholder: string | undefined = undefined;
  $default: any = undefined;
  $initial: any = undefined;
  $hasDeclaredDefault = false;
  $bindings: any = undefined;
  $extra: any = undefined;
  $related: string[] | undefined = undefined;
  $validatedWith: string | undefined = undefined;
  $validators: any[] | undefined = undefined;
  $rules: string[] | undefined = undefined;

  $disabled: boolean = false;
  $focused: boolean = false;
  $blurred: boolean = false;
  $deleted: boolean = false;
  $autoFocus: boolean = false;
  $inputMode: string | undefined = undefined;
  $ref: any = undefined;
  $nullable: boolean = false;
  $autoComplete: string | undefined = undefined;

  showError: boolean = false;
  errorSync: string | null = null;
  errorAsync: string | null = null;

  validationErrorStack: string[] = [];
  validationFunctionsData: any[] = [];
  validationAsyncData: { valid: boolean; message: string | null } = { valid: true, message: null };
  debouncedValidation: any;

  disposeValidationOnBlur: any;
  disposeValidationOnChange: any;

  files: any = undefined;

  constructor({
    key,
    path,
    struct,
    data = {},
    props = {},
    update = false,
    state,
  }: FieldConstructor) {
    super();

    makeObservable(this, {
      $options: observable,
      $value: observable,
      $type: observable,
      $label: observable,
      $placeholder: observable,
      $default: observable,
      $initial: observable,
      $bindings: observable,
      $extra: observable,
      $related: observable,
      $validatedWith: observable,
      $validators: observable,
      $rules: observable,
      $disabled: observable,
      $focused: observable,
      $blurred: observable,
      $deleted: observable,
      showError: observable,
      errorSync: observable,
      errorAsync: observable,
      validationErrorStack: observable,
      validationFunctionsData: observable,
      validationAsyncData: observable,
      files: observable,
      autoFocus: computed,
      inputMode: computed,
      ref: computed,
      checkValidationErrors: computed,
      checked: computed,
      value: computed,
      initial: computed,
      default: computed,
      actionRunning: computed,
      type: computed,
      label: computed,
      placeholder: computed,
      extra: computed,
      options: computed,
      bindings: computed,
      related: computed,
      disabled: computed,
      rules: computed,
      validators: computed,
      validatedValue: computed,
      error: computed,
      hasError: computed,
      isValid: computed,
      isDefault: computed,
      isDirty: computed,
      isPristine: computed,
      isEmpty: computed,
      blurred: computed,
      touched: computed,
      deleted: computed,
      setupField: action,
      initNestedFields: action,
      invalidate: action,
      setValidationAsyncData: action,
      resetValidation: action,
      clear: action,
      reset: action,
      focus: action,
      blur: action,
      showErrors: action,
      update: action,
    });

    this.state = state;

    this.setupField(key, path, struct, data, props, update);
    // this.checkValidationPlugins();
    this.initNestedFields(data, update);

    // the restore reference starts from the reset target of the fields
    this.initCommittedSnapshot();

    this.incremental = this.hasIncrementalKeys;

    this.debouncedValidation = debounce(
      this.validate,
      this.state.options.get(OptionsEnum.validationDebounceWait, this),
      this.state.options.get(OptionsEnum.validationDebounceOptions, this),
    );

    this.observeValidationOnBlur();
    this.observeValidationOnChange();

    this.initMOBXEvent(FieldPropsEnum.observers);
    this.initMOBXEvent(FieldPropsEnum.interceptors);

    // setup hooks & handlers from initialization methods
    runInAction(() =>
      Object.assign(this.$hooks, (this as any).hooks?.apply(this, [this])),
    );
    runInAction(() =>
      Object.assign(
        this.$handlers,
        (this as any).handlers?.apply(this, [this]),
      ),
    );

    this.execHook(FieldPropsEnum.onInit);

    // handle Field onChange Hook
    autorun(() => this.changed && this.execHook(FieldPropsEnum.onChange));
  }

  /* ------------------------------------------------------------------ */
  /* COMPUTED */

  get checkValidationErrors(): boolean {
    return (
      !this.validationAsyncData.valid ||
      !isEmpty(this.validationErrorStack) ||
      typeof this.errorAsync === 'string' ||
      typeof this.errorSync === 'string'
    );
  }

  set value(newVal: T) {
    let val: any = newVal;
    if (
      typeof val === 'string' &&
      this.state.options.get(OptionsEnum.autoTrimValue, this)
    ) {
      val = val.trim();
    }
    if (this.$value === val) return;
    if (this.handleSetNumberValue(val)) return;
    this.$value = this.$converter(val);
    this.$changed++;
    if (!this.actionRunning) {
      this.state.form.$changed++;
    }
  }

  handleSetNumberValue(newVal: any): boolean | undefined {
    if (!this.state.options.get(OptionsEnum.autoParseNumbers, this))
      return false;

    if (typeof this.$initial === 'number' || this.type == "number") {
      if (
        new RegExp("^-?\\d+(,\\d+)*(\\.\\d+([eE]\\d+)?)?$", "g").exec(newVal)
      ) {
        this.$value = this.$converter(Number(newVal));
        this.$changed++;
        if (!this.actionRunning) {
          this.state.form.$changed++;
        }
        return true;
      }
    }
  }

  get actionRunning(): boolean {
    return this.submitting || this.clearing || this.resetting;
  }

  get checked(): T | undefined {
    return this.type === "checkbox" ? this.value : undefined;
  }

  get value(): T {
    return typeof this._value === "function" && !this.hasNestedFields
      ? propGetter(this, FieldPropsEnum.value)
      : this.getComputedProp(FieldPropsEnum.value);
  }

  get initial(): T {
    return this.$initial
      ? toJS(this.$initial)
      : this.getComputedProp(FieldPropsEnum.initial);
  }

  get default(): T {
    return this.$default
      ? toJS(this.$default)
      : this.getComputedProp(FieldPropsEnum.default);
  }

  set initial(val: T) {
    this.$initial = val;
  }

  set default(val: T) {
    this.$default = val;
    this.$hasDeclaredDefault = true;
  }

  get nullable(): boolean {
    return propGetter(this, FieldPropsEnum.nullable);
  }

  get autoComplete(): string | undefined {
    return propGetter(this, FieldPropsEnum.autoComplete);
  }

  get ref(): any {
    return propGetter(this, FieldPropsEnum.ref);
  }

  get extra(): any {
    return propGetter(this, FieldPropsEnum.extra);
  }

  get autoFocus(): any {
    return propGetter(this, FieldPropsEnum.autoFocus);
  }

  get inputMode(): any {
    return propGetter(this, FieldPropsEnum.inputMode);
  }

  get type(): any {
    return propGetter(this, FieldPropsEnum.type);
  }

  get label(): any {
    return propGetter(this, FieldPropsEnum.label);
  }

  get placeholder(): any {
    return propGetter(this, FieldPropsEnum.placeholder);
  }

  get options(): any {
    return propGetter(this, FieldPropsEnum.options);
  }

  get bindings(): any {
    return propGetter(this, FieldPropsEnum.bindings);
  }

  get related(): any {
    return propGetter(this, FieldPropsEnum.related);
  }

  get disabled(): any {
    return propGetter(this, FieldPropsEnum.disabled);
  }

  get rules(): any {
    return propGetter(this, FieldPropsEnum.rules);
  }

  get validators(): any {
    return propGetter(this, FieldPropsEnum.validators);
  }

  get validatedWith(): any {
    return propGetter(this, FieldPropsEnum.validatedWith);
  }

  get validatedValue(): any {
    return parseCheckOutput(this, this.validatedWith);
  }

  get error(): string | null {
    if (this.showError === false) return null;
    return this.errorAsync || this.errorSync || this.firstError() || null;
  }

  get hasError(): boolean {
    return (
      this.checkValidationErrors || this.check(FieldPropsEnum.hasError, true)
    );
  }

  get isValid(): boolean {
    return (
      !this.checkValidationErrors && this.check(FieldPropsEnum.isValid, true)
    );
  }

  get isDefault(): boolean {
    return !isNil(this.default) && isEqual(this.default, this.value);
  }

  get isDirty(): boolean {
    const value = this.changed ? this.value : this.initial;
    // a soft deleted field differs from its initial state
    return !isEqual(this.initial, value) || this.deleted;
  }

  /**
    The value the field would have after a `reset()`: the `default` when it
    differs from the `initial`, the `initial` otherwise. For a field with
    nested fields it is the tree of the nested values.
   */
  resetTargetValue(): any {
    if (this.hasNestedFields) {
      const $nested: any = {};
      getObservableMapValues(this.fields).forEach((field: any) => {
        $nested[field.key] = field.resetTargetValue();
      });
      return this.hasIncrementalKeys ? Object.values($nested) : $nested;
    }
    return this.useDefaultValue ? this.$default : this.$initial;
  }

  /**
    Whether `reset()` goes to the `default` instead of the `initial`: only a
    declared `default` that differs from the `initial` does
   */
  get useDefaultValue(): boolean {
    return this.$hasDeclaredDefault && !isEqual(toJS(this.$default), toJS(this.$initial));
  }

  /**
    Makes the current value the `initial`, and the reset target unless a
    `default` is declared
   */
  captureInitial(): void {
    this.$initial = cloneValues(toJS(this.value));
    // the same reference, so reset() does not see a default that differs
    if (!this.$hasDeclaredDefault) this.$default = this.$initial;
  }

  override clearInteraction(): void {
    super.clearInteraction();
    this.$blurred = false;
  }

  override captureInitials(): void {
    this.captureInitial();
    super.captureInitials();
  }

  get isPristine(): boolean {
    const value = this.changed ? this.value : this.initial;
    return isEqual(this.initial, value) && !this.deleted;
  }

  get isEmpty(): boolean {
    if (this.hasNestedFields) return this.check(FieldPropsEnum.isEmpty, true);
    if (typeof this.value === 'boolean') return !!this.$value;
    if (typeof this.value === 'number') return false;
    if (this.value instanceof Date) return false;
    if (this.value === null) return false;
    return isEmpty(this.value);
  }

  get focused(): boolean {
    return this.hasNestedFields
      ? this.check(FieldPropsEnum.focused, true)
      : this.$focused;
  }

  get blurred(): boolean {
    return this.hasNestedFields
      ? this.check(FieldPropsEnum.blurred, true)
      : this.$blurred;
  }

  get touched(): boolean {
    return this.hasNestedFields
      ? this.check(FieldPropsEnum.touched, true)
      : this.$touched;
  }

  get deleted(): boolean {
    // an explicit flag on the field itself always wins
    if (this.$deleted) return true;
    return this.hasNestedFields ? this.check(FieldPropsEnum.deleted, true) : false;
  }

  /* ------------------------------------------------------------------ */
  /* EVENTS HANDLERS */

  sync = action((e: any, v: any = null) => {
    const $get = ($: any) =>
      isBool($, this.value) ? $.target.checked : $.target.value;

    // resolve the value to be set
    let $value: any;
    if (isNil(e) || isNil(e.target)) {
      if (!isNil(v) && !isNil(v.target)) {
        v = $get(v); // eslint-disable-line
      }
      $value = $try(e, v);
    } else {
      $value = $get(e);
    }

    // an array set on an array container, or on a field with nested fields,
    // is applied to the nested fields: their values are what the field reads
    if (
      (this.hasNestedFields || this.isArrayContainer(this.path ?? "")) &&
      Array.isArray($value)
    ) {
      (this.state.form as any).applyArrayValue(this, $value);
      return;
    }

    this.value = $value;
  });

  onSync = (...args: any) =>
    this.type === "file"
      ? this.onDrop(...args)
      : this.execHandler(
          FieldPropsEnum.onChange,
          args,
          this.sync,
          FieldPropsEnum.onSync,
        );

  onChange = this.onSync;

  onToggle = (...args: any) =>
    this.execHandler(FieldPropsEnum.onToggle, args, this.sync);

  onBlur = (...args: any) =>
    this.execHandler(
      FieldPropsEnum.onBlur,
      args,
      action(() => {
        this.$focused = false;
        this.$blurred = true;
      }),
    );

  onFocus = (...args: any) =>
    this.execHandler(
      FieldPropsEnum.onFocus,
      args,
      action(() => {
        this.$focused = true;
        this.$touched = true;
      }),
    );

  onDrop = (...args: any) =>
    this.execHandler(
      FieldPropsEnum.onDrop,
      args,
      action(() => {
        const e = args[0];
        let files: unknown[] | null = null;

        if (isEvent(e) && hasFiles(e)) {
          files = Array.from(e.target.files);
        }

        const incoming: unknown[] = files || args;
        const current: unknown[] = this.files || [];
        // dedupe repeated file drops (fixes .vault/FIXES.md row 28)
        const seen = new Set(
          current.map((f: any) =>
            [f?.name, f?.size, f?.lastModified].join("|")
          ),
        );

        this.files = [
          ...current,
          ...incoming.filter((f: any) => {
            if (!f || typeof f.size !== "number") return true;
            const signature = [f.name, f.size, f.lastModified].join("|");
            if (seen.has(signature)) return false;
            seen.add(signature);
            return true;
          }),
        ];
      }),
    );

  onKeyDown = (...args: any) =>
    this.execHandler(FieldPropsEnum.onKeyDown, args);

  onKeyUp = (...args: any) => this.execHandler(FieldPropsEnum.onKeyUp, args);

  setupField(
    $key: string,
    $path: string | undefined | null,
    _$struct: string | undefined | null,
    $data: any,
    $props: any,
    update: boolean,
  ): void {
    this.key = $key;
    this.path = $path;
    this.id = this.state.options.get(OptionsEnum.uniqueId)?.apply(this, [this]);
    const fallbackValueOption: any = this.state.options.get(
      OptionsEnum.fallbackValue,
      this,
    );
    const applyInputConverterOnInit: boolean = this.state.options.get(
      OptionsEnum.applyInputConverterOnInit,
      this,
    );
    const struct: string[] = this.state.struct();
    const structPath: string = pathToStruct(this.path ?? "");
    const isEmptyArray: boolean = isArrayFromStruct(struct, structPath);

    const { $type, $input, $output, $converter, $converters, $computed } =
      $props;

    if (isPlainObject($data)) {
      const { type, input, output, converter, converters, computed } = $data;

      this.name = $data.name ?? String($key);
      this.$type = $type || type || "text";
      this.$converter = $try(
        $converter,
        $converters,
        converter,
        converters,
        this.$converter,
      );
      this.$input = $try($input, input, this.$input);
      this.$output = $try($output, output, this.$output);

      const value = parseInput(
        applyInputConverterOnInit ? this.$input : (val: any) => val,
        {
          fallbackValueOption,
          isEmptyArray,
          type: this.type,
          unified: computed || $data.value,
          separated: $computed || $props.$value,
          fallback: $props.$initial,
        },
      );

      this._value = retrieveFieldPropFunc(value);
      this.$value =
        typeof this._value === "function"
          ? applyFieldPropFunc(this, value)
          : value;

      this.$initial = parseInput((val: any) => val, {
        fallbackValueOption,
        isEmptyArray,
        type: this.type,
        unified: $data.initial,
        separated: $props.$initial,
        fallback: this.$value,
      });

      this.$default = setupDefaultProp(this, $data, $props, update, {
        fallbackValueOption,
        isEmptyArray,
      });
      this.$hasDeclaredDefault =
        $props.$default !== void 0 || (!update && $data?.default !== void 0);

      setupFieldProps(this, $props, $data);
      return;
    }

    /* The field IS the value here */
    this.name = String($key);
    this.$type = $type || "text";
    this.$converter = $try($converter, $converters, this.$converter);
    this.$input = $try($input, this.$input);
    this.$output = $try($output, this.$output);

    const value = parseInput(
      applyInputConverterOnInit ? this.$input : (val: any) => val,
      {
        fallbackValueOption,
        isEmptyArray,
        type: this.type,
        unified: $computed || $data,
        separated: $computed || $props.$value,
      },
    );

    this._value = retrieveFieldPropFunc(value);
    this.$value =
      typeof this._value === "function"
        ? applyFieldPropFunc(this, value)
        : value;

    this.$initial = parseInput((val: any) => val, {
      fallbackValueOption,
      isEmptyArray,
      type: this.type,
      unified: $data,
      separated: $props.$initial,
      fallback: this.$value,
    });

    this.$default = setupDefaultProp(this, $data, $props, update, {
      fallbackValueOption,
      isEmptyArray,
    });
    this.$hasDeclaredDefault = $props.$default !== void 0;

    setupFieldProps(this, $props, $data);
  }

  getComputedProp(key: string): any {
    if (this.incremental || this.hasNestedFields) {
      return key === FieldPropsEnum.value
        ? this.get(key, false)
        : untracked(() => this.get(key, false));
    }

    // @ts-ignore
    const val = this[`$${key}`];

    if (Array.isArray(val) || isObservableArray(val)) {
      return [].slice.call(val);
    }

    return toJS(val);
  }

  // checkValidationPlugins(): void {
  //   const { drivers } = this.state.form.validator;
  //   const form = this.state.form.name ? `${this.state.form.name}/` : "";

  //   if (isNil(drivers.dvr) && !isNil(this.rules)) {
  //     throw new Error(
  //       `The DVR validation rules are defined but no DVR plugin provided. Field: "${
  //         form + this.path
  //       }".`
  //     );
  //   }

  //   if (isNil(drivers.vjf) && !isNil(this.validators)) {
  //     throw new Error(
  //       `The VJF validators functions are defined but no VJF plugin provided. Field: "${
  //         form + this.path
  //       }".`
  //     );
  //   }
  // }

  initNestedFields(field: any, update: boolean): void {
    const fields = isNil(field) ? null : field.fields;

    if (Array.isArray(fields) && !isEmpty(fields)) {
      this.hasInitialNestedFields = true;
    }

    this.initFields({ fields }, update);

    if (!update && Array.isArray(fields) && isEmpty(fields)) {
      if (Array.isArray(this.value) && !isEmpty(this.value)) {
        this.hasInitialNestedFields = true;
        this.initFields({ fields, values: this.value }, update);
      }
    }
  }

  invalidate(
    message: string,
    deep: boolean = true,
    async: boolean = false,
  ): void {
    if (async === true) {
      this.errorAsync = message;
      this.showErrors(true, deep);
      return;
    }

    if (Array.isArray(message)) {
      this.validationErrorStack = message;
      this.showErrors(true, deep);
      return;
    }

    this.validationErrorStack.unshift(message);
    this.showErrors(true, deep);
  }

  setValidationAsyncData(
    valid: boolean = false,
    message: string | null = null,
  ): void {
    this.validationAsyncData = { valid, message };
  }

  resetValidation(deep: boolean = false): void {
    this.showError = false;
    this.errorSync = null;
    this.errorAsync = null;
    this.validationAsyncData = { valid: true, message: null };
    this.validationFunctionsData = [];
    this.validationErrorStack = [];
    Promise.resolve().then(
      action(() => {
        this.$resetting = false;
        this.$clearing = false;
      }),
    );

    deep && this.each((field: FieldInterface) => field.resetValidation(deep));
  }

  clear(deep: boolean = true, execHook: boolean = true): void {
    execHook && this.execHook(FieldPropsEnum.onClear);
    this.$clearing = true;
    this.$touched = false;
    this.$blurred = false;
    this.$changed = 0;
    this.files = undefined;

    this.$value = defaultValue({
      fallbackValueOption: this.state.options.get(OptionsEnum.fallbackValue),
      value: this.$value,
      nullable: this.$nullable,
      type: this.type,
    });

    if (this.isArrayContainer(this.path ?? "") && Array.isArray(this.value)) {
      // an array container is emptied: the nested fields are removed
      getObservableMapValues(this.fields).forEach(($f: any) =>
        this.fields.delete($f.name),
      );
    } else {
      deep && this.each((field: FieldInterface) => field.clear(deep));
    }

    this.state.options.get(OptionsEnum.validateOnClear, this)
      ? this.validate({
          showErrors: this.state.options.get(
            OptionsEnum.showErrorsOnClear,
            this,
          ),
        })
      : this.resetValidation(deep);
  }

  reset(deep: boolean = true, execHook: boolean = true): void {
    execHook && this.execHook(FieldPropsEnum.onReset);
    this.$resetting = true;
    this.$touched = false;
    this.$blurred = false;
    this.$changed = 0;
    this.files = undefined;

    const useDefaultValue = this.useDefaultValue;
    const $target = useDefaultValue ? this.$default : this.$initial;

    // a container declared without values starts from an empty string
    const isEmptyTarget = isNil($target) || $target === "";
    if (
      this.isArrayContainer(this.path ?? "") &&
      (Array.isArray($target) || isEmptyTarget)
    ) {
      // an array container is rebuilt from its reset target: the removed
      // nested fields are restored and the added ones dropped
      const $values = isEmptyTarget ? [] : ($target as any[]);
      const $fields = getObservableMapValues(this.fields);
      const $match =
        $fields.length === $values.length &&
        $fields.every(($f: any, i: number) => isEqual($f.value, $values[i]));
      if (!$match) {
        $fields.forEach(($f: any) => this.fields.delete($f.name));
        $values.forEach((value, index) =>
          this.createField(
            isPlainObject(value) ? value : { [FieldPropsEnum.value]: value },
            String(index),
          ).captureInitials(),
        );
      } else {
        deep && this.each((field: FieldInterface) => field.reset(deep));
      }
    } else {
      if (useDefaultValue) this.value = this.$default;
      if (!useDefaultValue) this.value = this.$initial;

      deep && this.each((field: FieldInterface) => field.reset(deep));
    }

    this.state.options.get(OptionsEnum.validateOnReset, this)
      ? this.validate({
          showErrors: this.state.options.get(
            OptionsEnum.showErrorsOnReset,
            this,
          ),
        })
      : this.resetValidation(deep);
  }

  focus(): void {
    if (this.ref && !this.focused) this.ref.focus();
    this.$focused = true;
    this.$touched = true;
  }

  blur(): void {
    if (this.ref && this.focused) this.ref.blur();
    this.$focused = false;
    this.$blurred = true;
  }

  trim(): void {
    if (typeof this.value !== 'string') return;
    this.$value = this.value.trim();
  }

  showErrors(show: boolean = true, deep: boolean = true): void {
    this.showError = show;
    this.errorSync = this.validationErrorStack.length ? (this.validationErrorStack[0] as string) : null;
    this.errorAsync = !this.validationAsyncData.valid
      ? this.validationAsyncData.message
      : null;
    deep && this.each((field: FieldInterface) => field.showErrors(show, deep));
  }

  observeValidationOnBlur(): void {
    const opt = this.state.options;
    if (opt.get(OptionsEnum.validateOnBlur, this)) {
      this.disposeValidationOnBlur = observe(
        this,
        "$focused",
        (change) =>
          change.newValue === false &&
          this.debouncedValidation({
            showErrors: opt.get(OptionsEnum.showErrorsOnBlur, this),
          }),
      );
    }
  }

  observeValidationOnChange(): void {
    const opt = this.state.options;
    if (opt.get(OptionsEnum.validateOnChange, this)) {
      this.disposeValidationOnChange = observe(
        this,
        "$value",
        () =>
          !this.actionRunning &&
          this.debouncedValidation({
            showErrors: opt.get(OptionsEnum.showErrorsOnChange, this),
          }),
      );
    } else if (
      opt.get(OptionsEnum.validateOnChangeAfterInitialBlur, this) ||
      opt.get(OptionsEnum.validateOnChangeAfterSubmit, this)
    ) {
      this.disposeValidationOnChange = observe(
        this,
        "$value",
        () =>
          !this.actionRunning &&
          ((opt.get(OptionsEnum.validateOnChangeAfterInitialBlur, this) &&
            this.blurred) ||
            (opt.get(OptionsEnum.validateOnChangeAfterSubmit, this) &&
              this.state.form.submitted)) &&
          this.debouncedValidation({
            showErrors: opt.get(OptionsEnum.showErrorsOnChange, this),
          }),
      );
    }
  }

  initMOBXEvent(type: string): void {
    const arr: any[] = (this as any)[`$${type}`];
    if (!Array.isArray(arr)) return;

    let fn: any;
    if (type === FieldPropsEnum.observers) fn = this.observe;
    if (type === FieldPropsEnum.interceptors) fn = this.intercept;
    arr.map((obj: any) => fn(omit(obj, FieldPropsEnum.path)));
  }

  bind(props = {}) {
    return {
      ...this.state.bindings.load(this, this.bindings, props),
      ref: ($ref: any) => (this.$ref = $ref),
    };
  }

  override update(fields: any): this {
    if (!isPlainObject(fields)) {
      throw new Error("The update() method accepts only plain objects.");
    }
    const fallback = this.state.options.get(OptionsEnum.fallback, this);
    const applyInputConverterOnUpdate = this.state.options.get(
      OptionsEnum.applyInputConverterOnUpdate,
      this,
    );
    const x = this.state
      .struct()
      .findIndex((s) =>
        s.startsWith((this.path ?? "").replace(/\.\d+\./, "[].") + "[]"),
      );
    if (!fallback && this.fields.size === 0 && x < 0) {
      this.value = parseInput(
        applyInputConverterOnUpdate ? this.$input : (val: any) => val,
        {
          fallbackValueOption: this.state.options.get(
            OptionsEnum.fallbackValue,
            this,
          ),
          separated: fields,
        },
      );
      return this;
    }
    return super.update(fields);
  }
}
