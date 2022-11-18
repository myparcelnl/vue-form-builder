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
      v-for="(field, index) in fields"
      :key="`field--${field.name ?? 'unnamed'}--${index}`">
      <Teleport
        v-if="field.teleportSelector"
        :to="field.teleportSelector">
        <FormElement :field="field" />
      </Teleport>

      <template v-else>
        <FormElement :field="field" />
      </template>
    </template>
  </form>
</template>

<script lang="ts">
import {PropType, defineComponent, provide, toRef} from 'vue';
import FormElement from './FormElement.vue';
import {FormInstance} from '../form';
import {INJECT_FORM} from '../services';
import {useLifeCycleHooks} from '../composables';

export default defineComponent({
  name: 'MagicForm',
  components: {
    FormElement,
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

    return {
      fields: toRef(props.form, 'fields'),
    };
  },
});
</script>
