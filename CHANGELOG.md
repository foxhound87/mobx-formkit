## 1.1.0 (2026-08-16)

### Features

- devtools: add opt-in devtools hook entry with exports (dda0682)
- devtools: enrich snapshots with helpers, options and batched emission (dbe2181)

## 1.1.1 (2026-08-18)

### Fixes

- fix: emit form:new event to devtools hook on form construction (6e328f9)

## 1.1.2 (2026-11-05)

### Fixes

- fix: include array containers in form isValid/hasError aggregation ([4a820c5](https://github.com/foxhound87/mobx-formkit/commit/4a820c52c7d9ff2fc11327c6ec717bb90442ee33)) (#656)

# 1.0.0

Renamed from mobx-react-form (last published 7.1.0). Package name and UMD globals changed; APIs identical.

# 7.1.0 (master)

## Features

- **C1** (#36): new **VALIBOT** validation driver — sync-only, plugin key `valibot`, import `mobx-react-form/lib/validators/VALIBOT`, script-tag global `MobxReactFormValidatorVALIBOT`. Usage: `valibot({ schema })` with a Valibot v1 schema; per-field errors match MRF paths (incl. nested `user.email` and array `members.0.name`). devDep `valibot@^1`.
- **C2** (#37): new **VINEJS** validation driver — plugin key `vinejs`, import `mobx-react-form/lib/validators/VINEJS`, script-tag global `MobxReactFormValidatorVINEJS`. Usage: `vinejs({ package: vine, schema })`. VineJS `validate()` is async-by-design at the API level even for synchronous rules, so the driver consumes the MRF async contract (`setValidationAsyncData` + `promises`), mirroring the YUP driver. devDep `@vinejs/vine@^4`.
- **C3** (#38): **ZOD driver hardened for v3.25+ / v4** — peer widened to `zod: ^3.25.0 || ^4.0.0` (optional peer via `peerDependenciesMeta`), devDep `zod@^4`; driver relies only on `safeParse` + `error.format()` (stable across both majors), so no driver changes were needed. Fixture expectations updated to zod v4 messages.

## Chore

- **E1**: toolchain — TypeScript devDep bumped `^4.5.5` → `^5` (5.9.3). No TS5 errors surfaced in the existing codebase (`tsc --noEmit` clean); full suite green after bump.
- **E2**: new unit test file `tests/unit/test.validators.valibot.ts` covering VALIBOT, VINEJS and ZOD v4 (valid / invalid / nested / message stack / `validationPluginsOrder`), contributing to the coverage gate.
- **E3**: AGENTS.md aligned with the release — version 7.1.0, driver table now 8 rows (`valibot`, `vinejs`), zod v4 peer note, plugin keys and UMD globals documented.

# 7.0.0 (master)

## Breaking Changes

- **D1** (#29): `setupFieldProps` uses `??` instead of `||` — falsy field props (`0`, `''`, `false`) are no longer discarded in favor of defaults: a falsy prop is respected as-is (migration note: `props.$options \|\| data?.options` → `props.$options ?? data?.options`)
- **D2** (#31): removed deprecated `form.validatedValues` getter (and its `console.warn`) — use `flatMapValues` (or `field.validatedValue`) instead; removed from `FormInterface`
- **D3**: renamed SVK validator plugin to AJV (name parity with the underlying `ajv` engine):
  - plugin key `plugins: { svk: ... }` → `plugins: { ajv: ... }`
  - import `mobx-react-form/lib/validators/SVK` → `mobx-react-form/lib/validators/AJV`
  - script-tag global `MobxReactFormValidatorSVK` → `MobxReactFormValidatorAJV`
  - fixture files and extension renamed accordingly (`tests/fixtures/extension/ajv.ts`)
- **D4** (#34): MobX 5 support — peer dependency widened to `^5.15.0 \|\| ^6.0.0 \|\| ^7.0.0`, added compat layer (`src/compat.ts`), `test:mobx5` script, CI matrix `[5, 6, 7]`

## Features

- **C1** (#20): `composer()` return now exposes `valid()` and `error()` helpers (all forms valid / any form has error)
- **C2** (#25): `Options.get(key?)` — default `key = ''` supports no-arg call (`options.get()` returns the full options map)

## Bug fixes

- **B1** (#21): `Bindings.load()` — graceful fallback on missing binding instead of TypeError
- **B2** (#22): `Form.invalidate()` — validator `error` stays `string | null`, never becomes `boolean true`
- **B3** (#23): `Base.validate()` — `merge(opt, { path })` no longer mutates the caller's object (uses `merge({}, opt, { path })`)
- **B4** (#24): `Validator.validate()` — `promises` array cleared after `Promise.all` (memory leak fix)
- **B5** (#27): `State.observeOptions()` — guard on `disposeValidationOnChange`/`disposeValidationOnBlur` for uninitialized fields
- **B6** (FIXES #28): `Field.onDrop()` — dedupe repeated file drops; `hasFiles()` robust to non-event `$`

## Chore

- **E1** (#26): `Options.set()` — removed dead `else` branch (always `set()`); dropped unused `extendObservable` import
- **E3** (#33): fixed `--satements` typo → `--statements` in `coverage:check`
- **E6**: AGENTS.md aligned with the release (version 7.0.0, driver table `ajv`, MobX 5 peer range)
- test: add `tests/unit/test.composer.ts` covering composer instance lifecycle plus the new `valid()`/`error()` helpers

# 6.20.0 (master)

- chore: remediate 62 npm vulnerabilities (0 remaining in production deps, 0 critical) — lodash/lodash-es `^4.17.24`, mocha `^11.8`, nyc `^17.1`, ajv `^8`, validator `^13.15.20`, semantic-release `^24`, commitizen `^4.3.2`, cz-conventional-changelog `^3.3.0`
- chore: migrate SVK validator to ajv 8 — `instancePath` instead of `dataPath`, `strict: false`, custom `email` format, path normalization backward-compatible
- chore: bump engines node to `>=18`; serialize-javascript override to fix mocha transitive high
- chore: update test script with `--no-experimental-strip-types` flags for node >=22.18

# 6.19.0 (master)

- feat: support MobX 7 alongside MobX 6 — peer dependency widened to `^6.0.0 || ^7.0.0`; tests and CI run on both majors (`mobx@6`, `mobx@7`)

# 6.18.1 (master)

- fix: added AGENTS.md for AI agent directions

# 6.18.0 (master)

- feat: `execHandler` now forwards DOM event args to hooks via `execHook` — hooks can receive `(field, event)` instead of only `(field)`
- test: add 7 tests for hook args passing (onKeyDown, onKeyUp, onBlur, onDrop, onAdd + regression on onInit/onClear)

# 6.17.0 (master)

- feat: `add()` now accepts flat objects as nested field values (no `value` wrapper needed for nested structs)

# 6.16.0 (master)

- chore: align README with unified header bar, npm badges (nodei.co + shields.io), feature links
- chore: add AI Agent Skills section to README features list
- chore: fix broken bindings URL in Features section
- docs: add AI Agent Skills documentation page and links to docs navigation
- docs: remove ios-theme-color skill from MRF docs, merge core+advanced skill tables
- docs: update `add()` examples to show flat object syntax for nested fields
- docs: update README alignment for rfx-core and mobx-react-form-devtools

# 6.15.1 (master)

- fix: `add()` parameter optional in `SharedActionsInterface` to match runtime signature
- fix: `$()` typed with `PathsOf<F>` in `FormInterface` for IDE autocomplete of nested paths
- fix: change `select` from function property to method syntax in `SharedUtilsInterface` for correct variance
- test: add typed schema test for `PathsOf` path resolution with `$()`

# 6.15.0 (master)

- feat: add `bubbleUpErrorMessages` form option (default `false`)
- feat: `Field.error` and `Form.error` bubble up first nested error when option enabled
- feat: add `firstError()` method to Base for recursive error traversal
- fix: #378 — error messages bubble up from nested child fields

# 6.14.1 (master)

- refactor: remove 36 EASY lodash functions, replace with vanilla JS
- fix: resolve TS warnings (type annotation, unused import)
- fix: resolve test bugs (nested describe, intercept assert, robust onClear)
- fix: uncomment and restore DVR performance test
- chore: merge master into agent (keep clean lodash imports, inline vanilla JS)
- docs: add gzip bundle size badge to README

# 6.14.0 (master)

- feat: add ArrayMap.move() with guard clauses (bounds, negative, same index)
- test: 26 tests for ArrayMap.move() and fields.move() — reorder, guards, chains, consistency

# 6.13.0 (master)

- feat: add generics to Form&lt;F&gt; and Field&lt;T&gt; for type-safe field access
- feat: enable strictNullChecks across all source files
- fix: resolve all noImplicitAny errors across source files
- chore: enable strictFunctionTypes, alwaysStrict, strictBindCallApply, noImplicitThis, useUnknownInCatchVariables, strictPropertyInitialization
- feat: add `FieldDefinition` interface for autocomplete of field props in constructor
- feat: add `PathsOf<T>` recursive utility type for nested field path inference
- feat: override `select()` in `Form` with proper return type
- feat: export `PathsOf` and `FieldDefinition` from package entry point
- docs: improved JSDoc on `$()` and `PathsOf` with usage examples

# 6.12.7 (master)

- fix: Mobx error `Field not found.`

# 6.12.6 (master)

- fix: umd bundler defaults exports

# 6.12.5 (master)

- Bundler optimizations

# 6.12.4 (master)

- Replace Webpack with Rollup

# 6.12.3 (master)

- Introduced `extra` form config for better dependencies injection.
- Deprecated form.validatedValues in Form class. use form.flatMapValues instead.

# 6.12.2 (master)

- Fixed imports paths in validation plugins.

# 6.12.1 (master)

- Feat: Support for YUP .ref() and .when() methods
- Fix: #626

# 6.12.0 (master)

- Feat: validation package type inference when extending validation plugins

# 6.11.2 (master)

- Fix: `autocomplete` to `autoComplete`

# 6.11.1 (master)

- `ValidationPlugins` interface allows custom plugins keys.
- Introduced `autocomplete` field prop.
- Deprecated `checkValidationPlugins` method.

# 6.11.0 (master)

- Full `null` values support for fields values.
- Introduced `nullable` field prop.

# 6.10.0 (master)

- Introduced `JOI` validation plugin and driver.
- Added `ValidatorConstructor` inferface

# 6.9.4 (master)

- Fix: #636
- Fix: Added `editable` props to initial props state.

# 6.9.3 (master)

- introduced `SubmitOptions` and `SubmitHooks` models.

# 6.9.2 (master)

- deprecated `checkSVKValidationPlugin`

# 6.9.1 (master)

- introduced `validate()` input types.
- introduced `ValidateOptions` & `ValidateOptionsInterface` models.

# 6.9.0 (master)

- Validator types improvements.
- introduced `ValidationPlugin`, `ExtendPlugin` and `ValidationPluginConfig` models.
- mandatory `package` prop when defining Validation Plugins.
- deprecated `allowRequired` option (SVK).
- Fix: `showErrors()` deep disabled when validating field.

# 6.8.3 (master)

- Fix: deprecated field `showAsyncErrors()`, use `showErrors()`.
- FIx: field import in `FormInterface`

# 6.8.2 (master)

- Fix: call `invalidate()` with `deep` argument.

# 6.8.1 (master)

- Fix: call `invalidate()` with `async` argument.

# 6.8.0 (master)

- Field `invalidate()` methods arguments updated, introduced `deep`.

# 6.7.5 (master)

- better handling of `deep` argument for `showErrors()` & `invalidate()` methods.
- removed `mixed` mode warning

# 6.7.4 (master)

- Fix: extend hooks and handlers on form instance using set()

# 6.7.3 (master)

- Fix: reset validation action for mobx strict mode

# 6.7.2 (master)

- Fix: mobx strict mode for hooks and handlers

# 6.7.1 (master)

- Fix: #632 observable hooks and handlers

# 6.7.0 (master)

- Feat: introduced `class`/`classes` props to handle `Field` extension in Fields Definitions.

# 6.6.1 (master)

- Fix: added missing bind method to field interface

# 6.6.0 (master)

- Introduced ZOD validation driver
- Added SVK support for array of objects
- Fix: #404

# 6.5.0 (master)

- Deprecatad: `setHooks()` & `getHooks()` methods.
- Handle `set()/get()` for `hooks` and `handlers`

# 6.4.0 (master)

- Feat: ability to define or override hooks after initialization.
- Feat: Introduced `setHooks()` & `getHooks()` methods.

# 6.3.7 (master)

- Fix: handle `onSubmit` hook return promise

# 6.3.6 (master)

- Fix: composer `error()` method.
- Fix: default models/interfaces have now named exports.
- Fix: check event w/ `isEvent()` to call `preventDefault()` for native support.

# 6.3.5 (master)

- Fix: `parseCheckArray` checks for `incremental` field status.
- Updated `semantic-release`

# 6.3.4 (master)

- Fix: `isEmptyArray` reimplemented in `isArrayFromStruct` util function;
- Removed lodash `_.isArray()` with `Array.isArray()`
- Introduced `struct` prop in `makeField` method.

# 6.3.3 (master)

- Fix: `get('value')` retrieve empty array removed by `update()`
- Fix: `composer` returned in `validate/submit` instead of single methods.

# 6.3.2 (master)

- Fix: `preserveDeletedFieldsValues` on `add()` action to handle `fields` prop.

# 6.3.1 (master)

- Introduced field `computed` prop. To handle nested array fields computed values.

# 6.3.0 (master)

- Introduced Forms Composer
- Introduced Functional Computed Field Props
- Introduced `strictSelect` and `strictSet` form options.
- Form option `strictUpdate` behavior changed (now applied on `update()` action).
- Field prop `validators` does not accept anymore a single function, an array of functions is needed.

# 6.2.3 (master)

- Introduced `applyInputConverterOnInit`, `applyInputConverterOnSet`, `applyInputConverterOnUpdate` form options.
- Introduced `converter` function applied on `set value`.
- Fix: `input` function removed from `set value`.

# 6.2.2 (master)

- Fix: mobx cycle detected in computation (get() strict mode)

# 6.2.1 (master) - DEPRECATED

- Refactored set value with input function
- Deprecated input function on `initial` and `default` props.
- Fix: input function applied 2 times when using `set()`

# 6.2.0 (master)

- Feat: #433 (File input append mode)

# 6.1.1 (master)

- Fix: #624 (defaults() helpers)

# 6.1.0 (master)

- Introduced `fallbackValue` and `retrieveNullifiedEmptyStrings` form options.
- Fix: `get()` strict mode improved
- Fix: default type file value;

# 6.0.0 (master)

- stable typescript release

# 5.10.1 (next)

- `set()` will apply `input` function also to `initial` and `default` props.
- Fix: #519

# 5.10.0 (next)

- Introduced Field `trim()` method.
- Introduced `validateTrimmedValue` form option.
- Introduced `resetValidationBeforeValidate` form option.
- `validationOrder` form option renamed to `validationPluginsOrder`.
- Added computed `validating` & `submitting` in allowed props guard.
- Fix: `clearing` and `resetting` observable mutation.
- Updated Issue: #283

# 5.9.1 (next)

- Fix: using `autoTrimValue` option will not trigger `onChange` Event Hook

# 5.9.0 (next)

- Introduced `inputMode` Field property.
- Introduced `autoTrimValue` form option (can be also enabled on single field).
- Fix: #283

# 5.8.0 (next)

- `set()` method will increase `changed` prop and trigger `onChange` Event Hook
- Mobx events (observe/intercept) allowed props guarded.
- Introduced `onSync` Hook (triggered on `onChange` Event Handler)
- Introduced `validateOnSubmit` form option (active by default).
- Fix: `ref` prop for separated props mode renamed to `refs` (plural)
- Fix: #337

# 5.7.1 (next)

- fix: allow `ref` prop on `set()`
- fix: `ref` computed accessible (before was accessed by $ref)

# 5.7.0 (next)

- Introduced `ref` Field prop. (handle React Refs);
- `ref` is auto-binded with the input when using `bind()` or can be defined/changed with `set()`
- `autoFocus` bheavior changed, now can be defined in field definitions or can be assigned with `set()`.
- `focus()` method reimplemented using auto-ref (fixed).
- Introduced Field `blur()` method (using auto-ref).
- Fix: #529 #250 #524

# 5.5.2 (next)

- Fix: Empty Constructor (was requiring at least an empyt object if used with only class fileds definitions)

# 5.5.1 (next)

- Introduced `preserveDeletedFieldsValues` form option (disabled by default).
- Fix: after deleting and adding same field, the defined initial values will not be preserverd anymore.

# 5.5.0 (next)

- Updated add()/del()/update() actions to handle `changed` field prop.
  (not triggering anymore `onChange` when using add(), use `onAdd`/`onDel` hooks instead).
- Updated `changed` computed prop behavior for nested fields and Event Hooks triggering.
- Events Hooks now are triggered also from actions if not used Event Handlers.
- fix: #585 #531

# 5.4.1 (next)

fix: #371 #399 #408

# 5.4.0 (next)

- Support for `default` Bindings Template.
- `clear()` & `reset()` methods will revert to initial validation state instead of `validate()`.
- introduced `onKeyUp` and `onKeyDown` fields Hooks and Handlers.
- introduced `validateOnClear` & `validateOnReset` form options (disabled by default).
- introduced `removeNullishValuesInArrays` form option (disabled by default).
- introduced `retrieveOnlyEnabledFieldsErrors` form option (disabled by default).
- `retrieveOnlyDirtyValues` form option renamed to `retrieveOnlyDirtyFieldsValues`.
- `retrieveOnlyEnabledFields` form option renamed to `retrieveOnlyEnabledFieldsValues`
- fix: #617 #615 #613 #614 #544 #454 #518 #376 #497 #582 #394

# 5.3.2 (next)

- fix: Support `validatedWith` with nested property of a field's value

# 5.3.1 (next)

- fix: cannot change disabled prop on fields

# 5.3.0 (next)

- nested fields trigger onchange hook on container

# 5.2.0 (next)

- trigger onChange hook on add/del

# 5.1.0 (next)

- Form level onChange hook
- introduced reducer

# 4.0.0 / 5.0.0 (next)

- Typescript support

# 3.2.0

- mobx 6.3.3 support

# 3.1.2

- stopValidationOnError & validationOrder options (fix #576)

# 3.1.1

- labels for DVR dependant fields for before/after rules

# 3.1.0

- mobx6.1 support

# 3.0.0

- mobx6 support

# 2.0.8

- pull #528

# 2.0.7

- pull #525

# 2.0.6

- fix #521

# 2.0.5

- fix #514 #516

# 2.0.4

- fix #507

# 2.0.3

- introduced `fallback` form option

# 2.0

- introduced `validateOnChangeAfterSubmit` form option

# 1.39

- reimplemented `initial`/`default` `isDirty`/`isPristine`

# 1.38

- introduced `validateDeletedFields` form option

# 1.37

- decoupled validation plugins drivers
- introduced `yup` validation plugin
- changed validation plugins `extend` callback props
- AJV schema definition moved to plugin setup
- introduced `softDelete` option
- introduced `submitted` & `validated` prop

# 1.35

- mobx5 support
- Introduced observable `type` field prop
- Removed `label` fallback to field `name`
- fix: #432 #415 #355 #347 #425 #429 #416

# 1.34

- Added `struct` constructor prop
- Reimplemented add() method

# 1.33

- mobx4 support

# 1.32

- Validate with different props.
- Reimplemented Event Hooks & Handlers.
- Introduced new Event Hooks.
- Introduced `input`/`output` props (converters).
- Introduced `hooks` Field prop and class function.
- Introduced `handlers` Field prop and class function.
- Introduced `validatedWith` Field prop.
- Introduced `validatedValue` Field computed.
- Option `alwaysShowDefaultError` removed.
- Option `uniqueId` (Custom Function) added.
- Option `validateDisabledFields` added.
- Computed `hasIncrementalNestedFields` renamed to `hasIncrementalKeys`.
- No more manually wire `onDrop` to `onChange`.

# 1.31

- Option `validateOnBlur` added.
- Option `validateOnChange` is `false` by default.
- Option `showErrorsOnUpdate` renamed `showErrorsOnChange`.
- Option `showErrorsOnChange` is `true` by default.
- Option `retrieveAlsoDisabledFields` renamed `retrieveOnlyEnabledFields`.
- Option `retrieveOnlyEnabledFields` is `false` by default.
- Option `validationDebounceOptions` default is `{ leading: false, trailing: true }`
- `options` Field prop renamed `extra`.
- `options` Field prop handle individual **Field Options**.
- **Field Options** will fallback on **Form Options**.
- Implemented input **file** `type` handling.
- Introduced `onDrop` Field Event Handler.
- Introduced `onDrop` Field Hook.
- Introduced `files` Field prop.
- Introduced `resetting` & `clearing` computed.
- Dropzone support.
- Ability to pass `onChange` & `onToggle` in constructor.

# 1.30

- New `onClear` & `onReset` Form & Fields Hooks.
- Introduced `retrieveAlsoDisabledFields` option.
- `observe` / `intercept` now supports Form props.
- `changed` & `touched` are now **false** after `clear` / `reset`.
- Fixed **unified** mode `initial` prop handling.

# 1.29

- Event Hooks deprecated.

# 1.28

- Method `forEach()` renamed `each()`.
- Refactored & semplified `map()`.
- Introduced `has()` method.
- Introduced Form `showErrors()` method.
- Introduced `size` computed prop.
- Prop `validate` renamed `validators` for consistency.
- Fixed empty nested array element (index 0 no more added).

# 1.27

- `focus` computed renamed `focused`.
- Introduced `autoFocus` input support.
- Introduced Field `focus()` method.

# 1.26

- Introduced `retrieveOnlyDirtyValues` option

# 1.25

- Introduced `extra` data

# 1.24

- `showErrors` on `Field` is `false` by default.
- `showErrors` on `validate()` is `false` by default.
- Introduced new showErrors options.
- `showErrorsOnUpdate` is changed to `false` by default.
- `showErrorsOnBlur` is now `true` by default.
- Introduced new `observeShowErrors()` Field method.
- Introduced `debouncedValidation` on `submit`.

# 1.23

- Auto invalidate `onSubmit` > `onError` if defaultGenericError is defined.
- Validation Handlers supports Promises.
- Introduced `submitting` prop
- Introduced `submitThrowsError`. option.

# 1.22

- Introduced Sub-Form Submission.
- Register `onSubmit` callbacks with constructor.
- `validate()` resolves to object (not boolean).
- Fixed Single Field Validation.

# 1.21

- Introduced Interceptors.
- `dispose()` API changed.

# 1.20

- Introduced `debouncedValidation`.
- Introduced Form & Field `validating` mobx computed (async check).
- Events Hooks: returned Form instance (was a Field instance).
- Fixed Async error state (removed `loadingMessage`)
- Fixed Async \"validating...\" Message (null as default).
- `loadingMessage` option removed.

# 1.19

- Introduced Observers.
- Introduced Converters (parse & format).
- Better Array Handling.
- Optional `submit()` onSuccess/onError callbacks.
- Fixed Empty Array Handling in Field Container.
- Removed Initial Array element \"0\" (no more del(0)).

# 1.18

- Ability to pass 'plugins' with plugins() method
- Ability to pass 'options' with options() method
- Ability to pass 'options' as fields prop
- Ability to pass 'bindings' to Form constructor
- Form 'options' moved on the second argument of the Form constructor
- Form 'plugins' moved on the second argument of the Form constructor

# 1.17

- Updated dependencies.
- Code refactoring & optimization.
- Reimplemented del(), observe(), validate().
- Introduced field computed validators().
- Introduced form computed validating().
- Introduced alwaysShowDefaultError option.
- Introduced setup() method.
- Introduced \"disabled\" computed prop
- Introduced Fields Props Bindings
- Introduced initial props: types, bindings.
- Introduced field props: type, bindings.
- Introduced $try helper for bindings.

# 1.16

- Allow add() to include initial value
- Allow add() to assign custom field key
- Introduced Field invalidate() method
- Introduced Field placeholder
- Introduced unique Field ID
- Introduced autoParseNumbers option

# 1.15

- Extensible Field

# 1.14

- Computed Deep Check

# 1.13

- Nested Fields
- Nested Validation

# 1.12

- MobX as peer depdendency
- Lodash Cherry Pick
- Fixed #74 (validateOnChange option)

# 1.11

- Enhanced events handlers
- Added validateOnChange, strictUpdate, showErrorsOnUpdate options
- Define Fields Properties and Validators Separately
- Define fields as Array of Objects
- Added field set(prop, val) for edit props
- Added form onInit() event
- Added form options() get/set
- Bulk update() form properties

# 1.10

- Fix
