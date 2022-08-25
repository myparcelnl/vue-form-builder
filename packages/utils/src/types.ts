import {AllowedComponentProps, Component, VNodeProps} from 'vue';

export type RecursiveRequired<T> = Required<{
  [P in keyof T]: T[P] extends object | undefined ? RecursiveRequired<Required<T[P]>> : T[P];
}>;

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type Identity<T> = {[P in keyof T]: T[P]};

export type Replace<T, K extends keyof T, TReplace> = Pick<T, Exclude<keyof T, K>> & {
  [P in K]: TReplace;
};

export type RequireOnly<K, T extends keyof K> = Required<Pick<K, T>> & Partial<Omit<K, T>>;
export type PromiseOr<T> = Promise<T> | T;

export type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never;

export type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;

export interface SelectOption {
  label: string;
  value: string;
}
