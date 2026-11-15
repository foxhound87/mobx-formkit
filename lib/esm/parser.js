import { merge, get, isEmpty, each, set, transform, has, isPlainObject } from 'lodash-es';
import { FieldPropsEnum, SeparatedPropsMode } from './models/FieldProps.js';
import { $try, pathToStruct, isArrayOfStrings, isArrayOfObjects, hasUnifiedProps, allowNested, isEmptyArray } from './utils.js';

const defaultValue = ({ type = undefined, value = undefined, nullable = undefined, isEmptyArray = false, fallbackValueOption = "", }) => {
    if (Array.isArray(value) || isEmptyArray)
        return [];
    if (nullable || value instanceof Date || type === "date" || type === "datetime-local")
        return null;
    if (typeof value === 'number' || type === "number")
        return 0;
    if (typeof value === 'boolean' || type === "checkbox")
        return false;
    if (typeof value === 'string' || type === "file")
        return "";
    return fallbackValueOption;
};
const parsePath = (path) => {
    let $path = String(path ?? '');
    $path = $path.replace(/\[/g, ".");
    $path = $path.replace(/\]/g, "");
    return $path;
};
const parseInput = (input, { fallbackValueOption = "", type, isEmptyArray, separated, unified, fallback }) => input($try(separated, unified, fallback, defaultValue({
    fallbackValueOption,
    type,
    isEmptyArray,
})));
const parseArrayProp = (val, prop, removeNullishValuesInArrays) => {
    const values = Object.values(val);
    const isValProp = [
        FieldPropsEnum.value,
        FieldPropsEnum.initial,
        FieldPropsEnum.default,
    ].includes(prop);
    if (removeNullishValuesInArrays && isValProp) {
        return values.filter(v => v !== null && v !== undefined && v !== "");
    }
    return values;
};
const parseCheckArray = (field, value, prop, removeNullishValuesInArrays) => {
    if (field.incremental && value !== null && typeof value === 'object' && isEmpty(value))
        return [];
    return field.hasIncrementalKeys ? parseArrayProp(value, prop, removeNullishValuesInArrays) : value;
};
const parseCheckOutput = (field, prop, retrieveNullifiedEmptyStrings = false) => {
    if (prop === FieldPropsEnum.value || prop.startsWith("value.")) {
        const base = field.$output ? field.$output(field[FieldPropsEnum.value]) : field[FieldPropsEnum.value];
        const value = prop.startsWith("value.") ? get(base, prop.substring(6)) : base;
        if (typeof value === 'string' && isEmpty(value) && retrieveNullifiedEmptyStrings)
            return null;
        return value;
    }
    return field[prop];
};
const defineFieldsFromStruct = (struct, add = false) => struct.reduceRight(($, name) => {
    const obj = {};
    if (name.endsWith("[]")) {
        const val = add ? [$] : [];
        obj[name.replace(/\[\]$/, "")] = val;
        return obj;
    }
    // no brakets
    const prev = struct[struct.indexOf(name) - 1];
    const stop = !!prev && prev.endsWith("[]") && struct[struct.length - 1] === name;
    if (!add && stop)
        return obj;
    obj[name] = $;
    return obj;
}, {});
const handleFieldsArrayOfStrings = ($fields, add = false) => {
    let fields = $fields;
    // handle array with field struct (strings)
    if (isArrayOfStrings(fields)) {
        fields = transform(fields, ($obj, $) => {
            const pathStruct = $.split(".");
            // as array of strings (with empty values)
            if (!pathStruct.length)
                return Object.assign($obj, { [$]: "" });
            // define flat or nested fields from pathStruct
            return merge($obj, defineFieldsFromStruct(pathStruct, add));
        }, {});
    }
    return fields;
};
const handleFieldsArrayOfObjects = ($fields) => {
    let fields = $fields;
    // handle array of objects (with unified props)
    if (isArrayOfObjects(fields)) {
        fields = transform(fields, ($obj, field) => {
            if (hasUnifiedProps({ fields: { field } }) && !has(field, FieldPropsEnum.name))
                return undefined;
            return Object.assign($obj, { [field.name]: field });
        }, {});
    }
    return fields;
};
const handleFieldsNested = (fields, strictProps = true) => transform(fields, (obj, field, key) => {
    if (allowNested(field, strictProps)) {
        // define nested field
        return Object.assign(obj, {
            [key]: {
                fields: isEmptyArray(field) ? [] : handleFieldsNested(field),
            },
        });
    }
    return Object.assign(obj, { [key]: field });
}, {});
/* mapNestedValuesToUnifiedValues

FROM:

{
  street: '123 Fake St.',
  zip: '12345',
}

TO:

[{
  name: 'street'
  value: '123 Fake St.',
}, {
  name: 'zip'
  value: '12345',
}]

*/
const mapNestedValuesToUnifiedValues = (data) => isPlainObject(data)
    ? Object.entries(data).map(([name, value]) => ({ value, name }))
    : undefined;
/* reduceValuesToUnifiedFields

FROM:

{
  name: 'fatty',
  address: {
    street: '123 Fake St.',
    zip: '12345',
  },
};

TO:

{
  name: {
    value: 'fatty',
    fields: undefined
  },
  address: {
    value: {
      street: '123 Fake St.',
      zip: '12345'
    },
    fields: [ ... ]
  },
};

*/
const reduceValuesToUnifiedFields = (values) => transform(values, (obj, value, key) => Object.assign(obj, {
    [key]: {
        value,
        fields: mapNestedValuesToUnifiedValues(value),
    },
}), {});
/*
  Fallback Unified Props to Separated Mode
*/
const handleFieldsPropsFallback = (fields, initial, fallback) => {
    if (!has(initial, SeparatedPropsMode.values))
        return fields;
    // if the 'values' object is passed in constructor
    // then update the fields definitions
    let { values } = initial;
    if (hasUnifiedProps({ fields: initial.fields })) {
        values = reduceValuesToUnifiedFields(values);
    }
    return merge(fields, transform(values, (result, v, k) => {
        if (Array.isArray(fields[k]))
            result[k] = v;
        if (!(k in fields) && (!isNaN(Number(k)) || fallback))
            result[k] = v;
    }, {}));
};
const mergeSchemaDefaults = (fields, validator) => {
    if (validator) {
        const schema = get(validator.plugins, "ajv.config.schema");
        if (isEmpty(fields) && schema && !!schema.properties) {
            each(schema.properties, (prop, key) => {
                set(fields, key, {
                    value: prop.default,
                    label: prop.title,
                });
            });
        }
    }
    return fields;
};
const prepareFieldsData = (initial, strictProps = true, fallback = true) => {
    let fields = merge(handleFieldsArrayOfStrings(initial.fields, false), handleFieldsArrayOfStrings(initial.struct, false));
    fields = handleFieldsArrayOfObjects(fields);
    fields = handleFieldsPropsFallback(fields, initial, fallback);
    fields = handleFieldsNested(fields, strictProps);
    return fields;
};
const pathToFieldsTree = (struct, path, n = 0, add = false) => {
    const $struct = (Array.isArray(struct) ? struct : Object.values(struct)).filter((item) => typeof item === 'string');
    const structPath = pathToStruct(path);
    const structArray = $struct.filter((item) => item.startsWith(structPath));
    const $tree = handleFieldsArrayOfStrings(structArray, add);
    const $structPath = structPath.replace(/\[\]/g, `[${n}]`);
    const fields = handleFieldsNested(get($tree, $structPath));
    // fix issues #614 & #615
    $struct.length && $struct
        .filter(s => s.startsWith(path + '[]'))
        .map(s => s.substring((path + '[].').length))
        .filter(s => s.endsWith('[]'))
        .map(s => s.substring(0, s.length - 2))
        .forEach(s => {
        const ss = s.split('.');
        let t = fields[0]?.fields;
        for (let i = 0; i < ss.length; i++) {
            t = t?.[ss[i]]?.[FieldPropsEnum.fields];
            if (!t)
                break;
        }
        if (t)
            delete t[0];
    });
    return fields;
};

export { defaultValue, handleFieldsArrayOfStrings, handleFieldsNested, mergeSchemaDefaults, parseArrayProp, parseCheckArray, parseCheckOutput, parseInput, parsePath, pathToFieldsTree, prepareFieldsData };
//# sourceMappingURL=parser.js.map
