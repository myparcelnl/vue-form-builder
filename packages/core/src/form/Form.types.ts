import {AnyElementInstance, ComponentOrHtmlElement, FieldConfiguration, FieldName, FieldsToModel} from '../types';
import {HookManager, HookManagerInput} from '@myparcel/vue-form-builder-hook-manager';
import {ComputedRef} from 'vue';
import {PromiseOr} from '@myparcel/vue-form-builder-utils';

/**
 * The input configuration for a Form.
 */
export type FormConfiguration = {
  /**
   * Fields in the form.
   */
  fields: FieldConfiguration[];

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

  hookNames?: string[];
};

export type FormHooks<I extends FormInstance = FormInstance> = {
  beforeSubmit: (form: I) => PromiseOr<void>;
  afterSubmit: (form: I) => PromiseOr<void>;
  beforeReset: (form: I) => PromiseOr<void>;
  afterReset: (form: I) => PromiseOr<void>;
  beforeValidate: (form: I) => PromiseOr<void>;
  afterValidate: (form: I) => PromiseOr<void>;
};

/**
 * The instance of a form.
 */
export type FormInstance<
  FC extends FormConfiguration = FormConfiguration,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = {
  readonly name: string;

  readonly config: Omit<FC, 'fields'>;
  readonly fields: AnyElementInstance<C, N, RT>[];
  readonly hooks: HookManager<HookManagerInput<string[], FormHooks>>;
  readonly model: FieldsToModel<C, N, RT>;

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

  /**
   * Determines whether the form is valid.
   */
  isValid: ComputedRef<PromiseOr<boolean>>;
};
