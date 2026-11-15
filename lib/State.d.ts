import { RuntimeMode } from "./models/StateInterface";
import { StateInterface } from "./models/StateInterface";
import { OptionsInterface } from "./models/OptionsInterface";
import { BindingsInterface } from "./models/BindingsInterface";
import { FormInterface } from "./models/FormInterface";
export default class State implements StateInterface {
    mode: RuntimeMode;
    strict: boolean;
    form: FormInterface;
    options: OptionsInterface;
    bindings: BindingsInterface;
    $extra: any;
    $struct: string[];
    disposers: {
        interceptor: {};
        observer: {};
    };
    initial: {
        props: {};
        fields: {};
    };
    current: {
        props: {};
        fields: {};
    };
    constructor({ form, initial, options, bindings }: any);
    initProps(initial?: any): void;
    /**
      Get/Set Fields Structure
    */
    struct(data?: any): any;
    /**
      Get Props/Fields
    */
    get(type: string, subtype: string): any;
    /**
      Set Props/Fields
    */
    set(type: string, subtype: any, state?: any): void;
    extra(data?: any | null): any | null;
    observeOptions(): void;
}
//# sourceMappingURL=State.d.ts.map