<template>
  <Suspense
    v-if="form"
    @resolve="elementsAreResolved = true">
    <template
      v-for="(element, index) in plainFields"
      :key="`element--${element.name ?? 'unnamed'}--${index}`">
      <FormElementWrapper
        :element="element"
        :form="form" />
    </template>
  </Suspense>

  <template v-if="form && elementsAreResolved">
    <template
      v-for="(element, index) in teleportFields"
      :key="`element--${element.name ?? 'unnamed'}--${index}`">
      <FormElementWrapper
        :element="element"
        :form="form" />
    </template>
  </template>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {get} from '@vueuse/core';
import {useForm} from '../composables';
import FormElementWrapper from './FormElementWrapper';

const elementsAreResolved = ref(false);

const form = useForm();

if (!form) {
  throw new Error('Form not found');
}

const plainFields = computed(() => get(form.fields).filter((element) => !element.teleportSelector));
const teleportFields = computed(() => get(form.fields).filter((element) => Boolean(element.teleportSelector)));
</script>
