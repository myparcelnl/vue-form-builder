import {type FieldInstance} from '../types/field.types';

export const useTestAttributes = (field: FieldInstance): Record<string, unknown> => {
  if (import.meta.env.MODE !== 'test') {
    return {};
  }

  return {
    'data-test-id': field.name,
  };
};
