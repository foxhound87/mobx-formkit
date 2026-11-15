# ArrayMap

**Ordered key-value collections** — the data structure that powers dynamic array fields in MobX Formkit. Every field group backed by an array (e.g., `hobbies[]`, `products[]`) uses `ArrayMap` internally.

> 📁 **Source:** [`src/ArrayMap.ts`](https://github.com/foxhound87/mobx-formkit/blob/master/src/ArrayMap.ts)

---

## Concept

`ArrayMap` is an **ordered key-value collection** that combines the API of a MobX `ObservableMap` with array-like ordering. Unlike a plain `Map`, it maintains **insertion order** via an internal observable array. This allows:

- **Reordering** items with `move(fromIndex, toIndex)`
- **Direct array observation** with `toArray()`
- **Map-style access** (`get`, `set`, `has`, `delete`, `keys`, `values`)
- **Full MobX reactivity** — every mutation is tracked

Every **Form** and **Field** instance has a `fields` property that is an `ArrayMap` of its child fields.

---

## When is ArrayMap used?

ArrayMap is the backing store for the `fields` property on every Form and Field instance. It is especially relevant when working with **dynamic array fields**:

```javascript
const fields = [
  'hobbies',
  'hobbies[]',           // array of strings
  'products[]',          // array of objects
  'products[].name',
  'products[].price',
  'products[].quantity',
];
```

Each `hobbies` item and each `products` item is stored in an `ArrayMap`, accessible via `form.$('hobbies').fields` and `form.$('products').fields`.

---

## Full API

### Map-like Methods

| Method | Description |
|--------|-------------|
| `get(key)` | Get value by key |
| `set(key, value)` | Set or add entry |
| `has(key)` | Check if key exists |
| `delete(key)` | Remove entry by key |
| `clear()` | Remove all entries |
| `size` | Number of entries |
| `keys()` | Iterator over keys |
| `values()` | Iterator over values |
| `entries()` | Iterator over `[key, value]` pairs |
| `forEach(callback)` | Iterate with `(value, key, map)` |
| `merge(other)` | Merge entries from object, Map, or array of pairs |
| `replace(values)` | Clear and merge |
| `toJSON()` | Convert to plain object `{ key: value }` |
| `[Symbol.iterator]()` | Iterable: `for (const [key, value] of map)` |

### Array-specific Methods

| Method | Description |
|--------|-------------|
| `move(fromIndex, toIndex)` | Move an entry from one index to another (single splice operation) |
| `toArray()` | Get the underlying observable array for direct MobX observation |
| `intercept` | Access the underlying array's MobX `intercept` method |

### Duck-typing Marker

```javascript
map._isArrayMap === true
```

Used internally by utility functions to detect ArrayMap instances and iterate correctly without knowing the concrete type.

---

## Common Operations

### Iterating fields

```javascript
// Map-like iteration
form.fields.forEach((field, key) => {
  console.log(key, field.value);
});

// for...of
for (const [key, field] of form.fields) {
  console.log(key, field.value);
}

// keys / values
const keys = [...form.fields.keys()];
const values = [...form.fields.values()];
```

### Moving items (reordering)

```javascript
// Move the third item to the first position
form.$('products').move(2, 0);

// Move first item to the end
form.$('hobbies').move(0, 2);

// On the form itself: moves the first field to the end
form.move(0, form.size - 1);
```

The `move()` method uses a **single MobX splice operation** — no field bindings or validation state is lost during the reorder.

### Merging external data

```javascript
// Merge from a plain object
form.$('products').fields.merge({
  '3': { name: 'New Product', price: 15, quantity: 1 },
});

// Merge from an array of [key, value] pairs
form.$('products').fields.merge([
  ['4', { name: 'Another', price: 20, quantity: 2 }],
]);
```

---

## Relationship with `add()` and `del()`

The `add()` and `del()` methods on fields delegate to the underlying `ArrayMap`:

```javascript
// These are equivalent:
// Simple arrays: value wrapper
form.$('hobbies').add({ value: 'Tennis' });

// Nested arrays: pass values directly
form.$('members').add({ firstname: 'John', lastname: 'Doe' });
form.$('hobbies').fields.set('newKey', { /* field definition */ });

// Similarly:
form.$('hobbies').del(1);
form.$('hobbies').fields.delete('1');
```

However, `add()` and `del()` are the **preferred API** because they also:
- Create properly configured Field instances (not raw values)
- Maintain field structure and validation configuration
- Execute Event Handlers (`onAdd`, `onDel`) and Event Hooks
- Handle incremental key assignment automatically

---

## Array containers vs plain array fields

Two kinds of array fields behave differently, and the library tells them apart with two helpers available on every **Form** and **Field** instance:

| Helper | Description |
|--------|-------------|
| `isArrayContainer(path?)` | The path is declared as an array in the struct (`path[]` or `path[].subfield`) |
| `isPlainArrayField()` | The field has no nested fields and its value is an array |

```javascript
const form = new Form({ struct: ['items[].name', 'tags'] });

form.$('items').isArrayContainer();   // true
form.$('tags').isArrayContainer();    // false
form.$('tags').isPlainArrayField();   // true (when the value is an array)
```

| | Array container (`items[]`) | Plain array field (`tags`) |
|---|---|---|
| Value | read from the nested fields | the array itself |
| `update({ tags: [...] })` | creates / updates / removes the nested fields | sets the value (an empty array empties the field) |
| `add({ value: 'x' })` | adds a nested item | appends the item to the array |
| `sync([...])` | applies the array to the nested fields | sets the value |
| `reset()` | rebuilds the nested fields from the declared array | restores the declared value |
| `clear()` | removes the nested fields (value becomes `[]`) | empties the value |

---

## Key Takeaways

1. **Ordered Map**: ArrayMap combines Map semantics with array ordering — best of both worlds.
2. **`move()`**: Reorder items without breaking field bindings or validation.
3. **`toArray()`**: Expose the underlying array for direct MobX observation (e.g., `observe()` from mobx).
4. **Full Map API**: `get`, `set`, `has`, `delete`, `forEach`, `keys`, `values`, `entries`.
5. **Prefer `add()`/`del()`**: For form fields, use the higher-level methods to ensure proper field initialization.
6. **Array containers vs plain arrays**: `isArrayContainer()` and `isPlainArrayField()` tell apart the two kinds of array fields, which behave differently on `update()`, `add()`, `sync()`, `reset()` and `clear()`.
