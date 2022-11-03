/* eslint-disable @typescript-eslint/no-explicit-any */
import {AllowedComponentProps, Component, ComputedRef, Ref, VNodeProps} from 'vue';

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

export type MakeOptional<Type, Key extends string | keyof Type> = Key extends keyof Type
  ? Omit<Type, Key> & Partial<Pick<Type, Key>>
  : Type;

export type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<
      InstanceType<C>['$props'],
      | keyof VNodeProps
      | keyof AllowedComponentProps
      | keyof Extract<InstanceType<C>['$props'], Record<`on${string}`, ((...args: any[]) => any) | null>>
    >
  : Record<string, unknown>;

export interface SelectOption {
  label: string;
  value: string;
}

export type MaybeRefOrComputed<T = unknown> = T | Ref<T> | ComputedRef<PromiseOr<T>>;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type UnionToOverloads<U> = UnionToIntersection<U extends any ? (f: U) => void : never>;

export type PopUnion<U> = UnionToOverloads<U> extends (a: infer A) => void ? A : never;

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

export type ResolvePromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

export type ReadonlyOr<T> = T | Readonly<T>;
