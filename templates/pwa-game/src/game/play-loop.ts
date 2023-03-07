import { config } from "../config.ts";
import { actions, dispatch } from "../data-store/mutator.ts";
import {
  assign,
  defineFunc,
  execFunc,
  prop,
  statements,
  Text,
} from "../deps.ts";
import { canvasContext, params, state } from "../variables.ts";

export function playLoop(): string {
  return statements(
    // Updates
    dispatch(actions.setTime(params.time)),
    dispatch(actions.moveTarget()),
    dispatch(actions.movePlayer()),
    dispatch(actions.moveBullets()),
    // Render
    drawBackground(),
    // drawTime(),
    drawPlayer(),
    drawTarget(),
    drawBullets(),
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

function drawBullets(): string {
  return statements(
    assign(
      prop(canvasContext, "font"),
      Text(`${config.bullet.radius * 2}px A`),
    ),
    execFunc(
      prop(state.player.bullets, "forEach"),
      defineFunc(null, {
        args: [params.item],
        body: execFunc(prop(canvasContext, "fillText"), [
          config.bullet.icon,
          prop(params.item, "x"),
          prop(params.item, "y"),
        ]),
        safe: false,
      }),
    ),
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
