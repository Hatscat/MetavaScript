import { findAvailableQuote } from "./utils/string.ts";

export const UNDEFINED = "[]._";

export const INFINITY = "1/0";

export const TRUE = 1;

export const FALSE = 0;

export function Text(value: unknown): string {
  const quote = findAvailableQuote(String(value)) ?? "\\'";
  return `${quote}${value}${quote}`;
}

export function List(...values: unknown[]): string {
  return `[${values}]`;
}

export function isString(value: unknown): string {
  return `(${value}).big`;
}

export function isNumber(value: unknown): string {
  return `(${value}).toFixed`;
}

export function isArray(value: unknown): string {
  return `(${value}).pop`;
}

export function isFunction(value: unknown): string {
  return `(${value}).call`;
}

export function isTextNode(value: unknown): string {
  return `(${value}).data`;
}
