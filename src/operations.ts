import { Printable } from "./utils/type.ts";

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

export function increment(variable: string, before?: boolean): string {
  return before ? `++${variable}` : `${variable}++`;
}

export function decrement(variable: string, before?: boolean): string {
  return before ? `--${variable}` : `${variable}--`;
}

export function castBoolean(value: Printable): string {
  return `!!${value}`;
}

export function castNumber(value: Printable): string {
  return `+${value}`;
}

export function castInt(value: Printable): string {
  return `${value}|0`;
}

export function round(value: number): string {
  return `${value}+.5|0`;
}

export function funcConstructor(args: string[], body: string) {
  return `Function(${args.map((a) => `'${a}'`)},${body})`;
}

export function templateLiteral(
  strings: string[],
  ...keys: Printable[]
): string {
  return `\`${
    strings.reduce((literal, str, i) =>
      `${literal}${str}${keys[i] ? `\${${keys[i]}}` : ""}`, "")
  }\``;
}

export function quote(q: '"' | "'" | "`" | "${", text: string): string {
  return `${q}${text}${q === "${" ? "}" : q}`;
}

export function scope(q: "(" | "{" | "[", content: Printable): string {
  return `${q}${content}${
    q === "(" ? ")" : q === "{" ? "}" : q === "[" ? "]" : q
  }`;
}
