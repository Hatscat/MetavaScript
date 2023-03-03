import {
  ActionBase,
  assign,
  createActionDispatch,
  execFunc,
  prop,
  Record,
} from "../deps.ts";
import { state } from "../variables.ts";
import { State } from "./state.ts";

enum ActionType {
  SetTime,
  FirePlayerBullet,
}

interface SetTime extends ActionBase<ActionType> {
  type: ActionType.SetTime;
  payload: { time: string };
}

interface FirePlayerBullet extends ActionBase<ActionType> {
  type: ActionType.FirePlayerBullet;
}

type Action = SetTime | FirePlayerBullet;

export const actions = {
  setTime: (time: string): SetTime => ({
    type: ActionType.SetTime,
    payload: { time },
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
