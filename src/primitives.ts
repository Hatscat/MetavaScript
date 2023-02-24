import { findAvailableQuote } from "./utils/string.ts";
import { isRecord, Printable } from "./utils/type.ts";

export const UNDEFINED = "[]._";

export const INFINITY = "1/0";

export const TRUE = 1;

export const FALSE = 0;

export const NOTHING = 0;

export function Text(value: Printable): string {
  const quote = findAvailableQuote(String(value)) ?? "\\'";
  return `${quote}${value}${quote}`;
}

export function List(...values: Printable[]): string {
  return `[${values}]`;
}

export function Record(obj: Record<string | number, unknown>): string {
  const castString = (v: unknown) =>
    typeof v === "string" ? Text(v) : String(v);

  return Array.isArray(obj)
    ? `[${
      obj.map((value) => isRecord(value) ? Record(value) : castString(value))
    }]`
    : `{${
      Object.entries(obj).reduce(
        (result: string[], [key, value]) =>
          result.concat(
            `${key}:${isRecord(value) ? Record(value) : castString(value)}`,
          ),
        [],
      ).join(",")
    }}`;
}

export function checkIfString(value: Printable): string {
  return `(${value}).big`;
}

export function checkIfNumber(value: Printable): string {
  return `(${value}).toFixed`;
}

export function checkIfArray(value: Printable): string {
  return `(${value}).pop`;
}

export function checkIfFunction(value: Printable): string {
  return `(${value}).call`;
}

export function checkIfTextNode(value: Printable): string {
  return `(${value}).data`;
}
