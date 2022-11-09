import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';

export default defineConfig((env) => ({
  plugins: [dts({entryRoot: 'src'}), vue()],

  build: {
    outDir: 'lib',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    minify: env.mode === 'production',
    sourcemap: env.mode !== 'production',
    rollupOptions: {
      external: [
        '@myparcel-vfb/form-builder',
        '@myparcel-vfb/hook-manager',
        '@myparcel-vfb/plugin',
        '@myparcel-vfb/utils',
        'vue',
      ],
    },
  },
}));
