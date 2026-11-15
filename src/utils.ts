import { each, has, isEmpty, isPlainObject } from "lodash";
import { values as mobxValues, keys as mobxKeys } from "mobx";
import { FieldInterface } from "./models/FieldInterface";
import { AllowedFieldPropsTypes, FieldPropsEnum, FieldPropsOccurrence } from "./models/FieldProps";
import { props } from "./props";

const getObservableMapValues = (fields: any):
  ReadonlyArray<FieldInterface> => {
  // ArrayMap duck-typing
  if (fields && fields._isArrayMap) {
    const result: FieldInterface[] = [];
    fields.forEach((value: FieldInterface) => result.push(value));
    return result;
  }
  return mobxValues(fields);
};

const getObservableMapKeys = (fields: any):
  ReadonlyArray<any> => {
  // ArrayMap duck-typing
  if (fields && fields._isArrayMap) {
    return Array.from(fields.keys());
  }
  return mobxKeys(fields);
};

const checkObserveItem =
  (change: any) =>
  ({ key, to, type, exec }: any) =>
    change.type === type &&
    change.name === key &&
    change.newValue === to &&
    exec.apply(change, [change]);

const checkObserve = (collection: Record<string, any>[]) => (change: any) =>
  collection.map(checkObserveItem(change));

const checkPropOccurrence = ({ type, data }: any): boolean => {
  let $check: any;
  switch (type) {
    case FieldPropsOccurrence.some: $check = ($data: object) => ($data as any[]).some(Boolean); break;
    case FieldPropsOccurrence.every: $check = ($data: object) => ($data as any[]).every(Boolean); break;
    default: throw new Error('Occurrence not found for specified prop');
  }
  return $check(data);
};

const hasProps = ($type: string, $data: any): boolean => {
  let $props: string[] | null;
  switch ($type) {
    case AllowedFieldPropsTypes.computed:
      $props = props.computed;
      break;
    case AllowedFieldPropsTypes.observable:
        $props = [
          FieldPropsEnum.fields,
          ...props.computed,
          ...props.editable,
        ];
        break;
    case AllowedFieldPropsTypes.editable:
      $props = [
        ...props.editable,
        ...props.validation,
        ...props.functions,
        ...props.handlers,
      ];
      break;
    case AllowedFieldPropsTypes.all:
      $props = [
        FieldPropsEnum.id,
        FieldPropsEnum.key,
        FieldPropsEnum.name,
        FieldPropsEnum.path,
        ...props.computed,
        ...props.editable,
        ...props.validation,
        ...props.functions,
        ...props.handlers,
      ];
      break;
    default:
      $props = null;
  }

  return $data.filter((x: string) => $props!.includes(x)).length > 0;
};

/**
  Check Allowed Properties
*/
const allowedProps = (type: string, data: string[]): void => {
  if (hasProps(type, data)) return;
  const $msg = "The selected property is not allowed";
  throw new Error(`${$msg} (${JSON.stringify(data)})`);
};

/**
  Throw Error if undefined Fields
*/
const throwError = (path: string, fields: any, msg: null | string = null): void => {
  if (fields != null) return;
  const $msg = msg == null ? "The selected field is not defined" : msg;
  throw new Error(`${$msg} (${path})`);
};

const pathToStruct = (path: string): string => {
  let struct;
  struct = path.replace(/\.\d+($|\.)/g, "[].");
  struct = struct.replace("..", ".");
  struct = struct.replace(/^\.+|\.+$/g, "");
  return struct;
};

const isArrayFromStruct = (struct: string[], structPath: string): boolean => {
  if (isArrayOfStrings(struct)) return !!struct
    .filter((s) => s.startsWith(structPath))
    .find((s) => s.substring(structPath.length) === "[]")
    || (struct?.find((e) => e === structPath)?.endsWith('[]') ?? false);
  else return false;
};

const hasSome = (obj: any, keys: any): boolean =>
  keys.some((key: string) => has(obj, key));

const isEmptyArray = (field: any): boolean =>
  isEmpty(field) && Array.isArray(field);

const isArrayOfStrings = (struct: any): boolean =>
  Array.isArray(struct) && struct.every((s: any) => typeof s === 'string');

const isArrayOfObjects = (fields: any): boolean =>
  Array.isArray(fields) && fields.every((f: any) => isPlainObject(f));

const getKeys = (fields: any) =>
  fields ? [...new Set(Object.values(fields).flatMap((values) => values ? Object.keys(values) : []))] : [];

const hasUnifiedProps = ({ fields }: any) =>
  !isArrayOfStrings({ fields }) && hasProps(AllowedFieldPropsTypes.editable, getKeys(fields));

const hasSeparatedProps = (initial: any): boolean =>
  hasSome(initial, props.separated) || hasSome(initial, props.validation);

const allowNested = (field: any, strictProps: boolean): boolean =>
  field !== null && typeof field === 'object' &&
  !(field instanceof Date) &&
  !has(field, FieldPropsEnum.fields) &&
  !has(field, FieldPropsEnum.class) &&
    (!hasSome(field, [
      ...props.editable,
      ...props.handlers,
      ...props.validation,
      ...props.functions,
    ]) || strictProps);

const parseIntKeys = (fields: any) =>
  Array.from(getObservableMapKeys(fields)).map(Number);

const hasIntKeys = (fields: any): boolean =>
  parseIntKeys(fields).every((x: any) => Number.isInteger(x));

const maxKey = (fields: any): number => {
  const keys = parseIntKeys(fields);
  const maxVal = keys.length ? Math.max(...keys) : undefined;
  return maxVal === void 0 ? 0 : maxVal + 1;
};

/**
  Clones a value tree keeping it independent from the original one.

  Plain objects, arrays and dates are cloned, any other object (File, Blob,
  class instances, ...) is kept by reference because it cannot be cloned
  safely.
*/
const cloneValues = (value: any): any => {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((item: any) => cloneValues(item));
  if (value instanceof Date) return new Date(value.getTime());
  if (!isPlainObject(value)) return value;
  const result: any = {};
  each(Object.keys(value), (key: string) => {
    result[key] = cloneValues(value[key]);
  });
  return result;
};

let _idCounter = 0;
const _localUniqueId = (prefix: string): string => `${prefix}${++_idCounter}`;

const uniqueId = (field: any): string =>
  _localUniqueId([field.path.replace(/\./g, "-"), "--"].join(""));

const isEvent = (obj: any): boolean => {
  if (obj == null || typeof Event === "undefined") return false;
  return obj instanceof Event || obj.target != null;
};

const hasFiles = ($: any): boolean =>
  !!$?.target?.files && $.target.files.length !== 0;

const isBool = ($: any, val: any): boolean =>
  typeof val === 'boolean' && typeof $.target.checked === 'boolean';

const $try = (...args: any[]) => {
  for (const val of args) {
    if (val !== undefined) return val;
  }
  return undefined;
};

export {
  props,
  checkObserve,
  checkPropOccurrence,
  hasProps,
  allowedProps,
  throwError,
  isArrayOfStrings,
  isEmptyArray,
  isArrayOfObjects,
  pathToStruct,
  isArrayFromStruct,
  hasUnifiedProps,
  hasSeparatedProps,
  allowNested,
  parseIntKeys,
  hasIntKeys,
  maxKey,
  cloneValues,
  uniqueId,
  isEvent,
  hasFiles,
  isBool,
  hasSome,
  $try,
  getObservableMapKeys,
  getObservableMapValues,
};
