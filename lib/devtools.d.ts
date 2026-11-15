export type FormkitDevtoolsEvent = {
    type: "connected";
    connected: boolean;
} | {
    type: "form:new";
    key: string;
    form: any;
} | {
    type: "register";
    key: string;
    form: any;
} | {
    type: "unregister";
    key: string;
} | {
    type: "snapshot";
    payload: FormkitDevtoolsSnapshot;
};
export interface FormkitDevtoolsFieldSnapshot {
    key?: string;
    path?: string;
    name?: string;
    id?: string;
    type?: string;
    value?: any;
    default?: any;
    initial?: any;
    error?: any;
    label?: string;
    placeholder?: string;
    autoFocus?: boolean;
    related?: any;
    rules?: any;
    options?: any;
    bindings?: any;
    extra?: any;
    checked?: any;
    validators?: any;
    validatedWith?: any;
    hasError?: boolean;
    isValid?: boolean;
    isDirty?: boolean;
    isPristine?: boolean;
    isDefault?: boolean;
    isEmpty?: boolean;
    disabled?: boolean;
    touched?: boolean;
    focused?: boolean;
    blurred?: boolean;
    changed?: boolean;
    deleted?: boolean;
    validating?: boolean;
    clearing?: boolean;
    resetting?: boolean;
    submitting?: boolean;
    size?: number;
    submitted?: boolean;
    validated?: boolean;
    fields?: FormkitDevtoolsFieldSnapshot[];
}
export interface FormkitDevtoolsSnapshot {
    key: string;
    name?: string;
    size?: number;
    submitted?: boolean;
    validated?: boolean;
    submitting?: boolean;
    validating?: boolean;
    clearing?: boolean;
    resetting?: boolean;
    hasError?: boolean;
    isValid?: boolean;
    isDirty?: boolean;
    isPristine?: boolean;
    isDefault?: boolean;
    isEmpty?: boolean;
    disabled?: boolean;
    deleted?: boolean;
    touched?: boolean;
    focused?: boolean;
    blurred?: boolean;
    changed?: boolean;
    error?: any;
    options?: Record<string, any>;
    helpers?: Record<string, any>;
    fields: FormkitDevtoolsFieldSnapshot[];
}
export interface FormkitDevtoolsHook {
    connected: boolean;
    registry: Map<string, any>;
    emit(event: FormkitDevtoolsEvent): void;
    subscribe(listener: (event: FormkitDevtoolsEvent) => void): () => void;
    register(key: string, form: any): void;
    unregister(key: string): void;
    connect(): void;
    disconnect(): void;
    requestSnapshot(): void;
}
export declare const getHook: () => FormkitDevtoolsHook | undefined;
export declare const installHook: () => FormkitDevtoolsHook;
export declare const registerForm: (key: string, form: any) => void;
export declare const unregisterForm: (key: string) => void;
//# sourceMappingURL=devtools.d.ts.map