'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var compat = require('./compat.js');
var lodash = require('lodash');
var Base = require('./Base.js');
var Validator = require('./Validator.js');
var State = require('./State.js');
var Field = require('./Field.js');
var FieldProps = require('./models/FieldProps.js');
var OptionsModel = require('./models/OptionsModel.js');

class Form extends Base.default {
    name;
    path = null;
    extra = {};
    validator;
    debouncedValidation = null;
    constructor(setup = {}, { name = "", options = {}, plugins = {}, bindings = {}, hooks = {}, handlers = {}, extra = {}, } = {}) {
        super();
        compat.makeObservable(this, {
            extra: mobx.observable,
            fields: mobx.observable,
            flatMapValues: mobx.computed,
            error: mobx.computed,
            hasError: mobx.computed,
            isValid: mobx.computed,
            isPristine: mobx.computed,
            isDirty: mobx.computed,
            isDefault: mobx.computed,
            isEmpty: mobx.computed,
            focused: mobx.computed,
            touched: mobx.computed,
            disabled: mobx.computed,
            // init: action,
            invalidate: mobx.action,
            clear: mobx.action,
            reset: mobx.action,
            resetValidation: mobx.action,
        });
        this.name = name;
        this.extra = extra;
        mobx.runInAction(() => (this.$hooks = hooks));
        mobx.runInAction(() => (this.$handlers = handlers));
        globalThis.__MOBX_FORMKIT_DEVTOOLS_HOOK__?.emit?.({ type: "form:new", key: this.name, form: this });
        // load data from initializers methods
        const initial = lodash.each({
            setup,
            options,
            plugins,
            bindings,
        }, (val, key) => typeof this[key] === "function"
            ? lodash.merge(val, this[key].apply(this, [this]))
            : val);
        // setup hooks & handlers from initialization methods
        mobx.runInAction(() => Object.assign(this.$hooks, this.hooks?.apply(this, [this])));
        mobx.runInAction(() => Object.assign(this.$handlers, this.handlers?.apply(this, [this])));
        this.state = new State.default({
            form: this,
            initial: initial.setup,
            options: initial.options,
            bindings: initial.bindings,
        });
        this.validator = new Validator.default({
            form: this,
            plugins: initial.plugins,
        });
        this.initFields(initial.setup);
        this.debouncedValidation = lodash.debounce(this.validate, this.state.options.get(OptionsModel.OptionsEnum.validationDebounceWait), this.state.options.get(OptionsModel.OptionsEnum.validationDebounceOptions));
        // execute validation on form initialization
        this.state.options.get(OptionsModel.OptionsEnum.validateOnInit) &&
            this.validator.validate({
                showErrors: this.state.options.get(OptionsModel.OptionsEnum.showErrorsOnInit),
            });
        this.execHook(FieldProps.FieldPropsEnum.onInit);
        // handle Form onChange Hook
        mobx.autorun(() => this.$changed && this.execHook(FieldProps.FieldPropsEnum.onChange));
    }
    /* ------------------------------------------------------------------ */
    /* COMPUTED */
    get flatMapValues() {
        const data = {};
        this.each(($field) => (data[$field.path] = $field.validatedValue));
        return data;
    }
    get error() {
        return this.validator.error || this.firstError() || null;
    }
    get hasError() {
        return !!this.validator.error || this.check(FieldProps.FieldPropsEnum.hasError, true);
    }
    get isValid() {
        return !this.validator.error && this.check(FieldProps.FieldPropsEnum.isValid, true);
    }
    get isPristine() {
        return this.check(FieldProps.FieldPropsEnum.isPristine, true);
    }
    get isDirty() {
        return this.check(FieldProps.FieldPropsEnum.isDirty, true);
    }
    get isDefault() {
        return this.check(FieldProps.FieldPropsEnum.isDefault, true);
    }
    get isEmpty() {
        return this.check(FieldProps.FieldPropsEnum.isEmpty, true);
    }
    get focused() {
        return this.check(FieldProps.FieldPropsEnum.focused, true);
    }
    get touched() {
        return this.check(FieldProps.FieldPropsEnum.touched, true);
    }
    get disabled() {
        return this.check(FieldProps.FieldPropsEnum.disabled, true);
    }
    makeField(data, FieldClass = Field.default) {
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
    $(key) {
        return super.$(key);
    }
    /**
     * Select a field by path.
     * For typed autocomplete, use `$()` instead, which is typed with `keyof F`.
     */
    select(path, fields = null, isStrict = true) {
        return super.select(path, fields, isStrict);
    }
    values() {
        return super.values();
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
    invalidate(message = null, deep = true) {
        this.debouncedValidation.cancel();
        this.validator.error =
            message ||
                this.state.options.get(OptionsModel.OptionsEnum.defaultGenericError) ||
                null;
        deep &&
            this.each((field) => field.debouncedValidation.cancel());
    }
    showErrors(show = true) {
        this.each((field) => field.showErrors(show));
    }
    resetValidation(deep = true) {
        this.validator.error = null;
        deep && this.each((field) => field.resetValidation(deep));
    }
    /**
      Clear Form Fields
    */
    clear(deep = true, execHook = true) {
        execHook && this.execHook(FieldProps.FieldPropsEnum.onClear);
        this.$touched = false;
        this.$changed = 0;
        deep && this.each((field) => field.clear(deep));
    }
    /**
      Reset Form Fields
    */
    reset(deep = true, execHook = true) {
        execHook && this.execHook(FieldProps.FieldPropsEnum.onReset);
        this.$touched = false;
        this.$changed = 0;
        deep && this.each((field) => field.reset(deep));
    }
}

exports.default = Form;
//# sourceMappingURL=Form.js.map
