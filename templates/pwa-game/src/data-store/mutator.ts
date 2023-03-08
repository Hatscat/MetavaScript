import { config } from "../config.ts";
import {
  ActionBase,
  add,
  assign,
  createActionDispatch,
  defineFunc,
  div,
  execFunc,
  ifElse,
  ifThen,
  increment,
  isGreater,
  isLower,
  minus,
  mul,
  prop,
  Record,
  statements,
  sub,
} from "../deps.ts";
import { canPlayerMove } from "../rules/game.ts";
import { params, state } from "../variables.ts";
import { State } from "./state.ts";

enum ActionType {
  SetTime,
  SetPointer,
  MoveTarget,
  MovePlayer,
  MoveBullets,
  FirePlayerBullet,
  ClearOutOfScreenBullets,
}

type Action<T = ActionType> =
  & ActionBase<T>
  & (
    | {
      type: ActionType.SetTime;
      payload: { time: string };
    }
    | {
      type: ActionType.SetPointer;
      payload: { y: string };
    }
    | {
      type: ActionType.MoveTarget;
    }
    | {
      type: ActionType.MovePlayer;
    }
    | {
      type: ActionType.MoveBullets;
    }
    | {
      type: ActionType.FirePlayerBullet;
    }
    | {
      type: ActionType.ClearOutOfScreenBullets;
    }
  );

export const actions = {
  setTime: (time: string): Action<ActionType.SetTime> => ({
    type: ActionType.SetTime,
    payload: { time },
  }),
  setPointer: (y: string): Action<ActionType.SetPointer> => ({
    type: ActionType.SetPointer,
    payload: { y },
  }),
  moveTarget: (): Action<ActionType.MoveTarget> => ({
    type: ActionType.MoveTarget,
  }),
  movePlayer: (): Action<ActionType.MovePlayer> => ({
    type: ActionType.MovePlayer,
  }),
  moveBullets: (): Action<ActionType.MoveBullets> => ({
    type: ActionType.MoveBullets,
  }),
  firePlayerBullet: (): Action<ActionType.FirePlayerBullet> => ({
    type: ActionType.FirePlayerBullet,
  }),
  clearOutOfScreenBullets: (): Action<ActionType.ClearOutOfScreenBullets> => ({
    type: ActionType.ClearOutOfScreenBullets,
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
    case ActionType.MoveBullets: {
      return execFunc(
        prop(state.player.bullets, "forEach"),
        defineFunc(null, {
          args: [params.item],
          body: increment(prop(params.item, "x"), config.bullet.speed),
          safe: false,
        }),
      );
    }
    case ActionType.FirePlayerBullet: {
      return execFunc(
        prop(state.player.bullets, "push"),
        Record({
          x: state.player.pos.x,
          y: state.player.pos.y,
        }),
      );
    }
    case ActionType.ClearOutOfScreenBullets: {
      return assign(
        state.player.bullets,
        execFunc(
          prop(state.player.bullets, "filter"),
          defineFunc(null, {
            args: [params.item],
            body: isLower(prop(params.item, "x"), state.canvas.width),
            safe: false,
          }),
        ),
      );
    }
  }
}

export const dispatch = createActionDispatch(state, mutator);
