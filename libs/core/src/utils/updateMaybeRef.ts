import {isRef, type MaybeRef} from 'vue';

export const updateMaybeRef = <T>(maybeRef: MaybeRef<T>, value: T): void => {
  if (isRef(maybeRef)) {
    maybeRef.value = value;
    return;
  }

  maybeRef = value;
};
