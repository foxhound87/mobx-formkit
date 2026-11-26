# Mark Pristine

Make the current values the starting point of the form — as if they had been passed to the constructor.

---

## Overview

| Method | Description |
|--------|-------------|
| `markPristine()` | Makes the current values the `initial` (and the reset target, unless a `default` is declared) and the restore reference of `restore()`. Clears the touched, blurred and changed state. Returns the form or field. |
| `update(values)` | Updates the values and returns the form or field, so it can be chained with `markPristine()`. |

Available on **Form** instances and on any **field**: on a field it covers that field and its nested fields.

---

## Example: values loaded after the form is created

The constructor values are the starting point. When the data arrives later, `update()` alone treats it as an edit: the form reads dirty and `reset()` goes back to the constructor values.

```javascript
const form = new Form({ struct: ['name', 'rows[].day'] });

const data = await fetchRecord();
form.update(data).markPristine();

form.isDirty;      // false
form.$('rows').add({ day: 2 });
form.reset();      // back to the loaded data
```

---

## Example: after a save

```javascript
await saveOnServer(form.values());
form.markPristine(); // the saved values become the starting point
```

---

## What it does

- Each value becomes the `initial`.
- The reset target becomes the new `initial`, unless a `default` is declared: a declared `default` stays the reset target.
- The values become the restore reference of `restore()`.
- The touched, blurred and changed state is cleared.
- It does **not** change any value and it does **not** validate.
- It returns the form or the field, so the calls can be chained.

```javascript
form.markPristine();
form.$('address').update(picked).markPristine(); // a nested field only
```

---

## `markPristine()`, `commit()` and `reset()`

| Method | Meaning |
|--------|---------|
| `markPristine()` | The current values become the starting point: `reset()` and `restore()` go back to them |
| `commit()` | Confirms the current values as the restore point, without changing the starting point |
| `restore()` | Restores the values captured by the last `commit()` |
| `reset()` | Restores the `initial` (or the declared `default` when it differs from the `initial`) |

```javascript
form.commit();       // restore() goes back to these values, reset() does not change
form.markPristine(); // reset() and restore() go back to these values
```

---

## Declared default

A declared `default` is left alone, so it keeps winning over the new `initial` on `reset()`:

```javascript
const form = new Form({
  fields: [{ name: 'role', default: 'user' }],
});

form.update({ role: 'admin' }).markPristine();

form.reset();
form.$('role').value; // 'user' — the declared default is the reset target
```

---

## Validation

`markPristine()` does not validate. When `isValid` must reflect the new values, validate afterwards:

```javascript
form.update(data).markPristine();
await form.validate();
```

---

## Limits

- `update()` alone does not move the `initial`: after `update()` the form is dirty wherever the values differ from the starting point. Chain `markPristine()` when the new values must become the starting point.
- For an array container, `markPristine()` makes the current rows the declared array: a later `reset()` rebuilds the container from them (removed rows are restored, added rows are dropped).

---

> These are programmatic actions, not Event Handlers. Use the `onChange` hook to react to the changes.

---

## See also

- [Commit & Restore](./commit-restore) — `commit()`, `restore()` and `committed()`
- [Clear, Reset & Focus](./clear-reset) — `clear()` and `reset()`
- [Get, Set & Update](./get-set) — `update()`
