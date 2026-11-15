import Form from "../Form";
import Field from "../Field";
import { FieldInterface } from "./FieldInterface";
import { FormInterface } from "./FormInterface";
import { StateInterface } from "./StateInterface";
export interface ValidatorConstructor {
    form: FormInterface | null;
    plugins: ValidationPlugins;
}
export interface ValidateOptionsInterface {
    showErrors?: boolean;
    related?: boolean;
    field?: FieldInterface;
    path?: string;
}
export type ValidateOptions = string | ValidateOptionsInterface | Form | Field;
export interface ValidatorInterface {
    promises: Promise<any>[];
    form: FormInterface | null;
    drivers: any;
    plugins: ValidationPlugins;
    error: string | null;
    initDrivers(): void;
    validate(opt?: ValidateOptions, obj?: ValidateOptions): Promise<any>;
    validateField(opt: ValidateOptionsInterface): void;
    validateRelatedFields(field: any, showErrors: boolean): void;
}
export type ValidationPackage = any;
export type ExtendPlugin<TValidator = ValidationPackage> = (args: {
    validator: TValidator;
    form: FormInterface;
}) => void;
export interface ValidationPluginConfig<TValidator = ValidationPackage> {
    package?: TValidator;
    schema?: any;
    options?: any;
    extend?: ExtendPlugin<TValidator>;
}
export interface ValidationPluginConstructor<TValidator = ValidationPackage> {
    config: ValidationPluginConfig<TValidator>;
    state: StateInterface | null;
    promises: Promise<unknown>[];
}
export interface ValidationPluginInterface<TValidator = ValidationPackage> extends ValidationPluginConstructor<TValidator> {
    validator: TValidator;
    schema?: any;
    extend?: ExtendPlugin<TValidator>;
    validate(field: FieldInterface): void;
    class?(constructor: ValidationPluginConstructor<TValidator>): void;
}
export type ValidationPlugin<TValidator = ValidationPackage> = {
    class: any;
    config?: ValidationPluginConfig<TValidator>;
};
export interface ValidationPlugins {
    [key: string]: ValidationPlugin | undefined;
    vjf?: ValidationPlugin;
    dvr?: ValidationPlugin;
    ajv?: ValidationPlugin;
    yup?: ValidationPlugin;
    zod?: ValidationPlugin;
    joi?: ValidationPlugin;
    valibot?: ValidationPlugin;
    vinejs?: ValidationPlugin;
}
export type DriversMap = {
    [key in keyof ValidationPlugins]: ValidationPluginInterface;
};
export declare enum ValidationHooks {
    onSuccess = "onSuccess",
    onError = "onError"
}
export default ValidatorInterface;
//# sourceMappingURL=ValidatorInterface.d.ts.map