import { assign, execFunc, prop, statements, Text } from "../deps.ts";
import { canvasContext, state } from "../variables.ts";

export function playLoop(): string {
  return statements(
    // TODO: rules + actions first there
    drawBackground(),
    // drawTarget(),
    // drawBullets(),
    // drawPlayer(),
  );
}

function drawBackground(): string {
  return statements(
    assign(prop(canvasContext, "fillStyle"), Text("#111")),
    execFunc(prop(canvasContext, "fillRect"), [
      0,
      0,
      state.canvas.width,
      state.canvas.height,
    ]),
  );
}
