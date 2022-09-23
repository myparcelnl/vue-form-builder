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
    console.log('install', options, useFormBuilder());

    if (process.env.NODE_ENV === 'development') {
      setupDevtools(app);
    }
  },
};
