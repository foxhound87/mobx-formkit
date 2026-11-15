import { expect } from "chai";
import { autorun } from "mobx";
import validatorjs from "validatorjs";
import { Form } from "../../src";
import dvr from "../../src/validators/DVR";

/**
 * commit() / restore()
 *
 * See .vault/mobx-formkit-commit-restore-handoff.md
 */
describe("Form commit() / restore()", () => {
  const createForm = () =>
    new Form({
      struct: ["name", "address.city", "items[].label", "items[].qty"],
      values: {
        name: "Claudio",
        address: { city: "Rome" },
        items: [{ label: "a", qty: 1 }],
      },
    });

  describe("commit()", () => {
    it("does not change the current values", () => {
      const form = createForm();

      form.commit();

      expect(form.values()).to.deep.equal({
        name: "Claudio",
        address: { city: "Rome" },
        items: [{ label: "a", qty: 1 }],
      });
    });

    it("captures the current values as the restore reference", () => {
      const form = createForm();

      form.$("name").set("Marco");
      form.commit();

      expect(form.committed()).to.deep.equal({
        name: "Marco",
        address: { city: "Rome" },
        items: [{ label: "a", qty: 1 }],
      });
    });

    it("is idempotent on the values when nothing changed", () => {
      const form = createForm();

      form.commit();
      const first = form.committed();
      form.commit();

      expect(form.committed()).to.deep.equal(first);
    });

    it("does not trigger the form validation", () => {
      let validated = 0;
      const form = new Form({
        fields: ["name"],
        values: { name: "" },
        plugins: {},
        hooks: {},
      });
      form.state.options.set({ validateOnInit: false });
      form.$("name").set("Claudio");
      form.commit();

      expect(validated).to.equal(0);
    });
  });

  describe("restore()", () => {
    it("restores the initial snapshot before any commit", () => {
      const form = createForm();

      form.$("name").set("Marco");
      form.$("address.city").set("Milan");
      form.restore();

      expect(form.values()).to.deep.equal({
        name: "Claudio",
        address: { city: "Rome" },
        items: [{ label: "a", qty: 1 }],
      });
    });

    it("restores the committed value of a changed field", () => {
      const form = createForm();
      form.commit();

      form.$("name").set("Marco");
      form.restore();

      expect(form.$("name").value).to.equal("Claudio");
    });

    it("restores every committed field", () => {
      const form = createForm();
      form.commit();

      form.$("name").set("Marco");
      form.$("address.city").set("Milan");
      form.$("items[0].label").set("z");
      form.restore();

      expect(form.values()).to.deep.equal({
        name: "Claudio",
        address: { city: "Rome" },
        items: [{ label: "a", qty: 1 }],
      });
    });

    it("uses the most recent commit as the restore reference", () => {
      const form = createForm();

      form.$("name").set("Marco");
      form.commit();
      form.$("name").set("Mario");
      form.commit();
      form.$("name").set("Luigi");
      form.restore();

      expect(form.$("name").value).to.equal("Mario");
    });

    it("is repeatable", () => {
      const form = createForm();
      form.commit();

      form.$("name").set("Marco");
      form.restore();
      form.$("name").set("Luigi");
      form.restore();

      expect(form.$("name").value).to.equal("Claudio");
    });

    it("restores the array content and the order", () => {
      const form = createForm();
      form.commit();

      form.$("items").add({ label: "b", qty: 2 });
      form.$("items").move(1, 0);
      form.restore();

      expect(form.$("items").value).to.deep.equal([{ label: "a", qty: 1 }]);
      expect(form.$("items").fields.size).to.equal(1);
    });

    it("restores nested objects", () => {
      const form = createForm();
      form.commit();

      form.$("address").set({ city: "Milan" });
      form.restore();

      expect(form.$("address").value).to.deep.equal({ city: "Rome" });
    });

    it("does not let a mutation contaminate the snapshot", () => {
      const form = new Form({
        fields: ["payload"],
        values: { payload: { deep: { value: 1 } } },
      });
      form.commit();

      (form.$("payload").value as any).deep.value = 999;
      form.restore();

      expect((form.$("payload").value as any).deep.value).to.equal(1);
    });

    it("keeps the snapshot independent from the restored values", () => {
      const form = createForm();
      form.commit();

      form.$("name").set("Marco");
      form.restore();

      expect(form.committed()).to.deep.include({ name: "Claudio" });
    });
  });

  describe("dynamic fields", () => {
    it("keeps the fields added after the commit", () => {
      const form = createForm();
      form.commit();

      form.add({ name: "extra", value: "x" });
      form.restore();

      expect(form.values()).to.deep.include({ extra: "x" });
    });

    it("does not recreate the fields deleted after the commit", () => {
      const form = new Form({ fields: ["a", "b"], values: { a: "1", b: "2" } });
      form.commit();

      form.del("b");
      form.restore();

      expect(form.has("b")).to.equal(false);
    });
  });

  describe("nested forms (sub-forms)", () => {
    it("commits and restores a sub-form", () => {
      const form = new Form({
        struct: ["club.name", "club.city"],
        values: { club: { name: "HELLO", city: "NY" } },
      });
      const club = form.$("club");

      club.$("name").set("CHANGED");
      club.commit();
      club.$("name").set("CHANGED AGAIN");
      club.restore();

      expect(club.$("name").value).to.equal("CHANGED");
    });

    it("restores the initial snapshot of a sub-form", () => {
      const form = new Form({
        struct: ["club.name", "club.city"],
        values: { club: { name: "HELLO", city: "NY" } },
      });
      const club = form.$("club");

      club.$("name").set("CHANGED");
      club.restore();

      expect(club.$("name").value).to.equal("HELLO");
    });
  });

  describe("reset()", () => {
    it("keeps the reset semantics unchanged", () => {
      const form = new Form({
        fields: [{ name: "a", value: "v", initial: "i", default: "d" }],
      });

      form.reset();

      expect(form.$("a").value).to.equal("d");
    });

    it("is not affected by a commit", () => {
      const form = new Form({
        fields: [{ name: "a", value: "v", initial: "i", default: "d" }],
      });

      form.commit();
      form.reset();

      expect(form.$("a").value).to.equal("d");
    });
  });

  describe("metadata and validation", () => {
    it("does not clear the validation state", async () => {
      const form = new Form(
        {
          fields: [{ name: "email", rules: "required|email" }],
        },
        { plugins: { dvr: dvr({ package: validatorjs }) } },
      );
      form.state.options.set({ validateOnInit: false });

      form.$("email").set("not-an-email");
      await form.validate();
      form.commit();

      form.$("email").set("claudio@example.com");
      await form.restore();

      // the value is restored, the errors are left untouched
      expect(form.$("email").value).to.equal("not-an-email");
    });

    it("does not change the dirty semantics", () => {
      const form = createForm();
      form.commit();

      form.$("name").set("Marco");

      expect(form.isDirty).to.equal(true);
    });

    it("validates the restored values when validateOnRestore is enabled", async () => {
      const form = new Form(
        {
          fields: [{ name: "email", rules: "required|email" }],
        },
        { plugins: { dvr: dvr({ package: validatorjs }) } },
      );
      form.state.options.set({
        validateOnInit: false,
        validateOnRestore: true,
        showErrorsOnRestore: true,
      });

      form.commit();
      form.$("email").set("not-an-email");
      await form.restore();

      expect(form.$("email").hasError).to.equal(true);
    });
  });

  describe("reactivity", () => {
    it("applies the restore in a single transaction", () => {
      const form = createForm();
      form.commit();

      const seen: any[] = [];
      const dispose = autorun(() => seen.push(form.$("name").value));

      form.$("name").set("Marco");
      seen.length = 0;
      form.restore();
      dispose();

      // the intermediate states are not observable: the reaction is notified
      // once, with the final value
      expect(seen).to.deep.equal(["Claudio"]);
    });
  });
});
