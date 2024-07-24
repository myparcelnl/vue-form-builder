import {type MaybeUnwrapNestedRefs, type FieldInstance} from '../types';

export const generateFieldName = (
  field?: MaybeUnwrapNestedRefs<FieldInstance> | null,
  suffix?: string,
): string | undefined => {
  if (!field) {
    return undefined;
  }

  const prefix = `${field.form.name}:`;
  const resolvedSuffix = suffix ? `:${suffix}` : '';

  if (field.name) {
    return prefix + field.name + resolvedSuffix;
  }

  if (typeof field.component === 'string') {
    return prefix + field.component + resolvedSuffix;
  }

  // @ts-expect-error todo
  // eslint-disable-next-line no-underscore-dangle
  return prefix + String(field.component.name ?? field.component.__name) + resolvedSuffix;
};
