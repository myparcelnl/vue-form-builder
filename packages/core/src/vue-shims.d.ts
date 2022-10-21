/* eslint-disable @typescript-eslint/no-explicit-any,no-underscore-dangle */

declare module '*.vue' {
  import {DefineComponent} from 'vue';
  const component: DefineComponent<any, any, any>;
  export default component;
}

declare const __VUE_HMR_RUNTIME__: Record<string, any>;
declare const __VUE_OPTIONS_API__: boolean;
declare const __VUE_PROD_DEVTOOLS__: boolean;
