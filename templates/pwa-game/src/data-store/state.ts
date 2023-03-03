import { config } from "../config.ts";
import { generateTmpVarName, List, sub } from "../deps.ts";

export const enum GameState {
  Play = "1",
  GameOver = "2",
}

export const initialState = {
  gameState: GameState.Play,
  time: "0",
  canvas: {
    width: "innerWidth",
    height: sub("innerHeight", config.headerHeight),
  },
  player: {
    radius: String(config.player.radius),
    pos: {
      x: String(config.player.positionX),
      y: "0",
    },
    bullets: List(),
  },
  target: {
    pos: {
      get x(): string {
        return sub(
          generateTmpVarName("state.canvas.width"),
          config.target.offsetX,
        );
      },
      y: "0",
    },
  },
} as const;

export type State = typeof initialState;
