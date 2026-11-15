import ValidatorInterface, { DriversMap, ValidateOptions, ValidationPlugins, ValidatorConstructor } from "./models/ValidatorInterface";
import { FormInterface } from "./models/FormInterface";
import { FieldInterface } from "./models/FieldInterface";
export default class Validator implements ValidatorInterface {
    promises: Promise<any>[];
    form: FormInterface | null;
    drivers: DriversMap;
    plugins: ValidationPlugins;
    error: string | null;
    constructor(obj: ValidatorConstructor);
    initDrivers(): void;
    validate(opt: ValidateOptions, obj: ValidateOptions): Promise<any>;
    validateField({ showErrors, related, field, path, }: {
        showErrors?: boolean;
        related?: boolean;
        field?: any;
        path?: any;
    }): void;
    /**
      Validate 'related' fields if specified
      and related validation allowed (recursive)
    */
    validateRelatedFields(field: FieldInterface, showErrors: boolean): void;
}
//# sourceMappingURL=Validator.d.ts.map