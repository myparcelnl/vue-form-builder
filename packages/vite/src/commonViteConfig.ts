import {UserConfigFn} from 'vitest/config';
import dts from 'vite-plugin-dts';

export const commonViteConfig: UserConfigFn = (env) => ({
  plugins: [dts(/* {skipDiagnostics: env.mode === 'production', logDiagnostics: env.mode !== 'production'} */)],

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
