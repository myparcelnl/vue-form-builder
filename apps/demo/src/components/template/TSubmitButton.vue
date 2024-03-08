<template>
  <TButton
    class="inline-flex mt-2 px-5 py-3 rounded-full transition-colors"
    type="submit"
    :outline>
    <template #icon>
      {{ icon }}
    </template>

    <slot>
      {{ translate('form_submit') }}
    </slot>
  </TButton>
</template>

<script lang="ts" setup>
import {translate} from '../../translate';
import TButton from './TButton.vue';

withDefaults(
  defineProps<{
    icon: string;
    outline?: boolean;
  }>(),
  {
    icon: '🍀',
  },
);
</script>
