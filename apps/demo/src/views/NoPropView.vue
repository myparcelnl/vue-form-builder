<template>
  <h1>Form without element props</h1>

  <MagicForm :form="form" />

  <hr />

  <h2>Form values</h2>
  <pre v-text="form.getValues()" />
</template>

<script lang="ts" setup>
import {MagicForm} from '@myparcel/vue-form-builder';
import {noPropForm} from '../forms/noPropForm';

const form = noPropForm;
</script>
