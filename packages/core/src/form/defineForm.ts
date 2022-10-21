import {FieldsToModel, Form, FormConfiguration, FormInstance} from './Form';
import {FieldIdentifier} from '../types';
import {defineField} from './field';
import {UnwrapNestedRefs, ref} from 'vue';
import {useFormBuilder} from '../composables';
import {FieldInstance} from './field';

export const defineForm = <FC extends FormConfiguration>(name: string, config: FC): FormInstance<FC> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, new Form(name, config));
};

const form = defineForm('tellAFriend', {
  fields: [
    defineField({
      id: 'name',
      component: 'input',
      ref: ref(123),
      sanitize: (instance, value) => Math.round(value),
    }),
    {
      component: 'input',
    },
  ],
});

form.model.name.ref = 123;

declare function defineFoop<FC extends FormConfiguration>(
  config: FC,
): {
  [K in FC['fields'][number] as K['name'] extends string ? K['name'] : never]: UnwrapNestedRefs<K>;
};

const foop = defineFoop({
  fields: [
    defineField({
      name: 'name',
      component: 'input',
      ref: ref('amy'),
    }),

    defineField({
      name: 'email',
      component: 'input',
      ref: ref('amy@lemon.com'),
    }),
  ],
});

// const A: FieldWithIdAndRef = {
//   name: 'a',
//   ref: ref('a'),
// };
//
// const form = defineForm('myForm', {
//   fields: [
//     {
//       name: 'firstName',
//       label: 'First name',
//       component: 'input',
//       ref: ref(''),
//       sanitize: (value) => {
//         return value.trim();
//       },
//     },
//   ],
// });
//
// form.model.firstName.ref = 'John';

// export const defineForm = <FormName extends string, FE extends FormConfiguration<N>, N extends FieldIdentifier>(
//   name: FormName,
//   formConfig: FE,
// ): FormInstance<FormName, FE, N> => {
//   const formBuilder = useFormBuilder();
//
//   return formBuilder.register(name, new Form(name, formConfig));
// };

// export const defineForm = <
//   FE extends InitialFormConfiguration<N, RT, C>,
//   N extends string,
//   RT,
//   C extends ComponentOrHtmlElement,
// >(
//   name: string,
//   formConfig: FE,
// ): FormInstance<N, RT, C> => {
//   const formBuilder = useFormBuilder<N, RT>();
//
//   if (!formBuilder.forms[name]) {
//     formBuilder.forms[name] = new Form<N, RT, C>(formConfig);
//   }
//
//   return formBuilder.forms[name];
// };
