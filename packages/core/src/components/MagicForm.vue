<template>
  <form
    :id="form.name"
    :class="[
      form.config.formClass,
      {
        valid: form.isValid,
        invalid: !form.isValid,
      },
    ]"
    @submit.prevent="form.submit">
    <template
      v-for="(field, index) in form.fields"
      :key="`field--${field.name ?? 'unnamed'}--${index}`">
      <InteractiveElement
        v-if="field.hasOwnProperty('ref')"
        :element="field" />

      <PlainElement
        v-else
        :element="field" />
    </template>
  </form>
</template>

<script lang="ts">
import {PropType, defineComponent, provide} from 'vue';
import {FormInstance} from '../../../form-builder/src';
import {INJECT_FORM} from '../services';
import InteractiveElement from './InteractiveElement.vue';
import PlainElement from './BaseElement.vue';
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

    const lifeCycleHooks = useLifeCycleHooks();

    lifeCycleHooks.register(props.form.hooks, props.form);
  },
});
</script>
