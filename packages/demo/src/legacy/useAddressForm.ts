import {Form, defineForm} from './index';
import {reactive, ref} from 'vue';
import CustomCheckbox from './CustomCheckbox.vue';
import CustomInput from './CustomInput.vue';
import CustomSelect from './CustomSelect.vue';

const postcodeHousenumberValidation = async (ctx: Form) => {
  ctx.fields.postcodeHousenumberValidation.visible = false;

  if (ctx.state.postcode && ctx.state.housenumber && ctx.state.country === 'NL') {
    const h = await fetchStreet(ctx.state.postcode, ctx.state.housenumber);
    if (h.data?.locations?.length) {
      ctx.fields.street.setValue(h.data.locations[0].street);
      ctx.fields.city.setValue(h.data.locations[0].city);
    } else {
      ctx.fields.postcodeHousenumberValidation.visible = true;
    }
  }
};

const states = (state: string): Promise<{value: string; text: string}[]> =>
  new Promise((resolve, reject) => {
    if (state === 'US') {
      resolve([
        {value: 'AL', text: 'Alabama'},
        {value: 'AK', text: 'Alaska'},
        {value: 'AZ', text: 'Arizona'},
        {value: 'AR', text: 'Arkansas'},
        {value: 'CA', text: 'California'},
        {value: 'CO', text: 'Colorado'},
        {value: 'CT', text: 'Connecticut'},
        {value: 'NM', text: 'New Mexico'},
        {value: 'ND', text: 'North Dakota'},
      ]);
    } else if (state === 'CA') {
      resolve([
        {value: 'BC', text: 'British Columbia'},
        {value: 'AB', text: 'Alberta'},
        {value: 'ON', text: 'Ontario'},
        {value: 'QC', text: 'Quebec'},
        {value: 'NS', text: 'Nova Scotia'},
        {value: 'NB', text: 'New Brunswick'},
      ]);
    } else {
      resolve([]);
    }
  });

const shops = (): Promise<{value: string; text: string}[]> =>
  new Promise((resolve, reject) => {
    resolve([
      {value: '1', text: 'Amazon'},
      {value: '2', text: 'Walmart'},
      {value: '3', text: 'Target'},
      {value: '4', text: 'Best Buy'},
      {value: '5', text: 'Kroger'},
      {value: '6', text: 'Whole Foods'},
      {value: '7', text: 'Costco'},
      {value: '8', text: 'Safeway'},
    ]);
  });

const fetchStreet = (postcode: string, houseNumber: string) => {
  const url = new URL('https://backoffice.dev.myparcel.nl/api/locations');
  url.searchParams.append('cc', 'NL');
  url.searchParams.append('postal_code', postcode);
  url.searchParams.append('number', houseNumber);

  return fetch(url).then((response) => response.json());
};

const fetchPostcode = (countryCode: string) => {
  const url = new URL('https://backoffice.dev.myparcel.nl/api/postal_code/check');
  url.searchParams.append('cc', countryCode);

  return fetch(url).then((response) => response.json());
};

const countries = [
  {value: 'US', text: 'United States'},
  {value: 'CA', text: 'Canada'},
  {value: 'MX', text: 'Mexico'},
  {value: 'GB', text: 'United Kingdom'},
  {value: 'FR', text: 'France'},
  {value: 'DE', text: 'Germany'},
  {value: 'IT', text: 'Italy'},
  {value: 'ES', text: 'Spain'},
  {value: 'AU', text: 'Australia'},
  {value: 'NZ', text: 'New Zealand'},
  {value: 'JP', text: 'Japan'},
  {value: 'CN', text: 'China'},
  {value: 'KR', text: 'Korea'},
  {value: 'NL', text: 'Netherlands'},
  {value: 'AO', text: 'Angola'},
];

const pickupAddress = ref(false);
const defaultPickupAddress = ref(false);
const shop = ref();
const country = ref();
const state = ref();
const companyName = ref();
const name = ref();
const postcode = ref();
const housenumber = ref();
const street = ref();
const street2 = ref();
const city = ref();
const email = ref();
const phone = ref();

class Text {
  text: string;
  visible: boolean;

  constructor({text, visible}: {text: string; visible?: boolean}) {
    this.text = text;
    this.visible = visible || false;
  }

  isVisible() {
    return this.visible;
  }
}

export const useAddressForm = () => {
  const formState = reactive({
    pickupAddress,
    defaultPickupAddress,
    shop,
    country,
    state,
    companyName,
    name,
    postcode,
    housenumber,
    street,
    street2,
    city,
    email,
    phone,
  });

  const form = defineForm(formState, () => ({
    pickupAddress: {
      component: CustomCheckbox,
      ref: pickupAddress,
      props: {
        label: 'Use as pick-up address',
      },

      checkVisible: (ctx) => {
        console.log(ctx);
        return ctx.state.country === 'NL';
      },

      afterInput: (ctx, opts, checked: boolean) => {
        if (!checked) {
          ctx.state.defaultPickupAddress = false;
        }
      },
    },

    defaultPickupAddress: {
      component: CustomCheckbox,
      ref: defaultPickupAddress,
      props: {
        label: 'This is my default shop address',
      },

      isVisible(ctx) {
        return Boolean(ctx.state.country === 'NL' && ctx.state.pickupAddress);
      },

      // beforeInput: async (ctx) => {
      //   ctx.form?.shop?.props.options = await shops();
      // },
    },

    shop: {
      component: CustomSelect,
      ref: shop,
      label: 'Shop',
      props: {
        options: [] as {value: string; text: string}[],
      },
      isVisible: () => Boolean(ctx.state.country === 'NL' && ctx.state.defaultPickupAddress),
      isOptional: true,
    },

    country: {
      component: CustomSelect,
      ref: country,
      label: 'Country',
      props: {
        options: countries,
      },

      // beforeInput: async (ctx, country: string) => {
      //   const response = await fetchPostcode(country);
      //
      //   if (response.data.postal_code?.length && response.data.postal_code[0].is_valid) {
      //     form.postcode.isOptional = true;
      //   } else {
      //     form.postcode.isOptional = false;
      //   }
      //
      //   ctx.form.props.options = await states(country);
      // },

      postInput: async (ctx, country: string) => {
        if (country === 'US' || ctx.state.country === 'CA') {
          ctx.state.isOptional = false;
        } else {
          ctx.state.isOptional = true;
        }
      },

      onBlur: postcodeHousenumberValidation,
    },

    state: {
      component: CustomSelect,
      ref: state,
      label: 'State',
      isVisible: (ctx) => ctx.state.country === 'US' || ctx.state.country === 'CA',
      props: {
        options: [] as {value: string; text: string}[],
      },
      isOptional: true,
    },

    companyName: {
      component: CustomInput,
      label: 'Company Name',
      ref: companyName,
    },

    name: {
      component: CustomInput,
      label: 'Name',
      ref: name,
    },

    // postcodeHousenumberValidation: new Text({
    //   text: 'This appears to be an unknown address. Please make sure the postal code and housenumber are correct.',
    // }),

    postcode: {
      component: CustomInput,
      ref: postcode,
      label: 'Postcode',

      sanitizeValue: (_, value) => {
        return value.toUpperCase().replace(/\s/g, '');
      },

      validators: [
        {
          validator: (ctx, value) => {
            if (ctx.state.country === 'NL') {
              const re = new RegExp(/^[1-9][0-9]{3} ?(?!SA|SD|SS)[A-Z]{2}$/);
              return re.test(value);
            }
            return true;
          },
          errorMessage: 'Postcode must be in the format 1234 AB',
        },
        {
          validator: (ctx, value) => {
            if (ctx.state.country === 'US') {
              const re = new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
              return re.test(value);
            }
            return true;
          },
          errorMessage: 'Postcode must be in the format 12345',
        },
      ],
      onBlur: postcodeHousenumberValidation,
    },

    housenumber: {
      component: CustomInput,
      label: 'House number',
      isVisible: (ctx) => ctx.state.country === 'NL',
      ref: housenumber,
      onBlur: postcodeHousenumberValidation,
    },

    street: {
      component: CustomInput,
      label: 'Street',
      ref: street,
    },
    street2: {
      component: CustomInput,
      label: 'Extra street field',
      ref: street2,
      isOptional: true,
    },
    city: {
      component: CustomInput,
      label: 'Town/city',
      ref: city,
    },
    email: {
      component: CustomInput,
      label: 'Email',
      ref: email,
      isOptional: true,
      validators: [
        {
          validator: (ctx, value: string) => {
            if (value.length > 0) {
              const regExp = new RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              );

              return regExp.test(value);
            }
            return true;
          },
          errorMessage: 'It looks like this is not an email address',
        },
      ],
    },

    phone: {
      component: CustomInput,
      label: 'Telephone number',
      ref: phone,
      isOptional: true,
    },
  }));

  return form;
};
