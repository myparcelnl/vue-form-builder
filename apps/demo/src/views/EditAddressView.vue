<template>
  <h1>Edit address</h1>

  <MagicForm :form="form" />
</template>

<script lang="ts" setup>
import {MagicForm} from '@myparcel/vue-form-builder/src';
import {useAddressForm} from '../composables/useAddressForm';

const form = useAddressForm();
</script>
