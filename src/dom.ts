import { findAvailableQuote, kebabCase } from "./utils/string.ts";

export const INLINE_EVENT_ARG_NAME = "event";

type ElementProps = {
  tagProps?: Record<string, string>;
  children?: string | string[];
  closed?: boolean;
};

export function element(
  tagName: string,
  { tagProps, children = "", closed = false }: ElementProps,
): string {
  const tag = `<${tagName}${
    tagProps
      ? " " + Object.entries(tagProps).map(([key, value]) =>
        `${key}=${value}`
      ).join(" ")
      : ""
  }>`;
  const child = Array.isArray(children) ? children.join("") : children;

  return `${tag}${child}${closed === true ? `</${tagName}>` : ""}`;
}

export function setInnerHtml(
  elementId: string,
  html: string | string[],
): string {
  const innerHtml = Array.isArray(html) ? html.join("") : html;
  const quote = findAvailableQuote(innerHtml);

  if (quote) {
    return `${elementId}.innerHTML=${quote}${innerHtml}${quote}`;
  }
  return `${elementId}.innerHTML='${innerHtml.replaceAll("'", "\\'")}'`;
}

export function formatStylesheet(
  stylesheet: { [selector: string]: Record<string, string | number> | string },
): string {
  return Object.keys(stylesheet).reduce((css, selector) => {
    const style = stylesheet[selector];
    return css +
      `${selector}{${typeof style === "string" ? style : formatStyle(style)}}`;
  }, "");
}

export function formatStyle(
  style: Record<string, string | number>,
): string {
  return Object.entries(style).map(([key, value]) =>
    `${kebabCase(key)}:${value}`
  ).join(";");
}

export function font(
  sizeValue: number | string,
  sizeUnit = "px",
  family = "A",
): string {
  return `${sizeValue}${sizeUnit} ${family}`;
}
