import TSubmitButton from '../components/template/TSubmitButton.vue';
import {defineForm} from '@myparcel/vue-form-builder';

export const useShipmentOptionsForm = (): any => {
  return defineForm('tellAFriend', {
    fields: [
      {},
      {
        component: TSubmitButton,
      },
    ],
  });
};
