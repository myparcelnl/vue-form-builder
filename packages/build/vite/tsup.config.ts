import {createTsupConfig} from '@myparcel/vue-form-builder-build-tsup';

export default createTsupConfig({
  external: ['vue', 'vite', 'vitest', 'vite-plugin-dts', '@vitejs/plugin-vue'],
});
