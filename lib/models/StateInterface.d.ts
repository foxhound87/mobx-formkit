import { BindingsInterface } from "./BindingsInterface";
import { FormInterface } from "./FormInterface";
import { OptionsInterface } from "./OptionsInterface";
export declare enum RuntimeMode {
    mixed = "mixed",
    unified = "unified",
    separated = "separated"
}
export interface StateInterface {
    mode: RuntimeMode;
    strict: boolean;
    form: FormInterface;
    options: OptionsInterface;
    bindings: BindingsInterface;
    $struct: string[];
    $extra: any;
    disposers: {
        interceptor: any;
        observer: any;
    };
    initial: {
        props: any;
        fields: any;
    };
    current: {
        props: any;
        fields: any;
    };
    initProps(initial: any): void;
    struct(data?: string[]): string[];
    get(type: any, subtype: any): any;
    set(type: string, subtype: string, state: any): void;
    extra(data?: any): any | null;
    observeOptions(): void;
}
export default StateInterface;
//# sourceMappingURL=StateInterface.d.ts.map