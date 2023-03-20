/**
 * an interface to extends for typed actions related to the State Mutator pattern
 */
export interface ActionBase<ActionType = string | number> {
  type: ActionType;
  payload?: { [key: string]: unknown };
}

/**
 * helper to create the `dispatch(action)` function, in the context of the State Mutator pattern
 * @example
 * const state = {
 *   player: {
 *     x: "px",
 *     y: "py",
 *   },
 * };
 *
 * type Action = {
 *   type: "jump";
 * } | {
 *   type: "move";
 *   payload: {
 *     direction: "left" | "right";
 *   };
 * };
 *
 * const mutator = (st: typeof state, action: Action): string => {
 *   switch (action.type) {
 *     case "jump":
 *       return decrement(st.player.y);
 *     case "move":
 *       return increment(st.player.x);
 *   }
 * };
 *
 * const dispatch = createActionDispatch(state, mutator);
 *
 * // returns "py--"
 * dispatch({ type: "jump" });
 * // returns "px++"
 * dispatch({ type: "move", payload: { direction: "right" } });
 */
export function createActionDispatch<
  ActionType,
  State extends { [key: string]: unknown },
  Action extends ActionBase<ActionType>,
>(
  state: State,
  mutator: (state: State, action: Action) => string,
): (action: Action) => string {
  return (action: Action) => mutator(state, action);
}
