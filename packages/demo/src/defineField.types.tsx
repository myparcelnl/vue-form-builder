import {
  ComponentOrHtmlElement,
  FieldConfiguration,
  FieldName,
  InteractiveElementConfiguration,
  NamedElementConfiguration,
  PlainElementConfiguration,
  defineField,
  defineForm,
} from '@myparcel/vue-form-builder';
import {FetchClient, GetCarriers, createPublicSdk} from '@myparcel/sdk';
import {canNotContainX, firstNameNotDuane} from './form/validators';
import Heading from './components/Heading.vue';
import THiddenInput from './components/template/THiddenInput.vue';
import TNumberInput from './components/template/TNumberInput.vue';
import TSelect from './components/template/TSelect.vue';
import TSubmitButton from './components/template/TSubmitButton.vue';
import TTextInput from './components/template/TTextInput.vue';
import TToggleSwitch from './components/template/TToggleSwitch.vue';
import {UnionToArray} from '@myparcel/vue-form-builder-utils/src';
import {ref} from 'vue';

const interactiveFieldConfig = {
  name: 'name',
  component: 'input',
  label: 'Name',
  ref: ref('stringie'),
};
const interactiveField = defineField(interactiveFieldConfig);
const field1: FieldConfiguration = interactiveFieldConfig; //
const field2: InteractiveElementConfiguration = interactiveFieldConfig; //
const field3: NamedElementConfiguration = interactiveFieldConfig;
const field4: PlainElementConfiguration = interactiveFieldConfig;

const namedFieldConfig = {
  name: 'name',
  component: 'input',
};
const namedField = defineField(namedFieldConfig);
const field5: FieldConfiguration = namedFieldConfig; //
const field6: InteractiveElementConfiguration = namedFieldConfig;
const field7: NamedElementConfiguration = namedFieldConfig; //
const field8: PlainElementConfiguration = namedFieldConfig;

const plainFieldConfig = {
  component: 'input',
};
const plainField = defineField(plainFieldConfig);
const field9: FieldConfiguration = plainFieldConfig; //
const field10: InteractiveElementConfiguration = plainFieldConfig;
const field11: NamedElementConfiguration = plainFieldConfig;
const field12: PlainElementConfiguration = plainFieldConfig; //

defineForm('form', {
  fields: [interactiveField, namedField, plainField],
});

defineField({
  component: Heading,
  props: {
    text: 'Edit order',
    level: 2,
  },
});

defineField({
  name: 'name',
  component: TTextInput,
  ref: ref(''),
  label: 'Name',
  validators: [firstNameNotDuane(), canNotContainX()],
});

const tsx: JSX.Element = (
  <>
    <Heading
      level={1}
      text="yooo"></Heading>
  </>
);

defineField({
  props: {
    hiiii: '1',
  },
  component: tsx,
});

defineField({
  name: 'orderId',
  component: THiddenInput,
  ref: ref(1),
});

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
});

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

  afterUpdate: (field, newValue, oldValue) => {
    const isPackage = newValue === 'package';
    const {model} = field.form;

    model.ageCheck.isVisible = isPackage;
    model.ageCheck.ref = isPackage ? model.ageCheck.ref : false;
    model.insurance.isVisible = isPackage;
    model.insurance.ref = isPackage ? model.insurance.ref : 0;
    model.largeFormat.isVisible = isPackage;
    model.largeFormat.ref = isPackage ? model.largeFormat.ref : false;
    model.onlyRecipient.isVisible = isPackage;
    model.onlyRecipient.ref = isPackage ? model.onlyRecipient.ref : false;
    model.return.isVisible = isPackage;
    model.return.ref = isPackage ? model.return.ref : false;
    model.signature.isVisible = isPackage;
    model.signature.ref = isPackage ? model.signature.ref : false;
  },
});

defineField({
  name: 'carrier',
  label: 'Carrier',
  component: TSelect,
  ref: ref<string | null>(null),

  onBeforeMount: async (field) => {
    // console.log('beforeMount', field);
    const sdk = createPublicSdk(new FetchClient(), [new GetCarriers()]);
    const carriers = await sdk.getCarriers();

    console.log(carriers);
    console.log(field);

    field.props.options = carriers.map((carrier) => ({
      label: carrier.human,
      value: carrier.name,
    }));

    // console.log(carriers);
    // console.log(field.form);

    // field.form.addField(
    //   {
    //     component: Heading,
    //     props: {
    //       text: 'randomly inserted field!!',
    //     },
    //   },
    //   'carrier',
    // );

    // field.ref = carriers[0].name;
  },
});

defineField({
  name: 'signature',
  component: TToggleSwitch,
  ref: ref(true),
  label: 'Signature',
});

defineField({
  name: 'onlyRecipient',
  component: TToggleSwitch,
  ref: ref(false),
  label: 'Only Recipient',
});

defineField({
  name: 'ageCheck',
  component: TToggleSwitch,
  ref: ref(false),
  label: 'Age Check',
});

defineField({
  name: 'return',
  component: TToggleSwitch,
  ref: ref(false),
  label: 'Return',
});

defineField({
  name: 'largeFormat',
  component: TToggleSwitch,
  ref: ref(false),
  label: 'Large Format',
});

defineField({
  name: 'insurance',
  component: TTextInput,
  ref: ref(1000),
  label: 'Insurance',
  validate: (field, value) => value < 500,
});

defineField({
  component: TSubmitButton,
});

declare function boop<
  FC extends InteractiveElementConfiguration<C, N, RT>,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
>(config: Array<FC>): FC;

declare function boop<
  FC extends NamedElementConfiguration<C, N>,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
>(config: Array<FC>): FC;

declare function boop<
  FC extends PlainElementConfiguration<C>,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
>(config: Array<FC>): FC;

declare function boop<
  FC extends FieldConfiguration<C, N, RT>,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
>(config: Array<FC>): FC;

const fieldUnnamed = defineField({component: 'input'});
const fieldName = defineField({name: 'name', component: 'input'});
const fieldNameRef = defineField({name: 'name2', component: 'input', ref: ref(124)});

const config = [fieldUnnamed, fieldName, fieldNameRef];

const form4 = boop(config);

form4.name.ref = 'test';
form4.name2.ref = 124;

type ItemA<C extends string> = {component: C; name?: never; value?: never};
type ItemB<C extends string, N extends string> = {component: C; name: N; value?: never};
type ItemC<C extends string, N extends string, V extends string> = {component: C; name: N; value: V};

type Item<
  C extends string = string,
  N extends string | undefined = string | undefined,
  V extends string | undefined = string | undefined,
> = N extends string ? (V extends string ? ItemC<C, N, V> : ItemB<C, N>) : ItemA<C>;

declare function createList<I extends Item>(items: I[]): UnionToArray<I>;

declare function createItem<C extends string, N extends string | undefined, V extends string | undefined>(
  item: Item<C, N, V>,
): Item<C, N, V>;

const itemA = createItem({
  component: 'input',
});

const itemB = createItem({
  component: 'input',
  name: 'one',
});

const itemC = createItem({
  component: 'input',
  name: 'two',
  value: 'value',
});

const items = [itemA, itemB, itemC];

const list = createList(items);