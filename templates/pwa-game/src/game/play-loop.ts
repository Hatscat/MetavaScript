import { config } from "../config.ts";
import { actions, dispatch } from "../data-store/mutator.ts";
import {
  assign,
  castInt,
  defineFunc,
  div,
  execFunc,
  prop,
  scope,
  statements,
  sub,
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
    dispatch(actions.collideBullets()),
    dispatch(actions.clearOutOfScreenBullets()),
    // ifThen(isGameOver(),dispatch(actions.goToGameOver))

    // Render
    drawBackground(),
    drawTime(),
    drawPlayer(),
    drawTarget(),
    drawBullets(),
  );
}

function drawBackground(): string {
  return statements(
    assign(prop(canvasContext, "fillStyle"), Text("#000")),
    execFunc(prop(canvasContext, "fillRect"), [
      0,
      0,
      state.canvas.width,
      state.canvas.height,
    ]),
  );
}

function drawTime(): string {
  return statements(
    assign(prop(canvasContext, "fillStyle"), Text("#EEE")),
    assign(
      prop(canvasContext, "font"),
      Text(config.timer.font),
    ),
    execFunc(prop(canvasContext, "fillText"), [
      castInt(div(state.time, "1e3")),
      div(state.canvas.width, 2),
      config.timer.offsetY,
    ]),
  );
}

function drawBullets(): string {
  const fontSize = config.bullet.radius * 2;

  return statements(
    assign(
      prop(canvasContext, "font"),
      Text(`${fontSize}px A`),
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
  const fontSize = config.target.radius * 2;

  return statements(
    assign(
      prop(canvasContext, "font"),
      Text(`${fontSize}px A`),
    ),
    assign(
      prop(canvasContext, "shadowColor"),
      Text("red"),
    ),
    assign(
      prop(canvasContext, "shadowBlur"),
      div(
        scope("(", sub(state.target.recoverTime, state.time)),
        9,
      ),
    ),
    execFunc(prop(canvasContext, "fillText"), [
      config.target.icon,
      state.target.pos.x,
      state.target.pos.y,
    ]),
    assign(prop(canvasContext, "shadowBlur"), 0),
  );
}

function drawPlayer(): string {
  const fontSize = config.player.radius * 2;

  return statements(
    assign(
      prop(canvasContext, "font"),
      Text(`${fontSize}px A`),
    ),
    execFunc(prop(canvasContext, "fillText"), [
      config.player.icon,
      state.player.pos.x,
      state.player.pos.y,
    ]),
  );
}
