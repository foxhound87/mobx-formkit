import { expect } from "chai";
import { Form } from "../../src";

/**
 * `reset()` on an array container goes back to its reset target, and an array
 * written with `onChange()` is applied to the nested fields.
 */
describe("array containers", () => {
  const struct = ["name", "rows[].day", "rows[].time"];
  const data = {
    name: "Week",
    rows: [
      { day: 1, time: "08:00" },
      { day: 2, time: "09:00" },
    ],
  };

  describe("reset() on an array container", () => {
    it("rebuilds the nested fields from the default when it differs from the initial", () => {
      const form = new Form({
        struct,
        initials: { rows: [{ day: 1, time: "08:00" }] },
        defaults: { rows: [] },
      });

      form.$("rows").add({ day: 2, time: "09:00" });
      form.reset();

      expect(form.$("rows").value).to.deep.equal([]);
      expect(form.$("rows").fields.size).to.equal(0);
    });

    it("rebuilds the nested fields from an initial and a default set after creation", () => {
      const form = new Form({ struct });

      form.update(data);
      form.$("rows").set("initial", data.rows);
      form.$("rows").set("default", [...data.rows]);
      form.$("rows").add({ day: 3, time: "10:00" });
      form.reset();

      expect(form.$("rows").value).to.deep.equal(data.rows);
      expect(form.$("rows").fields.size).to.equal(2);
    });

    it("restores the declared initials after a nested field is deleted", () => {
      const form = new Form({ struct, initials: data });

      form.$("rows").del(0);
      form.reset();

      expect(form.values()).to.deep.equal(data);
      expect(form.isDirty).to.equal(false);
    });

    it("drops the nested fields added by update()", () => {
      const form = new Form({ struct });

      form.update(data);
      form.reset();

      expect(form.$("rows").fields.size).to.equal(0);
      expect(form.values()).to.deep.equal(new Form({ struct }).values());
    });
  });

  describe("an array written to an array container", () => {
    for (const [label, opts, path] of [
      ["at the top level", { struct: ["ids[]"], values: { ids: [1, 2] } }, "ids"],
      [
        "nested in a row",
        { struct: ["rows[].ids[]"], values: { rows: [{ ids: [1, 2] }] } },
        "rows.0.ids",
      ],
    ] as const) {
      it(`follows the written values after an empty array, ${label}`, () => {
        const form = new Form(opts as any);
        const field = form.$(path);

        field.onChange([]);
        expect(field.value).to.deep.equal([]);
        expect(form.isDirty).to.equal(true);

        field.onChange([5, 6]);
        expect(field.value).to.deep.equal([5, 6]);
        expect(field.fields.size).to.equal(2);

        field.onChange([6]);
        expect(field.value).to.deep.equal([6]);

        form.reset();
        expect(form.$(path).value).to.deep.equal([1, 2]);
        expect(form.isDirty).to.equal(false);
      });
    }

    for (const [label, opts, path, steps] of [
      ["after a value is added and removed", { struct: ["ids[]"], values: { ids: [1] } }, "ids", [[1, 2], [1]]],
      ["after an empty array and back", { struct: ["ids[]"], values: { ids: [1, 2] } }, "ids", [[], [1, 2]]],
      [
        "after a row is added and removed",
        { struct: ["rows[].day"], values: { rows: [{ day: 1 }] } },
        "rows",
        [[{ day: 1 }, { day: 2 }], [{ day: 1 }]],
      ],
      [
        "in a row, after an empty array and back",
        { struct: ["rows[].ids[]"], values: { rows: [{ ids: [1, 2] }] } },
        "rows.0.ids",
        [[], [1, 2]],
      ],
    ] as const) {
      it(`is pristine again when the values return to the starting ones, ${label}`, () => {
        const form = new Form(opts as any);
        const [changed, original] = steps as any;

        form.$(path).onChange(changed);
        expect(form.isDirty).to.equal(true);

        form.$(path).onChange(original);
        expect(form.$(path).value).to.deep.equal(original);
        expect(form.isDirty).to.equal(false);
      });
    }

    it("creates the nested fields of an empty array container", () => {
      const form = new Form({ struct: ["ids[]"] });

      form.$("ids").onChange([7]);

      expect(form.$("ids").fields.size).to.equal(1);
      expect(form.$("ids").value).to.deep.equal([7]);
      expect(form.isDirty).to.equal(true);
    });
  });
});
