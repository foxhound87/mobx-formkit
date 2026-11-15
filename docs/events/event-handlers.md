# Event Handlers

Event Handlers bind to DOM events and update field/form state automatically. They accept a Proxy-like event object or a direct value.

> **Lifecycle:** `User Input` → **Event Handler** / **Action** → `Mutate Store` → `Event Hook`

---

* [Sync Field Value](#sync-field-value)
* [Focused & Touched State](#focused--touched-state)
* [Key Events](#key-events)
* [Clear & Reset](#clear--reset)
* [Nested Array Elements](#nested-array-elements)
* [Submitting the Form](#submitting-the-form)
* [Handle Files](#handle-files)
* [Custom Event Handlers](#custom-event-handlers)
  * [On Form Initialization](#on-form-initialization)
  * [Extending the Class](#extending-the-class)

---

## Sync Field Value

### onChange(e), onToggle(e) & sync(e)

| Handler | Affected Property | Executed Hook | Use Case |
|---------|-------------------|---------------|----------|
| `sync(e)` | value | — | Update value without triggering hooks (silent update) |
| `onChange(e)` | value | `onChange` | Standard value update with side effects |
| `onToggle(e)` | value | `onToggle` | Toggle/checkbox value update (same as `onChange`) |

Use `onChange(e)` or `onToggle(e)` to update the field's value and trigger the corresponding `onChange`/`onToggle` hook.

Use `sync(e)` if you want to update the value **without** triggering the `onChange` or `onToggle` hook — useful for batch updates or programmatic changes where you don't want side effects.

### How `sync(e)` works

The `sync()` method handles multiple input types automatically:

| Input type | Behavior |
|---|---|
| Event with `e.target` (standard input) | Reads `e.target.value` (or `e.target.checked` for checkbox) |
| Direct value (string, number) | Sets the value directly |
| Array value | Applied to the nested fields of an array container (items are created, updated and removed to match the array) |
| Two arguments: `sync(e, value)` | Uses the second argument `value` |
| `null` or `undefined` | Tries the second argument `v`, then uses `$try(e, v)` |

```html
<input {...field.bind()} />  <!-- bind() handles onChange automatically -->

<!-- Or use onChange explicitly -->
<input onChange={form.$('username').onChange} />

<!-- For custom components that pass values directly -->
<CustomInput onChange={form.$('username').sync} />

<!-- Silent update: no onChange hook triggered -->
<CustomInput onChange={form.$('username').sync} />
```

> **Key difference:** `sync(e)` → no hook fires; `onChange(e)` → `onChange` hook fires; `onToggle(e)` → `onToggle` hook fires.

> `onChange` is an alias of `onSync`, which calls `sync` internally.

> If you are using a custom component which doesn't work with the package's built-in sync handler, [open an Issue](https://github.com/foxhound87/mobx-formkit/issues).

---

## Focused & Touched State

### onFocus(e) & onBlur(e)

| Handler | Affected Property | Executed Hook |
|---------|-------------------|---------------|
| `onFocus(e)` | focused | onFocus |
| `onBlur(e)` | touched, blurred | onBlur |

If you need to track `touched` or `focused` state, use `onFocus(e)` or `onBlur(e)` handlers:

```html
<input
  {...field.bind()}
  onFocus={form.$('username').onFocus}
  onBlur={form.$('username').onBlur}
/>
```

---

## Key Events

### onKeyDown(e) & onKeyUp(e)

| Handler | Affected Property | Executed Hook |
|---------|-------------------|---------------|
| `onKeyDown(e)` | — | onKeyDown |
| `onKeyUp(e)` | — | onKeyUp |

Use `onKeyDown(e)` or `onKeyUp(e)` to listen for keyboard events. These handlers are **pass-through** — they do not modify any field property but fire the corresponding hook for you to handle:

```html
<input
  {...field.bind()}
  onKeyDown={form.$('search').onKeyDown}
  onKeyUp={form.$('search').onKeyUp}
/>
```

### Example: keyboard shortcuts with hooks

Hooks receive both the field instance and the native DOM event when triggered by an event handler:

```javascript
const fields = {
  search: {
    hooks: {
      onKeyDown(field, e) {
        if (e.key === 'Enter') performSearch(field.value);
        if (e.key === 'Escape') field.clear();
      },
    },
  },
};
```

### Example: autocomplete with onKeyUp

```javascript
const fields = {
  search: {
    hooks: {
      onKeyUp(field, e) {
        if (field.value.length >= 3) fetchSuggestions(field.value);
      },
    },
  },
};
```

> Unlike `onChange` which fires on every value mutation, `onKeyDown`/`onKeyUp` fire on every keyboard event — including arrow keys, modifier keys, etc. Use them when you need raw keyboard access.

> **Note:** Hooks receive the field instance as the first parameter and the native DOM event as the second parameter (`onKeyDown(field, e)`) when triggered by an event handler. For hooks called directly from actions (e.g. `onInit`, `onClear`, `onReset`), only the field instance is passed.

---

## Clear & Reset

### onClear(e) & onReset(e)

| Handler | Action | Affected Property | Executed Hook | Result |
|---------|--------|-------------------|---------------|--------|
| `onClear(e)` | clear() | value | onClear | Empty values |
| `onReset(e)` | reset() | value | onReset | Default values |

On the form instance:

```html
<button type="button" onClick={form.onClear}>Clear</button>
<button type="button" onClick={form.onReset}>Reset</button>
```

On a specific field or nested fields:

```html
<button type="button" onClick={form.$('members').onClear}>Clear Members</button>
<button type="button" onClick={form.$('members').onReset}>Reset Members</button>
```

---

## Nested Array Elements

### onAdd(e) & onDel(e)

| Handler | Action | Affected Property | Executed Hook | Result |
|---------|--------|-------------------|---------------|--------|
| `onAdd(e)` | add() | fields | onAdd | Add a field |
| `onDel(e)` | del() | fields | onDel | Remove a field |

#### Adding a Field

```html
<button type="button" onClick={form.$('hobbies').onAdd}>Add Hobby</button>
```

Or specify the field value as second argument:

```html
<button type="button" onClick={e => form.$('hobbies').onAdd(e, 'soccer')}>Add Hobby</button>
```

Or specify a custom key and value as an object:

```html
<button type="button" onClick={e => form.$('hobbies').onAdd(e, {
  key: 'favorite',
  value: 'soccer',
})}>Add Favorite</button>
```

#### Deleting a Field

```html
<button type="button" onClick={field.onDel}>Delete Hobby</button>
```

Or using the field selector with a field key:

```html
<button type="button" onClick={form.$('hobbies').$(3).onDel}>Delete Hobby 3</button>
```

Or specify the field path as second argument:

```html
<button type="button" onClick={e => form.onDel(e, 'hobbies[3]')}>Delete Hobby 3</button>
```

> **Note:** These are Event Handlers, not actions. For programmatic add/delete without hooks, use [add() and del() actions](../actions/add-del.md#add) instead.

---

## Submitting the Form

### onSubmit(e)

| Handler | Action | Affected Property | Executed Hook | Form | Field |
|---------|--------|-------------------|---------------|------|-------|
| `onSubmit(e)` | submit() → validate() | submitting, validating | onSubmit | ✓ | ✓ |

The `onSubmit(e)` will validate the form and call `onSuccess(form)` or `onError(form)` **Validation Hooks** if they are implemented.

The `onSuccess(form)` and `onError(form)` methods take the form object in input, so you can perform more actions after validation occurs.

```html
<button type="submit" onClick={form.onSubmit}>Submit</button>
```

---

## Handle Files

### onDrop(e)

| Handler | Affected Property | Executed Hook | Result |
|---------|-------------------|---------------|--------|
| `onDrop(e)` | files | onDrop | Retrieve the files |

The `onDrop(e)` Event Handler retrieves files into the `files` field property and executes the `onDrop` Hook function. When `type: 'file'` is set, the field's `onSync`/`onChange` automatically delegates to `onDrop`.

#### How it works

```javascript
// Field.ts source logic:
onDrop = (...args) =>
  this.execHandler('onDrop', args, action(() => {
    const e = args[0];
    let files = null;
    if (isEvent(e) && hasFiles(e)) {
      files = Array.from(e.target.files);
    }
    this.files = [...(this.files || []), ...(files || args)];
  }));
```

The handler:
1. Extracts files from `e.target.files` (standard file input) or uses the raw arguments (drag-and-drop)
2. Appends files to the existing `field.files` array (preserving previous uploads)
3. Fires the `onDrop` hook

#### Method 1: type: 'file' with bind() (recommended)

Define the field `type` property as `file` and use `bind()` on your input — `onChange` will automatically delegate to `onDrop`:

```javascript
const fields = {
  avatar: {
    type: 'file',
    hooks: {
      onDrop(field) {
        const file = field.files?.[0];
        if (file) console.log('Uploaded:', file.name);
      },
    },
  },
};
```

```html
<input type="file" multiple {...field.bind()} />
```

#### Method 2: Custom binding with onDrop override

Without `type: 'file'`, override the `onChange` handler in `bind()` to use `onDrop`:

```html
<input type="file" multiple {...field.bind({ onChange: field.onDrop })} />
```

#### Method 3: Drag-and-drop zone

Create a custom drop zone and call `onDrop` manually:

```jsx
<div
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    field.onDrop(e);
  }}
>
  Drop files here
</div>
```

#### Accessing uploaded files

After a drop or file selection:

```javascript
field.files; // Array of File objects

// Example: read first file as data URL
const file = field.files?.[0];
if (file) {
  const reader = new FileReader();
  reader.onload = (e) => field.set('extra', {
    previewUrl: e.target.result,
  });
  reader.readAsDataURL(file);
}
```


---

> **Next:** [Custom Event Handlers](event-handlers/constructor.md) — define handlers on initialization or by extending the class.
