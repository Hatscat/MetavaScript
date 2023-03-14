import { assertEquals } from "../dev-deps.ts";
import { add, decrement, group, increment, loop, quote } from "./operations.ts";
import { assign, execFunc } from "./statements.ts";

Deno.test("loop()", () => {
  const x = "x", y = "y", z = "z";
  assertEquals(
    loop({
      init: [
        assign(x, 0),
        assign(y, 3),
      ],
      condition: [increment(x), decrement(y)],
      body: [assign(z, add(x, y)), execFunc("console.log", z)],
      body2: [assign("style", "'#color'"), execFunc("draw", [x, y, z])],
    }),
    "for(x=0,y=3;x++,y--;style='#color',draw(x,y,z))z=x+y,console.log(z)",
  );
});

Deno.test("quote()", () => {
  assertEquals(quote("hello world!"), "'hello world!'");
  assertEquals(quote("hello world!", "'"), "'hello world!'");
  assertEquals(quote("hello world!", '"'), '"hello world!"');
  assertEquals(quote("hello world!", "`"), "`hello world!`");
  assertEquals(quote('hello "world"!'), `'hello "world"!'`);
});

Deno.test("group()", () => {
  assertEquals(group("1+2"), "(1+2)");
  assertEquals(group("1+2", ")"), "(1+2)");
  assertEquals(group("a=3;return", "}"), "{a=3;return}");
});
