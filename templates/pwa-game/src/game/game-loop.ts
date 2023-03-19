import {
  abortIf,
  defineFunc,
  execFunc,
  ifThen,
  not,
  prop,
  statements,
} from "../deps.ts";
import { isGameOverState, isPlayState } from "../rules/game.ts";
import { canvasContext, functions, params } from "../variables.ts";
import { gameOverLoop } from "./game-over-loop.ts";
import { playLoop } from "./play-loop.ts";

export function defineGameLoop() {
  return defineFunc({
    name: functions.gameLoop,
    args: [params.time],
    body: statements(
      // loop logic
      execFunc("requestAnimationFrame", functions.gameLoop),
      abortIf(not(prop("window", canvasContext))),
      // game states
      ifThen(isPlayState(), playLoop()),
      ifThen(isGameOverState(), gameOverLoop()),
    ),
  });
}
