# Get, Set & Update

Value retrieval and modification methods available on **Form** and **Field** instances.

---

## get()

Return an object with field properties. Available on both Form and Field.

### Get all props

```javascript
form.get();
form.$('username').get();
```

### Get a specific prop

```javascript
form.get('value');
form.get('label');
form.get('disabled');
```

You can retrieve these editable props: `value`, `label`, `placeholder`, `initial`, `default`, `disabled`, `related`, `bindings`, `type`, `options`, `extra`, `autoFocus`, `inputMode`.

And these computed props: `hasError`, `isValid`, `isDirty`, `isPristine`, `isDefault`, `isEmpty`, `focused`, `touched`, `changed`, `error`, as well as validation props (`rules`, `validators`).

### Get nested fields as objects

Pass props as an array to get nested fields structured as nested objects instead of flat collections:

```javascript
form.get(['label']);
// { address: { city: 'City Name' } }

form.get(['value', 'label']);
// { username: { value: 'Steve', label: 'Username' } }
```

---

## set()

Modify field properties. Available on both Form and Field.

### Set a field value

```javascript
form.$('username').set('newValue');
```

### Set a property on multiple fields

Pass a prop name and an object of key-value pairs:

```javascript
form.set('value', {
  username: 'NewUsername',
  password: 'NewPassword',
});
```

### Set a nested field property

The object can mirror the field structure:

```javascript
form.set('label', {
  address: {
    city: 'Cool City',
  },
});
```

### Supported props

You can set: `value`, `label`, `placeholder`, `initial`, `default`, `type`, `disabled`, `related`, `bindings`, `hooks`, `handlers`, `observers`, `interceptors`, `options`, `extra`, `autoFocus`, `inputMode`, `rules`, `validators`.

> The `set()` method is intended for modifying properties of **existing** fields. To create or remove fields, use `add()` / `del()` or `update()`.

---

## update()

Recreate the fields tree and provide new values. Accepts an **object** and updates all field values.

> Unlike `set()`, `update()` can create new fields automatically. Use it when the field structure may need to expand (e.g. re-fetching data from a server). For simple property changes on existing fields, prefer `set()`.

```javascript
form.update({
  address: {
    city: 'Los Angeles',
  },
});

// Same on a nested field:
form.$('address').update({
  city: 'Los Angeles',
});
```

Array notation is supported as well:

```javascript
form.update({
  members: [
    { firstname: 'Alice', lastname: 'Wonder' },
    { firstname: 'Bob', lastname: 'Marley' },
  ],
});
```

The provided values win over the declared ones: an item created by `update()` takes the value provided by the update, not the value declared at the same position.

```javascript
const form = new Form({ fields: ['tags'], values: { tags: [1, 2] } });

form.update({ tags: [9, 8, 7] });
form.$('tags').value; // [9, 8, 7]
```

An array provided for a field which is **not** an array container (a field without nested fields) is the field value itself, so it can be emptied:

```javascript
form.update({ tags: [] });
form.$('tags').value; // []
```

> `update()` only accepts plain objects and will throw an error otherwise.
