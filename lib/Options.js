'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var compat = require('./compat.js');
var lodash = require('lodash');
var utils = require('./utils.js');

class Options {
    options = {
        uniqueId: utils.uniqueId,
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
        compat.makeObservable(this, {
            options: mobx.observable,
            set: mobx.action,
        });
    }
    get(key = '', field = null) {
        // handle field option
        if (lodash.has(field, "path")) {
            if (lodash.has(field.$options, key)) {
                return field.$options[key];
            }
        }
        // fallback on global form options
        if (key)
            return lodash.get(this.options, key);
        return mobx.toJS(this.options);
    }
    set(options) {
        mobx.set(this.options, options);
    }
}

exports.default = Options;
//# sourceMappingURL=Options.js.map
