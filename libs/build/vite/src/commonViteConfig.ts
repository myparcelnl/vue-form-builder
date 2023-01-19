import {UserConfigFn} from 'vitest/config';
import customTsConfig from 'vite-plugin-custom-tsconfig';
import dts from 'vite-plugin-dts';

export const commonViteConfig: UserConfigFn = (env) => ({
  plugins: [dts({entryRoot: 'src'}), customTsConfig()],

  build: {
    emptyOutDir: true,
    outDir: 'lib',
    minify: env.mode === 'production',
    sourcemap: env.mode !== 'production',
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
});
