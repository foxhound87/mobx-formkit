# A list field's or list row's own validator doesn't make the form invalid

Hi, I ran into a validation issue with list fields and wrote up a repro below. Happy to open a PR with the `deepCheck` change if that's useful.

Found on mobx-formkit 1.1.1 (latest on npm).

## Summary

A validator attached to a field whose `initial` value is an array never makes `form.isValid` false, even though the field's own `isValid` is false and its error is set. `submit()` then calls `onSuccess`. Fields whose `initial` is an array include:

- every list field (`rows`), and
- every row created by `add()` or `update()` (`rows[]`): those rows get `initial: []`, while a row passed to the constructor's `values` gets its object.

So a row-level rule such as "a dropdown row needs at least one option" shows its error but never blocks the submit.

## Where it happens

1. **`Base.deepCheck` skips array containers** (`src/Base.ts`, around line 458):

   ```ts
   if (!field.fields.size || !Array.isArray(field.initial)) {
     check.push(field[prop]);
   }
   check.push(checkPropOccurrence({ data: this.deepCheck(type, prop, field.fields), type }));
   ```

   The same walk computes `isDirty`, `isPristine`, `isEmpty`, `isValid`, and `hasError` (`props.occurrences`). For dirty and empty, skipping a list's own value makes sense, because its children already answer the question. For `isValid` and `hasError` it drops the list's own validation errors. `Field.isValid` (`!this.checkValidationErrors && this.check("isValid", true)`) does include them, so the field and the form disagree.

2. **Rows created by `add()` or `update()` get `initial: []`** instead of their own value (`Field.setupField`, `src/Field.ts` around lines 667–712). `isArrayFromStruct` returns true for a row's struct path (`rows[]` ends in `[]`), so `isEmptyArray` is true for the row itself, not just the list. A row created by `update()` or `add()` arrives as a plain object with no `value` key, and `$props.$value` is undefined because the constructor's `values` doesn't contain it. `parseInput` therefore falls through to `defaultValue({ isEmptyArray: true })`, which is `[]`. Then `$initial` falls back to that `$value`. A row passed in the constructor's `values` gets its object from `$props.$value` instead. That makes item 1 apply to rows, not just list fields. Forms that load data with `update()` after construction (common for forms hydrated from an API) have this on every row.

## Minimal repro

```js
import { Form } from "mobx-formkit";
import vjf from "mobx-formkit/lib/validators/VJF";

const rowRule = () => [false, "row is invalid"];

const build = (values) =>
  new Form(
    {
      fields: ["rows", "rows[]", "rows[].name"],
      values,
      validators: { "rows[]": [rowRule] },
    },
    { plugins: { vjf: vjf() } }
  );

it("row passed to the constructor: form is invalid (works)", async () => {
  const form = build({ rows: [{ name: "a" }] });
  await form.validate();
  expect(form.isValid).toBe(false); // passes
});

it("row created by update(): form should be invalid", async () => {
  const form = build({ rows: [] });
  form.update({ rows: [{ name: "a" }] });
  await form.validate();

  const row = form.$("rows").fields.values().next().value;
  expect(row.initial).toEqual({ name: "a" }); // fails: []
  expect(row.isValid).toBe(false); // passes
  expect(form.isValid).toBe(false); // fails: true
});

it("row created by add(): form should be invalid", async () => {
  const form = build({ rows: [] });
  form.$("rows").add({}).update({ name: "a" });
  await form.validate();
  expect(form.isValid).toBe(false); // fails: true
});

it("validator on the list field itself: form should be invalid", async () => {
  const form = new Form(
    {
      fields: ["rows", "rows[]", "rows[].name"],
      values: { rows: [{ name: "a" }] },
      validators: { rows: [() => [false, "need two rows"]] },
    },
    { plugins: { vjf: vjf() } }
  );
  await form.validate();
  expect(form.isValid).toBe(false); // fails: true
});
```

## Observed

| Validator on… | `form.isValid` after `validate()` |
|---|---|
| a leaf field | false (correct) |
| a leaf inside a row (`rows[].name`) | false (correct) |
| a nested object field (`address`, with `address.street`) | false (correct) |
| a row passed in the constructor's `values` | false (correct) |
| a row created by `add()` or `update()` | **true** |
| the list field itself (`rows`) | **true** |

In every case the field's own `isValid` is false and its `error` is set once errors are shown, so the UI displays the error while `submit()` runs `onSuccess`.

## Expected

`form.isValid` and `form.hasError` reflect every field's own validation errors, including list fields and rows. A row's `initial` is its own value, however it was created.

## Possible fixes

- In `deepCheck`, keep skipping a list's own value for `isDirty`, `isPristine`, and `isEmpty`, but count its own validation state for `isValid` and `hasError`:

  ```ts
  if (!field.fields.size || !Array.isArray(field.initial)) {
    check.push(field[prop]);
  } else if (prop === "isValid") {
    check.push(!field.checkValidationErrors);
  } else if (prop === "hasError") {
    check.push(field.checkValidationErrors);
  }
  ```

- Give rows created by `add()` or `update()` their own value as `initial`, as the constructor does. This alone fixes rows but not validators on the list field itself.

## How it showed up

A settings form validates each row of a list with "options are required for dropdown rows" (a validator keyed on `rows[]`), and loads its rows with `update()` after construction. Clicking save showed the error on the row and submitted the row with no options anyway. The workaround is to override `isValid` on the form to also require every row's `isValid`.
