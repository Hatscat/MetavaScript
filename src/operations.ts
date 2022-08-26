import { findAvailableQuote } from "./utils/string.ts";

export function add(...values: unknown[]): string {
  return values.join("+");
}

export function sub(...values: unknown[]): string {
  return values.join("-");
}

export function mul(...values: unknown[]): string {
  return values.join("*");
}

export function div(...values: unknown[]): string {
  return values.join("/");
}

export function mod(...values: unknown[]): string {
  return values.join("%");
}

export function pow(...values: unknown[]): string {
  return values.join("**");
}

export function and(...values: unknown[]): string {
  return values.join("&&");
}

export function or(...values: unknown[]): string {
  return values.join("||");
}

export function not(value: unknown): string {
  return `!${value}`;
}

export function band(...values: unknown[]): string {
  return values.join("&");
}

export function bor(...values: unknown[]): string {
  return values.join("|");
}

export function bnot(value: unknown): string {
  return `~${value}`;
}

export function xor(...values: unknown[]): string {
  return values.join("^");
}

export function isLower(...values: unknown[]): string {
  return values.join("<");
}

export function isGreater(...values: unknown[]): string {
  return values.join(">");
}

export function isEqual(...values: unknown[]): string {
  return values.join("==");
}

export function isDifferent(...values: unknown[]): string {
  return values.join("^");
}

export function ifElse(
  condition: unknown,
  ifTrue: unknown,
  ifFalse: unknown,
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

export function stringify(value: unknown): string {
  const quote = findAvailableQuote(String(value)) ?? "\\'";
  return `${quote}${value}${quote}`;
}

export function castBoolean(value: unknown): string {
  return `!!${value}`;
}

export function castNumber(value: unknown): string {
  return `+${value}`;
}

export function castInt(value: unknown): string {
  return `${value}|0`;
}

export function round(value: number): string {
  return `${value}+.5|0`;
}

export function funcConstructor(args: string[], body: string) {
  return `Function(${args.map((a) => `'${a}'`)},${body})`;
}

export function templateLiteral(strings: string[], ...keys: unknown[]): string {
  return `\`${
    strings.reduce((literal, str, i) =>
      `${literal}${str}${keys[i] ? `\${${keys[i]}}` : ""}`, "")
  }\``;
}

export function quote(q: '"' | "'" | "`" | "${", text: string): string {
  return `${q}${text}${q === "${" ? "}" : q}`;
}

export function scope(q: "(" | "{" | "[", content: unknown): string {
  return `${q}${content}${
    q === "(" ? ")" : q === "{" ? "}" : q === "[" ? "]" : q
  }`;
}
