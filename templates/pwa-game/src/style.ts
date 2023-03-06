import { domElementIds, Elements } from "./variables.ts";
import { formatStylesheet } from "./deps.ts";
import { config } from "./config.ts";

export function getStylesheet() {
  return formatStylesheet({
    "*": { margin: 0, color: "#EEE", fontFamily: "Arial" },
    "body": { background: "#111", overflow: "hidden" },
    [`${Elements.page} *,${Elements.header}`]: {
      display: "flex",
    },
    [Elements.header]: {
      background: "#222",
      justifyContent: "space-between",
      alignItems: "center",
      height: config.headerHeight,
      padding: "0 40",
    },
    [Elements.button]: {
      background: "#333",
      justifyContent: "center",
      fontSize: 24,
      width: 256,
      padding: "16 0",
      margin: 16,
      borderRadius: "8px",
      cursor: "pointer",
    },
    [`${Elements.button}:hover`]: {
      background: "#444",
    },
    [Elements.bigTitle]: {
      fontSize: 80,
      padding: 32,
    },
    [Elements.interactive]: {
      cursor: "pointer",
    },
    [`#${domElementIds.page}`]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    [`#${domElementIds.canvas}`]: {
      cursor: "crosshair",
    },
  });
}
