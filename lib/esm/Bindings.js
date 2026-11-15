import { each, merge, isPlainObject, get, has } from 'lodash-es';
import { $try } from './utils.js';
import { FieldPropsEnum } from './models/FieldProps.js';

class Bindings {
    templates = {
    // default: ({ field, form, props, keys, $try }) => ({
    //   [keys.id]: $try(props.id, field.id),
    // }),
    };
    rewriters = {
        default: {
            id: FieldPropsEnum.id,
            name: FieldPropsEnum.name,
            type: FieldPropsEnum.type,
            value: FieldPropsEnum.value,
            checked: FieldPropsEnum.checked,
            label: FieldPropsEnum.label,
            placeholder: FieldPropsEnum.placeholder,
            disabled: FieldPropsEnum.disabled,
            autoComplete: FieldPropsEnum.autoComplete,
            onChange: FieldPropsEnum.onChange,
            onBlur: FieldPropsEnum.onBlur,
            onFocus: FieldPropsEnum.onFocus,
            autoFocus: FieldPropsEnum.autoFocus,
            inputMode: FieldPropsEnum.inputMode,
            onKeyUp: FieldPropsEnum.onKeyUp,
            onKeyDown: FieldPropsEnum.onKeyDown,
        },
    };
    register(bindings) {
        each(bindings, (val, key) => {
            if ((typeof val === 'function'))
                merge(this.templates, { [key]: val });
            if (isPlainObject(val))
                merge(this.rewriters, { [key]: val });
        });
        return this;
    }
    load(field, name = FieldPropsEnum.default, props) {
        const args = ({
            keys: get(this.rewriters, FieldPropsEnum.default),
            form: field.state.form,
            field,
            props,
            $try,
        });
        if (has(this.templates, name)) {
            return get(this.templates, name)(args);
        }
        if (has(this.rewriters, name)) {
            const $bindings = {};
            each(get(this.rewriters, name), ($v, $k) => merge($bindings, { [$v]: $try(props[$k], field[$k]) }));
            return $bindings;
        }
        if (has(this.templates, name)) {
            return get(this.templates, name)(args);
        }
        if (name === FieldPropsEnum.default) {
            const $bindings = {};
            each(get(this.rewriters, FieldPropsEnum.default), ($v, $k) => merge($bindings, { [$v]: $try(props[$k], field[$k]) }));
            return $bindings;
        }
        throw new Error(`Bindings: template or rewriter "${name}" does not exist \u2014 register it or use the "default" binding`);
    }
}

export { Bindings as default };
//# sourceMappingURL=Bindings.js.map
