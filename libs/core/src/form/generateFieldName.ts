import {type ComponentInstance} from '@vue/devtools-api';
import {isOfType} from '@myparcel/ts-utils';
import {type AnyElementInstance, type MaybeUnwrapNestedRefs} from '../types';

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
    return prefix + (field.name as string) + resolvedSuffix;
  }

  if (isOfType<ComponentInstance>(field.component, '__name')) {
    // eslint-disable-next-line no-underscore-dangle
    return `${prefix}${field.component.__name}${resolvedSuffix}`;
  }

  return `${prefix}${field.component}${resolvedSuffix}`;
};
