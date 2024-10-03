<template>
  <h1>Form without element props</h1>

  <Form.Component>
    <Field.Component />
  </Form.Component>

  <FormDiagnostics :form="Form.instance" />
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {createField, createForm} from '@myparcel/vue-form-builder';
import FormGroupWithoutElementProp from '../components/FormGroupWithoutElementProp.vue';
import FormDiagnostics from '../components/FormDiagnostics.vue';
import ComponentWithoutElementProp from '../components/ComponentWithoutElementProp.vue';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Form = createForm('noProps', {
  field: {
    elementProp: false,
    wrapper: FormGroupWithoutElementProp,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Field = createField({
  name: 'noPropsHere',
  component: ComponentWithoutElementProp,
  ref: ref('propless life'),
});
</script>
