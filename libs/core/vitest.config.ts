import {defineConfig} from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],

  test: {
    coverage: {
      enabled: false,
      reporter: ['text', 'clover'],
    },
    dir: 'src',
    environment: 'happy-dom',
    setupFiles: './src/__tests__/setup.ts',
  },
});
