import { expect } from "chai";
import { Form } from "../../src";

/**
 * Setting a new starting point after the form is created: `markPristine()`
 * makes the current values the starting point.
 */
describe("markPristine()", () => {
  const struct = ["name", "rows[].day", "rows[].time"];
  const data = {
    name: "Week",
    rows: [
      { day: 1, time: "08:00" },
      { day: 2, time: "09:00" },
    ],
  };

  describe("markPristine()", () => {
    it("makes values set with update() the starting point", () => {
      const form = new Form({ struct });

      const result = form.update(data).markPristine();

      expect(result).to.equal(form);
      expect(form.values()).to.deep.equal(data);
      expect(form.$("rows").fields.size).to.equal(2);
      expect(form.isDirty).to.equal(false);
      expect(form.isPristine).to.equal(true);
    });

    it("is dirty after a change and pristine when the change is undone", () => {
      const form = new Form({ struct }).update(data).markPristine();

      form.$("rows.0.time").set("07:00");
      expect(form.isDirty).to.equal(true);

      form.$("rows.0.time").set("08:00");
      expect(form.isDirty).to.equal(false);

      form.$("rows").add({ day: 3, time: "10:00" });
      expect(form.isDirty).to.equal(true);
    });

    it("makes reset() go back to the marked values", () => {
      const form = new Form({ struct }).update(data).markPristine();

      form.$("name").set("Weekend");
      form.$("rows.1.time").set("11:00");
      form.reset();

      expect(form.values()).to.deep.equal(data);
      expect(form.isDirty).to.equal(false);
    });

    it("replaces the starting point when called again", () => {
      const form = new Form({ struct }).update(data).markPristine();

      const saved = { name: "Week", rows: [{ day: 5, time: "12:00" }] };
      form.update(saved).markPristine();
      expect(form.isDirty).to.equal(false);

      form.$("name").set("Weekend");
      form.reset();
      expect(form.values()).to.deep.equal(saved);
    });

    it("makes edited values the starting point without changing them", () => {
      const form = new Form({ struct, values: data });
      form.$("name").set("Weekend");
      form.$("rows.0.time").set("07:00");
      const edited = form.values();

      form.markPristine();

      expect(form.values()).to.deep.equal(edited);
      expect(form.isDirty).to.equal(false);
      form.$("rows.0.time").set("06:00");
      form.reset();
      expect(form.values()).to.deep.equal(edited);
    });

    it("keeps a declared default as the reset target", () => {
      const form = new Form({ struct, defaults: { name: "Untitled" } });

      form.update(data).markPristine();
      expect(form.isDirty).to.equal(false);

      form.reset();
      expect(form.$("name").value).to.equal("Untitled");
    });

    it("makes the marked values the restore reference", () => {
      const form = new Form({ struct }).update(data).markPristine();

      form.$("name").set("Weekend");
      form.restore();

      expect(form.values()).to.deep.equal(data);
    });

    it("clears the touched, blurred and changed state", () => {
      const form = new Form({ struct, values: data });
      const field = form.$("name");
      field.focus();
      field.onBlur();
      field.set("Weekend");

      form.markPristine();

      expect(field.touched).to.equal(false);
      expect(field.blurred).to.equal(false);
      expect(field.changed).to.equal(0);
      expect(form.touched).to.equal(false);
      expect(form.changed).to.equal(0);
    });

    it("marks only the nested field it is called on", () => {
      const form = new Form({ struct: ["name", "account.name", "account.tags[].code"] });
      form.$("name").set("Edited");

      const account = form.$("account");
      expect(account.update({ name: "A", tags: [{ code: "x" }] }).markPristine()).to.equal(account);

      expect(account.isDirty).to.equal(false);
      expect(form.$("name").isDirty).to.equal(true);

      form.$("account.tags.0.code").set("y");
      form.reset();
      expect(form.values()).to.deep.equal({ name: "", account: { name: "A", tags: [{ code: "x" }] } });
    });
  });
});
