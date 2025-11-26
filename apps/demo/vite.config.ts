import {createViteConfig} from '@myparcel-vfb/build-vite';

export default createViteConfig({
  build: {
    lib: false,
  },

  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'vue'`,
  },

  test: {
    testTimeout: 10000, // 10 seconds max per test
  },
});
