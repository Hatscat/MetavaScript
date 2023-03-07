import { actions, dispatch } from "../data-store/mutator.ts";
import {
  abortIf,
  defineFunc,
  execFunc,
  ifThen,
  not,
  prop,
  statements,
} from "../deps.ts";
import { isGameOver, isPlaying } from "../rules/game.ts";
import { canvasContext, functions, params } from "../variables.ts";
import { gameOverLoop } from "./game-over-loop.ts";
import { playLoop } from "./play-loop.ts";

export function defineGameLoop() {
  return defineFunc(functions.gameLoop, {
    args: [params.time],
    body: statements(
      // loop logic
      execFunc("requestAnimationFrame", functions.gameLoop),
      abortIf(not(prop("window", canvasContext))),
      // actions
      dispatch(actions.setTime(params.time)),
      ifThen(isPlaying(), playLoop()),
      ifThen(isGameOver(), gameOverLoop()),
    ),
  });
}