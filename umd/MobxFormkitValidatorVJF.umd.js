(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MobxFormkitValidatorVJF = factory());
})(this, (function () { 'use strict';

    function isPromise(obj) {
        return (!!obj &&
            typeof obj.then === "function" &&
            (typeof obj === "object" || typeof obj === "function"));
    }
    class VJF {
        promises;
        config;
        state;
        extend;
        validator;
        constructor({ config, state = null, promises = [], }) {
            this.state = state;
            this.promises = promises;
            this.config = config;
            this.extend = config?.extend;
            this.validator = config?.package;
            this.extendValidator();
        }
        extendValidator() {
            if (typeof this.extend === "function") {
                this.extend({
                    validator: this.validator,
                    form: this.state.form,
                });
            }
        }
        validate(field) {
            if (!field.validators)
                return;
            const validators = Array.isArray(field.validators) ? field.validators : [field.validators];
            validators.forEach((fn) => this.collectData(fn, field));
            this.executeValidation(field);
        }
        collectData(fn, field) {
            const result = this.handleFunctionResult(fn, field);
            if (isPromise(result)) {
                const $p = result
                    .then(([valid, message]) => field.setValidationAsyncData(valid, message))
                    .then(() => this.executeAsyncValidation(field));
                this.promises.push($p);
                return;
            }
            field.validationFunctionsData.unshift({
                valid: result[0],
                message: result[1],
            });
        }
        executeValidation(field) {
            field.validationFunctionsData.forEach(({ valid, message }) => {
                if (valid === false) {
                    field.invalidate(message, false);
                }
            });
        }
        executeAsyncValidation(field) {
            if (field.validationAsyncData.valid === false) {
                field.invalidate(field.validationAsyncData.message ?? undefined, false, true);
            }
        }
        handleFunctionResult(fn, field) {
            const result = fn({
                validator: this.validator,
                form: this.state.form,
                field,
            });
            if (Array.isArray(result)) {
                return [result[0] || false, result[1] || "Error"];
            }
            if (typeof result === 'boolean') {
                return [result, "Error"];
            }
            if (typeof result === 'string') {
                return [false, result];
            }
            if (isPromise(result)) {
                return result;
            }
            return [false, "Error"];
        }
    }
    var VJF_default = (config) => ({
        class: (VJF),
        config,
    });

    return VJF_default;

}));
//# sourceMappingURL=MobxFormkitValidatorVJF.umd.js.map
