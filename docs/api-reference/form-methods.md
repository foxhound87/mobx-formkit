# Form Methods

| Method | Input | Output | Info | Help |
|---|---|---|---|---|
| **clear()** | - | void | Clear the Form to empty values. | [help](../actions/clear-reset.md#clear) |
| **reset()** | - | void | Reset the Form to default values. | [help](../actions/clear-reset.md#reset) |
| **commit()** | - | void | Capture the current values as the restore reference. | [help](../actions/commit-restore.md#overview) |
| **restore()** | - | void or promise | Restore the values captured by the last `commit()`. | [help](../actions/commit-restore.md#overview) |
| **committed()** | - | object | The values captured by the last `commit()` (read only). | [help](../actions/commit-restore.md#overview) |
| **invalidate(msg)** | (string) | void | Mark the field as invalid. Pass an optional error message or a default error will be shown. | [help](../actions/validate.md#invalidate) |
| **resetValidation(deep)** | (boolean) | void | Reset the form validation status. Pass `true` for deep reset of nested fields. | [help](../actions/validate.md#resetvalidation) |
| **showErrors(bool)** | (boolean) | void | Show or Hide Field Error Messages. | [help](../actions/validate.md#showerrors) |

#### Shared Methods

| Method | Input | Output | Info | Help |
|---|---|---|---|---|
| **select(path)** | (string) | object | Field Selector. Can be chained. | [help](../actions/shared.md#field-selector) |
| **update(obj)** | (object) | void | Update Fields Values. Will create new fields auomatically. | [help](../actions/get-set.md#update) |
| **submit(obj)** | (object) | promise | Perform fields validation. After successful validation triggers onSuccess event and onError event in case of validation error. | [help](../actions/validate.md#submit) |
| **validate()** | - | promise | Check if the form is valid and return a promise. | [help](../actions/form.md#validate-the-form) |
| **validate(path)** | (string) | promise | Takes a field `path` in input. Check if the field and nested fields are valid and return a promise. | [help](../actions/form.md#validate-the-form) |
| **validate(opt)** | (object) | promise | Takes a an object in input with `related` or `showErrors` options. | [help](../actions/form.md#validation-errors) |
| **validate(path, opt)** | (string, object) | promise | Takes a field `path` as first arg. and object as second arg. with `related` or `showErrors` options. | [help](../actions/form.md#validation-errors) |
| **check(computed)** | (string) | boolean | Check field computed property. | [help](../actions/validate.md#check) |
| **check(computed, deep)** | (string, boolean) | boolean | Check all nested fields computed property if `deep` is `true` | [help](../actions/validate.md#check) |
| **get()** | - | object | Get all field and nested fields data with all props and computed values. | [help](../actions/get-set.md#get) |
| **get(prop)** | (any) | object | Get all field filtering by certain `props` (string or array). | [help](../actions/get-set.md#get) |
| **set(val)** | (any) | void | Set field value. Takes the value. | [help](../actions/get-set.md#set) |
| **set(obj)** | (object) | void | Provide an object to set nested fields values. | [help](../actions/get-set.md#set) |
| **set(prop, val)** | (string, any) | void | Set field property. Takes prop key and prop value. | [help](../actions/get-set.md#set) |
| **set(prop, obj)** | (string, object) | void | Provide a prop key and object to set nested fields properties. | [help](../actions/get-set.md#set) |
| **has(key)** | (string) | boolean | Provide Field key to check if exist. | [help](../actions/shared.md#has) |
| **map(callback)** | (function) | array | Map Nested Fields | [help](../actions/shared.md#map) |
| **reduce(callback, acc)** | (function, any) | any | Reduce Nested Fields | [help](../actions/shared.md#reduce) |
| **each(callback)** | (function) | void | Iterates over fields and nested fields recursively and invokes a callback which get each field in input. | [help](../actions/shared.md#each) |
| **add(obj)** | (any) | any | Add a Field or Nested Fields. | [help](../actions/add-del.md#add) |
| **del(key)** | (any) | void | Delete a Field or Nested Fields by `key` or `path`. | [help](../actions/add-del.md#del) |
| **move(fromIndex, toIndex)** | (number, number) | void | Move an array field item from one index to another. Preserves bindings and validation. | [help](../actions/add-del.md#move) |
| **observe(obj)** | (object) | function | Define a MobX Observer on Field Props or Field Map. Returns a disposer function. | [help](../extra/mobx-events.md) |
| **intercept(obj)** | (object) | function | Define a MobX Interceptor on Field Props or Field Map. Returns a disposer function. | [help](../extra/mobx-events.md) |

> `$('path')` is an alias of `select(path)`.
> `hasNestedFields` and `hasIncrementalKeys` are computed properties (getters), not methods — see [Form Properties](form-properties.md).

#### Helpers

| Property | Input | Output | Info | Help |
|---|---|---|---|---|
| **values()** | - | object | Get Field & Nested Fields Values. | [help](../actions/helpers.md#get-all-fields-values) |
| **errors()** | - | object | Get Field & Nested Fields Errors. | [help](../actions/helpers.md#get-all-fields-errors) |
| **labels()** | - | object | Get Field & Nested Fields Labels. | [help](../actions/helpers.md#get-all-fields-labels) |
| **placeholders()** | - | object | Get Field & Nested Fields Placeholders. | [help](../actions/helpers.md#get-all-fields-placeholders) |
| **defaults()** | - | object | Get Field & Nested Fields Default Values. | [help](../actions/helpers.md#get-all-fields-defaults-values) |
| **initials()** | - | object | Get Field & Nested Fields Initial Values. | [help](../actions/helpers.md#get-all-fields-initials-values) |
| **types()** | - | object | Get Field & Nested Fields Type. | [help](../actions/helpers.md#get-all-fields-types) |

> Some of these Helpers methods are plurals.

#### Event Handlers

| Property | Input | Output | Info | Help |
|---|---|---|---|---|
| **onSubmit(e)** | - | object | Validate the form and call `onSuccess(form)` or `onError(form)`. | [help](../events/event-handlers.md#onsubmite) |
| **onClear(e)** | - | object | Clear all the Fields and Nested Fields to `empty` value. | [help](../events/event-handlers.md#oncleare--onresete) |
| **onReset(e)** | - | object | Reset all the Fields and Nested Fields to `default` value. | [help](../events/event-handlers.md#oncleare--onresete) |
| **onAdd(e)** | - | object | Add a Field or Nested Fields. | [help](../events/event-handlers.md#onadde--ondele) |
| **onDel(e)** | - | object | Delete a Field or Nested Fields. | [help](../events/event-handlers.md#onadde--ondele) |
| **onDrop(e)** | - | object | Handle file drop events when `type: 'file'`. | [help](../events/event-handlers.md#ondrope) |

> All Event Handlers takes the Proxy object in input.
