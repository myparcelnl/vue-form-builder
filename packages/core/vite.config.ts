import {createViteConfig} from '@myparcel/vue-form-builder-vite';
import vue from '@vitejs/plugin-vue';

export default createViteConfig({
  plugins: [vue()],

  build: {
    lib: {
      name: 'VueFormBuilder',
      entry: 'src/main.ts',
    },

    rollupOptions: {
      external: ['vue', '@myparcel/sdk'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
