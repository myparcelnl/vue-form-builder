<template>
  <div
    class="bg-pink-200 border-2 border-pink-300 dark:bg-pink-900 dark:border-pink-800 font-mono mb-4 mt-2 overflow-hidden rounded-lg text-xs">
    <div
      v-if="!hideControls"
      class="dark:hover:bg-pink-600 duration-100 hover:bg-pink-100 px-4 py-2 transition-colors"
      @click="open = !open">
      {{ name }}
      <span
        v-show="!open"
        class="opacity-50"
        v-text="excerpt" />
    </div>
    <pre
      v-show="open"
      class="p-4 text-xs">
      {{ code }}
    </pre>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'CodeBlock',
  props: {
    name: {
      type: String,
      default: 'Toggle',
    },

    expanded: {
      type: Boolean,
    },

    code: {
      type: [String, Object, Array],
      required: true,
    },

    hideControls: {
      type: Boolean,
    },
  },

  setup: (props) => {
    const open = ref(props.expanded || props.hideControls);

    const excerpt = computed(() => {
      const json: string = JSON.stringify(props.code);
      let string = json.slice(0, 80);

      if (string.length < json.length) {
        string += '...';
      }

      return string;
    });

    return {open, excerpt};
  },
});
</script>
