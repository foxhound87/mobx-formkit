'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require('mobx');
var lodash = require('lodash');
var Options = require('./Options.js');
var Bindings = require('./Bindings.js');
var utils = require('./utils.js');
var StateInterface = require('./models/StateInterface.js');
var OptionsModel = require('./models/OptionsModel.js');
var props = require('./props.js');

class State {
    mode = StateInterface.RuntimeMode.mixed;
    strict = false;
    form;
    options;
    bindings;
    $extra;
    $struct = [];
    disposers = {
        interceptor: {},
        observer: {},
    };
    initial = {
        props: {},
        fields: {},
    };
    current = {
        props: {},
        fields: {},
    };
    constructor({ form, initial, options, bindings }) {
        this.set("form", form);
        this.initProps(initial);
        this.options = new Options.default();
        this.options.set(options);
        this.bindings = new Bindings.default();
        this.bindings.register(bindings);
        this.observeOptions();
    }
    initProps(initial = {}) {
        const pickKeys = [
            ...props.props.editable,
            ...props.props.separated,
            ...props.props.validation,
            ...props.props.functions,
            ...props.props.handlers,
        ];
        const initialProps = Object.fromEntries(Object.entries(initial).filter(([k]) => pickKeys.includes(k)));
        this.set("initial", "props", initialProps);
        const $unified = utils.hasUnifiedProps(initial);
        const $separated = utils.hasSeparatedProps(initial);
        if (($separated || utils.isArrayOfStrings(initial.fields)) && !$unified) {
            const struct = utils.$try(initial.struct, initial.fields);
            this.struct(struct);
            this.strict = true;
            this.mode = StateInterface.RuntimeMode.separated;
            return;
        }
        this.struct(initial.struct);
        this.mode = StateInterface.RuntimeMode.unified;
    }
    /**
      Get/Set Fields Structure
    */
    struct(data = null) {
        if (data)
            this.$struct = data;
        return this.$struct;
    }
    /**
      Get Props/Fields
    */
    get(type, subtype) {
        return this[type][subtype];
    }
    /**
      Set Props/Fields
    */
    set(type, subtype, state = null) {
        if (type === "form") {
            // subtype is the form here
            this.form = subtype;
        }
        if (type === "initial") {
            Object.assign(this.initial[subtype], state);
            Object.assign(this.current[subtype], state);
        }
        if (type === "current") {
            Object.assign(this.current[subtype], state);
        }
    }
    extra(data = null) {
        if (typeof data === 'string')
            return lodash.get(this.$extra, data);
        if (data === null)
            return this.$extra;
        this.$extra = data;
        return null;
    }
    observeOptions() {
        // Fix Issue #201
        mobx.observe(this.options.options, utils.checkObserve([
            {
                // start observing fields validateOnChange
                type: "update",
                key: OptionsModel.OptionsEnum.validateOnChange,
                to: true,
                exec: () => this.form.each((field) => field.observeValidationOnChange()),
            },
            {
                // stop observing fields validateOnChange
                type: "update",
                key: OptionsModel.OptionsEnum.validateOnChange,
                to: false,
                exec: () => this.form.each((field) => {
                    if (typeof field.disposeValidationOnChange !== "function")
                        return;
                    field.disposeValidationOnChange();
                }),
            },
            {
                // start observing fields validateOnBlur
                type: "update",
                key: OptionsModel.OptionsEnum.validateOnBlur,
                to: true,
                exec: () => this.form.each((field) => field.observeValidationOnBlur()),
            },
            {
                // stop observing fields validateOnBlur
                type: "update",
                key: OptionsModel.OptionsEnum.validateOnBlur,
                to: false,
                exec: () => this.form.each((field) => {
                    if (typeof field.disposeValidationOnBlur !== "function")
                        return;
                    field.disposeValidationOnBlur();
                }),
            },
        ]));
    }
}

exports.default = State;
//# sourceMappingURL=State.js.map
