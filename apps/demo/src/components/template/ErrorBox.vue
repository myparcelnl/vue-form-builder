<template>
  <div class="bg-red-700 border border-red-800 col-span-2 dark:bg-red-900 mt-3 p-5 rounded-lg">
    <ul>
      <li
        v-for="error in resolvedErrors"
        :key="error"
        v-text="error" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
// eslint-disable-next-line vue/prefer-import-from-vue
import {isFunction} from '@vue/shared';
import {type FunctionOr} from '@myparcel-vfb/utils';

const props = defineProps<{errors: FunctionOr<string>[]}>();

const resolvedErrors = computed(() => props.errors.map((error) => (isFunction(error) ? error() : error)));
</script>
