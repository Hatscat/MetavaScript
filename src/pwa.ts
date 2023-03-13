import { element } from "./dom.ts";
import { Text } from "./primitives.ts";
import { execFunc, prop } from "./statements.ts";

export function registerServiceWorker(path = Text("/sw.js")): string {
  return execFunc(prop("navigator", "serviceWorker?", "register"), path);
}

export function manifestLink(path = "m.webmanifest"): string {
  return element("link", { tagProps: { rel: "manifest", href: path } });
}

export function viewportMeta(
  content = "width=device-width,initial-scale=1",
): string {
  return element("meta", { tagProps: { name: "viewport", content } });
}

export function htmlDoctype(lang = "en"): string {
  return [
    element("!DOCTYPE", { tagProps: { html: undefined } }),
    element("html", { tagProps: { lang } }),
  ].join("");
}

export function titleTag(title: string): string {
  return element("title", { children: title, closed: true });
}
