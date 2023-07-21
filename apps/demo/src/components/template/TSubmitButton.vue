<template>
  <button
    type="submit"
    class="bg-pink-600 inline-flex mt-2 px-5 py-3 rounded-full text-gray-900"
    :disabled="element.isDisabled || element.isSuspended"
    :class="{
      'opacity-50 cursor-not-allowed': element.isDisabled,
      'cursor-wait': element.isSuspended,
      'hover:bg-pink-700': !element.isDisabled,
    }">
    <LoadingOverlay v-if="element.isSuspended" />
    {{ translate('form_submit') }}
  </button>
</template>

<script lang="ts">
import {defineComponent, type PropType} from 'vue';
import {type PlainElementInstance} from '@myparcel/vue-form-builder';
import LoadingOverlay from '../LoadingOverlay.vue';
import {translate} from '../../translate';

export default defineComponent({
  name: 'TSubmitButton',
  components: {LoadingOverlay},
  props: {
    element: {
      type: Object as PropType<PlainElementInstance>,
      required: true,
    },
  },

  setup: () => ({
    translate,
  }),
});
</script>
