<template>
  <select :value="modelValue" class="border" @input="$emit('update:modelValue', $event.target.value)">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
export default {
  name: "CustomSelect",
};
</script>

<script setup lang="ts">
defineProps(["modelValue", "options"]);
defineEmits(["update:modelValue"]);
</script>
