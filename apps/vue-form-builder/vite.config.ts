import {createViteConfig} from '@myparcel-vfb/build-vite';

export default createViteConfig(() => {
  return {
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
