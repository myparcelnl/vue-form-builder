import dts from 'vite-plugin-dts';
import {createViteConfig} from '@myparcel-vfb/build-vite';

export default createViteConfig(() => {
  return {
    plugins: [dts({entryRoot: 'src'})],

    build: {
      rollupOptions: {
        external: ['vue', 'vue-component-type-helpers', '@myparcel/ts-utils', '@vueuse/core', /@myparcel-vfb\/.*/],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  };
});
