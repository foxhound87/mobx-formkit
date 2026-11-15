import {
  action,
  computed,
  observable,
  autorun,
  runInAction,
} from "mobx";
import { makeObservable } from "./compat";
import { debounce, each, merge } from "lodash";

import Base from "./Base";
import Validator from "./Validator";
import State from "./State";
import Field from "./Field";
import ValidatorInterface from "./models/ValidatorInterface";
import { FieldInterface, FieldConstructor } from "./models/FieldInterface";
import {
  FormInterface,
  FieldsDefinitions,
  FormConfig,
  PathsOf,
} from "./models/FormInterface";
import { FieldPropsEnum } from "./models/FieldProps";
import { OptionsEnum } from "./models/OptionsModel";

export default class Form<F extends Record<string, any> = Record<string, any>> extends Base<F> implements FormInterface<F> {
  name: string;
  override path: any = null;
  extra: Record<string, any> = {};
  validator: ValidatorInterface;

  debouncedValidation: any = null;

  constructor(
    setup: FieldsDefinitions = {},
    {
      name = "",
      options = {},
      plugins = {},
      bindings = {},
      hooks = {},
      handlers = {},
      extra = {},
    }: FormConfig = {}
  ) {
    super();
    makeObservable(this, {
      extra: observable,
      fields: observable,
      flatMapValues: computed,
      error: computed,
      hasError: computed,
      isValid: computed,
      isPristine: computed,
      isDirty: computed,
      isDefault: computed,
      isEmpty: computed,
      focused: computed,
      touched: computed,
      disabled: computed,
      // init: action,
      invalidate: action,
      clear: action,
      reset: action,
      resetValidation: action,
    });

    this.name = name;
    this.extra = extra;
    runInAction(() => (this.$hooks = hooks));
    runInAction(() => (this.$handlers = handlers));

    (globalThis as any).__MOBX_FORMKIT_DEVTOOLS_HOOK__?.emit?.({ type: "form:new", key: this.name, form: this });

    // load data from initializers methods
    const initial = each(
      {
        setup,
        options,
        plugins,
        bindings,
      },
      (val, key) =>
        typeof (this as any)[key] === "function"
          ? merge(val, (this as any)[key].apply(this, [this]))
          : val
    );

    // setup hooks & handlers from initialization methods
    runInAction(() =>
      Object.assign(this.$hooks, (this as any).hooks?.apply(this, [this]))
    );
    runInAction(() =>
      Object.assign(this.$handlers, (this as any).handlers?.apply(this, [this]))
    );

    this.state = new State({
      form: this as any,
      initial: initial.setup,
      options: initial.options,
      bindings: initial.bindings,
    });

    this.validator = new Validator({
      form: this as any,
      plugins: initial.plugins,
    });

    this.initFields(initial.setup);

    // the restore reference starts from the reset target of the fields
    this.initCommittedSnapshot();

    this.debouncedValidation = debounce(
      this.validate,
      this.state.options.get(OptionsEnum.validationDebounceWait),
      this.state.options.get(OptionsEnum.validationDebounceOptions)
    );

    // execute validation on form initialization
    this.state.options.get(OptionsEnum.validateOnInit) &&
      this.validator.validate({
        showErrors: this.state.options.get(OptionsEnum.showErrorsOnInit),
      });

    this.execHook(FieldPropsEnum.onInit);

    // handle Form onChange Hook
    autorun(() => this.$changed && this.execHook(FieldPropsEnum.onChange));
  }

  /* ------------------------------------------------------------------ */
  /* COMPUTED */

  get flatMapValues(): Record<string, any> {
    const data: any = {};
    this.each(($field: any) => (data[$field.path] = $field.validatedValue));
    return data;
  }

  get error(): string | null {
    return this.validator.error || this.firstError() || null;
  }

  get hasError(): boolean {
    return !!this.validator.error || this.check(FieldPropsEnum.hasError, true);
  }

  get isValid(): boolean {
    return !this.validator.error && this.check(FieldPropsEnum.isValid, true);
  }

  get isPristine(): boolean {
    return this.check(FieldPropsEnum.isPristine, true);
  }

  get isDirty(): boolean {
    return this.check(FieldPropsEnum.isDirty, true);
  }

  get isDefault(): boolean {
    return this.check(FieldPropsEnum.isDefault, true);
  }

  get isEmpty(): boolean {
    return this.check(FieldPropsEnum.isEmpty, true);
  }

  get focused(): boolean {
    return this.check(FieldPropsEnum.focused, true);
  }

  get touched(): boolean {
    return this.check(FieldPropsEnum.touched, true);
  }

  get disabled(): boolean {
    return this.check(FieldPropsEnum.disabled, true);
  }

  makeField(data: FieldConstructor, FieldClass: typeof Field = Field) {
    return new FieldClass(data);
  }

  /**
   * Select a field by key with type inference.
   * Provides transparent autocomplete for both top-level keys (`keyof F`)
   * AND nested paths (`PathsOf<F>`) without any type annotations needed.
   *
   * @example
   * // Top-level keys — autocomplete from keyof F:
   * form.$('username'); // returns Field<string>
   *
   * @example
   * // Nested paths — autocomplete from PathsOf<F>:
   * form.$('club');                // "club"
   * form.$('club.name');           // "club.name"  ← autocomplete after dot!
   * form.$('members[].firstname'); // "members[].firstname"
   */
  override $(key: keyof F | PathsOf<F>): Field<F[keyof F]> {
    return super.$(key as string) as Field<F[keyof F]>;
  }

  /**
   * Select a field by path.
   * For typed autocomplete, use `$()` instead, which is typed with `keyof F`.
   */
  override select(path: string | number, fields: any = null, isStrict: boolean = true): Field<any> {
    return super.select(path, fields, isStrict) as Field<any>;
  }

  override values(): { [K in keyof F]?: F[K] } {
    return super.values() as { [K in keyof F]?: F[K] };
  }

  /** DEPRECATED
    Init Form Fields and Nested Fields

  init($fields: any = null): void {
    _.set(this, "fields", observable.map({}));

    this.state.initial.props.values = $fields; // eslint-disable-line
    this.state.current.props.values = $fields; // eslint-disable-line

    this.initFields({
      fields: $fields || this.state.struct(),
    });
  }
  */

  invalidate(message: string | null = null, deep: boolean = true): void {
    this.debouncedValidation.cancel();
    this.validator.error =
      message ||
      this.state.options.get(OptionsEnum.defaultGenericError) ||
      null;
    deep &&
      this.each((field: FieldInterface) => field.debouncedValidation.cancel());
  }

  showErrors(show: boolean = true): void {
    this.each((field: FieldInterface) => field.showErrors(show));
  }

  resetValidation(deep: boolean = true): void {
    this.validator.error = null;
    deep && this.each((field: FieldInterface) => field.resetValidation(deep));
  }

  /**
    Clear Form Fields
  */
  clear(deep: boolean = true, execHook: boolean = true): void {
    execHook && this.execHook(FieldPropsEnum.onClear);
    this.$touched = false;
    this.$changed = 0;
    deep && this.each((field: FieldInterface) => field.clear(deep));
  }

  /**
    Reset Form Fields
  */
  reset(deep: boolean = true, execHook: boolean = true): void {
    execHook && this.execHook(FieldPropsEnum.onReset);
    this.$touched = false;
    this.$changed = 0;
    deep && this.each((field: FieldInterface) => field.reset(deep));
  }
}
