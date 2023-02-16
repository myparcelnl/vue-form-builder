import {InstanceFormConfiguration} from './Form.types';

export const DEFAULT_FORM_CONFIGURATION: InstanceFormConfiguration = {
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
};
