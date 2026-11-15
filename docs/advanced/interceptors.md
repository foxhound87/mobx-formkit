# Interceptors

Intercept field value changes **before they propagate** using MobX `intercept()`. Reject or modify incoming values at the field level, or log every mutation as it happens.

> 🔗 **Live Demo:** [Interceptors](https://foxhound87.github.io/mobx-formkit-demo/form/interceptors)  
> 📁 **Source:** [FormInterceptors.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormInterceptors.tsx)  
> 📁 **Setup:** [interceptors.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/interceptors.ts)

---

## Concept

`intercept()` is a MobX primitive that fires **before** a value change is committed. The callback receives the MobX change object and must return it (possibly modified) to allow the change, or `null` to reject it entirely. Unlike `observe()` (which fires after the change), interceptors are **pre-commit hooks** — they can prevent or transform data before it reaches the store.

---

## Form Setup

The demo form defines three fields — `fullName`, `email`, and `role` — each with DVR validation rules:

```javascript
const fields = {
  fullName: {
    value: 'John Doe',
    label: 'Full Name',
    placeholder: 'Enter your name',
    rules: 'required|string|min:3',
  },
  email: {
    value: 'john@example.com',
    label: 'Email',
    placeholder: 'Enter your email',
    rules: 'required|email',
  },
  role: {
    value: 'user',
    label: 'Role',
    placeholder: 'Select role',
    rules: 'required|string',
  },
};
```

---

## Component Walkthrough

### Registering interceptors on mount

On component mount, the demo iterates every field in the form and registers an interceptor on each:

```jsx
useEffect(() => {
  form.each((field) => {
    field.intercept(({ change }) => {
      const entry = {
        field: field.path,
        from: change.oldValue,
        to: change.newValue,
        time: new Date().toLocaleTimeString(),
      };
      setLogs((prev) => [entry, ...prev].slice(0, 20));
      return change;   // must return the change object to allow the mutation
    });
  });
  return () => form.dispose();   // cleanup all interceptors on unmount
}, [form]);
```

### The interceptor callback

The callback receives a `{ form, field, change }` object. The `change` object from MobX contains:

| Property | Value |
|----------|-------|
| `change.object` | The observable being changed |
| `change.newValue` | The incoming value |
| `change.oldValue` | The current (pre-change) value |
| `change.type` | `"update"` |

The demo extracts `oldValue` and `newValue` to build a log entry with timestamp, then pushes it to React state. The `slice(0, 20)` keeps only the 20 most recent entries.

### Inspecting the log

The log is rendered as a scrollable panel below the form fields, showing the field name, old value (strikethrough), and new value (green) for each intercepted change:

```jsx
{logs.map((log, i) => (
  <div key={i} className="text-[11px] font-mono text-surface-600">
    <span>{log.time}</span>
    <span>{log.field}</span>
    : <span class="line-through">{String(log.from)}</span>
    → <span class="text-green-600">{String(log.to)}</span>
  </div>
))}
```

---

## API Reference

### `field.intercept(callback)`

Registers an interceptor on a single field.

```javascript
form.$('email').intercept(({ form, field, change }) => {
  if (typeof change.newValue === 'string' && !change.newValue.includes('@')) {
    return null; // reject the change — email must contain @
  }
  return change; // allow the change
});
```

### `form.intercept({ path, key, call })`

Registers an interceptor by field path, useful for nested fields:

```javascript
form.intercept({
  path: 'addresses[0].zipCode',
  key: 'value',
  call: ({ change }) => {
    change.newValue = String(change.newValue).replace(/\D/g, '');
    return change;
  },
});
```

### Return value

| Return | Behavior |
|--------|----------|
| `change` (modified or not) | Allow the mutation |
| `null` | Reject the change entirely |

### Cleanup with `form.dispose()`

Each interceptor creates a MobX disposer. Call `form.dispose()` to remove all observers and interceptors recursively — critical for preventing memory leaks in dynamic components.

```javascript
useEffect(() => {
  // ... register interceptors ...
  return () => form.dispose(); // cleanup on unmount
}, [form]);
```

---

## Key Takeaways

1. **Pre-commit**: Interceptors fire before the value is written — use them for validation, transformation, or logging.
2. **Return the change**: Always return the MobX change object (possibly modified) or `null` to reject.
3. **Single field**: `field.intercept(callback)` is the simplest API.
4. **By path**: `form.intercept({ path, key, call })` targets nested fields.
5. **Dispose**: Always clean up with `form.dispose()` on component unmount.
