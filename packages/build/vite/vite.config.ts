import {createViteConfig} from './src';

export default createViteConfig({
  optimizeDeps: {
    exclude: ['vue', 'vite', 'vitest', 'vite-plugin-dts', '@vitejs/plugin-vue'],
  },
  build: {
    rollupOptions: {
      external: ['vue', 'vite', 'vitest', 'vite-plugin-dts', '@vitejs/plugin-vue'],
    },
    lib: {
      formats: ['es'],
      entry: 'src/index.ts',
    },
  },
});
