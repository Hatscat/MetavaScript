export const UNDEFINED = "[]._";

export const INFINITY = "1/0";

export const TRUE = 1;

export const FALSE = 0;

export function isString(value: unknown): string {
  return `${value}.big`;
}

export function isNumber(value: unknown): string {
  return `${value}.toFixed`;
}

export function isArray(value: unknown): string {
  return `${value}.pop`;
}

export function isFunction(value: unknown): string {
  return `${value}.call`;
}

export function isTextNode(value: unknown): string {
  return `${value}.data`;
}
