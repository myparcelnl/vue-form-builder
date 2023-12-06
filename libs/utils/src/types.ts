/* eslint-disable @typescript-eslint/no-explicit-any */
import {type HTMLAttributes} from 'vue';

export interface SelectOption {
  label: string;
  value: string;
}

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type UnionToOverloads<U> = UnionToIntersection<U extends any ? (f: U) => void : never>;

export type PopUnion<U> = UnionToOverloads<U> extends (a: infer A) => void ? A : never;

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

export type FunctionOr<T> = (() => T) | T;

export type AnyAttributes = HTMLAttributes & Record<string, unknown>;
