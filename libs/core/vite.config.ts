import {createViteConfig} from '@myparcel-vfb/build-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig({
  plugins: [vue()],

  test: {
    environment: 'happy-dom',
    setupFiles: './src/__tests__/setup.ts',
  },
});
