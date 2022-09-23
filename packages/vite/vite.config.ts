import {createViteConfig} from './src/createViteConfig';

export default createViteConfig({
  optimizeDeps: {
    exclude: ['vue', 'vite', 'vitest', 'vite-plugin-dts', '@vitejs/plugin-vue'],
  },
  build: {
    rollupOptions: {
      external: ['vue', 'vite', 'vitest', 'vite-plugin-dts', '@vitejs/plugin-vue'],
    },
    lib: {
      formats: ['es', 'cjs'],
      entry: 'src/main.ts',
    },
  },
});
