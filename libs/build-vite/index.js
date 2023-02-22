import customTsConfig from 'vite-plugin-custom-tsconfig';
import dts from 'vite-plugin-dts';
import {mergeConfig} from 'vite';

/** @type {import('vitest/config').UserConfigFn} */
const createCommonViteConfig = (env) => {
  const isProd = env.mode === 'production';
  return {
    plugins: [dts({entryRoot: 'src'}), customTsConfig()],

    build: {
      minify: isProd,
      sourcemap: !isProd,
      lib: {
        entry: 'src/index.ts',
        fileName: 'index',
        formats: ['es'],
      },
      rollupOptions: {
        external: ['vue', '@myparcel/sdk'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },

    test: {
      coverage: {
        enabled: false,
        reporter: ['text', 'clover'],
      },
      dir: 'src',
    },
  };
};

/** @type {import('.').createViteConfig} */
export const createViteConfig = (config) => async (env) => {
  let resolvedConfig = config ?? {};

  if (typeof config === 'function') {
    resolvedConfig = await config(env);
  }

  return mergeConfig(await createCommonViteConfig(env), resolvedConfig);
};
