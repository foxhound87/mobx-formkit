import * as v from 'valibot';

class VALIBOT {
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
        this.validator = config.package ?? v;
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
    // Convert a Valibot issue.path (array of { key }) into an MRF-style string path
    // e.g. [{ key: 'members' }, { key: 0 }, { key: 'name' }] => 'members.0.name'
    normalizePath(issuePath = []) {
        return issuePath.map((seg) => seg?.key).join(".");
    }
    validate(field) {
        const result = v.safeParse(this.schema, field.state.form.flatMapValues);
        if (result.success)
            return;
        const messages = result.issues
            .filter((issue) => this.normalizePath(issue.path) === field.path)
            .map((issue) => issue.message);
        if (messages?.length) {
            field.validationErrorStack = messages;
        }
    }
}
var VALIBOT_default = (config) => ({
    class: (VALIBOT),
    config,
});

export { VALIBOT_default as default };
//# sourceMappingURL=VALIBOT.js.map
