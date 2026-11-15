'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var compat = require('./compat.js');
var ArrayMap = require('./ArrayMap.js');
var lodash = require('lodash');
var utils = require('./utils.js');
var parser = require('./parser.js');
var FieldProps = require('./models/FieldProps.js');
var OptionsModel = require('./models/OptionsModel.js');
var ValidatorInterface = require('./models/ValidatorInterface.js');
var props = require('./props.js');

class Base {
    noop = () => { };
    state;
    fields = new ArrayMap.ArrayMap();
    path;
    $submitted = 0;
    $submitting = false;
    $validated = 0;
    $validating = false;
    $clearing = false;
    $resetting = false;
    $touched = false;
    $changed = 0;
    $hooks = {};
    $handlers = {};
    constructor() {
        compat.makeObservable(this, {
            $submitted: mobx.observable,
            $submitting: mobx.observable,
            $validated: mobx.observable,
            $validating: mobx.observable,
            $clearing: mobx.observable,
            $resetting: mobx.observable,
            $touched: mobx.observable,
            $changed: mobx.observable,
            $hooks: mobx.observable,
            $handlers: mobx.observable,
            changed: mobx.computed,
            submitted: mobx.computed,
            submitting: mobx.computed,
            validated: mobx.computed,
            validating: mobx.computed,
            clearing: mobx.computed,
            resetting: mobx.computed,
            hasIncrementalKeys: mobx.computed,
            hasNestedFields: mobx.computed,
            size: mobx.computed,
            // initialization
            initField: mobx.action,
            // actions
            submit: mobx.action,
            deepUpdate: mobx.action,
            set: mobx.action,
            add: mobx.action,
            del: mobx.action,
            move: mobx.action,
        });
        // Any reorder of the fields (also when `fields.move()` is called
        // directly) flags the field and the form as changed. (#657)
        this.fields.onMove = () => {
            this.$changed++;
            this.state.form.$changed++;
        };
    }
    execHook = (name, fallback = {}, ...args) => utils.$try(fallback[name], this.$hooks[name], this.noop).apply(this, [this, ...args]);
    execHandler = (name, args, fallback = undefined, hook = null, execHook = true) => [
        utils.$try(this.$handlers[name] && this.$handlers[name].apply(this, [this]), fallback, this.noop).apply(this, [...args]),
        execHook && this.execHook(hook || name, {}, ...args),
    ];
    get resetting() {
        return this.hasNestedFields
            ? this.check(FieldProps.FieldPropsEnum.resetting, true)
            : this.$resetting;
    }
    get clearing() {
        return this.hasNestedFields
            ? this.check(FieldProps.FieldPropsEnum.clearing, true)
            : this.$clearing;
    }
    get submitted() {
        return mobx.toJS(this.$submitted);
    }
    get submitting() {
        return mobx.toJS(this.$submitting);
    }
    get validated() {
        return mobx.toJS(this.$validated);
    }
    get validating() {
        return mobx.toJS(this.$validating);
    }
    get hasIncrementalKeys() {
        return !!this.fields.size && utils.hasIntKeys(this.fields);
    }
    get hasNestedFields() {
        return this.fields.size !== 0;
    }
    get size() {
        return this.fields.size;
    }
    get changed() {
        return this.path != null && this.hasNestedFields
            ? this.reduce((acc, field) => acc + field.changed, 0) + this.$changed
            : this.$changed;
    }
    /**
      Interceptor
    */
    intercept = (opt) => this.MOBXEvent(typeof opt === "function"
        ? { type: "interceptor", call: opt }
        : { type: "interceptor", ...opt });
    /**
      Observer
    */
    observe = (opt) => this.MOBXEvent(typeof opt === "function"
        ? { type: "observer", call: opt }
        : { type: "observer", ...opt });
    /**
      Event Handler: On Clear
    */
    onClear = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onClear, args, (e) => {
        utils.isEvent(e) && e.preventDefault();
        this.clear(true, false);
    });
    /**
      Event Handler: On Reset
    */
    onReset = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onReset, args, (e) => {
        utils.isEvent(e) && e.preventDefault();
        this.reset(true, false);
    });
    /**
      Event Handler: On Submit
     */
    onSubmit = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onSubmit, args, (e, o = {}) => {
        utils.isEvent(e) && e.preventDefault();
        this.submit(o);
    }, null, false);
    /**
      Event Handler: On Add
    */
    onAdd = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onAdd, args, (e, val) => {
        utils.isEvent(e) && e.preventDefault();
        this.add(utils.isEvent(val) ? null : val, false);
    });
    /**
      Event Handler: On Del
    */
    onDel = (...args) => this.execHandler(FieldProps.FieldPropsEnum.onDel, args, (e, path) => {
        utils.isEvent(e) && e.preventDefault();
        this.del(utils.isEvent(path) ? this.path : path, false);
    });
    /******************************************************************
      Initializer
    */
    initFields(initial, update = false) {
        const fallback = this.state.options.get(OptionsModel.OptionsEnum.fallback);
        const $path = (key) => [this.path, key].join(".").replace(/^\.+/, "");
        let fields;
        fields = parser.prepareFieldsData(initial, this.state.strict, fallback);
        fields = parser.mergeSchemaDefaults(fields, this.validator);
        // create fields
        lodash.forIn(fields, (field, key) => {
            const path = $path(key);
            const $f = this.select(path, null, false);
            if ($f == null) {
                if (fallback) {
                    this.initField(key, path, field, update);
                }
                else {
                    const structPath = utils.pathToStruct(path);
                    const struct = this.state.struct();
                    const found = struct
                        .filter((s) => s.startsWith(structPath))
                        .find((s) => s.charAt(structPath.length) === "." ||
                        s.substring(structPath.length, structPath.length + 2) ===
                            "[]" ||
                        s === structPath);
                    if (found)
                        this.initField(key, path, field, update);
                }
            }
        });
    }
    initField(key, path, data, update = false) {
        const initial = this.state.get("current", "props");
        const struct = utils.pathToStruct(path);
        // try to get props from separated objects
        const _try = (prop) => {
            const t = lodash.get(initial[prop], struct);
            if ([
                FieldProps.FieldPropsEnum.input,
                FieldProps.FieldPropsEnum.output,
                FieldProps.FieldPropsEnum.converter,
            ].includes(prop) &&
                typeof t !== "function")
                return undefined;
            return t;
        };
        const props = {
            $value: lodash.get(initial[FieldProps.SeparatedPropsMode.values], path),
            $computed: _try(FieldProps.SeparatedPropsMode.computed),
            $label: _try(FieldProps.SeparatedPropsMode.labels),
            $placeholder: _try(FieldProps.SeparatedPropsMode.placeholders),
            $default: _try(FieldProps.SeparatedPropsMode.defaults),
            $initial: _try(FieldProps.SeparatedPropsMode.initials),
            $disabled: _try(FieldProps.SeparatedPropsMode.disabled),
            $deleted: _try(FieldProps.SeparatedPropsMode.deleted),
            $type: _try(FieldProps.SeparatedPropsMode.types),
            $related: _try(FieldProps.SeparatedPropsMode.related),
            $rules: _try(FieldProps.SeparatedPropsMode.rules),
            $options: _try(FieldProps.SeparatedPropsMode.options),
            $bindings: _try(FieldProps.SeparatedPropsMode.bindings),
            $extra: _try(FieldProps.SeparatedPropsMode.extra),
            $hooks: _try(FieldProps.SeparatedPropsMode.hooks),
            $handlers: _try(FieldProps.SeparatedPropsMode.handlers),
            $validatedWith: _try(FieldProps.SeparatedPropsMode.validatedWith),
            $validators: _try(FieldProps.SeparatedPropsMode.validators),
            $observers: _try(FieldProps.SeparatedPropsMode.observers),
            $interceptors: _try(FieldProps.SeparatedPropsMode.interceptors),
            $converters: _try(FieldProps.SeparatedPropsMode.converters),
            $input: _try(FieldProps.SeparatedPropsMode.input),
            $output: _try(FieldProps.SeparatedPropsMode.output),
            $autoFocus: _try(FieldProps.SeparatedPropsMode.autoFocus),
            $ref: _try(FieldProps.SeparatedPropsMode.refs),
            $nullable: _try(FieldProps.SeparatedPropsMode.nullable),
            $autoComplete: _try(FieldProps.SeparatedPropsMode.autoComplete),
        };
        const field = this.state.form.makeField({
            key,
            path,
            struct,
            data,
            props,
            update,
            state: this.state,
        }, (data && data[FieldProps.FieldPropsEnum.class]) || _try(FieldProps.SeparatedPropsMode.classes));
        this.fields.merge({ [key]: field });
        return field;
    }
    /******************************************************************
      Actions
    */
    validate(opt, obj) {
        const $opt = lodash.merge({}, opt, { path: this.path });
        return this.state.form.validator.validate($opt, obj);
    }
    /**
      Submit
    */
    submit(hooks = {}, { execOnSubmitHook = true, execValidationHooks = true, validate = true, } = {}) {
        const execOnSubmit = () => this.execHook(FieldProps.FieldPropsEnum.onSubmit, hooks);
        const submit = execOnSubmitHook ? execOnSubmit() : undefined;
        this.$submitting = true;
        this.$submitted += 1;
        if (!validate ||
            !this.state.options.get(OptionsModel.OptionsEnum.validateOnSubmit, this)) {
            return Promise.resolve(submit)
                .then(mobx.action(() => (this.$submitting = false)))
                .catch(mobx.action((err) => {
                this.$submitting = false;
                throw err;
            }))
                .then(() => this);
        }
        const exec = (isValid) => isValid
            ? this.execHook(ValidatorInterface.ValidationHooks.onSuccess, hooks)
            : this.execHook(ValidatorInterface.ValidationHooks.onError, hooks);
        return this.validate({
            showErrors: this.state.options.get(OptionsModel.OptionsEnum.showErrorsOnSubmit, this),
        })
            .then(({ isValid }) => {
            const handler = execValidationHooks ? exec(isValid) : undefined;
            if (isValid)
                return Promise.all([submit, handler]);
            const $err = this.state.options.get(OptionsModel.OptionsEnum.defaultGenericError, this);
            const $throw = this.state.options.get(OptionsModel.OptionsEnum.submitThrowsError, this);
            if ($throw && $err)
                this.invalidate();
            return Promise.all([submit, handler]);
        })
            .then(mobx.action(() => (this.$submitting = false)))
            .catch(mobx.action((err) => {
            this.$submitting = false;
            throw err;
        }))
            .then(() => this);
    }
    /**
      Check Field Computed Values
     */
    check(prop, deep = false) {
        utils.allowedProps(FieldProps.AllowedFieldPropsTypes.computed, [prop]);
        return deep
            ? utils.checkPropOccurrence({
                type: props.props.occurrences[prop],
                data: this.deepCheck(props.props.occurrences[prop], prop, this.fields),
            })
            : this[prop];
    }
    deepCheck(type, prop, fields) {
        const $fields = utils.getObservableMapValues(fields);
        return lodash.transform($fields, (check, field) => {
            // Array containers are skipped because most of their props are
            // computed recursively on their nested fields. Some props are not
            // recursive (isDirty/isPristine compare the container value with
            // its initial value) or must aggregate the container itself
            // (isValid/hasError), so they are taken into account for array
            // containers too. (#656, #657)
            const isContainerProp = [
                FieldProps.FieldPropsEnum.isValid,
                FieldProps.FieldPropsEnum.hasError,
                FieldProps.FieldPropsEnum.isDirty,
                FieldProps.FieldPropsEnum.isPristine,
            ].includes(prop);
            if (isContainerProp ||
                !field.fields.size ||
                !Array.isArray(field.initial)) {
                check.push(field[prop]);
            }
            check.push(utils.checkPropOccurrence({
                data: this.deepCheck(type, prop, field.fields),
                type,
            }));
            return check;
        }, []);
    }
    firstError() {
        if (!this.state.options.get(OptionsModel.OptionsEnum.bubbleUpErrorMessages, this))
            return null;
        for (const field of utils.getObservableMapValues(this.fields)) {
            if (field.error)
                return field.error;
            if (field.fields.size) {
                const nested = field.firstError();
                if (nested)
                    return nested;
            }
        }
        return null;
    }
    /**
      Update Field Values recurisvely
      OR Create Field if 'undefined'
     */
    update(fields) {
        if (!lodash.isPlainObject(fields)) {
            throw new Error("The update() method accepts only plain objects.");
        }
        this.deepUpdate(parser.prepareFieldsData({ fields }, this.state.strict), undefined, undefined, fields);
    }
    deepUpdate(fields, path = "", recursion = true, raw) {
        lodash.each(fields, (field, key) => {
            const $key = lodash.has(field, FieldProps.FieldPropsEnum.name) ? field.name : key;
            const $path = `${path}.${$key}`.replace(/^\.+/, "");
            const strictUpdate = this.state.options.get(OptionsModel.OptionsEnum.strictUpdate, this);
            const $field = this.select($path, null, strictUpdate);
            const $container = this.select(path, null, false) ||
                this.state.form.select(this.path ?? "", null, false);
            const applyInputConverterOnUpdate = this.state.options.get(OptionsModel.OptionsEnum.applyInputConverterOnUpdate, this);
            if ($field != null && field !== void 0) {
                if (Array.isArray($field.values())) {
                    const n = Math.max(-1, ...Object.keys(field.fields || {}).map(Number));
                    utils.getObservableMapValues($field.fields).forEach(($f) => {
                        if (Number($f.name) > n) {
                            $field.$changed++;
                            $field.state.form.$changed++;
                            $field.fields.delete($f.name);
                        }
                    });
                }
                if (field?.fields) {
                    const fallback = this.state.options.get(OptionsModel.OptionsEnum.fallback);
                    const x = this.state
                        .struct()
                        .findIndex((s) => s.startsWith($field.path.replace(/\.\d+\./, "[].") + "[]"));
                    if (!fallback && $field.fields.size === 0 && x < 0) {
                        $field.value = parser.parseInput(applyInputConverterOnUpdate ? $field.$input : (val) => val, {
                            fallbackValueOption: this.state.options.get(OptionsModel.OptionsEnum.fallbackValue, this),
                            separated: lodash.get(raw, $path),
                        });
                        return;
                    }
                }
                if (field === null || field.fields == null) {
                    $field.value = parser.parseInput(applyInputConverterOnUpdate ? $field.$input : (val) => val, {
                        fallbackValueOption: this.state.options.get(OptionsModel.OptionsEnum.fallbackValue, this),
                        separated: field,
                    });
                    return;
                }
            }
            if ($container != null && $field == null) {
                // get full path when using update() with select() - FIX: #179
                const $newFieldPath = [this.path, $path].join(".").replace(/^\.+/, "");
                // init field into the container field
                $container.$changed++;
                $container.state.form.$changed++;
                $container.initField($key, $newFieldPath, field, true);
            }
            else if (recursion) {
                if (lodash.has(field, FieldProps.FieldPropsEnum.fields) && field.fields != null) {
                    // handle nested fields if defined
                    this.deepUpdate(field.fields, $path);
                }
                else {
                    // handle nested fields if undefined or null
                    const $fields = parser.pathToFieldsTree(this.state.struct(), $path);
                    this.deepUpdate($fields, $path, false);
                }
            }
        });
    }
    /**
      Get Fields Props
     */
    get(prop = null, strict = true) {
        if (prop == null) {
            return this.deepGet([...props.props.computed, ...props.props.editable, ...props.props.validation], this.fields, strict);
        }
        utils.allowedProps(FieldProps.AllowedFieldPropsTypes.all, Array.isArray(prop) ? prop : [prop]);
        if (typeof prop === "string") {
            if ([FieldProps.FieldPropsEnum.hooks, FieldProps.FieldPropsEnum.handlers].includes(prop)) {
                return this[`$${prop}`];
            }
            if (strict && this.fields.size === 0) {
                const retrieveNullifiedEmptyStrings = this.state.options.get(OptionsModel.OptionsEnum.retrieveNullifiedEmptyStrings, this);
                return parser.parseCheckOutput(this, prop, strict ? retrieveNullifiedEmptyStrings : false);
            }
            const value = this.deepGet(prop, this.fields, strict);
            const removeNullishValuesInArrays = this.state.options.get(OptionsModel.OptionsEnum.removeNullishValuesInArrays, this);
            return parser.parseCheckArray(this, value, prop, strict ? removeNullishValuesInArrays : false);
        }
        return this.deepGet(prop, this.fields, strict);
    }
    /**
      Get Fields Props Recursively
     */
    deepGet(prop, fields, strict = true) {
        const _fieldsArr = utils.getObservableMapValues(fields);
        const _result = lodash.transform(_fieldsArr, (obj, field) => {
            const $nested = ($fields) => $fields.size !== 0 ? this.deepGet(prop, $fields, strict) : undefined;
            Object.assign(obj, {
                [field.key]: { fields: $nested(field.fields) },
            });
            if (typeof prop === "string") {
                const opt = this.state.options;
                const removeProp = (opt.get(OptionsModel.OptionsEnum.retrieveOnlyDirtyFieldsValues, this) &&
                    prop === FieldProps.FieldPropsEnum.value &&
                    field.isPristine) ||
                    (opt.get(OptionsModel.OptionsEnum.retrieveOnlyEnabledFieldsValues, this) &&
                        prop === FieldProps.FieldPropsEnum.value &&
                        field.disabled) ||
                    (opt.get(OptionsModel.OptionsEnum.retrieveOnlyEnabledFieldsErrors, this) &&
                        prop === FieldProps.FieldPropsEnum.error &&
                        field.disabled &&
                        field.isValid &&
                        (!field.error || !field.hasError)) ||
                    (opt.get(OptionsModel.OptionsEnum.softDelete, this) &&
                        prop === FieldProps.FieldPropsEnum.value &&
                        field.deleted);
                if (field.fields.size === 0) {
                    delete obj[field.key];
                    if (removeProp)
                        return obj;
                    const retrieveNullifiedEmptyStrings = this.state.options.get(OptionsModel.OptionsEnum.retrieveNullifiedEmptyStrings, this);
                    return Object.assign(obj, {
                        [field.key]: parser.parseCheckOutput(field, prop, strict ? retrieveNullifiedEmptyStrings : false),
                    });
                }
                let value = this.deepGet(prop, field.fields, strict);
                if (prop === FieldProps.FieldPropsEnum.value)
                    value = field.$output(value);
                delete obj[field.key];
                if (removeProp)
                    return obj;
                const removeNullishValuesInArrays = this.state.options.get(OptionsModel.OptionsEnum.removeNullishValuesInArrays, this);
                return Object.assign(obj, {
                    [field.key]: parser.parseCheckArray(field, value, prop, strict ? removeNullishValuesInArrays : false),
                });
            }
            lodash.each(prop, ($prop) => Object.assign(obj[field.key], {
                [$prop]: field[$prop],
            }));
            return obj;
        }, {});
        // Array fields with integer keys must preserve _entries order
        // (JavaScript Object.assign sorts integer-like keys regardless of insertion order)
        if (typeof prop === "string" &&
            _fieldsArr.length > 0 &&
            utils.hasIntKeys(fields)) {
            const keysInResult = new Set(Object.keys(_result));
            return _fieldsArr
                .filter((f) => keysInResult.has(String(f.key)))
                .map((f) => _result[String(f.key)]);
        }
        return _result;
    }
    /**
      Set Fields Props
     */
    set(prop, data) {
        // UPDATE CUSTOM PROP
        if (typeof prop === "string" && data !== void 0) {
            utils.allowedProps(FieldProps.AllowedFieldPropsTypes.editable, [prop]);
            const isPlain = [FieldProps.FieldPropsEnum.hooks, FieldProps.FieldPropsEnum.handlers].includes(prop);
            const deep = (data !== null &&
                typeof data === "object" &&
                prop === FieldProps.FieldPropsEnum.value) ||
                (lodash.isPlainObject(data) && !isPlain);
            if (deep && this.hasNestedFields)
                return this.deepSet(prop, data, "", true);
            if (prop === FieldProps.FieldPropsEnum.value) {
                const applyInputConverterOnSet = this.state.options.get(OptionsModel.OptionsEnum.applyInputConverterOnSet, this);
                this.value = parser.parseInput(applyInputConverterOnSet ? this.$input : (val) => val, {
                    fallbackValueOption: this.state.options.get(OptionsModel.OptionsEnum.fallbackValue, this),
                    separated: data,
                });
            }
            else if (isPlain) {
                Object.assign(this[`$${prop}`], data);
            }
            else {
                lodash.set(this, `$${prop}`, data);
            }
            return;
        }
        // NO PROP NAME PROVIDED ("prop" is value)
        if (data == null) {
            if (this.hasNestedFields)
                this.deepSet(FieldProps.FieldPropsEnum.value, prop, "", true);
            else
                this.set(FieldProps.FieldPropsEnum.value, prop);
        }
    }
    /**
      Set Fields Props Recursively
     */
    deepSet(prop, data, path = "", recursion = false) {
        const err = "You are updating a not existent field:";
        const isStrict = this.state.options.get(OptionsModel.OptionsEnum.strictSet, this);
        if (data == null) {
            this.each((field) => (field.$value = parser.defaultValue({
                fallbackValueOption: this.state.options.get(OptionsModel.OptionsEnum.fallbackValue, this),
                value: field.$value,
                nullable: field.$nullable,
                type: field.type,
            })));
            return;
        }
        lodash.each(data, ($val, $key) => {
            const $path = `${path}.${$key}`.replace(/^\.+/, "");
            // get the field by path joining keys recursively
            const field = this.select($path, null, isStrict);
            // if no field found when is strict update, throw error
            if (isStrict)
                utils.throwError($path, field, err);
            // update the field/fields if defined
            if (field !== void 0) {
                // update field values or others props
                if ($val !== void 0) {
                    field.set(prop, $val, recursion);
                }
                // update values recursively only if field has nested
                if (field.fields.size && $val !== null && typeof $val === "object") {
                    this.deepSet(prop, $val, $path, recursion);
                }
            }
        });
    }
    /**
      Add Field
     */
    add(obj, execEvent = true) {
        if (utils.isArrayOfObjects(obj)) {
            lodash.each(obj, (values) => this.update({
                [utils.maxKey(this.fields)]: values,
            }));
            this.$changed++;
            this.state.form.$changed++;
            execEvent && this.execHook(FieldProps.FieldPropsEnum.onAdd);
            return this;
        }
        let key;
        const tree = parser.pathToFieldsTree(this.state.struct(), this.path ?? "", 0, true);
        const nestedFields = tree[0]?.fields ?? null;
        // An object without field-definition props, whose keys match the
        // nested fields of the container, holds the values of the new item
        // (e.g. add({ name: 'John', qty: 1 })). The 'name' prop is ambiguous:
        // it is treated as a value only when the container defines a nested
        // field called 'name'. (#657)
        const payloadKeys = lodash.isPlainObject(obj)
            ? Object.keys(obj).filter((k) => k !== FieldProps.FieldPropsEnum.key)
            : [];
        const isValuesPayload = !!nestedFields &&
            lodash.isPlainObject(obj) &&
            !lodash.has(obj, FieldProps.FieldPropsEnum.value) &&
            !lodash.has(obj, FieldProps.FieldPropsEnum.fields) &&
            payloadKeys.length > 0 &&
            (!lodash.has(obj, FieldProps.FieldPropsEnum.name) ||
                Object.prototype.hasOwnProperty.call(nestedFields, FieldProps.FieldPropsEnum.name));
        if (lodash.has(obj, FieldProps.FieldPropsEnum.key))
            key = obj.key;
        if (!isValuesPayload && lodash.has(obj, FieldProps.FieldPropsEnum.name))
            key = obj.name;
        if (!key)
            key = utils.maxKey(this.fields);
        const $path = ($key) => [this.path, $key].join(".").replace(/^\.+/, "");
        const field = this.initField(key, $path(key), isValuesPayload ? tree[0] : lodash.merge(tree[0], obj));
        const hasValues = lodash.has(obj, FieldProps.FieldPropsEnum.value) || lodash.has(obj, FieldProps.FieldPropsEnum.fields);
        if (isValuesPayload) {
            lodash.each(payloadKeys, (fieldName) => {
                const nestedField = field.select(fieldName);
                if (nestedField && !nestedField.hasNestedFields) {
                    nestedField.set(FieldProps.FieldPropsEnum.value, obj[fieldName]);
                }
            });
        }
        else if (!hasValues) {
            // When the struct defines nested fields and obj is a plain object
            // without field-definition props (key, name), treat obj properties
            // directly as nested field values (e.g. add({ firstname: 'John' }))
            if (tree[0]?.fields &&
                lodash.isPlainObject(obj) &&
                !utils.hasSome(obj, [FieldProps.FieldPropsEnum.key, FieldProps.FieldPropsEnum.name])) {
                lodash.each(obj, (val, fieldName) => {
                    const nestedField = field.select(fieldName);
                    if (nestedField && !nestedField.hasNestedFields) {
                        nestedField.set(FieldProps.FieldPropsEnum.value, val);
                    }
                });
            }
            else if (!this.state.options.get(OptionsModel.OptionsEnum.preserveDeletedFieldsValues, this)) {
                const fallbackValueOption = this.state.options.get(OptionsModel.OptionsEnum.fallbackValue, this);
                field.$value = parser.defaultValue({
                    fallbackValueOption,
                    value: field.$value,
                    nullable: field.$nullable,
                    type: field.type,
                });
                field.each((f) => (f.$value = parser.defaultValue({
                    fallbackValueOption,
                    value: f.$value,
                    nullable: f.$nullable,
                    type: f.type,
                })));
            }
        }
        this.$changed++;
        this.state.form.$changed++;
        execEvent && this.execHook(FieldProps.FieldPropsEnum.onAdd);
        return field;
    }
    /**
      Del Field
     */
    del($path = null, execEvent = true) {
        const isStrict = this.state.options.get(OptionsModel.OptionsEnum.strictDelete, this);
        const path = parser.parsePath($path ?? this.path ?? "");
        const fullpath = [this.path ?? "", path ?? ""]
            .join(".")
            .replace(/^\.+|\.+$/g, "");
        const container = this.container($path);
        const keys = path.split(".");
        const lastKey = keys[keys.length - 1];
        if (isStrict && !container.fields.has(lastKey)) {
            const msg = `Key "${lastKey}" not found when trying to delete field`;
            utils.throwError(fullpath, null, msg);
        }
        container.$changed++;
        container.state.form.$changed++;
        if (this.state.options.get(OptionsModel.OptionsEnum.softDelete, this)) {
            return this.select(fullpath).set(FieldProps.FieldPropsEnum.deleted, true);
        }
        container.each((field) => field.debouncedValidation.cancel());
        execEvent && this.execHook(FieldProps.FieldPropsEnum.onDel);
        return container.fields.delete(lastKey);
    }
    /******************************************************************
      Events
    */
    /**
      MobX Event (observe/intercept)
     */
    MOBXEvent({ prop = FieldProps.FieldPropsEnum.value, key = null, path = null, call, type, }) {
        let $prop = key || prop;
        utils.allowedProps(FieldProps.AllowedFieldPropsTypes.observable, [$prop]);
        const $instance = this.select(path || this.path, null, false) || this;
        const $call = (change) => call.apply(null, [
            {
                change,
                form: this.state.form,
                path: $instance.path || null,
                field: $instance.path ? $instance : null,
            },
        ]);
        let fn;
        let ffn;
        if (type === "observer") {
            fn = mobx.observe;
            ffn = (cb) => mobx.observe($instance.fields.toArray(), cb); // fields
        }
        if (type === "interceptor") {
            $prop = `$${prop}`;
            fn = mobx.intercept;
            ffn = $instance.fields.intercept; // fields
        }
        const $dkey = $instance.path ? `${$prop}@${$instance.path}` : $prop;
        lodash.merge(this.state.disposers[type], {
            [$dkey]: $prop === FieldProps.FieldPropsEnum.fields
                ? ffn.apply((change) => $call(change))
                : fn($instance, $prop, (change) => $call(change)),
        });
    }
    /**
      Dispose MOBX Events
     */
    dispose(opt = null) {
        if (this.path && opt)
            return this.disposeSingle(opt);
        return this.disposeAll();
    }
    /**
      Dispose All Events (observe/intercept)
     */
    disposeAll() {
        const dispose = (disposer) => disposer.apply();
        lodash.each(this.state.disposers.interceptor, dispose);
        lodash.each(this.state.disposers.observer, dispose);
        this.state.disposers = { interceptor: {}, observer: {} };
        return;
    }
    /**
      Dispose Single Event (observe/intercept)
     */
    disposeSingle({ type, key = FieldProps.FieldPropsEnum.value, path = null }) {
        const $path = parser.parsePath(path ?? this.path ?? "");
        // eslint-disable-next-line
        if (type === "interceptor")
            key = `$${key}`; // target observables
        const disposersType = this.state.disposers[type];
        disposersType[`${key}@${$path}`].apply();
        delete disposersType[`${key}@${$path}`];
    }
    /******************************************************************
      Utils
    */
    /**
      Fields Selector
    */
    select(path, fields = null, isStrict = true) {
        const $path = parser.parsePath(String(path));
        const keys = $path.split(".");
        const headKey = keys[0];
        keys.shift();
        let $fields = fields == null ? this.fields.get(headKey) : fields.get(headKey);
        let stop = false;
        lodash.each(keys, ($key) => {
            if (stop)
                return;
            if ($fields == null) {
                $fields = undefined;
                stop = true;
            }
            else {
                $fields = $fields.fields.get($key);
            }
        });
        if (isStrict && this.state.options.get(OptionsModel.OptionsEnum.strictSelect, this)) {
            utils.throwError(String(path), $fields);
        }
        return $fields;
    }
    /**
      Get Container
     */
    container($path) {
        const path = parser.parsePath($path ?? this.path ?? "");
        const cpath = path.replace(/[^./]+$/, "").replace(/^\.+|\.+$/g, "");
        if (!!this.path && $path == null) {
            return cpath !== ""
                ? this.state.form.select(cpath, null, false)
                : this.state.form;
        }
        return cpath !== "" ? this.select(cpath, null, false) : this;
    }
    /**
      Has Field
     */
    has(path) {
        return this.fields.has(path);
    }
    /**
      Map Fields
    */
    map(cb) {
        return utils.getObservableMapValues(this.fields).map(cb);
    }
    /**
     * Iterates deeply over fields and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, depth).
     *
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Array|Object} [fields=form.fields] fields to iterate over.
     * @param {number} [depth=1] The recursion depth for internal use.
     * @returns {Array} Returns [fields.values()] of input [fields] parameter.
     * @example
     *
     * JSON.stringify(form)
     * // => {
     *   "fields": {
     *     "state": {
     *       "fields": {
     *         "city": {
     *           "fields": { "places": {
     *                "fields": {},
     *                "key": "places", "path": "state.city.places", "$value": "NY Places"
     *              }
     *           },
     *           "key": "city", "path": "state.city", "$value": "New York"
     *         }
     *       },
     *       "key": "state", "path": "state", "$value": "USA"
     *     }
     *   }
     * }
     *
     * const data = {};
     * form.each(field => data[field.path] = field.value);
     * // => {
     *   "state": "USA",
     *   "state.city": "New York",
     *   "state.city.places": "NY Places"
     * }
     *
     */
    each(iteratee, fields = null, depth = 0) {
        const $fields = fields || this.fields;
        utils.getObservableMapValues($fields).forEach((field, index) => {
            iteratee(field, index, depth);
            if (field.fields.size !== 0) {
                this.each(iteratee, field.fields, depth + 1);
            }
        });
    }
    reduce(iteratee, acc) {
        return utils.getObservableMapValues(this.fields).reduce(iteratee, acc);
    }
    /******************************************************************
      Array Operations
    */
    /**
      Move a field from one index to another (for sortable lists).
     */
    move(fromIndex, toIndex) {
        this.fields.move(fromIndex, toIndex);
    }
    /******************************************************************
      Helpers
    */
    /**
      Fields Selector (alias of select)
     */
    $(key) {
        return this.select(key);
    }
    /**
      Fields Values (recursive with Nested Fields)
     */
    values() {
        return this.get(FieldProps.FieldPropsEnum.value);
    }
    /**
      Fields Errors (recursive with Nested Fields)
     */
    errors() {
        return this.get(FieldProps.FieldPropsEnum.error);
    }
    /**
      Fields Labels (recursive with Nested Fields)
     */
    labels() {
        return this.get(FieldProps.FieldPropsEnum.label);
    }
    /**
      Fields Placeholders (recursive with Nested Fields)
     */
    placeholders() {
        return this.get(FieldProps.FieldPropsEnum.placeholder);
    }
    /**
      Fields Default Values (recursive with Nested Fields)
     */
    defaults() {
        return this.get(FieldProps.FieldPropsEnum.default);
    }
    /**
      Fields Initial Values (recursive with Nested Fields)
     */
    initials() {
        return this.get(FieldProps.FieldPropsEnum.initial);
    }
    /**
      Fields Types (recursive with Nested Fields)
     */
    types() {
        return this.get(FieldProps.FieldPropsEnum.type);
    }
}

exports.default = Base;
//# sourceMappingURL=Base.js.map
