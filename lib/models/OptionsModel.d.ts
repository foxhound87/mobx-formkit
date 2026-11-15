export declare enum OptionsEnum {
    uniqueId = "uniqueId",
    fallback = "fallback",
    fallbackValue = "fallbackValue",
    defaultGenericError = "defaultGenericError",
    submitThrowsError = "submitThrowsError",
    showErrorsOnInit = "showErrorsOnInit",
    showErrorsOnSubmit = "showErrorsOnSubmit",
    showErrorsOnBlur = "showErrorsOnBlur",
    showErrorsOnChange = "showErrorsOnChange",
    showErrorsOnClear = "showErrorsOnClear",
    showErrorsOnReset = "showErrorsOnReset",
    validateOnInit = "validateOnInit",
    validateOnSubmit = "validateOnSubmit",
    validateOnBlur = "validateOnBlur",
    validateOnChange = "validateOnChange",
    validateOnChangeAfterInitialBlur = "validateOnChangeAfterInitialBlur",
    validateOnChangeAfterSubmit = "validateOnChangeAfterSubmit",
    validateDisabledFields = "validateDisabledFields",
    validateDeletedFields = "validateDeletedFields",
    validatePristineFields = "validatePristineFields",
    validateTrimmedValue = "validateTrimmedValue",
    validateOnClear = "validateOnClear",
    validateOnReset = "validateOnReset",
    strictSet = "strictSet",
    strictUpdate = "strictUpdate",
    strictDelete = "strictDelete",
    strictSelect = "strictSelect",
    softDelete = "softDelete",
    retrieveOnlyDirtyFieldsValues = "retrieveOnlyDirtyFieldsValues",
    retrieveOnlyEnabledFieldsValues = "retrieveOnlyEnabledFieldsValues",
    retrieveOnlyEnabledFieldsErrors = "retrieveOnlyEnabledFieldsErrors",
    retrieveNullifiedEmptyStrings = "retrieveNullifiedEmptyStrings",
    removeNullishValuesInArrays = "removeNullishValuesInArrays",
    preserveDeletedFieldsValues = "preserveDeletedFieldsValues",
    autoTrimValue = "autoTrimValue",
    autoParseNumbers = "autoParseNumbers",
    validationDebounceWait = "validationDebounceWait",
    validationDebounceOptions = "validationDebounceOptions",
    stopValidationOnError = "stopValidationOnError",
    validationPluginsOrder = "validationPluginsOrder",
    resetValidationBeforeValidate = "resetValidationBeforeValidate",
    applyInputConverterOnInit = "applyInputConverterOnInit",
    applyInputConverterOnSet = "applyInputConverterOnSet",
    applyInputConverterOnUpdate = "applyInputConverterOnUpdate",
    bubbleUpErrorMessages = "bubbleUpErrorMessages"
}
export interface OptionsModel {
    [OptionsEnum.uniqueId]?: (field: any) => string | undefined;
    [OptionsEnum.fallback]?: boolean;
    [OptionsEnum.fallbackValue]?: any;
    [OptionsEnum.defaultGenericError]?: null | string;
    [OptionsEnum.submitThrowsError]?: boolean;
    [OptionsEnum.showErrorsOnInit]?: boolean;
    [OptionsEnum.showErrorsOnSubmit]?: boolean;
    [OptionsEnum.showErrorsOnBlur]?: boolean;
    [OptionsEnum.showErrorsOnChange]?: boolean;
    [OptionsEnum.showErrorsOnClear]?: boolean;
    [OptionsEnum.showErrorsOnReset]?: boolean;
    [OptionsEnum.validateOnInit]?: boolean;
    [OptionsEnum.validateOnSubmit]?: boolean;
    [OptionsEnum.validateOnBlur]?: boolean;
    [OptionsEnum.validateOnChange]?: boolean;
    [OptionsEnum.validateOnChangeAfterInitialBlur]?: boolean;
    [OptionsEnum.validateOnChangeAfterSubmit]?: boolean;
    [OptionsEnum.validateOnClear]?: boolean;
    [OptionsEnum.validateOnReset]?: boolean;
    [OptionsEnum.validateDisabledFields]?: boolean;
    [OptionsEnum.validateDeletedFields]?: boolean;
    [OptionsEnum.validatePristineFields]?: boolean;
    [OptionsEnum.validateTrimmedValue]?: boolean;
    [OptionsEnum.strictSet]?: boolean;
    [OptionsEnum.strictUpdate]?: boolean;
    [OptionsEnum.strictDelete]?: boolean;
    [OptionsEnum.strictSelect]?: boolean;
    [OptionsEnum.softDelete]?: boolean;
    [OptionsEnum.retrieveOnlyDirtyFieldsValues]?: boolean;
    [OptionsEnum.retrieveOnlyEnabledFieldsValues]?: boolean;
    [OptionsEnum.retrieveOnlyEnabledFieldsErrors]?: boolean;
    [OptionsEnum.retrieveNullifiedEmptyStrings]?: boolean;
    [OptionsEnum.removeNullishValuesInArrays]?: boolean;
    [OptionsEnum.preserveDeletedFieldsValues]?: boolean;
    [OptionsEnum.autoTrimValue]?: boolean;
    [OptionsEnum.autoParseNumbers]?: boolean;
    [OptionsEnum.validationDebounceWait]?: number;
    [OptionsEnum.validationDebounceOptions]?: {
        leading?: boolean;
        trailing?: boolean;
    };
    [OptionsEnum.stopValidationOnError]?: boolean;
    [OptionsEnum.validationPluginsOrder]?: undefined | string[];
    [OptionsEnum.resetValidationBeforeValidate]?: boolean;
    [OptionsEnum.applyInputConverterOnInit]?: boolean;
    [OptionsEnum.applyInputConverterOnSet]?: boolean;
    [OptionsEnum.applyInputConverterOnUpdate]?: boolean;
    [OptionsEnum.bubbleUpErrorMessages]?: boolean;
}
export default OptionsModel;
//# sourceMappingURL=OptionsModel.d.ts.map