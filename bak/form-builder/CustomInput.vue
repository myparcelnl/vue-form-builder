<template>
  <input
    type="text"
    :value="modelValue"
    class="border w-64"
    @blur="$emit('blur')"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
export default {
  name: "CustomInput",
};
</script>

<script setup lang="ts">
defineProps(["modelValue"]);
defineEmits(["update:modelValue", "blur"]);
</script>
