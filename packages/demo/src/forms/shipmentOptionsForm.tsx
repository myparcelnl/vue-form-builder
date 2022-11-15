import {CARRIERS, CarrierName, PACKAGE_TYPES} from '@myparcel/sdk';
import {defineField, defineForm} from '@myparcel/vue-form-builder';
import Heading from '../components/Heading.vue';
import THiddenInput from '../components/template/THiddenInput.vue';
import TNumberInput from '../components/template/TNumberInput.vue';
import TSelect from '../components/template/TSelect.vue';
import TSubmitButton from '../components/template/TSubmitButton.vue';
import TTextInput from '../components/template/TTextInput.vue';
import TToggleSwitch from '../components/template/TToggleSwitch.vue';
import {ref} from 'vue';
import {translate} from '../translate';
import {useFetchCarriers} from '../queries/fetchCarriers';

// todo: dynamically add more form parts, see BO -> canada -> project groups
// todo: form groups?

export const shipmentOptionsForm = defineForm('shipmentOptions', {
  renderLabel: translate,
  fieldClass: ['flex', 'items-center', 'py-1', 'pb-2', 'duration-100', 'group', 'transition-colors'],
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
      name: 'carrier',
      label: 'carrier',
      component: TSelect,
      ref: ref<CarrierName>(),
      props: {
        options: [],
      },

      onBeforeMount: async (field) => {
        const carriers = useFetchCarriers();
        await carriers.suspense();

        field.props.options =
          carriers.data.value?.map((carrier) => ({
            label: carrier.human,
            value: carrier.name,
          })) ?? [];
      },
    }),

    defineField({
      name: 'dhlOptions',
      label: 'DHL Only Options',
      component: TTextInput,
      ref: ref<string>(),
      visibleCb: (field) => field.form.model.carrier.ref?.includes('dhl'),
    }),

    defineField({
      name: 'name',
      component: TTextInput,
      ref: ref(''),
      label: 'name',
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
      label: 'label_amount',
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
      label: 'package_type',
      props: {
        options: PACKAGE_TYPES.ALL.map((type) => ({
          label: translate(`package_type_${type.NAME}`),
          value: type.NAME,
        })),
      },
      validators: [
        {
          validate: (field, value) =>
            !(field.form.model.name.ref.value === 'Mack' && String(value).startsWith('letter')),
          errorMessage: 'Forget about letters, Mack does not like them.',
        },
      ],
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
      label: 'shipment_option_signature',
      visibleCb: (field) => field.form.model.packageType.ref === PACKAGE_TYPES.PACKAGE_NAME,
    }),
    defineField({
      name: 'onlyRecipient',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_only_recipient',
      visibleCb: (field) => field.form.model.packageType.ref === PACKAGE_TYPES.PACKAGE_NAME,
    }),
    defineField({
      name: 'ageCheck',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_age_check',
      visibleCb: (field) => field.form.model.packageType.ref === PACKAGE_TYPES.PACKAGE_NAME,
    }),
    defineField({
      name: 'return',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_return',
      visibleCb: (field) => field.form.model.packageType.ref === PACKAGE_TYPES.PACKAGE_NAME,
    }),
    defineField({
      name: 'largeFormat',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_large_format',
      visibleCb: (field) => field.form.model.packageType.ref === PACKAGE_TYPES.PACKAGE_NAME,
    }),
    defineField({
      name: 'sameDayDelivery',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_same_day_delivery',
      visibleCb: ({form}) => {
        const {packageType, carrier} = form.model;

        return (
          packageType.ref === PACKAGE_TYPES.PACKAGE_NAME && ['dhlforyou', CARRIERS.INSTABOX_NAME].includes(carrier.ref)
        );
      },
    }),
    defineField({
      name: 'insurance',
      component: TNumberInput,
      ref: ref(1000),
      label: 'shipment_option_insurance',
      visibleCb: (field) => field.form.model.packageType.ref === PACKAGE_TYPES.PACKAGE_NAME,
      validate: (field, value) => {
        return value > 100;
      },
      errorMessage: 'Insurance must be at least 100',
    }),
    defineField({
      component: TSubmitButton,
    }),
  ],
});
