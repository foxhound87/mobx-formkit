# Fields Methods

Methods available on each field and form instance. Use `$('path')` as a shorthand for `select('path')`.

---

## Navigation & Selection

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `select(path)` | `(path: string) => Field` | Field | Select a field by dot/array path. Can be chained. |
| `$(path)` | `(path: string) => Field` | Field | Alias for `select(path)` |
| `has(key)` | `(key: string) => boolean` | boolean | Check if a child field with the given key exists |
| `container()` | `() => Field or null` | Field or null | Get the parent field container, or `null` if root |

```javascript
form.$('address.city');              // via alias
form.select('members[0].firstname'); // via select()
form.$('members').$(0).$('firstname'); // chained
form.$('members').container();       // → the form itself (root)
```

---

## Value Operations

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `get()` | `() => any` | object | Get all field data with all props and computed values |
| `get(prop)` | `(prop: string or string[]) => any` | any | Get value of a specific prop (or an array of props) |
| `set(val)` | `(val: any) => void` | void | Set field value directly |
| `set(obj)` | `(obj: object) => void` | void | Set nested field values from an object |
| `set(prop, val)` | `(prop: string, val: any) => void` | void | Set a specific field property |
| `set(prop, obj)` | `(prop: string, obj: object) => void` | void | Set a property on nested fields from an object |
| `update(fields)` | `(fields: object) => void` | void | Update field values, auto-creating new fields as needed |
| `add(obj)` | `(obj?: any) => any` | any | Add a new field or nested field entry |
| `del(key)` | `(key: string) => void` | void | Delete a field or nested field by key or path |
| `move(fromIndex, toIndex)` | `(from: number, to: number) => void` | void | Move an array field item from one index to another |

```javascript
// Get all props
form.$('username').get();

// Set field value
form.$('username').set('newValue');

// Set a specific prop
form.$('username').set('label', 'Display Name');

// Add to nested array
form.$('members').add({ firstname: 'John', lastname: 'Doe' });

// Add to simple array
form.$('hobbies').add({ value: 'Tennis' });

// Delete by key
form.$('members').del(0);

// Move array item
form.$('members').move(0, 2);

// Update multiple values
form.update({ username: 'Jane', email: 'jane@example.com' });
```

---

## Validation

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `validate()` | `() => Promise` | Promise | Validate the field and return a promise resolving to `true`/`false` |
| `validate(path)` | `(path: string) => Promise` | Promise | Validate a specific field by path |
| `validate(opt)` | `(opt: { related?: boolean, showErrors?: boolean }) => Promise` | Promise | Validate with options |
| `validate(path, opt)` | `(path: string, opt: object) => Promise` | Promise | Validate a path with options |
| `check(prop)` | `(prop: string) => boolean` | boolean | Check a computed property on this field |
| `check(prop, deep)` | `(prop: string, deep: boolean) => boolean` | boolean | Check a computed property, recursing into nested fields |
| `invalidate(msg, deep?, async?)` | `(msg: string, deep?: boolean, async?: boolean) => void` | void | Mark the field as invalid with an error message |
| `resetValidation(deep?)` | `(deep?: boolean) => void` | void | Reset validation status (clears errors, resets error stack) |

```javascript
// Validate field
const isValid = await form.$('email').validate();

// Validate with options
await form.$('email').validate({ related: true, showErrors: true });

// Check computed
form.$('email').check('isDirty');          // false
form.$('address').check('isValid', true);  // deep check

// Invalidate manually
form.$('email').invalidate('Custom error message');
form.$('email').invalidate('Async error', true, true);

// Reset validation
form.$('email').resetValidation(true);
```

---

## Actions

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `clear(deep?)` | `(deep?: boolean) => void` | void | Clear the field to empty value |
| `reset(deep?)` | `(deep?: boolean) => void` | void | Reset the field to default value |
| `submit(hooks?, opts?)` | `(hooks?: object, opts?: object) => Promise` | Promise | Validate and trigger `onSuccess`/`onError` hooks |
| `focus()` | `() => void` | void | Programmatically focus the field (requires `ref`) |
| `blur()` | `() => void` | void | Programmatically blur the field (requires `ref`) |
| `trim()` | `() => void` | void | Apply `String.trim()` to the value if it's a string |

```javascript
// Clear to empty
form.$('username').clear();

// Reset to default
form.$('username').reset();

// Submit a fieldset
form.$('step1').submit({
  onSuccess: (fieldset) => console.log('Step 1 valid!', fieldset.values()),
  onError:   (fieldset) => console.log('Step 1 errors:', fieldset.errors()),
});

// Focus / Blur
form.$('email').focus();
form.$('email').blur();

// Trim whitespace
form.$('username').trim();
```

### Submit Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `execOnSubmitHook` | boolean | `true` | Execute the `onSubmit` hook before validating |
| `execValidationHooks` | boolean | `true` | Execute `onSuccess` / `onError` hooks after validation |
| `validate` | boolean | `true` | Perform validation before calling hooks |

---

## UI & Bindings

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `bind(props?)` | `(props?: object) => object` | object | Get the current field bindings (template/rewriter). Sets `ref` automatically. |
| `showErrors(show?, deep?)` | `(show?: boolean, deep?: boolean) => void` | void | Show or hide error messages |

```javascript
// In a React component:
<input {...form.$('email').bind()} />

// With custom props:
<input {...form.$('email').bind({ className: 'my-input' })} />

// Show/hide errors
form.$('email').showErrors(true);   // display errors
form.$('email').showErrors(false);  // hide errors
```

---

## MobX Events

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `observe(opt)` | `(opt: object) => function` | disposer | Define a MobX observer on field props or fields map |
| `intercept(opt)` | `(opt: object) => function` | disposer | Define a MobX interceptor on field props or fields map |
| `dispose()` | `() => void` | void | Remove all observers and interceptors on this field and nested fields |

```javascript
const disposer = form.$('email').observe({
  props: ['value', 'error'],
  callback: (change) => console.log(change),
});

// Clean up
disposer();
```

---

## Helpers

Convenience methods to extract structured data from a field and its nested fields.

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `values()` | `() => object` | object | Get field and nested field values |
| `errors()` | `() => object` | object | Get field and nested field errors |
| `labels()` | `() => object` | object | Get field and nested field labels |
| `placeholders()` | `() => object` | object | Get field and nested field placeholders |
| `defaults()` | `() => object` | object | Get field and nested field default values |
| `initials()` | `() => object` | object | Get field and nested field initial values |
| `types()` | `() => object` | object | Get field and nested field types |

```javascript
form.values();
// { username: 'SteveJobs', email: 's.jobs@apple.com' }

form.$('address').values();
// { street: 'Broadway', city: 'New York' }
```

---

## Array Fields

Helpers to tell apart the two kinds of array fields, available on **Form** and **Field** instances.

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `isArrayContainer(path)` | `(path?: string) => boolean` | boolean | Check if a path is an array container (a struct entry like `path[]` or `path[].subfield`) |
| `isPlainArrayField()` | `() => boolean` | boolean | Check if the field is a plain field holding an array value (no nested fields) |

```javascript
const form = new Form({ struct: ['items[].name', 'tags'] });

form.$('items').isArrayContainer();     // true — items holds an array of items
form.$('items').isPlainArrayField();    // false — it has nested fields

form.$('tags').isArrayContainer();      // false — tags is not declared as an array
form.$('tags').isPlainArrayField();     // true — when its value is an array
```

They drive the array behaviour of the actions:

- `isArrayContainer()` → the field is a **container**: its value is read from the nested fields, `update()` and `sync()` with an array create/update/remove the nested fields, `reset()` rebuilds them from the declared array and `clear()` removes them.
- `isPlainArrayField()` → the field holds the array **as its value**: `update()` with an array sets the value (an empty array empties the field), `add()` appends the new item and `clear()` empties it.

> `isArrayContainer(path)` checks the **struct** of the form, so it can be used with any path (also from the form root): `form.isArrayContainer('items')`.

---

## Iteration

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `map(callback)` | `(fn: (field) => any) => any[]` | array | Map over nested fields |
| `reduce(callback, acc)` | `(fn: (acc, field) => any, init: any) => any` | any | Reduce nested fields |
| `each(callback)` | `(fn: (field) => void) => void` | void | Iterate over all fields and nested fields recursively |

```javascript
// Get all values
form.$('members').map(field => field.value);

// Sum computed values
form.$('products').reduce((sum, field) => sum + field.value.price, 0);

// Log every field path
form.each(field => console.log(field.path));
```

---

## Event Handlers

Event handlers bind to DOM events and update field state automatically. They accept a Proxy-like event object or direct value.

| Handler | Input | Description |
|---------|-------|-------------|
| `sync(e)` / `onChange(e)` | Event or any | Update `value` from DOM event (input, checkbox) or direct value |
| `onToggle(e)` | Event or any | Update `value` from toggle/checkbox event (alias of `sync`) |
| `onFocus(e)` | Event | Track `focused` state on focus |
| `onBlur(e)` | Event | Track `touched` and `blurred` state on blur |
| `onKeyUp(e)` | Event | Executed on key up |
| `onKeyDown(e)` | Event | Executed on key down |
| `onDrop(e)` | Event | Handle file drop events when `type: "file"`. Access files via `field.files`. |
| `onSubmit(e)` | Event | Sub-form submission: validate fieldset, call `onSuccess` / `onError` |
| `onClear(e)` | Event | Clear all fields and nested fields to empty value |
| `onReset(e)` | Event | Reset all fields and nested fields to default value |
| `onAdd(e)` | Event | Add a new field or nested field entry |
| `onDel(e)` | Event | Delete a field or nested field by key |

```javascript
// In JSX:
<input {...form.$('email').bind()} onChange={form.$('email').onChange} />

// All event handlers accept the event object:
<input
  onFocus={form.$('email').onFocus}
  onBlur={form.$('email').onBlur}
/>

// Direct value (without event):
form.$('email').onChange('new@email.com');
```
