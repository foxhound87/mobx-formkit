import { toJS, action, computed, observable, observe, intercept } from 'mobx';
import { makeObservable } from './compat.js';
import { ArrayMap } from './ArrayMap.js';
import { forIn, get, merge, transform, isPlainObject, each, has, set } from 'lodash-es';
import { $try, hasIntKeys, isEvent, pathToStruct, allowedProps, checkPropOccurrence, getObservableMapValues, throwError, isArrayOfObjects, maxKey, hasSome } from './utils.js';
import { prepareFieldsData, mergeSchemaDefaults, parseInput, pathToFieldsTree, parseCheckOutput, parseCheckArray, defaultValue, parsePath } from './parser.js';
import { FieldPropsEnum, SeparatedPropsMode, AllowedFieldPropsTypes } from './models/FieldProps.js';
import { OptionsEnum } from './models/OptionsModel.js';
import { ValidationHooks } from './models/ValidatorInterface.js';
import { props } from './props.js';

class Base {
    noop = () => { };
    state;
    fields = new ArrayMap();
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
        makeObservable(this, {
            $submitted: observable,
            $submitting: observable,
            $validated: observable,
            $validating: observable,
            $clearing: observable,
            $resetting: observable,
            $touched: observable,
            $changed: observable,
            $hooks: observable,
            $handlers: observable,
            changed: computed,
            submitted: computed,
            submitting: computed,
            validated: computed,
            validating: computed,
            clearing: computed,
            resetting: computed,
            hasIncrementalKeys: computed,
            hasNestedFields: computed,
            size: computed,
            // initialization
            initField: action,
            // actions
            submit: action,
            deepUpdate: action,
            set: action,
            add: action,
            del: action,
            move: action,
        });
        // Any reorder of the fields (also when `fields.move()` is called
        // directly) flags the field and the form as changed. (#657)
        this.fields.onMove = () => {
            this.$changed++;
            this.state.form.$changed++;
        };
    }
    execHook = (name, fallback = {}, ...args) => $try(fallback[name], this.$hooks[name], this.noop).apply(this, [this, ...args]);
    execHandler = (name, args, fallback = undefined, hook = null, execHook = true) => [
        $try(this.$handlers[name] && this.$handlers[name].apply(this, [this]), fallback, this.noop).apply(this, [...args]),
        execHook && this.execHook(hook || name, {}, ...args),
    ];
    get resetting() {
        return this.hasNestedFields
            ? this.check(FieldPropsEnum.resetting, true)
            : this.$resetting;
    }
    get clearing() {
        return this.hasNestedFields
            ? this.check(FieldPropsEnum.clearing, true)
            : this.$clearing;
    }
    get submitted() {
        return toJS(this.$submitted);
    }
    get submitting() {
        return toJS(this.$submitting);
    }
    get validated() {
        return toJS(this.$validated);
    }
    get validating() {
        return toJS(this.$validating);
    }
    get hasIncrementalKeys() {
        return !!this.fields.size && hasIntKeys(this.fields);
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
    onClear = (...args) => this.execHandler(FieldPropsEnum.onClear, args, (e) => {
        isEvent(e) && e.preventDefault();
        this.clear(true, false);
    });
    /**
      Event Handler: On Reset
    */
    onReset = (...args) => this.execHandler(FieldPropsEnum.onReset, args, (e) => {
        isEvent(e) && e.preventDefault();
        this.reset(true, false);
    });
    /**
      Event Handler: On Submit
     */
    onSubmit = (...args) => this.execHandler(FieldPropsEnum.onSubmit, args, (e, o = {}) => {
        isEvent(e) && e.preventDefault();
        this.submit(o);
    }, null, false);
    /**
      Event Handler: On Add
    */
    onAdd = (...args) => this.execHandler(FieldPropsEnum.onAdd, args, (e, val) => {
        isEvent(e) && e.preventDefault();
        this.add(isEvent(val) ? null : val, false);
    });
    /**
      Event Handler: On Del
    */
    onDel = (...args) => this.execHandler(FieldPropsEnum.onDel, args, (e, path) => {
        isEvent(e) && e.preventDefault();
        this.del(isEvent(path) ? this.path : path, false);
    });
    /******************************************************************
      Initializer
    */
    initFields(initial, update = false) {
        const fallback = this.state.options.get(OptionsEnum.fallback);
        const $path = (key) => [this.path, key].join(".").replace(/^\.+/, "");
        let fields;
        fields = prepareFieldsData(initial, this.state.strict, fallback);
        fields = mergeSchemaDefaults(fields, this.validator);
        // create fields
        forIn(fields, (field, key) => {
            const path = $path(key);
            const $f = this.select(path, null, false);
            if ($f == null) {
                if (fallback) {
                    this.initField(key, path, field, update);
                }
                else {
                    const structPath = pathToStruct(path);
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
        const struct = pathToStruct(path);
        // try to get props from separated objects
        const _try = (prop) => {
            const t = get(initial[prop], struct);
            if ([
                FieldPropsEnum.input,
                FieldPropsEnum.output,
                FieldPropsEnum.converter,
            ].includes(prop) &&
                typeof t !== "function")
                return undefined;
            return t;
        };
        const props = {
            $value: get(initial[SeparatedPropsMode.values], path),
            $computed: _try(SeparatedPropsMode.computed),
            $label: _try(SeparatedPropsMode.labels),
            $placeholder: _try(SeparatedPropsMode.placeholders),
            $default: _try(SeparatedPropsMode.defaults),
            $initial: _try(SeparatedPropsMode.initials),
            $disabled: _try(SeparatedPropsMode.disabled),
            $deleted: _try(SeparatedPropsMode.deleted),
            $type: _try(SeparatedPropsMode.types),
            $related: _try(SeparatedPropsMode.related),
            $rules: _try(SeparatedPropsMode.rules),
            $options: _try(SeparatedPropsMode.options),
            $bindings: _try(SeparatedPropsMode.bindings),
            $extra: _try(SeparatedPropsMode.extra),
            $hooks: _try(SeparatedPropsMode.hooks),
            $handlers: _try(SeparatedPropsMode.handlers),
            $validatedWith: _try(SeparatedPropsMode.validatedWith),
            $validators: _try(SeparatedPropsMode.validators),
            $observers: _try(SeparatedPropsMode.observers),
            $interceptors: _try(SeparatedPropsMode.interceptors),
            $converters: _try(SeparatedPropsMode.converters),
            $input: _try(SeparatedPropsMode.input),
            $output: _try(SeparatedPropsMode.output),
            $autoFocus: _try(SeparatedPropsMode.autoFocus),
            $ref: _try(SeparatedPropsMode.refs),
            $nullable: _try(SeparatedPropsMode.nullable),
            $autoComplete: _try(SeparatedPropsMode.autoComplete),
        };
        const field = this.state.form.makeField({
            key,
            path,
            struct,
            data,
            props,
            update,
            state: this.state,
        }, (data && data[FieldPropsEnum.class]) || _try(SeparatedPropsMode.classes));
        this.fields.merge({ [key]: field });
        return field;
    }
    /******************************************************************
      Actions
    */
    validate(opt, obj) {
        const $opt = merge({}, opt, { path: this.path });
        return this.state.form.validator.validate($opt, obj);
    }
    /**
      Submit
    */
    submit(hooks = {}, { execOnSubmitHook = true, execValidationHooks = true, validate = true, } = {}) {
        const execOnSubmit = () => this.execHook(FieldPropsEnum.onSubmit, hooks);
        const submit = execOnSubmitHook ? execOnSubmit() : undefined;
        this.$submitting = true;
        this.$submitted += 1;
        if (!validate ||
            !this.state.options.get(OptionsEnum.validateOnSubmit, this)) {
            return Promise.resolve(submit)
                .then(action(() => (this.$submitting = false)))
                .catch(action((err) => {
                this.$submitting = false;
                throw err;
            }))
                .then(() => this);
        }
        const exec = (isValid) => isValid
            ? this.execHook(ValidationHooks.onSuccess, hooks)
            : this.execHook(ValidationHooks.onError, hooks);
        return this.validate({
            showErrors: this.state.options.get(OptionsEnum.showErrorsOnSubmit, this),
        })
            .then(({ isValid }) => {
            const handler = execValidationHooks ? exec(isValid) : undefined;
            if (isValid)
                return Promise.all([submit, handler]);
            const $err = this.state.options.get(OptionsEnum.defaultGenericError, this);
            const $throw = this.state.options.get(OptionsEnum.submitThrowsError, this);
            if ($throw && $err)
                this.invalidate();
            return Promise.all([submit, handler]);
        })
            .then(action(() => (this.$submitting = false)))
            .catch(action((err) => {
            this.$submitting = false;
            throw err;
        }))
            .then(() => this);
    }
    /**
      Check Field Computed Values
     */
    check(prop, deep = false) {
        allowedProps(AllowedFieldPropsTypes.computed, [prop]);
        return deep
            ? checkPropOccurrence({
                type: props.occurrences[prop],
                data: this.deepCheck(props.occurrences[prop], prop, this.fields),
            })
            : this[prop];
    }
    deepCheck(type, prop, fields) {
        const $fields = getObservableMapValues(fields);
        return transform($fields, (check, field) => {
            // Array containers are skipped because most of their props are
            // computed recursively on their nested fields. Some props are not
            // recursive (isDirty/isPristine compare the container value with
            // its initial value) or must aggregate the container itself
            // (isValid/hasError), so they are taken into account for array
            // containers too. (#656, #657)
            const isContainerProp = [
                FieldPropsEnum.isValid,
                FieldPropsEnum.hasError,
                FieldPropsEnum.isDirty,
                FieldPropsEnum.isPristine,
            ].includes(prop);
            if (isContainerProp ||
                !field.fields.size ||
                !Array.isArray(field.initial)) {
                check.push(field[prop]);
            }
            check.push(checkPropOccurrence({
                data: this.deepCheck(type, prop, field.fields),
                type,
            }));
            return check;
        }, []);
    }
    firstError() {
        if (!this.state.options.get(OptionsEnum.bubbleUpErrorMessages, this))
            return null;
        for (const field of getObservableMapValues(this.fields)) {
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
        if (!isPlainObject(fields)) {
            throw new Error("The update() method accepts only plain objects.");
        }
        this.deepUpdate(prepareFieldsData({ fields }, this.state.strict), undefined, undefined, fields);
    }
    deepUpdate(fields, path = "", recursion = true, raw) {
        each(fields, (field, key) => {
            const $key = has(field, FieldPropsEnum.name) ? field.name : key;
            const $path = `${path}.${$key}`.replace(/^\.+/, "");
            const strictUpdate = this.state.options.get(OptionsEnum.strictUpdate, this);
            const $field = this.select($path, null, strictUpdate);
            const $container = this.select(path, null, false) ||
                this.state.form.select(this.path ?? "", null, false);
            const applyInputConverterOnUpdate = this.state.options.get(OptionsEnum.applyInputConverterOnUpdate, this);
            if ($field != null && field !== void 0) {
                if (Array.isArray($field.values())) {
                    const n = Math.max(-1, ...Object.keys(field.fields || {}).map(Number));
                    getObservableMapValues($field.fields).forEach(($f) => {
                        if (Number($f.name) > n) {
                            $field.$changed++;
                            $field.state.form.$changed++;
                            $field.fields.delete($f.name);
                        }
                    });
                }
                if (field?.fields) {
                    const fallback = this.state.options.get(OptionsEnum.fallback);
                    const x = this.state
                        .struct()
                        .findIndex((s) => s.startsWith($field.path.replace(/\.\d+\./, "[].") + "[]"));
                    if (!fallback && $field.fields.size === 0 && x < 0) {
                        $field.value = parseInput(applyInputConverterOnUpdate ? $field.$input : (val) => val, {
                            fallbackValueOption: this.state.options.get(OptionsEnum.fallbackValue, this),
                            separated: get(raw, $path),
                        });
                        return;
                    }
                }
                if (field === null || field.fields == null) {
                    $field.value = parseInput(applyInputConverterOnUpdate ? $field.$input : (val) => val, {
                        fallbackValueOption: this.state.options.get(OptionsEnum.fallbackValue, this),
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
                if (has(field, FieldPropsEnum.fields) && field.fields != null) {
                    // handle nested fields if defined
                    this.deepUpdate(field.fields, $path);
                }
                else {
                    // handle nested fields if undefined or null
                    const $fields = pathToFieldsTree(this.state.struct(), $path);
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
            return this.deepGet([...props.computed, ...props.editable, ...props.validation], this.fields, strict);
        }
        allowedProps(AllowedFieldPropsTypes.all, Array.isArray(prop) ? prop : [prop]);
        if (typeof prop === "string") {
            if ([FieldPropsEnum.hooks, FieldPropsEnum.handlers].includes(prop)) {
                return this[`$${prop}`];
            }
            if (strict && this.fields.size === 0) {
                const retrieveNullifiedEmptyStrings = this.state.options.get(OptionsEnum.retrieveNullifiedEmptyStrings, this);
                return parseCheckOutput(this, prop, strict ? retrieveNullifiedEmptyStrings : false);
            }
            const value = this.deepGet(prop, this.fields, strict);
            const removeNullishValuesInArrays = this.state.options.get(OptionsEnum.removeNullishValuesInArrays, this);
            return parseCheckArray(this, value, prop, strict ? removeNullishValuesInArrays : false);
        }
        return this.deepGet(prop, this.fields, strict);
    }
    /**
      Get Fields Props Recursively
     */
    deepGet(prop, fields, strict = true) {
        const _fieldsArr = getObservableMapValues(fields);
        const _result = transform(_fieldsArr, (obj, field) => {
            const $nested = ($fields) => $fields.size !== 0 ? this.deepGet(prop, $fields, strict) : undefined;
            Object.assign(obj, {
                [field.key]: { fields: $nested(field.fields) },
            });
            if (typeof prop === "string") {
                const opt = this.state.options;
                const removeProp = (opt.get(OptionsEnum.retrieveOnlyDirtyFieldsValues, this) &&
                    prop === FieldPropsEnum.value &&
                    field.isPristine) ||
                    (opt.get(OptionsEnum.retrieveOnlyEnabledFieldsValues, this) &&
                        prop === FieldPropsEnum.value &&
                        field.disabled) ||
                    (opt.get(OptionsEnum.retrieveOnlyEnabledFieldsErrors, this) &&
                        prop === FieldPropsEnum.error &&
                        field.disabled &&
                        field.isValid &&
                        (!field.error || !field.hasError)) ||
                    (opt.get(OptionsEnum.softDelete, this) &&
                        prop === FieldPropsEnum.value &&
                        field.deleted);
                if (field.fields.size === 0) {
                    delete obj[field.key];
                    if (removeProp)
                        return obj;
                    const retrieveNullifiedEmptyStrings = this.state.options.get(OptionsEnum.retrieveNullifiedEmptyStrings, this);
                    return Object.assign(obj, {
                        [field.key]: parseCheckOutput(field, prop, strict ? retrieveNullifiedEmptyStrings : false),
                    });
                }
                let value = this.deepGet(prop, field.fields, strict);
                if (prop === FieldPropsEnum.value)
                    value = field.$output(value);
                delete obj[field.key];
                if (removeProp)
                    return obj;
                const removeNullishValuesInArrays = this.state.options.get(OptionsEnum.removeNullishValuesInArrays, this);
                return Object.assign(obj, {
                    [field.key]: parseCheckArray(field, value, prop, strict ? removeNullishValuesInArrays : false),
                });
            }
            each(prop, ($prop) => Object.assign(obj[field.key], {
                [$prop]: field[$prop],
            }));
            return obj;
        }, {});
        // Array fields with integer keys must preserve _entries order
        // (JavaScript Object.assign sorts integer-like keys regardless of insertion order)
        if (typeof prop === "string" &&
            _fieldsArr.length > 0 &&
            hasIntKeys(fields)) {
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
            allowedProps(AllowedFieldPropsTypes.editable, [prop]);
            const isPlain = [FieldPropsEnum.hooks, FieldPropsEnum.handlers].includes(prop);
            const deep = (data !== null &&
                typeof data === "object" &&
                prop === FieldPropsEnum.value) ||
                (isPlainObject(data) && !isPlain);
            if (deep && this.hasNestedFields)
                return this.deepSet(prop, data, "", true);
            if (prop === FieldPropsEnum.value) {
                const applyInputConverterOnSet = this.state.options.get(OptionsEnum.applyInputConverterOnSet, this);
                this.value = parseInput(applyInputConverterOnSet ? this.$input : (val) => val, {
                    fallbackValueOption: this.state.options.get(OptionsEnum.fallbackValue, this),
                    separated: data,
                });
            }
            else if (isPlain) {
                Object.assign(this[`$${prop}`], data);
            }
            else {
                set(this, `$${prop}`, data);
            }
            return;
        }
        // NO PROP NAME PROVIDED ("prop" is value)
        if (data == null) {
            if (this.hasNestedFields)
                this.deepSet(FieldPropsEnum.value, prop, "", true);
            else
                this.set(FieldPropsEnum.value, prop);
        }
    }
    /**
      Set Fields Props Recursively
     */
    deepSet(prop, data, path = "", recursion = false) {
        const err = "You are updating a not existent field:";
        const isStrict = this.state.options.get(OptionsEnum.strictSet, this);
        if (data == null) {
            this.each((field) => (field.$value = defaultValue({
                fallbackValueOption: this.state.options.get(OptionsEnum.fallbackValue, this),
                value: field.$value,
                nullable: field.$nullable,
                type: field.type,
            })));
            return;
        }
        each(data, ($val, $key) => {
            const $path = `${path}.${$key}`.replace(/^\.+/, "");
            // get the field by path joining keys recursively
            const field = this.select($path, null, isStrict);
            // if no field found when is strict update, throw error
            if (isStrict)
                throwError($path, field, err);
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
        if (isArrayOfObjects(obj)) {
            each(obj, (values) => this.update({
                [maxKey(this.fields)]: values,
            }));
            this.$changed++;
            this.state.form.$changed++;
            execEvent && this.execHook(FieldPropsEnum.onAdd);
            return this;
        }
        let key;
        const tree = pathToFieldsTree(this.state.struct(), this.path ?? "", 0, true);
        const nestedFields = tree[0]?.fields ?? null;
        // An object without field-definition props, whose keys match the
        // nested fields of the container, holds the values of the new item
        // (e.g. add({ name: 'John', qty: 1 })). The 'name' prop is ambiguous:
        // it is treated as a value only when the container defines a nested
        // field called 'name'. (#657)
        const payloadKeys = isPlainObject(obj)
            ? Object.keys(obj).filter((k) => k !== FieldPropsEnum.key)
            : [];
        const isValuesPayload = !!nestedFields &&
            isPlainObject(obj) &&
            !has(obj, FieldPropsEnum.value) &&
            !has(obj, FieldPropsEnum.fields) &&
            payloadKeys.length > 0 &&
            (!has(obj, FieldPropsEnum.name) ||
                Object.prototype.hasOwnProperty.call(nestedFields, FieldPropsEnum.name));
        if (has(obj, FieldPropsEnum.key))
            key = obj.key;
        if (!isValuesPayload && has(obj, FieldPropsEnum.name))
            key = obj.name;
        if (!key)
            key = maxKey(this.fields);
        const $path = ($key) => [this.path, $key].join(".").replace(/^\.+/, "");
        const field = this.initField(key, $path(key), isValuesPayload ? tree[0] : merge(tree[0], obj));
        const hasValues = has(obj, FieldPropsEnum.value) || has(obj, FieldPropsEnum.fields);
        if (isValuesPayload) {
            each(payloadKeys, (fieldName) => {
                const nestedField = field.select(fieldName);
                if (nestedField && !nestedField.hasNestedFields) {
                    nestedField.set(FieldPropsEnum.value, obj[fieldName]);
                }
            });
        }
        else if (!hasValues) {
            // When the struct defines nested fields and obj is a plain object
            // without field-definition props (key, name), treat obj properties
            // directly as nested field values (e.g. add({ firstname: 'John' }))
            if (tree[0]?.fields &&
                isPlainObject(obj) &&
                !hasSome(obj, [FieldPropsEnum.key, FieldPropsEnum.name])) {
                each(obj, (val, fieldName) => {
                    const nestedField = field.select(fieldName);
                    if (nestedField && !nestedField.hasNestedFields) {
                        nestedField.set(FieldPropsEnum.value, val);
                    }
                });
            }
            else if (!this.state.options.get(OptionsEnum.preserveDeletedFieldsValues, this)) {
                const fallbackValueOption = this.state.options.get(OptionsEnum.fallbackValue, this);
                field.$value = defaultValue({
                    fallbackValueOption,
                    value: field.$value,
                    nullable: field.$nullable,
                    type: field.type,
                });
                field.each((f) => (f.$value = defaultValue({
                    fallbackValueOption,
                    value: f.$value,
                    nullable: f.$nullable,
                    type: f.type,
                })));
            }
        }
        this.$changed++;
        this.state.form.$changed++;
        execEvent && this.execHook(FieldPropsEnum.onAdd);
        return field;
    }
    /**
      Del Field
     */
    del($path = null, execEvent = true) {
        const isStrict = this.state.options.get(OptionsEnum.strictDelete, this);
        const path = parsePath($path ?? this.path ?? "");
        const fullpath = [this.path ?? "", path ?? ""]
            .join(".")
            .replace(/^\.+|\.+$/g, "");
        const container = this.container($path);
        const keys = path.split(".");
        const lastKey = keys[keys.length - 1];
        if (isStrict && !container.fields.has(lastKey)) {
            const msg = `Key "${lastKey}" not found when trying to delete field`;
            throwError(fullpath, null, msg);
        }
        container.$changed++;
        container.state.form.$changed++;
        if (this.state.options.get(OptionsEnum.softDelete, this)) {
            return this.select(fullpath).set(FieldPropsEnum.deleted, true);
        }
        container.each((field) => field.debouncedValidation.cancel());
        execEvent && this.execHook(FieldPropsEnum.onDel);
        return container.fields.delete(lastKey);
    }
    /******************************************************************
      Events
    */
    /**
      MobX Event (observe/intercept)
     */
    MOBXEvent({ prop = FieldPropsEnum.value, key = null, path = null, call, type, }) {
        let $prop = key || prop;
        allowedProps(AllowedFieldPropsTypes.observable, [$prop]);
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
            fn = observe;
            ffn = (cb) => observe($instance.fields.toArray(), cb); // fields
        }
        if (type === "interceptor") {
            $prop = `$${prop}`;
            fn = intercept;
            ffn = $instance.fields.intercept; // fields
        }
        const $dkey = $instance.path ? `${$prop}@${$instance.path}` : $prop;
        merge(this.state.disposers[type], {
            [$dkey]: $prop === FieldPropsEnum.fields
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
        each(this.state.disposers.interceptor, dispose);
        each(this.state.disposers.observer, dispose);
        this.state.disposers = { interceptor: {}, observer: {} };
        return;
    }
    /**
      Dispose Single Event (observe/intercept)
     */
    disposeSingle({ type, key = FieldPropsEnum.value, path = null }) {
        const $path = parsePath(path ?? this.path ?? "");
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
        const $path = parsePath(String(path));
        const keys = $path.split(".");
        const headKey = keys[0];
        keys.shift();
        let $fields = fields == null ? this.fields.get(headKey) : fields.get(headKey);
        let stop = false;
        each(keys, ($key) => {
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
        if (isStrict && this.state.options.get(OptionsEnum.strictSelect, this)) {
            throwError(String(path), $fields);
        }
        return $fields;
    }
    /**
      Get Container
     */
    container($path) {
        const path = parsePath($path ?? this.path ?? "");
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
        return getObservableMapValues(this.fields).map(cb);
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
        getObservableMapValues($fields).forEach((field, index) => {
            iteratee(field, index, depth);
            if (field.fields.size !== 0) {
                this.each(iteratee, field.fields, depth + 1);
            }
        });
    }
    reduce(iteratee, acc) {
        return getObservableMapValues(this.fields).reduce(iteratee, acc);
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
        return this.get(FieldPropsEnum.value);
    }
    /**
      Fields Errors (recursive with Nested Fields)
     */
    errors() {
        return this.get(FieldPropsEnum.error);
    }
    /**
      Fields Labels (recursive with Nested Fields)
     */
    labels() {
        return this.get(FieldPropsEnum.label);
    }
    /**
      Fields Placeholders (recursive with Nested Fields)
     */
    placeholders() {
        return this.get(FieldPropsEnum.placeholder);
    }
    /**
      Fields Default Values (recursive with Nested Fields)
     */
    defaults() {
        return this.get(FieldPropsEnum.default);
    }
    /**
      Fields Initial Values (recursive with Nested Fields)
     */
    initials() {
        return this.get(FieldPropsEnum.initial);
    }
    /**
      Fields Types (recursive with Nested Fields)
     */
    types() {
        return this.get(FieldPropsEnum.type);
    }
}

export { Base as default };
//# sourceMappingURL=Base.js.map
