<template>
  <h1>Behold, a form</h1>

  <MagicForm :form="form" />
</template>

<script lang="ts" setup>
import {MagicForm} from '@myparcel/vue-form-builder';
import {useShipmentOptionsForm} from '../composables/useShipmentOptionsForm';

const form = useShipmentOptionsForm();
</script>
