import {type InstanceFormConfiguration} from '../types/form.types';

export const getDefaultFormConfiguration = (): InstanceFormConfiguration => ({
  field: {
    elementProp: true,
  },

  fieldDefaults: {
    attributes: {},
    wrapper: true,
  },

  form: {
    attributes: {},
    tag: 'form',
  },
});
