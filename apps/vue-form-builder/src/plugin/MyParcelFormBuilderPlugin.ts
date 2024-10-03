/* eslint-disable @typescript-eslint/naming-convention */
import {type App, type Plugin} from 'vue';
import {type FormConfiguration} from '../types';
import {useFormBuilder} from '../composables';
import {setupDevtools} from './devtools';

export type MyParcelFormBuilderPlugin = Plugin;

export type MyParcelFormBuilderPluginOptions = Partial<FormConfiguration>;

/**
 * Plugin to register the form builder.
 */
export const MyParcelFormBuilderPlugin: MyParcelFormBuilderPlugin = {
  install(app: App, options?: MyParcelFormBuilderPluginOptions) {
    const formBuilder = useFormBuilder();

    // eslint-disable-next-line no-underscore-dangle
    app._context.config.globalProperties.$formBuilder = formBuilder;

    if (options) {
      formBuilder.setDefaults(options);
    }

    if (import.meta.env.DEV || __VUE_PROD_DEVTOOLS__) {
      setupDevtools(app);
    }
  },
};

export const createMyParcelFormBuilderPlugin = (
  options?: MyParcelFormBuilderPluginOptions,
): MyParcelFormBuilderPlugin => ({
  install: (app) => MyParcelFormBuilderPlugin.install(app, options),
});
