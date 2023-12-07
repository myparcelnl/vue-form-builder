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
import {computed, toRefs, type Ref, unref} from 'vue';
import {type AnyElementInstance, type InteractiveElementInstance, type ComponentProps} from '../types';
import {createElementHooks} from '../composables';

const props = defineProps<{element: AnyElementInstance}>();

const propRefs = toRefs(props);

createElementHooks(propRefs.element.value);

/**
 * Collect attributes. Always adds `element.attributes`, but only adds `element` if element is a Vue component.
 */
const attributes = computed(() => {
  const elementProp = props.element.form?.config.field?.elementProp;

  const newProps: ComponentProps = {
    ...props.element.attributes,
  };

  if (typeof props.element.component !== 'string' && elementProp !== false) {
    newProps.element = props.element;
  }

  return newProps;
});

const model = computed({
  get() {
    return unref((props.element as InteractiveElementInstance).ref);
  },

  set(value) {
    (props.element as InteractiveElementInstance).ref = value as Ref;
  },
});
</script>
