<template>
  <Suspense
    v-if="form"
    @resolve="elementsAreResolved = true">
    <template
      v-for="(element, index) in plainFields"
      :key="`element--${element.name ?? 'unnamed'}--${index}`">
      <FormElementWrapper
        :form="form"
        :element="element" />
    </template>
  </Suspense>

  <template v-if="form && elementsAreResolved">
    <template
      v-for="(element, index) in teleportFields"
      :key="`element--${element.name ?? 'unnamed'}--${index}`">
      <FormElementWrapper
        :form="form"
        :element="element" />
    </template>
  </template>
</template>

<script setup lang="ts">
import {computed, inject, ref} from 'vue';
import {get} from '@vueuse/core';
import {INJECT_FORM} from '../data';
import FormElementWrapper from './FormElementWrapper';

const elementsAreResolved = ref(false);

const form = inject(INJECT_FORM);

if (!form) {
  throw new Error('Form not found');
}

const plainFields = computed(() => get(form.fields).filter((element) => !element.teleportSelector));
const teleportFields = computed(() => get(form.fields).filter((element) => Boolean(element.teleportSelector)));
</script>
