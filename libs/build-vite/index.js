import path from 'node:path';
import customTsConfig from 'vite-plugin-custom-tsconfig';
import {mergeConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {codecovVitePlugin} from '@codecov/vite-plugin';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('vitest/config').UserConfigFn} */
const createCommonViteConfig = (env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [
      codecovVitePlugin({
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
        bundleName: 'vue-form-builder',
        uploadToken: process.env.CODECOV_TOKEN,
      }),
      vue(),
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
      reporters: ['default', ['junit', {outputFile: './junit.xml'}]],
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
