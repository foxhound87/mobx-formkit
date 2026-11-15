# mobx-formkit: array field values after `update`, `reset`, and `sync`

Environment: mobx-formkit 1.1.1, mobx 6.16.1, default form options unless stated. Every case below was reproduced in a bare `Form` with no bindings, plugins, or custom options. The outputs are copied from the runs. Source references are to mobx-formkit's own `src/`.

## Summary

1. **`update()` cannot empty a plain array field.** With `fallback: true` (the default), `update({ tags: [] })` after an earlier `update` brings back the declared value, not `[]`.
2. **`reset()` after `update()` does not restore a declared array.** Elements become empty values (`0`, `""`, `{ label: "", value: "" }`), and the element count stays at whatever the last `update` left.
3. **`update()` ignores new values at positions the declared array had**, when the array was declared through separated `values`. Each new element takes the declared element at its position.
4. **On a field with nested fields, `sync` and `onChange` with an array do nothing, and `set` writes only into the nested fields that exist.** `set` matches the docs (it is for existing fields), but neither path warns that part or all of the array was dropped.

The docs for `reset()` ([Clear, Reset & Focus](https://foxhound87.github.io/mobx-formkit/actions/clear-reset)) don't say how arrays or fields added by `update()` are treated, so case 2 is at least undocumented. The places where the code and the docs disagree are listed under [Where the code disagrees with the docs](#where-the-code-disagrees-with-the-docs).

Together these make a multi-select tag field hard to bind: no single write grows the array, shrinks it, empties it, and survives `reset()`.

## Setup

```js
import { Form } from "mobx-formkit";

const read = (form) => ({
  value: form.$("tags").value,
  nestedFields: form.$("tags").fields.size,
  values: form.values().tags,
});
```

## 1. Emptying a plain field after an update brings back the declared value

```js
const form = new Form({ fields: ["tags"], values: { tags: [1, 2] } });
read(form); // { value: [1, 2], nestedFields: 0, values: [1, 2] }

form.update({ tags: [1] });
read(form); // { value: [1], nestedFields: 1, values: [1] }

form.update({ tags: [] });
read(form); // { value: [1, 2], nestedFields: 0, values: [1, 2] }  expected []
```

The same result comes from declaring the field with separated `initials` or a unified `value`. With `{ options: { fallback: false } }` the last read is `[]`, as expected, and so is a field declared with nested fields (`fields: ["tags", "tags[]"]`).

Cause:
- With `fallback` on, `Base.deepUpdate` treats the array as nested fields and creates them under the plain field through `initField`.
- It never writes the parent's own `$value`, which keeps the declared array.
- `Field.value` reads from the nested fields while there are any (`getComputedProp`, `hasNestedFields`), so the stale `$value` is hidden until the last nested field is removed.

## 2. `reset()` after an update gives empty values

```js
const a = new Form({ fields: ["tags"], initials: { tags: [1, 2] } });
a.update({ tags: [3] });
a.reset();
read(a); // { value: [0], nestedFields: 1 }  expected [1, 2]

const b = new Form({
  fields: ["tags"],
  initials: { tags: [{ label: "A", value: "a" }, { label: "B", value: "b" }] },
});
b.update({ tags: [{ label: "A", value: "a" }] });
b.reset();
read(b); // { value: [{ label: "", value: "" }], nestedFields: 1 }  expected the two declared options

const c = new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } });
c.update({ tags: [1, 2, 3] });
c.reset();
read(c); // { value: [1, 2, 0], nestedFields: 3 }  expected [1, 2]

const d = new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } });
d.update({ tags: [1] });
d.reset();
read(d); // { value: [1], nestedFields: 1 }  expected [1, 2]

const e = new Form({ fields: ["tags"], initials: { tags: [1, 2] } });
e.reset();
read(e); // { value: [1, 2], nestedFields: 0 }  correct: no update, no problem
```

Causes:
- `setupDefaultProp`, when called with `update = true`, gives a nested field created by `update()` a `default` of its type's empty value. Its `initial` is the value it was created with.
- `Field.reset()` uses `default` whenever it differs from `initial`, as documented, so each such nested field resets to the empty value.
- `Field.reset()` then sets the parent's stored value to its own initial value, but the parent's value is read from its nested fields while there are any.
- `reset()` only resets the nested fields that exist. Removed ones are not recreated, and added ones are not removed.

A UI symptom: a multi-select with two seeded chips, one chip removed, then Reset shows a single blank chip whose value is `{ label: "", value: "" }`. Clearing the field afterward does not remove it.

## 3. New elements take the declared value at their position

Only when the array is declared through separated `values`:

```js
const a = new Form({ fields: ["tags"], values: { tags: [1, 2] } });
a.update({ tags: [9] });
a.update({ tags: [9, 8, 7] });
read(a); // { value: [9, 2, 7] }  expected [9, 8, 7]

const b = new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } });
b.update({ tags: [] });
b.update({ tags: [3, 4] });
read(b); // { value: [1, 2] }  expected [3, 4]

const c = new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } });
c.update({ tags: [] });
c.$("tags").add({ value: 3 });
read(c); // { value: [1] }  expected [3]
```

Declaring the same array with separated `initials`, a unified `value`, or a unified `initial` gives `[9, 8, 7]` for the first case.

Cause:
- `Base.initField` builds a new field's `$value` from the form's separated `values` at the field's path (`tags.1`).
- `parseInput` tries `separated` before `unified` (`$try(separated, unified, fallback, …)`), so the declared `values.tags[1]` wins over the element passed to `update()` or `add()`.
- The docs say the opposite precedence; see [Mixed mode precedence](#1-mixed-mode-precedence).

## 4. Array writes on a field with nested fields: `sync` and `onChange` do nothing, `set` only overwrites

Each case starts from `new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } })`:

| Write | `[5, 6]` (same length) | `[5, 6, 7]` (longer) | `[5]` (shorter) | `[]` |
| --- | --- | --- | --- | --- |
| `field.set(array)` | `[5, 6]` | `[5, 6]` | `[5, 2]` | `[1, 2]` |
| `field.sync(array)` | `[1, 2]` | `[1, 2]` | `[1, 2]` | `[1, 2]` |
| `field.onChange(array)` | `[1, 2]` | `[1, 2]` | `[1, 2]` | `[1, 2]` |

Causes:
- `set` writes each element into the nested field at its position. It adds and removes none, which the docs describe: `set()` is for existing fields, and `add()` / `del()` / `update()` change the structure.
- `sync` and `onChange` go through the value setter, which stores the array on the parent's `$value`. The value is read from the nested fields, so the write has no visible effect at all.

Neither path warns that the array was partly or wholly dropped. On a field without nested fields, the same `onChange` works, including `reset()` afterward.

## Where the code disagrees with the docs

Each quote is from the public docs; each result was run against 1.1.1.

### 1. Mixed mode precedence

[Fields, Mixed Mode](https://foxhound87.github.io/mobx-formkit/fields/#mixed-mode-unified-separated): unified props "take precedence over separated props."

In the code, separated props win, both when the form is created and in `update()` (case 3):

```js
const form = new Form({
  fields: [
    { name: "a", value: "unified", label: "U", initial: "uInit", default: "uDef" },
  ],
  values: { a: "separated" },
  labels: { a: "S" },
  initials: { a: "sInit" },
  defaults: { a: "sDef" },
});

form.$("a").value; // "separated"  docs say "unified"
form.$("a").label; // "S"          docs say "U"
form.$("a").initial; // "sInit"    docs say "uInit"
form.$("a").default; // "sDef"     docs say "uDef"
```

`parseInput` tries `separated` before `unified`, and `setupFieldProps` uses `props.$x ?? data.x`.

### 2. `update()` provides new values

[Get, Set & Update](https://foxhound87.github.io/mobx-formkit/actions/get-set): `update()` will "Recreate the fields tree and provide new values."

Two array updates do not end with the values provided:

```js
const a = new Form({ fields: ["tags"], values: { tags: [1, 2] } });
a.update({ tags: [1] });
a.update({ tags: [] });
a.$("tags").value; // [1, 2]  expected []  (case 1)

const b = new Form({ fields: ["tags"], values: { tags: [1, 2] } });
b.update({ tags: [9] });
b.update({ tags: [9, 8, 7] });
b.$("tags").value; // [9, 2, 7]  expected [9, 8, 7]  (case 3)
```

### 3. `add()` on a simple array

[Fields](https://foxhound87.github.io/mobx-formkit/fields/): "Simple array (no nested fields):" `form.$('hobbies').add({ value: 'Tennis' });`

On a field declared without nested fields, `add()` does not append:

```js
const a = new Form({ fields: ["hobbies"], initials: { hobbies: ["Golf"] } });
a.$("hobbies").add({ value: "Tennis" });
a.$("hobbies").value; // ["Tennis"]  expected ["Golf", "Tennis"]

const b = new Form({ fields: [{ name: "hobbies", value: ["Golf"] }] });
b.$("hobbies").add({ value: "Tennis" });
b.$("hobbies").value; // ["Tennis"]  expected ["Golf", "Tennis"]

const c = new Form({ fields: ["hobbies"], values: { hobbies: ["Golf"] } });
c.$("hobbies").add({ value: "Tennis" });
c.$("hobbies").value; // ["Golf"]  expected ["Golf", "Tennis"]
```

The first `add()` creates nested field `0` under a field that had none, so the value is read from that one nested field alone. In `c`, that nested field also takes `values.hobbies[0]` instead of `"Tennis"` (case 3). It only appends when the field is declared with nested fields:

```js
const d = new Form({ fields: ["hobbies", "hobbies[]"], values: { hobbies: ["Golf"] } });
d.$("hobbies").add({ value: "Tennis" });
d.$("hobbies").value; // ["Golf", "Tennis"]
```

### 4. `clear()` on an array with nested fields

[Clear, Reset & Focus](https://foxhound87.github.io/mobx-formkit/actions/clear-reset): `clear()` "Sets the field value to its empty/default type value" and "Recursively clears nested fields by default."

An array with nested fields keeps its elements and empties each one, so its value is not an empty array:

```js
const a = new Form({ fields: ["hobbies", "hobbies[]"], values: { hobbies: ["Golf", "Chess"] } });
a.clear();
a.$("hobbies").value; // ["", ""]  expected [] as an array's empty value

const b = new Form({ fields: ["n", "n[]"], values: { n: [1, 2] } });
b.clear();
b.$("n").value; // [0, 0]

const c = new Form({ fields: ["hobbies"], values: { hobbies: ["Golf"] } });
c.clear();
c.$("hobbies").value; // []  (no nested fields: as documented)
```

The two quoted sentences can each be read as allowing this, so this may be intended. If so, the docs could say that clearing an array with nested fields keeps its length.

## Workarounds in use

- **Plain field:** write the whole array with `field.onChange(array)` and never call `form.update` on it. That keeps it free of nested fields, so emptying and `reset()` both work.
- **Field with nested fields:** call `form.update({ [path]: array })`, then `set` each nested field to its element to undo case 3:

  ```js
  form.update({ [field.path]: next });
  Array.from(field.fields.values()).forEach((nested, index) =>
    nested.set(next[index])
  );
  ```

  `reset()` on such a field is still wrong (case 2), and there is no workaround for that from outside the library.

## Suggested fixes

1. **Case 1:** when `deepUpdate` writes an array into a field, also write the parent's `$value`, or clear it once every nested field is removed, so an empty update reads as `[]`.
2. **Case 3:** in `initField`, when called from `update()` or `add()`, prefer the data passed in over the form's separated `values` at that path. Alternatively, make `parseInput` follow the documented unified-over-separated precedence.
3. **Case 2:** have `reset()` on an array field rebuild its nested fields from the parent's initial (or default) array, recreating removed ones and dropping added ones, before resetting each one. Fields created by `update()` could also take their `default` from that array instead of the empty value.
4. **Case 4:** have `sync` and `onChange` with an array on a field with nested fields write through to them as `update()` does, or warn that the write was ignored. `set` could warn when the array's length differs from the number of nested fields.
