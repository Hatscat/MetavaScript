import { config } from "../config.ts";
import {
  ActionBase,
  assign,
  createActionDispatch,
  execFunc,
  ifElse,
  increment,
  isGreater,
  prop,
  Record,
  sub,
} from "../deps.ts";
import { state } from "../variables.ts";
import { State } from "./state.ts";

enum ActionType {
  SetTime,
  SetPointer,
  DirectPlayer,
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

interface DirectPlayer extends ActionBase<ActionType> {
  type: ActionType.DirectPlayer;
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
  | DirectPlayer
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
  directPlayer: (): DirectPlayer => ({
    type: ActionType.DirectPlayer,
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
    case ActionType.DirectPlayer: {
      return assign(
        state.player.dir,
        sub(state.pointer.y, state.player.pos.y),
      );
    }
    case ActionType.MovePlayer: {
      return increment(
        state.player.pos.y,
        ifElse(
          isGreater(state.player.dir, 0),
          String(config.player.speed),
          `-${config.player.speed}`,
        ),
      );
    }
    case ActionType.FirePlayerBullet: {
      return execFunc(
        prop(state.player.bullets, "push"),
        Record({
          x: state.player.pos.x + state.player.radius,
          y: state.player.pos.y,
        }),
      );
    }
  }
}

export const dispatch = createActionDispatch(state, mutator);
