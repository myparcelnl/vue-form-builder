import {createTsupConfig} from '@myparcel-vfb/build-tsup';

export default createTsupConfig({
  external: ['vue', 'vite', 'vitest', 'vite-plugin-dts', '@vitejs/plugin-vue'],
});
