<template>
  <TButton
    outline
    type="reset">
    {{ translate('form_reset') }}
  </TButton>
</template>

<script lang="ts" setup>
import {translate} from '../../translate';
import TButton from './TButton.vue';
</script>
