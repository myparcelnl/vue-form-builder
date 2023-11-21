<template>
  <TButton
    class="bg-transparent border-2 border-pink-500 text-pink-500"
    :element="element"
    type="reset">
    {{ translate('form_reset') }}
  </TButton>
</template>

<script lang="ts">
import {defineComponent, type PropType} from 'vue';
import {type PlainElementInstance} from '@myparcel/vue-form-builder';
import {translate} from '../../translate';
import TButton from './TButton.vue';

export default defineComponent({
  name: 'TSubmitButton',
  components: {TButton},
  props: {
    element: {
      type: Object as PropType<PlainElementInstance>,
      required: true,
    },
  },

  setup: () => ({translate}),
});
</script>
