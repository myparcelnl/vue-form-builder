<template>
  <a
    role="button"
    class="bg-pink-600 hover:bg-pink-700 inline-flex mt-2 px-5 py-3 rounded-full text-gray-900"
    @click="form?.submit">
    Submit
  </a>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
import {INJECT_FORM} from '@myparcel/vue-form-builder';

export default defineComponent({
  name: 'TSubmitButton',

  setup: () => {
    const form = inject(INJECT_FORM);

    return {form};
  },
});
</script>
