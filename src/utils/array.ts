import { getJsType, JsType } from "./type.ts";

export function removeFalsyItems<T extends unknown>(arr: T[]): T[] {
  return arr.filter(Boolean);
}

export function removeEmptyItems<T extends unknown>(arr: T[]): T[] {
  return arr.filter((item) =>
    ![JsType.Null, JsType.Undefined].includes(getJsType(item)) && item !== ""
  );
}
