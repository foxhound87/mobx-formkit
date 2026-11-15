class YUP {
    promises = [];
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
        this.schema = config.schema(this.validator);
        this.extendValidator();
    }
    // Metodo per estendere il validatore
    extendValidator() {
        if (typeof this.extend === 'function') {
            this.extend({
                validator: this.validator,
                form: this.state.form,
            });
        }
    }
    // Metodo di validazione principale
    validate(field) {
        const fieldValidationPromise = this.createValidationPromise(field);
        this.promises.push(fieldValidationPromise);
    }
    // Creazione della promise per la validazione
    createValidationPromise(field) {
        return new Promise((resolve) => {
            this.schema
                .validateAt(field.path, this.state.form.values(), { strict: true })
                .then(() => this.handleAsyncPasses(field, resolve))
                .catch((error) => this.handleAsyncFails(field, resolve, error));
        });
    }
    // Gestione dei successi della validazione asincrona
    handleAsyncPasses(field, resolve) {
        field.setValidationAsyncData(true);
        resolve();
    }
    // Gestione dei fallimenti della validazione asincrona
    handleAsyncFails(field, resolve, error) {
        // Yup a volte restituisce errori senza path (es. array vuoti)
        const isSameField = error.path === field.path || error.path === undefined;
        if (isSameField) {
            const message = error.message?.replace(error.path ?? field.path, field.label);
            field.setValidationAsyncData(false, message);
            this.executeAsyncValidation(field);
        }
        resolve(undefined);
    }
    // Esecuzione della validazione asincrona
    executeAsyncValidation(field) {
        if (field.validationAsyncData.valid === false) {
            field.invalidate(field.validationAsyncData.message, false, true);
        }
    }
}
var YUP_default = (config) => ({
    class: (YUP),
    config,
});

export { YUP_default as default };
//# sourceMappingURL=YUP.js.map
