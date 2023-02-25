import { assertEquals } from "../dev-deps.ts";
import { createActionDispatch } from "./data-flow.ts";
import { decrement, increment } from "./operations.ts";

Deno.test("createActionDispatch()", () => {
  // Given
  const state = {
    player: {
      x: "px",
      y: "py",
    },
  };

  type State = typeof state;

  type Action = {
    type: "jump";
  } | {
    type: "move";
    payload: {
      direction: "left" | "right";
    };
  };

  const mutator = (st: State, action: Action): string => {
    switch (action.type) {
      case "jump":
        return decrement(st.player.y);
      case "move":
        return increment(st.player.x);
    }
  };

  const dispatch = createActionDispatch(state, mutator);

  // When
  const result1 = dispatch({ type: "jump" });
  const result2 = dispatch({ type: "move", payload: { direction: "right" } });

  // Then
  assertEquals(result1, "py--");
  assertEquals(result2, "px++");
});
