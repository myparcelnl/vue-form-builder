import {AnyElementInstance} from '../types';
import {InteractiveElementInstance} from '../form';
import {isOfType} from '@myparcel/ts-utils';

export const useTestAttributes = (element: AnyElementInstance): Record<string, unknown> => {
  if (import.meta.env.MODE !== 'test') {
    return {};
  }

  return {
    'data-test-id': element.name,
    'data-test-type': isOfType<InteractiveElementInstance>(element, 'ref') ? 'interactive' : 'plain',
  };
};
