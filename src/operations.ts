import { findAvailableQuote } from "./utils/string.ts";
import { Primitive, Printable } from "./utils/type.ts";

/**
 * addition(s)
 * example: add(1, 2, '3', true) == "1+2+3+true"
 */
export function add(...values: Printable[]): string {
  return values.join("+");
}

export function sub(...values: Printable[]): string {
  return values.join("-");
}

export function mul(...values: Printable[]): string {
  return values.join("*");
}

export function div(...values: Printable[]): string {
  return values.join("/");
}

export function mod(...values: Printable[]): string {
  return values.join("%");
}

export function pow(...values: Printable[]): string {
  return values.join("**");
}

export function and(...values: Printable[]): string {
  return values.join("&&");
}

export function or(...values: Printable[]): string {
  return values.join("||");
}

export function not(value: Printable): string {
  return `!${value}`;
}

export function band(...values: Printable[]): string {
  return values.join("&");
}

export function bor(...values: Printable[]): string {
  return values.join("|");
}

export function bnot(value: Printable): string {
  return `~${value}`;
}

export function xor(...values: Printable[]): string {
  return values.join("^");
}

export function isLower(...values: Printable[]): string {
  return values.join("<");
}

export function isGreater(...values: Printable[]): string {
  return values.join(">");
}

export function isEqual(...values: Printable[]): string {
  return values.join("==");
}

export function isDifferent(...values: Printable[]): string {
  return values.join("^");
}

export function ifElse(
  condition: Printable,
  ifTrue: Printable,
  ifFalse: Printable,
): string {
  return `${condition}?${ifTrue}:${ifFalse}`;
}

export function loop(
  { init, condition, body, body2 }: {
    condition: string | string[];
    body?: string | string[];
    body2?: string | string[];
    init?: string | string[];
  },
) {
  return `for(${init ?? ""};${condition};${body2 ?? ""})${body ?? ""}`;
}

export function increment(
  variable: string,
  step: Primitive = 1,
  { before } = { before: false },
): string {
  if (step === 1) {
    return before ? `++${variable}` : `${variable}++`;
  }
  return `${variable}+=${step}`;
}

export function decrement(
  variable: string,
  step: Primitive = 1,
  { before } = { before: false },
): string {
  if (step === 1) {
    return before ? `--${variable}` : `${variable}--`;
  }
  return `${variable}-=${step}`;
}

export function castBoolean(value: Primitive): string {
  return `!!${value}`;
}

export function castNumber(value: Primitive): string {
  return `+${value}`;
}

export function castInt(value: Primitive): string {
  return `${value}|0`;
}

export function round(value: Primitive): string {
  return `${value}+.5|0`;
}

export function minus(value: Primitive): string {
  return `-${value}`;
}

export function funcConstructor(args: string[], body: string) {
  return `Function(${args.map((a) => `'${a}'`)},${body})`;
}

export function templateLiteral(
  stringParts: string[],
  ...keys: Printable[]
): string {
  return `\`${
    stringParts.reduce((literal, str, i) =>
      `${literal}${str}${keys[i] ? `\${${keys[i]}}` : ""}`, "")
  }\``;
}

export function quote(text: string, border?: '"' | "'" | "`"): string {
  const q = border ?? findAvailableQuote(text);
  return `${q}${text}${q}`;
}

export function scope(content: Printable, border: ")" | "}" = ")"): string {
  return `${border === ")" ? "(" : "{"}${content}${border}`;
}
