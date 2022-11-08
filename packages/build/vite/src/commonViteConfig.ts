import {UserConfigFn} from 'vitest/config';
import dts from 'vite-plugin-dts';

export const commonViteConfig: UserConfigFn = (env) => ({
  plugins: [dts({entryRoot: 'src'})],

  build: {
    emptyOutDir: true,
    outDir: 'lib',
    minify: env.mode === 'production',
    sourcemap: env.mode !== 'production',
    rollupOptions: {
      external: ['vue', '@myparcel/sdk', '@myparcel-vfb/*'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

  test: {
    dir: 'src',
    coverage: {
      reporter: ['text', 'clover'],
    },
  },
});
