/* eslint-disable @typescript-eslint/naming-convention,no-underscore-dangle */
import {App, Plugin} from 'vue';
import {FormConfiguration, useFormBuilder} from '@myparcel-vfb/form-builder';
import {setupDevtools} from './devtools';

export type MyParcelFormBuilderPlugin = Plugin;

export type MyParcelFormBuilderPluginOptions = Partial<FormConfiguration>;

/**
 * Plugin to register the form builder.
 */
export const MyParcelFormBuilderPlugin: MyParcelFormBuilderPlugin = {
  install(app: App, options: MyParcelFormBuilderPluginOptions) {
    const formBuilder = useFormBuilder();

    app._context.config.globalProperties.$formBuilder = formBuilder;

    formBuilder.defaults.value = options;

    if (import.meta.env.DEV || __VUE_PROD_DEVTOOLS__) {
      setupDevtools(app);
    }
  },
};
