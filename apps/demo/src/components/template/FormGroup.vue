<template>
  <div class="flex flex-col">
    <label
      v-if="element.label"
      v-text="element.label" />

    <span
      v-if="element.isOptional"
      v-text="translate('form_optional_suffix')" />

    <slot />

    <template v-if="element.errors?.length">
      <div class="bg-red-700 border border-red-800 col-span-2 dark:bg-red-900 mt-3 p-5 rounded-lg">
        <ul>
          <li
            v-for="warning in element.errors"
            :key="warning"
            v-text="warning" />
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder/src';
import {translate} from '../../translate';

export default defineComponent({
  name: 'FormGroup',
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },
  },

  setup: () => {
    return {
      translate,
    };
  },
});
</script>
