import { assertEquals } from "../dev-deps.ts";
import { add, pow, sub } from "./operations.ts";
import { assign, defineFunc, execFunc, ifThen } from "./statements.ts";

Deno.test("defineFunc()", () => {
  assertEquals(
    defineFunc({
      name: "a",
      body: 42,
    }),
    "a=_=>(42)",
  );
  assertEquals(
    defineFunc({
      body: 42,
      safe: false,
    }),
    "_=>42",
  );
  assertEquals(
    defineFunc({
      name: "f",
      args: ["a", "b"],
      body: [assign("b", pow("a", "a")), add("a", "b")],
      safe: false,
    }),
    "f=(a,b)=>b=a**a,a+b",
  );
});

Deno.test("execFunc()", () => {
  assertEquals(execFunc("f"), "f()");

  assertEquals(execFunc("f", 2), "f(2)");

  assertEquals(execFunc("f", ["a", "'b'"]), "f(a,'b')");

  assertEquals(execFunc("f", "test", { isTemplateLiteral: true }), "f`test`");

  assertEquals(
    execFunc(
      defineFunc({
        name: "f",
        args: ["n"],
        body: add("n", "n"),
        safe: false,
      }),
      42,
    ),
    "(f=n=>n+n)(42)",
  );

  assertEquals(execFunc("function t(){i++}"), "(function t(){i++})()");

  assertEquals(
    execFunc(
      defineFunc({ args: ["x", "y"], body: sub("x", "y"), safe: false }),
      [1, 2],
    ),
    "((x,y)=>x-y)(1,2)",
  );
});

Deno.test("ifThen()", () => {
  assertEquals(ifThen("state==0", "render()"), "if(state==0)render()");

  assertEquals(
    ifThen("state==0", "a=8;b=9;render(a,b)"),
    "if(state==0){a=8;b=9;render(a,b)}",
  );
});
