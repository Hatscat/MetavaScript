import { element, setInnerHtml, Text } from "../deps.ts";
import { assign, defineFunc, execFunc, prop, statements } from "../deps.ts";
import { domElementIds, Elements, functions } from "../variables.ts";

export function defineHomePage() {
  return defineFunc(
    {
      name: functions.goToHomePage,
      body: statements(
        setInnerHtml(
          domElementIds.page,
          [
            element(Elements.bigTitle, {
              children: "Game Template",
              closed: true,
            }),
            element(Elements.button, {
              tagProps: { onclick: execFunc(functions.goToGamePage) },
              closed: true,
              children: "Play",
            }),
            element(Elements.button, {
              tagProps: { onclick: execFunc(functions.goToSettingsPage) },
              closed: true,
              children: "Settings",
            }),
          ],
        ),
        assign(prop(domElementIds.headerTitle, "innerText"), Text("")),
      ),
    },
  );
}
