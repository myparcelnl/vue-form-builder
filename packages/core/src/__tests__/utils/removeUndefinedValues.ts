export const removeUndefinedValues = (
  object: undefined | Record<string, unknown | undefined>,
): Record<string, unknown> => {
  const result = {};

  for (const key in object) {
    if (object[key] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result[key] = object[key];
    }
  }

  return result;
};
