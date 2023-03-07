import { assertEquals } from "../dev-deps.ts";
import { castBoolean } from "./operations.ts";
import {
  checkIfArray,
  checkIfFunction,
  checkIfNumber,
  checkIfString,
  List,
  Record,
  Text,
} from "./primitives.ts";

Deno.test("isString()", () => {
  assertEquals(evalAsBool(checkIfString(Text("hello world!"))), true);
  assertEquals(evalAsBool(checkIfString(true)), false);
  assertEquals(evalAsBool(checkIfString(42)), false);
  assertEquals(evalAsBool(checkIfString(List(Text("a"), Text("b")))), false);
  assertEquals(evalAsBool(checkIfString("String")), false);
});

Deno.test("isNumber()", () => {
  assertEquals(evalAsBool(checkIfNumber(Text("hello world!"))), false);
  assertEquals(evalAsBool(checkIfNumber(true)), false);
  assertEquals(evalAsBool(checkIfNumber(42)), true);
  assertEquals(evalAsBool(checkIfNumber(List(1, 2, 3))), false);
  assertEquals(evalAsBool(checkIfNumber("Number")), false);
});

Deno.test("isArray()", () => {
  assertEquals(evalAsBool(checkIfArray(Text("hello world!"))), false);
  assertEquals(evalAsBool(checkIfArray(true)), false);
  assertEquals(evalAsBool(checkIfArray(42)), false);
  assertEquals(evalAsBool(checkIfArray(List(1, Text("a"), false))), true);
  assertEquals(evalAsBool(checkIfArray("Array")), false);
});

Deno.test("isFunction()", () => {
  assertEquals(evalAsBool(checkIfFunction(Text("hello world!"))), false);
  assertEquals(evalAsBool(checkIfFunction(true)), false);
  assertEquals(evalAsBool(checkIfFunction(42)), false);
  assertEquals(evalAsBool(checkIfFunction(List())), false);
  assertEquals(evalAsBool(checkIfFunction("Function")), true);
});

Deno.test("Record()", () => {
  // Given
  const anOject = {
    abc: 1,
    cbd: [true, 2, Text("AAA"), null],
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
          a: Text("true"),
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
