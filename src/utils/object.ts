export function getNestedValue<T extends { [key: string | number]: unknown }>(
  obj: T,
  ...keysPath: Array<string | number>
): unknown {
  if (keysPath.length < 1) {
    return obj;
  }
  const value = obj[keysPath[0]];
  return keysPath.length === 1 || typeof obj !== "object"
    ? value
    : getNestedValue(value as T, ...keysPath.slice(1));
}
