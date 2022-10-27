<template>
  <form
    :id="form.name"
    :class="[
      form.config.formClass,
      { valid: form.isValid },
      { invalid: !form.isValid },
    ]"
    @submit.prevent="form.submit"
  >
    <template
      v-for="(field, index) in form.fields"
      :key="`field--${field.name ?? 'unnamed'}--${index}`">
      <InteractiveElement
        v-if="isOfType(field, 'ref')"
        :field="field" />

      <PlainElement
        v-else
        :element="field" />
    </template>
  </form>
</template>

<script lang="ts">
import {PropType, defineComponent, provide} from 'vue';
import {FormInstance} from '../form';
import {INJECT_FORM} from '../services';
import InteractiveElement from './InteractiveElement.vue';
import PlainElement from './BaseElement.vue';
import {isOfType} from '@myparcel/vue-form-builder-utils';
import {useLifeCycleHooks} from '../composables';

export default defineComponent({
  name: 'MagicForm',
  components: {
    InteractiveElement,
    PlainElement,
  },

  props: {
    form: {
      type: Object as PropType<FormInstance>,
      required: true,
    },
  },

  setup: (props) => {
    provide(INJECT_FORM, props.form);

    useLifeCycleHooks(props.form.hooks as any, props.form);

    return {
      isOfType,
    };
  },
});
</script>
