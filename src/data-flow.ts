export interface ActionBase<ActionType = string | number> {
  type: ActionType;
  payload?: { [key: string]: unknown };
}

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
