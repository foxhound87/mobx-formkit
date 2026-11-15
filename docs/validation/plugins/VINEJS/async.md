## Async (promise-based) Validation (VINEJS)

VineJS `validate()` is **async-by-design** at the API level — even for synchronous rules. The **VINEJS** driver consumes the mobx-formkit async contract (`setValidationAsyncData` + `promises`), so all validation flows through the promise pipeline.

### Always await validation

```javascript
const form = new Form({ ... }, { plugins });

await form.validate();   // resolves once VineJS returns
await form.submit();     // validate + hooks, resolves after async validation
```

### Field-level async behaviour

Errors are pushed per-path from VineJS `error.messages` (dot-notation paths like `user.zip`) as they resolve, so nested field errors land on the correct field. While a validation is pending the field reports its `validating` state:

```javascript
form.validating;            // true while any async validation is running
form.$('email').validating; // true while the field is being validated
```

> Read more about [Validation](https://vinejs.dev/docs/schema_101) on the official VineJS documentation.