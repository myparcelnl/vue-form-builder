import {UserConfigFn} from 'vitest/config';
import dts from 'vite-plugin-dts';

export const commonViteConfig: UserConfigFn = (env) => ({
  plugins: [dts()],

  build: {
    outDir: 'lib',
    minify: env.mode === 'production',
    sourcemap: env.mode !== 'production',
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
    dir: 'packages',
    coverage: {
      reporter: ['text', 'clover'],
    },
  },
});
