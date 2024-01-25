import {copyFileSync} from 'node:fs';
import dts from 'vite-plugin-dts';
import customTsConfig from 'vite-plugin-custom-tsconfig';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig((env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [
      vue(),
      dts({
        entryRoot: 'src',
        afterBuild: () => {
          // To pass publint (`npm x publint@latest`) and ensure the
          // package is supported by all consumers, we must export types that are
          // read as ESM. To do this, there must be duplicate types with the
          // correct extension supplied in the package.json exports field.
          copyFileSync('dist/index.d.ts', 'dist/index.d.cts');
        },
      }),
      customTsConfig(),
    ],
    build: {
      minify: false,
      sourcemap: !isProd,
      lib: {
        entry: 'src/index.ts',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['vue', '@myparcel/ts-utils'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  };
});
