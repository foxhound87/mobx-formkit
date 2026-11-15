import { toJS, set, action, observable } from 'mobx';
import { makeObservable } from './compat.js';
import { has, get } from 'lodash-es';
import { uniqueId } from './utils.js';

class Options {
    options = {
        uniqueId,
        fallback: true,
        fallbackValue: "",
        defaultGenericError: null,
        submitThrowsError: true,
        showErrorsOnInit: false,
        showErrorsOnSubmit: true,
        showErrorsOnBlur: true,
        showErrorsOnChange: true,
        showErrorsOnClear: false,
        showErrorsOnReset: true,
        validateOnInit: true,
        validateOnSubmit: true,
        validateOnBlur: true,
        validateOnChange: false,
        validateOnChangeAfterInitialBlur: false,
        validateOnChangeAfterSubmit: false,
        validateOnClear: false,
        validateOnReset: false,
        validateDisabledFields: false,
        validateDeletedFields: false,
        validatePristineFields: true,
        strictSet: false,
        strictUpdate: false,
        strictDelete: true,
        strictSelect: true,
        softDelete: false,
        retrieveOnlyDirtyFieldsValues: false,
        retrieveOnlyEnabledFieldsValues: false,
        retrieveOnlyEnabledFieldsErrors: false,
        retrieveNullifiedEmptyStrings: false,
        autoTrimValue: false,
        autoParseNumbers: false,
        removeNullishValuesInArrays: false,
        preserveDeletedFieldsValues: false,
        validationDebounceWait: 250,
        validationDebounceOptions: {
            leading: false,
            trailing: true,
        },
        stopValidationOnError: false,
        validationPluginsOrder: undefined,
        resetValidationBeforeValidate: true,
        validateTrimmedValue: false,
        applyInputConverterOnInit: true,
        applyInputConverterOnSet: true,
        applyInputConverterOnUpdate: true,
        bubbleUpErrorMessages: false,
    };
    constructor() {
        makeObservable(this, {
            options: observable,
            set: action,
        });
    }
    get(key = '', field = null) {
        // handle field option
        if (has(field, "path")) {
            if (has(field.$options, key)) {
                return field.$options[key];
            }
        }
        // fallback on global form options
        if (key)
            return get(this.options, key);
        return toJS(this.options);
    }
    set(options) {
        set(this.options, options);
    }
}

export { Options as default };
//# sourceMappingURL=Options.js.map
