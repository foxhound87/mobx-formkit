# Defining Fields

Fields can be defined in two modes: **Unified Properties** (all props grouped per field) or **Separated Properties** (props split across parallel objects). Both modes support flat and nested fields.

---

## Quick Decision Guide

| Use Case | Recommended Mode |
|---|---|
| Simple forms, few fields, quick prototyping | **Unified** — all props in one place |
| Complex forms, many fields, reusable configs | **Separated** — props decoupled from structure |
| Server-provided values (e.g. DB query) | **Separated** — pass `values` directly |
| Dynamic arrays (add/remove fields) | **Separated** — struct array + separated props |
| Deeply nested objects | **Separated** — dot notation is clearer |
| TypeScript autocomplete on field props | **Unified** with `Record<string, FieldDefinition>` |

---

## Mode Comparison

| Aspect | Unified | Separated |
|---|---|---|
| **Structure** | `{ fields: { username: { label, value, ... } } }` | `{ fields: ['username'], values: { ... }, labels: { ... } }` |
| **Pros** | Compact, self-contained, TS-friendly | Flexible, decoupled, easy to dynamically generate |
| **Cons** | Verbose for large forms, harder to build dynamically | More boilerplate for tiny forms |
| **When to use** | Small forms, prototyping, TypeScript | Large forms, dynamic fields, server data |
| **Nested fields** | `fields: [{ name, fields: [...] }]` | Dot notation `'parent.child'` + array notation `'arr[]'` |

---

## Available Props Reference

### Unified Mode

Each field is an object keyed by name. Props are grouped by category below.

**Value & Display**

| Prop | Type | Description |
|------|------|-------------|
| `value` | any | Initial value |
| `default` | any | Value used on `reset()` |
| `initial` | any | Fallback for `value` when not set |
| `label` | string | Human-readable field label |
| `placeholder` | string | Placeholder text for the input |
| `type` | string | Field type, default `"text"` |
| `extra` | any | Extra metadata (useful for select options) |

**Input Behavior & Accessibility**

| Prop | Type | Description |
|------|------|-------------|
| `autoFocus` | boolean | Auto-focus this field on init |
| `inputMode` | string | Mobile keyboard mode: `none`, `text`, `decimal`, `numeric`, `tel`, `search`, `email`, `url` |
| `autoComplete` | string | HTML autocomplete attribute |
| `disabled` | boolean | Disabled state |
| `deleted` | boolean | Soft-deleted state (needs `softDelete` option) |
| `nullable` | boolean | Allow `null` field values |
| `ref` | any | React ref |

**Validation**

| Prop | Type | Description |
|------|------|-------------|
| `rules` | string | DVR validation rules (e.g. `'required|email'`) |
| `validators` | array | VJF validation functions |
| `validatedWith` | string | Validate a different field prop instead of `value` |
| `related` | string[] | Other field paths to validate together |

**Converters & Computed**

| Prop | Type | Description |
|------|------|-------------|
| `input` | function | Input converter: `user value => stored value` |
| `output` | function | Output converter: `stored value => output value` |
| `converter` | function | Alias for both input and output |
| `converters` | function[] | Array of converter functions |
| `computed` | function | Dynamic value: `({ form, field }) => value` |

**Events & MobX**

| Prop | Type | Description |
|------|------|-------------|
| `hooks` | object | Event hook functions |
| `handlers` | object | Event handler functions |
| `observers` | array | MobX observers on field props |
| `interceptors` | array | MobX interceptors on field props |

**Nested & Advanced**

| Prop | Type | Description |
|------|------|-------------|
| `fields` | array | Nested sub-field definitions |
| `options` | object | Per-field options (same keys as [Form Options](../form/form-options.md)) |
| `bindings` | string | Name of the binding template/rewriter |
| `class` | any | Custom Field class (must extend `Form.Field`) |
| `name` | string | Overrides the object key as field name |

### Separated Mode

Props are split across parallel objects keyed by field name or dot/array path:

| Object Key | Type | Description |
|---|---|---|
| `fields` | string[] | Array of field paths (dot + `[]` notation) |
| `struct` | string[] | Alias for `fields` in separated mode |
| `values` | object | Initial values |
| `initials` | object | Fallback values when `value` is not set |
| `defaults` | object | Values used on `reset()` |
| `labels` | object | Field labels |
| `placeholders` | object | Placeholder text |
| `types` | object | Field types |
| `autoFocus` | object | Auto-focus flags |
| `inputMode` | object | Mobile keyboard modes |
| `autoComplete` | object | Autocomplete attributes |
| `rules` | object | DVR validation rules |
| `validators` | object | VJF validation functions |
| `validatedWith` | object | Validation prop overrides |
| `related` | object | Related field paths |
| `disabled` | object | Disabled states |
| `deleted` | object | Soft-deleted states |
| `nullable` | object | Nullable flags |
| `options` | object | Per-field options |
| `bindings` | object | Binding keys |
| `extra` | object | Extra metadata |
| `computed` | object | Computed value functions |
| `converters` | object | Converter functions |
| `input` | object | Input converter functions |
| `output` | object | Output converter functions |
| `hooks` | object | Event hook functions |
| `handlers` | object | Event handler functions |
| `observers` | object | MobX observers |
| `interceptors` | object | MobX interceptors |
| `classes` | object | Custom Field classes |
| `refs` | object | React refs |

---

## Flat Fields

### Flat: Unified Mode

```javascript
import { Form } from 'mobx-formkit';

const fields = {
  username: {
    label: 'Username',
    value: 'SteveJobs',
    placeholder: 'Enter username',
    rules: 'required|string|between:5,15',
  },
  email: {
    label: 'Email',
    value: 's.jobs@apple.com',
    rules: 'required|email',
  },
};

const form = new Form({ fields });
```

> 💡 **TypeScript:** Annotate with `Record<string, FieldDefinition>` for autocomplete:
> ```typescript
> import { Form, FieldDefinition } from 'mobx-formkit';
>
> const fields: Record<string, FieldDefinition> = {
>   username: { label: 'Username', value: 'SteveJobs' },
> };
>
> const form = new Form(fields);
> ```

**Shorthand (array of objects):**

```javascript
const fields = [
  { name: 'username', label: 'Username', value: 'SteveJobs' },
  { name: 'email', label: 'Email', value: 's.jobs@apple.com' },
];

new Form({ fields });
```

> The `name` property is **required** when using array syntax.

### Flat: Separated Mode

Define field names as an array, then provide props in parallel objects:

```javascript
const fields = ['username', 'email', 'password'];

const values = {
  username: 'SteveJobs',
  email: 's.jobs@apple.com',
};

const labels = {
  username: 'Username',
  email: 'Email',
  password: 'Password',
};

const rules = {
  username: 'required|string|between:5,15',
  email: 'required|email',
  password: 'required|string|between:5,25',
};

new Form({ fields, values, labels, rules });
```

> **Auto-create:** Providing only `values` (without `fields` array) will implicitly create the fields:
> ```javascript
> new Form({ values: { username: 'SteveJobs' } }); // field 'username' auto-created
> ```

#### Validation in Separated Mode

```javascript
// DVR rules (declarative)
const rules = {
  email: 'required|email',
  password: 'required|string|min:6',
};

// VJF functions (vanilla)
const validators = {
  email: isEmail,
  emailConfirm: [isEmail, shouldBeEqualTo('email')],
};

new Form({ fields, rules, validators });
```

---

## Nested Fields

Nested fields group fields into objects and arrays. The syntax differs between modes.

### Nested: Unified Mode

**Plain nested objects** (single instance):

```javascript
const fields = [{
  name: 'address',
  label: 'Address',
  fields: [{
    name: 'street',
    label: 'Street',
    value: 'Broadway',
    default: '5th Avenue',
  }, {
    name: 'city',
    label: 'City',
    value: 'New York',
  }],
}];

new Form({ fields });
```

> The `name` property is required for each field when using array syntax.

**Arrays of nested fields** (multiple instances):

```javascript
const fields = [{
  name: 'members',
  label: 'Team Members',
  fields: [{
    name: 'firstname',
    label: 'First Name',
  }, {
    name: 'lastname',
    label: 'Last Name',
  }],
}];

new Form({ fields });

// Add a new member dynamically:
form.$('members').add({ firstname: 'John', lastname: 'Doe' });

// Simple array (no nested fields):
form.$('hobbies').add({ value: 'Tennis' });
```

**Related fields across nesting levels:**

```javascript
const fields = [{
  name: 'user',
  fields: [{
    name: 'email',
    label: 'Email',
    validators: [isEmail],
    related: ['user.emailConfirm'], // reference by full path
  }, {
    name: 'emailConfirm',
    label: 'Confirm Email',
    validators: [isEmail, shouldBeEqualTo('email')],
  }],
}];
```

### Nested: Separated Mode

Use **dot notation** for nested objects and **`[]` notation** for arrays:

```javascript
const fields = [
  'club.name',
  'club.city',
  'members',
  'members[].firstname',
  'members[].lastname',
  'members[].hobbies',
  'members[].hobbies[]',
];

const values = {
  club: { name: 'Jazz Club', city: 'New York' },
  members: [{
    firstname: 'Clint',
    lastname: 'Eastwood',
    hobbies: ['Soccer', 'Baseball'],
  }, {
    firstname: 'Charlie',
    lastname: 'Chaplin',
    hobbies: ['Golf', 'Basket'],
  }],
};

const labels = {
  'club': 'Club',
  'club.name': 'Club Name',
  'club.city': 'Club City',
  'members': 'All Members',
  'members[].firstname': 'Member First Name',
  'members[].lastname': 'Member Last Name',
};

const rules = {
  'club.name': 'required|min:3',
  'club.city': 'required|min:3',
  'members[].firstname': 'required|min:3',
  'members[].lastname': 'required|min:3',
};

new Form({ fields, values, labels, rules });
```

> **Dot notation** — keys reference field paths (e.g., `'club.name'`).
> **Array notation** — `members[]` applies to every element in the array.
> **Deeply nested arrays** — `hobbies[]` inside `members[]` creates arrays of arrays.

**Alternative syntax** — property values as nested objects:

```javascript
const labels = {
  club: {
    name: 'Club Name',
    city: 'Club City',
  },
  members: [{
    firstname: 'First Name',
    lastname: 'Last Name',
  }],
};
```

---

## Mixed Mode (Unified + Separated)

You can combine both modes. The separated props are the source of truth for the props they define, while the unified definition provides the field structure and the props which are not defined in separated mode:

```javascript
new Form({
  // Separated mode props (the source of truth)
  values: { username: 'SteveJobs' },
  labels: { username: 'Username' },
  rules:  { username: 'required|string' },

  // Unified mode: the structure and the props not defined in separated mode
  fields: {
    username: {
      type: 'email',     // used, no separated type is defined
      disabled: false,
    },
  },
});
```

> When the same prop is defined in both modes, the **separated** one wins. When `fallback` option is `true` (default), the field props not found in separated mode fall back to the unified definition.

---

## Common Patterns

### Fields with Default & Initial Values

```javascript
const fields = {
  newsletter: {
    label: 'Subscribe',
    type: 'checkbox',
    value: true,    // initial value on mount
    default: false, // value after reset
  },
};
```

### Fields with Per-Field Options

Override form-level options on individual fields:

```javascript
const fields = {
  email: {
    label: 'Email',
    rules: 'required|email',
    options: {
      validateOnChange: true,       // validate on every keystroke
      validateOnBlur: false,        // skip blur validation
      showErrorsOnChange: true,     // show errors immediately
    },
  },
};
```

### Fields with Custom Bindings

```javascript
const fields = {
  username: {
    label: 'Username',
    bindings: 'MaterialTextField', // use a registered binding
  },
};
```

### Fields with Auto-Focus

```javascript
const fields = {
  email: {
    label: 'Email',
    autoFocus: true, // focused on form mount
  },
};
```

### Fields with Password Confirmation

Use the `related` prop to re-validate the confirmation field when the password changes:

```javascript
const fields = {
  password: {
    label: 'Password',
    type: 'password',
    rules: 'required|string|min:8',
    related: ['passwordConfirm'],   // re-validate confirm on password change
  },
  passwordConfirm: {
    label: 'Confirm Password',
    type: 'password',
    validators: [shouldBeEqualTo('password')],
  },
};
```

> The `related` property on `password` tells the form to re-validate `passwordConfirm` every time the password value changes. This ensures the confirmation error message appears/disappears in real-time as the user types.
> 
> The `shouldBeEqualTo('password')` validator (custom VJF function) compares the confirmation value against the password field.

```javascript
// Custom validator function
function shouldBeEqualTo(target) {
  return ({ field, form }) => {
    const match = form.$(target).value === field.value;
    return [match, `${field.label} should be equal to ${form.$(target).label}`];
  };
}
```

---

## Accessing Fields at Runtime

```javascript
form.$('username');              // flat field
form.$('address.city');          // nested field (dot notation)
form.$('members[0].firstname');  // array element by index
form.$('members').$(0).$('firstname'); // chained selector
```

> 💡 **TypeScript:** The `$()` method provides type-safe autocomplete for both top-level and nested paths when using `Form<F>`:
> ```typescript
> interface MyForm {
>   members: Array<{ firstname: string; lastname: string }>;
> }
> const form = new Form<MyForm>({ fields });
> form.$('members[0].firstname').value; // typed as string
> ```
> See the [TypeScript Guide](../typescript.md) for details.
