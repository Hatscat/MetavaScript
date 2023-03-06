import { GameState } from "../data-store/state.ts";
import { isEqual, isGreater, mul } from "../deps.ts";
import { state } from "../variables.ts";

export function isPlaying(): string {
  return isEqual(state.gameState, GameState.Play);
}

export function isGameOver(): string {
  return isEqual(state.gameState, GameState.GameOver);
}

export function canPlayerMove(): string {
  return isGreater(
    mul(state.player.dir, state.player.dir),
    state.player.radius,
  );
}
