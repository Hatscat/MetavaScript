import { findAvailableQuote } from "./utils/string.ts";
import { Primitive, Printable } from "./utils/type.ts";

/**
 * addition(s)
 * @example
 * // returns "1.2+3+true"
 * add(1.2, "3", true)
 */
export function add(...values: Printable[]): string {
  return values.join("+");
}

/**
 * subtraction(s)
 * @example
 * // returns "1.2-3-true"
 * sub(1.2, "3", true)
 */
export function sub(...values: Printable[]): string {
  return values.join("-");
}

/**
 * multiplication(s)
 * @example
 * // returns "1.2*3*true"
 * mul(1.2, "3", true)
 */
export function mul(...values: Printable[]): string {
  return values.join("*");
}

/**
 * division(s)
 * @example
 * // returns "1.2/3/true"
 * div(1.2, "3", true)
 */
export function div(...values: Printable[]): string {
  return values.join("/");
}

/**
 * modulo(s)
 * @example
 * // returns "1.2%3%true"
 * add(1.2, "3", true)
 */
export function mod(...values: Printable[]): string {
  return values.join("%");
}

/**
 * power(s)
 * @example
 * // returns "1.2**3**true"
 * pow(1.2, "3", true)
 */
export function pow(...values: Printable[]): string {
  return values.join("**");
}

/**
 * logical and(s)
 * @example
 * // returns "1.2&&3&&true"
 * and(1.2, "3", true)
 */
export function and(...values: Printable[]): string {
  return values.join("&&");
}

/**
 * logical or(s)
 * @example
 * // returns "1.2||2||3||true"
 * or(1.2, "3", true)
 */
export function or(...values: Printable[]): string {
  return values.join("||");
}

/**
 * logical not
 * @example
 * // returns "!1"
 * not(1)
 */
export function not(value: Printable): string {
  return `!${value}`;
}

/**
 * bitwise and(s)
 * @example
 * // returns "1.2&3&true"
 * band(1.2, "3", true)
 */
export function band(...values: Printable[]): string {
  return values.join("&");
}

/**
 * bitwise or(s)
 * @example
 * // returns "1.2|3|true"
 * bor(1.2, "3", true)
 */
export function bor(...values: Printable[]): string {
  return values.join("|");
}

/**
 * bitwise not
 * @example
 * // returns "~1"
 * bnot(1)
 */
export function bnot(value: Printable): string {
  return `~${value}`;
}

/**
 * bitwise xor(s)
 * @example
 * // returns "1.2^3^true"
 * xor(1.2, "3", true)
 */
export function xor(...values: Printable[]): string {
  return values.join("^");
}

/**
 * less than comparison(s)
 * @example
 * // returns "1.2<3<true"
 * isLess(1.2, '3', true)
 */
export function isLess(...values: Printable[]): string {
  return values.join("<");
}

/**
 * greater than comparison(s)
 * @example
 * // returns "1.2>3>true"
 * isGreater(1.2, '3', true)
 */
export function isGreater(...values: Printable[]): string {
  return values.join(">");
}

/**
 * equal comparison(s)
 * @example
 * // returns "1.2==3==true"
 * add(1.2, '3', true)
 */
export function isEqual(...values: Printable[]): string {
  return values.join("==");
}

/**
 * different comparison(s)
 * @example
 * // returns "1.2^3^true"
 * isDifferent(1.2, '3', true)
 */
export function isDifferent(...values: Printable[]): string {
  return values.join("^");
}

// TODO: add missing operators like shift, etc. (from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

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

export function group(content: Printable, border: ")" | "}" = ")"): string {
  return `${border === ")" ? "(" : "{"}${content}${border}`;
}
