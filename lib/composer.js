'use strict';

var FieldProps = require('./models/FieldProps.js');

const composer = (forms) => {
    const instances = () => forms;
    const select = (key) => forms[key];
    const check = (prop) => Object
        .entries(forms)
        .reduce((acc, entry) => Object.assign(acc, {
        [entry[0]]: entry[1].check(prop)
    }), {});
    const get = (prop) => Object
        .entries(forms)
        .reduce((acc, entry) => Object.assign(acc, {
        [entry[0]]: entry[1].get(prop)
    }), {});
    const valid = () => Object.values(check(FieldProps.FieldPropsEnum.isValid))
        .every((val) => val === true);
    const error = () => Object.values(check(FieldProps.FieldPropsEnum.hasError))
        .some((val) => val === true);
    const clear = ({ deep = true, execHook = false } = {
        deep: true, execHook: false,
    }) => Object.values(forms).map((form) => form.clear(deep, execHook));
    const reset = ({ deep = true, execHook = false } = {
        deep: true, execHook: false,
    }) => Object.values(forms).map((form) => form.reset(deep, execHook));
    const validate = ({ showErrors = true } = {
        showErrors: true,
    }) => Promise.all(Object.values(forms)
        .map((form) => form.validate({ showErrors })))
        .then(() => ({
        composer: composer(forms),
        valid: valid(),
        error: error(),
        errors: get('error'),
        values: get('value'),
    }));
    const submit = ({ validate = true, execOnSubmitHook = false, execValidationHooks = false } = {
        validate: true, execOnSubmitHook: false, execValidationHooks: false,
    }) => Promise.all(Object.values(forms)
        .map((form) => form.submit({}, { execOnSubmitHook, execValidationHooks, validate })))
        .then(() => ({
        composer: composer(forms),
        valid: valid(),
        error: error(),
        errors: get('error'),
        values: get('value'),
    }));
    return {
        instances,
        select,
        check,
        get,
        valid,
        error,
        validate,
        submit,
        clear,
        reset,
    };
};

exports.composer = composer;
//# sourceMappingURL=composer.js.map
