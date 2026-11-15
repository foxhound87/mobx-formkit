import vine from '@vinejs/vine';

class VINEJS {
    promises = [];
    config;
    state;
    extend;
    validator;
    schema;
    compiled;
    constructor({ config, state = null, promises = [], }) {
        this.state = state;
        this.promises = promises;
        this.config = config;
        this.extend = config?.extend;
        this.validator = config.package ?? vine;
        this.schema = config.schema;
        this.compiled = this.validator.compile(this.schema);
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
    // VineJS emits dot-notation paths (e.g. 'members.0.name') which match
    // the MRF field.path convention.
    validate(field) {
        const validationPromise = this.compiled
            .validate(field.state.form.flatMapValues)
            .then(() => field.setValidationAsyncData(true))
            .catch((error) => this.handleAsyncFail(field, error))
            .then(() => this.executeAsyncValidation(field));
        this.promises.push(validationPromise);
    }
    handleAsyncFail(field, error) {
        const messages = error?.messages ?? [];
        if (!messages.length)
            return;
        const fieldError = messages.find((item) => item.field === field.path);
        if (fieldError) {
            field.setValidationAsyncData(false, fieldError.message);
        }
    }
    executeAsyncValidation(field) {
        if (field.validationAsyncData.valid === false) {
            field.invalidate(field.validationAsyncData.message ?? undefined, false, true);
        }
    }
}
var VINEJS_default = (config) => ({
    class: (VINEJS),
    config,
});

export { VINEJS_default as default };
//# sourceMappingURL=VINEJS.js.map
