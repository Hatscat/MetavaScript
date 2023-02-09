import { findAvailableQuote } from "./utils/string.ts";
import { Printable } from "./utils/type.ts";

export const UNDEFINED = "[]._";

export const INFINITY = "1/0";

export const TRUE = 1;

export const FALSE = 0;

export function Text(value: Printable): string {
  const quote = findAvailableQuote(String(value)) ?? "\\'";
  return `${quote}${value}${quote}`;
}

export function List(...values: Printable[]): string {
  return `[${values}]`;
}

export function isString(value: Printable): string {
  return `(${value}).big`;
}

export function isNumber(value: Printable): string {
  return `(${value}).toFixed`;
}

export function isArray(value: Printable): string {
  return `(${value}).pop`;
}

export function isFunction(value: Printable): string {
  return `(${value}).call`;
}

export function isTextNode(value: Printable): string {
  return `(${value}).data`;
}
