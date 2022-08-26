import { assertEquals } from "../dev-deps.ts";
import { add, decrement, increment, loop } from "./operations.ts";
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
