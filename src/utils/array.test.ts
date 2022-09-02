import { assertEquals } from "../../dev-deps.ts";
import { removeEmptyItems, removeFalsyItems } from "./array.ts";

const anArray = [
  1,
  "a",
  0,
  "",
  true,
  false,
  ,
  null,
  "null",
  undefined,
  {},
  [],
  Function,
];

Deno.test("removeFalsyItems()", () => {
  assertEquals(
    removeFalsyItems(anArray),
    [
      1,
      "a",
      true,
      "null",
      {},
      [],
      Function,
    ],
  );
});

Deno.test("removeEmptyItems()", () => {
  assertEquals(
    removeEmptyItems(anArray),
    [
      1,
      "a",
      0,
      true,
      false,
      "null",
      {},
      [],
      Function,
    ],
  );
});
