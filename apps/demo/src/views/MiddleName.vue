<template>
  <div>
    <MiddleName.Component />
  </div>
</template>

<script lang="ts" setup>
import {createField, createForm} from '@myparcel/vue-form-builder';
import TTextInput from '../components/template/TTextInput.vue';
import {ref} from 'vue';

const MiddleName = createField({
  name: 'middleName',
  label: 'Middle name',
  component: TTextInput,
  ref: ref('Harold'),
  optional: true,
});

</script>
