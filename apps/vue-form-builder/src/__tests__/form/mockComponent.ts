import {defineComponent, type PropType, withDirectives, h, vModelText} from 'vue';
import {type ElementProp} from '../../types/field.types';

export const mockComponent = defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    element: {
      type: Object as PropType<ElementProp>,
    },
  },
  render: () => withDirectives(h('input'), [[vModelText]]),
});
