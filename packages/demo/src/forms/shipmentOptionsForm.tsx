/* eslint-disable @typescript-eslint/no-magic-numbers */
import {AnyElementInstance, InteractiveElementInstance, defineField, defineForm} from '@myparcel/vue-form-builder';
import {CARRIERS, CarrierName, PACKAGE_TYPES} from '@myparcel/sdk';
import FormGroup from '../components/template/FormGroup.vue';
import Heading from '../components/Heading.vue';
import PTextInput from '../components/template/PTextInput.vue';
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

const firstname = ref('');
const lastname = ref('');

const validateName = (field: InteractiveElementInstance) => {
  const nameField = field.form.fields.value.find((field) => field.name === 'name');
  const firstNameField = field.form.fields.value.find((field) => field.name === 'firstname');
  const lastNameField = field.form.fields.value.find((field) => field.name === 'lastname');
  nameField.props.errors = [...(firstNameField.errors ?? []), ...(lastNameField.errors ?? [])];
};

export const shipmentOptionsForm = defineForm('shipmentOptions', {
  renderLabel: translate,
  fieldClass: ['flex', 'items-center', 'py-1', 'pb-2', 'duration-100', 'group', 'transition-colors'],
  formClass: ['border', 'border-gray-600', 'rounded-xl', 'p-4'],
  validationMessages: {
    required: 'This field is required',
  },
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
      component: FormGroup,
      label: 'name',
      slots: {
        default: h('div', {class: 'flex flex-row gap-2'}, [
          h('div', {id: 'teleport--firstname'}),
          h('div', {id: 'teleport--lastname'}),
        ]),
      },
      props: {
        label: 'Naam',
      },
    }),

    defineField({
      name: 'firstname',
      component: PTextInput,
      ref: firstname,
      label: 'firstname',
      teleportSelector: '#teleport--firstname',
      validators: [
        {
          validate: (field, value) => !value.startsWith('John'),
          errorMessage: 'John is not allowed',
        },
        {
          validate: (field, value) => !value.includes('e'),
          errorMessage: 'E is not allowed',
        },
        {
          precedence: 1,
          validate: (field, value) => !value.startsWith('Mack John'),
          errorMessage: 'Mack John, we also do not send to you.',
        },
        {
          precedence: 2,
          validate: (field, value) => !value.startsWith('Mack'),
          errorMessage: 'Mack, we do not send to you.',
        },
      ],
      afterValidate: validateName,
    }),

    defineField({
      name: 'lastname',
      component: PTextInput,
      ref: lastname,
      label: 'lastname',
      teleportSelector: '#teleport--lastname',
      validators: [
        {
          validate: (field, value) => !value.startsWith('Love'),
          errorMessage: 'Love is not allowed',
        },
      ],
      afterValidate: validateName,
    }),

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
    }),

    defineField({
      name: 'copyAmount',
      component: TNumberInput,
      ref: ref(0),
      label: 'copy_amount',
      props: {
        max: 10,
      },
      disabledCb: (instance: InteractiveElementInstance) => instance.form.model.labelAmount.ref < 5,
      visibleCb: (instance: InteractiveElementInstance) => instance.form.model.labelAmount.ref > 4,
      afterUpdate: (instance: InteractiveElementInstance, newValue: number) => {
        // collect all fields named `copyName_${value}`;
        const copyNameFields = instance.form.fields.value.filter((field: AnyElementInstance) =>
          field.name?.startsWith('copyName_'),
        );

        if (copyNameFields.length < newValue) {
          // add new fields
          for (let i: number = copyNameFields.length; i < newValue; i++) {
            void instance.form.addElement(
              defineField({
                name: `copyName_${i}`,
                component: TTextInput,
                ref: ref(''),
                label: `Copy Name ${i + 1}`,
                validate: (field: InteractiveElementInstance, value: string) => {
                  return !field.form.fields.value.some((otherField: InteractiveElementInstance) => {
                    const isDifferentField = otherField.name !== field.name;
                    const isCopyNameField: boolean | undefined = otherField.name?.startsWith('copyName_');
                    const valueMatches = otherField.ref === value;

                    return isDifferentField && isCopyNameField && valueMatches;
                  });
                },
                errorMessage: 'Cannot have duplicate copy names',
              }),
              'packageType',
              'before',
            );
          }
        } else if (copyNameFields.length > newValue) {
          // remove fields
          for (let i = copyNameFields.length; i > newValue; i--) {
            instance.form.removeElement(copyNameFields[i - 1].name);
          }
        }
      },
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
          validate: (field, value) => {
            return !(field.form.model.name.ref.value === 'Mack' && String(value).startsWith('letter'));
          },
          errorMessage: 'Forget about letters, Mack does not like them.',
        },
      ],
    }),

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
      teleportSelector: '#return-shipment',
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
      validate: (field, value) => value > 100,
      errorMessage: 'Insurance must be at least 100',
      visibleCb: (field) => field.form.model.packageType.ref === PACKAGE_TYPES.PACKAGE_NAME,
      optionalCb: () => true,
    }),

    defineField({
      component: TSubmitButton,
    }),
  ],
});
