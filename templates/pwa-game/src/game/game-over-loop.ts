import {
  assign,
  div,
  execFunc,
  font,
  prop,
  statements,
  Text,
} from "../deps.ts";
import { canvasContext, state } from "../variables.ts";

export function gameOverLoop(): string {
  return statements(
    assign(prop(canvasContext, "globalAlpha"), ".006"),
    drawBackground(),
    drawMessage(),
  );
}

function drawBackground(): string {
  return statements(
    assign(prop(canvasContext, "fillStyle"), Text("#422")),
    execFunc(prop(canvasContext, "fillRect"), [
      0,
      0,
      state.canvas.width,
      state.canvas.height,
    ]),
  );
}

function drawMessage(): string {
  return statements(
    assign(prop(canvasContext, "fillStyle"), Text("#EFF")),
    assign(
      prop(canvasContext, "font"),
      Text(font(16, "vw")),
    ),
    execFunc(prop(canvasContext, "fillText"), [
      Text("VICTORY"),
      div(state.canvas.width, 2),
      div(state.canvas.height, 3),
    ]),
  );
}
