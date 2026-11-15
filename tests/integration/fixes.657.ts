import { expect } from "chai";
import { Form } from "../../src";

describe("Issue #657 - array fields dirty state and add() values", () => {
  describe("del() on an array container", () => {
    it("marks the field and the form as dirty", () => {
      const form = new Form({
        struct: ["members[].name"],
        values: { members: [{ name: "A" }, { name: "B" }] },
      });

      expect(form.isDirty).to.equal(false);
      expect(form.isPristine).to.equal(true);

      form.$("members").del(0);

      expect(form.values()).to.deep.equal({ members: [{ name: "B" }] });
      expect(form.$("members").isDirty).to.equal(true);
      expect(form.isDirty).to.equal(true);
      expect(form.isPristine).to.equal(false);
    });
  });

  describe("add() on an array container", () => {
    it("marks the field and the form as dirty (array of scalars)", () => {
      const form = new Form({
        struct: ["tags[]"],
        values: { tags: ["a"] },
      });

      form.$("tags").add({ value: "b" });

      expect(form.values()).to.deep.equal({ tags: ["a", "b"] });
      expect(form.$("tags").isDirty).to.equal(true);
      expect(form.isDirty).to.equal(true);
      expect(form.isPristine).to.equal(false);
    });

    it("marks the field and the form as dirty (array of objects)", () => {
      const form = new Form({
        struct: ["members[].name"],
        values: { members: [{ name: "A" }] },
      });

      form.$("members").add({ name: "B" });

      expect(form.values()).to.deep.equal({
        members: [{ name: "A" }, { name: "B" }],
      });
      expect(form.$("members").isDirty).to.equal(true);
      expect(form.isDirty).to.equal(true);
    });
  });

  describe("move() on an array container", () => {
    it("marks the field and the form as dirty", () => {
      const form = new Form({
        struct: ["members[].name"],
        values: { members: [{ name: "A" }, { name: "B" }] },
      });

      form.$("members").move(0, 1);

      expect(form.values()).to.deep.equal({
        members: [{ name: "B" }, { name: "A" }],
      });
      expect(form.$("members").isDirty).to.equal(true);
      expect(form.isDirty).to.equal(true);
      expect(form.isPristine).to.equal(false);
    });

    it("keeps the form pristine when the order is restored", () => {
      const form = new Form({
        struct: ["members[].name"],
        values: { members: [{ name: "A" }, { name: "B" }] },
      });

      form.$("members").move(0, 1);
      form.$("members").move(1, 0);

      expect(form.values()).to.deep.equal({
        members: [{ name: "A" }, { name: "B" }],
      });
      expect(form.$("members").isDirty).to.equal(false);
      expect(form.isDirty).to.equal(false);
    });
  });

  describe("add() with the values of the new item", () => {
    it("does not use the 'name' value as the container key", () => {
      const form = new Form({
        struct: ["items[].name", "items[].qty"],
        values: { items: [{ name: "Old", qty: 2 }] },
      });

      form.$("items").add({ name: "New", qty: 1 });

      expect(form.values()).to.deep.equal({
        items: [
          { name: "Old", qty: 2 },
          { name: "New", qty: 1 },
        ],
      });
      expect(form.$("items").fields.size).to.equal(2);
    });

    it("supports a single 'name' value", () => {
      const form = new Form({
        struct: ["members[].name"],
        values: { members: [{ name: "A" }, { name: "B" }] },
      });

      form.$("members").add({ name: "C" });

      expect(form.values()).to.deep.equal({
        members: [{ name: "A" }, { name: "B" }, { name: "C" }],
      });
    });

    it("still supports the array form", () => {
      const form = new Form({
        struct: ["items[].name", "items[].qty"],
        values: { items: [{ name: "Old", qty: 2 }] },
      });

      form.$("items").add([{ name: "New", qty: 1 }]);

      expect(form.values()).to.deep.equal({
        items: [
          { name: "Old", qty: 2 },
          { name: "New", qty: 1 },
        ],
      });
    });

    it("still uses 'name' as key when the container has no nested 'name' field", () => {
      const form = new Form({
        struct: ["members[].firstname"],
        values: { members: [{ firstname: "A" }] },
      });

      form.$("members").add({ name: "B" });

      expect(form.$("members").fields.has("B")).to.equal(true);
    });

    it("still uses 'key' as key when the container has a nested 'name' field", () => {
      const form = new Form({
        struct: ["members[].name"],
        values: { members: [{ name: "A" }] },
      });

      form.$("members").add({ key: "custom", name: "B" });

      expect(form.$("members").fields.has("custom")).to.equal(true);
      expect(form.$("members").$("custom").$("name").value).to.equal("B");
    });
  });

  describe("follow-ups", () => {
    it("marks the form dirty when fields.move() is called directly", () => {
      const form = new Form({
        struct: ["members[].name"],
        values: { members: [{ name: "A" }, { name: "B" }] },
      });

      form.$("members").fields.move(0, 1);

      expect(form.values()).to.deep.equal({
        members: [{ name: "B" }, { name: "A" }],
      });
      expect(form.$("members").isDirty).to.equal(true);
      expect(form.isDirty).to.equal(true);
      expect(form.isPristine).to.equal(false);
    });

    it("marks the form dirty on soft delete", () => {
      const form = new Form(
        { struct: ["email", "phone"] },
        { options: { softDelete: true } },
      );

      form.del("email");

      expect(form.$("email").deleted).to.equal(true);
      expect(form.$("email").isDirty).to.equal(true);
      expect(form.$("email").isPristine).to.equal(false);
      expect(form.isDirty).to.equal(true);
      expect(form.isPristine).to.equal(false);
    });
  });

  describe("regressions", () => {
    it("keeps the form pristine when nothing changes", () => {
      const form = new Form({
        struct: ["members[].name"],
        values: { members: [{ name: "A" }, { name: "B" }] },
      });

      expect(form.isDirty).to.equal(false);
      expect(form.isPristine).to.equal(true);
      expect(form.$("members").isDirty).to.equal(false);
      expect(form.$("members").isPristine).to.equal(true);
    });

    it("does not alter the dirty state of untouched nested fields", () => {
      const form = new Form({
        struct: ["members[].name", "other"],
        values: { members: [{ name: "A" }], other: "x" },
      });

      expect(form.isDirty).to.equal(false);
      expect(form.isPristine).to.equal(true);
    });
  });
});
