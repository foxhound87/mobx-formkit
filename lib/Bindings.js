'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('lodash');
var utils = require('./utils.js');
var FieldProps = require('./models/FieldProps.js');

class Bindings {
    templates = {
    // default: ({ field, form, props, keys, $try }) => ({
    //   [keys.id]: $try(props.id, field.id),
    // }),
    };
    rewriters = {
        default: {
            id: FieldProps.FieldPropsEnum.id,
            name: FieldProps.FieldPropsEnum.name,
            type: FieldProps.FieldPropsEnum.type,
            value: FieldProps.FieldPropsEnum.value,
            checked: FieldProps.FieldPropsEnum.checked,
            label: FieldProps.FieldPropsEnum.label,
            placeholder: FieldProps.FieldPropsEnum.placeholder,
            disabled: FieldProps.FieldPropsEnum.disabled,
            autoComplete: FieldProps.FieldPropsEnum.autoComplete,
            onChange: FieldProps.FieldPropsEnum.onChange,
            onBlur: FieldProps.FieldPropsEnum.onBlur,
            onFocus: FieldProps.FieldPropsEnum.onFocus,
            autoFocus: FieldProps.FieldPropsEnum.autoFocus,
            inputMode: FieldProps.FieldPropsEnum.inputMode,
            onKeyUp: FieldProps.FieldPropsEnum.onKeyUp,
            onKeyDown: FieldProps.FieldPropsEnum.onKeyDown,
        },
    };
    register(bindings) {
        lodash.each(bindings, (val, key) => {
            if ((typeof val === 'function'))
                lodash.merge(this.templates, { [key]: val });
            if (lodash.isPlainObject(val))
                lodash.merge(this.rewriters, { [key]: val });
        });
        return this;
    }
    load(field, name = FieldProps.FieldPropsEnum.default, props) {
        const args = ({
            keys: lodash.get(this.rewriters, FieldProps.FieldPropsEnum.default),
            form: field.state.form,
            field,
            props,
            $try: utils.$try,
        });
        if (lodash.has(this.templates, name)) {
            return lodash.get(this.templates, name)(args);
        }
        if (lodash.has(this.rewriters, name)) {
            const $bindings = {};
            lodash.each(lodash.get(this.rewriters, name), ($v, $k) => lodash.merge($bindings, { [$v]: utils.$try(props[$k], field[$k]) }));
            return $bindings;
        }
        if (lodash.has(this.templates, name)) {
            return lodash.get(this.templates, name)(args);
        }
        if (name === FieldProps.FieldPropsEnum.default) {
            const $bindings = {};
            lodash.each(lodash.get(this.rewriters, FieldProps.FieldPropsEnum.default), ($v, $k) => lodash.merge($bindings, { [$v]: utils.$try(props[$k], field[$k]) }));
            return $bindings;
        }
        throw new Error(`Bindings: template or rewriter "${name}" does not exist \u2014 register it or use the "default" binding`);
    }
}

exports.default = Bindings;
//# sourceMappingURL=Bindings.js.map
