<template>
  <input
    v-model="model"
    type="hidden" />
</template>

<script lang="ts" setup generic="Type extends string | number">
import {useVModel} from '@vueuse/core';
import {type FieldProps} from '@myparcel-vfb/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<FieldProps<Type>>();

const model = useVModel(props, undefined);
</script>
