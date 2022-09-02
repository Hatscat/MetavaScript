import { assertEquals } from "../../dev-deps.ts";
import { getJsType, JsType } from "./type.ts";

Deno.test("getJsType()", () => {
  assertEquals(getJsType(0), JsType.Number);
  assertEquals(getJsType(null), JsType.Null);
  assertEquals(getJsType(undefined), JsType.Undefined);
  assertEquals(getJsType(true), JsType.Boolean);
  assertEquals(getJsType(false), JsType.Boolean);
  assertEquals(getJsType(""), JsType.String);
  assertEquals(getJsType(Function), JsType.Function);
  assertEquals(getJsType([]), JsType.Array);
  assertEquals(getJsType({}), JsType.Object);
  assertEquals(getJsType(new Error("")), JsType.Error);
});
