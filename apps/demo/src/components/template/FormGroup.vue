<template>
  <div
    v-show="element.isVisible"
    class="flex flex-col">
    <label
      v-if="element.label"
      v-text="element.label" />
    <slot name="info-before" />
    <span
      v-if="element.isOptional"
      v-text="translate('form_optional_suffix')" />

    <slot />
    <slot name="info-after" />

    <template v-if="element.errors?.length">
      <ErrorBox :errors="element.errors" />
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent, type PropType, type UnwrapNestedRefs} from 'vue';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {translate} from '../../translate';
import ErrorBox from './ErrorBox.vue';

export default defineComponent({
  name: 'FormGroup',
  components: {ErrorBox},
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
