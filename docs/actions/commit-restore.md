# Commit & Restore

Confirm the current state of a form and restore it later — the counterpart of `reset()` for the "the user saved the changes on the server" case.

---

## Overview

| Method | Description |
|--------|-------------|
| `commit()` | Captures the current values as the new restore reference. It does not validate, it does not send anything and it does not change the current values. |
| `restore()` | Restores the values captured by the last `commit()`. |
| `committed()` | The values captured by the last `commit()` (read only). |

They are available on **Form** instances and on the **nested fields** (sub-forms).

---

## Example: editing a form with a remote save

```javascript
const form = new Form({
  fields: {
    name: { value: 'Claudio' },
    email: { value: 'claudio@example.com' },
  },
});

// the user edits the form
form.$('name').set('Marco');
form.$('email').set('marco@example.com');

// the save on the server succeeded
await saveOnServer(form.values());
form.commit();

// the user keeps editing
form.$('name').set('Mario');

// undo the changes made after the last commit
form.restore();

form.$('name').value;  // 'Marco'
form.$('email').value; // 'marco@example.com'
```

---

## Semantics

### Before the first `commit()`

The restore reference is the **reset target** of the form: for each field the `default` when it differs from the `initial`, the `initial` otherwise (the same rule as `reset()`).

`restore()` is therefore useful even before the first save:

```javascript
const form = new Form({ fields: ['name'], values: { name: 'Claudio' } });

form.$('name').set('Marco');
form.restore();

form.$('name').value; // 'Claudio'
```

### `restore()` restores the values only

- the fields **added** after the commit are **kept** (they are not part of the committed state);
- the fields **deleted** after the commit are **not recreated**;
- the **array containers** follow the snapshot: the items are created, removed and reordered to match it.

```javascript
const form = new Form({ fields: ['tags'], values: { tags: ['a'] } });
form.commit();

form.add({ name: 'extra', value: 'x' }); // a field added after the commit
form.restore();

form.values(); // { tags: ['a'], extra: 'x' } — the added field is kept
```

### `commit()`, `restore()` and `reset()` are different

| Method | Meaning |
|--------|---------|
| `commit()` | Confirms the current state as the new restore point |
| `restore()` | Restores the state confirmed by the last `commit()` |
| `reset()` | Restores the `initial` (or the `default` when it differs from the `initial`) |

`reset()` is not affected by `commit()`: the two references are independent.

### The dirty state is unchanged

`isDirty` and `isPristine` keep comparing the values with the `initial`/`default`: a commit does not make the form pristine. To know if there are changes which are not committed yet, compare the values with the committed ones:

```javascript
const hasUncommittedChanges =
  JSON.stringify(form.values()) !== JSON.stringify(form.committed());
```

### Validation

`restore()` does not trigger the validation and does not clear the existing errors. Enable the `validateOnRestore` option to validate the restored values:

```javascript
const form = new Form(
  { fields: [{ name: 'email', rules: 'required|email' }] },
  { options: { validateOnRestore: true, showErrorsOnRestore: true } },
);

await form.restore(); // the restored values are validated
```

| Option | Default | Description |
|--------|---------|-------------|
| `validateOnRestore` | `false` | Validate the values after a `restore()` |
| `showErrorsOnRestore` | `false` | Show the validation errors after a `restore()` |

When the validation is enabled, `restore()` returns the validation promise:

```javascript
await form.restore();
```

---

## Sub-forms

A nested field (a sub-form) has its own restore reference:

```javascript
form.$('club').commit();
form.$('club').$('name').set('CHANGED');
form.$('club').restore();

form.$('club').$('name').value; // back to the committed value
```

---

## Limits

- the values which cannot be cloned safely (`File`, `Blob`, class instances) are kept **by reference** in the snapshot: mutating them in place is visible in the snapshot too;
- `restore()` does not recreate the fields deleted after the commit and does not remove the fields added after the commit;
- the snapshot is a copy of the **values**: the field props (label, rules, options, ...) are not part of it.

---

> These are programmatic actions, not Event Handlers. Use the `onChange` hook to react to the changes.

---

## See also

- [Clear, Reset & Focus](./clear-reset) — `clear()` and `reset()`
- [Get, Set & Update](./get-set) — `update()`
- [Add, Delete & Move](./add-del) — `add()`, `del()` and `move()`
