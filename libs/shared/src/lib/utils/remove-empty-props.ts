export function removeEmptyProps<T>(object: T): Partial<T> {
  return Object.entries(object).reduce((acc, [k, v]) => (v ? {...acc, [k]: v} : acc), {});
}
