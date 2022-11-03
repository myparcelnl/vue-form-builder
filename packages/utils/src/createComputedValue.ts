import {ComputedRef, Ref, computed} from 'vue';
import {isOfType} from './';

export const createComputedValue = <T>(
  value: undefined | Ref<T> | ComputedRef<T> | T,
  defaultValue: T,
): ComputedRef<T> => {
  return computed(() => {
    const resolvedValue = isOfType<Ref>(value, 'value') ? value.value : value;

    return resolvedValue ?? defaultValue;
  });
};
