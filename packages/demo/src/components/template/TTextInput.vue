<template>
  <FormGroup v-bind="{label, id, errors, optional}">
    <LoadingOverlay v-if="suspended" />
    <PTextInput v-bind="{...$attrs, ...$props}" />
  </FormGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import FormGroup from './FormGroup.vue';
import LoadingOverlay from '../LoadingOverlay.vue';
import PTextInput from './PTextInput.vue';

export default defineComponent({
  name: 'TTextInput',
  components: {LoadingOverlay, FormGroup, PTextInput},
  inheritAttrs: false,
  props: {
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    id: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: null,
    },

    optional: {
      type: Boolean,
    },

    suspended: {
      type: Boolean,
    },
  },
});
</script>
