export function getNestedValue<T extends { [key: string | number]: unknown }>(
  obj: T,
  keys: Array<string | number>,
): unknown {
  if (keys.length < 1) {
    return obj;
  }
  const value = obj[keys[0]];
  return keys.length === 1 || typeof obj !== "object"
    ? value
    : getNestedValue(value as T, keys.slice(1));
}
