<template>
  <div class="grid grid-cols-2 items-center justify-center relative w-full">
    <div>
      <label
        v-if="label"
        :for="name"
        v-text="label" />
      <span
        v-if="optional"
        v-text="translate('form_optional_suffix')" />
    </div>

    <div>
      <slot />
    </div>

    <div
      v-if="errors.length"
      class="bg-red-700 border border-red-800 col-span-2 dark:bg-red-900 mt-3 p-5 rounded-lg">
      <ul>
        <li
          v-for="warning in errors"
          :key="warning"
          v-text="warning" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {translate} from '../../translate';

export default defineComponent({
  name: 'FormGroup',
  props: {
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    label: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      default: null,
    },

    optional: {
      type: Boolean,
    },
  },

  setup: () => {
    return {
      translate,
    };
  },
});
</script>
