import path from 'node:path';
import dts from 'vite-plugin-dts';
import customTsConfig from 'vite-plugin-custom-tsconfig';
import {mergeConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('vitest/config').UserConfigFn} */
const createCommonViteConfig = (env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [
      vue(),
      isProd && dts({entryRoot: 'src', aliasesExclude: [/@myparcel-vfb\/(.+)/, '@myparcel/vue-form-builder']}),
      customTsConfig({tsConfigPath: 'tsconfig.build.json'}),
    ],

    resolve: {
      alias: [
        {
          find: /^@myparcel-vfb\/(.+)/,
          replacement: path.resolve(__dirname, '../../libs/$1/src'),
        },
        {
          find: '@myparcel/vue-form-builder',
          replacement: path.resolve(__dirname, '../../apps/vue-form-builder/src'),
        },
      ],
    },

    build: {
      minify: isProd,
      sourcemap: !isProd,
      rollupOptions: {
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
      lib: {
        entry: 'src/index.ts',
        formats: ['es'],
        fileName: 'index',
      },
    },

    test: {
      coverage: {
        all: true,
        enabled: false,
        reporter: ['clover', 'text', ...isProd ? [] : ['html']],
      },
      environment: 'happy-dom',
      passWithNoTests: true,
    },
  };
};

/** @type {import('.').createViteConfig} */
export const createViteConfig = (config) => async(env) => {
  let resolvedConfig = config ?? {};

  if (typeof config === 'function') {
    resolvedConfig = await config(env);
  }

  return mergeConfig(await createCommonViteConfig(env), resolvedConfig);
};
