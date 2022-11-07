import {UserConfig} from 'vitest/config';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  plugins: [vue()],
  test: {
    environment: 'jsdom',
  },
};

export default config;
