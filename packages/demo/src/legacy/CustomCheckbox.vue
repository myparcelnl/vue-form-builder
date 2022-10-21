<template>
  <span>
    <input
      id="checkbox"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)" />
    <label for="checkbox">{{ label }}</label>
  </span>
</template>

<script lang="ts">
export default {
  name: 'CustomCheckbox',
};
</script>

<script setup lang="ts">
defineProps(['modelValue', 'label']);
defineEmits(['update:modelValue']);
</script>
