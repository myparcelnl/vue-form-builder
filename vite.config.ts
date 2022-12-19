import {UserConfig} from 'vitest/config';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    coverage: {
      enabled: false,
      exclude: ['apps/demo/**', '**/lib/**', '**/__tests__/**', '**/*.spec.*'],
      reporter: ['text', 'clover', 'html'],
    },
  },
};

export default config;
