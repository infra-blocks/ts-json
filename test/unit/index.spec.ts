import { expect } from "@infra-blocks/test";
import { expectTypeOf } from "expect-type";
import { Json, json } from "../../src/index.js";

describe("json", function () {
  describe(json.parse.name, function () {
    describe("primitive", function () {
      it("should work with a number", function () {
        const parsed = json.parse("5");
        expect(parsed).to.equal(5);
        expectTypeOf(parsed).toEqualTypeOf<Json>();
      });
      it("should work with a string", function () {
        const parsed = json.parse('"toto"');
        expect(parsed).to.equal("toto");
        expectTypeOf(parsed).toEqualTypeOf<Json>();
      });
      it("should work with a boolean", function () {
        const parsed = json.parse("true");
        expect(parsed).to.be.true;
        expectTypeOf(parsed).toEqualTypeOf<Json>();
      });
      it("should work with null", function () {
        const parsed = json.parse("null");
        expect(parsed).to.be.null;
        expectTypeOf(parsed).toEqualTypeOf<Json>();
      });
      it("should throw for empty string", function () {
        expect(() => json.parse("")).to.throw();
      });
      it("should throw for undefined", function () {
        expect(() => json.parse("undefined")).to.throw();
      });
      it("should throw for Inifinity", function () {
        expect(() => json.parse("Infinity")).to.throw();
      });
    });
    describe("array", function () {
      it("should work with an empty array", function () {
        const parsed = json.parse("[]");
        expect(parsed).to.deep.equal([]);
        expectTypeOf(parsed).toEqualTypeOf<Json>();
      });
      it("should work with a complex array", function () {
        const value = [1, "string", false, null, ["nested", { object: "yes" }]];
        const parsed = json.parse(JSON.stringify(value));
        expect(parsed).to.deep.equal(value);
        expectTypeOf(parsed).toEqualTypeOf<Json>();
      });
    });
    describe("object", function () {
      it("should work with empty object", function () {
        const parsed = json.parse("{}");
        expect(parsed).to.deep.equal({});
        expectTypeOf(parsed).toEqualTypeOf<Json>();
      });
      it("should work with a complex object", function () {
        const value = {
          number: 1,
          string: "string",
          boolean: false,
          null: null,
          array: ["nested", { object: "yes" }],
          nested: {
            please: "stop",
          },
        };
        const parsed = json.parse(JSON.stringify(value));
        expect(parsed).to.deep.equal(value);
        expectTypeOf(parsed).toEqualTypeOf<Json>();
      });
    });
    describe("with reviver", function () {
      it("should work with a reviver", function () {
        const value = {
          key: "value",
        };
        expect(
          json.parse(JSON.stringify(value), (key, parsed: Json) => {
            if (key === "key") {
              return (parsed as string).toUpperCase();
            }
            // Otherwise, return the final version.
            return parsed;
          })
        ).to.deep.equal({
          key: "VALUE",
        });
      });
    });
  });
  describe(json.stringify.name, function () {
    it("should work with undefined", function () {
      expect(json.stringify(undefined)).to.be.undefined;
    });
    it("should work with a complex object", function () {
      const value = {
        number: 1,
        string: "string",
        boolean: false,
        null: null,
        array: ["nested", { object: "yes" }],
        nested: {
          please: "stop",
        },
      };
      expect(json.stringify(value)).to.equal(JSON.stringify(value));
    });
  });
});
