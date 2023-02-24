export enum JsType {
  Array = "[object Array]",
  Boolean = "[object Boolean]",
  Error = "[object Error]",
  Function = "[object Function]",
  Null = "[object Null]",
  Number = "[object Number]",
  Object = "[object Object]",
  String = "[object String]",
  Undefined = "[object Undefined]",
}

export function getJsType(value: unknown): JsType {
  return Object.prototype.toString.call(value) as JsType;
}

export type Primitive = string | number | boolean;

export type MaybePrimitive = Primitive | null | undefined;

export type Printable = Primitive | Primitive[];

export function isPrimitive(value: unknown): value is Primitive {
  return typeof value === "string" || typeof value === "number" ||
    typeof value === "boolean";
}

export function isRecord(
  value: unknown,
): value is Record<string | number, unknown> {
  const type = getJsType(value);
  return type === JsType.Array || type === JsType.Object;
}
