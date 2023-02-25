import { assertEquals } from "../dev-deps.ts";
import { add, pow } from "./operations.ts";
import { assign, defineFunc, execFunc, ifThen } from "./statements.ts";

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

Deno.test("execFunc()", () => {
  assertEquals(execFunc("f"), "f()");

  assertEquals(execFunc("f", 2), "f(2)");

  assertEquals(execFunc("f", ["a", "'b'"]), "f(a,'b')");

  assertEquals(execFunc("f", "test", { isTemplateLiteral: true }), "f`test`");

  assertEquals(
    execFunc(
      defineFunc("f", {
        args: ["n"],
        body: add("n", "n"),
        safe: false,
      }),
      42,
    ),
    "(f=n=>n+n)(42)",
  );

  assertEquals(execFunc("function t(){i++}"), "(function t(){i++})()");
});

Deno.test("ifThen()", () => {
  assertEquals(ifThen("state==0", "render()"), "if(state==0)render()");

  assertEquals(
    ifThen("state==0", "a=8;b=9;render(a,b)"),
    "if(state==0){a=8;b=9;render(a,b)}",
  );
});
