import ArrayMap from "./ArrayMap";
import { BaseInterface } from "./models/BaseInterface";
import { StateInterface } from "./models/StateInterface";
import { FieldInterface } from "./models/FieldInterface";
import { ValidateOptions } from "./models/ValidatorInterface";
import { SubmitHooks } from "./models/SharedActionsInterface";
export default abstract class Base<F extends Record<string, any> = Record<string, any>> implements BaseInterface<F> {
    noop: () => void;
    state: StateInterface;
    fields: ArrayMap;
    path: string | undefined | null;
    $submitted: number;
    $submitting: boolean;
    $validated: number;
    $validating: boolean;
    $clearing: boolean;
    $resetting: boolean;
    $touched: boolean;
    $changed: number;
    $hooks: any;
    $handlers: any;
    constructor();
    execHook: (name: string, fallback?: any, ...args: any[]) => any;
    execHandler: (name: string, args: any, fallback?: any, hook?: any, execHook?: boolean) => any;
    get resetting(): boolean;
    get clearing(): boolean;
    get submitted(): number;
    get submitting(): boolean;
    get validated(): number;
    get validating(): boolean;
    get hasIncrementalKeys(): boolean;
    get hasNestedFields(): boolean;
    get size(): number;
    get changed(): number;
    /**
      Interceptor
    */
    intercept: (opt: any) => any;
    /**
      Observer
    */
    observe: (opt: any) => any;
    /**
      Event Handler: On Clear
    */
    onClear: (...args: any) => any;
    /**
      Event Handler: On Reset
    */
    onReset: (...args: any) => any;
    /**
      Event Handler: On Submit
     */
    onSubmit: (...args: any) => any;
    /**
      Event Handler: On Add
    */
    onAdd: (...args: any) => any;
    /**
      Event Handler: On Del
    */
    onDel: (...args: any) => any;
    /******************************************************************
      Initializer
    */
    initFields(initial: any, update?: boolean): void;
    initField(key: string, path: string, data: any, update?: boolean): any;
    /******************************************************************
      Actions
    */
    validate(opt?: ValidateOptions, obj?: ValidateOptions): Promise<any>;
    /**
      Submit
    */
    submit(hooks?: SubmitHooks, { execOnSubmitHook, execValidationHooks, validate, }?: {
        execOnSubmitHook?: boolean | undefined;
        execValidationHooks?: boolean | undefined;
        validate?: boolean | undefined;
    }): Promise<any>;
    /**
      Check Field Computed Values
     */
    check(prop: string, deep?: boolean): boolean;
    deepCheck(type: string, prop: string, fields: any): any;
    firstError(): string | null;
    /**
      Update Field Values recurisvely
      OR Create Field if 'undefined'
     */
    update(fields: any): void;
    deepUpdate(fields: any, path?: string, recursion?: boolean, raw?: any): void;
    /**
      Get Fields Props
     */
    get(prop?: any, strict?: boolean): any;
    /**
      Get Fields Props Recursively
     */
    deepGet(prop: any, fields: any, strict?: boolean): any;
    /**
      Set Fields Props
     */
    set(prop: any, data?: any): void;
    /**
      Set Fields Props Recursively
     */
    deepSet(prop: any, data: any, path?: string, recursion?: boolean): void;
    /**
      Add Field
     */
    add(obj?: any, execEvent?: boolean): any;
    /**
      Del Field
     */
    del($path?: string | null, execEvent?: boolean): any;
    /******************************************************************
      Events
    */
    /**
      MobX Event (observe/intercept)
     */
    MOBXEvent({ prop, key, path, call, type, }: any): void;
    /**
      Dispose MOBX Events
     */
    dispose(opt?: any): void;
    /**
      Dispose All Events (observe/intercept)
     */
    disposeAll(): void;
    /**
      Dispose Single Event (observe/intercept)
     */
    disposeSingle({ type, key, path }: any): void;
    /******************************************************************
      Utils
    */
    /**
      Fields Selector
    */
    select(path: string | number, fields?: any, isStrict?: boolean): any;
    /**
      Get Container
     */
    container($path?: string | null): any;
    /**
      Has Field
     */
    has(path: string): boolean;
    /**
      Map Fields
    */
    map(cb: any): ReadonlyArray<FieldInterface>;
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
    each(iteratee: any, fields?: any, depth?: number): void;
    reduce(iteratee: any, acc: any): any;
    /******************************************************************
      Array Operations
    */
    /**
      Move a field from one index to another (for sortable lists).
     */
    move(fromIndex: number, toIndex: number): void;
    /******************************************************************
      Helpers
    */
    /**
      Fields Selector (alias of select)
     */
    $(key: string): any;
    /**
      Fields Values (recursive with Nested Fields)
     */
    values(): any;
    /**
      Fields Errors (recursive with Nested Fields)
     */
    errors(): any;
    /**
      Fields Labels (recursive with Nested Fields)
     */
    labels(): any;
    /**
      Fields Placeholders (recursive with Nested Fields)
     */
    placeholders(): any;
    /**
      Fields Default Values (recursive with Nested Fields)
     */
    defaults(): any;
    /**
      Fields Initial Values (recursive with Nested Fields)
     */
    initials(): any;
    /**
      Fields Types (recursive with Nested Fields)
     */
    types(): any;
}
//# sourceMappingURL=Base.d.ts.map