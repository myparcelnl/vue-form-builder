<template>
  <form
    :class="form.config.formClass"
    @submit.prevent="form.submit"
  >
    <template
      v-for="(field, index) in form.fields"
      :key="`field--${field.name ?? 'unnamed'}--${index}`">
      <Field
        v-if="field.hasOwnProperty('ref')"
        :field="field" />

      <PlainElement
        v-else
        :element="field" />
    </template>
  </form>
</template>

<script lang="ts">
import {PropType, defineComponent, provide} from 'vue';
import Field from './FieldComponent.vue';
import {FormInstance} from '../form';
import {INJECT_FORM} from '../services/provides';
import PlainElement from './BaseElementComponent.vue';
import {useLifeCycleHooks} from '../composables/useLifeCycleHooks';

export default defineComponent({
  name: 'MagicForm',
  components: {
    PlainElement,
    Field,
  },

  props: {
    form: {
      type: Object as PropType<FormInstance>,
      required: true,
    },
  },

  setup: (props) => {
    provide(INJECT_FORM, props.form);

    useLifeCycleHooks(props.form.hooks, props.form);
  },
});
</script>
