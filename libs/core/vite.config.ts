import vue from '@vitejs/plugin-vue';
import {createViteConfig} from '@myparcel-vfb/build-vite';

export default createViteConfig({
  plugins: [vue()],

  test: {
    environment: 'happy-dom',
    setupFiles: './src/__tests__/setup.ts',
  },
});
