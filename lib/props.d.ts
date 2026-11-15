import { FieldPropsOccurrence } from "./models/FieldProps";
export interface PropsGroupsInterface {
    editable: string[];
    handlers: string[];
    computed: string[];
    functions: string[];
    validation: string[];
    separated: string[];
    occurrences: {
        [index: string]: FieldPropsOccurrence;
    };
}
export declare const props: PropsGroupsInterface;
//# sourceMappingURL=props.d.ts.map