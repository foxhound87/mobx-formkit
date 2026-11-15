import { autorun, values, toJS } from 'mobx';

const HOOK_KEY = "__MOBX_FORMKIT_DEVTOOLS_HOOK__";
const FIELD_PROPS = [
    "key",
    "id",
    "name",
    "path",
    "type",
    "bindings",
    "options",
    "default",
    "initial",
    "value",
    "label",
    "placeholder",
    "autoFocus",
    "related",
    "rules",
    "extra",
    "checked",
    "validators",
    "validatedWith",
    "clearing",
    "resetting",
    "hasError",
    "isValid",
    "isDirty",
    "isPristine",
    "isDefault",
    "isEmpty",
    "disabled",
    "deleted",
    "touched",
    "focused",
    "blurred",
    "changed",
    "error",
    "size",
    "submitted",
    "validated",
    "submitting",
    "validating",
];
const FORM_PROPS = [
    "name",
    "size",
    "submitted",
    "validated",
    "submitting",
    "validating",
    "clearing",
    "resetting",
    "hasError",
    "isValid",
    "isDirty",
    "isPristine",
    "isDefault",
    "isEmpty",
    "disabled",
    "deleted",
    "touched",
    "focused",
    "blurred",
    "changed",
    "error",
];
const FIELD_HELPER_PROPS = [
    "error",
    "label",
    "placeholder",
    "default",
    "initial",
    "type",
    "disabled",
    "checked",
    "related",
    "rules",
    "options",
    "extra",
    "bindings",
    "validators",
    "validatedWith",
];
/**
 * Recursively convert a value into a plain, structured-clone-safe shape:
 * observable structures become plain objects/arrays and functions become
 * name strings (functions cannot cross the postMessage boundary).
 */
const serialize = (value, depth = 0) => {
    if (depth > 8)
        return undefined;
    if (typeof value === "function") {
        return `[Function${value.name ? `: ${value.name}` : ""}]`;
    }
    if (value == null)
        return value;
    const plain = toJS(value);
    if (Array.isArray(plain)) {
        return plain.map((item) => serialize(item, depth + 1));
    }
    if (typeof plain === "object") {
        const out = {};
        for (const key of Object.keys(plain)) {
            out[key] = serialize(plain[key], depth + 1);
        }
        return out;
    }
    return plain;
};
const isArrayMap = (target) => Boolean(target && typeof target === "object" && target._isArrayMap);
const pairsOf = (target) => {
    if (isArrayMap(target))
        return Array.from(target.entries());
    if (Array.isArray(target))
        return target.map((value, index) => [String(index), value]);
    const entries = values(target);
    if (Array.isArray(entries))
        return entries.map((value, index) => [String(index), value]);
    return Object.entries(target);
};
const pick = (source, props) => {
    const out = {};
    for (const prop of props) {
        const value = source && typeof source === "object" ? source[prop] : undefined;
        if (value !== undefined)
            out[prop] = serialize(value);
    }
    return out;
};
const serializeField = (field, key) => {
    const out = pick(field, FIELD_PROPS);
    if (key !== undefined && out.name === undefined)
        out.name = key;
    if (key !== undefined && out.path === undefined)
        out.path = key;
    if (isArrayMap(field)) {
        out.fields = pairsOf(field).map(([childKey, entry]) => serializeField(entry, childKey));
    }
    return out;
};
const fieldKey = (field, index) => field.key ?? field.path ?? field.name ?? `field-${index}`;
const collectProp = (fields, prop) => {
    const out = {};
    fields.forEach((field, index) => {
        const key = fieldKey(field, index);
        out[key] = field.fields && field.fields.length
            ? collectProp(field.fields, prop)
            : field[prop];
    });
    return out;
};
const collectHelpers = (form, fields) => {
    const out = {};
    for (const prop of FIELD_HELPER_PROPS) {
        out[prop] = collectProp(fields, prop);
    }
    out.hooks = serialize(form.$hooks);
    out.handlers = serialize(form.$handlers);
    return out;
};
const collectBooleanOptions = (form) => {
    const out = {};
    const options = form?.state?.options?.options;
    if (!options || typeof options !== "object")
        return out;
    for (const key of Object.keys(options)) {
        const value = options[key];
        if (typeof value === "boolean")
            out[key] = value;
    }
    return out;
};
const serializeForm = (key, form) => {
    const out = { key, ...pick(form, FORM_PROPS) };
    out.fields = pairsOf(form.fields).map(([fieldKey, field]) => serializeField(field, fieldKey));
    out.helpers = collectHelpers(form, out.fields);
    out.options = collectBooleanOptions(form);
    return out;
};
const createHook = () => {
    const registry = new Map();
    const listeners = new Set();
    const disposers = new Map();
    const caches = new Map();
    const dirty = new Set();
    let connected = false;
    let flushTimer = null;
    const emit = (event) => {
        for (const listener of listeners)
            listener(event);
    };
    const flush = () => {
        flushTimer = null;
        const keys = [...dirty];
        dirty.clear();
        for (const key of keys) {
            const snapshot = caches.get(key);
            if (snapshot)
                emit({ type: "snapshot", payload: snapshot });
        }
    };
    const scheduleFlush = (key) => {
        dirty.add(key);
        if (flushTimer == null)
            flushTimer = setTimeout(flush, 0);
    };
    const dispose = (key) => {
        disposers.get(key)?.();
        disposers.delete(key);
        dirty.delete(key);
        caches.delete(key);
    };
    const setup = (key) => {
        dispose(key);
        if (!connected)
            return;
        const form = registry.get(key);
        if (!form)
            return;
        disposers.set(key, autorun(() => {
            // Reading observables inside serializeForm makes the autorun re-run
            // on every field/form change; the result is cached and emitted once
            // (batched) by flush.
            caches.set(key, serializeForm(key, form));
            scheduleFlush(key);
        }));
    };
    return {
        get connected() {
            return connected;
        },
        registry,
        emit,
        subscribe(listener) {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
        register(key, form) {
            registry.set(key, form);
            emit({ type: "register", key, form });
            setup(key);
        },
        unregister(key) {
            if (!registry.has(key))
                return;
            dispose(key);
            registry.delete(key);
            emit({ type: "unregister", key });
        },
        connect() {
            if (connected)
                return;
            connected = true;
            for (const key of registry.keys())
                setup(key);
            emit({ type: "connected", connected: true });
        },
        disconnect() {
            if (!connected)
                return;
            connected = false;
            for (const key of [...disposers.keys()])
                dispose(key);
            emit({ type: "connected", connected: false });
        },
        requestSnapshot() {
            for (const [key, form] of registry) {
                emit({ type: "snapshot", payload: caches.get(key) ?? serializeForm(key, form) });
            }
        },
    };
};
const globalRef = globalThis;
const getHook = () => globalRef[HOOK_KEY];
const installHook = () => {
    if (!globalRef[HOOK_KEY]) {
        globalRef[HOOK_KEY] = createHook();
    }
    return globalRef[HOOK_KEY];
};
const registerForm = (key, form) => installHook().register(key, form);
const unregisterForm = (key) => installHook().unregister(key);
const hook = installHook();
hook.subscribe((event) => {
    if (event.type === "form:new" && !hook.registry.has(event.key)) {
        hook.register(event.key || event.form?.name || `form-${hook.registry.size + 1}`, event.form);
    }
});

export { getHook, installHook, registerForm, unregisterForm };
//# sourceMappingURL=devtools.js.map
