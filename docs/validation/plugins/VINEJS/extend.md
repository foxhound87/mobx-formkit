## Custom VINEJS schema validation

Using `@vinejs/vine` as plugin, the **VINEJS** schema validation is enabled and can be extended too.

> See the VineJS documentation: [Extending Vine](https://vinejs.dev/docs/extend/custom_rules) for a deeper explanation.

Below we see how to implement it in `mobx-formkit`:

#### Implement the `extend` callback for the `plugins` object

The `extend` function takes in input an object with the following props:

* the `form` instance
* the `validator` instance

The `validator` is the Vine instance passed via `package` — custom rules and refinements are registered on it with `.rule()` / `.refine()`.

```javascript
import vinejs from 'mobx-formkit/lib/validators/VINEJS';
import { Vine } from '@vinejs/vine';

const vine = new Vine();

const plugins = {
  vinejs: vinejs({
    package: vine, // Vine instance
    schema: vine.object({
      email: vine.string().email(),
      age: vine.number().min(18),
    }),
    extend: ({ validator, form }) => {
      // `validator` is the Vine instance — register a custom
      // rule or refine here, then use it in future schemas.
      validator.rule('username', (value) =>
        /^[a-z0-9_]+$/i.test(value) ? true : 'Only letters, numbers and underscore');

      console.log(form.values());
    },
  }),
};
```

> **Note:** for custom rules use VineJS `.rule()` / `.refine()` on the schema directly. VINEJS `validate()` is async-by-design — always `await form.validate()` / `form.submit()`.