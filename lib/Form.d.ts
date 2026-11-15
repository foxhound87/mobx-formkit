import Base from "./Base";
import Field from "./Field";
import ValidatorInterface from "./models/ValidatorInterface";
import { FieldConstructor } from "./models/FieldInterface";
import { FormInterface, FieldsDefinitions, FormConfig, PathsOf } from "./models/FormInterface";
export default class Form<F extends Record<string, any> = Record<string, any>> extends Base<F> implements FormInterface<F> {
    name: string;
    path: any;
    extra: Record<string, any>;
    validator: ValidatorInterface;
    debouncedValidation: any;
    constructor(setup?: FieldsDefinitions, { name, options, plugins, bindings, hooks, handlers, extra, }?: FormConfig);
    get flatMapValues(): Record<string, any>;
    get error(): string | null;
    get hasError(): boolean;
    get isValid(): boolean;
    get isPristine(): boolean;
    get isDirty(): boolean;
    get isDefault(): boolean;
    get isEmpty(): boolean;
    get focused(): boolean;
    get touched(): boolean;
    get disabled(): boolean;
    makeField(data: FieldConstructor, FieldClass?: typeof Field): Field<any>;
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
    $(key: keyof F | PathsOf<F>): Field<F[keyof F]>;
    /**
     * Select a field by path.
     * For typed autocomplete, use `$()` instead, which is typed with `keyof F`.
     */
    select(path: string | number, fields?: any, isStrict?: boolean): Field<any>;
    values(): {
        [K in keyof F]?: F[K];
    };
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
    invalidate(message?: string | null, deep?: boolean): void;
    showErrors(show?: boolean): void;
    resetValidation(deep?: boolean): void;
    /**
      Clear Form Fields
    */
    clear(deep?: boolean, execHook?: boolean): void;
    /**
      Reset Form Fields
    */
    reset(deep?: boolean, execHook?: boolean): void;
}
//# sourceMappingURL=Form.d.ts.map