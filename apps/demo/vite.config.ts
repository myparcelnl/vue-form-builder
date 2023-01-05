import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {viteExternalsPlugin} from 'vite-plugin-externals';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    viteExternalsPlugin({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      '@tanstack/vue-query': 'VueQuery',
    }),
  ],

  // build: {
  //   sourcemap: true,
  //   rollupOptions: {
  //     external: ['vue', 'vue-router', '@tanstack/vue-query'],
  //     output: {
  //       globals: {
  //         vue: 'Vue',
  //         'vue-router': 'VueRouter',
  //         '@tanstack/vue-query': 'VueQuery',
  //       },
  //     },
  //     plugins: [visualizer({filename: './dist/stats.html'})],
  //   },
  // },
});
