import {AnyElementConfiguration, AnyElementInstance, FieldsToModel, ResolvedElementConfiguration} from '../types';
import {FORM_HOOKS} from './Form';
import {HookManager} from '@myparcel-vfb/hook-manager';
import {PromiseOr} from '@myparcel-vfb/utils';
import {ReadonlyOr} from '@myparcel-vfb/utils/src';
import {Ref} from 'vue';

/**
 * The input configuration for a Form.
 */
export type FormConfiguration = {
  /**
   * Fields in the form.
   */
  fields: ReadonlyOr<ResolvedElementConfiguration[]>;

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

export type FormHooks<I extends FormInstance = FormInstance> = {
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
export type FormInstance<FC extends FormConfiguration = FormConfiguration> = {
  readonly name: string;

  readonly config: Omit<FC, 'fields'>;
  readonly fields: AnyElementInstance[];
  readonly hooks: HookManager<typeof FORM_HOOKS[number], FormHooks>;
  readonly model: FieldsToModel;

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
   * Add a new element to the form at the end, or before or after an existing element.
   */
  addElement(element: AnyElementConfiguration, sibling?: string, position?: 'before' | 'after'): PromiseOr<void>;

  /**
   * Determines whether the form is valid.
   */
  isValid: Ref<boolean>;
};
