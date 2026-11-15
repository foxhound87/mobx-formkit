# Reactive Computed

Compute **row-level totals** that reactively update when input fields change — without manual event handlers. Uses MobX `autorun()` to observe field values and recalculate derived data on every keystroke.

> 🔗 **Live Demo:** [Reactive Computed](https://foxhound87.github.io/mobx-formkit-demo/form/reactiveComputed)  
> 📁 **Source:** [FormReactiveComputed.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormReactiveComputed.tsx)  
> 📁 **Setup:** [reactiveComputed.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/reactiveComputed.ts)

---

## Concept

This demo shows the canonical "cart/order" pattern: an array of line items where `rowTotal = qty * amount`, and a `grandTotal` that sums all rows. Because MobX tracks every observable access inside an `autorun()`, the totals stay in sync automatically — no `onChange` handlers, no `useEffect` dependencies, no manual re-calculation.

---

## Form Setup

The form is defined in separated mode with an array field `products[]`. Each product has `name`, `qty`, `amount`, and `total`. A top-level field `orderTotal` holds the grand sum:

```javascript
const fields = [
  'products',
  'products[].name',
  'products[].qty',
  'products[].amount',
  'products[].total',
  'orderTotal',
];

const values = {
  products: [
    { name: 'MacBook Pro', qty: 1, amount: 2499, total: 0 },
    { name: 'AirPods Pro', qty: 2, amount: 249, total: 0 },
  ],
};

const types = {
  'products[].qty': 'number',
  'products[].amount': 'number',
  'products[].total': 'number',
  'orderTotal': 'number',
};
```

The `onInit` hook ensures at least one product row exists:

```javascript
const hooks = {
  onInit(form) {
    if (form.$('products').fields.size === 0) {
      form.$('products').add();
    }
  },
};
```

---

## Component Walkthrough

### The `autorun()` engine

A single `autorun()` is registered in a `useEffect` on mount. It iterates every product, computes `rowTotal = qty * amount`, writes it to `item.$('total').set()`, and accumulates into `grandTotal`:

```jsx
useEffect(() => {
  const disposer = autorun(() => {
    const orderTotalField = form.$('orderTotal');
    let grandTotal = 0;

    products.map((item) => {
      const qty = Number(item.$('qty')?.value) || 0;
      const amount = Number(item.$('amount')?.value) || 0;
      const rowTotal = Number((qty * amount).toFixed(2));
      item.$('total')?.set(rowTotal);
      grandTotal += rowTotal;
    });

    orderTotalField.set(Number(grandTotal.toFixed(2)));
  });

  return () => disposer(); // cleanup on unmount
}, [form, products]);
```

Because MobX tracks every observable access made during the execution of `autorun()`, this function re-runs whenever **any** product's `qty` or `amount` changes — automatically.

### Product rows as observer components

Each product row is a separate MobX observer component. This means typing in one row does not re-render the others:

```jsx
const ProductRow = observer(({ field, onDelete }) => (
  <div>
    <Input field={field.$('name')} />
    <Input field={field.$('qty')} />
    <Input field={field.$('amount')} />
    <div>€ {field.$('total')?.value ?? 0}</div>
    <button onClick={onDelete}>Remove</button>
  </div>
));
```

### Adding and removing products

The "Add Product" button calls `products.add()` which creates a new empty product entry. The "Remove" button calls `products.del(field.key)`. The `autorun()` picks up the new row immediately because the `products` array is an observable:

```jsx
<button onClick={() => products.add()}>Add Product</button>
{products.map((field) => (
  <ProductRow key={field.key} field={field}
    onDelete={() => products.del(field.key)} />
))}
```

### Grand total display

The `orderTotal` field is read-only in the UI. Because it is updated by `autorun()`, it stays in sync with every change:

```jsx
<div>€ {form.$('orderTotal').value}</div>
```

---

## Key Takeaways

1. **Single autorun**: One `autorun()` replaces dozens of `onChange` handlers.
2. **Derived fields**: The row `total` and `orderTotal` are derived state — they are set programmatically, never by user input.
3. **Fine-grained rendering**: Each product row is a separate `observer()` — editing one row does not re-render the others.
4. **Dynamic arrays**: Adding or removing products works transparently because the autorun re-evaluates on any observable change.
5. **Cleanup**: Always store the disposer and call it on unmount.
