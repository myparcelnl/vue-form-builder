<template>
  <component :is="`h${element.props.level}`">{{ element.props.text }}</component>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder/src';

export default defineComponent({
  name: 'Heading',
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },
  },
});
</script>
