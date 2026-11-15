import { ArrayMap } from "../../src/ArrayMap";
import { expect } from "chai";

describe("ArrayMap.move", () => {
  let map: ArrayMap<string, string>;

  beforeEach(() => {
    map = new ArrayMap([
      ["a", "alpha"],
      ["b", "bravo"],
      ["c", "charlie"],
      ["d", "delta"],
      ["e", "echo"],
    ]);
  });

  describe("valid moves", () => {
    it("moves an entry from first to last index", () => {
      map.move(0, 4);
      expect([...map.keys()]).to.deep.equal(["b", "c", "d", "e", "a"]);
    });

    it("moves an entry from last to first index", () => {
      map.move(4, 0);
      expect([...map.keys()]).to.deep.equal(["e", "a", "b", "c", "d"]);
    });

    it("moves an entry forward within the middle", () => {
      map.move(1, 3);
      expect([...map.keys()]).to.deep.equal(["a", "c", "d", "b", "e"]);
    });

    it("moves an entry backward within the middle", () => {
      map.move(3, 1);
      expect([...map.keys()]).to.deep.equal(["a", "d", "b", "c", "e"]);
    });

    it("preserves all values after move", () => {
      map.move(0, 2);
      expect([...map.values()]).to.deep.equal([
        "bravo", "charlie", "alpha", "delta", "echo",
      ]);
    });
  });

  describe("guard clauses", () => {
    it("does nothing when fromIndex equals toIndex", () => {
      map.move(2, 2);
      expect([...map.keys()]).to.deep.equal(["a", "b", "c", "d", "e"]);
    });

    it("does nothing when fromIndex is negative", () => {
      map.move(-1, 2);
      expect([...map.keys()]).to.deep.equal(["a", "b", "c", "d", "e"]);
    });

    it("does nothing when fromIndex exceeds bounds", () => {
      map.move(10, 2);
      expect([...map.keys()]).to.deep.equal(["a", "b", "c", "d", "e"]);
    });

    it("does nothing when toIndex is negative", () => {
      map.move(2, -1);
      expect([...map.keys()]).to.deep.equal(["a", "b", "c", "d", "e"]);
    });

    it("does nothing when toIndex exceeds bounds", () => {
      map.move(2, 10);
      expect([...map.keys()]).to.deep.equal(["a", "b", "c", "d", "e"]);
    });
  });

  describe("single element map", () => {
    it("does nothing when moving a single element to itself", () => {
      const single = new ArrayMap([["x", "xray"]]);
      single.move(0, 0);
      expect([...single.values()]).to.deep.equal(["xray"]);
    });

    it("does nothing when fromIndex exceeds bounds on single element", () => {
      const single = new ArrayMap([["x", "xray"]]);
      single.move(0, 1);
      expect([...single.values()]).to.deep.equal(["xray"]);
    });
  });

  describe("two element map", () => {
    it("swaps first and last", () => {
      const pair = new ArrayMap([["x", "xray"], ["y", "yankee"]]);
      pair.move(0, 1);
      expect([...pair.keys()]).to.deep.equal(["y", "x"]);
    });

    it("swaps last and first", () => {
      const pair = new ArrayMap([["x", "xray"], ["y", "yankee"]]);
      pair.move(1, 0);
      expect([...pair.keys()]).to.deep.equal(["y", "x"]);
    });
  });

  describe("size consistency", () => {
    it("does not change size after move", () => {
      map.move(0, 4);
      expect(map.size).to.equal(5);
    });

    it("preserves entries count after multiple moves", () => {
      map.move(0, 3);
      map.move(3, 1);
      map.move(1, 4);
      expect(map.size).to.equal(5);
    });
  });

  describe("entry consistency", () => {
    it("preserves all entries after series of moves", () => {
      map.move(0, 2);
      map.move(3, 0);
      map.move(4, 1);
      const result = [...map.entries()].map(([k, v]) => `${k}:${v}`);
      expect(result.sort()).to.deep.equal([
        "a:alpha", "b:bravo", "c:charlie", "d:delta", "e:echo",
      ]);
    });
  });

  describe("merge / replace / iteration", () => {
    it("merges a plain object", () => {
      map.merge({ f: "foxtrot" });
      expect(map.get("f")).to.equal("foxtrot");
      expect(map.size).to.equal(6);
    });

    it("merges a map-like object", () => {
      const other = new ArrayMap<string, string>([["f", "foxtrot"]]);
      map.merge(other);
      expect(map.get("f")).to.equal("foxtrot");
      expect(map.size).to.equal(6);
    });

    it("ignores invalid merge sources", () => {
      map.merge(null);
      map.merge(42);
      expect(map.size).to.equal(5);
    });

    it("replaces the content", () => {
      map.replace({ x: "xray" });
      expect(map.size).to.equal(1);
      expect(map.get("x")).to.equal("xray");
    });

    it("is iterable", () => {
      expect([...map].map(([k]) => k)).to.deep.equal([
        "a", "b", "c", "d", "e",
      ]);
    });

    it("exposes a toString tag", () => {
      expect(map.toString()).to.equal("[object ArrayMap]");
    });

    it("serializes to a plain object", () => {
      expect(map.toJSON()).to.deep.equal({
        a: "alpha",
        b: "bravo",
        c: "charlie",
        d: "delta",
        e: "echo",
      });
    });
  });
});
