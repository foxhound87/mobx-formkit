# Cross Validation

Validate **related fields** across different sections of a form by combining nested field groups. Each section validates independently with its own rules, then the results are aggregated together.

> 🔗 **Live Demo:** [Cross Validation](https://foxhound87.github.io/mobx-formkit-demo/form/crossValidation)  
> 📁 **Source:** [FormCrossValidation.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormCrossValidation.tsx)  
> 📁 **Setup:** [crossValidation.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/crossValidation.ts)

---

## Concept

A single form can contain multiple nested field groups — each group is an independent subtree with its own fields, validation rules, and validation state. This lets you validate sections separately while keeping them in the same form instance.

---

## Form Setup

Two groups are defined using dot-notation paths: `billing` (registration) and `shipping` (profile). Each group has its own fields with DVR validation rules:

### Registration group (`billing.*`)

```javascript
username: { value: 'johndoe', rules: 'required|string|min:3|max:20' },
email:    { value: 'john@example.com', rules: 'required|email' },
password: { value: 'secret123', rules: 'required|string|min:6', type: 'password' },
```

### Profile group (`shipping.*`)

```javascript
fullName:    { value: 'John Doe', rules: 'required|string|min:3' },
emailConfirm: { value: 'john@example.com', rules: 'required|email' },
bio:          { value: '...', rules: 'string|max:200', type: 'textarea' },
```

Both groups are defined on the same form instance. There is no `composer()` — the demo uses `form.$('billing')` and `form.$('shipping')` to access each group directly.

---

## Component Walkthrough

### Accessing groups

Each nested group is accessed via `form.$('groupName')`:

```jsx
const getBilling = () => form.$('billing');
const getShipping = () => form.$('shipping');
```

### Validating both groups

`Promise.all()` validates both groups in parallel. Each returns a promise that resolves to the validation result for that group:

```jsx
const handleValidateAll = async () => {
  const [billingRes, shippingRes] = await Promise.all([
    billing.validate({ showErrors: true }),
    shipping.validate({ showErrors: true }),
  ]);
  setResult({
    valid: billing.isValid && shipping.isValid,
    errors: { billing: billing.errors(), shipping: shipping.errors() },
    values: { billing: billing.values(), shipping: shipping.values() },
  });
};
```

### Submitting both groups

Similarly, `submit()` can be called on each group with validation options:

```jsx
const handleSubmitAll = async () => {
  await Promise.all([
    billing.submit({}, { execOnSubmitHook: false, execValidationHooks: false, validate: true }),
    shipping.submit({}, { execOnSubmitHook: false, execValidationHooks: false, validate: true }),
  ]);
  // check combined result
};
```

### Combined result display

The demo renders a result panel showing the overall validity (`true`/`false`), any errors per group, and the serialized values of both groups:

```json
{
  "valid": true,
  "errors": { "billing": {}, "shipping": {} },
  "values": {
    "billing": { "username": "johndoe", "email": "john@example.com", "password": "secret123" },
    "shipping": { "fullName": "John Doe", "emailConfirm": "john@example.com", "bio": "..." }
  }
}
```

### Rendering group fields

Fields are accessed by their full dot-notation path:

```jsx
<Input field={form.$('billing.username')} />
<Input field={form.$('billing.email')} />
<Input field={form.$('billing.password')} />

<Input field={form.$('shipping.fullName')} />
<Input field={form.$('shipping.emailConfirm')} />
<Input field={form.$('shipping.bio')} />
```

---

## Key Takeaways

1. **Same form, separate groups**: Both billing and shipping live in the same form instance, accessed via `$('groupName')`.
2. **Independent validation**: Each group validates separately — errors in shipping do not block billing validation.
3. **Parallel validation**: Use `Promise.all()` to validate multiple groups simultaneously.
4. **Combined results**: Aggregate validity, errors, and values from each group for the final result.
5. **No composer needed**: Cross-group validation works with plain nested fields — the `composer()` utility is only needed when orchestrating completely independent Form instances.
