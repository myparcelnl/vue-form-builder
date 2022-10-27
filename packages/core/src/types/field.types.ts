import {ComponentProps, MakeOptional} from '@myparcel/vue-form-builder-utils';
import {InteractiveElementConfiguration, NamedElementConfiguration, PlainElementConfiguration} from '../form';
import {Component} from 'vue';
import {ComponentOrHtmlElement} from './other.types';

export type FieldName = string | undefined;

export type FieldConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = InteractiveElementConfiguration<C, N, RT> | NamedElementConfiguration<C, N> | PlainElementConfiguration<C>;

export type FormComponentProps<C extends Component> = Omit<
  MakeOptional<ComponentProps<C>, 'name' | 'label' | 'id'>,
  'modelValue'
>;
