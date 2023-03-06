import { config } from "../config.ts";
import { assign, execFunc, prop, statements, Text } from "../deps.ts";
import { canvasContext, state } from "../variables.ts";

export function playLoop(): string {
  return statements(
    // TODO: rules + actions first there
    drawBackground(),
    drawTarget(),
    // drawBullets(),
    drawPlayer(),
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

function drawTarget(): string {
  return statements(
    assign(
      prop(canvasContext, "font"),
      Text(`${config.target.radius * 2}px A`),
    ),
    execFunc(prop(canvasContext, "fillText"), [
      config.target.icon,
      state.target.pos.x,
      state.target.pos.y,
    ]),
  );
}

function drawPlayer(): string {
  return statements(
    assign(
      prop(canvasContext, "font"),
      Text(`${config.player.radius * 2}px A`),
    ),
    execFunc(prop(canvasContext, "fillText"), [
      config.player.icon,
      state.player.pos.x,
      state.player.pos.y,
    ]),
  );
}
