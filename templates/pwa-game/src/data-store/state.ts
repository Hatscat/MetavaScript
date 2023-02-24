import { config } from "../config.ts";
import { List, sub } from "../deps.ts";

export const enum GameState {
  Pause = 0,
  Play = 1,
  GameOver = 2,
}

export const initialState = {
  gameState: GameState.Pause,
  canvas: {
    width: "innerWidth",
    height: sub("innerHeight", config.headerHeight),
  },
  player: {
    pos: {
      x: 0,
      y: 0,
    },
    bullets: List(),
  },
  target: {
    pos: {
      x: 0,
      y: 0,
    },
    speed: 2,
  },
} as const;

export type State = typeof initialState;
