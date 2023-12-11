<template>
  <tr v-show="element.isVisible">
    <th class="px-3 py-1 text-right">
      <label
        v-if="element.label"
        v-text="element.label" />
      <span
        v-if="element.isOptional"
        v-text="translate('form_optional_suffix')" />
    </th>

    <td class="px-3 py-1">
      <slot />
    </td>

    <td
      v-if="element.errors?.length"
      colspan="2">
      <div class="bg-red-700 border border-red-800 col-span-2 dark:bg-red-900 mt-3 p-5 rounded-lg">
        <ul>
          <li
            v-for="warning in element.errors"
            :key="warning"
            v-text="warning" />
        </ul>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import {type PropType, defineComponent} from 'vue';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder/ts';
import {translate} from '../../translate';

export default defineComponent({
  name: 'TableFormGroup',
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
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
