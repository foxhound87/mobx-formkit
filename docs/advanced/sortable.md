# Sortable List

Array fields in MobX Formkit are backed by `ArrayMap` — an ordered key-value collection that exposes array-like operations while maintaining full MobX reactivity. This enables **drag-and-drop reordering** of dynamic array items.

> 🔗 **Live Demo:** [Sortable List](https://foxhound87.github.io/mobx-formkit-demo/form/sortableList)  
> 📁 **Demo Source:** [FormSortableList.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormSortableList.tsx)  
> 📁 **Form Setup:** [sortableList.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/sortableList.ts)

---

## `move(fromIndex, toIndex)`

The `move()` method is available on every **Form** and **Field** instance:

```
form.move(fromIndex, toIndex)
field.move(fromIndex, toIndex)
```

It delegates to the underlying `ArrayMap.move()` which performs a **single MobX-reactive splice operation** — reordering items without breaking field bindings or validation state.

**Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `fromIndex` | `number` | Current index of the item to move |
| `toIndex` | `number` | Target index to place the item |

**Behavior:**

- Moves the entry at `fromIndex` to `toIndex` by splicing the internal observable array
- Does nothing if `fromIndex === toIndex` or either index is out of bounds
- All field references, values, and validation state are preserved after the move
- The change is fully tracked by MobX — any observer re-renders automatically

---

## ArrayMap

`ArrayMap` is the internal data structure that powers ordered field collections. It implements the same API as MobX `ObservableMap` (`get`, `set`, `has`, `delete`, `forEach`, `keys`, `values`, `entries`, `merge`, `clear`, `[Symbol.iterator]`) while maintaining insertion order via an observable array.

### Array-specific methods

| Method | Description |
|--------|-------------|
| `move(fromIndex, toIndex)` | Move an entry from one index to another |
| `toArray()` | Get the underlying observable array for direct MobX observation |

### Duck-typing

`ArrayMap` exposes a `_isArrayMap = true` property so internal utility functions can detect it and iterate correctly without knowing the concrete type.

---

## Usage with Drag-and-Drop Libraries

The demo uses [`@dnd-kit/sortable`](https://docs.dndkit.com/) for drag-and-drop, but `move()` is library-agnostic — it works with any approach that provides a `fromIndex` and `toIndex`.

### Basic pattern

```jsx
import { observer } from 'mobx-react';

const SortableList = observer(({ form }) => {
  const items = form.$('products');

  function onDragEnd(fromIndex, toIndex) {
    items.move(fromIndex, toIndex);
  }

  return (
    <div>
      {items.map(field => (
        <div key={field.key}>
          <input {...field.$('name').bind()} />
        </div>
      ))}
    </div>
  );
});
```

### Form setup

```javascript
const fields = [
  'products[]',
  'products[].name',
  'products[].price',
  'products[].quantity',
];

const values = {
  products: [
    { name: 'Product 1', price: 10, quantity: 1 },
    { name: 'Product 2', price: 20, quantity: 2 },
  ],
};
```

### Up/Down buttons (without drag)

For simple list reordering without drag-and-drop:

```jsx
function handleMoveUp(index) {
  if (index > 0) items.move(index, index - 1);
}

function handleMoveDown(index) {
  if (index < items.length - 1) items.move(index, index + 1);
}
```

---

## Adding items

Array fields support `onAdd` and `onDel` for dynamic item management:

```jsx
<button onClick={items.onAdd}>Add Product</button>
<button onClick={field.onDel}>Remove</button>
```

New items are automatically created with default values and assigned the next integer key. The `move()` method works identically on newly added items.
