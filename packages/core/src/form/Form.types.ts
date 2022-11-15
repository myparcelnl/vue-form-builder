import {AnyElementConfiguration, AnyElementInstance, ComponentOrHtmlElement, ElementName} from '../types';
import {PromiseOr, ReadonlyOr} from '@myparcel/ts-utils';
import {Ref, UnwrapNestedRefs} from 'vue';
import {HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {InteractiveElementInstance} from './interactive-element';

/**
 * The input configuration for a Form.
 */
export type FormConfiguration = {
  /**
   * Fields in the form.
   */
  fields: ReadonlyOr<AnyElementConfiguration[]>;

  /**
   * Function executed when any label is rendered.
   */
  renderLabel?: (input: string) => string;

  /**
   * Classes that are applied to each field.
   */
  fieldClass?: string | string[] | Record<string, string>;

  /**
   * Classes that are applied to the form.
   */
  formClass?: string | string[] | Record<string, string>;

  /**
   * Messages that are used for built-in validations.
   */
  validationMessages?: {
    required?: string;
  } & Record<string, string>;

  /**
   * Names of hooks to register.
   */
  hookNames?: readonly string[] | string[];
};

export type FormHooks<I extends BaseFormInstance = BaseFormInstance> = {
  beforeSubmit?(form: I): PromiseOr<void>;
  afterSubmit?(form: I): PromiseOr<void>;

  beforeReset?(form: I): PromiseOr<void>;
  afterReset?(form: I): PromiseOr<void>;

  beforeValidate?(form: I): PromiseOr<void>;
  afterValidate?(form: I): PromiseOr<void>;
};

/**
 * The instance of a form.
 */
export type BaseFormInstance<FC extends FormConfiguration = FormConfiguration> = {
  readonly name: string;

  readonly config: Omit<FC, 'fields'>;
  readonly fields: Ref<UnwrapNestedRefs<AnyElementInstance>[]>;
  readonly hooks: HookManagerInstance<FormHooks>;
  readonly model: FieldsToModel;

  /**
   * Determines whether the form is valid.
   */
  isValid: Ref<boolean>;

  /**
   * Add a new element to the form at the end, or before or after an existing element.
   */
  addElement(element: AnyElementConfiguration, sibling?: string, position?: 'before' | 'after'): void;

  /**
   * Remove an element from the form by name.
   */
  removeElement(name: string): void;

  /**
   * Reset all fields to their original state.
   */
  reset(): PromiseOr<void>;

  /**
   * Submit the form.
   */
  submit(): PromiseOr<void>;

  /**
   * Validate all fields in the form.
   */
  validate(): PromiseOr<boolean>;
};

export type FormInstance<FC extends FormConfiguration = FormConfiguration> = BaseFormInstance<FC> & FormHooks;

/**
 * TODO: This is a temporary solution to avoid errors.
 *  We need to find a way to infer the types from the input form configuration.
 */
export type FieldsToModel<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = {
  [K in N extends string ? N | string : string]: UnwrapNestedRefs<InteractiveElementInstance<C, N, RT>>;
};
