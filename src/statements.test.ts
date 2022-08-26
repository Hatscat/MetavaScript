import { assertEquals } from "../dev-deps.ts";
import { add, pow } from "./operations.ts";
import { assign, defineFunc } from "./statements.ts";

Deno.test("defineFunc()", () => {
  assertEquals(
    defineFunc("a", {
      body: 42,
    }),
    "a=_=>(42)",
  );
  assertEquals(
    defineFunc("f", {
      args: ["a", "b"],
      body: [assign("b", pow("a", "a")), add("a", "b")],
      safe: false,
    }),
    "f=(a,b)=>b=a**a,a+b",
  );
});
