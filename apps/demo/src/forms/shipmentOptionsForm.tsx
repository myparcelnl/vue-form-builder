/* eslint-disable @typescript-eslint/no-magic-numbers */
import {ref} from 'vue';
import {type InteractiveElementInstance, defineField, defineForm} from '@myparcel/vue-form-builder';
import {isOfType} from '@myparcel/ts-utils';
import {type CarrierName, PACKAGE_TYPE_IDS_TO_NAMES, PackageTypeName} from '@myparcel/constants';
import {translate} from '../translate';
import {useFetchCarriers} from '../queries/fetchCarriers';
import TableFormGroup from '../components/template/TableFormGroup.vue';
import TToggleSwitch from '../components/template/TToggleSwitch.vue';
import TTextInput from '../components/template/TTextInput.vue';
import TSubmitButton from '../components/template/TSubmitButton.vue';
import TSelect from '../components/template/TSelect.vue';
import TResetButton from '../components/template/TResetButton.vue';
import TNumberInput from '../components/template/TNumberInput.vue';
import THiddenInput from '../components/template/THiddenInput.vue';
import FormGroup from '../components/template/FormGroup.vue';
import Heading from '../components/Heading.vue';
import Bonnetje from '../components/Bonnetje.vue';

// eslint-disable-next-line id-length
declare const h: typeof import('vue').h;

const firstName = ref('');
const lastName = ref('');

const validateName = (field: InteractiveElementInstance) => {
  const nameField = field.form.fields.value.find((field) => field.name === 'name');
  const firstNameField = field.form.fields.value.find((field) => field.name === 'firstname');
  const lastNameField = field.form.fields.value.find((field) => field.name === 'lastname');

  if (!nameField) {
    return;
  }

  nameField.props.errors = [...(firstNameField?.errors ?? []), ...(lastNameField?.errors ?? [])];
};

export const shipmentOptionsForm = defineForm('shipmentOptions', {
  renderLabel: translate,

  form: {
    attributes: {
      class: ['border', 'border-gray-600', 'p-4'],
    },
    wrapper: 'table',
  },

  fieldDefaults: {
    attributes: {
      class: ['py-1', 'pb-2', 'duration-100', 'group', 'transition-colors'],
    },
    wrapper: TableFormGroup,
  },

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
      component: h('h3'),
      slots: {
        default: () => [h('marquee', translate('contact_details_title'))],
      },
      wrapper: false,
    }),

    defineField({
      name: 'name',
      wrapper: false,
      component: () => h('tr', [h('td', {id: 'teleport--firstname'}), h('td', {id: 'teleport--lastname'})]),
      label: 'name',
      props: {
        label: 'naam',
      },
    }),

    defineField({
      name: 'firstName',
      component: TTextInput,
      ref: firstName,
      label: 'first_name',
      wrapper: FormGroup,
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
      slots: {
        'info-after': () => h('div', {class: 'text-xs'}, translate('name_all_firstnames')),
      },
    }),

    defineField({
      name: 'lastName',
      component: TTextInput,
      ref: lastName,
      label: 'last_name',
      wrapper: FormGroup,
      teleportSelector: '#teleport--lastname',
      validators: [
        {
          validate: (field, value) => !value.startsWith('Love'),
          errorMessage: 'Love is not allowed',
        },
      ],
      afterValidate: validateName,
      slots: {
        'info-after': () => h('div', {class: 'text-xs'}, translate('name_as_in_passport')),
      },
    }),

    defineField({
      component: h('h3'),
      slots: {default: () => translate('package_info_title')},
      wrapper: false,
    }),

    defineField({
      name: 'orderId',
      component: THiddenInput,
      ref: ref(1),
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

        field.props ??= {};
        field.props.options =
          carriers.data.value?.map((carrier) => ({
            label: carrier.human,
            value: carrier.name,
          })) ?? [];
      },
    }),

    defineField({
      name: 'dhlOptions',
      label: 'dhl_only_options',
      component: TTextInput,
      ref: ref<string>(),
      visibleWhen: (field) => field.form.getValue('carrier')?.includes('dhl'),
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
        min: 0,
        max: 10,
      },
      disabledWhen: (instance) => instance.form.model.labelAmount.ref.value < 5,
      visibleWhen: (instance) => instance.form.model.labelAmount.ref.value > 4,
      afterUpdate: (instance, newValue: number) => {
        // collect all fields named `copyName_${value}`;
        const copyNameFields = instance.form.fields.value.filter((field) => field.name?.startsWith('copyName_'));

        if (copyNameFields.length < newValue) {
          // add new fields
          for (let i: number = copyNameFields.length; i < newValue; i++) {
            void instance.form.addElement(
              defineField({
                name: `copyName_${i}`,
                component: TTextInput,
                ref: ref(''),
                label: `Copy Name ${i + 1}`,
                validate: (field, value: string) => {
                  return !field.form.fields.value.some((otherField) => {
                    if (!isOfType<InteractiveElementInstance>(otherField, 'ref')) {
                      return false;
                    }

                    const isDifferentField = otherField.name !== field.name;
                    const isCopyNameField = otherField.name?.startsWith('copyName_');
                    const valueMatches = otherField.ref.value === value;

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
        options: Object.values(PACKAGE_TYPE_IDS_TO_NAMES).map((name) => ({
          label: translate(`package_type_${name}`),
          value: name,
        })),
      },
      validators: [
        {
          validate: (field, value) => {
            return !(field.form.model.firstName.ref.value === 'Mack' && String(value).startsWith('letter'));
          },
          errorMessage: 'Forget about letters, Mack does not like them.',
        },
      ],
    }),

    defineField({
      component: h('h3'),
      slots: {default: () => translate('shipment_options_title')},
      wrapper: false,
    }),

    defineField({
      name: 'bsn',
      component: TTextInput,
      ref: ref(''),
      label: 'bsn',
      optionalWhen: (field) => field.form.getValue('ageCheck') === false,
    }),

    defineField({
      name: 'signature',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_signature',
      visibleWhen: (field) => field.form.getValue('packageType') === PackageTypeName.Package,
    }),

    defineField({
      name: 'onlyRecipient',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_only_recipient',
      visibleWhen: (field) => field.form.getValue('packageType') === PackageTypeName.Package,
    }),

    defineField({
      name: 'ageCheck',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_age_check',
      visibleWhen: (field) => field.form.getValue('packageType') === PackageTypeName.Package,
    }),

    defineField({
      name: 'return',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_return',
      teleportSelector: '#return-shipment',
      visibleWhen: (field) => field.form.getValue('packageType') === PackageTypeName.Package,
    }),

    defineField({
      name: 'largeFormat',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_large_format',
      visibleWhen: (field) => field.form.getValue('packageType') === PackageTypeName.Package,
    }),

    defineField({
      name: 'sameDayDelivery',
      component: TToggleSwitch,
      ref: ref(false),
      label: 'shipment_option_same_day_delivery',
      visibleWhen: ({form}) => {
        const {packageType, carrier} = form.model;

        return packageType.ref.value === PackageTypeName.Package && ['dhlforyou'].includes(carrier.ref);
      },
    }),

    defineField({
      name: 'insurance',
      component: TNumberInput,
      ref: ref(1000),
      label: 'shipment_option_insurance',
      validate: (field, value) => value > 100,
      errorMessage: 'Insurance must be at least 100',
      visibleWhen: (field) => field.form.getValue('packageType') === PackageTypeName.Package,
      props: {
        step: 100,
        min: 100,
      },
    }),

    defineField({
      name: 'deliveryMessage',
      component: TTextInput,
      ref: ref(''),
      label: 'delivery_message',
      optionalWhen: (field) => !field.form.getValue('signature'),
    }),

    defineField({
      component: TSubmitButton,
    }),

    defineField({
      component: TResetButton,
    }),

    defineField({
      name: 'bonnetje',
      component: Bonnetje,
      wrapper: false,
      teleportSelector: '#bonnetje',
    }),
  ],
});
