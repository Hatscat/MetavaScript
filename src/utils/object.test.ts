import { assertEquals } from "../../dev-deps.ts";
import { getNestedValue } from "./object.ts";

const anObject = {
  state: {
    user: {
      id: 73,
      email: "foo@bar.com",
      plan: {
        type: "free",
        price: 0,
      },
    },
  },
  score: 42,
} as const;

Deno.test("getNestedValue()", () => {
  assertEquals(
    getNestedValue(anObject, []),
    anObject,
  );

  assertEquals(
    getNestedValue(anObject, ["score"]),
    42,
  );

  assertEquals(
    getNestedValue(anObject, ["state", "user", "email"]),
    "foo@bar.com",
  );

  assertEquals(
    getNestedValue(anObject, ["state", "user", "plan"]),
    anObject.state.user.plan,
  );

  assertEquals(
    getNestedValue(anObject, ["state", "user", "plan", "type"]),
    "free",
  );
});
