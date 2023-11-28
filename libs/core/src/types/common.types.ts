export type ToRecord<T> = {
  [K in keyof T]: T[K];
};
