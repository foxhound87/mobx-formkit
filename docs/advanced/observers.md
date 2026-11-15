# Observers

Observe field changes reactively using MobX `observe()`. Track value changes and trigger side effects — combined with `autorun()` for computed values.

> 🔗 **Live Demo:** [Observers](https://foxhound87.github.io/mobx-formkit-demo/form/observers)  
> 📁 **Source:** [FormObservers.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormObservers.tsx)  
> 📁 **Setup:** [observers.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/observers.ts)

---

## Concept

`observe()` fires **after** a value change has been committed to the store. It is a post-commit hook for reacting to what changed. Unlike interceptors, observers **cannot modify or reject** the incoming value — they are read-only listeners.

`autorun()` is a MobX utility that re-runs a function whenever any observable it depends on changes. It is ideal for deriving computed values from multiple fields.

---

## Form Setup

The demo form defines four fields. Note that `fullDisplay` starts empty — it will be filled reactively by `autorun()`:

```javascript
const fields = {
  firstName: {
    value: 'Jane',
    label: 'First Name',
    placeholder: 'Enter first name',
    rules: 'required|string|min:2',
  },
  lastName: {
    value: 'Smith',
    label: 'Last Name',
    placeholder: 'Enter last name',
    rules: 'required|string|min:2',
  },
  fullDisplay: {
    value: '',
    label: 'Computed Display',
  },
  count: {
    value: 0,
    label: 'Change Count',
    rules: 'integer',
  },
};
```

---

## Component Walkthrough

### Observing individual fields

The demo registers an `observe()` on both `firstName` and `lastName`. Each observer pushes a log entry to React state with the new value and timestamp:

```jsx
useEffect(() => {
  const firstName = form.$('firstName');
  const lastName = form.$('lastName');

  firstName.observe(({ change }) => {
    const entry = {
      field: 'firstName',
      value: change.newValue,
      time: new Date().toLocaleTimeString(),
    };
    setObservations((prev) => [entry, ...prev].slice(0, 15));
  });

  lastName.observe(({ change }) => {
    const entry = {
      field: 'lastName',
      value: change.newValue,
      time: new Date().toLocaleTimeString(),
    };
    setObservations((prev) => [entry, ...prev].slice(0, 15));
  });

  return () => {
    form.dispose();       // remove all observers
    autorunDisposer();    // remove the autorun
  };
}, [form]);
```

### Computing a value with `autorun()`

A MobX `autorun()` observes both `firstName` and `firstName.value` and `lastName.value`. Whenever either changes, it:
1. Concatenates them into a `fullName` string
2. Sets the `fullDisplay` field with the result (or `"(empty)"` when both are blank)
3. Updates React component state to show the computed value in the UI:

```jsx
const autorunDisposer = autorun(() => {
  const full = `${firstName.value} ${lastName.value}`.trim();
  form.$('fullDisplay').set(full || '(empty)');
  setComputed(full || '(empty)');
});
```

Because MobX tracks which observables are accessed inside the `autorun()`, it knows to re-run whenever `firstName.value` or `lastName.value` changes — no manual wiring needed.

### Dual cleanup

The effect returns a cleanup function that calls **both** `form.dispose()` (to remove observers) and `autorunDisposer()` (to stop the autorun). This is important: `form.dispose()` cleans up MobX events registered through the form API, while `autorunDisposer()` is a raw MobX disposer returned by `autorun()`.

---

## Observe Log Panel

The observe log renders below the form fields, showing each change with timestamp and field name:

```jsx
{observations.map((obs, i) => (
  <div key={i}>
    <span>{obs.time}</span>
    <span>{obs.field}</span>
    : <span class="text-green-600">{String(obs.value)}</span>
  </div>
))}
```

---

## API Reference

### `field.observe(callback)`

```javascript
form.$('email').observe(({ form, field, change }) => {
  console.log(`${field.path} changed from "${change.oldValue}" to "${change.newValue}"`);
});
```

### `form.observe({ path, key, call })`

```javascript
form.observe({
  path: 'password',
  key: 'value',
  call: ({ change }) => {
    if (change.newValue.length > 0) {
      form.$('passwordStrength').set('medium');
    }
  },
});
```

### Observing `fields` key

To observe the fields map itself (additions/removals of nested fields), use `key: 'fields'`:

```javascript
form.$('products').observe({
  key: 'fields',
  call: ({ change }) => {
    console.log('Products changed:', change.type); // "add", "delete", "update"
  },
});
```

---

## Key Takeaways

1. **Post-commit**: Observers fire after the value is written — use them for logging, side effects, and reactions.
2. **Read-only**: You cannot modify or reject the change from within an observer.
3. **Computed values**: Use `autorun()` when you need to derive a value from multiple fields.
4. **Dual cleanup**: `form.dispose()` handles form-registered observers; `autorunDisposer()` handles raw MobX reactions.
5. **Reactivity is automatic**: MobX tracks all accessed observables inside `autorun()` — no subscriptions needed.
