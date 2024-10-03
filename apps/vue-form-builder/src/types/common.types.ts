import {type UnwrapNestedRefs} from 'vue';

export type ToRecord<T> = {
  [K in keyof T]: T[K];
};

export type MaybeUnwrapNestedRefs<T> = UnwrapNestedRefs<T> | T;
