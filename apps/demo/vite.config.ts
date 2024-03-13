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
});
