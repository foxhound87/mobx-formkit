'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var compat = require('./compat.js');
var lodash = require('lodash');
var Base = require('./Base.js');
var utils = require('./utils.js');
var parser = require('./parser.js');
var OptionsModel = require('./models/OptionsModel.js');
var FieldProps = require('./models/FieldProps.js');

const applyFieldPropFunc = (instance, prop) => {
    if (typeof prop !== "function")
        return prop;
    return prop({
        field: instance,
        form: instance.state.form,
    });
};
const retrieveFieldPropFunc = (prop) => typeof prop === "function" ? prop : undefined;
const propGetter = (instance, prop) => typeof instance[`_${prop}`] === "function"
    ? instance[`_${prop}`].apply(instance, [
        {
            form: instance.state.form,
            field: instance,
        },
    ])
    : instance[`$${prop}`];
const setupFieldProps = (instance, props, data) => Object.assign(instance, {
    // retrieve functions
    _label: retrieveFieldPropFunc(props.$label ?? data?.label),
    _placeholder: retrieveFieldPropFunc(props.$placeholder ?? data?.placeholder),
    _disabled: retrieveFieldPropFunc(props.$disabled ?? data?.disabled),
    _rules: retrieveFieldPropFunc(props.$rules ?? data?.rules),
    _related: retrieveFieldPropFunc(props.$related ?? data?.related),
    _deleted: retrieveFieldPropFunc(props.$deleted ?? data?.deleted),
    _validators: retrieveFieldPropFunc(props.$validators ?? data?.validators),
    _validatedWith: retrieveFieldPropFunc(props.$validatedWith ?? data?.validatedWith),
    _bindings: retrieveFieldPropFunc(props.$bindings ?? data?.bindings),
    _extra: retrieveFieldPropFunc(props.$extra ?? data?.extra),
    _options: retrieveFieldPropFunc(props.$options ?? data?.options),
    _autoFocus: retrieveFieldPropFunc(props.$autoFocus ?? data?.autoFocus),
    _inputMode: retrieveFieldPropFunc(props.$inputMode ?? data?.inputMode),
    // apply functions or value
    $label: applyFieldPropFunc(instance, props.$label ?? data?.label ?? ""),
    $placeholder: applyFieldPropFunc(instance, props.$placeholder ?? data?.placeholder ?? ""),
    $disabled: applyFieldPropFunc(instance, props.$disabled ?? data?.disabled ?? false),
    $rules: applyFieldPropFunc(instance, props.$rules ?? data?.rules ?? null),
    $related: applyFieldPropFunc(instance, props.$related ?? data?.related ?? []),
    $deleted: applyFieldPropFunc(instance, props.$deleted ?? data?.deleted ?? false),
    $validatedWith: applyFieldPropFunc(instance, props.$validatedWith ?? data?.validatedWith ?? FieldProps.FieldPropsEnum.value),
    $bindings: applyFieldPropFunc(instance, props.$bindings ?? data?.bindings ?? FieldProps.FieldPropsEnum.default),
    $extra: applyFieldPropFunc(instance, props.$extra ?? data?.extra ?? null),
    $options: applyFieldPropFunc(instance, props.$options ?? data?.options ?? {}),
    $autoFocus: applyFieldPropFunc(instance, props.$autoFocus ?? data?.autoFocus ?? false),
    $inputMode: applyFieldPropFunc(instance, props.$inputMode ?? data?.inputMode ?? undefined),
    $validators: applyFieldPropFunc(instance, props.$validators ?? data?.validators ?? null),
    // other props
    $hooks: props.$hooks ?? data?.hooks ?? {},
    $handlers: props.$handlers ?? data?.handlers ?? {},
    $observers: props.$observers ?? data?.observers ?? null,
    $interceptors: props.$interceptors ?? data?.interceptors ?? null,
    $ref: props.$ref ?? data?.ref ?? undefined,
    $nullable: props.$nullable ?? data?.nullable ?? false,
    $autoComplete: props.$autoComplete ?? data?.autoComplete ?? undefined,
});
const setupDefaultProp = (instance, data, props, update, { isEmptyArray, fallbackValueOption, }) => parser.parseInput((val) => val, {
    isEmptyArray,
    type: instance.type,
    unified: update
        ? parser.defaultValue({
            fallbackValueOption,
            type: instance.type,
            value: instance.value,
        })
        : data?.default,
    separated: props.$default,
    fallback: instance.$initial,
});
class Field extends Base.default {
    hasInitialNestedFields = false;
    incremental = false;
    id;
    key;
    name;
    $observers;
    $interceptors;
    $converter = ($) => $;
    $input = ($) => $;
    $output = ($) => $;
    _value;
    _label;
    _placeholder;
    _disabled;
    _rules;
    _related;
    _deleted;
    _validatedWith;
    _validators;
    _bindings;
    _extra;
    _options;
    _autoFocus;
    _inputMode;
    $options = undefined;
    $value = undefined;
    $type = undefined;
    $label = undefined;
    $placeholder = undefined;
    $default = undefined;
    $initial = undefined;
    $bindings = undefined;
    $extra = undefined;
    $related = undefined;
    $validatedWith = undefined;
    $validators = undefined;
    $rules = undefined;
    $disabled = false;
    $focused = false;
    $blurred = false;
    $deleted = false;
    $autoFocus = false;
    $inputMode = undefined;
    $ref = undefined;
    $nullable = false;
    $autoComplete = undefined;
    showError = false;
    errorSync = null;
    errorAsync = null;
    validationErrorStack = [];
    validationFunctionsData = [];
    validationAsyncData = { valid: true, message: null };
    debouncedValidation;
    disposeValidationOnBlur;
    disposeValidationOnChange;
    files = undefined;
    constructor({ key, path, struct, data = {}, props = {}, update = false, state, }) {
        super();
        compat.makeObservable(this, {
            $options: mobx.observable,
            $value: mobx.observable,
            $type: mobx.observable,
            $label: mobx.observable,
            $placeholder: mobx.observable,
            $default: mobx.observable,
            $initial: mobx.observable,
            $bindings: mobx.observable,
            $extra: mobx.observable,
            $related: mobx.observable,
            $validatedWith: mobx.observable,
            $validators: mobx.observable,
            $rules: mobx.observable,
            $disabled: mobx.observable,
            $focused: mobx.observable,
            $blurred: mobx.observable,
            $deleted: mobx.observable,
            showError: mobx.observable,
            errorSync: mobx.observable,
            errorAsync: mobx.observable,
            validationErrorStack: mobx.observable,
            validationFunctionsData: mobx.observable,
            validationAsyncData: mobx.observable,
            files: mobx.observable,
            autoFocus: mobx.computed,
            inputMode: mobx.computed,
            ref: mobx.computed,
            checkValidationErrors: mobx.computed,
            checked: mobx.computed,
            value: mobx.computed,
            initial: mobx.computed,
            default: mobx.computed,
            actionRunning: mobx.computed,
            type: mobx.computed,
            label: mobx.computed,
            placeholder: mobx.computed,
            extra: mobx.computed,
            options: mobx.computed,
            bindings: mobx.computed,
            related: mobx.computed,
            disabled: mobx.computed,
            rules: mobx.computed,
            validators: mobx.computed,
            validatedValue: mobx.computed,
            error: mobx.computed,
            hasError: mobx.computed,
            isValid: mobx.computed,
            isDefault: mobx.computed,
            isDirty: mobx.computed,
            isPristine: mobx.computed,
            isEmpty: mobx.computed,
            blurred: mobx.computed,
            touched: mobx.computed,
            deleted: mobx.computed,
            setupField: mobx.action,
            initNestedFields: mobx.action,
            invalidate: mobx.action,
            setValidationAsyncData: mobx.action,
            resetValidation: mobx.action,
            clear: mobx.action,
            reset: mobx.action,
            focus: mobx.action,
            blur: mobx.action,
            showErrors: mobx.action,
            update: mobx.action,
        });
        this.state = state;
        this.setupField(key, path, struct, data, props, update);
        // this.checkValidationPlugins();
        this.initNestedFields(data, update);
        this.incremental = this.hasIncrementalKeys;
        this.debouncedValidation = lodash.debounce(this.validate, this.state.options.get(OptionsModel.OptionsEnum.validationDebounceWait, this), this.state.options.get(OptionsModel.OptionsEnum.validationDebounceOptions, this));
        this.observeValidationOnBlur();
        this.observeValidationOnChange();
        this.initMOBXEvent(FieldProps.FieldPropsEnum.observers);
        this.initMOBXEvent(FieldProps.FieldPropsEnum.interceptors);
        // setup hooks & handlers from initialization methods
        mobx.runInAction(() => Object.assign(this.$hooks, this.hooks?.apply(this, [this])));
        mobx.runInAction(() => Object.assign(this.$handlers, this.handlers?.apply(this, [this])));
        this.execHook(FieldProps.FieldPropsEnum.onInit);
        // handle Field onChange Hook
        mobx.autorun(() => this.changed && this.execHook(FieldProps.FieldPropsEnum.onChange));
    }
    /* ------------------------------------------------------------------ */
    /* COMPUTED */
    get checkValidationErrors() {
        return (!this.validationAsyncData.valid ||
            !lodash.isEmpty(this.validationErrorStack) ||
            typeof this.errorAsync === 'string' ||
            typeof this.errorSync === 'string');
    }
    set value(newVal) {
        let val = newVal;
        if (typeof val === 'string' &&
            this.state.options.get(OptionsModel.OptionsEnum.autoTrimValue, this)) {
            val = val.trim();
        }
        if (this.$value === val)
            return;
        if (this.handleSetNumberValue(val))
            return;
        this.$value = this.$converter(val);
        this.$changed++;
        if (!this.actionRunning) {
            this.state.form.$changed++;
        }
    }
    handleSetNumberValue(newVal) {
        if (!this.state.options.get(OptionsModel.OptionsEnum.autoParseNumbers, this))
            return false;
        if (typeof this.$initial === 'number' || this.type == "number") {
            if (new RegExp("^-?\\d+(,\\d+)*(\\.\\d+([eE]\\d+)?)?$", "g").exec(newVal)) {
                this.$value = this.$converter(Number(newVal));
                this.$changed++;
                if (!this.actionRunning) {
                    this.state.form.$changed++;
                }
                return true;
            }
        }
    }
    get actionRunning() {
        return this.submitting || this.clearing || this.resetting;
    }
    get checked() {
        return this.type === "checkbox" ? this.value : undefined;
    }
    get value() {
        return typeof this._value === "function" && !this.hasNestedFields
            ? propGetter(this, FieldProps.FieldPropsEnum.value)
            : this.getComputedProp(FieldProps.FieldPropsEnum.value);
    }
    get initial() {
        return this.$initial
            ? mobx.toJS(this.$initial)
            : this.getComputedProp(FieldProps.FieldPropsEnum.initial);
    }
    get default() {
        return this.$default
            ? mobx.toJS(this.$default)
            : this.getComputedProp(FieldProps.FieldPropsEnum.default);
    }
    set initial(val) {
        this.$initial = val;
    }
    set default(val) {
        this.$default = val;
    }
    get nullable() {
        return propGetter(this, FieldProps.FieldPropsEnum.nullable);
    }
    get autoComplete() {
        return propGetter(this, FieldProps.FieldPropsEnum.autoComplete);
    }
    get ref() {
        return propGetter(this, FieldProps.FieldPropsEnum.ref);
    }
    get extra() {
        return propGetter(this, FieldProps.FieldPropsEnum.extra);
    }
    get autoFocus() {
        return propGetter(this, FieldProps.FieldPropsEnum.autoFocus);
    }
    get inputMode() {
        return propGetter(this, FieldProps.FieldPropsEnum.inputMode);
    }
    get type() {
        return propGetter(this, FieldProps.FieldPropsEnum.type);
    }
    get label() {
        return propGetter(this, FieldProps.FieldPropsEnum.label);
    }
    get placeholder() {
        return propGetter(this, FieldProps.FieldPropsEnum.placeholder);
    }
    get options() {
        return propGetter(this, FieldProps.FieldPropsEnum.options);
    }
    get bindings() {
        return propGetter(this, FieldProps.FieldPropsEnum.bindings);
    }
    get related() {
        return propGetter(this, FieldProps.FieldPropsEnum.related);
    }
    get disabled() {
        return propGetter(this, FieldProps.FieldPropsEnum.disabled);
    }
    get rules() {
        return propGetter(this, FieldProps.FieldPropsEnum.rules);
    }
    get validators() {
        return propGetter(this, FieldProps.FieldPropsEnum.validators);
    }
    get validatedWith() {
        return propGetter(this, FieldProps.FieldPropsEnum.validatedWith);
    }
    get validatedValue() {
        return parser.parseCheckOutput(this, this.validatedWith);
    }
    get error() {
        if (this.showError === false)
            return null;
        return this.errorAsync || this.errorSync || this.firstError() || null;
    }
    get hasError() {
        return (this.checkValidationErrors || this.check(FieldProps.FieldPropsEnum.hasError, true));
    }
    get isValid() {
        return (!this.checkValidationErrors && this.check(FieldProps.FieldPropsEnum.isValid, true));
    }
    get isDefault() {
        return !lodash.isNil(this.default) && lodash.isEqual(this.default, this.value);
    }
    get isDirty() {
        const value = this.changed ? this.value : this.initial;
        // a soft deleted field differs from its initial state
        return !lodash.isEqual(this.initial, value) || this.deleted;
    }
    get isPristine() {
        const value = this.changed ? this.value : this.initial;
        return lodash.isEqual(this.initial, value) && !this.deleted;
    }
    get isEmpty() {
        if (this.hasNestedFields)
            return this.check(FieldProps.FieldPropsEnum.isEmpty, true);
        if (typeof this.value === 'boolean')
            return !!this.$value;
        if (typeof this.value === 'number')
            return false;
        if (this.value instanceof Date)
            return false;
        if (this.value === null)
            return false;
        return lodash.isEmpty(this.value);
    }
    get focused() {
        return this.hasNestedFields
            ? this.check(FieldProps.FieldPropsEnum.focused, true)
            : this.$focused;
    }
    get blurred() {
        return this.hasNestedFields
            ? this.check(FieldProps.FieldPropsEnum.blurred, true)
            : this.$blurred;
    }
    get touched() {
        return this.hasNestedFields
            ? this.check(FieldProps.FieldPropsEnum.touched, true)
            : this.$touched;
    }
    get deleted() {
        // an explicit flag on the field itself always wins
        if (this.$deleted)
            return true;
        return this.hasNestedFields ? this.check(FieldProps.FieldPropsEnum.deleted, true) : false;
    }
    /* ------------------------------------------------------------------ */
    /* EVENTS HANDLERS */
    sync = mobx.action((e, v = null) => {
        const $get = ($) => utils.isBool($, this.value) ? $.target.checked : $.target.value;
        // assume "v" or "e" are the values
        if (lodash.isNil(e) || lodash.isNil(e.target)) {
            if (!lodash.isNil(v) && !lodash.isNil(v.target)) {
                v = $get(v); // eslint-disable-line
            }
            this.value = utils.$try(e, v);
            return;
        }
        if (!lodash.isNil(e.target)) {
            this.value = $get(e);
            return;
        }
        this.value = e;
    });
    onSync = (...args) => this.type === "file"
        ? this.onDrop(...args)
        : this.execHandler(FieldProps.FieldPropsEnum.onChange, args, this.sync, FieldProps.FieldPropsEnum.onSync);
    onChange = this.onSync;
    onToggle = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onToggle, args, this.sync);
    onBlur = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onBlur, args, mobx.action(() => {
        this.$focused = false;
        this.$blurred = true;
    }));
    onFocus = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onFocus, args, mobx.action(() => {
        this.$focused = true;
        this.$touched = true;
    }));
    onDrop = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onDrop, args, mobx.action(() => {
        const e = args[0];
        let files = null;
        if (utils.isEvent(e) && utils.hasFiles(e)) {
            files = Array.from(e.target.files);
        }
        const incoming = files || args;
        const current = this.files || [];
        // dedupe repeated file drops (fixes .vault/FIXES.md row 28)
        const seen = new Set(current.map((f) => [f?.name, f?.size, f?.lastModified].join("|")));
        this.files = [
            ...current,
            ...incoming.filter((f) => {
                if (!f || typeof f.size !== "number")
                    return true;
                const signature = [f.name, f.size, f.lastModified].join("|");
                if (seen.has(signature))
                    return false;
                seen.add(signature);
                return true;
            }),
        ];
    }));
    onKeyDown = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onKeyDown, args);
    onKeyUp = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onKeyUp, args);
    setupField($key, $path, _$struct, $data, $props, update) {
        this.key = $key;
        this.path = $path;
        this.id = this.state.options.get(OptionsModel.OptionsEnum.uniqueId)?.apply(this, [this]);
        const fallbackValueOption = this.state.options.get(OptionsModel.OptionsEnum.fallbackValue, this);
        const applyInputConverterOnInit = this.state.options.get(OptionsModel.OptionsEnum.applyInputConverterOnInit, this);
        const struct = this.state.struct();
        const structPath = utils.pathToStruct(this.path ?? "");
        const isEmptyArray = utils.isArrayFromStruct(struct, structPath);
        const { $type, $input, $output, $converter, $converters, $computed } = $props;
        if (lodash.isPlainObject($data)) {
            const { type, input, output, converter, converters, computed } = $data;
            this.name = $data.name ?? String($key);
            this.$type = $type || type || "text";
            this.$converter = utils.$try($converter, $converters, converter, converters, this.$converter);
            this.$input = utils.$try($input, input, this.$input);
            this.$output = utils.$try($output, output, this.$output);
            const value = parser.parseInput(applyInputConverterOnInit ? this.$input : (val) => val, {
                fallbackValueOption,
                isEmptyArray,
                type: this.type,
                unified: computed || $data.value,
                separated: $computed || $props.$value,
                fallback: $props.$initial,
            });
            this._value = retrieveFieldPropFunc(value);
            this.$value =
                typeof this._value === "function"
                    ? applyFieldPropFunc(this, value)
                    : value;
            this.$initial = parser.parseInput((val) => val, {
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
            setupFieldProps(this, $props, $data);
            return;
        }
        /* The field IS the value here */
        this.name = String($key);
        this.$type = $type || "text";
        this.$converter = utils.$try($converter, $converters, this.$converter);
        this.$input = utils.$try($input, this.$input);
        this.$output = utils.$try($output, this.$output);
        const value = parser.parseInput(applyInputConverterOnInit ? this.$input : (val) => val, {
            fallbackValueOption,
            isEmptyArray,
            type: this.type,
            unified: $computed || $data,
            separated: $computed || $props.$value,
        });
        this._value = retrieveFieldPropFunc(value);
        this.$value =
            typeof this._value === "function"
                ? applyFieldPropFunc(this, value)
                : value;
        this.$initial = parser.parseInput((val) => val, {
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
        setupFieldProps(this, $props, $data);
    }
    getComputedProp(key) {
        if (this.incremental || this.hasNestedFields) {
            return key === FieldProps.FieldPropsEnum.value
                ? this.get(key, false)
                : mobx.untracked(() => this.get(key, false));
        }
        // @ts-ignore
        const val = this[`$${key}`];
        if (Array.isArray(val) || mobx.isObservableArray(val)) {
            return [].slice.call(val);
        }
        return mobx.toJS(val);
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
    initNestedFields(field, update) {
        const fields = lodash.isNil(field) ? null : field.fields;
        if (Array.isArray(fields) && !lodash.isEmpty(fields)) {
            this.hasInitialNestedFields = true;
        }
        this.initFields({ fields }, update);
        if (!update && Array.isArray(fields) && lodash.isEmpty(fields)) {
            if (Array.isArray(this.value) && !lodash.isEmpty(this.value)) {
                this.hasInitialNestedFields = true;
                this.initFields({ fields, values: this.value }, update);
            }
        }
    }
    invalidate(message, deep = true, async = false) {
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
    setValidationAsyncData(valid = false, message = null) {
        this.validationAsyncData = { valid, message };
    }
    resetValidation(deep = false) {
        this.showError = false;
        this.errorSync = null;
        this.errorAsync = null;
        this.validationAsyncData = { valid: true, message: null };
        this.validationFunctionsData = [];
        this.validationErrorStack = [];
        Promise.resolve().then(mobx.action(() => {
            this.$resetting = false;
            this.$clearing = false;
        }));
        deep && this.each((field) => field.resetValidation(deep));
    }
    clear(deep = true, execHook = true) {
        execHook && this.execHook(FieldProps.FieldPropsEnum.onClear);
        this.$clearing = true;
        this.$touched = false;
        this.$blurred = false;
        this.$changed = 0;
        this.files = undefined;
        this.$value = parser.defaultValue({
            fallbackValueOption: this.state.options.get(OptionsModel.OptionsEnum.fallbackValue),
            value: this.$value,
            nullable: this.$nullable,
            type: this.type,
        });
        deep && this.each((field) => field.clear(deep));
        this.state.options.get(OptionsModel.OptionsEnum.validateOnClear, this)
            ? this.validate({
                showErrors: this.state.options.get(OptionsModel.OptionsEnum.showErrorsOnClear, this),
            })
            : this.resetValidation(deep);
    }
    reset(deep = true, execHook = true) {
        execHook && this.execHook(FieldProps.FieldPropsEnum.onReset);
        this.$resetting = true;
        this.$touched = false;
        this.$blurred = false;
        this.$changed = 0;
        this.files = undefined;
        const useDefaultValue = this.$default !== this.$initial;
        if (useDefaultValue)
            this.value = this.$default;
        if (!useDefaultValue)
            this.value = this.$initial;
        deep && this.each((field) => field.reset(deep));
        this.state.options.get(OptionsModel.OptionsEnum.validateOnReset, this)
            ? this.validate({
                showErrors: this.state.options.get(OptionsModel.OptionsEnum.showErrorsOnReset, this),
            })
            : this.resetValidation(deep);
    }
    focus() {
        if (this.ref && !this.focused)
            this.ref.focus();
        this.$focused = true;
        this.$touched = true;
    }
    blur() {
        if (this.ref && this.focused)
            this.ref.blur();
        this.$focused = false;
        this.$blurred = true;
    }
    trim() {
        if (typeof this.value !== 'string')
            return;
        this.$value = this.value.trim();
    }
    showErrors(show = true, deep = true) {
        this.showError = show;
        this.errorSync = this.validationErrorStack.length ? this.validationErrorStack[0] : null;
        this.errorAsync = !this.validationAsyncData.valid
            ? this.validationAsyncData.message
            : null;
        deep && this.each((field) => field.showErrors(show, deep));
    }
    observeValidationOnBlur() {
        const opt = this.state.options;
        if (opt.get(OptionsModel.OptionsEnum.validateOnBlur, this)) {
            this.disposeValidationOnBlur = mobx.observe(this, "$focused", (change) => change.newValue === false &&
                this.debouncedValidation({
                    showErrors: opt.get(OptionsModel.OptionsEnum.showErrorsOnBlur, this),
                }));
        }
    }
    observeValidationOnChange() {
        const opt = this.state.options;
        if (opt.get(OptionsModel.OptionsEnum.validateOnChange, this)) {
            this.disposeValidationOnChange = mobx.observe(this, "$value", () => !this.actionRunning &&
                this.debouncedValidation({
                    showErrors: opt.get(OptionsModel.OptionsEnum.showErrorsOnChange, this),
                }));
        }
        else if (opt.get(OptionsModel.OptionsEnum.validateOnChangeAfterInitialBlur, this) ||
            opt.get(OptionsModel.OptionsEnum.validateOnChangeAfterSubmit, this)) {
            this.disposeValidationOnChange = mobx.observe(this, "$value", () => !this.actionRunning &&
                ((opt.get(OptionsModel.OptionsEnum.validateOnChangeAfterInitialBlur, this) &&
                    this.blurred) ||
                    (opt.get(OptionsModel.OptionsEnum.validateOnChangeAfterSubmit, this) &&
                        this.state.form.submitted)) &&
                this.debouncedValidation({
                    showErrors: opt.get(OptionsModel.OptionsEnum.showErrorsOnChange, this),
                }));
        }
    }
    initMOBXEvent(type) {
        const arr = this[`$${type}`];
        if (!Array.isArray(arr))
            return;
        let fn;
        if (type === FieldProps.FieldPropsEnum.observers)
            fn = this.observe;
        if (type === FieldProps.FieldPropsEnum.interceptors)
            fn = this.intercept;
        arr.map((obj) => fn(lodash.omit(obj, FieldProps.FieldPropsEnum.path)));
    }
    bind(props = {}) {
        return {
            ...this.state.bindings.load(this, this.bindings, props),
            ref: ($ref) => (this.$ref = $ref),
        };
    }
    update(fields) {
        if (!lodash.isPlainObject(fields)) {
            throw new Error("The update() method accepts only plain objects.");
        }
        const fallback = this.state.options.get(OptionsModel.OptionsEnum.fallback, this);
        const applyInputConverterOnUpdate = this.state.options.get(OptionsModel.OptionsEnum.applyInputConverterOnUpdate, this);
        const x = this.state
            .struct()
            .findIndex((s) => s.startsWith((this.path ?? "").replace(/\.\d+\./, "[].") + "[]"));
        if (!fallback && this.fields.size === 0 && x < 0) {
            this.value = parser.parseInput(applyInputConverterOnUpdate ? this.$input : (val) => val, {
                fallbackValueOption: this.state.options.get(OptionsModel.OptionsEnum.fallbackValue, this),
                separated: fields,
            });
            return;
        }
        super.update(fields);
    }
}

exports.default = Field;
//# sourceMappingURL=Field.js.map
