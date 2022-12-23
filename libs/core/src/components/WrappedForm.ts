import {Component, FunctionalComponent, h, inject} from 'vue';
import {INJECT_FORM} from '../services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WrappedForm: FunctionalComponent = (props, ctx) => {
  const form = inject(INJECT_FORM);

  if (form?.config.formWrapper) {
    return h(
      form.config.formWrapper as Component,
      {
        ...ctx.attrs,
        class: [ctx.attrs.class, form?.config.formWrapperClass],
      },
      ctx.slots,
    );
  }

  return ctx.slots.default?.();
};
