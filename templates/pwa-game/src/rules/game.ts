import { config } from "../config.ts";
import { GameState } from "../data-store/state.ts";
import {
  and,
  group,
  isEqual,
  isGreater,
  isLess,
  mul,
  pow,
  prop,
  sub,
} from "../deps.ts";
import { state } from "../variables.ts";

export function isPlayState(): string {
  return isEqual(state.gameState, GameState.Play);
}

export function isGameOverState(): string {
  return isEqual(state.gameState, GameState.GameOver);
}

export function isTheGameOver(): string {
  return isLess(state.target.hp, 1);
}

export function canPlayerMove(): string {
  return isGreater(
    mul(state.player.dir, state.player.dir),
    state.player.radius,
  );
}

export function shouldTheBulletBeKept(bullet: string): string {
  return isLess(prop(bullet, "x"), state.canvas.width);
}

export function doesTheBulletHitTheTarget(bullet: string): string {
  const radius2 = config.target.radius * config.target.radius;

  return and(
    isLess(
      pow(group(sub(state.target.pos.y, prop(bullet, "y"))), 2),
      radius2,
    ),
    isLess(
      pow(group(sub(state.target.pos.x, prop(bullet, "x"))), 2),
      radius2,
    ),
  );
}
