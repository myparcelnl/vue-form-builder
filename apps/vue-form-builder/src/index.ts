export type {
  AnyElementConfiguration,
  AnyElementInstance,
  ComponentOrHtmlElement,
  ComponentProps,
  CreatedElement,
  CreatedField,
  CreatedForm,
  ElementName,
  FormConfiguration,
  FormInstance,
  InteractiveElementConfiguration,
  InteractiveElementInstance,
  ModularCreatedElement,
  ModularCreatedField,
  PlainElementConfiguration,
  PlainElementInstance,
  ResolvedElementConfiguration,
  Validator,
} from '@myparcel-vfb/core';

export type {SelectOption} from '@myparcel-vfb/utils';

export {
  FormHook,
  MagicForm,
  createField,
  createForm,
  defineField,
  defineForm,
  useElement,
  useForm,
  useFormBuilder,
} from '@myparcel-vfb/core';

// Backwards compatibility: also export MagicForm as default
import {MagicForm as __MagicForm} from '@myparcel-vfb/core';
export default __MagicForm;

export {MyParcelFormBuilderPlugin, createMyParcelFormBuilderPlugin} from '@myparcel-vfb/plugin';
