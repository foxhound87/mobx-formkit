# Observe or Intercept Fields Props

* [Using `observe()` / `intercept()` Methods](#using-observe--intercept-methods)
* [Using `observers` / `interceptors` Props](#using-observers--interceptors-props)
* [Disposers](#disposers)

---

## Using `observe()` / `intercept()` Methods

If you need to observe or intercept **on the fly** the **Field Props** or the **Fields Map** you can use the `observe()` / `intercept()` methods on the form instance:

```javascript
// observe value of password

form.observe({
  path: 'password'
  key: 'value', // can be any field property
  call: ({ form, field, change }) => { ... },
});
```

```javascript
// intercept value of password

form.intercept({
  path: 'username'
  key: 'value', // only some field property allowed
  call: ({ form, field, change }) => { ... },
});
```

The `call` function will receive the `Form` instance, the `Field` instance and the **mobx event object** (`change`).

> Specify the Field `path`, the prop `key` to observe and the function (`call`) to fire when the event occurs.

> Specify `fields` as `key` and the nested fields map will be observed or intercepted (add/del).

> The **intercept** function must return a new mobx `change` event object.

> For more info on the mobx `change` event object take a look at the mobx [Event Overview Table](https://mobxjs.github.io/mobx/refguide/observe/).


Eventually you can use `observe()` / `intercept()` also on a selected Field:

You can pass a **function** or an **object** with `key` and `call` props.

```javascript
// observe value of password

form.$('password')
  .observe(({ form, field, change }) => { ... });
```

```javascript
// intercept value of password

form.$('password')
  .intercept(({ form, field, change }) => { ... });
```

> Passing only a function the default `key` will be `value`.

> The `path` is omitted. It's defined by the selector.

> Specify `fields` as `key` and the nested fields map will be observed (add/del).

> The **intercept** function must return a new mobx `change` event object.

## Using `observers` / `interceptors` Props

Here we are defining observers or interceptors to be passed in the [First Argument of the Form Constructor](../form/form-initialization.md#first-constructor-argument).

This method is useful if you need to handle nested fields. The observers/interceptors will be **automatically loaded** when add/del fields dynamically, thanks to the `initMOBXEvent` method called during field construction.

Define an `observers` / `interceptors` **object** like this:

```javascript
const observers = {
  'club': [{
    key: 'focused', // can be any field property
    call: ({ form, field, change }) => { ... },
  }],
  'members[].hobbies[]': [{
    key: 'touched', // can be any field property
    call: ({ form, field, change }) => { ... },
  }],
};

new Form({ observers, interceptors, ... });
```

> This is an example using **Separated Field Properties Definition** mode but **Unified** mode is also supported.

### Per-field observers/interceptors

You can also define observers/interceptors directly in the **field definition** (unified mode):

```javascript
const fields = {
  username: {
    value: 'John',
    observers: [{
      key: 'value',
      call: ({ change }) => console.log('Username changed:', change.newValue),
    }],
    interceptors: [{
      key: 'value',
      call: ({ change }) => {
        // Reject empty values
        if (change.newValue === '') return null;
        return change;
      },
    }],
  },
};
```

Or in separated mode:

```javascript
const observers = {
  username: [{
    key: 'value',
    call: ({ form, field, change }) => {
      console.log(`${field.path} changed to:`, change.newValue);
    },
  }],
};
```

### Auto-loading for dynamic arrays

When you add new fields dynamically with `add()`, any observers/interceptors defined with `[]` array notation (e.g., `'members[].hobbies[]'`) are automatically applied to newly created fields. This happens because the `initMOBXEvent` method is called during field construction:

```javascript
// Defined in form setup:
const observers = {
  'products[].total': [{
    key: 'value',
    call: ({ change }) => console.log('Product total:', change.newValue),
  }],
};

// Later, adding a new product:
form.$('products').add({ name: 'New', total: 0 });
// → The observer is automatically applied to the new field
```

> This auto-loading behavior is one of the main advantages of using the `observers`/`interceptors` props over manually calling `observe()`/`intercept()` in component code — you never have to re-attach listeners after dynamic operations.

## Disposers

#### Dispose All Events

Each observer/interceptor will automatically create their own `disposer` which will stop the related observable events.

Dispose all observers & interceptors recursively (for nested fields too):

```javascript
form.dispose()
```

> to be used only on the form instance.

#### Dispose Single Event

You can use `dispose({ type, key, path })` on the **Form** instance:

The `type` prop can be **observer** or **interceptor**

```javascript
form.dispose({
  type: 'observer',
  path: 'password',
  key: 'value',
});
```

or omitting the `path` when selecting the Field:

```javascript
form.$('password').dispose({
  type: 'interceptor',
  key: 'value',
});
```

> Nested fields paths can be used as well.
