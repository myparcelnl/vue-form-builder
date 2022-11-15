<template>
  <button
    type="submit"
    class="bg-pink-600 inline-flex mt-2 px-5 py-3 rounded-full text-gray-900"
    :disabled="disabled || suspended"
    :class="{
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-wait': suspended,
      'hover:bg-pink-700': !disabled,
    }"
    @click="$emit('submit')">
    <LoadingOverlay v-if="suspended" />
    Submit
  </button>
</template>

<script lang="ts">
import LoadingOverlay from '../LoadingOverlay.vue';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TSubmitButton',
  components: {LoadingOverlay},
  props: {
    disabled: {
      type: Boolean,
    },

    suspended: {
      type: Boolean,
    },
  },

  emits: ['submit'],
});
</script>
