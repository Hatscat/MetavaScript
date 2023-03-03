import { element, initVariables } from "./deps.ts";
import { execFunc, statements } from "./deps.ts";
import { headerElement } from "./elements/header.ts";
import { defineGamePage } from "./pages/game.ts";
import { defineHomePage } from "./pages/home.ts";
import { domElementIds, Elements, functions, state } from "./variables.ts";
import { defineSettingsPage } from "./pages/settings.ts";
import { getStylesheet } from "./style.ts";
import { initialState } from "./data-store/state.ts";
import { defineGameLoop } from "./game/main-loop.ts";

export function getGameHtmlSrc(): string {
  // TODO: add a helper maybe?
  return [
    element("style", { children: getStylesheet(), closed: true }),
    headerElement(),
    element(Elements.page, { tagProps: { id: domElementIds.page } }),
    element("script", { children: getScript(), closed: true }),
  ].join("");
}

function getScript() {
  return statements(
    // Declare functions
    defineHomePage(),
    defineSettingsPage(),
    defineGamePage(),
    // Init the state
    initVariables(state, initialState),
    // Render the Home page
    execFunc(functions.goToHomePage),
    // Start infinite game loop
    execFunc(defineGameLoop()),
  );
}
