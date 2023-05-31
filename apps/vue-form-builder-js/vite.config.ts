import dts from 'vite-plugin-dts';
import customTsConfig from 'vite-plugin-custom-tsconfig';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig((env) => {
  const isProd = env.mode === 'production';

  return {
    plugins: [vue(), dts({entryRoot: 'src'}), customTsConfig()],
    build: {
      minify: isProd,
      sourcemap: !isProd,
      lib: {
        entry: 'src/index.ts',
        fileName: 'index',
        formats: ['es'],
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
