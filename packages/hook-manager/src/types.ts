/* eslint-disable @typescript-eslint/no-explicit-any */
import {ReadonlyOr} from '@myparcel/ts-utils';

export type HookCallback = (...args: any[]) => any;

export type HookManagerConfiguration<HN extends string = string> = {
  hookNames?: ReadonlyOr<HN[]>;
} & Record<HN, unknown>;

export type CustomHookItem<HN extends string = string> = {
  name: HN;
  callback: HookCallback;
};

export type ResolveHook<HN extends string> = string | `before${Capitalize<HN>}` | `after${Capitalize<HN>}` | HN;
