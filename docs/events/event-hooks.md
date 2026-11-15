# Event Hooks

Event Hooks are called after Event Handlers or Actions. They let you react to state changes without overriding the handler behavior.

> **Lifecycle:** `User Input` → `Event Handler` / `Action` → `Mutate Store` → **Event Hook**

> All hooks receive the current instance (Form or Field) as the first argument. When triggered by an event handler (e.g. `onChange`, `onKeyDown`, `onBlur`), the hook also receives the native DOM event as the second argument: `onChange(field, e)`.

---

* [Available Event Hooks](#available-event-hooks)
  * [Triggered by Event Handlers](#triggered-by-event-handlers)
  * [Triggered by Event Handlers (which trigger Actions)](#triggered-by-event-handlers-which-trigger-actions)
  * [onInit](#oninit)
* [Validation Hooks](#validation-hooks)
  * [On Form Initialization](#on-form-initialization)
  * [Sub-Form Submission](#sub-form-submission-field-level)
  * [Extending the Class](#extending-the-class-1)
  * [Override on Manual Submit](#override-on-manual-submit)
* [Defining Hooks](#defining-hooks)
  * [On Form Initialization](#on-form-initialization-1)
  * [Extending the Class](#extending-the-class-2)

---

## Available Event Hooks

### Triggered by Event Handlers

| Event Handler | Affected Property | Executed Hook | Form | Field |
|--------------|-------------------|---------------|------|-------|
| onChange(e) | value | onChange | ✓ | ✓ |
| onToggle(e) | value | onToggle | — | ✓ |
| onFocus(e) | focused | onFocus | — | ✓ |
| onBlur(e) | touched, blurred | onBlur | — | ✓ |
| onDrop(e) | files | onDrop | — | ✓ |
| onKeyDown(e) | — | onKeyDown | — | ✓ |
| onKeyUp(e) | — | onKeyUp | — | ✓ |

### Triggered by Event Handlers (which trigger Actions)

| Event Handler | Action | Affected Property | Executed Hook | Form | Field |
|--------------|--------|-------------------|---------------|------|-------|
| onSubmit(e) | submit() → validate() | submitting, validating | onSubmit | ✓ | ✓ |
| onClear(e) | resetValidation() / clear() | value | onClear | ✓ | ✓ |
| onReset(e) | resetValidation() / reset() | value | onReset | ✓ | ✓ |
| onAdd(e) | add() | fields | onAdd | ✓ | ✓ |
| onDel(e) | del() | fields | onDel | ✓ | ✓ |

### onInit

Executed just after the instance (Form or Field) is created.

| Action | Affected Property | Executed Hook | Form | Field |
|--------|-------------------|---------------|------|-------|
| constructor() | ALL | onInit | ✓ | ✓ |

```javascript
new Form({ ... }, {
  hooks: {
    onInit(form) {
      console.log('-> onInit HOOK');
    },
  },
});
```

---

## Validation Hooks

Validation Hooks are special Event Hooks called after `submit()` validates the form. They can return Promises.

| Action | Executed Hook | Form | Field |
|--------|---------------|------|-------|
| submit() → validate() | onSuccess | ✓ | ✓ |
| submit() → validate() | onError | ✓ | ✓ |

> The Validation Hooks can return a Promise to wait for async operations before considering the submission complete.

### On Form Initialization

Define `onSuccess(form)` and `onError(form)` hooks and pass them to the **Second Argument** of the Form Constructor:

```javascript
const hooks = {
  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    console.log('Form Values!', form.values());
    // can return a promise here!
  },
  onError(form) {
    console.log('All form errors', form.errors());
    form.invalidate('This is a generic error message!');
    // can return a promise here!
  },
};

new Form({ ... }, { hooks }); // second argument
```

### Sub-Form Submission (Field-level)

Nested fields can have their own Validation Hooks for sub-form patterns.

Define hooks on the fields you need, passing a `hooks` object keyed by field path:

```javascript
const submit = {
  onSuccess(fieldset) {
    alert(`${fieldset.path} is valid!`);
    console.log(`${fieldset.path} Values!`, fieldset.values());
  },
  onError(fieldset) {
    console.log(`All ${fieldset.path} errors`, fieldset.errors());
    fieldset.invalidate('This is a generic error message!');
  },
};

const hooks = {
  'members[]': submit,
};

new Form({
  fields: ['members[].firstname', 'members[].lastname'],
  hooks,
});
```

### Extending the Class

Extend the **Form** or **Field** class with a `hooks()` method which returns `onSuccess()` and `onError()`:

```javascript
import { Form } from 'mobx-formkit';

class MyForm extends Form {
  hooks() {
    return {
      onSuccess() {
        alert('Form is valid! Send the request here.');
        console.log('Form Values!', this.values());
        // can return a promise here!
      },
      onError() {
        console.log('All form errors', this.errors());
        this.invalidate('This is a generic error message!');
        // can return a promise here!
      },
    };
  }
}
```

**On a custom Field class:**

```javascript
import { Form, Field } from 'mobx-formkit';

class MyField extends Field {
  hooks() {
    return {
      onChange(field) {
        console.log('-> onChange HOOK - changed:', field.path);
      },
    };
  }
}
```

> When extending, `this` refers to the current instance.

Available hooks on Form: `onSubmit`, `onSuccess`, `onError`, `onClear`, `onReset`, `onAdd`, `onDel`.

Available hooks on Field: all of the above plus `onChange`, `onToggle`, `onFocus`, `onBlur`, `onDrop`, `onKeyUp`, `onKeyDown`.

### Override on Manual Submit

Override Validation Hooks at submit time or via the `onSubmit` Event Handler:

```javascript
const hooks = {
  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    console.log('Form Values!', form.values());
  },
  onError(form) {
    console.log('All form errors', form.errors());
    form.invalidate('This is a generic error message!');
  },
};

// On submit action
form.submit({ onSuccess: hooks.onSuccess, onError: hooks.onError });

// On submit event handler
<button onClick={e => form.onSubmit(e, {
  onSuccess: hooks.onSuccess,
  onError: hooks.onError,
})}>Submit</button>
```

---

> **Next:** [Custom Event Hooks](event-hooks/constructor.md) — define hooks on initialization or by extending the class.

---

<details markdown="1">
<summary><strong>Legacy API — Version &lt; 1.29</strong></summary>

In older versions, Event Hooks could be used to catch events on specific fields using the `on()` method:

```javascript
form.$('password').on('validate', ({ form, field, path, event, change }) => { ... });
form.$('password').on('update', ({ form, field, path, event, change }) => { ... });
form.$('password').on('clear', ({ form, field, path, event, change }) => { ... });
form.$('password').on('reset', ({ form, field, path, event, change }) => { ... });
```

Available events: `validate`, `update`, `clear`, `reset`.

The callback receives: `{ form, field, path, event, change }`.

> For more info on the mobx `change` object, see the [mobx observe documentation](https://mobxjs.github.io/mobx/refguide/observe/).

</details>

<details markdown="1">
<summary><strong>Legacy API — Version &lt; 1.32</strong></summary>

In older versions, `onClear`, `onReset` & `onSubmit` were handled differently:

- If defined in the **Form or Field Class**, they were treated as **Event Handlers**.
- If defined in the **Field Definition**, they were treated as **Event Hooks**.
- `onSuccess` & `onError` defined in the **Form or Field Class** were always **Event Hooks**.

Also, Validation Hooks were passed as `onSubmit` instead of `hooks`:

```javascript
const onSubmit = {
  onSuccess(form) {
    console.log('Form Values!', form.values());
  },
  onError(form) {
    console.log('All form errors', form.errors());
  },
};

new Form({ ... }, { onSubmit }); // <--- was `onSubmit`, now `hooks`
```

</details>

