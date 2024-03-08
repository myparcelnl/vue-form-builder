<template>
  <div
    data-test-type="form-group"
    :data-test-name="element.name">
    <slot />

    <span
      v-if="element.isSuspended"
      class="loading-indicator">
      Loading...
    </span>

    <ul
      v-if="element.errors?.length"
      data-test-type="errors"
      :data-test-name="element.name"
      class="errors">
      <li
        v-for="warning in element.errors"
        :key="warning">
        {{ warning }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {type FieldWrapperProps} from '../../types';

defineProps<FieldWrapperProps>();
</script>
