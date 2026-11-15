(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MobxFormkitComposer = {}));
})(this, (function (exports) { 'use strict';

    var FieldPropsEnum;
    (function (FieldPropsEnum) {
        FieldPropsEnum["key"] = "key";
        FieldPropsEnum["id"] = "id";
        FieldPropsEnum["path"] = "path";
        FieldPropsEnum["name"] = "name";
        FieldPropsEnum["fields"] = "fields";
        FieldPropsEnum["ref"] = "ref";
        FieldPropsEnum["type"] = "type";
        FieldPropsEnum["computed"] = "computed";
        FieldPropsEnum["value"] = "value";
        FieldPropsEnum["initial"] = "initial";
        FieldPropsEnum["default"] = "default";
        FieldPropsEnum["checked"] = "checked";
        FieldPropsEnum["label"] = "label";
        FieldPropsEnum["placeholder"] = "placeholder";
        FieldPropsEnum["error"] = "error";
        FieldPropsEnum["validatedWith"] = "validatedWith";
        FieldPropsEnum["validators"] = "validators";
        FieldPropsEnum["rules"] = "rules";
        FieldPropsEnum["related"] = "related";
        FieldPropsEnum["options"] = "options";
        FieldPropsEnum["extra"] = "extra";
        FieldPropsEnum["bindings"] = "bindings";
        FieldPropsEnum["hooks"] = "hooks";
        FieldPropsEnum["handlers"] = "handlers";
        FieldPropsEnum["converter"] = "converter";
        FieldPropsEnum["input"] = "input";
        FieldPropsEnum["output"] = "output";
        FieldPropsEnum["interceptors"] = "interceptors";
        FieldPropsEnum["observers"] = "observers";
        // computed
        FieldPropsEnum["disabled"] = "disabled";
        FieldPropsEnum["deleted"] = "deleted";
        FieldPropsEnum["blurred"] = "blurred";
        FieldPropsEnum["validating"] = "validating";
        FieldPropsEnum["submitting"] = "submitting";
        FieldPropsEnum["clearing"] = "clearing";
        FieldPropsEnum["resetting"] = "resetting";
        FieldPropsEnum["changed"] = "changed";
        FieldPropsEnum["touched"] = "touched";
        FieldPropsEnum["focused"] = "focused";
        FieldPropsEnum["isEmpty"] = "isEmpty";
        FieldPropsEnum["isDefault"] = "isDefault";
        FieldPropsEnum["isPristine"] = "isPristine";
        FieldPropsEnum["isDirty"] = "isDirty";
        FieldPropsEnum["isValid"] = "isValid";
        FieldPropsEnum["hasError"] = "hasError";
        // handlers
        FieldPropsEnum["onInit"] = "onInit";
        FieldPropsEnum["onSync"] = "onSync";
        FieldPropsEnum["onChange"] = "onChange";
        FieldPropsEnum["onBlur"] = "onBlur";
        FieldPropsEnum["onFocus"] = "onFocus";
        FieldPropsEnum["onToggle"] = "onToggle";
        FieldPropsEnum["onDrop"] = "onDrop";
        FieldPropsEnum["onSubmit"] = "onSubmit";
        FieldPropsEnum["onReset"] = "onReset";
        FieldPropsEnum["onClear"] = "onClear";
        FieldPropsEnum["onAdd"] = "onAdd";
        FieldPropsEnum["onDel"] = "onDel";
        FieldPropsEnum["autoFocus"] = "autoFocus";
        FieldPropsEnum["inputMode"] = "inputMode";
        FieldPropsEnum["onKeyDown"] = "onKeyDown";
        FieldPropsEnum["onKeyUp"] = "onKeyUp";
        FieldPropsEnum["class"] = "class";
        FieldPropsEnum["nullable"] = "nullable";
        FieldPropsEnum["autoComplete"] = "autoComplete";
    })(FieldPropsEnum || (FieldPropsEnum = {}));
    var AllowedFieldPropsTypes;
    (function (AllowedFieldPropsTypes) {
        AllowedFieldPropsTypes["computed"] = "computed";
        AllowedFieldPropsTypes["observable"] = "observable";
        AllowedFieldPropsTypes["editable"] = "editable";
        AllowedFieldPropsTypes["all"] = "all";
    })(AllowedFieldPropsTypes || (AllowedFieldPropsTypes = {}));
    var FieldPropsOccurrence;
    (function (FieldPropsOccurrence) {
        FieldPropsOccurrence["some"] = "some";
        FieldPropsOccurrence["every"] = "every";
    })(FieldPropsOccurrence || (FieldPropsOccurrence = {}));
    var SeparatedPropsMode;
    (function (SeparatedPropsMode) {
        SeparatedPropsMode["computed"] = "computed";
        SeparatedPropsMode["values"] = "values";
        SeparatedPropsMode["labels"] = "labels";
        SeparatedPropsMode["placeholders"] = "placeholders";
        SeparatedPropsMode["defaults"] = "defaults";
        SeparatedPropsMode["initials"] = "initials";
        SeparatedPropsMode["disabled"] = "disabled";
        SeparatedPropsMode["deleted"] = "deleted";
        SeparatedPropsMode["types"] = "types";
        SeparatedPropsMode["related"] = "related";
        SeparatedPropsMode["rules"] = "rules";
        SeparatedPropsMode["options"] = "options";
        SeparatedPropsMode["bindings"] = "bindings";
        SeparatedPropsMode["extra"] = "extra";
        SeparatedPropsMode["hooks"] = "hooks";
        SeparatedPropsMode["handlers"] = "handlers";
        SeparatedPropsMode["validatedWith"] = "validatedWith";
        SeparatedPropsMode["validators"] = "validators";
        SeparatedPropsMode["observers"] = "observers";
        SeparatedPropsMode["interceptors"] = "interceptors";
        SeparatedPropsMode["converters"] = "converters";
        SeparatedPropsMode["input"] = "input";
        SeparatedPropsMode["output"] = "output";
        SeparatedPropsMode["autoFocus"] = "autoFocus";
        SeparatedPropsMode["inputMode"] = "inputMode";
        SeparatedPropsMode["refs"] = "refs";
        SeparatedPropsMode["classes"] = "classes";
        SeparatedPropsMode["nullable"] = "nullable";
        SeparatedPropsMode["autoComplete"] = "autoComplete";
    })(SeparatedPropsMode || (SeparatedPropsMode = {}));

    const composer = (forms) => {
        const instances = () => forms;
        const select = (key) => forms[key];
        const check = (prop) => Object
            .entries(forms)
            .reduce((acc, entry) => Object.assign(acc, {
            [entry[0]]: entry[1].check(prop)
        }), {});
        const get = (prop) => Object
            .entries(forms)
            .reduce((acc, entry) => Object.assign(acc, {
            [entry[0]]: entry[1].get(prop)
        }), {});
        const valid = () => Object.values(check(FieldPropsEnum.isValid))
            .every((val) => val === true);
        const error = () => Object.values(check(FieldPropsEnum.hasError))
            .some((val) => val === true);
        const clear = ({ deep = true, execHook = false } = {
            deep: true, execHook: false,
        }) => Object.values(forms).map((form) => form.clear(deep, execHook));
        const reset = ({ deep = true, execHook = false } = {
            deep: true, execHook: false,
        }) => Object.values(forms).map((form) => form.reset(deep, execHook));
        const validate = ({ showErrors = true } = {
            showErrors: true,
        }) => Promise.all(Object.values(forms)
            .map((form) => form.validate({ showErrors })))
            .then(() => ({
            composer: composer(forms),
            valid: valid(),
            error: error(),
            errors: get('error'),
            values: get('value'),
        }));
        const submit = ({ validate = true, execOnSubmitHook = false, execValidationHooks = false } = {
            validate: true, execOnSubmitHook: false, execValidationHooks: false,
        }) => Promise.all(Object.values(forms)
            .map((form) => form.submit({}, { execOnSubmitHook, execValidationHooks, validate })))
            .then(() => ({
            composer: composer(forms),
            valid: valid(),
            error: error(),
            errors: get('error'),
            values: get('value'),
        }));
        return {
            instances,
            select,
            check,
            get,
            valid,
            error,
            validate,
            submit,
            clear,
            reset,
        };
    };

    exports.composer = composer;

}));
//# sourceMappingURL=MobxFormkitComposer.umd.js.map
