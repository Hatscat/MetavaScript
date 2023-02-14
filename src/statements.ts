import { removeFalsyItems } from "./utils/array.ts";
import { Primitive, Printable } from "./utils/type.ts";
import { ReservedCharacters } from "./variables.ts";

type FunctionDefinition = {
  args?: Printable[];
  body: Printable;
  safe?: boolean;
};

export function defineFunc(
  name: string,
  { args = [], body, safe = true }: FunctionDefinition,
): string {
  const enclosedArgs = args.length === 0
    ? ReservedCharacters.EmptyArg
    : args.length === 1 && !String(args[0]).includes("=")
    ? args[0]
    : `(${args})`;

  return /while|for|if|switch|return|[{;]/.test(String(body))
    ? `${name}=${enclosedArgs}=>{${body}}`
    : safe
    ? `${name}=${enclosedArgs}=>(${body})`
    : `${name}=${enclosedArgs}=>${body}`;
}

export function execFunc(
  name: string,
  args?: Printable,
  { isTemplateLiteral } = { isTemplateLiteral: false },
): string {
  if (!args) {
    return `${name}()`;
  }
  if (isTemplateLiteral) {
    return `${name}\`${args}\``;
  }
  return `${name}(${args})`;
}

export function assign(...keyValues: Primitive[]): string {
  return keyValues.join("=");
}

export function prop(...keys: string[]): string {
  return keys.join(".");
}

export function dynamicProp(
  obj: string,
  ...keys: Array<string | number>
): string {
  return obj + keys.map((k) => `[${k}]`);
}

export function output(value: Printable, { safe } = { safe: true }): string {
  return safe ? `return(${value})` : `return ${value}`;
}

export function statements(...sts: Printable[]): string {
  return removeFalsyItems(sts).join(";");
}

export function expressions(...exps: Printable[]): string {
  return removeFalsyItems(exps).join(",");
}

export function abortIf(condition: Printable): string {
  return `if(${condition})return`;
}

export function ifThen(condition: Printable, then: Printable): string {
  return `if(${condition})${then}`;
}
