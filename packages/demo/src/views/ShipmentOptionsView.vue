<template>
  <h1>Behold, a form</h1>

  <MagicForm :form="shipmentOptionsForm" />
</template>

<script lang="ts" setup>
import {MagicForm} from '@myparcel/vue-form-builder';
import {shipmentOptionsForm} from '../forms/shipmentOptionsForm';
</script>
