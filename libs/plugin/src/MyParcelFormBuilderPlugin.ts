/* eslint-disable @typescript-eslint/naming-convention */
import {App, Plugin, UnwrapNestedRefs} from 'vue';
import {FormConfiguration, useFormBuilder} from '@myparcel-vfb/core';
import {setupDevtools} from './devtools';

export type MyParcelFormBuilderPlugin = Plugin;

export type MyParcelFormBuilderPluginOptions = UnwrapNestedRefs<Partial<FormConfiguration>>;

/**
 * Plugin to register the form builder.
 */
export const MyParcelFormBuilderPlugin: MyParcelFormBuilderPlugin = {
  install(app: App, options: MyParcelFormBuilderPluginOptions) {
    const formBuilder = useFormBuilder();

    // eslint-disable-next-line no-underscore-dangle
    app._context.config.globalProperties.$formBuilder = formBuilder;

    formBuilder.defaults.value = options;

    setupDevtools(app);
  },
};
