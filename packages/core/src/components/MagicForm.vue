<template>
  <div :class="form.config.formClass">
    <template
      v-for="field in form.fields"
      :key="field.label">
      <Field
        v-if="field.hasOwnProperty('ref')"
        :field="field" />

      <PlainElement
        v-else
        :element="field" />
    </template>
  </div>
</template>

<script lang="ts">
import {PropType, defineComponent, provide} from 'vue';
import Field from './FieldComponent.vue';
import {FormInstance} from '../form';
import PlainElement from './BaseElementComponent.vue';
import {useLifeCycleHooks} from '../composables/useLifeCycleHooks';
import {INJECT_FORM} from '../provides';

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
