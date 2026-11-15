import { FormInterface } from "./models/FormInterface";
export declare const composer: (forms: { [key in string]: FormInterface; }) => {
    instances: () => { [key in string]: FormInterface; };
    select: (key: string) => FormInterface;
    check: (prop: string) => any;
    get: (prop: string) => any;
    valid: () => boolean;
    error: () => boolean;
    validate: ({ showErrors }?: {
        showErrors?: boolean;
    }) => Promise<any>;
    submit: ({ validate, execOnSubmitHook, execValidationHooks }?: {
        validate?: boolean;
        execOnSubmitHook?: boolean;
        execValidationHooks?: boolean;
    }) => Promise<any>;
    clear: ({ deep, execHook }?: {
        deep?: boolean;
        execHook?: boolean;
    }) => void[];
    reset: ({ deep, execHook }?: {
        deep?: boolean;
        execHook?: boolean;
    }) => void[];
};
//# sourceMappingURL=composer.d.ts.map