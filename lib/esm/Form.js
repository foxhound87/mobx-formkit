import { runInAction, autorun, action, computed, observable } from 'mobx';
import { makeObservable } from './compat.js';
import { each, merge, debounce } from 'lodash-es';
import Base from './Base.js';
import Validator from './Validator.js';
import State from './State.js';
import Field from './Field.js';
import { FieldPropsEnum } from './models/FieldProps.js';
import { OptionsEnum } from './models/OptionsModel.js';

class Form extends Base {
    name;
    path = null;
    extra = {};
    validator;
    debouncedValidation = null;
    constructor(setup = {}, { name = "", options = {}, plugins = {}, bindings = {}, hooks = {}, handlers = {}, extra = {}, } = {}) {
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
        globalThis.__MOBX_FORMKIT_DEVTOOLS_HOOK__?.emit?.({ type: "form:new", key: this.name, form: this });
        // load data from initializers methods
        const initial = each({
            setup,
            options,
            plugins,
            bindings,
        }, (val, key) => typeof this[key] === "function"
            ? merge(val, this[key].apply(this, [this]))
            : val);
        // setup hooks & handlers from initialization methods
        runInAction(() => Object.assign(this.$hooks, this.hooks?.apply(this, [this])));
        runInAction(() => Object.assign(this.$handlers, this.handlers?.apply(this, [this])));
        this.state = new State({
            form: this,
            initial: initial.setup,
            options: initial.options,
            bindings: initial.bindings,
        });
        this.validator = new Validator({
            form: this,
            plugins: initial.plugins,
        });
        this.initFields(initial.setup);
        this.debouncedValidation = debounce(this.validate, this.state.options.get(OptionsEnum.validationDebounceWait), this.state.options.get(OptionsEnum.validationDebounceOptions));
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
    get flatMapValues() {
        const data = {};
        this.each(($field) => (data[$field.path] = $field.validatedValue));
        return data;
    }
    get error() {
        return this.validator.error || this.firstError() || null;
    }
    get hasError() {
        return !!this.validator.error || this.check(FieldPropsEnum.hasError, true);
    }
    get isValid() {
        return !this.validator.error && this.check(FieldPropsEnum.isValid, true);
    }
    get isPristine() {
        return this.check(FieldPropsEnum.isPristine, true);
    }
    get isDirty() {
        return this.check(FieldPropsEnum.isDirty, true);
    }
    get isDefault() {
        return this.check(FieldPropsEnum.isDefault, true);
    }
    get isEmpty() {
        return this.check(FieldPropsEnum.isEmpty, true);
    }
    get focused() {
        return this.check(FieldPropsEnum.focused, true);
    }
    get touched() {
        return this.check(FieldPropsEnum.touched, true);
    }
    get disabled() {
        return this.check(FieldPropsEnum.disabled, true);
    }
    makeField(data, FieldClass = Field) {
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
                this.state.options.get(OptionsEnum.defaultGenericError) ||
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
        execHook && this.execHook(FieldPropsEnum.onClear);
        this.$touched = false;
        this.$changed = 0;
        deep && this.each((field) => field.clear(deep));
    }
    /**
      Reset Form Fields
    */
    reset(deep = true, execHook = true) {
        execHook && this.execHook(FieldPropsEnum.onReset);
        this.$touched = false;
        this.$changed = 0;
        deep && this.each((field) => field.reset(deep));
    }
}

export { Form as default };
//# sourceMappingURL=Form.js.map
