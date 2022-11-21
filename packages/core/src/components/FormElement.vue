<template>
  <template v-if="field.teleportSelector">
    <Teleport
      v-if="isLoaded"
      :to="field.teleportSelector">
      <InteractiveElement
        v-show="field.isVisible"
        v-if="field.hasOwnProperty('ref')"
        :element="field" />
      <PlainElement
        v-else
        v-show="field.isVisible"
        :element="field" />
    </Teleport>
  </template>
  <template v-else>
    <InteractiveElement
      v-show="field.isVisible"
      v-if="field.hasOwnProperty('ref')"
      :element="field" />
    <PlainElement
      v-else
      v-show="field.isVisible"
      :element="field" />
  </template>
</template>

<script lang="ts">
import {PropType, defineComponent, onMounted, ref} from 'vue';
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

  setup: () => {
    const isLoaded = ref(false);

    onMounted(() => {
      isLoaded.value = true;
    });

    return {
      isLoaded,
    };
  },
});
</script>
