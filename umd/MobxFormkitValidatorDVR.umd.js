(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash')) :
    typeof define === 'function' && define.amd ? define(['lodash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MobxFormkitValidatorDVR = factory(global._));
})(this, (function (lodash) { 'use strict';

    class DVR {
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
            const data = this.state.form.flatMapValues;
            this.validateFieldAsync(field, data);
            this.validateFieldSync(field, data);
        }
        makeLabels(validation, field) {
            const labels = { [field.path ?? ""]: field.label };
            lodash.forIn(validation.rules[field.path ?? ""], (rule) => {
                if (typeof rule.value === "string" &&
                    rule.name.match(/^(required_|same|different)/)) {
                    lodash.forIn(rule.value.split(","), (p, i) => {
                        if (!rule.name.match(/^required_(if|unless)/) || i % 2 === 0) {
                            const f = this.state.form.$(p);
                            if (f && f.path && f.label) {
                                labels[f.path] = f.label;
                            }
                        }
                    });
                }
                else if (typeof rule.value === "string" &&
                    rule.name.match(/^(before|after)/)) {
                    const f = this.state.form.$(rule.value);
                    if (f && f.path && f.label) {
                        labels[f.path] = f.label;
                    }
                }
            });
            validation.setAttributeNames(labels);
        }
        validateFieldSync(field, data) {
            const $rules = this.rules(field.rules, "sync");
            if (lodash.isEmpty($rules[0]))
                return;
            const rules = { [field.path ?? ""]: $rules };
            const validation = new this.validator(data, rules);
            this.makeLabels(validation, field);
            if (validation.passes())
                return;
            field.invalidate(validation.errors.get(field.path)[0], false);
        }
        validateFieldAsync(field, data) {
            const $rules = this.rules(field.rules, "async");
            if (lodash.isEmpty($rules[0]))
                return;
            const rules = { [field.path ?? ""]: $rules };
            const validation = new this.validator(data, rules);
            this.makeLabels(validation, field);
            const $p = new Promise((resolve) => validation.checkAsync(() => this.handleAsyncPasses(field, resolve), () => this.handleAsyncFails(field, validation, resolve)));
            this.promises.push($p);
        }
        handleAsyncPasses(field, resolve) {
            field.setValidationAsyncData(true);
            resolve();
        }
        handleAsyncFails(field, validation, resolve) {
            field.setValidationAsyncData(false, validation.errors.get(field.path)[0]);
            this.executeAsyncValidation(field);
            resolve();
        }
        executeAsyncValidation(field) {
            if (field.validationAsyncData.valid === false) {
                field.invalidate(field.validationAsyncData.message ?? undefined, false, true);
            }
        }
        rules(rules, type) {
            const $rules = Array.isArray(rules) ? rules : typeof rules === 'string' ? rules.split("|") : [];
            const v = new this.validator();
            return $rules.filter(($rule) => type === "async"
                ? v.getRule($rule.split(":")[0])?.async
                : !v.getRule($rule.split(":")[0])?.async);
        }
    }
    var DVR_default = (config) => ({
        class: (DVR),
        config,
    });

    return DVR_default;

}));
//# sourceMappingURL=MobxFormkitValidatorDVR.umd.js.map
