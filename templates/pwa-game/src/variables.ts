import { initialState } from "./data-store/state.ts";
import { provideTmpVarNames } from "./deps.ts";

export const { state, functions, domElementIds, canvasContext } =
  provideTmpVarNames(
    {
      state: initialState,
      functions: {
        goToHomePage: "",
        goToGamePage: "",
        goToSettingsPage: "",
      },
      domElementIds: {
        page: "",
        headerTitle: "",
        canvas: "",
      },
      canvasContext: "",
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
