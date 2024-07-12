import dts from 'vite-plugin-dts';
import {createViteConfig} from '@myparcel-vfb/build-vite';

export default createViteConfig(() => ({
  plugins: [dts({entryRoot: 'src'})],
}));
