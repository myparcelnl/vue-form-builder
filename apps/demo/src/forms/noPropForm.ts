import {ref} from 'vue';
import {defineField, defineForm} from '@myparcel/vue-form-builder/ts';
import FormGroupWithoutElementProp from '../components/FormGroupWithoutElementProp.vue';
import ComponentWithoutElementProp from '../components/ComponentWithoutElementProp.vue';

export const noPropForm = defineForm('noProps', {
  field: {
    elementProp: false,
    wrapper: FormGroupWithoutElementProp,
  },

  fields: [
    defineField({
      name: 'noPropsHere',
      component: ComponentWithoutElementProp,
      ref: ref('propless life'),
    }),
  ],
});
