import {UserConfigExport} from 'vitest/dist/config';
import {UserConfigFn} from 'vitest/config';
import {commonViteConfig} from './commonViteConfig';
import {mergeConfig} from 'vite';

type CreateViteConfig = (config: UserConfigExport) => UserConfigFn;

export const createViteConfig: CreateViteConfig = (config) => async (env) => {
  let resolvedConfig: UserConfigExport = config;

  if (typeof config === 'function') {
    resolvedConfig = config(env);
  }

  return mergeConfig(commonViteConfig(env), await resolvedConfig);
};
