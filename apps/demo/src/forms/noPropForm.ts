import {defineField, defineForm} from '@myparcel-vfb/core';
import ComponentWithoutElementProp from '../components/ComponentWithoutElementProp.vue';
import {ref} from 'vue';

export const noPropForm = defineForm('noProps', {
  field: {
    elementProp: false,
  },

  fields: [
    defineField({
      name: 'noPropsHere',
      component: ComponentWithoutElementProp,
      ref: ref('propless life'),
    }),
  ],
});
