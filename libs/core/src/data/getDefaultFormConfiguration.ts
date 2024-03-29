import {type InstanceFormConfiguration} from '../types';

export const getDefaultFormConfiguration = (): InstanceFormConfiguration => ({
  field: {
    elementProp: true,
  },

  fieldDefaults: {
    attributes: {},
    wrapper: true,
  },

  fields: [],

  form: {
    attributes: {},
    tag: 'form',
  },
});
