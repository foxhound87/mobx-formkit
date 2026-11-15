# Bindings Demo

Custom **field bindings** transform how fields interact with input components. Each field can use a different binding to customize its behavior — auto-uppercasing, numeric-only filtering, debug logging, or standard prop mapping.

> 🔗 **Live Demo:** [Bindings Demo](https://foxhound87.github.io/mobx-formkit-demo/form/bindingsDemo)  
> 📁 **Source:** [FormBindingsDemo.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormBindingsDemo.tsx)  
> 📁 **Setup:** [bindingsDemo.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/bindingsDemo.ts)  
> 📁 **Bindings:** [_.bindings.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/_.bindings.ts)

---

## Concept

A binding is a function that receives `{ $try, field, props }` and returns the props to spread onto an input element. The `$try` utility picks the first defined value from `props[key] ?? field[key]`, allowing callers to override field defaults.

Each field is mapped to a binding via the `bindings` config object or `field.set('bindings', 'BindingName')`.

---

## The `$try` utility

`$try` is passed to every binding function. It resolves values by priority:

```
$try(props.value, field.value, 'fallback')  → props.value if defined
                                              → field.value if defined
                                              → 'fallback'
```

This allows `field.bind(props)` to override field properties at call-time:

```jsx
<input {...field.bind({ placeholder: 'Overridden' })} />
```

---

## Form Setup

Four fields, each using a different binding:

```javascript
const fields = {
  username: {
    value: 'JohnDoe', label: 'Username',
    placeholder: 'Standard text input',
    rules: 'required|string|min:3',
  },
  productCode: {
    value: 'ABC-123', label: 'Product Code',
    placeholder: 'Auto-uppercased on type',
    rules: 'required|string',
  },
  price: {
    value: '1299.99', label: 'Price (€)',
    placeholder: 'Only numbers allowed',
    rules: 'required',
  },
  notes: {
    value: 'Check the console →', label: 'Notes (Debug)',
    placeholder: 'Watch the dev console...',
    rules: 'string',
  },
};

const bindings = {
  username: 'DefaultInput',
  productCode: 'UppercaseInput',
  price: 'CurrencyInput',
  notes: 'DebugInput',
};
```

---

## The Four Custom Bindings

### DefaultInput

Standard prop mapping — passes `name`, `value`, `onChange`, and `placeholder` directly:

```javascript
DefaultInput: ({ $try, field, props }) => ({
  type: $try(props.type, field.type, 'text'),
  id: $try(props.id, field.id),
  name: $try(props.name, field.name),
  value: $try(props.value, field.value),
  placeholder: $try(props.placeholder, field.placeholder),
  onChange: $try(props.onChange, field.onChange),
  onBlur: $try(props.onBlur, field.onBlur),
  onFocus: $try(props.onFocus, field.onFocus),
  disabled: props.disabled || field.disabled || field.state.form.disabled,
}),
```

### UppercaseInput

Custom `onChange` transforms the input value to uppercase before propagating it to the field:

```javascript
UppercaseInput: ({ $try, field, props }) => ({
  type: 'text',
  name: field.name,
  value: field.value,
  placeholder: field.placeholder,
  onChange: (e) => {
    e.target.value = e.target.value.toUpperCase();
    field.onChange(e);  // pass the uppercased value to MobX
  },
  // ... onBlur, onFocus, disabled
}),
```

Type `ABC` → store receives `ABC`. The transformation happens in the event handler, so the UI and the store stay in sync.

### CurrencyInput

Custom `onChange` strips non-numeric characters and preserves cursor position:

```javascript
CurrencyInput: ({ $try, field, props }) => ({
  type: 'text',
  value: String(field.value),
  onChange: (e) => {
    const el = e.target;
    const cursor = el.selectionStart;
    const cleaned = el.value.replace(/[^0-9.,]/g, '');
    el.value = cleaned;
    field.onChange(e);
    requestAnimationFrame(() => {
      const newPos = Math.min(cursor, cleaned.length);
      el.setSelectionRange(newPos, newPos);
    });
  },
  // ...
}),
```

The `requestAnimationFrame` ensures the cursor stays in the right position after React re-renders with the cleaned value.

### DebugInput

Overrides `onChange`, `onBlur`, `onFocus`, and `onKeyDown` to log every event to the browser console:

```javascript
DebugInput: ({ $try, field, props }) => ({
  onChange: (e) => {
    console.log(`[DebugInput] onChange — ${field.path}:`, e.target.value);
    field.onChange(e);
  },
  onBlur: (e) => {
    console.log(`[DebugInput] onBlur — ${field.path}:`, e.target.value);
    field.onBlur?.(e);
  },
  onFocus: (e) => {
    console.log(`[DebugInput] onFocus — ${field.path}:`, e.target.value);
    field.onFocus?.(e);
  },
  onKeyDown: (e) => {
    console.log(`[DebugInput] onKeyDown — ${field.path}:`, e.key);
    field.onKeyDown?.(e);
  },
  // ...
}),
```

Open the browser DevTools console to see every interaction logged in real time.

---

## Rendering with `field.bind()`

In the component, each field is rendered using the `<Input>` component which internally calls `field.bind()`:

```jsx
<Input field={form.$('username')} />
<Input field={form.$('productCode')} />
<Input field={form.$('price')} />
<Input field={form.$('notes')} />
```

The `<Input>` component simply does:

```jsx
const SimpleInput = observer(({ field, ...props }) => (
  <input {...field.bind(props)} className="form-input" />
));
```

`field.bind(props)` looks up the field's binding by name (e.g. `'UppercaseInput'`), calls the binding function with `{ $try, field, props }`, and returns the resulting props object.

---

## Key Takeaways

1. **Binding function**: A pure function that returns props to spread onto an input.
2. **`$try` priority**: `props` > `field.*` > fallback default.
3. **Custom onChange**: Transform values in the event handler before calling `field.onChange(e)`.
4. **Cursor preservation**: Use `requestAnimationFrame` after setting cleaned values.
5. **Per-field mapping**: Bindings are assigned declaratively in the form config, not wired manually in JSX.
6. **Extensible**: Add any number of custom bindings — Material UI, Ant Design, React Aria, etc.
