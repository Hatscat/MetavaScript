import { assign, execFunc, prop, statements, Text } from "../deps.ts";
import { canvasContext, state } from "../variables.ts";

export function gameOverLoop(): string {
  return statements(drawBackground());
}

function drawBackground(): string {
  return statements(
    assign(prop(canvasContext, "fillStyle"), Text("#733")),
    execFunc(prop(canvasContext, "fillRect"), [
      0,
      0,
      state.canvas.width,
      state.canvas.height,
    ]),
  );
}
