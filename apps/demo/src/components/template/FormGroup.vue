<template>
  <div
    v-show="element.isVisible"
    class="flex flex-col">
    <label
      v-if="element.label"
      :for="element.name"
      v-text="element.label" />
    <slot name="info-before" />
    <span
      v-if="element.isOptional"
      v-text="translate('form_optional_suffix')" />

    <slot />
    <slot name="info-after" />

    <template v-if="element.errors?.length">
      <ErrorBox :errors="element.errors" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import {type FieldWrapperProps} from '@myparcel/vue-form-builder';
import {translate} from '../../translate';
import ErrorBox from './ErrorBox.vue';

defineProps<FieldWrapperProps>();
</script>
