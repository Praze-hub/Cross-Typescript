export function omitUndefined<T extends Record<string, any>>(
  obj: T
): { [K in keyof T as undefined extends T[K] ? never : K]: Exclude<T[K], undefined> } {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  ) as any;
}
