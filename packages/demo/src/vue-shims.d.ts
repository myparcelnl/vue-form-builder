/* eslint-disable */
// noinspection JSUnusedGlobalSymbols

declare module '*.vue' {
  import {DefineComponent} from 'vue';

  const component: DefineComponent<any, any, any>;
  export default component;
}

declare module 'vue' {
  import * as Vue from 'vue';
  import {MyParcelFormBuilderPlugin, MyParcelFormBuilderPluginOptions} from '@myparcel/vue-form-builder';
  import {App} from 'vue';

  type NewApp = App & {
    use(plugin: MyParcelFormBuilderPlugin, ...options: MyParcelFormBuilderPluginOptions): this;
  };

  export default Vue;
}

declare const __VUE_HMR_RUNTIME__: Record<string, any>;
declare const __VUE_OPTIONS_API__: boolean;
declare const __VUE_PROD_DEVTOOLS__: boolean;
