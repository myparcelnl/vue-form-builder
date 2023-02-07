/* eslint-disable @typescript-eslint/naming-convention */
import {App, Plugin} from 'vue';
import {FormConfiguration, useFormBuilder} from '@myparcel-vfb/core';
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

    if (process.env.NODE_ENV === 'development' || __VUE_PROD_DEVTOOLS__) {
      setupDevtools(app);
    }
  },
};

export const createMyParcelFormBuilderPlugin = (
  options?: MyParcelFormBuilderPluginOptions,
): MyParcelFormBuilderPlugin => ({
  install: (app) => MyParcelFormBuilderPlugin.install(app, options),
});
