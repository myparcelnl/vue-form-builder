<template>
  <component
    :is="element.component"
    v-model="model"
    v-bind="attributes">
    <template
      v-for="name in Object.keys($slots)"
      :key="name"
      #[name]="scope">
      <slot
        :name="name"
        v-bind="scope || {}" />
    </template>
  </component>
</template>

<script lang="ts" setup>
import {computed, toRefs} from 'vue';
import {type AnyElementInstance} from '../types';
import {createElementHooks} from '../composables';

const props = defineProps<{element: AnyElementInstance}>();

const propRefs = toRefs(props);

defineEmits<(event: 'blur' | 'focus' | 'click', value: boolean) => void>();

const elementProp = propRefs.element.value;

createElementHooks(elementProp);

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
