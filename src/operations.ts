export function or(...values: unknown[]): string {
  return values.join("||");
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
  condition: string,
  ifTrue: string,
  ifFalse: string,
): string {
  return `${condition}?${ifTrue}:${ifFalse}`;
}

export function loop(
  { init, condition, body, body2 }: {
    condition: string;
    body?: string;
    body2?: string;
    init?: string;
  },
) {
  return `for(${init ?? ""};${condition};${body2 ?? ""})${body ?? ""}`;
}

export function increment(variable: string, before?: boolean): string {
  return before ? `++${variable}` : `${variable}++`;
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
