import { ValidateOptions } from "./ValidatorInterface";
export interface SubmitOptions {
    execOnSubmitHook: boolean;
    execValidationHooks: boolean;
    validate: boolean;
}
export interface SubmitHooks {
    onSubmit?(instance: any): void;
    onSuccess?(instance: any): void;
    onError?(instance: any): void;
}
export interface SharedActionsInterface {
    validate(opt?: ValidateOptions, obj?: ValidateOptions): Promise<any>;
    submit(hooks?: SubmitHooks, opt?: SubmitOptions): Promise<any>;
    check(prop: string, deep?: boolean): boolean;
    deepCheck(type: string, prop: string, fields: any): any;
    update(fields: any): void;
    deepUpdate(fields: any, path: string, recursion: boolean): void;
    get(prop?: any, strict?: boolean): any;
    deepGet(prop: any, fields: any): any;
    set(prop: any, data?: any): void;
    deepSet(prop: any, data: any, path: string, recursion: boolean): void;
    add(obj?: any): any;
    del(path?: string): any;
}
export default SharedActionsInterface;
//# sourceMappingURL=SharedActionsInterface.d.ts.map