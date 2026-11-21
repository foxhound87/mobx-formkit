import { expect } from "chai";
import { Form } from "../../src";

/**
 * Array fields: values after `update()`, `reset()`, `sync()` and `add()`.
 *
 * See .vault/mobx_formkit_array_field_issues.md
 */
describe("Array fields — update / reset / sync / add", () => {
  const read = (form: any, path = "tags") => ({
    value: form.$(path).value,
    nestedFields: form.$(path).fields.size,
    values: form.values()[path],
  });

  describe("update() on a plain array field", () => {
    it("empties the field when the new value is an empty array", () => {
      const form = new Form({ fields: ["tags"], values: { tags: [1, 2] } });

      expect(read(form)).to.deep.equal({
        value: [1, 2],
        nestedFields: 0,
        values: [1, 2],
      });

      form.update({ tags: [1] });
      expect(read(form)).to.deep.equal({
        value: [1],
        nestedFields: 0,
        values: [1],
      });

      form.update({ tags: [] });
      expect(read(form)).to.deep.equal({
        value: [],
        nestedFields: 0,
        values: [],
      });
      expect(form.isDirty).to.equal(true);
    });

    it("empties the field when the array is declared with separated initials", () => {
      const form = new Form({ fields: ["tags"], initials: { tags: [1, 2] } });

      form.update({ tags: [] });

      expect(form.$("tags").value).to.deep.equal([]);
    });

    it("empties the field when the array is declared with a unified value", () => {
      const form = new Form({ fields: [{ name: "tags", value: [1, 2] }] });

      form.update({ tags: [] });

      expect(form.$("tags").value).to.deep.equal([]);
    });

    it("keeps the empty array with the fallback option disabled", () => {
      const form = new Form(
        { fields: ["tags"], values: { tags: [1, 2] } },
        { options: { fallback: false } },
      );

      form.update({ tags: [] });

      expect(form.$("tags").value).to.deep.equal([]);
    });
  });

  describe("reset() after update()", () => {
    it("restores a declared array of scalars", () => {
      const form = new Form({ fields: ["tags"], initials: { tags: [1, 2] } });

      form.update({ tags: [3] });
      form.reset();

      expect(read(form)).to.deep.equal({
        value: [1, 2],
        nestedFields: 0,
        values: [1, 2],
      });
    });

    it("restores a declared array of objects", () => {
      const form = new Form({
        fields: ["tags"],
        initials: {
          tags: [
            { label: "A", value: "a" },
            { label: "B", value: "b" },
          ],
        },
      });

      form.update({ tags: [{ label: "A", value: "a" }] });
      form.reset();

      expect(form.$("tags").value).to.deep.equal([
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ]);
    });

    it("restores an array container, dropping the added items", () => {
      const form = new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } });

      form.update({ tags: [1, 2, 3] });
      form.reset();

      expect(read(form)).to.deep.equal({
        value: [1, 2],
        nestedFields: 2,
        values: [1, 2],
      });
    });

    it("restores an array container, recreating the removed items", () => {
      const form = new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } });

      form.update({ tags: [1] });
      form.reset();

      expect(read(form)).to.deep.equal({
        value: [1, 2],
        nestedFields: 2,
        values: [1, 2],
      });
    });

    it("keeps the declared array when nothing was updated", () => {
      const form = new Form({ fields: ["tags"], initials: { tags: [1, 2] } });

      form.reset();

      expect(read(form)).to.deep.equal({
        value: [1, 2],
        nestedFields: 0,
        values: [1, 2],
      });
    });
  });

  describe("update() and add() values win over the declared ones", () => {
    it("uses the new values for a plain array field", () => {
      const form = new Form({ fields: ["tags"], values: { tags: [1, 2] } });

      form.update({ tags: [9] });
      form.update({ tags: [9, 8, 7] });

      expect(form.$("tags").value).to.deep.equal([9, 8, 7]);
    });

    it("uses the new values for an array container", () => {
      const form = new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } });

      form.update({ tags: [] });
      form.update({ tags: [3, 4] });

      expect(form.$("tags").value).to.deep.equal([3, 4]);
    });

    it("uses the added value for an array container", () => {
      const form = new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } });

      form.update({ tags: [] });
      form.$("tags").add({ value: 3 });

      expect(form.$("tags").value).to.deep.equal([3]);
    });
  });

  describe("array writes on a field with nested fields", () => {
    const createForm = () =>
      new Form({ fields: ["tags", "tags[]"], values: { tags: [1, 2] } });

    it("applies the array set through sync()", () => {
      const form = createForm();

      form.$("tags").sync([5, 6]);

      expect(form.$("tags").value).to.deep.equal([5, 6]);
    });

    it("applies the array set through onChange()", () => {
      const form = createForm();

      form.$("tags").onChange([5, 6]);

      expect(form.$("tags").value).to.deep.equal([5, 6]);
    });

    it("adds and removes the nested fields on sync()", () => {
      const form = createForm();

      form.$("tags").sync([5, 6, 7]);
      expect(form.$("tags").value).to.deep.equal([5, 6, 7]);
      expect(form.$("tags").fields.size).to.equal(3);

      form.$("tags").sync([5]);
      expect(form.$("tags").value).to.deep.equal([5]);
      expect(form.$("tags").fields.size).to.equal(1);
    });

    it("keeps set() limited to the existing nested fields", () => {
      const sameLength = createForm();
      sameLength.$("tags").set([5, 6]);
      expect(sameLength.$("tags").value).to.deep.equal([5, 6]);

      const longer = createForm();
      longer.$("tags").set([5, 6, 7]);
      expect(longer.$("tags").value).to.deep.equal([5, 6]);

      const shorter = createForm();
      shorter.$("tags").set([5]);
      expect(shorter.$("tags").value).to.deep.equal([5, 2]);
    });
  });

  describe("update() on a field with nested fields not declared as an array container", () => {
    it("applies the array to a field whose declared array became nested fields", () => {
      const form = new Form({
        fields: ["rows[]", "rows[].tags"],
        values: { rows: [{ tags: [5] }] },
      });

      form.update({ "rows.0.tags": [5, 4] });
      expect(form.$("rows.0.tags").value).to.deep.equal([5, 4]);
      expect(form.values()).to.deep.equal({ rows: [{ tags: [5, 4] }] });

      form.update({ "rows.0.tags": [] });
      expect(form.$("rows.0.tags").value).to.deep.equal([]);

      form.reset();
      expect(form.$("rows.0.tags").value).to.deep.equal([5]);
    });

    it("replaces and removes the items of an array created by an earlier update()", () => {
      const form = new Form({ fields: ["accounts[]"] });

      form.update({ accounts: [{ id: 1, overrides: [{ id: 10, code: "A" }] }] });
      form.update({ accounts: [{ id: 1, overrides: [{ id: null, code: "B" }] }] });
      expect(form.values()).to.deep.equal({
        accounts: [{ id: 1, overrides: [{ id: null, code: "B" }] }],
      });

      form.update({ accounts: [{ id: 1, overrides: [] }] });
      expect(form.values()).to.deep.equal({ accounts: [{ id: 1, overrides: [] }] });
    });
  });

  describe("add() on a simple array", () => {
    it("appends the value when the array is declared with initials", () => {
      const form = new Form({ fields: ["hobbies"], initials: { hobbies: ["Golf"] } });

      form.$("hobbies").add({ value: "Tennis" });

      expect(form.$("hobbies").value).to.deep.equal(["Golf", "Tennis"]);
    });

    it("appends the value when the array is declared with a unified value", () => {
      const form = new Form({ fields: [{ name: "hobbies", value: ["Golf"] }] });

      form.$("hobbies").add({ value: "Tennis" });

      expect(form.$("hobbies").value).to.deep.equal(["Golf", "Tennis"]);
    });

    it("appends the value when the array is declared with separated values", () => {
      const form = new Form({ fields: ["hobbies"], values: { hobbies: ["Golf"] } });

      form.$("hobbies").add({ value: "Tennis" });

      expect(form.$("hobbies").value).to.deep.equal(["Golf", "Tennis"]);
    });

    it("still appends on an array container", () => {
      const form = new Form({
        fields: ["hobbies", "hobbies[]"],
        values: { hobbies: ["Golf"] },
      });

      form.$("hobbies").add({ value: "Tennis" });

      expect(form.$("hobbies").value).to.deep.equal(["Golf", "Tennis"]);
    });
  });

  describe("clear() on an array with nested fields", () => {
    it("empties the array", () => {
      const form = new Form({
        fields: ["hobbies", "hobbies[]"],
        values: { hobbies: ["Golf", "Chess"] },
      });

      form.clear();

      expect(form.$("hobbies").value).to.deep.equal([]);
      expect(form.$("hobbies").fields.size).to.equal(0);
    });

    it("empties an array of numbers", () => {
      const form = new Form({ fields: ["n", "n[]"], values: { n: [1, 2] } });

      form.clear();

      expect(form.$("n").value).to.deep.equal([]);
    });

    it("keeps the documented behaviour on a field without nested fields", () => {
      const form = new Form({ fields: ["hobbies"], values: { hobbies: ["Golf"] } });

      form.clear();

      expect(form.$("hobbies").value).to.deep.equal([]);
    });
  });

  describe("array field helpers", () => {
    it("tells apart the array containers from the plain array fields", () => {
      const form = new Form({
        struct: ["items[].name", "tags"],
        values: { tags: ["a"] },
      });

      expect(form.$("items").isArrayContainer()).to.equal(true);
      expect(form.$("items").isPlainArrayField()).to.equal(false);

      expect(form.$("tags").isArrayContainer()).to.equal(false);
      expect(form.$("tags").isPlainArrayField()).to.equal(true);
    });

    it("checks any path from the form", () => {
      const form = new Form({ struct: ["items[].name", "tags"] });

      expect(form.isArrayContainer("items")).to.equal(true);
      expect(form.isArrayContainer("items[].name")).to.equal(false);
      expect(form.isArrayContainer("tags")).to.equal(false);
      expect(form.isArrayContainer()).to.equal(false);
    });

    it("is not a plain array field when the value is not an array", () => {
      const form = new Form({ struct: ["name"] });

      expect(form.$("name").isPlainArrayField()).to.equal(false);
    });
  });

  describe("regressions", () => {
    it("still creates the nested fields of an array container on update()", () => {
      const form = new Form({
        struct: ["items[].name", "items[].qty"],
        values: { items: [{ name: "Old", qty: 2 }] },
      });

      form.update({ items: [{ name: "New", qty: 1 }] });

      expect(form.$("items").value).to.deep.equal([{ name: "New", qty: 1 }]);
      expect(form.$("items").fields.size).to.equal(1);
    });

    it("still adds a named field on a field without nested fields", () => {
      const form = new Form({ fields: ["array"] });

      form.$("array").add({ name: "item_to_delete" });
      form.del("array.item_to_delete");

      expect(form.$("array").fields.size).to.equal(0);
    });

    it("still adds an item to an array container", () => {
      const form = new Form({ struct: ["members[].name"] });

      form.$("members").add({ name: "John" });

      expect(form.$("members").value).to.deep.equal([{ name: "John" }]);
    });

    it("still supports the array form of add()", () => {
      const form = new Form({
        struct: ["items[].name", "items[].qty"],
        values: { items: [{ name: "Old", qty: 2 }] },
      });

      form.$("items").add([{ name: "New", qty: 1 }]);

      expect(form.$("items").value).to.deep.equal([
        { name: "Old", qty: 2 },
        { name: "New", qty: 1 },
      ]);
    });

    it("still updates a single field of an array container", () => {
      const form = new Form({
        struct: ["members[].name"],
        values: { members: [{ name: "A" }, { name: "B" }] },
      });

      form.$("members[1].name").set("C");

      expect(form.$("members").value).to.deep.equal([{ name: "A" }, { name: "C" }]);
    });
  });
});
