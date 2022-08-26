import { assertEquals } from "../dev-deps.ts";
import { castBoolean, stringify } from "./operations.ts";
import { isArray, isFunction, isNumber, isString } from "./primitives.ts";

Deno.test("isString()", () => {
  assertEquals(evalAsBool(isString(stringify("hello world!"))), true);
  assertEquals(evalAsBool(isString(true)), false);
  assertEquals(evalAsBool(isString(42)), false);
  assertEquals(evalAsBool(isString("['a','b','c']")), false);
  assertEquals(evalAsBool(isString("String")), false);
});

Deno.test("isNumber()", () => {
  assertEquals(evalAsBool(isNumber(stringify("hello world!"))), false);
  assertEquals(evalAsBool(isNumber(true)), false);
  assertEquals(evalAsBool(isNumber(42)), true);
  assertEquals(evalAsBool(isNumber("[1,2,3]")), false);
  assertEquals(evalAsBool(isNumber("Number")), false);
});

Deno.test("isArray()", () => {
  assertEquals(evalAsBool(isArray(stringify("hello world!"))), false);
  assertEquals(evalAsBool(isArray(true)), false);
  assertEquals(evalAsBool(isArray(42)), false);
  assertEquals(evalAsBool(isArray("[1,'a',false]")), true);
  assertEquals(evalAsBool(isArray("Array")), false);
});

Deno.test("isFunction()", () => {
  assertEquals(evalAsBool(isFunction(stringify("hello world!"))), false);
  assertEquals(evalAsBool(isFunction(true)), false);
  assertEquals(evalAsBool(isFunction(42)), false);
  assertEquals(evalAsBool(isFunction("[]")), false);
  assertEquals(evalAsBool(isFunction("Function")), true);
});

function evalAsBool(expression: string): boolean {
  return eval(castBoolean(expression));
}
