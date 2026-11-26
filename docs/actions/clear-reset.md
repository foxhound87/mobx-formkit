# Clear, Reset & Focus

State management methods for forms and fields.

---

## clear()

Clear the field or form to empty values. Available on **Form** and **Field** instances.

```javascript
form.clear();          // clear all fields
form.$('username').clear(); // clear a single field
```

- Sets the field value to its empty/default type value (based on `fallbackValue` option)
- Resets `touched`, `blurred`, `changed`, and `files`
- If `validateOnClear` is enabled, re-validates the field
- Recursively clears nested fields by default
- An array container is emptied: its nested fields are removed, so its value becomes `[]`

> This is an action, not an Event Handler. Use `onClear(e)` to trigger hooks.

---

## reset()

Reset the field or form to its default value. Available on **Form** and **Field** instances.

```javascript
form.reset();               // reset all fields to defaults
form.$('username').reset(); // reset a single field
```

- If a **declared** `default` differs from `initial`, uses `default`
- Otherwise uses `initial`
- To make the current values the new reset target, use [`markPristine()`](./mark-pristine)
- Resets `touched`, `blurred`, `changed`, and `files`
- If `validateOnReset` is enabled, re-validates the field
- Recursively resets nested fields by default
- An array container is rebuilt from its declared array: the items removed by an `update()` are restored and the items added by an `update()` are dropped

> This is an action, not an Event Handler. Use `onReset(e)` to trigger hooks.

---

## focus()

Programmatically focus the field. Requires a `ref` to be attached to the input.

```javascript
form.$('username').focus();
```

The `ref` is set automatically when using `bind()`:

```javascript
<input {...field.bind()} />
```

Or manually:

```javascript
<input ref={(ref) => field.set('ref', ref)} />
```

---

## blur()

Programmatically blur the field. Requires a `ref`.

```javascript
form.$('username').blur();
```

The `blur()` method:
1. Calls `ref.blur()` on the DOM element (if a ref is attached)
2. Sets `$focused = false`
3. Sets `$blurred = true`

Useful for dismissing keyboard focus after a successful action:

```javascript
function handleSubmitSuccess() {
  form.$('username').blur();
  form.$('email').blur();
}
```

---

## trim()

Remove whitespace from the field value if it is a string. Does **not** trigger the `onChange` Event Hook.

```javascript
field.trim();
// field.value is now trimmed, no onChange hook fires
```

> Useful for pre-submit processing. For automatic trimming on every change, use the `autoTrimValue` form option.
