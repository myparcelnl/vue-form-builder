import {HookManager, HookManagerInstance} from './HookManager';
import {HookManagerConfiguration} from './types';

export const createHookManager = <HC extends HookManagerConfiguration = HookManagerConfiguration>(
  config: HC,
): HookManagerInstance<HC> => {
  return new HookManager(config);
};
