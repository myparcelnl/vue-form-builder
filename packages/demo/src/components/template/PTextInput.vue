<template>
  <input
  :id="id"
  v-model="model"
  type="text"
  :name="name"
  v-bind="$attrs"
  :disabled="disabled"
  :class="{
    'border-red-500': valid === false,
    'opacity-50 cursor-not-allowed': disabled,
  }"
  @blur="$emit('blur', $event)"
  @focus="$emit('focus', $event)"
  @focusin="$emit('focusin', $event)"
  @focusout="$emit('focusout', $event)"
  @click="$emit('click', $event)"
  @change="$emit('change', $event)" />
</template>
  
<script lang="ts">
  import {defineComponent} from 'vue';
  import FormGroup from './FormGroup.vue';
  import LoadingOverlay from '../LoadingOverlay.vue';
  import {useVModel} from '@vueuse/core';
  
  export default defineComponent({
    name: 'TTextInput',
    components: {LoadingOverlay, FormGroup},
    inheritAttrs: false,
    props: {
      disabled: {
        type: Boolean,
      },
  
      id: {
        type: String,
        required: true,
      },
    
      // eslint-disable-next-line vue/no-unused-properties
      modelValue: {
        type: [String, Number],
        default: null,
      },
  
      name: {
        type: String,
        required: true,
      },
  
      optional: {
        type: Boolean,
      },
  
      suspended: {
        type: Boolean,
      },
  
      valid: {
        type: Boolean,
      },
    },
  
    emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],
  
    setup: (props) => {
      return {
        model: useVModel(props, 'modelValue'),
      };
    },
  });
</script>
  