/* eslint-disable @typescript-eslint/no-explicit-any */
import {ReadonlyOr} from '@myparcel/vue-form-builder-utils/src';

export type HookCallback = (...args: any[]) => any;

export type HookNamesObject<HN extends string = string> = {
  hookNames?: HookNames<HN>;
};

export type HookManagerConfiguration<HN extends string = string> = HookNamesObject<HN> & Record<string, unknown>;

export type CustomHookItem<HN extends string> = {
  name: HN;
  callback: HookCallback;
};

export type HookNames<HN extends string> = ReadonlyOr<(string | HN)[]>;
