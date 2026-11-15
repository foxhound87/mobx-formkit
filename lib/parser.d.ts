declare const defaultValue: ({ type, value, nullable, isEmptyArray, fallbackValueOption, }: any) => null | false | 0 | [] | "";
declare const parsePath: (path: any) => string;
declare const parseInput: (input: (...args: any[]) => any, { fallbackValueOption, type, isEmptyArray, separated, unified, fallback }: any) => any;
declare const parseArrayProp: (val: any, prop: string, removeNullishValuesInArrays: boolean) => any;
declare const parseCheckArray: (field: any, value: any, prop: string, removeNullishValuesInArrays: boolean) => any;
declare const parseCheckOutput: (field: any, prop: string, retrieveNullifiedEmptyStrings?: boolean) => any;
declare const handleFieldsArrayOfStrings: ($fields: any, add?: boolean) => any;
declare const handleFieldsNested: (fields: any, strictProps?: boolean) => any;
declare const mergeSchemaDefaults: (fields: any, validator: any) => any;
declare const prepareFieldsData: (initial: any, strictProps?: boolean, fallback?: boolean) => any;
declare const pathToFieldsTree: (struct: any, path: string, n?: number, add?: boolean) => any;
export { defaultValue, parseInput, parsePath, parseArrayProp, parseCheckArray, parseCheckOutput, mergeSchemaDefaults, handleFieldsNested, handleFieldsArrayOfStrings, prepareFieldsData, pathToFieldsTree, };
//# sourceMappingURL=parser.d.ts.map