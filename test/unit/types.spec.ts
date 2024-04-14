import { expectTypeOf } from "expect-type";
import { Json, JsonArray, JsonObject, JsonPrimitive } from "../../src/index.js";

describe("json", function () {
  describe("JsonPrimitive", function () {
    it("should compile for a number", function () {
      expectTypeOf(5).toMatchTypeOf<JsonPrimitive>();
    });
    it("should compile for a string", function () {
      expectTypeOf("hello").toMatchTypeOf<JsonPrimitive>();
    });
    it("should compile for a boolean", function () {
      expectTypeOf(true).toMatchTypeOf<JsonPrimitive>();
    });
    it("should compile for null", function () {
      expectTypeOf(null).toMatchTypeOf<JsonPrimitive>();
    });
    it("should not compile for undefined", function () {
      // @ts-expect-error - undefined is not a JsonPrimitive.
      expectTypeOf(undefined).toMatchTypeOf<JsonPrimitive>();
    });
    it("should not compile for a Symbol", function () {
      // @ts-expect-error - undefined is not a JsonPrimitive.
      expectTypeOf<symbol>().toMatchTypeOf<JsonPrimitive>();
    });
    it("should not compile of an array", function () {
      // @ts-expect-error - array is not a JsonPrimitive.
      expectTypeOf([]).toMatchTypeOf<JsonPrimitive>();
    });
    it("should not compile for an object", function () {
      // @ts-expect-error - object is not a JsonPrimitive.
      expectTypeOf({}).toMatchTypeOf<JsonPrimitive>();
    });
  });
  describe("JsonArray", function () {
    it("should compile for an empty array", function () {
      expectTypeOf([]).toMatchTypeOf<JsonArray>();
    });
    it("should compile for a complex array", function () {
      const value = [1, "string", false, null, ["nested", { object: "yes" }]];
      expectTypeOf(value).toMatchTypeOf<JsonArray>();
    });
    it("should not compile for a string", function () {
      // @ts-expect-error - string is not a JsonArray.
      expectTypeOf("hello").toMatchTypeOf<JsonArray>();
    });
    it("should not compile for an object", function () {
      // @ts-expect-error - object is not a JsonArray.
      expectTypeOf({}).toMatchTypeOf<JsonArray>();
    });
  });
  describe("JsonObject", function () {
    it("should compile for an empty object", function () {
      expectTypeOf({}).toMatchTypeOf<JsonObject>();
    });
    it("should compile for a complex object", function () {
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
      expectTypeOf(value).toMatchTypeOf<JsonObject>();
    });
    it("should not compile for a string", function () {
      // @ts-expect-error - string is not a JsonObject.
      expectTypeOf("hello").toMatchTypeOf<JsonObject>();
    });
    it("should not compile for an array", function () {
      // @ts-expect-error - string is not a JsonObject.
      expectTypeOf([]).toMatchTypeOf<JsonObject>();
    });
  });
  describe("Json", function () {
    it("should compile for a primitive", function () {
      expectTypeOf(42).toMatchTypeOf<Json>();
    });
    it("should compile for an array", function () {
      const value = [1, "string", false, null, ["nested", { object: "yes" }]];
      expectTypeOf(value).toMatchTypeOf<Json>();
    });
    it("should compile for an object", function () {
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
      expectTypeOf(value).toMatchTypeOf<Json>();
    });
    it("should not compile for a map", function () {
      // @ts-expect-error - map is not Json.
      expectTypeOf(new Map()).toMatchTypeOf<Json>();
    });
  });
});
