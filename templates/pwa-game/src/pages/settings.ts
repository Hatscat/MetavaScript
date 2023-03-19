import { element, setInnerHtml, Text } from "../deps.ts";
import { assign, defineFunc, execFunc, prop, statements } from "../deps.ts";
import { domElementIds, Elements, functions } from "../variables.ts";

export function defineSettingsPage() {
  return defineFunc(
    {
      name: functions.goToSettingsPage,
      body: statements(
        setInnerHtml(domElementIds.page, [
          element(Elements.button, {
            tagProps: { onclick: execFunc(functions.goToHomePage) },
            closed: true,
            children: "Back",
          }),
        ]),
        assign(prop(domElementIds.headerTitle, "innerText"), Text("Settings")),
      ),
    },
  );
}
