import {type Component, computed, defineComponent, h, onMounted, provide, ref} from 'vue';
import {type Event} from 'happy-dom';
import {get} from '@vueuse/core';
import {INJECT_FORM} from '../services';
import {FORM_HOOKS, type FormHook, type FormInstance} from '../form';
import {useLifecycleHooks} from '../composables';
import Fragment from './Fragment.vue';

//  <component
//     :is="form.config.form.tag"
//     :id="form.name"
//     v-bind="form.config.form.attributes"
//     ref="formElement"
//     @submit.prevent="() => form.submit()"
//     @reset.prevent="() => form.reset()">
//     <Fragment :component="form.config.form.wrapper">
//       <Suspense @resolve="elementsAreResolved = true">
//         <template
//           v-for="(element, index) in plainFields"
//           :key="`element--${element.name ?? 'unnamed'}--${index}`">
//           <FormElementWrapper
//             :form="form"
//             :element="element" />
//         </template>
//       </Suspense>
//
//       <template v-if="elementsAreResolved">
//         <template
//           v-for="(element, index) in teleportFields"
//           :key="`element--${element.name ?? 'unnamed'}--${index}`">
//           <FormElementWrapper
//             :form="form"
//             :element="element" />
//         </template>
//       </template>
//     </Fragment>
//   </component>

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MagicForm = defineComponent({
  name: 'MagicForm',

  emits: ['submit', 'reset'],

  setup() {
    const formElement = ref<HTMLFormElement | null>(null);

    const props = defineProps<{form: FormInstance}>();

    const emit = defineEmits<(event: FormHook, form: FormInstance) => void>();

    onMounted(() => {
      const value = get(formElement);

      if (!value) {
        return;
      }

      // eslint-disable-next-line vue/no-mutating-props
      props.form.element = value;
    });

    provide(INJECT_FORM, props.form);

    FORM_HOOKS.forEach((hook) => {
      props.form.on(hook, (form) => {
        emit(hook, form);
      });
    });

    const lifeCycleHooks = useLifecycleHooks();

    lifeCycleHooks.register(props.form.hooks, props.form);

    const elementsAreResolved = ref(false);

    const plainFields = computed(() => {
      return get(props.form.fields).filter((element) => !element.teleportSelector);
    });

    const teleportFields = computed(() => {
      return get(props.form.fields).filter((element) => Boolean(element.teleportSelector));
    });

    return {
      form: props.form,
      elementsAreResolved,
      formElement,
      plainFields,
      teleportFields,
    };
  },

  render() {
    const formWrapperChildren: Component[] = [];

    return h(
      this.form.config.form.tag,
      {
        id: this.form.name,
        ...this.form.config.form.attributes,
        ref: 'formElement',

        onSubmit: (event: Event) => {
          event.preventDefault();
          void this.form.submit();
        },
        onReset: (event: Event) => {
          event.preventDefault();
          void this.form.reset();
        },
      },
      () => [
        h(
          Fragment,
          {
            component: this.form.config.form.wrapper,
          },
          () => formWrapperChildren,
        ),
      ],
    );

    //   return h(
    //     this.form.config.form.tag,
    //     {
    //       id: this.form.name,
    //     },
    //     {
    //       default: () => {
    //         return h(
    //           Fragment,
    //           {
    //             component: this.form.config.form.wrapper,
    //           },
    //           {
    //             default: () => {
    //               return h(
    //                 'template',
    //                 {
    //                   ref: 'formElement',
    //                   onSubmit: (event) => {
    //                     event.preventDefault();
    //
    //                     this.form.submit();
    //                   },
    //                   onReset: (event) => {
    //                     event.preventDefault();
    //
    //                     this.form.reset();
    //                   },
    //                 },
    //                 {
    //                   default: () => {
    //                     return h(
    //                       'suspense',
    //                       {
    //                         onResolve: () => {
    //                           this.elementsAreResolved = true;
    //                         },
    //                       },
    //                       {
    //                         default: () => {
    //                           return h(
    //                             'template',
    //                             {
    //                               v-
    //                               for: `(element, index) in plainFields`,
    //                               key: (element, index) => {
    //                                 return `element--${element.name ?? 'unnamed'}--${index}`;
    //                               },
    //                             },
    //                             {
    //                               default: () => {
    //                                 return h(
    //                                   FormElement,
    //                                   {
    //                                     form: this.form,
    //                                     element,
    //                                   },
    //                                 );
    //                               },
    //                             },
    //                           );
    //                         },
    //                       },
    //                     );
    //                   },
    //                 },
    //               );
    //             }
    //           },
    //         );
    //       },
    //
    //
    // },
  },
});
