import {AnyElementConfiguration, AnyElementInstance, ComponentOrHtmlElement, ElementName} from '../types';
import {ComputedRef, Ref, UnwrapNestedRefs} from 'vue';
import {PromiseOr, ReadonlyOr} from '@myparcel/ts-utils';
import {FunctionOr} from '@myparcel-vfb/utils';
import {HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {InteractiveElementInstance} from './interactive-element';

/**
 * The input configuration for a Form.
 */
export type FormConfiguration = FormHooks & {
  /**
   * Classes that are applied to each field.
   */
  fieldClass?: string | string[] | Record<string, string>;

  /**
   * Fields in the form.
   */
  fields: ReadonlyOr<AnyElementConfiguration[]>;

  /**
   * Whether fields are lazy by default. Defaults to false.
   */
  fieldsLazy?: boolean;

  /**
   * Whether fields are optional by default. Defaults to false.
   */
  fieldsOptional?: boolean;

  /**
   * Classes that are applied to the form.
   */
  formClass?: string | string[] | Record<string, string>;

  /**
   * Component or html element of a form element wrapper.
   */
  formElementWrapper?: ComponentOrHtmlElement;

  /**
   * Classes to apply to the element wrapping each form element.
   */
  formElementWrapperClass?: string;

  /**
   * Component or html element of a form wrapper.
   */
  formWrapper?: ComponentOrHtmlElement;

  /**
   * Classes to apply to the element wrapping a form.
   */
  formWrapperClass?: string;

  /**
   * Names of hooks to register.
   */
  hookNames?: readonly string[] | string[];

  /**
   * Function executed when any label is rendered.
   */
  renderLabel?: (input: string) => string;

  /**
   * Messages that are used for built-in validations.
   */
  validationMessages?: Record<'required' | string, FunctionOr<string>>;
};

export type FormHooks = {
  beforeSubmit?(form: FormInstance): PromiseOr<void>;
  afterSubmit?(form: FormInstance): PromiseOr<void>;

  beforeReset?(form: FormInstance): PromiseOr<void>;
  afterReset?(form: FormInstance): PromiseOr<void>;

  beforeValidate?(form: FormInstance): PromiseOr<void>;
  afterValidate?(form: FormInstance): PromiseOr<void>;
};

/**
 * The instance of a form.
 */
export type BaseFormInstance<FC extends FormConfiguration = FormConfiguration> = {
  /**
   * The name of the form.
   */
  readonly name: string;

  /**
   * Form configuration.
   */
  readonly config: Omit<FC, 'fields'>;

  /**
   * Hooks that are registered for this form.
   */
  readonly hooks: HookManagerInstance<FormHooks>;

  /**
   * An object containing all named fields in the form as {name: field} pairs.
   */
  readonly model: FieldsToModel;

  /**
   * All fields in the form.
   */
  readonly fields: Ref<UnwrapNestedRefs<AnyElementInstance>[]>;

  /**
   * All fields in the form that have a name and a ref.
   */
  readonly fieldsWithNamesAndRefs: ComputedRef<
    UnwrapNestedRefs<InteractiveElementInstance<ComponentOrHtmlElement, string>[]>
  >;

  /**
   * Determines whether the form is valid.
   */
  isValid: Ref<boolean>;

  /**
   * Add a new element to the form at the end, or before or after an existing element.
   */
  addElement(element: AnyElementConfiguration, sibling?: string, position?: 'before' | 'after'): void;

  /**
   * Get values from all non-disabled fields.
   * @returns {Record}
   */
  getValues(): Record<string, unknown>;

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

export type FormInstance<FC extends FormConfiguration = FormConfiguration> = BaseFormInstance<FC>;

/**
 * TODO: This is a temporary solution to avoid errors.
 *  We need to find a way to infer the types from the input form configuration.
 */
export type FieldsToModel<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RT = any,
> = {
  [K in N extends string ? N | string : string]: UnwrapNestedRefs<InteractiveElementInstance<C, N, RT>>;
};
