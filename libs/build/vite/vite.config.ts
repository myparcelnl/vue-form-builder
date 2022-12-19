import {createViteConfig} from './src';

export default createViteConfig({
  build: {
    rollupOptions: {
      external: ['vue', 'vite', 'vitest', 'vite-plugin-dts', '@vitejs/plugin-vue'],
    },
  },
});
