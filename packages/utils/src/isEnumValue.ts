export const isEnumValue = <T extends string>(enumObject: Record<string, T>, value: string): value is T => {
  return Object.values(enumObject).includes(value as T);
};
