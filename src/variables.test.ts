import { assertEquals } from "../dev-deps.ts";
import {
  AVAILABLE_CHAR_FOR_VARIABLES,
  provideTmpVarNames,
  replaceAllTmpVarNames,
} from "./variables.ts";

Deno.test("provideTmpVarNames()", () => {
  // Given
  const anInput = {
    state: "",
    element: {
      canvas: "",
      header: "",
    },
    function: {
      navToHome: "",
      loop: {
        render: "",
        draw: "",
      },
    },
  };

  // When
  const result = provideTmpVarNames(anInput);

  // Then
  const expectedResult = {
    state: "$$state$$",
    element: {
      canvas: "$$element.canvas$$",
      header: "$$element.header$$",
    },
    function: {
      navToHome: "$$function.navToHome$$",
      loop: {
        render: "$$function.loop.render$$",
        draw: "$$function.loop.draw$$",
      },
    },
  };

  assertEquals(result, expectedResult);
  assertEquals(result.state, expectedResult.state);
  assertEquals(result.element.canvas, expectedResult.element.canvas);
  assertEquals(result.function.loop.draw, expectedResult.function.loop.draw);
});

Deno.test("replaceAllTmpVarNames()", () => {
  // Given
  const aSourceCode = `$$global$$ = "abc";
  $$state$$ = { $$key.answer$$: 42, $$key.other$$: "73" }
  $$state$$.$$key.answer$$ ? true : false
  return $$state$$`;
  // All AVAILABLE_CHAR_FOR_VARIABLES except the 2 last ones ('Y' and 'Z')
  const someUnavailableChars = AVAILABLE_CHAR_FOR_VARIABLES.slice(0, -2).split(
    "",
  );

  // When
  const result1 = replaceAllTmpVarNames(aSourceCode);
  const result2 = replaceAllTmpVarNames(aSourceCode, someUnavailableChars);

  // Then
  assertEquals(
    result1,
    `b = "abc";
  $ = { a: 42, c: "73" }
  $.a ? true : false
  return $`,
  );
  assertEquals(
    result2,
    `$0 = "abc";
  Y = { Z: 42, $1: "73" }
  Y.Z ? true : false
  return Y`,
  );
});
