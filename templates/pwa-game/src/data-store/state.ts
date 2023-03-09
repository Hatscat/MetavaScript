import { config } from "../config.ts";
import { div, generateTmpVarName, List, sub } from "../deps.ts";

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
  pointer: {
    y: "0",
  },
  player: {
    radius: String(config.player.radius),
    pos: {
      x: String(config.player.positionX),
      y: "0",
    },
    dir: "0",
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
      get y(): string {
        return div(generateTmpVarName("state.canvas.height"), 2);
      },
    },
    hp: String(config.target.hp),
    recoverTime: "0",
  },
} as const;

export type State = typeof initialState;
