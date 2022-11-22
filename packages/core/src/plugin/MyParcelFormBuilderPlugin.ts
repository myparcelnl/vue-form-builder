/* eslint-disable @typescript-eslint/naming-convention */
import {App, Plugin, UnwrapNestedRefs} from 'vue';
import {FormConfiguration} from '../form';
import {setupDevtools} from './devtools';
import {useFormBuilder} from '../composables';
import VueSafeTeleport from 'vue-safe-teleport'

export type MyParcelFormBuilderPlugin = Plugin;

export type MyParcelFormBuilderPluginOptions = UnwrapNestedRefs<Partial<FormConfiguration>>;

/**
 * Plugin to register the form builder.
 */
export const MyParcelFormBuilderPlugin: MyParcelFormBuilderPlugin = {
  install(app: App, options: MyParcelFormBuilderPluginOptions) {
    app.use(VueSafeTeleport);

    const formBuilder = useFormBuilder();

    // eslint-disable-next-line no-underscore-dangle
    app._context.config.globalProperties.$formBuilder = formBuilder;

    formBuilder.defaults.value = options;

    if (import.meta.env.DEV || __VUE_PROD_DEVTOOLS__) {
      setupDevtools(app);
    }
  },
};
