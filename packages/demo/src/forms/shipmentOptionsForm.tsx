import {defineField, defineForm} from '@myparcel/vue-form-builder';
import Heading from '../components/Heading.vue';
import THiddenInput from '../components/template/THiddenInput.vue';
import TNumberInput from '../components/template/TNumberInput.vue';
import TSelect from '../components/template/TSelect.vue';
import TSubmitButton from '../components/template/TSubmitButton.vue';
import TTextInput from '../components/template/TTextInput.vue';
import TToggleSwitch from '../components/template/TToggleSwitch.vue';
import {ref} from 'vue';

// todo: dynamically add more form parts, see BO -> canada -> project groups
// todo: form groups?

export const shipmentOptionsForm = defineForm('shipmentOptions', {
  fieldClass: [
    'flex',
    'items-center',
    'py-1',
    'pb-2',
    'dark:hover:bg-opacity-30',
    'dark:hover:bg-pink-500',
    'duration-100',
    'group',
    'hover:bg-pink-100',
    'transition-colors',
  ],
  formClass: ['border', 'border-gray-600', 'rounded-xl', 'p-4'],

  // refs: toRefs(
  //   reactive({
  //     orderId: 1,
  //     labelAmount: 1,
  //     packageType: 'package',
  //     signature: true,
  //     onlyRecipient: false,
  //     ageCheck: false,
  //     return: false,
  //     insurance: 1000,
  //     largeFormat: false,
  //   }),
  // ),

  fields: [
    defineField({
      component: Heading,
      props: {
        text: 'Edit order',
        level: 2,
      },
    }),
    defineField({
      name: 'name',
      component: TTextInput,
      ref: ref(''),
      label: 'Name',
      validators: [
        {
          validate: (field, value) => !String(value).startsWith('John'),
          errorMessage: 'John is not allowed',
        },
        {
          validate: (field, value) => !String(value).includes('e'),
          errorMessage: 'E is not allowed',
        },
      ],
    }),

    // new HiddenInput({
    //   name: 'orderId',
    //   ref: ref(1),
    // }),
    defineField({
      name: 'orderId',
      component: THiddenInput,
      ref: ref(1),
    }),
    defineField({
      name: 'labelAmount',
      component: TNumberInput,
      ref: ref(1),
      label: 'Label Amount',
      props: {
        min: 1,
        max: 10,
      },

      // isVisible() {},

      // onCreated: () => {
      //   console.warn('onCreated');
      // },
      // onActivated: () => {
      //   console.warn('onActivated');
      // },
      // onBeforeMount: () => {
      //   console.warn('onBeforeMount');
      // },
      // onBeforeUnmount: () => {
      //   console.warn('onBeforeUnmount');
      // },
      // onBeforeUpdate: () => {
      //   console.warn('onBeforeUpdate');
      // },
      // onDeactivated: () => {
      //   console.warn('onDeactivated');
      // },
      // onMounted: () => {
      //   console.warn('onMounted');
      // },
      // onUnmounted: () => {
      //   console.warn('onUnmounted');
      // },
      // onUpdated: () => {
      //   console.warn('onUpdated');
      // },
    }),
    defineField({
      name: 'packageType',
      component: TSelect,
      ref: ref('package'),
      label: 'Package Type',
      props: {
        options: [
          {
            label: 'Package',
            value: 'package',
          },
          {
            label: 'Mailbox',
            value: 'mailbox',
          },
          {
            label: 'Letter',
            value: 'letter',
          },
          {
            label: 'Digital Stamp',
            value: 'digital_stamp',
          },
        ],
      },
      validators: [
        {
          validate: (field, value) =>
            !(
              field.form.model.name.ref.value === 'Mack' &&
              String(value).startsWith('letter')
            ),
          errorMessage: 'Forget about letters, Mack does not like them.',
        },
      ],

      // afterUpdate: (field, newValue, oldValue) => {
      //   const isPackage = newValue === 'package';
      //   const {model} = field.form;
      //
      //   model.ageCheck.isVisible = isPackage;
      //   model.ageCheck.ref = isPackage ? model.ageCheck.ref : false;
      //   model.insurance.isVisible = isPackage;
      //   model.insurance.ref = isPackage ? model.insurance.ref : 0;
      //   model.largeFormat.isVisible = isPackage;
      //   model.largeFormat.ref = isPackage ? model.largeFormat.ref : false;
      //   model.onlyRecipient.isVisible = isPackage;
      //   model.onlyRecipient.ref = isPackage ? model.onlyRecipient.ref : false;
      //   model.return.isVisible = isPackage;
      //   model.return.ref = isPackage ? model.return.ref : false;
      //   model.signature.isVisible = isPackage;
      //   model.signature.ref = isPackage ? model.signature.ref : false;
      // },
    }),
    // defineField({
    //   name: 'carrier',
    //   label: 'Carrier',
    //   component: TSelect,
    //   ref: ref<string | null>(null),

    //   // onBeforeMount: async (field) => {
    //   //   // console.log('beforeMount', field);
    //   //   const sdk = createPublicSdk(new FetchClient(), [new GetCarriers()]);
    //   //   const carriers = await sdk.getCarriers();
    //   //
    //   //   console.log(carriers);
    //   //   console.log(field);
    //   //
    //   //   field.props.options = carriers.map((carrier) => ({
    //   //     label: carrier.human,
    //   //     value: carrier.name,
    //   //   }));
    //   //
    //   //   // console.log(carriers);
    //   //   // console.log(field.form);
    //   //
    //   //   // field.form.addElement(
    //   //   //   {
    //   //   //     component: Heading,
    //   //   //     props: {
    //   //   //       text: 'randomly inserted field!!',
    //   //   //     },
    //   //   //   },
    //   //   //   'carrier',
    //   //   // );
    //   //
    //   //   // field.ref = carriers[0].name;
    //   // },
    // }),
    defineField({
      name: 'signature',
      component: TToggleSwitch,
      ref: ref(true),
      label: 'Signature',
    }),
    defineField({
      name: 'onlyRecipient',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'Only Recipient',
    }),
    defineField({
      name: 'ageCheck',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'Age Check',
    }),
    defineField({
      name: 'return',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'Return',
    }),
    defineField({
      name: 'largeFormat',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'Large Format',
    }),
    defineField({
      name: 'insurance',
      component: TTextInput,
      ref: ref(1000),
      label: 'Insurance',
      validate: (field: any, value: any) => {
        return value < 500;
      },
    }),
    defineField({
      component: TSubmitButton,
    }),
  ],
});
