import {Component, FunctionalComponent, h, inject} from 'vue';
import FormElement from './FormElement.vue';
import {INJECT_FORM} from '../services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WrappedFormElement: FunctionalComponent = (props, ctx) => {
  const form = inject(INJECT_FORM);

  const renderedFormElement = h(FormElement as Component, {...ctx.attrs, ...props}, ctx.slots);

  console.log(renderedFormElement);

  if (form?.config.formElementWrapper) {
    return h(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      form.config.formElementWrapper,
      {
        ...ctx.attrs,
        class: form?.config.formElementWrapperClass,
      },
      [renderedFormElement],
    );
  }

  return renderedFormElement;
};
