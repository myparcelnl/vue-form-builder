import {createViteConfig} from '@myparcel-vfb/build-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig({
  plugins: [vue()],
});