import {UserConfig} from 'vitest/config';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'clover'],
    },
  },
};

export default config;
