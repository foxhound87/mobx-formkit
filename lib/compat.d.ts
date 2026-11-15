type Annotations = Record<string, any>;
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
export declare const makeObservable: (target: any, annotations: Annotations) => any;
export {};
//# sourceMappingURL=compat.d.ts.map