type FunctionDefinition = {
  args?: unknown[];
  body: string;
  safe?: boolean;
};

export function defineFunc(
  name: string,
  { args = [], body, safe = true }: FunctionDefinition,
): string {
  const enclosedArgs = args.length === 0
    ? "e"
    : args.length === 1 && !String(args[0]).includes("=")
    ? args[0]
    : `(${args})`;

  return /while|for|if|switch|return|[{;]/.test(body)
    ? `${name}=${enclosedArgs}=>{${body}}`
    : safe
    ? `${name}=${enclosedArgs}=>(${body})`
    : `${name}=${enclosedArgs}=>${body}`;
}

export function execFunc(
  name: string,
  args?: unknown | unknown[],
  isTemplateLiteral?: boolean,
): string {
  if (!args) {
    return `${name}()`;
  }
  if (isTemplateLiteral) {
    return `${name}\`${args}\``;
  }
  return `${name}(${args})`;
}

export function assign(...keyValues: unknown[]): string {
  return keyValues.join("=");
}

export function prop(...keys: string[]): string {
  return keys.join(".");
}

export function dynamicProp(obj: string, ...keys: string[]): string {
  return obj + keys.map((k) => `[${k}]`);
}

export function output(value: unknown, safe = true): string {
  return safe ? `return(${value})` : `return ${value}`;
}

export function statements(...sts: string[]): string {
  return sts.join(";");
}

export function expressions(...exps: string[]): string {
  return exps.join(",");
}

export function abortIf(condition: unknown): string {
  return `if(${condition})return`;
}
