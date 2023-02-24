import { element, Text } from "../deps.ts";
import { execFunc } from "../deps.ts";
import { domElementIds, Elements, functions } from "../variables.ts";

export function headerElement(): string {
  return element(Elements.header, {
    children: [
      element(Elements.interactive, {
        children: "🕹️",
        tagProps: {
          onclick: execFunc(functions.goToHomePage),
        },
        closed: true,
      }),
      element(Elements.flexWithoutStyle, {
        tagProps: { id: domElementIds.headerTitle },
        closed: true,
      }),
      element(Elements.interactive, {
        children: "👤",
        tagProps: {
          onclick: Text(execFunc("alert", Text("not implemented"))),
        },
      }),
    ],
    closed: true,
  });
}
