import { config } from "../config.ts";
import {
  ActionBase,
  add,
  assign,
  createActionDispatch,
  div,
  execFunc,
  ifElse,
  ifThen,
  increment,
  isGreater,
  minus,
  mul,
  prop,
  Record,
  statements,
  sub,
} from "../deps.ts";
import { canPlayerMove } from "../rules/game.ts";
import { state } from "../variables.ts";
import { State } from "./state.ts";

enum ActionType {
  SetTime,
  SetPointer,
  MoveBullets,
  MoveTarget,
  MovePlayer,
  FirePlayerBullet,
}

interface SetTime extends ActionBase<ActionType> {
  type: ActionType.SetTime;
  payload: { time: string };
}

interface SetPointer extends ActionBase<ActionType> {
  type: ActionType.SetPointer;
  payload: { y: string };
}

interface MoveTarget extends ActionBase<ActionType> {
  type: ActionType.MoveTarget;
}

interface MovePlayer extends ActionBase<ActionType> {
  type: ActionType.MovePlayer;
}

interface FirePlayerBullet extends ActionBase<ActionType> {
  type: ActionType.FirePlayerBullet;
}

type Action =
  | SetTime
  | SetPointer
  | MoveTarget
  | MovePlayer
  | FirePlayerBullet;

export const actions = {
  setTime: (time: string): SetTime => ({
    type: ActionType.SetTime,
    payload: { time },
  }),
  setPointer: (y: string): SetPointer => ({
    type: ActionType.SetPointer,
    payload: { y },
  }),
  moveTarget: (): MoveTarget => ({
    type: ActionType.MoveTarget,
  }),
  movePlayer: (): MovePlayer => ({
    type: ActionType.MovePlayer,
  }),
  firePlayerBullet: (): FirePlayerBullet => ({
    type: ActionType.FirePlayerBullet,
  }),
} as const;

function mutator(state: State, action: Action): string {
  switch (action.type) {
    case ActionType.SetTime: {
      return assign(state.time, action.payload.time);
    }
    case ActionType.SetPointer: {
      return assign(state.pointer.y, action.payload.y);
    }
    case ActionType.MoveTarget: {
      return assign(
        state.target.pos.y,
        add(
          div(state.canvas.height, 2),
          mul(
            div(state.canvas.height, 3),
            execFunc(prop("Math", "sin"), div(state.time, config.target.speed)),
          ),
        ),
      );
    }
    case ActionType.MovePlayer: {
      return statements(
        assign(
          state.player.dir,
          sub(state.pointer.y, state.player.pos.y),
        ),
        ifThen(
          canPlayerMove(),
          increment(
            state.player.pos.y,
            ifElse(
              isGreater(state.player.dir, 0),
              String(config.player.speed),
              minus(config.player.speed),
            ),
          ),
        ),
      );
    }
    case ActionType.FirePlayerBullet: {
      return execFunc(
        prop(state.player.bullets, "push"),
        Record({
          x: add(state.player.pos.x, state.player.radius),
          y: state.player.pos.y,
        }),
      );
    }
  }
}

export const dispatch = createActionDispatch(state, mutator);
