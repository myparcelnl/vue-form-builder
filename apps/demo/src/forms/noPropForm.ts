import {defineField, defineForm} from '@myparcel/vue-form-builder/src';
import ComponentWithoutElementProp from '../components/ComponentWithoutElementProp.vue';
import FormGroupWithoutElementProp from '../components/FormGroupWithoutElementProp.vue';
import {ref} from 'vue';

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
