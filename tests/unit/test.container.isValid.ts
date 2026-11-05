import { expect } from "chai";
import validatorjs from "validatorjs";
import validator from "validator";
import { z } from "zod";

import { Form } from "../../src";
import dvr from "../../src/validators/DVR";
import vjf from "../../src/validators/VJF";
import zodValidator from "../../src/validators/ZOD";

/**
 * Regression tests for Base.deepCheck(): a validation error attached to an
 * array container (a list field, or a row with `initial: []`) used to be
 * skipped by form-level isValid/hasError, so submit() could call onSuccess
 * on an invalid form.
 */

const STRUCT = ["rows[]", "rows[].title"];

const fail = (message: string) => () => [false, message] as [boolean, string];
const pass = () => [true, ""] as [boolean, string];

const makeForm = (setup: any, plugins: any = { vjf: vjf({ package: validator }) }) =>
  new Form(setup, {
    name: "ContainerValidation",
    plugins,
    options: { validateOnInit: true, showErrorsOnInit: true },
  });

const listForm = (validators: any) =>
  makeForm({
    struct: STRUCT,
    values: { rows: [{ title: "alpha" }] },
    validators,
  });

const rowForm = (origin: "constructor" | "add" | "update") => {
  const form = makeForm({
    struct: STRUCT,
    values: { rows: origin === "constructor" ? [{ title: "alpha" }] : [] },
    validators: { "rows[]": [fail("row must be rejected")] },
  });
  if (origin === "add") form.$("rows").add({ title: "gamma" });
  if (origin === "update") form.update({ rows: [{ title: "gamma" }] });
  return form;
};

const submitHook = async (form: any): Promise<string | null> => {
  let hook: string | null = null;
  await form.submit({
    onSuccess: () => {
      hook = "onSuccess";
    },
    onError: () => {
      hook = "onError";
    },
  });
  return hook;
};

describe("Array container validation — form isValid/hasError", () => {
  describe("VJF validator failed on the list field", () => {
    it("form.isValid should be false", async () => {
      const form = listForm({ rows: [fail("list must be rejected")] });
      await form.validate({ showErrors: true });
      expect(form.$("rows").isValid).to.be.false;
      expect(form.isValid).to.be.false;
    });

    it("form.hasError should be true", async () => {
      const form = listForm({ rows: [fail("list must be rejected")] });
      await form.validate({ showErrors: true });
      expect(form.$("rows").hasError).to.be.true;
      expect(form.hasError).to.be.true;
    });

    it("submit() should call the onError callback", async () => {
      const form = listForm({ rows: [fail("list must be rejected")] });
      expect(await submitHook(form)).to.equal("onError");
    });
  });

  describe("VJF validator failed on a row", () => {
    it("row created by add() should make the form invalid", async () => {
      const form = rowForm("add");
      await form.validate({ showErrors: true });
      expect(form.$("rows.0").isValid).to.be.false;
      expect(form.isValid).to.be.false;
      expect(form.hasError).to.be.true;
      expect(await submitHook(form)).to.equal("onError");
    });

    it("row created by update() should make the form invalid", async () => {
      const form = rowForm("update");
      await form.validate({ showErrors: true });
      expect(form.$("rows.0").isValid).to.be.false;
      expect(form.isValid).to.be.false;
      expect(form.hasError).to.be.true;
      expect(await submitHook(form)).to.equal("onError");
    });

    it("row passed in constructor values should stay invalid", async () => {
      const form = rowForm("constructor");
      await form.validate({ showErrors: true });
      expect(form.$("rows.0").isValid).to.be.false;
      expect(form.isValid).to.be.false;
      expect(form.hasError).to.be.true;
      expect(await submitHook(form)).to.equal("onError");
    });
  });

  describe("regressions — non-container cases stay invalid", () => {
    it("leaf validator failure should make the form invalid", async () => {
      const form = makeForm({
        struct: ["email"],
        values: { email: "not-an-email" },
        validators: { email: [fail("email must be rejected")] },
      });
      await form.validate({ showErrors: true });
      expect(form.$("email").isValid).to.be.false;
      expect(form.isValid).to.be.false;
      expect(form.hasError).to.be.true;
    });

    it("leaf-in-row validator failure should make the form invalid", async () => {
      const form = makeForm({
        struct: STRUCT,
        values: { rows: [{ title: "alpha" }] },
        validators: { "rows[].title": [fail("title must be rejected")] },
      });
      await form.validate({ showErrors: true });
      expect(form.$("rows.0.title").isValid).to.be.false;
      expect(form.isValid).to.be.false;
      expect(form.hasError).to.be.true;
    });

    it("nested object (non-array) container failure should make the form invalid", async () => {
      const form = makeForm({
        struct: ["user.name"],
        values: { user: { name: "x" } },
        validators: { user: [fail("user must be rejected")] },
      });
      await form.validate({ showErrors: true });
      expect(form.$("user").isValid).to.be.false;
      expect(form.isValid).to.be.false;
      expect(form.hasError).to.be.true;
    });
  });

  describe("no false negatives", () => {
    it("passing validators should keep the form valid", async () => {
      const form = listForm({
        rows: [pass],
        "rows[]": [pass],
        "rows[].title": [pass],
      });
      await form.validate({ showErrors: true });
      expect(form.$("rows").isValid).to.be.true;
      expect(form.isValid).to.be.true;
      expect(form.hasError).to.be.false;
      expect(await submitHook(form)).to.equal("onSuccess");
    });
  });

  describe("other drivers — same container behaviour", () => {
    it("DVR (string rules) array container rule should make the form invalid", async () => {
      const form = makeForm(
        {
          struct: STRUCT,
          values: { rows: [{ title: "alpha" }] },
          rules: { rows: "required|string" },
        },
        { dvr: dvr({ package: validatorjs }) },
      );
      await form.validate({ showErrors: true });
      expect(form.$("rows").isValid).to.be.false;
      expect(form.isValid).to.be.false;
      expect(form.hasError).to.be.true;
      expect(await submitHook(form)).to.equal("onError");
    });

    it("ZOD (schema) array container rule should make the form invalid", async () => {
      const form = makeForm(
        { struct: STRUCT, values: { rows: [{ title: "alpha" }] } },
        {
          zod: zodValidator({
            package: z,
            schema: z.object({
              rows: z.array(z.object({ title: z.string() })).min(3),
            }),
          }),
        },
      );
      await form.validate({ showErrors: true });
      expect(form.$("rows").isValid).to.be.false;
      expect(form.isValid).to.be.false;
      expect(form.hasError).to.be.true;
      expect(await submitHook(form)).to.equal("onError");
    });
  });
});
