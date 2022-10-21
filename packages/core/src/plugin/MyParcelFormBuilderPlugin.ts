import {App, Plugin} from 'vue';
import {FormConfiguration} from '../form';
import {setupDevtools} from './setupDevtools';
import {useFormBuilder} from '../composables';

export type MyParcelFormBuilderPlugin = Plugin;
export type MyParcelFormBuilderPluginOptions = Partial<FormConfiguration>;

/**
 * Plugin to register the form builder.
 */
export const MyParcelFormBuilderPlugin: MyParcelFormBuilderPlugin = {
  install(app: App, options: MyParcelFormBuilderPluginOptions) {
    // eslint-disable-next-line no-underscore-dangle
    app._context.config.globalProperties.$formBuilder = useFormBuilder();

    useFormBuilder().defaults = options;

    if (process.env.NODE_ENV === 'development' || __VUE_PROD_DEVTOOLS__) {
      setupDevtools(app);
    }
  },
};
