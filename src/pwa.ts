import { element } from "./dom.ts";
import { Text } from "./primitives.ts";
import { execFunc, prop } from "./statements.ts";

export function registerServiceWorker(path = Text("/sw.js")): string {
  return execFunc(prop("navigator", "serviceWorker?", "register"), path);
}

export function manifestLink(path = "m.webmanifest"): string {
  return element("link", { tagProps: { rel: "manifest", href: path } });
}
