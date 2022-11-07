import {createViteConfig} from '@myparcel-vfb/build-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig((env) => ({
  plugins: [vue()],

  build: {
    minify: env.mode === 'production',
    sourcemap: env.mode !== 'production',
    lib: {
      name: 'VueFormBuilder',
      entry: 'src/index.ts',
      formats: ['es', 'umd', 'iife', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
}));
