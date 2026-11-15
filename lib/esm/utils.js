import { isPlainObject, has, isEmpty } from 'lodash-es';
import { values, keys } from 'mobx';
import { FieldPropsOccurrence, AllowedFieldPropsTypes, FieldPropsEnum } from './models/FieldProps.js';
import { props } from './props.js';

const getObservableMapValues = (fields) => {
    // ArrayMap duck-typing
    if (fields && fields._isArrayMap) {
        const result = [];
        fields.forEach((value) => result.push(value));
        return result;
    }
    return values(fields);
};
const getObservableMapKeys = (fields) => {
    // ArrayMap duck-typing
    if (fields && fields._isArrayMap) {
        return Array.from(fields.keys());
    }
    return keys(fields);
};
const checkObserveItem = (change) => ({ key, to, type, exec }) => change.type === type &&
    change.name === key &&
    change.newValue === to &&
    exec.apply(change, [change]);
const checkObserve = (collection) => (change) => collection.map(checkObserveItem(change));
const checkPropOccurrence = ({ type, data }) => {
    let $check;
    switch (type) {
        case FieldPropsOccurrence.some:
            $check = ($data) => $data.some(Boolean);
            break;
        case FieldPropsOccurrence.every:
            $check = ($data) => $data.every(Boolean);
            break;
        default: throw new Error('Occurrence not found for specified prop');
    }
    return $check(data);
};
const hasProps = ($type, $data) => {
    let $props;
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
    return $data.filter((x) => $props.includes(x)).length > 0;
};
/**
  Check Allowed Properties
*/
const allowedProps = (type, data) => {
    if (hasProps(type, data))
        return;
    const $msg = "The selected property is not allowed";
    throw new Error(`${$msg} (${JSON.stringify(data)})`);
};
/**
  Throw Error if undefined Fields
*/
const throwError = (path, fields, msg = null) => {
    if (fields != null)
        return;
    const $msg = msg == null ? "The selected field is not defined" : msg;
    throw new Error(`${$msg} (${path})`);
};
const pathToStruct = (path) => {
    let struct;
    struct = path.replace(/\.\d+($|\.)/g, "[].");
    struct = struct.replace("..", ".");
    struct = struct.replace(/^\.+|\.+$/g, "");
    return struct;
};
const isArrayFromStruct = (struct, structPath) => {
    if (isArrayOfStrings(struct))
        return !!struct
            .filter((s) => s.startsWith(structPath))
            .find((s) => s.substring(structPath.length) === "[]")
            || (struct?.find((e) => e === structPath)?.endsWith('[]') ?? false);
    else
        return false;
};
const hasSome = (obj, keys) => keys.some((key) => has(obj, key));
const isEmptyArray = (field) => isEmpty(field) && Array.isArray(field);
const isArrayOfStrings = (struct) => Array.isArray(struct) && struct.every((s) => typeof s === 'string');
const isArrayOfObjects = (fields) => Array.isArray(fields) && fields.every((f) => isPlainObject(f));
const getKeys = (fields) => fields ? [...new Set(Object.values(fields).flatMap((values) => values ? Object.keys(values) : []))] : [];
const hasUnifiedProps = ({ fields }) => !isArrayOfStrings({ fields }) && hasProps(AllowedFieldPropsTypes.editable, getKeys(fields));
const hasSeparatedProps = (initial) => hasSome(initial, props.separated) || hasSome(initial, props.validation);
const allowNested = (field, strictProps) => field !== null && typeof field === 'object' &&
    !(field instanceof Date) &&
    !has(field, FieldPropsEnum.fields) &&
    !has(field, FieldPropsEnum.class) &&
    (!hasSome(field, [
        ...props.editable,
        ...props.handlers,
        ...props.validation,
        ...props.functions,
    ]) || strictProps);
const parseIntKeys = (fields) => Array.from(getObservableMapKeys(fields)).map(Number);
const hasIntKeys = (fields) => parseIntKeys(fields).every((x) => Number.isInteger(x));
const maxKey = (fields) => {
    const keys = parseIntKeys(fields);
    const maxVal = keys.length ? Math.max(...keys) : undefined;
    return maxVal === void 0 ? 0 : maxVal + 1;
};
let _idCounter = 0;
const _localUniqueId = (prefix) => `${prefix}${++_idCounter}`;
const uniqueId = (field) => _localUniqueId([field.path.replace(/\./g, "-"), "--"].join(""));
const isEvent = (obj) => {
    if (obj == null || typeof Event === "undefined")
        return false;
    return obj instanceof Event || obj.target != null;
};
const hasFiles = ($) => !!$?.target?.files && $.target.files.length !== 0;
const isBool = ($, val) => typeof val === 'boolean' && typeof $.target.checked === 'boolean';
const $try = (...args) => {
    for (const val of args) {
        if (val !== undefined)
            return val;
    }
    return undefined;
};

export { $try, allowNested, allowedProps, checkObserve, checkPropOccurrence, getObservableMapKeys, getObservableMapValues, hasFiles, hasIntKeys, hasProps, hasSeparatedProps, hasSome, hasUnifiedProps, isArrayFromStruct, isArrayOfObjects, isArrayOfStrings, isBool, isEmptyArray, isEvent, maxKey, parseIntKeys, pathToStruct, props, throwError, uniqueId };
//# sourceMappingURL=utils.js.map
