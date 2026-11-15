import Bindings from "../Bindings";
import { FieldPropsEnum, FieldPropsType } from "./FieldProps";
export interface BindingsInterface {
    templates: {
        [index: string]: {
            [key: string]: ({ field, props, keys }: any) => any;
        };
    };
    rewriters: {
        [index: string]: {
            [key: string]: FieldPropsEnum;
        };
    };
    load: (field: any, name: string, props: FieldPropsType) => FieldPropsType;
    register: (bindings: FieldPropsType) => Bindings;
}
export default BindingsInterface;
//# sourceMappingURL=BindingsInterface.d.ts.map