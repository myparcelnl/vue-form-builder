import {HookManager} from './HookManager';
import {HookManagerConfiguration} from './types';

export const createHookManager = <HN extends string, HC extends HookManagerConfiguration<HN>>(
  config: HC,
): HookManager<HN, HC> => {
  return new HookManager(config);
};
