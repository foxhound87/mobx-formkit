(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash')) :
    typeof define === 'function' && define.amd ? define(['lodash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MobxFormkitValidatorZOD = factory(global._));
})(this, (function (lodash) { 'use strict';

    class ZOD {
        promises;
        config;
        state;
        extend;
        validator;
        schema;
        constructor({ config, state = null, promises = [], }) {
            this.state = state;
            this.promises = promises;
            this.config = config;
            this.extend = config?.extend;
            this.validator = config.package;
            this.schema = config.schema;
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
            const result = this.schema.safeParse(field.state.form.flatMapValues);
            if (result.success)
                return;
            const fieldErrors = lodash.get(result.error.format(), field.path ?? "")?._errors;
            if (fieldErrors?.length) {
                field.validationErrorStack = fieldErrors;
            }
        }
    }
    var ZOD_default = (config) => ({
        class: (ZOD),
        config,
    });

    return ZOD_default;

}));
//# sourceMappingURL=MobxFormkitValidatorZOD.umd.js.map
