import { FieldInterface } from "./models/FieldInterface";
import { props } from "./props";
declare const getObservableMapValues: (fields: any) => ReadonlyArray<FieldInterface>;
declare const getObservableMapKeys: (fields: any) => ReadonlyArray<any>;
declare const checkObserve: (collection: Record<string, any>[]) => (change: any) => any[];
declare const checkPropOccurrence: ({ type, data }: any) => boolean;
declare const hasProps: ($type: string, $data: any) => boolean;
/**
  Check Allowed Properties
*/
declare const allowedProps: (type: string, data: string[]) => void;
/**
  Throw Error if undefined Fields
*/
declare const throwError: (path: string, fields: any, msg?: null | string) => void;
declare const pathToStruct: (path: string) => string;
declare const isArrayFromStruct: (struct: string[], structPath: string) => boolean;
declare const hasSome: (obj: any, keys: any) => boolean;
declare const isEmptyArray: (field: any) => boolean;
declare const isArrayOfStrings: (struct: any) => boolean;
declare const isArrayOfObjects: (fields: any) => boolean;
declare const hasUnifiedProps: ({ fields }: any) => boolean;
declare const hasSeparatedProps: (initial: any) => boolean;
declare const allowNested: (field: any, strictProps: boolean) => boolean;
declare const parseIntKeys: (fields: any) => number[];
declare const hasIntKeys: (fields: any) => boolean;
declare const maxKey: (fields: any) => number;
declare const uniqueId: (field: any) => string;
declare const isEvent: (obj: any) => boolean;
declare const hasFiles: ($: any) => boolean;
declare const isBool: ($: any, val: any) => boolean;
declare const $try: (...args: any[]) => any;
export { props, checkObserve, checkPropOccurrence, hasProps, allowedProps, throwError, isArrayOfStrings, isEmptyArray, isArrayOfObjects, pathToStruct, isArrayFromStruct, hasUnifiedProps, hasSeparatedProps, allowNested, parseIntKeys, hasIntKeys, maxKey, uniqueId, isEvent, hasFiles, isBool, hasSome, $try, getObservableMapKeys, getObservableMapValues, };
//# sourceMappingURL=utils.d.ts.map