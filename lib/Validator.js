'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var compat = require('./compat.js');
var lodash = require('lodash');
var utils = require('./utils.js');
var OptionsModel = require('./models/OptionsModel.js');

class Validator {
    promises = [];
    form = null;
    drivers = {};
    plugins = {
        vjf: undefined,
        dvr: undefined,
        ajv: undefined,
        yup: undefined,
        zod: undefined,
        joi: undefined,
        valibot: undefined,
        vinejs: undefined,
    };
    error = null;
    constructor(obj) {
        compat.makeObservable(this, {
            error: mobx.observable,
            validate: mobx.action,
            validateField: mobx.action,
        });
        this.form = obj.form;
        Object.assign(this.plugins, obj.plugins);
        this.initDrivers();
    }
    initDrivers() {
        Object.entries(this.plugins).forEach(([key, plugin]) => {
            this.drivers[key] = (plugin && plugin.class) &&
                new (plugin.class)({
                    config: plugin.config,
                    state: this.form.state,
                    promises: this.promises,
                });
        });
    }
    validate(opt, obj) {
        const path = utils.$try(opt?.path, opt);
        const instance = utils.$try(opt?.field, this.form.select(path, null, false), this.form);
        const related = utils.$try(opt?.related, obj?.related, true);
        const showErrors = utils.$try(opt?.showErrors, obj?.showErrors, false);
        instance.$validating = true;
        instance.$validated += 1;
        this.error = null;
        return new Promise((resolve) => {
            // validate instance (form or filed)
            if (instance.path || typeof path === 'string') {
                this.validateField({
                    field: instance,
                    showErrors,
                    related,
                    path,
                });
            }
            // validate nested fields
            instance.each((field) => this.validateField({
                path: field.path,
                field: field,
                showErrors,
                related,
            }));
            // wait all promises
            resolve(Promise.all(this.promises.splice(0)));
        })
            .then(mobx.action(() => {
            instance.$validating = false;
            instance.$clearing = false;
            instance.$resetting = false;
        }))
            .catch(mobx.action((err) => {
            instance.$validating = false;
            instance.$clearing = false;
            instance.$resetting = false;
            throw err;
        }))
            .then(() => instance);
    }
    validateField({ showErrors = false, related = false, field = null, path, }) {
        const instance = field || this.form.select(path);
        const { options } = this.form.state;
        // check if the field is a valid instance
        if (!instance.path)
            throw new Error("Validation Error: Invalid Field Instance");
        // do not validate soft deleted fields
        if (instance.deleted && !options.get(OptionsModel.OptionsEnum.validateDeletedFields, instance))
            return;
        // do not validate disabled fields
        if (instance.disabled && !options.get(OptionsModel.OptionsEnum.validateDisabledFields, instance))
            return;
        // do not validate pristine fields
        if (instance.isPristine && !options.get(OptionsModel.OptionsEnum.validatePristineFields, instance))
            return;
        // reset validation before validate
        if (options.get(OptionsModel.OptionsEnum.resetValidationBeforeValidate, instance))
            instance.resetValidation();
        // trim string value before validation
        if (options.get(OptionsModel.OptionsEnum.validateTrimmedValue, instance))
            instance.trim();
        // get stop on error
        const stopOnError = options.get(OptionsModel.OptionsEnum.stopValidationOnError, instance);
        // get validation plugin order
        const validationPluginOrder = options.get(OptionsModel.OptionsEnum.validationPluginsOrder, instance);
        const drivers = validationPluginOrder
            ? validationPluginOrder.map((n) => this.drivers[n])
            : this.drivers;
        // validate with all enabled drivers
        lodash.each(drivers, (driver) => {
            driver && driver.validate(instance);
            if (stopOnError && instance.hasError)
                return;
        });
        // send error to the view
        instance.showErrors(showErrors, false);
        // related validation
        if (related)
            this.validateRelatedFields(instance, showErrors);
    }
    /**
      Validate 'related' fields if specified
      and related validation allowed (recursive)
    */
    validateRelatedFields(field, showErrors) {
        if (!field.related || !field.related.length)
            return;
        field.related.map((path) => this.validateField({
            related: false,
            showErrors,
            path,
        }));
    }
}

exports.default = Validator;
//# sourceMappingURL=Validator.js.map
