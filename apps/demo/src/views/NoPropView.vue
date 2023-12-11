<template>
  <h1>Form without element props</h1>

  <MagicForm :form="form" />

  <FormDiagnostics :form="form" />
</template>

<script lang="ts" setup>
import {MagicForm} from '@myparcel/vue-form-builder/ts';
import {noPropForm} from '../forms/noPropForm';
import FormDiagnostics from '../components/FormDiagnostics.vue';

const form = noPropForm;
</script>
