<template>
  <button
    :class="{
      'opacity-50 cursor-not-allowed': element.isDisabled,
      'cursor-wait': element.isSuspended,
      'hover:bg-pink-700': !outline && !element.isDisabled,
      'hover:bg-pink-600': outline && !element.isDisabled,
      'bg-pink-600 text-gray-900': !outline,
      'border border-pink-600 hover:bg-pink-600 hover:text-white text:pink-600': outline,
    }"
    :disabled="element.isDisabled || element.isSuspended"
    class="inline-flex mt-2 px-5 py-3 rounded-full transition-colors"
    type="submit">
    <slot
      :icon="icon"
      :scope="element.name"
      name="icon" />

    <LoadingOverlay v-if="element.isSuspended" />

    <slot>
      {{ translate('form_submit') }}
    </slot>
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

    icon: {
      type: String,
      default: '🍀',
    },

    outline: {
      type: Boolean,
    },
  },

  setup: () => ({
    translate,
  }),
});
</script>
