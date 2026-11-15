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
export declare class ArrayMap<K = string, V = any> {
    /** Duck-typing marker for utility code */
    _isArrayMap: boolean;
    /** Called after a successful `move()` — used to flag the change as dirty */
    onMove?: () => void;
    /** Internal observable array: entries stored as [key, value] pairs */
    private _entries;
    constructor(entries?: [K, V][] | null);
    get size(): number;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[K, V]>;
    forEach(callbackfn: (value: V, key: K, map: this) => void, thisArg?: any): void;
    toJSON(): {
        [key: string]: V;
    };
    toString(): string;
    merge(other: any): this;
    replace(values: any): this;
    get intercept(): any;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    /**
     * Move an entry from `fromIndex` to `toIndex`.
     *
     * Directly splices the internal observable array, so MobX
     * tracks the change as a single array splice operation.
     */
    move(fromIndex: number, toIndex: number): void;
    /**
     * Expose the underlying observable array for direct MobX
     * observation (e.g. `observe(arr, cb)` from mobx).
     */
    toArray(): Array<[K, V]>;
}
export default ArrayMap;
//# sourceMappingURL=ArrayMap.d.ts.map