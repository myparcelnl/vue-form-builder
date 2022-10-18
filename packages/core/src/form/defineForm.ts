import {Form, FormConfiguration, FormInstance} from './Form';
import {FieldName} from '../types';
import {useFormBuilder} from '../composables';

export const defineForm = <FC extends FormConfiguration<N>, N extends FieldName>(
  name: string,
  config: FC,
): FormInstance<FC> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, new Form(name, config));
};

// defineForm('tellAFriend', {
//   fields: [
//     {
//       component: TTextInput,
//       name: 'name',
//     },
//     {
//       component: TSubmitButton,
//     },
//   ],
// });

// const A: FieldWithNameAndRef = {
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

// export const defineForm = <FormName extends string, FC extends FormConfiguration<N>, N extends FieldName>(
//   name: FormName,
//   formConfig: FC,
// ): FormInstance<FormName, FC, N> => {
//   const formBuilder = useFormBuilder();
//
//   return formBuilder.register(name, new Form(name, formConfig));
// };

// export const defineForm = <
//   FC extends InitialFormConfiguration<N, RT, C>,
//   N extends string,
//   RT,
//   C extends ComponentOrHtmlElement,
// >(
//   name: string,
//   formConfig: FC,
// ): FormInstance<N, RT, C> => {
//   const formBuilder = useFormBuilder<N, RT>();
//
//   if (!formBuilder.forms[name]) {
//     formBuilder.forms[name] = new Form<N, RT, C>(formConfig);
//   }
//
//   return formBuilder.forms[name];
// };
