import {HookCallback, HookManager, HookNamesObject} from './HookManager';

export type InputHookConfiguration<HN extends string = string> = Record<string, unknown> & {
  hookNames: Array<HN> | ReadonlyArray<HN>;
};

export type HookManagerInput<
  T extends Array<string> | ReadonlyArray<string>,
  H extends Record<string, HookCallback>,
> = {
  hookNames: T;
} & H;

export const createHookManager = <HN extends string, HC extends HookNamesObject<HN> & InputHookConfiguration<HN>>(
  config: HC,
) => {
  return new HookManager<HC>(config);
};
