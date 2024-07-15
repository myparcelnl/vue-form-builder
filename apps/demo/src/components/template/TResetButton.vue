<template>
  <TButton
    outline
    type="reset">
    <slot>{{ translate('form_reset') }}</slot>
  </TButton>
</template>

<script lang="ts" setup>
import {translate} from '../../translate';
import TButton from './TButton.vue';
</script>
