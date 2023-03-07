import { initialState } from "./data-store/state.ts";
import { provideTmpVarNames } from "./deps.ts";

export const { state, functions, domElementIds, canvasContext, params } =
  provideTmpVarNames(
    {
      state: initialState,
      functions: {
        goToHomePage: "",
        goToGamePage: "",
        goToSettingsPage: "",
        gameLoop: "",
      },
      domElementIds: {
        page: "",
        headerTitle: "",
        canvas: "",
      },
      canvasContext: "",
      params: {
        time: "",
        item: "",
      },
    } as const,
  );

export const Elements = {
  header: "h1",
  button: "a",
  page: "b",
  flexWithoutStyle: "z",
  interactive: "v",
  bigTitle: "t",
} as const;
