import * as Vue from 'vue';
import {MyParcelFormBuilderPlugin, MyParcelFormBuilderPluginOptions} from '@myparcel/vue-form-builder';
import {App} from 'vue';

declare module 'vue' {
  type NewApp = App & {
    use(plugin: MyParcelFormBuilderPlugin, ...options: MyParcelFormBuilderPluginOptions): this;
  };

  export default Vue;
}
