import Field from "../Field";
import { BaseInterface } from "./BaseInterface";
import { FieldInterface, FieldConstructor } from "./FieldInterface";
import { OptionsModel } from "./OptionsModel";
import { ValidatorInterface, ValidationPlugins } from "./ValidatorInterface";
/**
 * Recursively derives all possible field paths from a form values type `T`.
 * Supports nested objects, arrays (with `[]` suffix), and dot-separated paths.
 * Excludes built-in non-plain objects like Date, File, Blob, etc.
 *
 * @example
 * // --- Basic usage ---
 * type Profile = {
 *   username: string;
 *   email: string;
 * };
 * // PathsOf<Profile> = "username" | "email"
 *
 * @example
 * // --- Nested objects ---
 * type NestedClubFields = {
 *   club: { name: string; city: string };
 *   members: { firstname: string; lastname: string; hobbies: string[] }[];
 * };
 * // PathsOf<NestedClubFields> = "club" | "members" | "club.name" | "club.city"
 * //   | "members[].firstname" | "members[].lastname" | "members[].hobbies"
 *
 * @example
 * // --- Usage with form.$() or form.select() ---
 * const form = new Form<{ profile: { name: string; age: number } }>({  });
 *
 * // Top-level keys get autocomplete directly from keyof F:
 * form.$('profile'); // ✓ autocomplete, returns Field<{ name: string; age: number }>
 *
 * // For nested paths, use PathsOf in a helper function:
 * import { PathsOf } from 'mobx-formkit';
 *
 * function getField(form: Form<{ profile: { name: string; age: number } }>, path: PathsOf<{ profile: { name: string; age: number } }>) {
 *   return form.$(path).value;
 *   //        ^— path autocompletes to: "profile" | "profile.name" | "profile.age"
 * }
 * getField(form, 'profile.name'); // ✓ returns string
 */
export type PathsOf<T> = T extends (infer U)[] ? PathsOf<U> : T extends Date | File | Blob | RegExp | Map<any, any> | Set<any> | Promise<any> ? never : T extends object ? {
    [K in keyof T & string]: T[K] extends (infer U)[] ? K | `${K}[].${PathsOf<U>}` : T[K] extends object ? K | `${K}.${PathsOf<T[K]>}` : K;
}[keyof T & string] : never;
export interface FormInterface<F extends Record<string, any> = Record<string, any>> extends BaseInterface<F> {
    name: string;
    extra: Record<string, any>;
    validator: ValidatorInterface;
    debouncedValidation: any;
    flatMapValues: Record<string, any>;
    clearing: boolean;
    resetting: boolean;
    error: string | null;
    hasError: boolean;
    isValid: boolean;
    isPristine: boolean;
    isDirty: boolean;
    isDefault: boolean;
    isEmpty: boolean;
    focused: boolean;
    touched: boolean;
    disabled: boolean;
    invalidate(message?: string | null, deep?: boolean): void;
    showErrors(show?: boolean): void;
    clear(deep?: boolean, execHook?: boolean): void;
    reset(deep?: boolean, execHook?: boolean): void;
    makeField(data: FieldConstructor, FieldClass?: typeof Field): FieldInterface;
    $(key: keyof F | PathsOf<F>): Field<F[keyof F]>;
}
export interface FieldDefinition {
    /** Field value */
    value?: any;
    /** Field label */
    label?: string;
    /** Field placeholder */
    placeholder?: string;
    /** Validation rules string (e.g. "required|string|min:3") */
    rules?: string;
    /** Field type (e.g. "text", "checkbox", "password", "file", etc.) */
    type?: string;
    /** Whether the field is disabled */
    disabled?: boolean;
    /** Related field paths */
    related?: string[];
    /** Default value */
    default?: any;
    /** Initial value */
    initial?: any;
    /** Nested sub-fields definition */
    fields?: any;
    /** Binding name for the UI component */
    bindings?: string;
    /** Extra metadata */
    extra?: Record<string, any>;
    /** Field-level options */
    options?: OptionsModel;
    /** Field hooks */
    hooks?: Record<string, any>;
    /** Field handlers */
    handlers?: Record<string, any>;
    /** Custom validation functions */
    validators?: any[];
    /** Which field prop to use for validation output */
    validatedWith?: string;
    /** MobX observers */
    observers?: any[];
    /** MobX interceptors */
    interceptors?: any[];
    /** Ref callback/object */
    ref?: any;
    /** Whether the field is nullable */
    nullable?: boolean;
    /** Auto-focus on mount */
    autoFocus?: boolean;
    /** Input mode for mobile keyboards */
    inputMode?: string;
    /** Autocomplete attribute */
    autoComplete?: string;
    /** Input converter function */
    input?: Function;
    /** Output converter function */
    output?: Function;
    /** Value converter function */
    converter?: Function;
    /** Multiple converters */
    converters?: Function[];
    /** Computed value */
    computed?: any;
    /** Field name (overrides the key) */
    name?: string;
    /** Custom Field class */
    class?: any;
}
export interface FieldsDefinitions {
    struct?: string[];
    /**
     * Field definitions.
     * - For autocomplete on field props, use `Record<string, FieldDefinition>`
     *   (e.g. `const fields: Record<string, FieldDefinition> = { ... }`)
     * - Or pass an array of field path strings for struct/separated mode.
     */
    fields?: any;
    computed?: any;
    values?: any;
    labels?: any;
    placeholders?: any;
    defaults?: any;
    initials?: any;
    disabled?: any;
    deleted?: any;
    types?: any;
    related?: any;
    rules?: any;
    options?: any;
    bindings?: any;
    extra?: any;
    hooks?: any;
    handlers?: any;
    validatedWith?: any;
    validators?: any;
    observers?: any;
    interceptors?: any;
    input?: any;
    output?: any;
    autoFocus?: any;
    inputMode?: any;
    refs?: any;
    classes?: Record<string, any>;
    nullable?: any;
    converters?: any;
}
export interface FormConfig {
    name?: string;
    options?: OptionsModel;
    plugins?: ValidationPlugins;
    bindings?: Record<string, any>;
    hooks?: Record<string, any>;
    handlers?: Record<string, any>;
    extra?: Record<string, any>;
}
export default FormInterface;
//# sourceMappingURL=FormInterface.d.ts.map