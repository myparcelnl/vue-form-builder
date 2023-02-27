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
import {AnyElementInstance} from '../types';
import {computed} from 'vue';
import {createElementHooks} from '../composables';

const props = defineProps<{
  element: AnyElementInstance;
}>();

defineEmits<(event: 'blur' | 'focus' | 'click', value: boolean) => void>();

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
    ...(typeof props.element.component === 'string' || elementProp === false ? {} : {element: props.element}),
  };
});

const model = computed({
  get() {
    return props.element.ref;
  },

  set(value) {
    // eslint-disable-next-line vue/no-mutating-props
    props.element.ref = value;
  },
});
</script>
