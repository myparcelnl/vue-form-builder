import {
  InteractiveElementConfiguration,
  NamedElementConfiguration,
  PlainElementConfiguration,
  defineField,
  defineForm,
} from '../../../form';
import {FieldConfiguration} from '../../../types';
import {ref} from 'vue';

type CreateElement<C extends FieldConfiguration = FieldConfiguration> = (field?: Partial<C>) => C;

export const generatePlainElement: CreateElement<PlainElementConfiguration> = (field) =>
  defineField({
    component: 'input',
    ...(field ?? {}),
  });

export const generateNamedElement: CreateElement<NamedElementConfiguration> = (field) =>
  defineField({
    ...generatePlainElement(),
    name: 'element',
    ...(field ?? {}),
  });

export const generateInteractiveElement: CreateElement<InteractiveElementConfiguration> = (field) =>
  defineField({
    ...generateNamedElement(),
    ref: ref(''),
    ...(field ?? {}),
  });

export const generateForm = (...fields: FieldConfiguration[]) => {
  return defineForm('test', {fields});
};
