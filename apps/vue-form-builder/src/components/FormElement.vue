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
import {computed, toRefs, unref, isRef, type Ref} from 'vue';
import type {ComponentProps} from '../types/component.types';
import type {FieldInstance} from '../types/field.types';
import {createFieldHooks} from '../composables/createFieldHooks';

const props = defineProps<{element: FieldInstance}>();

const propRefs = toRefs(props);

createFieldHooks(propRefs.element.value);

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
    return unref(props.element.ref);
  },

  set(value) {
    if (isRef(props.element.ref)) {
      // eslint-disable-next-line vue/no-mutating-props
      props.element.ref.value = value;
    } else {
      // eslint-disable-next-line vue/no-mutating-props
      props.element.ref = value as Ref;
    }
  },
});
</script>
