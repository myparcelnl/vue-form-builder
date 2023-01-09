import {Ref, UnwrapRef, isRef} from 'vue';
import {ShallowRef} from '@vue/reactivity';

export const getValue = <T>(input: T): T extends ShallowRef | Ref ? UnwrapRef<T> : T => {
  // @ts-expect-error todo
  return isRef(input) ? input.value : input;
};
