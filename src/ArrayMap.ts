import { observable, runInAction, IObservableArray } from "mobx";

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
export class ArrayMap<K = string, V = any> {
  /** Duck-typing marker for utility code */
  _isArrayMap = true;

  /** Called after a successful `move()` — used to flag the change as dirty */
  onMove?: () => void;

  /** Internal observable array: entries stored as [key, value] pairs */
  private _entries: IObservableArray<[K, V]> = observable.array<[K, V]>([]);

  constructor(entries?: [K, V][] | null) {
    if (entries && entries.length > 0) {
      this._entries.replace(entries);
    }
  }

  // ------------------------------------------------------------------
  // ObservableMap-compatible API
  // ------------------------------------------------------------------

  get size(): number {
    return this._entries.length;
  }

  get(key: K): V | undefined {
    const entry = this._entries.find(([k]) => k === key);
    return entry ? entry[1] : undefined;
  }

  set(key: K, value: V): this {
    const existing = this._entries.find(([k]) => k === key);
    if (existing) {
      existing[1] = value;
    } else {
      this._entries.push([key, value]);
    }
    return this;
  }

  has(key: K): boolean {
    return this._entries.some(([k]) => k === key);
  }

  delete(key: K): boolean {
    const index = this._entries.findIndex(([k]) => k === key);
    if (index !== -1) {
      this._entries.splice(index, 1);
      return true;
    }
    return false;
  }

  clear(): void {
    this._entries.clear();
  }

  keys(): IterableIterator<K> {
    return this._entries.map(([k]) => k)[Symbol.iterator]();
  }

  values(): IterableIterator<V> {
    return this._entries.map(([, v]) => v)[Symbol.iterator]();
  }

  entries(): IterableIterator<[K, V]> {
    return this._entries[Symbol.iterator]();
  }

  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any,
  ): void {
    this._entries.forEach(([key, value]) => {
      callbackfn.call(thisArg, value, key, this);
    });
  }

  toJSON(): { [key: string]: V } {
    const result: { [key: string]: V } = {};
    this._entries.forEach(([key, value]) => {
      result[String(key)] = value;
    });
    return result;
  }

  toString(): string {
    return `[object ArrayMap]`;
  }

  merge(other: any): this {
    if (other && typeof other === "object") {
      if (other.forEach && typeof other.forEach === "function") {
        // ObservableMap or Map-like
        other.forEach((value: V, key: K) => {
          this.set(key, value);
        });
      } else if (Array.isArray(other)) {
        // Array of [key, value] pairs
        other.forEach(([key, value]) => {
          this.set(key, value);
        });
      } else {
        // Plain object { key: value }
        Object.keys(other).forEach((key) => {
          this.set(key as any, other[key]);
        });
      }
    }
    return this;
  }

  replace(values: any): this {
    this.clear();
    return this.merge(values);
  }

  get intercept(): any {
    return (this._entries as any).intercept;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
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
  move(fromIndex: number, toIndex: number): void {
    runInAction(() => {
      if (fromIndex < 0 || fromIndex >= this._entries.length) return;
      if (toIndex < 0 || toIndex >= this._entries.length) return;
      if (fromIndex === toIndex) return;

      const [entry] = this._entries.splice(fromIndex, 1);
      this._entries.splice(toIndex, 0, entry);
      this.onMove?.();
    });
  }

  /**
   * Expose the underlying observable array for direct MobX
   * observation (e.g. `observe(arr, cb)` from mobx).
   */
  toArray(): Array<[K, V]> {
    return this._entries;
  }
}

export default ArrayMap;
