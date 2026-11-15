(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MobxFormkitValidatorAJV = factory());
})(this, (function () { 'use strict';

    function isPromise(obj) {
        return (!!obj &&
            typeof obj.then === "function" &&
            (typeof obj === "object" || typeof obj === "function"));
    }
    class AJV {
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
            this.schema = config.schema;
            this.initValidator();
        }
        extendOptions(options = {}) {
            return {
                ...options,
                allErrors: true,
                coerceTypes: true,
                strict: false,
            };
        }
        initValidator() {
            const AjvPackage = this.config.package;
            const validatorInstance = new AjvPackage(this.extendOptions(this.config.options));
            if (typeof validatorInstance.addFormat === "function") {
                validatorInstance.addFormat("email", (value) => typeof value === "string"
                    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    : false);
            }
            if (typeof this.extend === "function") {
                this.extend({
                    form: this.state.form,
                    validator: validatorInstance,
                });
            }
            this.validator = validatorInstance.compile(this.schema);
        }
        validate(field) {
            let result;
            try {
                result = this.validator(field.state.form.flatMapValues);
            }
            catch (e) {
                return;
            }
            if (isPromise(result)) {
                const $p = result
                    .then(() => field.setValidationAsyncData(true))
                    .catch((err) => err && this.handleAsyncError(field, err.errors))
                    .then(() => this.executeAsyncValidation(field));
                this.promises.push($p);
                return;
            }
            this.handleSyncError(field, this.validator.errors);
        }
        handleSyncError(field, errors) {
            const fieldError = this.findError(field.path ?? '', errors);
            if (!fieldError)
                return;
            const message = `${field.label} ${fieldError.message}`;
            field.invalidate(message, false);
        }
        handleAsyncError(field, errors) {
            const fieldError = this.findError(field.path ?? '', errors);
            if (!fieldError)
                return;
            const message = `${field.label} ${fieldError.message}`;
            field.setValidationAsyncData(false, message);
        }
        normalizePath(value) {
            return String(value)
                .replace(/^[./]+/, "")
                .replace(/\]/g, "")
                .replace(/\[/g, ".")
                .replace(/\//g, ".");
        }
        findError(path, errors) {
            if (!errors)
                return;
            const $path = this.normalizePath(path);
            return errors.find(({ instancePath, dataPath }) => {
                const $dataPath = this.normalizePath(typeof instancePath === "string" ? instancePath : dataPath);
                return $dataPath.includes($path);
            });
        }
        executeAsyncValidation(field) {
            if (field.validationAsyncData.valid === false) {
                field.invalidate(field.validationAsyncData.message ?? undefined, false, true);
            }
        }
    }
    var AJV_default = (config) => ({
        class: (AJV),
        config,
    });

    return AJV_default;

}));
//# sourceMappingURL=MobxFormkitValidatorAJV.umd.js.map
