import { observe } from 'mobx';
import { get } from 'lodash-es';
import Options from './Options.js';
import Bindings from './Bindings.js';
import { hasUnifiedProps, hasSeparatedProps, isArrayOfStrings, $try, checkObserve } from './utils.js';
import { RuntimeMode } from './models/StateInterface.js';
import { OptionsEnum } from './models/OptionsModel.js';
import { props } from './props.js';

class State {
    mode = RuntimeMode.mixed;
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
        this.options = new Options();
        this.options.set(options);
        this.bindings = new Bindings();
        this.bindings.register(bindings);
        this.observeOptions();
    }
    initProps(initial = {}) {
        const pickKeys = [
            ...props.editable,
            ...props.separated,
            ...props.validation,
            ...props.functions,
            ...props.handlers,
        ];
        const initialProps = Object.fromEntries(Object.entries(initial).filter(([k]) => pickKeys.includes(k)));
        this.set("initial", "props", initialProps);
        const $unified = hasUnifiedProps(initial);
        const $separated = hasSeparatedProps(initial);
        if (($separated || isArrayOfStrings(initial.fields)) && !$unified) {
            const struct = $try(initial.struct, initial.fields);
            this.struct(struct);
            this.strict = true;
            this.mode = RuntimeMode.separated;
            return;
        }
        this.struct(initial.struct);
        this.mode = RuntimeMode.unified;
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
            return get(this.$extra, data);
        if (data === null)
            return this.$extra;
        this.$extra = data;
        return null;
    }
    observeOptions() {
        // Fix Issue #201
        observe(this.options.options, checkObserve([
            {
                // start observing fields validateOnChange
                type: "update",
                key: OptionsEnum.validateOnChange,
                to: true,
                exec: () => this.form.each((field) => field.observeValidationOnChange()),
            },
            {
                // stop observing fields validateOnChange
                type: "update",
                key: OptionsEnum.validateOnChange,
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
                key: OptionsEnum.validateOnBlur,
                to: true,
                exec: () => this.form.each((field) => field.observeValidationOnBlur()),
            },
            {
                // stop observing fields validateOnBlur
                type: "update",
                key: OptionsEnum.validateOnBlur,
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

export { State as default };
//# sourceMappingURL=State.js.map
