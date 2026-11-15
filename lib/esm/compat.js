import * as mobx from 'mobx';

// `decorate` was removed in MobX 7 and `makeObservable` does not exist in
// MobX 5. Resolve both lazily through the module namespace so a static
// named import never fails at link time (MISSING_EXPORT) with MobX 7.
const M = mobx;
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

export { makeObservable };
//# sourceMappingURL=compat.js.map
