# UMD Setup

---

Import `mobx` and `mobx-formkit` into your html:

* Download [latest version of lodash](https://unpkg.com/lodash/lodash.min.js)
* Download [latest version of mobx](https://unpkg.com/mobx/dist/mobx.umd.production.min.js)
* Download [latest version of mobx-formkit](https://unpkg.com/mobx-formkit/umd/MobxFormkit.umd.min.js)
* Download a [Validation Plugin](validation/plugins.md)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>MobX Formkit (UMD)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script src="https://unpkg.com/lodash@x.x.x/lodash.min.js"></script>
    <script src="https://unpkg.com/mobx@x.x.x/dist/mobx.umd.production.min.js"></script>
    <script src="https://unpkg.com/mobx-formkit@x.x.x/umd/MobxFormkit.umd.min.js"></script>
    <script src="https://unpkg.com/mobx-formkit@x.x.x/umd/MobxFormkitValidatorDVR.umd.min.js"></script>
    <script src="https://unpkg.com/validatorjs@x.x.x/dist/validator.js"></script>
    <script src="source.js"></script>
  </body>
</html>

```

Access the `MobxFormkit` from your source:

> source.js

```javascript
/* eslint no-console: 0 */
/* eslint no-undef: 0 */

console.log('lodash', _ && '>>> OK');
console.log('mobx', mobx && '>>> OK');
console.log('MobxFormkit', MobxFormkit && '>>> OK');
console.log('MobxFormkitValidatorDVR', MobxFormkitValidatorDVR && '>>> OK');
console.log('Validator', Validator && '>>> OK');

const { Form } = MobxFormkit;

const form = new Form({
  fields: {
    email: {
      label: 'Email',
      rules: 'required|email',
    },
  },
}, {
  name: 'UMD',
  options: {
    validateOnInit: true,
    showErrorsOnInit: true,
  },
  plugins: {
    dvr: MobxFormkitValidatorDVR({
      package: Validator
    })
  },
});

console.log('form.values()', form.values()); // { email: "" }
console.log('form.errors()', form.errors()); // { email: "The Email format is invalid." }
```
