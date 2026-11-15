'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class JOI {
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
        const data = this.state.form.flatMapValues;
        const { error } = this.schema.validate(data, { abortEarly: false });
        if (!error)
            return;
        const fieldPathArray = (field.path ?? "").split(".");
        const fieldErrors = error.details
            .filter((detail) => {
            const errorPathString = detail.path.join(".");
            const fieldPathString = fieldPathArray.join(".");
            return (errorPathString === fieldPathString ||
                errorPathString.startsWith(`${fieldPathString}.`));
        })
            .map((detail) => {
            const label = detail.context?.label || detail.path.join(".");
            const message = detail.message.replace(`${detail.path.join(".")}`, label);
            return message;
        });
        if (fieldErrors.length) {
            field.validationErrorStack = fieldErrors;
        }
    }
}
var JOI_default = (config) => ({
    class: (JOI),
    config,
});

exports.default = JOI_default;
//# sourceMappingURL=JOI.js.map
