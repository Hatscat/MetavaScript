import { assertEquals } from "../dev-deps.ts";
import { castBoolean } from "./operations.ts";
import {
  isArray,
  isFunction,
  isNumber,
  isString,
  List,
  Record,
  Text,
} from "./primitives.ts";

Deno.test("isString()", () => {
  assertEquals(evalAsBool(isString(Text("hello world!"))), true);
  assertEquals(evalAsBool(isString(true)), false);
  assertEquals(evalAsBool(isString(42)), false);
  assertEquals(evalAsBool(isString(List(Text("a"), Text("b")))), false);
  assertEquals(evalAsBool(isString("String")), false);
});

Deno.test("isNumber()", () => {
  assertEquals(evalAsBool(isNumber(Text("hello world!"))), false);
  assertEquals(evalAsBool(isNumber(true)), false);
  assertEquals(evalAsBool(isNumber(42)), true);
  assertEquals(evalAsBool(isNumber(List(1, 2, 3))), false);
  assertEquals(evalAsBool(isNumber("Number")), false);
});

Deno.test("isArray()", () => {
  assertEquals(evalAsBool(isArray(Text("hello world!"))), false);
  assertEquals(evalAsBool(isArray(true)), false);
  assertEquals(evalAsBool(isArray(42)), false);
  assertEquals(evalAsBool(isArray(List(1, Text("a"), false))), true);
  assertEquals(evalAsBool(isArray("Array")), false);
});

Deno.test("isFunction()", () => {
  assertEquals(evalAsBool(isFunction(Text("hello world!"))), false);
  assertEquals(evalAsBool(isFunction(true)), false);
  assertEquals(evalAsBool(isFunction(42)), false);
  assertEquals(evalAsBool(isFunction(List())), false);
  assertEquals(evalAsBool(isFunction("Function")), true);
});

Deno.test("Record()", () => {
  // Given
  const anOject = {
    abc: 1,
    cbd: [true, 2, "AAA", null],
    fds: {
      aze: 42,
      vcs: [
        {
          aze: [1, 2, [345, [6, 7]]],
        },
        undefined,
        false,
      ],
      ert: {
        hjk: {
          a: "true",
        },
      },
    },
  };

  // Then
  const expected =
    "{abc:1,cbd:[true,2,'AAA',null],fds:{aze:42,vcs:[{aze:[1,2,[345,[6,7]]]},undefined,false],ert:{hjk:{a:'true'}}}}";
  assertEquals(Record(anOject), expected);
});

function evalAsBool(expression: string): boolean {
  return eval(castBoolean(expression));
}
