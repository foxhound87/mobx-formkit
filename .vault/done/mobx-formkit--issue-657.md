## **Array fields: form.isDirty misses add/del (regression of #450), move() never marks dirty, and add({ name }) treats the value as a key**

 Array fields have three related bugs in `src/Base.ts`: `form.isDirty` stays `false` (`form.isPristine === true`) after `del()` or `add()` on an array container, `move()` reorders `values()` without updating `isDirty` on either the field or the form, and `add({ name: ... })` on a nested array with a `name` subfield uses the value as the container key and drops the item values.

```js
// npm i mobx-formkit@1.1.2 mobx@7.1.7 && node repro.mjs
import { Form } from 'mobx-formkit';

// 1. del() / add() on an array updates field.isDirty, but form.isDirty stays false
const f1 = new Form({
  struct: ['members[].name'],
  values: { members: [{ name: 'A' }, { name: 'B' }] },
});
f1.$('members').del(0);
console.log('1a del:', JSON.stringify(f1.values()), {
  fieldDirty: f1.$('members').isDirty,
  formDirty: f1.isDirty,
  formPristine: f1.isPristine,
});

const f2 = new Form({
  struct: ['tags[]'],
  values: { tags: ['a'] },
});
f2.$('tags').add({ value: 'b' });
console.log('1b add:', JSON.stringify(f2.values()), {
  fieldDirty: f2.$('tags').isDirty,
  formDirty: f2.isDirty,
});

// 2. move() reorders values(), but neither field.isDirty nor form.isDirty becomes true
const f3 = new Form({
  struct: ['members[].name'],
  values: { members: [{ name: 'A' }, { name: 'B' }] },
});
f3.$('members').move(0, 1);
console.log('2 move:', JSON.stringify(f3.values()), {
  fieldDirty: f3.$('members').isDirty,
  formDirty: f3.isDirty,
});

// 3. add({ name, qty }) treats item field `name` as the container key and drops values
const f4 = new Form({
  struct: ['items[].name', 'items[].qty'],
  values: { items: [{ name: 'Old', qty: 2 }] },
});
f4.$('items').add({ name: 'New', qty: 1 });
console.log('3 add({ name }):', JSON.stringify(f4.values()));
```

Actual output:

```text
1a del: {"members":[{"name":"B"}]} { fieldDirty: true, formDirty: false, formPristine: true }
1b add: {"tags":["a","b"]} { fieldDirty: true, formDirty: false }
2 move: {"members":[{"name":"B"},{"name":"A"}]} { fieldDirty: false, formDirty: false }
3 add({ name }): {"items":{"0":{"name":"Old","qty":2},"New":{"name":"","qty":""}}}
```

Expected output:

```text
1a del: {"members":[{"name":"B"}]} { fieldDirty: true, formDirty: true, formPristine: false }
1b add: {"tags":["a","b"]} { fieldDirty: true, formDirty: true }
2 move: {"members":[{"name":"B"},{"name":"A"}]} { fieldDirty: true, formDirty: true }
3 add({ name }): {"items":[{"name":"Old","qty":2},{"name":"New","qty":1}]}
```

Likely causes in `src/Base.ts`:

1. `Base.deepCheck` skips `field[prop]` when `field.fields.size && Array.isArray(field.initial)` except for `isValid` and `hasError` (#656), so `form.isDirty` and `form.isPristine` ignore `field.isDirty` on non-empty array containers (the `isDirty`/`isPristine` exception from `c6193d7` for #450/#367 was removed in `3c23db8`, and `f1.$('members').add()` or `add([{ name: 'C' }])` shows the same mismatch).
2. `Base.move()` calls `this.fields.move(fromIndex, toIndex)` without incrementing `this.$changed` or `this.state.form.$changed`, and `Field.isDirty` only compares `this.initial` and `this.value` when `this.changed` is non-zero.
3. The [nested array `add()` docs](https://foxhound87.github.io/mobx-formkit/actions/add-del#nested-arrays-fields-with-sub-fields) and `AGENTS.md` (`form.$('items').add({ name: 'New', qty: 1 })`) pass item field values directly as a plain object, but `Base.add()` reads `obj.name` as the new field key and skips nested value assignment when `obj` has `name` or `key` (related to #224; the array form `add([{ name: 'New', qty: 1 }])` works).

Version: `mobx-formkit@1.1.2` with `mobx@7.1.7` on Node.js `v26.13.0`, also on `master` (`9c4b8e0`).

Credit: https://ucsbplse.github.io/
