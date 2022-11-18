<template>
  <InteractiveElement
    v-show="field.isVisible"
    v-if="field.hasOwnProperty('ref')"
    :element="field" />

  <PlainElement
    v-else
    v-show="field.isVisible"
    :element="field" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {AnyElementInstance} from '../types';
import InteractiveElement from './InteractiveElement.vue';
import PlainElement from './PlainElement.vue';

export default defineComponent({
  name: 'FormElement',
  components: {InteractiveElement, PlainElement},
  props: {
    field: {
      type: Object as PropType<AnyElementInstance>,
      required: true,
    },
  },
});
</script>
