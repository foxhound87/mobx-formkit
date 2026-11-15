import { observable, runInAction } from 'mobx';

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
    _entries = observable.array([]);
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
        runInAction(() => {
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

export { ArrayMap, ArrayMap as default };
//# sourceMappingURL=ArrayMap.js.map
