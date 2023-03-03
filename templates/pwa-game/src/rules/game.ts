import { GameState } from "../data-store/state.ts";
import { isEqual, isGreater, isLower, sub } from "../deps.ts";
import { state } from "../variables.ts";

export function isPlaying(): string {
  return isEqual(state.gameState, GameState.Play);
}

export function isGameOver(): string {
  return isEqual(state.gameState, GameState.GameOver);
}

export function canPlayerMoveUp(): string {
  return isGreater(state.player.pos.y, state.player.radius);
}

export function canPlayerMoveDown(): string {
  return isLower(
    state.player.pos.y,
    sub(state.canvas.height, state.player.radius),
  );
}
