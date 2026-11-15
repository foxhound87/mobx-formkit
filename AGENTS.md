# Guide for AI Agents

A concise guide for LLMs working with **MobX Formkit** — the reactive MobX form state management library.

---

## 1. Project Identity

| Field            | Value                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Package**      | `mobx-formkit`                                                                       |
| **NPM**          | [npmjs.com/package/mobx-formkit](https://www.npmjs.com/package/mobx-formkit)         |
| **GitHub**       | [github.com/foxhound87/mobx-formkit](https://github.com/foxhound87/mobx-formkit)     |
| **Docs**         | [foxhound87.github.io/mobx-formkit](https://foxhound87.github.io/mobx-formkit/)  |
| **Version**      | 1.x (current: 1.1.3)                                                                  |
| **Size**         | ~8KB gzip (tree-shakeable)                                                             |
| **License**      | MIT                                                                                    |
| **Dependencies** | MobX 5, 6 & 7 (peer: `^5.15.0 || ^6.0.0 || ^7.0.0`), lodash, React (optional)                      |

---

## 2. Philosophy

MobX Formkit is built on three core principles:

1. **Reactive by default** — Every field is a MobX observable. Form state (value, error, dirty, touched, etc.) is reactive. Your UI updates automatically with `observer()` — no manual `setState`, no change handlers to write.

2. **Composable by design** — Fields nest infinitely (objects, arrays, arrays of arrays). Forms compose via `composer()` for wizards and multi-step flows. `ArrayMap` preserves insertion order for dynamic lists.

3. **Plugin-driven validation** — 8 validation drivers (DVR, VJF, AJV, YUP, JOI, ZOD, VALIBOT, VINEJS) share a uniform lifecycle. Swap or combine them without changing field definitions.

The result: you define your form structure declaratively, and reactivity, validation, change tracking, and UI bindings are automatic.

---

## 3. Architecture

```
┌──────────────────────────────────────────────────────┐
│                      Form                            │
│  entry point — creates fields, runs validation,      │
│  manages form-level computed state (isValid, error)  │
├──────────────────────────────────────────────────────┤
│  fields: ArrayMap<Field>       validator: Validator  │
│  $hooks / $handlers            options: Options      │
│  state: State (initial/current props, struct, etc.)  │
└──────────────────────┬───────────────────────────────┘
                       │ creates
┌──────────────────────┴───────────────────────────────┐
│                      Field                            │
│  wraps each form input — value, validation, events    │
├──────────────────────────────────────────────────────┤
│  $value (observable)   errorSync / errorAsync         │
│  $focused / $blurred / $touched / $changed            │
│  $label / $placeholder / $disabled / $rules           │
│  $hooks / $handlers    $observers / $interceptors     │
│  $converter / $input / $output                        │
│  fields: ArrayMap (nested sub-fields)                 │
└──────────────────────┬───────────────────────────────┘
                       │ shared via Base
┌──────────────────────┴───────────────────────────────┐
│                      Base                             │
│  $(), get(), set(), validate(), submit(), add(),      │
│  del(), update(), clear(), reset(), each(), map()     │
│  execHook(), execHandler()                            │
│  onClear(), onReset(), onSubmit(), onAdd(), onDel()   │
└──────────────────────────────────────────────────────┘
```

### Supporting Classes

| Class            | Role                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| **`Validator`**  | Runs validation across all enabled drivers. Manages `validate()`, `validateField()`, `validateRelatedFields()`.  |
| **`Options`**    | 40+ form-level configuration flags (validation triggers, debounce, strict modes, converters, soft delete, etc.). |
| **`Bindings`**   | Maps field props → component props via rewriters (simple key mapping) or templates (function-based).             |
| **`State`**      | Holds initial, current, and struct data. Bridges field → form during initialization.                             |
| **`ArrayMap`**   | Ordered key-value collection (backed by observable array). Supports `move(from, to)` for sortable lists.         |
| **`composer()`** | Utility function for orchestrating multiple Form instances (wizards, multi-step flows).                          |

---

## 4. Key Concepts

### 4.1 Form

The entry point. Instantiated with field definitions + config:

```javascript
const form = new Form(
  { fields: [{ name: 'email', label: 'Email', rules: 'required|email' }] },
  { plugins: { dvr: dvr({ package: validatorjs }) }, hooks: { onSuccess(form) { ... } } }
);
```

**Constructor signature:**

```
Form(setup: FieldsDefinitions, config: FormConfig)
```

| Config key | Type                                                | Purpose                         |
| ---------- | --------------------------------------------------- | ------------------------------- | --------------------------- |
| `plugins`  | `{ dvr?, vjf?, ajv?, yup?, zod?, joi?, valibot?, vinejs? }` | Validation drivers              |
| `hooks`    | `{ onInit?, onChange?, onSuccess?, onError?, ... }` | Lifecycle callbacks             |
| `handlers` | `{ onSubmit?, onKeyDown?, ... }`                    | Custom event handlers (curried) |
| `options`  | `OptionsModel`                                      | Form behavior flags             |
| `bindings` | `Record<string, Rewriter                            | Template>`                      | Custom bindings for UI libs |
| `extra`    | `Record<string, any>`                               | Arbitrary metadata              |
| `name`     | `string`                                            | Form name for debugging         |

### 4.2 Field

Represents a single form input. Observable properties drive UI reactivity:

**Core props:** `value`, `initial`, `default`, `label`, `placeholder`, `type`, `bindings`, `extra`, `options`, `related`, `rules`, `validators`, `disabled`, `deleted`, `autoFocus`, `inputMode`, `ref`, `nullable`, `autoComplete`

**Computed state:** `error`, `isValid`, `isDirty`, `isPristine`, `isEmpty`, `isDefault`, `hasError`, `focused`, `blurred`, `touched`, `validatedValue`, `checked`, `changed`, `validating`, `submitting`, `clearing`, `resetting`, `actionRunning`

**Converters:** `$converter` (value transform), `$input` (apply on input), `$output` (apply on output via `values()`)

### 4.3 Nested Fields

Fields can contain sub-fields — infinitely nestable. Accessed via dot notation:

```javascript
// Access
form.$("address"); // Field (container)
form.$("address.city"); // Field (nested)
form.values(); // { address: { city: '...', zip: '...' } }

// Arrays
form.$("members[0]"); // Field
form.$("members[0].name"); // nested inside array element
form.$("members[].name"); // applies to all array elements
```

**For nested fields and arrays of objects, prefer the separated prop mode** — define the structure via `struct` and split props across parallel objects. This keeps definitions clean and avoids deeply nested unified objects:

```javascript
const fields = {
  struct: ["address.city", "address.zip", "members[].name", "members[].email"],
  labels: {
    "address.city": "City",
    "address.zip": "ZIP Code",
    "members[].name": "Name",
    "members[].email": "Email",
  },
  rules: {
    "address.city": "required",
    "address.zip": "required|digits:5",
    "members[].name": "required",
  },
  values: {
    address: { city: "Rome", zip: "00100" },
    members: [{ name: "John", email: "john@test.com" }],
  },
};
```

**ArrayMap** provides ordered key-value storage with array-like operations (`move(from, to)` for sortable lists) while exposing the full Map API.

### 4.4 Computed (Functional) Props

Any field prop can be a function that receives `{ field, form }` and returns a reactive value:

```javascript
const fields = [
  {
    name: "total",
    value: ({ field, form }) =>
      form
        .$("items")
        .values()
        .reduce((sum, item) => sum + item.price * item.qty, 0),
    disabled: ({ field, form }) => !form.$("items").values().length,
  },
];
```

Computed props re-evaluate automatically when their dependencies (MobX observables they read) change. Available on: `value`, `label`, `placeholder`, `disabled`, `rules`, `related`, `bindings`, `extra`, `options`, `deleted`, `autoFocus`, `inputMode`, and all `computed` fields.

### 4.5 Hooks

Lifecycle callbacks. You define them in the form config or in field definitions:

```javascript
const hooks = {
  // Form lifecycle
  onInit(form) { ... },                         // After form creation
  onChange(form) { ... },                       // On any field value change

  // Submit lifecycle
  onSuccess(form) { ... },                      // Validation passed
  onError(form) { ... },                        // Validation failed
  onSubmit(form) { ... },                       // Before validation

  // Field lifecycle
  onChange(field, event) { ... },               // Field value changed
  onBlur(field, event) { ... },                 // Field lost focus
  onFocus(field, event) { ... },                // Field gained focus
  onClear(field) { ... },                       // Field cleared
  onReset(field) { ... },                       // Field reset
  onAdd(field) { ... },                         // Field added dynamically
  onDel(field) { ... },                         // Field removed dynamically
};
```

**Important:** Hooks receive `(field, event)` when triggered by event handlers, but only `(field)` when called directly from actions.

### 4.6 Handlers

Event handler functions passed to DOM elements via `field.bind()`. Custom handlers are **curried**: `(field) => (event) => {}`:

```javascript
const handlers = {
  onKeyDown: (field) => (e) => {
    if (e.key === "Enter") field.submit();
  },
  onSubmit: (form) => (e) => {
    e.preventDefault();
    console.log("submitted");
  },
};
```

Built-in handlers on Field: `onChange` (aliased as `onSync`), `onBlur`, `onFocus`, `onKeyDown`, `onKeyUp`, `onToggle`, `onDrop`.

Built-in handlers on Form/Base: `onSubmit`, `onClear`, `onReset`, `onAdd`, `onDel`.

### 4.7 Validation Drivers

Eight plugins sharing a uniform lifecycle. Enable one or more:

```javascript
import dvr from "mobx-formkit/lib/validators/DVR";
import vjf from "mobx-formkit/lib/validators/VJF";
import yupPlugin from "mobx-formkit/lib/validators/YUP";
import joiPlugin from "mobx-formkit/lib/validators/JOI";
import zodPlugin from "mobx-formkit/lib/validators/ZOD";
import ajv from "mobx-formkit/lib/validators/AJV";
import valibotPlugin from "mobx-formkit/lib/validators/VALIBOT";
import vinejsPlugin from "mobx-formkit/lib/validators/VINEJS";
```

| Driver    | Rules Format                         | Async | Extend | Best For                        |
| --------- | ------------------------------------ | ----- | ------ | ------------------------------- |
| **DVR**   | String rules (`'required\|email'`)   | ✅    | ✅     | Simple forms, quick setup       |
| **VJF**   | Custom functions `() => [bool, msg]` | ✅    | ✅     | Full control, complex logic     |
| **AJV**   | JSON Schema                          | ✅    | ✅     | API compatibility, schema-first |
| **YUP**   | `y.string().required()`              | ❌    | ❌     | Modern JS/TS                    |
| **JOI**   | `j.string().required()`              | ❌    | ❌     | Enterprise, rich rules          |
| **ZOD**   | `z.string().min(3)`                  | ❌    | ❌     | TypeScript-native               |
| **VALIBOT** | `v.string(), v.minLength(3)`       | ❌    | ✅     | Sync, tiny TS-first schemas     |
| **VINEJS**  | `vine.string().minLength(3)`       | ✅*   | ✅     | Sync rules, async API           |

\* VineJS `validate()` is async-by-design at the API level (even for synchronous
rules) — the driver consumes the MRF async contract (`setValidationAsyncData` +
`promises`), mirroring the YUP driver.

- **ZOD** driver supports **zod v3.25+ and v4** (peer `^3.25.0 || ^4.0.0`,
  optional peer; devDep in repo). Driver relies only on `safeParse` + `error.format()`,
  stable across both majors.

**Example — enable DVR + VJF together:**

```javascript
const plugins = {
  dvr: dvr({ package: validatorjs }),
  vjf: vjf(),
};
```

Control order via `options.validationPluginsOrder: ['vjf', 'dvr']`.

### 4.8 Bindings

`field.bind()` returns props for your UI component. Two strategies:

**Default bindings** (text input → `{ id, name, type, value, onChange, onBlur, ... }`):

```jsx
<input {...form.$("email").bind()} />
```

**Rewriters** — simple key mapping for UI libraries:

```javascript
const bindings = {
  MaterialTextField: { label: "floatingLabelText", placeholder: "hintText" },
};
// Then: <TextField {...form.$('email').bind()} />
```

**Templates** — full control with a function:

```javascript
const bindings = {
  CustomSelect: ({ field, form, keys, props, $try }) => ({
    value: field.value,
    onChange: (e, val) => (field.value = val),
    error: field.error,
    options: field.extra.options,
  }),
};
```

### 4.9 Options

40+ configuration flags. Set via `options` in the form config:

| Group                   | Key Options                                                                                                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Validation triggers** | `validateOnInit` (true), `validateOnBlur` (true), `validateOnChange` (false), `validateOnSubmit` (true), `validateOnClear` (false), `validateOnReset` (false)                                                                  |
| **Error display**       | `showErrorsOnInit` (false), `showErrorsOnBlur` (true), `showErrorsOnChange` (true), `showErrorsOnSubmit` (true), `showErrorsOnClear` (false), `showErrorsOnReset` (true)                                                       |
| **Debounce**            | `validationDebounceWait` (250ms), `validationDebounceOptions` `{ leading: false, trailing: true }`                                                                                                                             |
| **Strict modes**        | `strictSelect` (true), `strictDelete` (true), `strictSet` (false), `strictUpdate` (false)                                                                                                                                      |
| **Converters**          | `applyInputConverterOnInit` (true), `applyInputConverterOnSet` (true), `applyInputConverterOnUpdate` (true)                                                                                                                    |
| **Retrieval**           | `retrieveOnlyDirtyFieldsValues` (false), `retrieveOnlyEnabledFieldsValues` (false), `softDelete` (false), `retrieveNullifiedEmptyStrings` (false), `removeNullishValuesInArrays` (false)                                       |
| **Validation**          | `stopValidationOnError` (false), `resetValidationBeforeValidate` (true), `validateDisabledFields` (false), `validateDeletedFields` (false), `validatePristineFields` (true), `validationPluginsOrder` (undefined)              |
| **Other**               | `submitThrowsError` (true), `defaultGenericError` (null), `fallback` (true), `fallbackValue` (''), `autoTrimValue` (false), `autoParseNumbers` (false), `bubbleUpErrorMessages` (false), `preserveDeletedFieldsValues` (false) |

Options can be overridden **per-field** via `field.$options`:

```javascript
const fields = [
  {
    name: "email",
    options: { validateOnChange: true, validationDebounceWait: 500 },
  },
];
```

### 4.10 Field Definition Modes

**Unified mode** — all props in one object per field:

```javascript
const fields = [
  {
    name: "email",
    label: "Email",
    rules: "required|email",
    value: "test@test.com",
  },
];
```

**Separated mode** — props split across parallel objects:

```javascript
const fields = {
  struct: ["email"],
  values: { email: "test@test.com" },
  labels: { email: "Email" },
  rules: { email: "required|email" },
};
```

**Mixed mode** — unified overrides separated. Any combination works.

### 4.11 Field Converters

Three levels of value transformation:

- **`$converter`** — transforms the raw value whenever it's set (e.g., uppercase, trim)
- **`$input`** — applied when value comes from user input (via `sync`, `onChange`, `update`, `set`)
- **`$output`** — applied when value is read via `values()`, `flatMapValues`, or `get('value')`

Apply via field definition:

```javascript
{
  name: 'email',
  input: (val) => val.toLowerCase().trim(),
  output: (val) => val ? `***@${val.split('@')[1]}` : '',
  converter: (val) => val?.toUpperCase(),
}
```

---

## 5. Core API Reference

### 5.1 Field Selection

```javascript
form.$("email"); // typed: Field<EmailType>
form.$("address.city"); // nested by dot notation
form.$("members[0].name"); // array by index
form.$("members[].name"); // returns Field for first element
form.select("email"); // untyped variant
form.has("email"); // boolean check
form.$("email").$("nestedField"); // relative selection from a field
```

### 5.2 Getting / Setting Values

```javascript
// Single
form.$("email").value; // get
form.$("email").value = "new@test.com"; // set via setter
form.$("email").set("new@test.com"); // set via method
form.set("email", "new@test.com"); // set via form

// Bulk
form.values(); // { email: '...', address: { city: '...' } }
form.update({ email: "new@test.com", address: { city: "New York" } }); // nested
form.get("value"); // same as values()
form.get("error"); // { email: '...', address: { city: '...' } }
form.errors(); // same
form.get(["value", "error"]); // { email: { value: '...', error: '...' } }
form.$("email").get(["value", "error"]); // { value: '...', error: '...' }

// Field-level
field.value; // get
field.value = "new"; // set
field.initial; // original value
field.default; // default value
field.validatedValue; // value after converters applied
```

### 5.3 Validation

```javascript
// Validate all fields
await form.validate();
await form.validate({ showErrors: true, related: true });

// Submit (validate + hooks)
await form.submit(); // calls onSuccess or onError
await form.submit({ onSuccess, onError }, { validate: true });

// Single field
await form.$("email").validate();
await form.$("email").validate({ related: true }); // validates related fields too

// Manual error
form.$("email").invalidate("Custom error");
form.invalidate("Form-level error");

// Control error display
form.showErrors(true); // show all errors
form.$("email").showErrors(false); // hide specific field error
form.check(); // check without displaying errors
```

### 5.4 Dynamic Fields

```javascript
form.add({ name: "newField", value: "test" }); // add a field
form.add({ name: "guest", fields: [{ name: "email" }] }); // add nested field
form.del("oldField"); // remove a field
form.$("members").add({ name: "John" }); // add to array container
form.$("members").del("0"); // remove array element
form.$("members").move(0, 2); // reorder (sortable lists)
```

### 5.5 Clear / Reset

```javascript
form.clear(); // clear all values + reset validation
form.reset(); // restore initial/default values
form.$("email").clear(); // single field
form.$("email").reset();
```

### 5.6 State Checks

```javascript
form.isValid; // all fields valid (every)
form.isDirty; // any field changed (some)
form.isPristine; // no field changed (every)
form.isEmpty; // all fields empty
form.hasError; // any field has error (some)
form.error; // first error message (requires bubbleUpErrorMessages)
form.focused; // any field focused
form.touched; // any field blurred at least once
form.disabled; // all fields disabled (every)
form.changed; // change count (number)
form.submitted; // submission count (number)
form.validating; // validation in progress (boolean)
form.submitting; // submission in progress (boolean)
form.size; // number of top-level fields
```

### 5.7 Event Wiring

```javascript
// In JSX — built-in handlers
<form onSubmit={form.onSubmit}>
  <input {...form.$("email").bind()} />
  <button onClick={form.onClear}>Clear</button>
  <button onClick={form.onReset}>Reset</button>
</form>

// The bind() output includes: id, name, type, value, checked,
// label, placeholder, disabled, autoComplete, onChange, onBlur,
// onFocus, autoFocus, inputMode, onKeyUp, onKeyDown
```

### 5.8 TypeScript

```typescript
import { Form, Field } from 'mobx-formkit';
import type { PathsOf, FieldDefinition } from 'mobx-formkit';

// Typed form
interface Profile {
  username: string;
  email: string;
  address: { city: string; zip: string };
}

const form = new Form<Profile>({ fields: [...] });
form.$('username');                    // Field<string>
form.$('address.city');                // Field<string> (with PathsOf autocomplete)

// Typed field definitions
const fields: Record<string, FieldDefinition> = [
  { name: 'email', rules: 'required|email' },
];
```

### 5.9 Composer (Multi-Form)

```javascript
import { composer } from "mobx-formkit/lib/composer";

const wizard = composer({ step1: form1, step2: form2 });
wizard.validate(); // validates all forms
wizard.submit(); // submits all forms
wizard.clear(); // clears all forms
wizard.valid(); // all forms valid?
wizard.error(); // any form has error?
wizard.get("value"); // { step1: {...}, step2: {...} }
wizard.select("step1"); // individual form
```

### 5.10 Observers & Interceptors

MobX `observe`/`intercept` on any field prop:

```javascript
const fields = [{
  name: 'email',
  observers: [{
    prop: 'value',
    call: ({ change, field, form }) =>
      console.log('Email changed:', change.newValue),
  }],
  interceptors: [{
    prop: 'value',
    call: ({ change }) => change.newValue?.length > 50 ? null : change,
  }],
}];

// Or imperatively:
field.observe(({ change, field, form }) => { ... });
field.intercept(({ change }) => change);
form.intercept({ prop: 'value', path: 'email', call: ({ change }) => change });
```

---

## 6. Field Definition Reference

All properties you can define per field:

| Prop            | Type                       | Description                                                                  |
| --------------- | -------------------------- | ---------------------------------------------------------------------------- |
| `name`          | `string`                   | Field name (overrides key)                                                   |
| `value`         | `any`                      | Field value                                                                  |
| `computed`      | `({ field, form }) => any` | Reactive computed value                                                      |
| `label`         | `string \| function`       | Display label                                                                |
| `placeholder`   | `string \| function`       | Placeholder text                                                             |
| `type`          | `string`                   | Input type (`text`, `checkbox`, `password`, `file`, `number`, etc.)          |
| `rules`         | `string`                   | Validation rules (DVR: `'required\|email'`, VJF/AJV/YUP/JOI/ZOD/VALIBOT/VINEJS: per-driver) |
| `validators`    | `function[]`               | Custom validation functions (VJF)                                            |
| `related`       | `string[]`                 | Re-validate these field paths when this field changes                        |
| `disabled`      | `boolean \| function`      | Disabled state                                                               |
| `deleted`       | `boolean \| function`      | Soft-delete flag (requires `softDelete: true`)                               |
| `default`       | `any`                      | Default value (used on reset)                                                |
| `initial`       | `any`                      | Initial value (set on creation)                                              |
| `fields`        | `array`                    | Nested field definitions                                                     |
| `bindings`      | `string`                   | Name of binding to use (from `form.bindings`)                                |
| `extra`         | `any`                      | Arbitrary metadata                                                           |
| `options`       | `OptionsModel`             | Per-field option overrides                                                   |
| `hooks`         | `object`                   | Field-level hooks                                                            |
| `handlers`      | `object`                   | Field-level handlers                                                         |
| `autoFocus`     | `boolean \| function`      | Auto-focus on mount                                                          |
| `inputMode`     | `string \| function`       | Mobile keyboard mode                                                         |
| `ref`           | `any`                      | Ref callback/object                                                          |
| `nullable`      | `boolean`                  | Allow null value                                                             |
| `autoComplete`  | `string`                   | Autocomplete attribute                                                       |
| `input`         | `function`                 | Input converter (user → internal)                                            |
| `output`        | `function`                 | Output converter (internal → API)                                            |
| `converter`     | `function`                 | Transform on set                                                             |
| `observers`     | `array`                    | MobX observers                                                               |
| `interceptors`  | `array`                    | MobX interceptors                                                            |
| `class`         | `class`                    | Custom Field class for this field                                            |
| `validatedWith` | `string`                   | Which prop to validate (`'value'` default)                                   |

---

## 7. Best Practices

### Validation

- **Prefer hooks over raw handlers** for most validation logic. Define `onSuccess` and `onError` in the form config.
- **VJF is best for complex logic** — regex, API checks, cross-field rules, async validation.
- **DVR is best for simple forms** — string rules like `'required|email|between:5,25'` are concise.
- **Use `related`** to auto-revalidate dependent fields (e.g., `passwordConfirm` when `password` changes).
- **`validateOnChange` is false by default** — enable it per-field when needed, or use `validateOnBlur` (default: true).
- **Set `validationDebounceWait`** higher (e.g., 500ms) for expensive async validation.

### Performance

- **Use `retrieveOnlyDirtyFieldsValues: true`** to only submit changed fields.
- **Use `retrieveOnlyEnabledFieldsValues: true`** to exclude disabled fields from API payloads.
- **Keep forms flat where possible** — deeply nested fields add overhead.
- **Use `bubbleUpErrorMessages: true`** for a quick `form.error` string.
- **Lazy validation** — disable `validateOnInit` for forms with many fields that aren't immediately visible.

### Reactivity

- **Wrap components with `observer()`** from `mobx-react` to auto-render on field changes.
- **Computed props** `({ field, form }) => ...` are reactive — use them instead of manual `reaction()`.
- **Don't spread `field.bind()` deeply** — the spread is reactive as long as the component is observed.
- **Use `field.validatedValue`** when converters are applied and you need the processed value.

### Structure

- **Unified mode** is simplest for flat, simple forms. **For nested fields and arrays of objects, prefer separated mode** — define paths via `struct` and props via parallel objects. This avoids deeply nested unified objects and makes definitions cleaner.
- **Use `struct`** in separated mode to explicitly define the shape when `fallback: false`.
- **Dynamic arrays**: use `form.$('items').add({ name: 'newItem' })` and `form.$('items').del('0')`.
- **Sortable lists**: `form.$('items').move(oldIndex, newIndex)` — integrated with drag-and-drop.
- **Nested forms**: use `composer()` for independent form instances in wizards.

### TypeScript

- **Always pass the data interface** as a generic: `new Form<MyInterface>(...)`.
- **Use `PathsOf<F>`** for type-safe nested field access.
- **Define fields with `Record<string, FieldDefinition>`** for autocomplete.
- **Custom Field classes** can extend `Field` for reusable field behavior.

### Gotchas

| Gotcha                                                                                                   | Detail                                                           |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Handlers are curried**                                                                                 | Custom handlers: `(field) => (e) => {}`, not `(field, e) => {}`. |
| **`submitThrowsError: true`**                                                                            | Default — wrap `submit()` in try/catch or use validation hooks.  |
| **`onSubmit` hook** receives form, not field. `onSuccess`/`onError` receive form.                        |
| **`field.bind()`** sets `field.$ref` after render. Access in `useEffect` or similar.                     |
| **`softDelete`** requires `softDelete: true` option; deleted fields are excluded from `values()`.        |
| **`fallback: false`** + missing fields from struct won't be auto-created. Useful for strict schemas.     |
| **`strictSelect: true`** (default) throws on invalid field paths — catch or disable for dynamic paths.   |
| **`fallbackValue`** controls the default empty value (`''` by default; can be `null`, `undefined`, `0`). |

---

## 8. Quick Patterns

### Simplest possible form

```javascript
const form = new Form(
  {
    fields: [{ name: "email", rules: "required|email" }],
  },
  {
    plugins: { dvr: dvr({ package: validatorjs }) },
    hooks: { onSuccess: (f) => console.log(f.values()) },
  },
);
```

### Field with computed value

```javascript
{ name: 'fullName', value: ({ field, form }) =>
  `${form.$('firstName').value} ${form.$('lastName').value}`.trim()
}
```

### Custom error handling

```javascript
try {
  await form.submit();
} catch {
  console.log("Validation failed:", form.errors());
}
```

### Per-field validation on change

```javascript
{ name: 'email', options: { validateOnChange: true } }
```

### Async validation (VJF)

```javascript
{ name: 'username', validators: [({ field }) =>
  fetch(`/api/check-username?q=${field.value}`)
    .then(r => r.json())
    .then(({ available }) => [available, 'Username taken'])
]}
```

### Array with dynamic items

```javascript
const fields = {
  struct: ["items[].name", "items[].qty"],
  rules: {
    "items[].name": "required",
    "items[].qty": "required|numeric",
  },
};
// Add: form.$('items').add({ name: 'New', qty: 1 })
// Remove: form.$('items').del('0')
```

### Custom binding for MUI TextField

```javascript
const bindings = {
  MuiTextField: {
    id: "id",
    name: "name",
    type: "type",
    value: "value",
    label: "label",
    placeholder: "placeholder",
    disabled: "disabled",
    autoFocus: "autoFocus",
    onChange: "onChange",
    onBlur: "onBlur",
    onFocus: "onFocus",
    error: "error",
    helperText: "error", // MUI specific
  },
};
```

---

## 9. Related Repositories

| Repo                                                                               | Purpose                                                    |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [mobx-formkit-demo](https://github.com/foxhound87/mobx-formkit-demo)             | Live demo app with React components                        |
| [mobx-react-form-devtools](https://github.com/foxhound87/mobx-react-form-devtools) | DevTools panel for debugging                               |
| [mobx-formkit--docs](https://foxhound87.github.io/mobx-formkit/)                 | This documentation site                                    |
| [skills](https://github.com/foxhound87/skills)                                     | AI skill files for Cursor, Windsurf, Claude Code, Codebuff |

---

> **For LLMs:** When helping users with mobx-formkit, always check which validation plugin is being used — patterns differ significantly between DVR/VJF/AJV/YUP/JOI/ZOD/VALIBOT/VINEJS. Prefer `computed` props over manual reactivity. Always wrap components with `observer()`. Use `field.bind()` instead of manual prop wiring. Custom handlers are **curried** `(field) => (e) =>`.
