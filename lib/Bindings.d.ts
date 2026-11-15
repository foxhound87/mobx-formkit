import { FieldPropsEnum, FieldPropsType } from "./models/FieldProps";
import { BindingsInterface } from "./models/BindingsInterface";
export default class Bindings implements BindingsInterface {
    templates: {};
    rewriters: {
        default: {
            id: FieldPropsEnum;
            name: FieldPropsEnum;
            type: FieldPropsEnum;
            value: FieldPropsEnum;
            checked: FieldPropsEnum;
            label: FieldPropsEnum;
            placeholder: FieldPropsEnum;
            disabled: FieldPropsEnum;
            autoComplete: FieldPropsEnum;
            onChange: FieldPropsEnum;
            onBlur: FieldPropsEnum;
            onFocus: FieldPropsEnum;
            autoFocus: FieldPropsEnum;
            inputMode: FieldPropsEnum;
            onKeyUp: FieldPropsEnum;
            onKeyDown: FieldPropsEnum;
        };
    };
    register(bindings: FieldPropsType): Bindings;
    load(field: any, name: string | undefined, props: FieldPropsType): any;
}
//# sourceMappingURL=Bindings.d.ts.map