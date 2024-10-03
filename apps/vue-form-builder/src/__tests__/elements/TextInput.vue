<template>
  <input
    :id="element.name"
    v-model="model"
    type="text"
    :name="element.name"
    :disabled="element.isDisabled"
    :class="{
      'border-red-500': element.isValid === false,
      'opacity-50 cursor-not-allowed': element.isDisabled,
    }"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout', $event)"
    @click="$emit('click', $event)"
    @change="$emit('change', $event)" />
</template>

<script lang="ts" setup generic="Type extends string">
import {type FocusEvent} from 'happy-dom';
import {useVModel} from '@vueuse/core';
import type {FieldEmits, FieldProps} from '../../types/field.types';

/* eslint-disable @typescript-eslint/unified-signatures */

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<FieldProps<Type>>();
const emit = defineEmits<
  FieldEmits<Type> & {
    (event: 'change', data: Event): void;
    (event: 'blur', data: Event): void;
    (event: 'focus', data: FocusEvent): void;
    (event: 'focusin', data: FocusEvent): void;
    (event: 'focusout', data: FocusEvent): void;
    (event: 'click', data: Event): void;
  }
>();

const model = useVModel(props, undefined, emit);
</script>
