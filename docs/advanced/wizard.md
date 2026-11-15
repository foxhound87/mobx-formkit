# Wizard (multi-step)

A **multi-step registration wizard** with per-step validation, step indicators, a final review screen, and full form submission — all built with nested field groups and React state for navigation.

> 🔗 **Live Demo:** [Wizard](https://foxhound87.github.io/mobx-formkit-demo/form/wizard)  
> 📁 **Source:** [FormWizard.tsx](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/components/forms/FormWizard.tsx)  
> 📁 **Setup:** [wizard.ts](https://github.com/foxhound87/mobx-formkit-demo/blob/master/src/forms/setup/wizard.ts)

---

## Concept

The form uses three nested groups — `step1`, `step2`, `step3` — each containing its own fields and DVR validation rules. React state tracks the current step, completed steps, and validation errors. Step navigation gates progression on validation, and the review step shows all accumulated data before final submission.

---

## Form Setup

The form is defined in separated mode with dot-notation nested groups:

```javascript
const fields = [
  'step1.firstName',
  'step1.lastName',
  'step1.email',
  'step1.phone',
  'step2.street',
  'step2.city',
  'step2.zipCode',
  'step2.country',
  'step3.username',
  'step3.password',
  'step3.confirmPassword',
];
```

Each field has DVR validation rules. All steps have required fields; email and rules enforce format:

```javascript
const rules = {
  'step1.firstName': 'required|string|min:2',
  'step1.email': 'required|email',
  'step3.password': 'required|string|min:6',
  'step3.confirmPassword': 'required|string|min:6',
  // ...
};
```

Initial values populate the form so the review step shows example data:

```javascript
const values = {
  step1: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1 555-1234' },
  step2: { street: '456 Oak Avenue', city: 'San Francisco', zipCode: '94102', country: 'USA' },
  step3: {},
};
```

---

## Component Walkthrough

### Step definition

The four steps (3 form steps + 1 review) are defined as a constant array:

```jsx
const steps = [
  { key: 'step1', label: 'Personal Info', icon: User },
  { key: 'step2', label: 'Address', icon: MapPin },
  { key: 'step3', label: 'Account', icon: Settings },
  { key: 'review', label: 'Review', icon: ClipboardCheck },
];

const stepFields = {
  step1: ['firstName', 'lastName', 'email', 'phone'],
  step2: ['street', 'city', 'zipCode', 'country'],
  step3: ['username', 'password', 'confirmPassword'],
};
```

### State management

Three pieces of React state drive the wizard:

```jsx
const [currentStep, setCurrentStep] = useState(0);
const [completedSteps, setCompletedSteps] = useState(new Set());
const [errors, setErrors] = useState({});
```

- `currentStep` — which step is visible
- `completedSteps` — which steps have been passed (allows revisiting)
- `errors` — per-step validation errors keyed by step index

### Step validation

Before advancing, the current step group is validated. The group's `isValid` property determines if progression is allowed:

```jsx
const validateStep = useCallback(async (stepIndex) => {
  const group = stepGroups[stepIndex];
  if (!group) return true;
  await group.validate({ showErrors: true });
  const valid = group.isValid;
  if (!valid) {
    setErrors((prev) => ({ ...prev, [stepIndex]: group.errors() }));
  } else {
    setErrors((prev) => { const next = { ...prev }; delete next[stepIndex]; return next; });
  }
  return valid;
}, [stepGroups]);
```

### Navigation

"Next" validates the current step before advancing. "Back" simply decrements the step index:

```jsx
const handleNext = useCallback(async () => {
  const valid = await validateStep(currentStep);
  if (!valid) return;
  setCompletedSteps((prev) => new Set([...prev, currentStep]));
  setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
}, [currentStep, validateStep]);

const handleBack = useCallback(() => {
  setCurrentStep((prev) => Math.max(prev - 1, 0));
}, []);
```

### Step indicator

The step indicator shows numbered circles for mobile and labeled buttons for desktop. Completed steps are shown with a green checkmark and can be clicked to revisit:

```jsx
<button onClick={() => isCompleted && onGoTo(i)} disabled={!isCompleted}>
  <span>{isCompleted ? <Check size={12} /> : i + 1}</span>
  <span>{s.label}</span>
</button>
```

### Field rendering per step

Only the current step's fields are rendered. A `StepContent` component accesses fields from the current group via `group.$('fieldName')`:

```jsx
const currentFields = {};
const fieldNames = stepFields[steps[currentStep].key] || [];
fieldNames.forEach((name) => {
  currentFields[name] = currentGroup.$(name);
});
```

### Password visibility toggle

The password fields have a show/hide toggle that switches between `text` and `password` input types:

```jsx
const [showPassword, setShowPassword] = useState(false);
// ...
<Input field={field} type={showPassword ? 'text' : 'password'} />
<button onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
</button>
```

### Review screen

The review step reads each group's values and displays them in cards. Passwords are masked:

```jsx
<ReviewCard title="Personal Info" icon={User}
  fields={[
    ['First Name', step1.$('firstName')?.value],
    ['Email', step1.$('email')?.value],
    ...
  ]}
/>
```

### Final submission

When "Submit Registration" is clicked on the review step, all steps are validated again. If everything passes, `form.submit()` is called:

```jsx
const handleSubmit = useCallback(async () => {
  let allValid = true;
  for (let i = 0; i < stepGroups.length; i++) {
    const valid = await validateStep(i);
    if (valid) setCompletedSteps((prev) => new Set([...prev, i]));
    if (!valid) allValid = false;
  }
  if (allValid) {
    await form.submit();
    setSubmitted(true);
  }
}, [validateStep, stepGroups, form]);
```

### Submitted state

After successful submission, a success screen is shown with a "Start Over" button that resets all state and the form:

```jsx
if (submitted) {
  return (
    <div>
      <Check size={32} />
      <h2>Registration Complete!</h2>
      <button onClick={resetAll}>Start Over</button>
    </div>
  );
}
```

---

## Key Takeaways

1. **Nested groups**: Each step is a dot-notation group (`step1.*`, `step2.*`, etc.) in the same form instance.
2. **Per-step validation**: Validate only the current group with `group.validate()`.
3. **Gate navigation**: Use `group.isValid` to decide whether to allow advancing.
4. **Track completed steps**: Use a `Set` of step indices to render the step indicator with completed/active states.
5. **Access previous data**: Each step's values persist in the form — the review step reads them directly.
6. **Final validation**: Validate all steps at submission time to catch any changes made after revisiting.
