/* eslint-disable */
// @ts-nocheck
import {Form, SelectOption, defineForm} from '@myparcel/vue-form-builder';

const postcodeHousenumberValidation = async (form: Form) => {
  console.log(form);
  form.model.postcodeHousenumberValidation.visible = false;

  if (form.model.postcode && form.model.housenumber && form.model.country === 'NL') {
    const h = await fetchStreet(form.model.postcode, form.model.housenumber);
    if (h.data?.locations?.length) {
      form.model.street.setValue(h.data.locations[0].street);
      form.model.city.setValue(h.data.locations[0].city);
    } else {
      form.model.postcodeHousenumberValidation.visible = true;
    }
  }
};

const states = (state: string): Promise<SelectOption[]> =>
  new Promise((resolve) => {
    if (state === 'US') {
      resolve([
        {value: 'AL', label: 'Alabama'},
        {value: 'AK', label: 'Alaska'},
        {value: 'AZ', label: 'Arizona'},
        {value: 'AR', label: 'Arkansas'},
        {value: 'CA', label: 'California'},
        {value: 'CO', label: 'Colorado'},
        {value: 'CT', label: 'Connecticut'},
        {value: 'NM', label: 'New Mexico'},
        {value: 'ND', label: 'North Dakota'},
      ]);
    } else if (state === 'CA') {
      resolve([
        {value: 'BC', label: 'British Columbia'},
        {value: 'AB', label: 'Alberta'},
        {value: 'ON', label: 'Ontario'},
        {value: 'QC', label: 'Quebec'},
        {value: 'NS', label: 'Nova Scotia'},
        {value: 'NB', label: 'New Brunswick'},
      ]);
    } else {
      resolve([]);
    }
  });

const shops = (): Promise<SelectOption[]> =>
  new Promise((resolve, reject) => {
    resolve([
      {value: '1', label: 'Amazon'},
      {value: '2', label: 'Walmart'},
      {value: '3', label: 'Target'},
      {value: '4', label: 'Best Buy'},
      {value: '5', label: 'Kroger'},
      {value: '6', label: 'Whole Foods'},
      {value: '7', label: 'Costco'},
      {value: '8', label: 'Safeway'},
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

const countries: SelectOption[] = [
  {value: 'US', label: 'United States'},
  {value: 'CA', label: 'Canada'},
  {value: 'MX', label: 'Mexico'},
  {value: 'GB', label: 'United Kingdom'},
  {value: 'FR', label: 'France'},
  {value: 'DE', label: 'Germany'},
  {value: 'IT', label: 'Italy'},
  {value: 'ES', label: 'Spain'},
  {value: 'AU', label: 'Australia'},
  {value: 'NZ', label: 'New Zealand'},
  {value: 'JP', label: 'Japan'},
  {value: 'CN', label: 'China'},
  {value: 'KR', label: 'Korea'},
  {value: 'NL', label: 'Netherlands'},
  {value: 'AO', label: 'Angola'},
];

export const useAddressForm = () => {
  return defineForm('address', {
    fields: [
      // {
      //   name: 'pickupAddress',
      //   component: TToggleSwitch,
      //   ref: ref(false),
      //   label: 'Use as pick-up address',
      //   isVisible: (form) => form.model.state.country === 'NL',
      //
      //   afterInput: (ctx, opts, checked: boolean) => {
      //     if (!checked) {
      //       ctx.state.defaultPickupAddress = false;
      //     }
      //   },
      // },
      //
      // {
      //   name: 'defaultPickupAddress',
      //   component: TToggleSwitch,
      //   ref: ref(false),
      //   label: 'This is my default shop address',
      //   isVisible: (ctx) => Boolean(ctx.state.country === 'NL' && ctx.state.pickupAddress),
      //
      //   beforeUpdate: async (field) => {
      //     field.form.model.shop.props.options = await shops();
      //   },
      // },
      //
      // {
      //   // name: 'shop',
      //   // component: TSelect,
      //   // ref: ref(),
      //   //
      //   // label: 'Shop',
      //   // // props: {
      //   // //   options: [],
      //   // // },
      //   // isVisible: () => Boolean(ctx.state.country === 'NL' && ctx.state.defaultPickupAddress),
      //   // isOptional: true,
      // },
      //
      // {
      //   name: 'country',
      //   component: TSelect,
      //   ref: ref(),
      //   label: 'Country',
      //   props: {
      //     options: countries,
      //   },
      //
      //   // beforeInput: async (ctx, country: string) => {
      //   //   const response = await fetchPostcode(country);
      //   //
      //   //   if (response.data.postal_code?.length && response.data.postal_code[0].is_valid) {
      //   //     form.postcode.isOptional = true;
      //   //   } else {
      //   //     form.postcode.isOptional = false;
      //   //   }
      //   //
      //   //   ctx.form.props.options = await states(country);
      //   // },
      //
      //   postInput: async (ctx, country: string) => {
      //     if (country === 'US' || ctx.state.country === 'CA') {
      //       ctx.state.isOptional = false;
      //     } else {
      //       ctx.state.isOptional = true;
      //     }
      //   },
      //
      //   onBlur: postcodeHousenumberValidation,
      // },
      // {
      //   name: 'state',
      //   component: TSelect,
      //   ref: ref(),
      //   label: 'State',
      //   isVisible: (field) => field.form.model.country.ref === 'US' || field.form.model.country.ref === 'CA',
      //   props: {
      //     options: [] as {value: string; text: string}[],
      //   },
      //   isOptional: true,
      // },
      // {
      //   name: 'companyName',
      //   component: TTextInput,
      //   label: 'Company Name',
      //   ref: ref(),
      // },
      //
      // {
      //   name: 'name',
      //   component: TTextInput,
      //   label: 'Name',
      //   ref: ref(),
      // },
      //
      // // postcodeHousenumberValidation: new Text({
      // //   text: 'This appears to be an unknown address. Please make sure the postal code and housenumber are
      // correct.', // }),  { name: 'postcode', component: TTextInput, ref: ref(), label: 'Postcode', sanitize: (_,
      // value) => value.toUpperCase().replace(/\s/g, ''),  // validators: [ //   { //     validator: (ctx, value) => {
      // //       if (ctx.state.country === 'NL') { //         const re = new RegExp(/^[1-9][0-9]{3}
      // ?(?!SA|SD|SS)[A-Z]{2}$/); //         return re.test(value); //       } //       return true; //     }, //
      // errorMessage: 'Postcode must be in the format 1234 AB', //   }, //   { //     validator: (ctx, value) => { //
      //      if (ctx.state.country === 'US') { //         const re = new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/); //
      //  return re.test(value); //       } //       return true; //     }, //     errorMessage: 'Postcode must be in
      // the format 12345', //   }, // ], onBlur: postcodeHousenumberValidation, },  { name: 'housenumber', component:
      // TTextInput, label: 'House number', isVisible: (ctx) => ctx.state.country === 'NL', ref: ref(), onBlur:
      // postcodeHousenumberValidation, },  { name: 'street', component: TTextInput, label: 'Street', ref: ref(), }, { name: 'street2', component: TTextInput, label: 'Extra street field', ref: ref(), isOptional: true, }, { name: 'city', component: TTextInput, label: 'Town/city', ref: ref(), }, { name: 'email', component: TTextInput, label: 'Email', ref: ref(), isOptional: true, // validators: [ //   { //     validator: (ctx, value: string) => { //       if (value.length > 0) { //         const regExp = new RegExp( //           /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //         ); // //         return regExp.test(value); //       } //       return true; //     }, //     errorMessage: 'It looks like this is not an email address', //   }, // ], }, { name: 'phone', component: TTextInput, label: 'Telephone number', ref: ref(), isOptional: true, }, { component: TSubmitButton, },
    ],
  });
};
