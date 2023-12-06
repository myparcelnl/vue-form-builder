import {isOfType} from '@myparcel/ts-utils';
import {type MaybeUnwrapNestedRefs, type AnyElementInstance} from '../types';

export const generateFieldName = (
  field?: MaybeUnwrapNestedRefs<AnyElementInstance> | null,
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

  // eslint-disable-next-line no-underscore-dangle,@typescript-eslint/naming-convention
  if (isOfType<{__name?: string}>(field.component, '__name') && field.component.__name) {
    // eslint-disable-next-line no-underscore-dangle
    return `${prefix}${field.component.__name}${resolvedSuffix}`;
  }

  return `${prefix}${field.component}${resolvedSuffix}`;
};
