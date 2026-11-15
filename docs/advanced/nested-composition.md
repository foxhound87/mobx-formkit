# Nested Composition

Compose **completely independent Form instances** within a single view, each with its own fields, validation rules, lifecycle, and state — orchestrated together by a parent component.

> 🔗 **Live Demo:** [Nested Composition](https://foxhound87.github.io/mobx-formkit-demo/form/nestedComposition)  
> 📁 **Source:** [FormNestedComposition.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormNestedComposition.tsx)  
> 📁 **Setup:** [nestedComposition.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/nestedComposition.ts)

---

## Concept

Unlike the [Cross Validation demo](cross-validation.md) where both groups belong to the same form instance, this demo shows two **fully autonomous** Form instances (`contactForm` and `addressForm`). Each has its own constructor, plugins, hooks, and lifecycle. The parent component orchestrates them — validating both, submitting both, and presenting combined results.

This pattern is useful when different sections of a page are owned by different teams, come from different API endpoints, or need to be submitted to different backends.

---

## Form Setup

Two independent form definitions, each with its own fields and validation rules:

### Contact form

```javascript
export const contactFields = {
  fullName: { value: 'Alice Johnson', rules: 'required|string|min:3' },
  email:    { value: 'alice@example.com', rules: 'required|email' },
  phone:    { value: '+1 555-0123', rules: 'required|string|min:7' },
};
```

### Address form

```javascript
export const addressFields = {
  street:  { value: '123 Main Street', rules: 'required|string|min:5' },
  city:    { value: 'New York', rules: 'required|string|min:2' },
  zipCode: { value: '10001', rules: 'required|string|min:4' },
  country: { value: 'USA', rules: 'required|string|min:2' },
};
```

### Form instances

Each form extends the same base Form class. They are instantiated as module-level singletons, not inside the component:

```javascript
class ContactForm extends Form {}
class AddressForm extends Form {}

const contactForm = new ContactForm(
  { fields: contactFields },
  { name: 'ContactInfo', plugins: {}, bindings: {}, options: {} }
);

const addressForm = new AddressForm(
  { fields: addressFields },
  { name: 'AddressInfo', plugins: {}, bindings: {}, options: {} }
);
```

---

## Component Walkthrough

### Per-form controls

Each form has its own Submit, Clear, and Reset buttons. These use the form instance's built-in event handlers:

```jsx
<button onClick={contactForm.onSubmit}>Submit</button>
<button onClick={contactForm.onClear}>Clear</button>
<button onClick={contactForm.onReset}>Reset</button>

<button onClick={addressForm.onSubmit}>Submit</button>
<button onClick={addressForm.onClear}>Clear</button>
<button onClick={addressForm.onReset}>Reset</button>
```

### Cross-form orchestration

The "Validate All" button validates both forms in parallel using `Promise.all()`:

```jsx
const handleValidateAll = async () => {
  await Promise.all([
    contactForm.validate({ showErrors: true }),
    addressForm.validate({ showErrors: true }),
  ]);
  setResult({
    valid: contactForm.isValid && addressForm.isValid,
    errors: { contact: contactForm.errors(), address: addressForm.errors() },
    values: { contact: contactForm.values(), address: addressForm.values() },
  });
};
```

The "Submit All" button does the same but calls `submit()` instead:

```jsx
const handleSubmitAll = async () => {
  await Promise.all([
    contactForm.submit({}, { execOnSubmitHook: false, execValidationHooks: false, validate: true }),
    addressForm.submit({}, { execOnSubmitHook: false, execValidationHooks: false, validate: true }),
  ]);
  // aggregate results...
};
```

### Rendering fields

Fields are accessed from each form independently:

```jsx
<Input field={contactForm.$('fullName')} />
<Input field={contactForm.$('email')} />
<Input field={contactForm.$('phone')} />

<Input field={addressForm.$('street')} />
<Input field={addressForm.$('city')} />
<Input field={addressForm.$('zipCode')} />
<Input field={addressForm.$('country')} />
```

---

## When to use this vs. Cross Validation

| Approach | Use case |
|----------|----------|
| **Cross Validation** (one form, nested groups) | Sections share the same submit endpoint, validation rules are homogeneous |
| **Nested Composition** (independent forms) | Sections are logically separate, may submit to different APIs, need independent lifecycle |

---

## Key Takeaways

1. **Fully independent**: Each Form instance manages its own fields, validation, and state.
2. **Module-level instances**: Forms can be instantiated once and shared across the component tree.
3. **Per-form controls**: Submit, clear, and reset work on each form individually.
4. **Parallel orchestration**: `Promise.all()` validates or submits both forms simultaneously.
5. **Aggregated results**: Combine validity, errors, and values from each instance as needed.
