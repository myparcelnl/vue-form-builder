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
import {type FieldInstance, FIELD_INSTANCE_PROPS_KEYS} from '../types/field.types';
import {type ComponentProps} from '../types/component.types';
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

  /**
   * Spread properties from `elementProp` array to `newProps`
   * When the prop name is in the FieldInstanceProps
   */
  if (elementProp === 'spread') {
    Object.keys(props.element).forEach((key) => {
      const keyName = key as (typeof FIELD_INSTANCE_PROPS_KEYS)[number];

      if (FIELD_INSTANCE_PROPS_KEYS.includes(keyName)) {
        newProps[key] = props.element[keyName];
      }
    });
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
