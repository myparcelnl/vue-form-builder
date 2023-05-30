<template>
  <TButton
    class="bg-transparent border-2 border-pink-500 text-pink-500"
    :element="element"
    type="reset">
    {{ translate('form_reset') }}
  </TButton>
</template>

<script lang="ts">
import {type PropType, defineComponent} from 'vue';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder/src';
import {translate} from '../../translate';
import TButton from './TButton.vue';

export default defineComponent({
  name: 'TSubmitButton',
  components: {TButton},
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },
  },

  setup: () => ({translate}),
});
</script>
