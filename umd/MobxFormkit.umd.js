(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobx'), require('lodash')) :
    typeof define === 'function' && define.amd ? define(['exports', 'mobx', 'lodash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MobxFormkit = {}, global.mobx, global._));
})(this, (function (exports, mobx, lodash) { 'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var mobx__namespace = /*#__PURE__*/_interopNamespaceDefault(mobx);

    // `decorate` was removed in MobX 7 and `makeObservable` does not exist in
    // MobX 5. Resolve both lazily through the module namespace so a static
    // named import never fails at link time (MISSING_EXPORT) with MobX 7.
    const M = mobx__namespace;
    /**
     * `makeObservable` with MobX 5 / 6 / 7 compatibility.
     *
     * MobX 6/7: delegates to the native `makeObservable`.
     * MobX 5: `makeObservable` does not exist (introduced in 6.0). The fallback
     * below re-implements the same semantics with the MobX 5 primitives:
     *
     * 1. every annotated member is materialized as an OWN property of the
     *    instance first (getters/setters are copied down from the prototype
     *    chain — e.g. `changed`/`submitted` live on `Base`, not on `Form`),
     * 2. a single `decorate(instance, ...)` pass applies the corresponding
     *    `observable` / `computed` / `action` decorators.
     *
     * Decorating the instance (instead of the prototype) is required: MobX 5's
     * `decorate` is lazy (`mobxPendingDecorators`) and its initializer accessors
     * recurse infinitely when decorated members live on the prototype, while a
     * computed needs the getter to be an OWN property of the decorated target.
     * `extendObservable` is avoided too — passing `ComputedValue` instances as
     * initial values is no longer supported in 5.15+.
     *
     * All other APIs used across the source (`action`, `set`, `toJS`, `observe`,
     * `intercept`, `reaction`, `autorun`, `runInAction`, `untracked`,
     * `configure`/`enforceActions`, `extendObservable`) exist unchanged in
     * MobX 5.x, 6.x and 7.x, so no other shims are required.
     */
    const makeObservable = (target, annotations) => {
        if (typeof M.makeObservable === "function") {
            return M.makeObservable(target, annotations);
        }
        return fallbackMakeObservable(target, annotations);
    };
    /* istanbul ignore next -- MobX 5 only: no makeObservable in 5.x and no decorate in 6/7, not runnable on the MobX 6/7 test matrix */
    function fallbackMakeObservable(target, annotations) {
        const members = Object.entries(annotations).filter(([key]) => key in target);
        // call sites pass the mobx exports themselves (e.g. `computed`, `action`,
        // `observable`) — compare by value, not by string
        const isComputed = (annotation) => annotation === M.computed || annotation === "computed";
        const isAction = (annotation) => annotation === M.action || annotation === "action";
        const descriptorFromChain = (key) => {
            let currentProto = Object.getPrototypeOf(target);
            let descriptor;
            while (currentProto && descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(currentProto, key);
                currentProto = Object.getPrototypeOf(currentProto);
            }
            return descriptor;
        };
        members.forEach(([key, annotation]) => {
            if (isComputed(annotation)) {
                const own = Object.getOwnPropertyDescriptor(target, key);
                if (!own || typeof own.get !== "function") {
                    const chain = descriptorFromChain(key);
                    const chainGet = chain && typeof chain.get === "function" ? chain.get : null;
                    const chainSet = chain && typeof chain.set === "function" ? chain.set : null;
                    Object.defineProperty(target, key, {
                        configurable: true,
                        enumerable: chain ? chain.enumerable : false,
                        get: chainGet ? () => chainGet.call(target) : () => undefined,
                        set: chainSet ? (value) => chainSet.call(target, value) : undefined,
                    });
                }
            }
            else if (isAction(annotation)) {
                const value = target[key];
                if (typeof value === "function" &&
                    !Object.prototype.hasOwnProperty.call(target, key)) {
                    Object.defineProperty(target, key, {
                        configurable: true,
                        writable: true,
                        enumerable: false,
                        value,
                    });
                }
            }
        });
        const decorators = {};
        members.forEach(([key, annotation]) => {
            if (isComputed(annotation))
                decorators[key] = M.computed;
            else if (isAction(annotation))
                decorators[key] = M.action;
            else
                decorators[key] = M.observable;
        });
        M.decorate(target, decorators);
        return target;
    }

    /**
     * ArrayMap: an ordered key-value collection backed by an observable array.
     *
     * Exposes the full ObservableMap-compatible API (get, set, has, delete,
     * merge, forEach, keys, values, entries, intercept, etc.) while
     * maintaining insertion order via an internal observable array.
     *
     * The observable array backing allows array-like operations such as
     * `move(fromIndex, toIndex)` which directly re-orders entries via
     * splice — fully MobX reactive.
     */
    class ArrayMap {
        /** Duck-typing marker for utility code */
        _isArrayMap = true;
        /** Called after a successful `move()` — used to flag the change as dirty */
        onMove;
        /** Internal observable array: entries stored as [key, value] pairs */
        _entries = mobx.observable.array([]);
        constructor(entries) {
            if (entries && entries.length > 0) {
                this._entries.replace(entries);
            }
        }
        // ------------------------------------------------------------------
        // ObservableMap-compatible API
        // ------------------------------------------------------------------
        get size() {
            return this._entries.length;
        }
        get(key) {
            const entry = this._entries.find(([k]) => k === key);
            return entry ? entry[1] : undefined;
        }
        set(key, value) {
            const existing = this._entries.find(([k]) => k === key);
            if (existing) {
                existing[1] = value;
            }
            else {
                this._entries.push([key, value]);
            }
            return this;
        }
        has(key) {
            return this._entries.some(([k]) => k === key);
        }
        delete(key) {
            const index = this._entries.findIndex(([k]) => k === key);
            if (index !== -1) {
                this._entries.splice(index, 1);
                return true;
            }
            return false;
        }
        clear() {
            this._entries.clear();
        }
        keys() {
            return this._entries.map(([k]) => k)[Symbol.iterator]();
        }
        values() {
            return this._entries.map(([, v]) => v)[Symbol.iterator]();
        }
        entries() {
            return this._entries[Symbol.iterator]();
        }
        forEach(callbackfn, thisArg) {
            this._entries.forEach(([key, value]) => {
                callbackfn.call(thisArg, value, key, this);
            });
        }
        toJSON() {
            const result = {};
            this._entries.forEach(([key, value]) => {
                result[String(key)] = value;
            });
            return result;
        }
        toString() {
            return `[object ArrayMap]`;
        }
        merge(other) {
            if (other && typeof other === "object") {
                if (other.forEach && typeof other.forEach === "function") {
                    // ObservableMap or Map-like
                    other.forEach((value, key) => {
                        this.set(key, value);
                    });
                }
                else if (Array.isArray(other)) {
                    // Array of [key, value] pairs
                    other.forEach(([key, value]) => {
                        this.set(key, value);
                    });
                }
                else {
                    // Plain object { key: value }
                    Object.keys(other).forEach((key) => {
                        this.set(key, other[key]);
                    });
                }
            }
            return this;
        }
        replace(values) {
            this.clear();
            return this.merge(values);
        }
        get intercept() {
            return this._entries.intercept;
        }
        [Symbol.iterator]() {
            return this._entries[Symbol.iterator]();
        }
        // ------------------------------------------------------------------
        // Array-specific methods
        // ------------------------------------------------------------------
        /**
         * Move an entry from `fromIndex` to `toIndex`.
         *
         * Directly splices the internal observable array, so MobX
         * tracks the change as a single array splice operation.
         */
        move(fromIndex, toIndex) {
            mobx.runInAction(() => {
                if (fromIndex < 0 || fromIndex >= this._entries.length)
                    return;
                if (toIndex < 0 || toIndex >= this._entries.length)
                    return;
                if (fromIndex === toIndex)
                    return;
                const [entry] = this._entries.splice(fromIndex, 1);
                this._entries.splice(toIndex, 0, entry);
                this.onMove?.();
            });
        }
        /**
         * Expose the underlying observable array for direct MobX
         * observation (e.g. `observe(arr, cb)` from mobx).
         */
        toArray() {
            return this._entries;
        }
    }

    var FieldPropsEnum;
    (function (FieldPropsEnum) {
        FieldPropsEnum["key"] = "key";
        FieldPropsEnum["id"] = "id";
        FieldPropsEnum["path"] = "path";
        FieldPropsEnum["name"] = "name";
        FieldPropsEnum["fields"] = "fields";
        FieldPropsEnum["ref"] = "ref";
        FieldPropsEnum["type"] = "type";
        FieldPropsEnum["computed"] = "computed";
        FieldPropsEnum["value"] = "value";
        FieldPropsEnum["initial"] = "initial";
        FieldPropsEnum["default"] = "default";
        FieldPropsEnum["checked"] = "checked";
        FieldPropsEnum["label"] = "label";
        FieldPropsEnum["placeholder"] = "placeholder";
        FieldPropsEnum["error"] = "error";
        FieldPropsEnum["validatedWith"] = "validatedWith";
        FieldPropsEnum["validators"] = "validators";
        FieldPropsEnum["rules"] = "rules";
        FieldPropsEnum["related"] = "related";
        FieldPropsEnum["options"] = "options";
        FieldPropsEnum["extra"] = "extra";
        FieldPropsEnum["bindings"] = "bindings";
        FieldPropsEnum["hooks"] = "hooks";
        FieldPropsEnum["handlers"] = "handlers";
        FieldPropsEnum["converter"] = "converter";
        FieldPropsEnum["input"] = "input";
        FieldPropsEnum["output"] = "output";
        FieldPropsEnum["interceptors"] = "interceptors";
        FieldPropsEnum["observers"] = "observers";
        // computed
        FieldPropsEnum["disabled"] = "disabled";
        FieldPropsEnum["deleted"] = "deleted";
        FieldPropsEnum["blurred"] = "blurred";
        FieldPropsEnum["validating"] = "validating";
        FieldPropsEnum["submitting"] = "submitting";
        FieldPropsEnum["clearing"] = "clearing";
        FieldPropsEnum["resetting"] = "resetting";
        FieldPropsEnum["changed"] = "changed";
        FieldPropsEnum["touched"] = "touched";
        FieldPropsEnum["focused"] = "focused";
        FieldPropsEnum["isEmpty"] = "isEmpty";
        FieldPropsEnum["isDefault"] = "isDefault";
        FieldPropsEnum["isPristine"] = "isPristine";
        FieldPropsEnum["isDirty"] = "isDirty";
        FieldPropsEnum["isValid"] = "isValid";
        FieldPropsEnum["hasError"] = "hasError";
        // handlers
        FieldPropsEnum["onInit"] = "onInit";
        FieldPropsEnum["onSync"] = "onSync";
        FieldPropsEnum["onChange"] = "onChange";
        FieldPropsEnum["onBlur"] = "onBlur";
        FieldPropsEnum["onFocus"] = "onFocus";
        FieldPropsEnum["onToggle"] = "onToggle";
        FieldPropsEnum["onDrop"] = "onDrop";
        FieldPropsEnum["onSubmit"] = "onSubmit";
        FieldPropsEnum["onReset"] = "onReset";
        FieldPropsEnum["onClear"] = "onClear";
        FieldPropsEnum["onAdd"] = "onAdd";
        FieldPropsEnum["onDel"] = "onDel";
        FieldPropsEnum["autoFocus"] = "autoFocus";
        FieldPropsEnum["inputMode"] = "inputMode";
        FieldPropsEnum["onKeyDown"] = "onKeyDown";
        FieldPropsEnum["onKeyUp"] = "onKeyUp";
        FieldPropsEnum["class"] = "class";
        FieldPropsEnum["nullable"] = "nullable";
        FieldPropsEnum["autoComplete"] = "autoComplete";
    })(FieldPropsEnum || (FieldPropsEnum = {}));
    var AllowedFieldPropsTypes;
    (function (AllowedFieldPropsTypes) {
        AllowedFieldPropsTypes["computed"] = "computed";
        AllowedFieldPropsTypes["observable"] = "observable";
        AllowedFieldPropsTypes["editable"] = "editable";
        AllowedFieldPropsTypes["all"] = "all";
    })(AllowedFieldPropsTypes || (AllowedFieldPropsTypes = {}));
    var FieldPropsOccurrence;
    (function (FieldPropsOccurrence) {
        FieldPropsOccurrence["some"] = "some";
        FieldPropsOccurrence["every"] = "every";
    })(FieldPropsOccurrence || (FieldPropsOccurrence = {}));
    var SeparatedPropsMode;
    (function (SeparatedPropsMode) {
        SeparatedPropsMode["computed"] = "computed";
        SeparatedPropsMode["values"] = "values";
        SeparatedPropsMode["labels"] = "labels";
        SeparatedPropsMode["placeholders"] = "placeholders";
        SeparatedPropsMode["defaults"] = "defaults";
        SeparatedPropsMode["initials"] = "initials";
        SeparatedPropsMode["disabled"] = "disabled";
        SeparatedPropsMode["deleted"] = "deleted";
        SeparatedPropsMode["types"] = "types";
        SeparatedPropsMode["related"] = "related";
        SeparatedPropsMode["rules"] = "rules";
        SeparatedPropsMode["options"] = "options";
        SeparatedPropsMode["bindings"] = "bindings";
        SeparatedPropsMode["extra"] = "extra";
        SeparatedPropsMode["hooks"] = "hooks";
        SeparatedPropsMode["handlers"] = "handlers";
        SeparatedPropsMode["validatedWith"] = "validatedWith";
        SeparatedPropsMode["validators"] = "validators";
        SeparatedPropsMode["observers"] = "observers";
        SeparatedPropsMode["interceptors"] = "interceptors";
        SeparatedPropsMode["converters"] = "converters";
        SeparatedPropsMode["input"] = "input";
        SeparatedPropsMode["output"] = "output";
        SeparatedPropsMode["autoFocus"] = "autoFocus";
        SeparatedPropsMode["inputMode"] = "inputMode";
        SeparatedPropsMode["refs"] = "refs";
        SeparatedPropsMode["classes"] = "classes";
        SeparatedPropsMode["nullable"] = "nullable";
        SeparatedPropsMode["autoComplete"] = "autoComplete";
    })(SeparatedPropsMode || (SeparatedPropsMode = {}));

    const props = {
        editable: [
            FieldPropsEnum.type,
            FieldPropsEnum.value,
            FieldPropsEnum.initial,
            FieldPropsEnum.default,
            FieldPropsEnum.label,
            FieldPropsEnum.placeholder,
            FieldPropsEnum.related,
            FieldPropsEnum.options,
            FieldPropsEnum.extra,
            FieldPropsEnum.bindings,
            FieldPropsEnum.hooks,
            FieldPropsEnum.handlers,
            FieldPropsEnum.deleted,
            FieldPropsEnum.disabled,
            FieldPropsEnum.autoFocus,
            FieldPropsEnum.inputMode,
            FieldPropsEnum.ref,
            FieldPropsEnum.nullable,
            FieldPropsEnum.autoComplete,
        ],
        handlers: [
            FieldPropsEnum.onChange,
            FieldPropsEnum.onToggle,
            FieldPropsEnum.onFocus,
            FieldPropsEnum.onBlur,
            FieldPropsEnum.onDrop,
            FieldPropsEnum.onSubmit,
            FieldPropsEnum.onReset,
            FieldPropsEnum.onClear,
            FieldPropsEnum.onAdd,
            FieldPropsEnum.onDel,
        ],
        computed: [
            FieldPropsEnum.error,
            FieldPropsEnum.hasError,
            FieldPropsEnum.isValid,
            FieldPropsEnum.isDirty,
            FieldPropsEnum.isPristine,
            FieldPropsEnum.isDefault,
            FieldPropsEnum.isEmpty,
            FieldPropsEnum.focused,
            FieldPropsEnum.touched,
            FieldPropsEnum.changed,
            FieldPropsEnum.validating,
            FieldPropsEnum.submitting,
            FieldPropsEnum.resetting,
            FieldPropsEnum.clearing,
            FieldPropsEnum.blurred,
            FieldPropsEnum.deleted,
            FieldPropsEnum.disabled,
        ],
        separated: [
            SeparatedPropsMode.computed,
            SeparatedPropsMode.values,
            SeparatedPropsMode.labels,
            SeparatedPropsMode.placeholders,
            SeparatedPropsMode.defaults,
            SeparatedPropsMode.initials,
            SeparatedPropsMode.disabled,
            SeparatedPropsMode.deleted,
            SeparatedPropsMode.types,
            SeparatedPropsMode.related,
            SeparatedPropsMode.rules,
            SeparatedPropsMode.options,
            SeparatedPropsMode.bindings,
            SeparatedPropsMode.extra,
            SeparatedPropsMode.hooks,
            SeparatedPropsMode.handlers,
            SeparatedPropsMode.validatedWith,
            SeparatedPropsMode.validators,
            SeparatedPropsMode.observers,
            SeparatedPropsMode.interceptors,
            SeparatedPropsMode.converters,
            SeparatedPropsMode.input,
            SeparatedPropsMode.output,
            SeparatedPropsMode.autoFocus,
            SeparatedPropsMode.inputMode,
            SeparatedPropsMode.refs,
            SeparatedPropsMode.classes,
            SeparatedPropsMode.nullable,
            SeparatedPropsMode.autoComplete,
        ],
        functions: [
            FieldPropsEnum.computed,
            FieldPropsEnum.observers,
            FieldPropsEnum.interceptors,
            FieldPropsEnum.converter,
            FieldPropsEnum.input,
            FieldPropsEnum.output,
        ],
        validation: [
            FieldPropsEnum.rules,
            FieldPropsEnum.validators,
            FieldPropsEnum.validatedWith,
        ],
        occurrences: {
            isDirty: FieldPropsOccurrence.some,
            isPristine: FieldPropsOccurrence.every,
            isDefault: FieldPropsOccurrence.every,
            isValid: FieldPropsOccurrence.every,
            isEmpty: FieldPropsOccurrence.every,
            hasError: FieldPropsOccurrence.some,
            focused: FieldPropsOccurrence.some,
            blurred: FieldPropsOccurrence.some,
            touched: FieldPropsOccurrence.some,
            deleted: FieldPropsOccurrence.every,
            disabled: FieldPropsOccurrence.every,
            clearing: FieldPropsOccurrence.every,
            resetting: FieldPropsOccurrence.every,
        },
    };

    const getObservableMapValues = (fields) => {
        // ArrayMap duck-typing
        if (fields && fields._isArrayMap) {
            const result = [];
            fields.forEach((value) => result.push(value));
            return result;
        }
        return mobx.values(fields);
    };
    const getObservableMapKeys = (fields) => {
        // ArrayMap duck-typing
        if (fields && fields._isArrayMap) {
            return Array.from(fields.keys());
        }
        return mobx.keys(fields);
    };
    const checkObserveItem = (change) => ({ key, to, type, exec }) => change.type === type &&
        change.name === key &&
        change.newValue === to &&
        exec.apply(change, [change]);
    const checkObserve = (collection) => (change) => collection.map(checkObserveItem(change));
    const checkPropOccurrence = ({ type, data }) => {
        let $check;
        switch (type) {
            case FieldPropsOccurrence.some:
                $check = ($data) => $data.some(Boolean);
                break;
            case FieldPropsOccurrence.every:
                $check = ($data) => $data.every(Boolean);
                break;
            default: throw new Error('Occurrence not found for specified prop');
        }
        return $check(data);
    };
    const hasProps = ($type, $data) => {
        let $props;
        switch ($type) {
            case AllowedFieldPropsTypes.computed:
                $props = props.computed;
                break;
            case AllowedFieldPropsTypes.observable:
                $props = [
                    FieldPropsEnum.fields,
                    ...props.computed,
                    ...props.editable,
                ];
                break;
            case AllowedFieldPropsTypes.editable:
                $props = [
                    ...props.editable,
                    ...props.validation,
                    ...props.functions,
                    ...props.handlers,
                ];
                break;
            case AllowedFieldPropsTypes.all:
                $props = [
                    FieldPropsEnum.id,
                    FieldPropsEnum.key,
                    FieldPropsEnum.name,
                    FieldPropsEnum.path,
                    ...props.computed,
                    ...props.editable,
                    ...props.validation,
                    ...props.functions,
                    ...props.handlers,
                ];
                break;
            default:
                $props = null;
        }
        return $data.filter((x) => $props.includes(x)).length > 0;
    };
    /**
      Check Allowed Properties
    */
    const allowedProps = (type, data) => {
        if (hasProps(type, data))
            return;
        const $msg = "The selected property is not allowed";
        throw new Error(`${$msg} (${JSON.stringify(data)})`);
    };
    /**
      Throw Error if undefined Fields
    */
    const throwError = (path, fields, msg = null) => {
        if (fields != null)
            return;
        const $msg = msg == null ? "The selected field is not defined" : msg;
        throw new Error(`${$msg} (${path})`);
    };
    const pathToStruct = (path) => {
        let struct;
        struct = path.replace(/\.\d+($|\.)/g, "[].");
        struct = struct.replace("..", ".");
        struct = struct.replace(/^\.+|\.+$/g, "");
        return struct;
    };
    const isArrayFromStruct = (struct, structPath) => {
        if (isArrayOfStrings(struct))
            return !!struct
                .filter((s) => s.startsWith(structPath))
                .find((s) => s.substring(structPath.length) === "[]")
                || (struct?.find((e) => e === structPath)?.endsWith('[]') ?? false);
        else
            return false;
    };
    const hasSome = (obj, keys) => keys.some((key) => lodash.has(obj, key));
    const isEmptyArray = (field) => lodash.isEmpty(field) && Array.isArray(field);
    const isArrayOfStrings = (struct) => Array.isArray(struct) && struct.every((s) => typeof s === 'string');
    const isArrayOfObjects = (fields) => Array.isArray(fields) && fields.every((f) => lodash.isPlainObject(f));
    const getKeys = (fields) => fields ? [...new Set(Object.values(fields).flatMap((values) => values ? Object.keys(values) : []))] : [];
    const hasUnifiedProps = ({ fields }) => !isArrayOfStrings({ fields }) && hasProps(AllowedFieldPropsTypes.editable, getKeys(fields));
    const hasSeparatedProps = (initial) => hasSome(initial, props.separated) || hasSome(initial, props.validation);
    const allowNested = (field, strictProps) => field !== null && typeof field === 'object' &&
        !(field instanceof Date) &&
        !lodash.has(field, FieldPropsEnum.fields) &&
        !lodash.has(field, FieldPropsEnum.class) &&
        (!hasSome(field, [
            ...props.editable,
            ...props.handlers,
            ...props.validation,
            ...props.functions,
        ]) || strictProps);
    const parseIntKeys = (fields) => Array.from(getObservableMapKeys(fields)).map(Number);
    const hasIntKeys = (fields) => parseIntKeys(fields).every((x) => Number.isInteger(x));
    const maxKey = (fields) => {
        const keys = parseIntKeys(fields);
        const maxVal = keys.length ? Math.max(...keys) : undefined;
        return maxVal === void 0 ? 0 : maxVal + 1;
    };
    let _idCounter = 0;
    const _localUniqueId = (prefix) => `${prefix}${++_idCounter}`;
    const uniqueId = (field) => _localUniqueId([field.path.replace(/\./g, "-"), "--"].join(""));
    const isEvent = (obj) => {
        if (obj == null || typeof Event === "undefined")
            return false;
        return obj instanceof Event || obj.target != null;
    };
    const hasFiles = ($) => !!$?.target?.files && $.target.files.length !== 0;
    const isBool = ($, val) => typeof val === 'boolean' && typeof $.target.checked === 'boolean';
    const $try = (...args) => {
        for (const val of args) {
            if (val !== undefined)
                return val;
        }
        return undefined;
    };

    const defaultValue = ({ type = undefined, value = undefined, nullable = undefined, isEmptyArray = false, fallbackValueOption = "", }) => {
        if (Array.isArray(value) || isEmptyArray)
            return [];
        if (nullable || value instanceof Date || type === "date" || type === "datetime-local")
            return null;
        if (typeof value === 'number' || type === "number")
            return 0;
        if (typeof value === 'boolean' || type === "checkbox")
            return false;
        if (typeof value === 'string' || type === "file")
            return "";
        return fallbackValueOption;
    };
    const parsePath = (path) => {
        let $path = String(path ?? '');
        $path = $path.replace(/\[/g, ".");
        $path = $path.replace(/\]/g, "");
        return $path;
    };
    const parseInput = (input, { fallbackValueOption = "", type, isEmptyArray, separated, unified, fallback }) => input($try(separated, unified, fallback, defaultValue({
        fallbackValueOption,
        type,
        isEmptyArray,
    })));
    const parseArrayProp = (val, prop, removeNullishValuesInArrays) => {
        const values = Object.values(val);
        const isValProp = [
            FieldPropsEnum.value,
            FieldPropsEnum.initial,
            FieldPropsEnum.default,
        ].includes(prop);
        if (removeNullishValuesInArrays && isValProp) {
            return values.filter(v => v !== null && v !== undefined && v !== "");
        }
        return values;
    };
    const parseCheckArray = (field, value, prop, removeNullishValuesInArrays) => {
        if (field.incremental && value !== null && typeof value === 'object' && lodash.isEmpty(value))
            return [];
        return field.hasIncrementalKeys ? parseArrayProp(value, prop, removeNullishValuesInArrays) : value;
    };
    const parseCheckOutput = (field, prop, retrieveNullifiedEmptyStrings = false) => {
        if (prop === FieldPropsEnum.value || prop.startsWith("value.")) {
            const base = field.$output ? field.$output(field[FieldPropsEnum.value]) : field[FieldPropsEnum.value];
            const value = prop.startsWith("value.") ? lodash.get(base, prop.substring(6)) : base;
            if (typeof value === 'string' && lodash.isEmpty(value) && retrieveNullifiedEmptyStrings)
                return null;
            return value;
        }
        return field[prop];
    };
    const defineFieldsFromStruct = (struct, add = false) => struct.reduceRight(($, name) => {
        const obj = {};
        if (name.endsWith("[]")) {
            const val = add ? [$] : [];
            obj[name.replace(/\[\]$/, "")] = val;
            return obj;
        }
        // no brakets
        const prev = struct[struct.indexOf(name) - 1];
        const stop = !!prev && prev.endsWith("[]") && struct[struct.length - 1] === name;
        if (!add && stop)
            return obj;
        obj[name] = $;
        return obj;
    }, {});
    const handleFieldsArrayOfStrings = ($fields, add = false) => {
        let fields = $fields;
        // handle array with field struct (strings)
        if (isArrayOfStrings(fields)) {
            fields = lodash.transform(fields, ($obj, $) => {
                const pathStruct = $.split(".");
                // as array of strings (with empty values)
                if (!pathStruct.length)
                    return Object.assign($obj, { [$]: "" });
                // define flat or nested fields from pathStruct
                return lodash.merge($obj, defineFieldsFromStruct(pathStruct, add));
            }, {});
        }
        return fields;
    };
    const handleFieldsArrayOfObjects = ($fields) => {
        let fields = $fields;
        // handle array of objects (with unified props)
        if (isArrayOfObjects(fields)) {
            fields = lodash.transform(fields, ($obj, field) => {
                if (hasUnifiedProps({ fields: { field } }) && !lodash.has(field, FieldPropsEnum.name))
                    return undefined;
                return Object.assign($obj, { [field.name]: field });
            }, {});
        }
        return fields;
    };
    const handleFieldsNested = (fields, strictProps = true) => lodash.transform(fields, (obj, field, key) => {
        if (allowNested(field, strictProps)) {
            // define nested field
            return Object.assign(obj, {
                [key]: {
                    fields: isEmptyArray(field) ? [] : handleFieldsNested(field),
                },
            });
        }
        return Object.assign(obj, { [key]: field });
    }, {});
    /* mapNestedValuesToUnifiedValues

    FROM:

    {
      street: '123 Fake St.',
      zip: '12345',
    }

    TO:

    [{
      name: 'street'
      value: '123 Fake St.',
    }, {
      name: 'zip'
      value: '12345',
    }]

    */
    const mapNestedValuesToUnifiedValues = (data) => lodash.isPlainObject(data)
        ? Object.entries(data).map(([name, value]) => ({ value, name }))
        : undefined;
    /* reduceValuesToUnifiedFields

    FROM:

    {
      name: 'fatty',
      address: {
        street: '123 Fake St.',
        zip: '12345',
      },
    };

    TO:

    {
      name: {
        value: 'fatty',
        fields: undefined
      },
      address: {
        value: {
          street: '123 Fake St.',
          zip: '12345'
        },
        fields: [ ... ]
      },
    };

    */
    const reduceValuesToUnifiedFields = (values) => lodash.transform(values, (obj, value, key) => Object.assign(obj, {
        [key]: {
            value,
            fields: mapNestedValuesToUnifiedValues(value),
        },
    }), {});
    /*
      Fallback Unified Props to Separated Mode
    */
    const handleFieldsPropsFallback = (fields, initial, fallback) => {
        if (!lodash.has(initial, SeparatedPropsMode.values))
            return fields;
        // if the 'values' object is passed in constructor
        // then update the fields definitions
        let { values } = initial;
        if (hasUnifiedProps({ fields: initial.fields })) {
            values = reduceValuesToUnifiedFields(values);
        }
        return lodash.merge(fields, lodash.transform(values, (result, v, k) => {
            if (Array.isArray(fields[k]))
                result[k] = v;
            if (!(k in fields) && (!isNaN(Number(k)) || fallback))
                result[k] = v;
        }, {}));
    };
    const mergeSchemaDefaults = (fields, validator) => {
        if (validator) {
            const schema = lodash.get(validator.plugins, "ajv.config.schema");
            if (lodash.isEmpty(fields) && schema && !!schema.properties) {
                lodash.each(schema.properties, (prop, key) => {
                    lodash.set(fields, key, {
                        value: prop.default,
                        label: prop.title,
                    });
                });
            }
        }
        return fields;
    };
    const prepareFieldsData = (initial, strictProps = true, fallback = true) => {
        let fields = lodash.merge(handleFieldsArrayOfStrings(initial.fields, false), handleFieldsArrayOfStrings(initial.struct, false));
        fields = handleFieldsArrayOfObjects(fields);
        fields = handleFieldsPropsFallback(fields, initial, fallback);
        fields = handleFieldsNested(fields, strictProps);
        return fields;
    };
    const pathToFieldsTree = (struct, path, n = 0, add = false) => {
        const $struct = (Array.isArray(struct) ? struct : Object.values(struct)).filter((item) => typeof item === 'string');
        const structPath = pathToStruct(path);
        const structArray = $struct.filter((item) => item.startsWith(structPath));
        const $tree = handleFieldsArrayOfStrings(structArray, add);
        const $structPath = structPath.replace(/\[\]/g, `[${n}]`);
        const fields = handleFieldsNested(lodash.get($tree, $structPath));
        // fix issues #614 & #615
        $struct.length && $struct
            .filter(s => s.startsWith(path + '[]'))
            .map(s => s.substring((path + '[].').length))
            .filter(s => s.endsWith('[]'))
            .map(s => s.substring(0, s.length - 2))
            .forEach(s => {
            const ss = s.split('.');
            let t = fields[0]?.fields;
            for (let i = 0; i < ss.length; i++) {
                t = t?.[ss[i]]?.[FieldPropsEnum.fields];
                if (!t)
                    break;
            }
            if (t)
                delete t[0];
        });
        return fields;
    };

    var OptionsEnum;
    (function (OptionsEnum) {
        OptionsEnum["uniqueId"] = "uniqueId";
        OptionsEnum["fallback"] = "fallback";
        OptionsEnum["fallbackValue"] = "fallbackValue";
        OptionsEnum["defaultGenericError"] = "defaultGenericError";
        OptionsEnum["submitThrowsError"] = "submitThrowsError";
        OptionsEnum["showErrorsOnInit"] = "showErrorsOnInit";
        OptionsEnum["showErrorsOnSubmit"] = "showErrorsOnSubmit";
        OptionsEnum["showErrorsOnBlur"] = "showErrorsOnBlur";
        OptionsEnum["showErrorsOnChange"] = "showErrorsOnChange";
        OptionsEnum["showErrorsOnClear"] = "showErrorsOnClear";
        OptionsEnum["showErrorsOnReset"] = "showErrorsOnReset";
        OptionsEnum["validateOnInit"] = "validateOnInit";
        OptionsEnum["validateOnSubmit"] = "validateOnSubmit";
        OptionsEnum["validateOnBlur"] = "validateOnBlur";
        OptionsEnum["validateOnChange"] = "validateOnChange";
        OptionsEnum["validateOnChangeAfterInitialBlur"] = "validateOnChangeAfterInitialBlur";
        OptionsEnum["validateOnChangeAfterSubmit"] = "validateOnChangeAfterSubmit";
        OptionsEnum["validateDisabledFields"] = "validateDisabledFields";
        OptionsEnum["validateDeletedFields"] = "validateDeletedFields";
        OptionsEnum["validatePristineFields"] = "validatePristineFields";
        OptionsEnum["validateTrimmedValue"] = "validateTrimmedValue";
        OptionsEnum["validateOnClear"] = "validateOnClear";
        OptionsEnum["validateOnReset"] = "validateOnReset";
        OptionsEnum["strictSet"] = "strictSet";
        OptionsEnum["strictUpdate"] = "strictUpdate";
        OptionsEnum["strictDelete"] = "strictDelete";
        OptionsEnum["strictSelect"] = "strictSelect";
        OptionsEnum["softDelete"] = "softDelete";
        OptionsEnum["retrieveOnlyDirtyFieldsValues"] = "retrieveOnlyDirtyFieldsValues";
        OptionsEnum["retrieveOnlyEnabledFieldsValues"] = "retrieveOnlyEnabledFieldsValues";
        OptionsEnum["retrieveOnlyEnabledFieldsErrors"] = "retrieveOnlyEnabledFieldsErrors";
        OptionsEnum["retrieveNullifiedEmptyStrings"] = "retrieveNullifiedEmptyStrings";
        OptionsEnum["removeNullishValuesInArrays"] = "removeNullishValuesInArrays";
        OptionsEnum["preserveDeletedFieldsValues"] = "preserveDeletedFieldsValues";
        OptionsEnum["autoTrimValue"] = "autoTrimValue";
        OptionsEnum["autoParseNumbers"] = "autoParseNumbers";
        OptionsEnum["validationDebounceWait"] = "validationDebounceWait";
        OptionsEnum["validationDebounceOptions"] = "validationDebounceOptions";
        OptionsEnum["stopValidationOnError"] = "stopValidationOnError";
        OptionsEnum["validationPluginsOrder"] = "validationPluginsOrder";
        OptionsEnum["resetValidationBeforeValidate"] = "resetValidationBeforeValidate";
        OptionsEnum["applyInputConverterOnInit"] = "applyInputConverterOnInit";
        OptionsEnum["applyInputConverterOnSet"] = "applyInputConverterOnSet";
        OptionsEnum["applyInputConverterOnUpdate"] = "applyInputConverterOnUpdate";
        OptionsEnum["bubbleUpErrorMessages"] = "bubbleUpErrorMessages";
    })(OptionsEnum || (OptionsEnum = {}));

    var ValidationHooks;
    (function (ValidationHooks) {
        ValidationHooks["onSuccess"] = "onSuccess";
        ValidationHooks["onError"] = "onError";
    })(ValidationHooks || (ValidationHooks = {}));

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
            lodash.forIn(fields, (field, key) => {
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
                const t = lodash.get(initial[prop], struct);
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
                $value: lodash.get(initial[SeparatedPropsMode.values], path),
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
            const $opt = lodash.merge({}, opt, { path: this.path });
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
                    .then(mobx.action(() => (this.$submitting = false)))
                    .catch(mobx.action((err) => {
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
            return lodash.transform($fields, (check, field) => {
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
            if (!lodash.isPlainObject(fields)) {
                throw new Error("The update() method accepts only plain objects.");
            }
            this.deepUpdate(prepareFieldsData({ fields }, this.state.strict), undefined, undefined, fields);
        }
        deepUpdate(fields, path = "", recursion = true, raw) {
            lodash.each(fields, (field, key) => {
                const $key = lodash.has(field, FieldPropsEnum.name) ? field.name : key;
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
                                separated: lodash.get(raw, $path),
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
                    if (lodash.has(field, FieldPropsEnum.fields) && field.fields != null) {
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
            const _result = lodash.transform(_fieldsArr, (obj, field) => {
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
                lodash.each(prop, ($prop) => Object.assign(obj[field.key], {
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
                    (lodash.isPlainObject(data) && !isPlain);
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
                    lodash.set(this, `$${prop}`, data);
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
            lodash.each(data, ($val, $key) => {
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
                lodash.each(obj, (values) => this.update({
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
            const payloadKeys = lodash.isPlainObject(obj)
                ? Object.keys(obj).filter((k) => k !== FieldPropsEnum.key)
                : [];
            const isValuesPayload = !!nestedFields &&
                lodash.isPlainObject(obj) &&
                !lodash.has(obj, FieldPropsEnum.value) &&
                !lodash.has(obj, FieldPropsEnum.fields) &&
                payloadKeys.length > 0 &&
                (!lodash.has(obj, FieldPropsEnum.name) ||
                    Object.prototype.hasOwnProperty.call(nestedFields, FieldPropsEnum.name));
            if (lodash.has(obj, FieldPropsEnum.key))
                key = obj.key;
            if (!isValuesPayload && lodash.has(obj, FieldPropsEnum.name))
                key = obj.name;
            if (!key)
                key = maxKey(this.fields);
            const $path = ($key) => [this.path, $key].join(".").replace(/^\.+/, "");
            const field = this.initField(key, $path(key), isValuesPayload ? tree[0] : lodash.merge(tree[0], obj));
            const hasValues = lodash.has(obj, FieldPropsEnum.value) || lodash.has(obj, FieldPropsEnum.fields);
            if (isValuesPayload) {
                lodash.each(payloadKeys, (fieldName) => {
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
                    lodash.isPlainObject(obj) &&
                    !hasSome(obj, [FieldPropsEnum.key, FieldPropsEnum.name])) {
                    lodash.each(obj, (val, fieldName) => {
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
            lodash.each(this.state.disposers.interceptor, dispose);
            lodash.each(this.state.disposers.observer, dispose);
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

    class Validator {
        promises = [];
        form = null;
        drivers = {};
        plugins = {
            vjf: undefined,
            dvr: undefined,
            ajv: undefined,
            yup: undefined,
            zod: undefined,
            joi: undefined,
            valibot: undefined,
            vinejs: undefined,
        };
        error = null;
        constructor(obj) {
            makeObservable(this, {
                error: mobx.observable,
                validate: mobx.action,
                validateField: mobx.action,
            });
            this.form = obj.form;
            Object.assign(this.plugins, obj.plugins);
            this.initDrivers();
        }
        initDrivers() {
            Object.entries(this.plugins).forEach(([key, plugin]) => {
                this.drivers[key] = (plugin && plugin.class) &&
                    new (plugin.class)({
                        config: plugin.config,
                        state: this.form.state,
                        promises: this.promises,
                    });
            });
        }
        validate(opt, obj) {
            const path = $try(opt?.path, opt);
            const instance = $try(opt?.field, this.form.select(path, null, false), this.form);
            const related = $try(opt?.related, obj?.related, true);
            const showErrors = $try(opt?.showErrors, obj?.showErrors, false);
            instance.$validating = true;
            instance.$validated += 1;
            this.error = null;
            return new Promise((resolve) => {
                // validate instance (form or filed)
                if (instance.path || typeof path === 'string') {
                    this.validateField({
                        field: instance,
                        showErrors,
                        related,
                        path,
                    });
                }
                // validate nested fields
                instance.each((field) => this.validateField({
                    path: field.path,
                    field: field,
                    showErrors,
                    related,
                }));
                // wait all promises
                resolve(Promise.all(this.promises.splice(0)));
            })
                .then(mobx.action(() => {
                instance.$validating = false;
                instance.$clearing = false;
                instance.$resetting = false;
            }))
                .catch(mobx.action((err) => {
                instance.$validating = false;
                instance.$clearing = false;
                instance.$resetting = false;
                throw err;
            }))
                .then(() => instance);
        }
        validateField({ showErrors = false, related = false, field = null, path, }) {
            const instance = field || this.form.select(path);
            const { options } = this.form.state;
            // check if the field is a valid instance
            if (!instance.path)
                throw new Error("Validation Error: Invalid Field Instance");
            // do not validate soft deleted fields
            if (instance.deleted && !options.get(OptionsEnum.validateDeletedFields, instance))
                return;
            // do not validate disabled fields
            if (instance.disabled && !options.get(OptionsEnum.validateDisabledFields, instance))
                return;
            // do not validate pristine fields
            if (instance.isPristine && !options.get(OptionsEnum.validatePristineFields, instance))
                return;
            // reset validation before validate
            if (options.get(OptionsEnum.resetValidationBeforeValidate, instance))
                instance.resetValidation();
            // trim string value before validation
            if (options.get(OptionsEnum.validateTrimmedValue, instance))
                instance.trim();
            // get stop on error
            const stopOnError = options.get(OptionsEnum.stopValidationOnError, instance);
            // get validation plugin order
            const validationPluginOrder = options.get(OptionsEnum.validationPluginsOrder, instance);
            const drivers = validationPluginOrder
                ? validationPluginOrder.map((n) => this.drivers[n])
                : this.drivers;
            // validate with all enabled drivers
            lodash.each(drivers, (driver) => {
                driver && driver.validate(instance);
                if (stopOnError && instance.hasError)
                    return;
            });
            // send error to the view
            instance.showErrors(showErrors, false);
            // related validation
            if (related)
                this.validateRelatedFields(instance, showErrors);
        }
        /**
          Validate 'related' fields if specified
          and related validation allowed (recursive)
        */
        validateRelatedFields(field, showErrors) {
            if (!field.related || !field.related.length)
                return;
            field.related.map((path) => this.validateField({
                related: false,
                showErrors,
                path,
            }));
        }
    }

    class Options {
        options = {
            uniqueId,
            fallback: true,
            fallbackValue: "",
            defaultGenericError: null,
            submitThrowsError: true,
            showErrorsOnInit: false,
            showErrorsOnSubmit: true,
            showErrorsOnBlur: true,
            showErrorsOnChange: true,
            showErrorsOnClear: false,
            showErrorsOnReset: true,
            validateOnInit: true,
            validateOnSubmit: true,
            validateOnBlur: true,
            validateOnChange: false,
            validateOnChangeAfterInitialBlur: false,
            validateOnChangeAfterSubmit: false,
            validateOnClear: false,
            validateOnReset: false,
            validateDisabledFields: false,
            validateDeletedFields: false,
            validatePristineFields: true,
            strictSet: false,
            strictUpdate: false,
            strictDelete: true,
            strictSelect: true,
            softDelete: false,
            retrieveOnlyDirtyFieldsValues: false,
            retrieveOnlyEnabledFieldsValues: false,
            retrieveOnlyEnabledFieldsErrors: false,
            retrieveNullifiedEmptyStrings: false,
            autoTrimValue: false,
            autoParseNumbers: false,
            removeNullishValuesInArrays: false,
            preserveDeletedFieldsValues: false,
            validationDebounceWait: 250,
            validationDebounceOptions: {
                leading: false,
                trailing: true,
            },
            stopValidationOnError: false,
            validationPluginsOrder: undefined,
            resetValidationBeforeValidate: true,
            validateTrimmedValue: false,
            applyInputConverterOnInit: true,
            applyInputConverterOnSet: true,
            applyInputConverterOnUpdate: true,
            bubbleUpErrorMessages: false,
        };
        constructor() {
            makeObservable(this, {
                options: mobx.observable,
                set: mobx.action,
            });
        }
        get(key = '', field = null) {
            // handle field option
            if (lodash.has(field, "path")) {
                if (lodash.has(field.$options, key)) {
                    return field.$options[key];
                }
            }
            // fallback on global form options
            if (key)
                return lodash.get(this.options, key);
            return mobx.toJS(this.options);
        }
        set(options) {
            mobx.set(this.options, options);
        }
    }

    class Bindings {
        templates = {
        // default: ({ field, form, props, keys, $try }) => ({
        //   [keys.id]: $try(props.id, field.id),
        // }),
        };
        rewriters = {
            default: {
                id: FieldPropsEnum.id,
                name: FieldPropsEnum.name,
                type: FieldPropsEnum.type,
                value: FieldPropsEnum.value,
                checked: FieldPropsEnum.checked,
                label: FieldPropsEnum.label,
                placeholder: FieldPropsEnum.placeholder,
                disabled: FieldPropsEnum.disabled,
                autoComplete: FieldPropsEnum.autoComplete,
                onChange: FieldPropsEnum.onChange,
                onBlur: FieldPropsEnum.onBlur,
                onFocus: FieldPropsEnum.onFocus,
                autoFocus: FieldPropsEnum.autoFocus,
                inputMode: FieldPropsEnum.inputMode,
                onKeyUp: FieldPropsEnum.onKeyUp,
                onKeyDown: FieldPropsEnum.onKeyDown,
            },
        };
        register(bindings) {
            lodash.each(bindings, (val, key) => {
                if ((typeof val === 'function'))
                    lodash.merge(this.templates, { [key]: val });
                if (lodash.isPlainObject(val))
                    lodash.merge(this.rewriters, { [key]: val });
            });
            return this;
        }
        load(field, name = FieldPropsEnum.default, props) {
            const args = ({
                keys: lodash.get(this.rewriters, FieldPropsEnum.default),
                form: field.state.form,
                field,
                props,
                $try,
            });
            if (lodash.has(this.templates, name)) {
                return lodash.get(this.templates, name)(args);
            }
            if (lodash.has(this.rewriters, name)) {
                const $bindings = {};
                lodash.each(lodash.get(this.rewriters, name), ($v, $k) => lodash.merge($bindings, { [$v]: $try(props[$k], field[$k]) }));
                return $bindings;
            }
            if (lodash.has(this.templates, name)) {
                return lodash.get(this.templates, name)(args);
            }
            if (name === FieldPropsEnum.default) {
                const $bindings = {};
                lodash.each(lodash.get(this.rewriters, FieldPropsEnum.default), ($v, $k) => lodash.merge($bindings, { [$v]: $try(props[$k], field[$k]) }));
                return $bindings;
            }
            throw new Error(`Bindings: template or rewriter "${name}" does not exist \u2014 register it or use the "default" binding`);
        }
    }

    var RuntimeMode;
    (function (RuntimeMode) {
        RuntimeMode["mixed"] = "mixed";
        RuntimeMode["unified"] = "unified";
        RuntimeMode["separated"] = "separated";
    })(RuntimeMode || (RuntimeMode = {}));

    class State {
        mode = RuntimeMode.mixed;
        strict = false;
        form;
        options;
        bindings;
        $extra;
        $struct = [];
        disposers = {
            interceptor: {},
            observer: {},
        };
        initial = {
            props: {},
            fields: {},
        };
        current = {
            props: {},
            fields: {},
        };
        constructor({ form, initial, options, bindings }) {
            this.set("form", form);
            this.initProps(initial);
            this.options = new Options();
            this.options.set(options);
            this.bindings = new Bindings();
            this.bindings.register(bindings);
            this.observeOptions();
        }
        initProps(initial = {}) {
            const pickKeys = [
                ...props.editable,
                ...props.separated,
                ...props.validation,
                ...props.functions,
                ...props.handlers,
            ];
            const initialProps = Object.fromEntries(Object.entries(initial).filter(([k]) => pickKeys.includes(k)));
            this.set("initial", "props", initialProps);
            const $unified = hasUnifiedProps(initial);
            const $separated = hasSeparatedProps(initial);
            if (($separated || isArrayOfStrings(initial.fields)) && !$unified) {
                const struct = $try(initial.struct, initial.fields);
                this.struct(struct);
                this.strict = true;
                this.mode = RuntimeMode.separated;
                return;
            }
            this.struct(initial.struct);
            this.mode = RuntimeMode.unified;
        }
        /**
          Get/Set Fields Structure
        */
        struct(data = null) {
            if (data)
                this.$struct = data;
            return this.$struct;
        }
        /**
          Get Props/Fields
        */
        get(type, subtype) {
            return this[type][subtype];
        }
        /**
          Set Props/Fields
        */
        set(type, subtype, state = null) {
            if (type === "form") {
                // subtype is the form here
                this.form = subtype;
            }
            if (type === "initial") {
                Object.assign(this.initial[subtype], state);
                Object.assign(this.current[subtype], state);
            }
            if (type === "current") {
                Object.assign(this.current[subtype], state);
            }
        }
        extra(data = null) {
            if (typeof data === 'string')
                return lodash.get(this.$extra, data);
            if (data === null)
                return this.$extra;
            this.$extra = data;
            return null;
        }
        observeOptions() {
            // Fix Issue #201
            mobx.observe(this.options.options, checkObserve([
                {
                    // start observing fields validateOnChange
                    type: "update",
                    key: OptionsEnum.validateOnChange,
                    to: true,
                    exec: () => this.form.each((field) => field.observeValidationOnChange()),
                },
                {
                    // stop observing fields validateOnChange
                    type: "update",
                    key: OptionsEnum.validateOnChange,
                    to: false,
                    exec: () => this.form.each((field) => {
                        if (typeof field.disposeValidationOnChange !== "function")
                            return;
                        field.disposeValidationOnChange();
                    }),
                },
                {
                    // start observing fields validateOnBlur
                    type: "update",
                    key: OptionsEnum.validateOnBlur,
                    to: true,
                    exec: () => this.form.each((field) => field.observeValidationOnBlur()),
                },
                {
                    // stop observing fields validateOnBlur
                    type: "update",
                    key: OptionsEnum.validateOnBlur,
                    to: false,
                    exec: () => this.form.each((field) => {
                        if (typeof field.disposeValidationOnBlur !== "function")
                            return;
                        field.disposeValidationOnBlur();
                    }),
                },
            ]));
        }
    }

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
        $validatedWith: applyFieldPropFunc(instance, props.$validatedWith ?? data?.validatedWith ?? FieldPropsEnum.value),
        $bindings: applyFieldPropFunc(instance, props.$bindings ?? data?.bindings ?? FieldPropsEnum.default),
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
    const setupDefaultProp = (instance, data, props, update, { isEmptyArray, fallbackValueOption, }) => parseInput((val) => val, {
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
    class Field extends Base {
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
            makeObservable(this, {
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
            this.debouncedValidation = lodash.debounce(this.validate, this.state.options.get(OptionsEnum.validationDebounceWait, this), this.state.options.get(OptionsEnum.validationDebounceOptions, this));
            this.observeValidationOnBlur();
            this.observeValidationOnChange();
            this.initMOBXEvent(FieldPropsEnum.observers);
            this.initMOBXEvent(FieldPropsEnum.interceptors);
            // setup hooks & handlers from initialization methods
            mobx.runInAction(() => Object.assign(this.$hooks, this.hooks?.apply(this, [this])));
            mobx.runInAction(() => Object.assign(this.$handlers, this.handlers?.apply(this, [this])));
            this.execHook(FieldPropsEnum.onInit);
            // handle Field onChange Hook
            mobx.autorun(() => this.changed && this.execHook(FieldPropsEnum.onChange));
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
                this.state.options.get(OptionsEnum.autoTrimValue, this)) {
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
            if (!this.state.options.get(OptionsEnum.autoParseNumbers, this))
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
                ? propGetter(this, FieldPropsEnum.value)
                : this.getComputedProp(FieldPropsEnum.value);
        }
        get initial() {
            return this.$initial
                ? mobx.toJS(this.$initial)
                : this.getComputedProp(FieldPropsEnum.initial);
        }
        get default() {
            return this.$default
                ? mobx.toJS(this.$default)
                : this.getComputedProp(FieldPropsEnum.default);
        }
        set initial(val) {
            this.$initial = val;
        }
        set default(val) {
            this.$default = val;
        }
        get nullable() {
            return propGetter(this, FieldPropsEnum.nullable);
        }
        get autoComplete() {
            return propGetter(this, FieldPropsEnum.autoComplete);
        }
        get ref() {
            return propGetter(this, FieldPropsEnum.ref);
        }
        get extra() {
            return propGetter(this, FieldPropsEnum.extra);
        }
        get autoFocus() {
            return propGetter(this, FieldPropsEnum.autoFocus);
        }
        get inputMode() {
            return propGetter(this, FieldPropsEnum.inputMode);
        }
        get type() {
            return propGetter(this, FieldPropsEnum.type);
        }
        get label() {
            return propGetter(this, FieldPropsEnum.label);
        }
        get placeholder() {
            return propGetter(this, FieldPropsEnum.placeholder);
        }
        get options() {
            return propGetter(this, FieldPropsEnum.options);
        }
        get bindings() {
            return propGetter(this, FieldPropsEnum.bindings);
        }
        get related() {
            return propGetter(this, FieldPropsEnum.related);
        }
        get disabled() {
            return propGetter(this, FieldPropsEnum.disabled);
        }
        get rules() {
            return propGetter(this, FieldPropsEnum.rules);
        }
        get validators() {
            return propGetter(this, FieldPropsEnum.validators);
        }
        get validatedWith() {
            return propGetter(this, FieldPropsEnum.validatedWith);
        }
        get validatedValue() {
            return parseCheckOutput(this, this.validatedWith);
        }
        get error() {
            if (this.showError === false)
                return null;
            return this.errorAsync || this.errorSync || this.firstError() || null;
        }
        get hasError() {
            return (this.checkValidationErrors || this.check(FieldPropsEnum.hasError, true));
        }
        get isValid() {
            return (!this.checkValidationErrors && this.check(FieldPropsEnum.isValid, true));
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
                return this.check(FieldPropsEnum.isEmpty, true);
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
                ? this.check(FieldPropsEnum.focused, true)
                : this.$focused;
        }
        get blurred() {
            return this.hasNestedFields
                ? this.check(FieldPropsEnum.blurred, true)
                : this.$blurred;
        }
        get touched() {
            return this.hasNestedFields
                ? this.check(FieldPropsEnum.touched, true)
                : this.$touched;
        }
        get deleted() {
            // an explicit flag on the field itself always wins
            if (this.$deleted)
                return true;
            return this.hasNestedFields ? this.check(FieldPropsEnum.deleted, true) : false;
        }
        /* ------------------------------------------------------------------ */
        /* EVENTS HANDLERS */
        sync = mobx.action((e, v = null) => {
            const $get = ($) => isBool($, this.value) ? $.target.checked : $.target.value;
            // assume "v" or "e" are the values
            if (lodash.isNil(e) || lodash.isNil(e.target)) {
                if (!lodash.isNil(v) && !lodash.isNil(v.target)) {
                    v = $get(v); // eslint-disable-line
                }
                this.value = $try(e, v);
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
            : this.execHandler(FieldPropsEnum.onChange, args, this.sync, FieldPropsEnum.onSync);
        onChange = this.onSync;
        onToggle = (...args) => this.execHandler(FieldPropsEnum.onToggle, args, this.sync);
        onBlur = (...args) => this.execHandler(FieldPropsEnum.onBlur, args, mobx.action(() => {
            this.$focused = false;
            this.$blurred = true;
        }));
        onFocus = (...args) => this.execHandler(FieldPropsEnum.onFocus, args, mobx.action(() => {
            this.$focused = true;
            this.$touched = true;
        }));
        onDrop = (...args) => this.execHandler(FieldPropsEnum.onDrop, args, mobx.action(() => {
            const e = args[0];
            let files = null;
            if (isEvent(e) && hasFiles(e)) {
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
        onKeyDown = (...args) => this.execHandler(FieldPropsEnum.onKeyDown, args);
        onKeyUp = (...args) => this.execHandler(FieldPropsEnum.onKeyUp, args);
        setupField($key, $path, _$struct, $data, $props, update) {
            this.key = $key;
            this.path = $path;
            this.id = this.state.options.get(OptionsEnum.uniqueId)?.apply(this, [this]);
            const fallbackValueOption = this.state.options.get(OptionsEnum.fallbackValue, this);
            const applyInputConverterOnInit = this.state.options.get(OptionsEnum.applyInputConverterOnInit, this);
            const struct = this.state.struct();
            const structPath = pathToStruct(this.path ?? "");
            const isEmptyArray = isArrayFromStruct(struct, structPath);
            const { $type, $input, $output, $converter, $converters, $computed } = $props;
            if (lodash.isPlainObject($data)) {
                const { type, input, output, converter, converters, computed } = $data;
                this.name = $data.name ?? String($key);
                this.$type = $type || type || "text";
                this.$converter = $try($converter, $converters, converter, converters, this.$converter);
                this.$input = $try($input, input, this.$input);
                this.$output = $try($output, output, this.$output);
                const value = parseInput(applyInputConverterOnInit ? this.$input : (val) => val, {
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
                this.$initial = parseInput((val) => val, {
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
            this.$converter = $try($converter, $converters, this.$converter);
            this.$input = $try($input, this.$input);
            this.$output = $try($output, this.$output);
            const value = parseInput(applyInputConverterOnInit ? this.$input : (val) => val, {
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
            this.$initial = parseInput((val) => val, {
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
                return key === FieldPropsEnum.value
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
            deep && this.each((field) => field.clear(deep));
            this.state.options.get(OptionsEnum.validateOnClear, this)
                ? this.validate({
                    showErrors: this.state.options.get(OptionsEnum.showErrorsOnClear, this),
                })
                : this.resetValidation(deep);
        }
        reset(deep = true, execHook = true) {
            execHook && this.execHook(FieldPropsEnum.onReset);
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
            this.state.options.get(OptionsEnum.validateOnReset, this)
                ? this.validate({
                    showErrors: this.state.options.get(OptionsEnum.showErrorsOnReset, this),
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
            if (opt.get(OptionsEnum.validateOnBlur, this)) {
                this.disposeValidationOnBlur = mobx.observe(this, "$focused", (change) => change.newValue === false &&
                    this.debouncedValidation({
                        showErrors: opt.get(OptionsEnum.showErrorsOnBlur, this),
                    }));
            }
        }
        observeValidationOnChange() {
            const opt = this.state.options;
            if (opt.get(OptionsEnum.validateOnChange, this)) {
                this.disposeValidationOnChange = mobx.observe(this, "$value", () => !this.actionRunning &&
                    this.debouncedValidation({
                        showErrors: opt.get(OptionsEnum.showErrorsOnChange, this),
                    }));
            }
            else if (opt.get(OptionsEnum.validateOnChangeAfterInitialBlur, this) ||
                opt.get(OptionsEnum.validateOnChangeAfterSubmit, this)) {
                this.disposeValidationOnChange = mobx.observe(this, "$value", () => !this.actionRunning &&
                    ((opt.get(OptionsEnum.validateOnChangeAfterInitialBlur, this) &&
                        this.blurred) ||
                        (opt.get(OptionsEnum.validateOnChangeAfterSubmit, this) &&
                            this.state.form.submitted)) &&
                    this.debouncedValidation({
                        showErrors: opt.get(OptionsEnum.showErrorsOnChange, this),
                    }));
            }
        }
        initMOBXEvent(type) {
            const arr = this[`$${type}`];
            if (!Array.isArray(arr))
                return;
            let fn;
            if (type === FieldPropsEnum.observers)
                fn = this.observe;
            if (type === FieldPropsEnum.interceptors)
                fn = this.intercept;
            arr.map((obj) => fn(lodash.omit(obj, FieldPropsEnum.path)));
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
            const fallback = this.state.options.get(OptionsEnum.fallback, this);
            const applyInputConverterOnUpdate = this.state.options.get(OptionsEnum.applyInputConverterOnUpdate, this);
            const x = this.state
                .struct()
                .findIndex((s) => s.startsWith((this.path ?? "").replace(/\.\d+\./, "[].") + "[]"));
            if (!fallback && this.fields.size === 0 && x < 0) {
                this.value = parseInput(applyInputConverterOnUpdate ? this.$input : (val) => val, {
                    fallbackValueOption: this.state.options.get(OptionsEnum.fallbackValue, this),
                    separated: fields,
                });
                return;
            }
            super.update(fields);
        }
    }

    class Form extends Base {
        name;
        path = null;
        extra = {};
        validator;
        debouncedValidation = null;
        constructor(setup = {}, { name = "", options = {}, plugins = {}, bindings = {}, hooks = {}, handlers = {}, extra = {}, } = {}) {
            super();
            makeObservable(this, {
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
            this.debouncedValidation = lodash.debounce(this.validate, this.state.options.get(OptionsEnum.validationDebounceWait), this.state.options.get(OptionsEnum.validationDebounceOptions));
            // execute validation on form initialization
            this.state.options.get(OptionsEnum.validateOnInit) &&
                this.validator.validate({
                    showErrors: this.state.options.get(OptionsEnum.showErrorsOnInit),
                });
            this.execHook(FieldPropsEnum.onInit);
            // handle Form onChange Hook
            mobx.autorun(() => this.$changed && this.execHook(FieldPropsEnum.onChange));
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

    exports.ArrayMap = ArrayMap;
    exports.Field = Field;
    exports.Form = Form;
    exports.default = Form;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=MobxFormkit.umd.js.map
