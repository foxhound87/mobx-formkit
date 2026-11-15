## Custom VALIBOT schema validation

Using `valibot` as plugin, the **VALIBOT** schema validation is enabled and can be extended too.

> See the valibot documentation: [Validation & Transformation](https://valibot.dev/guides/methods/) for a deeper explanation.

Below we see how to implement it in `mobx-formkit`:

#### Define a custom check/transform

VALIBOT is **sync-only**, so custom logic is expressed with Valibot's native `pipe`, `check`, `custom()` and `transform` on the schema directly:

```javascript
const $schema = v.object({
  username: v.pipe(
    v.string(),
    v.custom((value) => value.length >= 5, 'Username too short'),
    v.transform((value) => value.toLowerCase()),
  ),
});
```

#### Implement the `extend` callback for the `plugins` object

The `extend` function takes in input an object with the following props:

* the `form` instance
* the `validator` instance

The `validator` is the internal Valibot namespace (`v`), so registered/imported helpers are accessible from it at validation time.

```javascript
import valibot from 'mobx-formkit/lib/validators/VALIBOT';
import * as v from 'valibot';

const plugins = {
  valibot: valibot({
    schema: $schema,
    extend: ({ validator, form }) => {
      // `validator` is the valibot namespace `v` — custom
      // checks/transforms can be reused or inspected here.
      const isValid = v.is(v.pipe(v.string(), v.email()), form.$('email').value);
      console.log(isValid, form.values());
    },
  }),
};
```

> **Note:** for custom and async rules use Valibot's native `pipe`, `check`, `transform` and `custom()` on the schema. TS schemas type-check out of the box with TS ^5.