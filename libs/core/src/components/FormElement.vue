<template>
  <component
    :is="element.component"
    v-model="model"
    v-bind="attributes"
    v-on="hooks">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps} from 'vue';
import {AnyElementInstance} from '../types';
import {createElementHooks} from '../composables';
import {useVModel} from '@vueuse/core';

const props = defineProps<{
  element: AnyElementInstance;
}>();

const emit = defineEmits<(event: 'blur' | 'focus' | 'click', value: boolean) => void>();

const hooks = createElementHooks(props.element, {
  blur: props.element.blur,
  focus: props.element.focus,
  click: props.element.click,
});

/**
 * Collect attributes. Always adds `element.attributes`, but only adds `element` if element is a Vue component.
 */
const attributes = computed(() => {
  const elementProp = props.element.form?.config.field?.elementProp;

  return {
    ...props.element.attributes,
    ...(typeof props.element.component === 'string' || !elementProp ? {} : {element: props.element}),
  };
});

const model = useVModel(props, undefined, emit);
</script>
