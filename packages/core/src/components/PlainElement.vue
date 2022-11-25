<template>
  <component
    :is="element.component"
    :id="element.name ?? element.name"
    :name="element.name"
    :label="element.label"
    :errors="element.formattedErrors()"
    v-bind="{...$attrs, ...element.props}"
    v-on="hooks">
    <template
      v-for="(slot, key) in element.slots"
      #[key]
      :key="key">
      <component :is="slot" />
    </template>
  </component>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {PlainElementInstance} from '../form';

export default defineComponent({
  name: 'PlainElement',
  inheritAttrs: false,
  props: {
    element: {
      type: Object as PropType<PlainElementInstance>,
      required: true,
    },
  },

  setup: (props) => {
    return {
      hooks: computed(() => {
        const registeredHooks = props.element.hooks.getRegisteredHooks();

        return registeredHooks.reduce(
          (acc, hook) => ({
            ...acc,
            [hook.name]: hook.callback,
          }),
          {
            click: props.element.click,
          },
        );
      }),
    };
  },
});
</script>
