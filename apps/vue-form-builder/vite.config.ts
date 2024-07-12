import dts from 'vite-plugin-dts';
import {createViteConfig} from '@myparcel-vfb/build-vite';

export default createViteConfig(() => {
  return {
    plugins: [dts({entryRoot: 'src'})],

    build: {
      rollupOptions: {
        external: ['vue', '@myparcel/ts-utils', '@vueuse/core'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  };
});
