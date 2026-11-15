# Form Options

- [Options Reference](#options-reference)
  - [Validation Triggers](#validation-triggers)
  - [Error Display](#error-display)
  - [Strict Mode](#strict-mode)
  - [Field Retrieval](#field-retrieval)
  - [Converters & Values](#converters--values)
  - [Debounce & Plugin Order](#debounce--plugin-order)
  - [Other](#other)
- [How to Set Options](#how-to-set-options)
  - [On Form Constructor](#set-options-on-form-constructor)
  - [On Extended Form Class](#set-options-on-extended-form-class)
  - [After Form Initialization](#set-options-after-form-initialization)
  - [Get Current Options](#get-current-form-options)
  - [Get Option by Key](#get-form-option-by-key)

---

## Options Reference

> All options can also be set on individual fields via the field `options` prop.

### Validation Triggers

Control when validation runs.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **validateOnInit** | boolean | `true` | Validate the entire form on initialization |
| **validateOnSubmit** | boolean | `true` | Validate on submit. When disabled, `onSuccess`/`onError` hooks won't fire |
| **validateOnBlur** | boolean | `true` | Validate field when it loses focus |
| **validateOnChange** | boolean | `false` | Validate field on every value change |
| **validateOnChangeAfterSubmit** | boolean | `false` | Validate on change only after the first form submission |
| **validateOnChangeAfterInitialBlur** | boolean | `false` | Validate on change only after the field has been blurred at least once |
| **validateOnClear** | boolean | `false` | Validate after `clear()` |
| **validateOnReset** | boolean | `false` | Validate after `reset()` |
| **validateOnRestore** | boolean | `false` | Validate after `restore()` |
| **validateDeletedFields** | boolean | `false` | Include soft-deleted fields in validation |
| **validateDisabledFields** | boolean | `false` | Include disabled fields in validation |
| **validatePristineFields** | boolean | `true` | Include untouched fields in validation |
| **validateTrimmedValue** | boolean | `false` | Apply `trim()` to field value before validating |

> 💡 **Tip:** Use `validateOnChange: true` for real-time feedback, `validateOnBlur: true` (default) for less intrusive validation. Combine `validateOnChangeAfterInitialBlur` for a balance — start validating on change only after the user has left the field once.

```javascript
// Validate on every keystroke after first blur
const options = {
  validateOnChange: false,
  validateOnChangeAfterInitialBlur: true,
  showErrorsOnChange: true,
};
```

---

### Error Display

Control when and how error messages are shown.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **showErrorsOnInit** | boolean | `false` | Show errors on form init (with `validateOnInit`) |
| **showErrorsOnSubmit** | boolean | `true` | Show errors after submit |
| **showErrorsOnBlur** | boolean | `true` | Show errors on field blur |
| **showErrorsOnChange** | boolean | `true` | Show errors on value change |
| **showErrorsOnClear** | boolean | `false` | Show errors after `clear()` |
| **showErrorsOnReset** | boolean | `true` | Show errors after `reset()` |
| **showErrorsOnRestore** | boolean | `false` | Show errors after `restore()` |
| **defaultGenericError** | string | `null` | Generic error message shown when validation fails |
| **submitThrowsError** | boolean | `true` | If true, `submit()` throws when validation fails (requires `defaultGenericError`) |
| **bubbleUpErrorMessages** | boolean | `false` | Container fields show the first child error instead of `null` |

```javascript
// Generic error message that doesn't throw
const options = {
  defaultGenericError: 'Please fix the errors before submitting.',
  submitThrowsError: false,
};
```

```javascript
// Show first child error on container fields
const options = {
  bubbleUpErrorMessages: true,
};
// form.$('address').error → returns first error from address.street or address.city
```

---

### Strict Mode

Throw errors when referencing undefined fields — useful for catching bugs during development.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **strictSelect** | boolean | `true` | Throw if selecting an undefined field via `select()` or `$()` |
| **strictSet** | boolean | `false` | Throw if setting a prop on an undefined field via `set()` |
| **strictUpdate** | boolean | `false` | Throw if updating an undefined field via `update()` |
| **strictDelete** | boolean | `true` | Throw if deleting an undefined field via `del()` |

```javascript
// Lax mode — no errors for undefined fields
const options = {
  strictSelect: false,
  strictSet: false,
  strictUpdate: false,
  strictDelete: false,
};
```

---

### Field Retrieval

Filter which field values, errors, or properties are returned by `get()`, `values()`, `errors()`, etc.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **retrieveOnlyEnabledFieldsValues** | boolean | `false` | Exclude disabled field values from `get('value')` / `values()` |
| **retrieveOnlyEnabledFieldsErrors** | boolean | `false` | Exclude disabled field errors from `get('error')` / `errors()` |
| **retrieveOnlyDirtyFieldsValues** | boolean | `false` | Include only changed field values in `get('value')` / `values()` |
| **removeNullishValuesInArrays** | boolean | `false` | Remove `null`, `undefined`, `""` from array values |
| **retrieveNullifiedEmptyStrings** | boolean | `false` | Convert empty strings to `null` in retrieved values |
| **softDelete** | boolean | `false` | `del()` marks fields as deleted instead of removing them |
| **preserveDeletedFieldsValues** | boolean | `false` | When re-adding a soft-deleted field, preserve its original values |

```javascript
// Get only changed, non-disabled values
const options = {
  retrieveOnlyEnabledFieldsValues: true,
  retrieveOnlyDirtyFieldsValues: true,
};

// Remove nulls and empty strings from arrays
const options = {
  removeNullishValuesInArrays: true,  // [1, null, 3, ""] → [1, 3]
};

// Soft delete with preserved values
const options = {
  softDelete: true,
  preserveDeletedFieldsValues: true,
};
```

---

### Converters & Values

Control how input converters and value formatting behave.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **applyInputConverterOnInit** | boolean | `true` | Apply `input` converter on field creation |
| **applyInputConverterOnSet** | boolean | `true` | Apply `input` converter on `set()` |
| **applyInputConverterOnUpdate** | boolean | `true` | Apply `input` converter on `update()` |
| **autoTrimValue** | boolean | `false` | Automatically trim whitespace from string values on every change |
| **autoParseNumbers** | boolean | `false` | Parse string input to number when the field's initial value is a number |
| **fallbackValue** | any | `""` | Default value when a field is cleared or created without an explicit value |
| **uniqueId** | function | — | Custom function to generate field IDs (`field => string`). Useful for SSR hydration |

```javascript
// Auto-trim and auto-parse
const options = {
  autoTrimValue: true,         // "  hello  " → "hello"
  autoParseNumbers: true,      // "20" → 20 (when initial value is a number)
};

// Custom fallback value
const options = {
  fallbackValue: null,         // default is "", now clear() sets null
};

// Deterministic IDs for SSR
const options = {
  uniqueId: (field) => `${field.path}-${Date.now()}`,
};
```

---

### Debounce & Plugin Order

Control validation timing and plugin execution order.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **validationDebounceWait** | number | `250` | Milliseconds to delay validation after the last change |
| **validationDebounceOptions** | object | `{ leading: false, trailing: true }` | Lodash debounce options |
| **validationPluginsOrder** | string[] | `undefined` | Order of validation plugins: `vjf`, `dvr`, `ajv`, `yup`, `zod`, `joi`, `valibot`, `vinejs` |
| **stopValidationOnError** | boolean | `false` | Stop validating a field once it's already marked invalid |
| **resetValidationBeforeValidate** | boolean | `true` | Reset validation state before each `validate()` call |

```javascript
// Debounced validation — useful for search-as-you-type
const options = {
  validateOnChange: true,
  validationDebounceWait: 500,
  validationDebounceOptions: {
    leading: false,
    trailing: true,
    maxWait: 2000,   // force validation at most every 2s
  },
};

// Run VJF first, then DVR, stop on first error
const options = {
  validationPluginsOrder: ['vjf', 'dvr', 'ajv'],
  stopValidationOnError: true,
};
```

---

### Other

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **fallback** | boolean | `true` | Controls whether fields and their props can be resolved outside the strict `struct`/`fields` definition. When `true`: fields are created from definition data even if not in the struct; values with keys not in `fields` are included as field data. When `false`: fields are created only if they exist in the struct, and only explicitly defined field keys receive values. See [Mixed Mode](../fields/#mixed-mode-unified-separated). |

---

## How to Set Options

### Set Options On Form Constructor

```javascript
import { Form } from 'mobx-formkit';

const options = {
  showErrorsOnInit: true,
  validateOnChange: true,
  autoParseNumbers: false,
};

const form = new Form({ fields }, { options });
```

### Set Options On Extended Form Class

Use the `options()` method to return your options object:

```javascript
import { Form } from 'mobx-formkit';

class MyForm extends Form {
  options() {
    return {
      showErrorsOnInit: true,
      validateOnChange: true,
    };
  }
}
```

> The object returned from `options()` is merged with any options passed to the constructor.

### Set Options After Form Initialization

```javascript
form.state.options.set({
  validateOnInit: false,
  validateOnChange: false,
  strictUpdate: true,
});
```

### Get Current Form Options

```javascript
const allOptions = form.state.options.get();
// => { validateOnInit: false, validateOnChange: true, ... }
```

### Get Form Option by Key

```javascript
const value = form.state.options.get('showErrorsOnInit');
// => true
```

---

> 💡 **All options can also be set per-field** via the field `options` prop:
> ```javascript
> const fields = {
>   email: {
>     label: 'Email',
>     options: {
>       validateOnChange: true,     // validate this field on every keystroke
>       showErrorsOnChange: true,   // show errors immediately
>     },
>   },
> };
> ```
> Per-field options override form-level options.
