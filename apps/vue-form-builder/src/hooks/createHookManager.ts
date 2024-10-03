import {type HookManagerConfiguration} from '../types';
import {HookManager, type HookManagerInstance} from './HookManager';

export const createHookManager = <HC extends HookManagerConfiguration = HookManagerConfiguration>(
  config: HC,
): HookManagerInstance<HC> => {
  return new HookManager(config);
};
