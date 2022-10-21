import {createViteConfig} from '@myparcel/vue-form-builder-build-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig({
  plugins: [vue()],

  build: {
    lib: {
      name: 'VueFormBuilder',
      entry: 'src/index.ts',
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
