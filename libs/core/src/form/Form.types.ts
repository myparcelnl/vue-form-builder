/* eslint-disable @typescript-eslint/unified-signatures */
import {type ComputedRef, type Ref} from 'vue';
import {type AnyAttributes, type FunctionOr} from '@myparcel-vfb/utils/src';
import {type HookManagerInstance, type HookUnregisterHandler} from '@myparcel-vfb/hook-manager/src';
import {type PromiseOr, type ReadonlyOr} from '@myparcel/ts-utils';
import {
  type AnyElementConfiguration,
  type AnyElementInstance,
  type ComponentOrHtmlElement,
  type ElementName,
} from '../types';
import {type InteractiveElementInstance} from './interactive-element';
import {FormHook} from './hooks';

/**
 * The input configuration for a Form.
 */
export type FormConfiguration = FormHooks & {
  /**
   * Global configuration for all fields.
   */
  field?: {
    wrapper?: ComponentOrHtmlElement;

    /**
     * Whether to use the element as a prop on custom elements. Defaults to true. If set to false, your component
     * boilerplate can be more concise and omit the "element" prop without getting it as an extraneous attribute in
     * your html. You can still access the element via injection using useElement().
     * @see useElement
     */
    elementProp?: boolean;
  };

  /**
   * Default configuration for all fields.
   */
  fieldDefaults?: Partial<AnyElementConfiguration>;

  /**
   * Fields in the form.
   */
  fields: ReadonlyOr<AnyElementConfiguration[]>;

  /**
   * Configuration for the form element.
   */
  form?: {
    /**
     * Attributes to apply to the outer form element.
     */
    attributes?: AnyAttributes;

    /**
     * Tag to use for the form element. Defaults to 'form'.
     */
    tag?: string;

    /**
     * Component or html element wrapping all form elements. Defaults to false.
     */
    wrapper?: ComponentOrHtmlElement;
  };

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
  [FormHook.BeforeSubmit]?(form: FormInstance): PromiseOr<void>;
  [FormHook.AfterSubmit]?(form: FormInstance): PromiseOr<void>;

  [FormHook.BeforeReset]?(form: FormInstance): PromiseOr<void>;
  [FormHook.AfterReset]?(form: FormInstance): PromiseOr<void>;

  [FormHook.BeforeValidate]?(form: FormInstance): PromiseOr<void>;
  [FormHook.AfterValidate]?(form: FormInstance): PromiseOr<void>;

  [FormHook.BeforeAddElement]?(form: FormInstance, field: AnyElementInstance): PromiseOr<void>;
  [FormHook.AfterAddElement]?(form: FormInstance, field: AnyElementInstance): PromiseOr<void>;

  [FormHook.ElementChange]?(form: FormInstance, field: AnyElementInstance, value: unknown): PromiseOr<void>;
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
   * Whether the form is stable. A form is stable when it is done first initialization and all fields are available.
   */
  readonly stable: Ref<boolean>;

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
  readonly fields: Ref<AnyElementInstance[]>;

  /**
   * All fields in the form that have a name and a ref.
   */
  readonly interactiveFields: ComputedRef<InteractiveElementInstance<ComponentOrHtmlElement, string>[]>;

  /**
   * The outer HTML element.
   */
  element: HTMLElement;

  /**
   * Determines whether the form is valid.
   */
  isValid: Ref<boolean>;

  /**
   * Exposes whether the form is dirty.
   */
  isDirty: ComputedRef<boolean>;

  /**
   * Add a new element to the form at the end, or before or after an existing element.
   */
  addElement(element: AnyElementConfiguration, sibling?: string, position?: 'before' | 'after'): void;

  /**
   * Get values from all non-disabled fields.
   */
  getValues(): Record<string, unknown>;

  /**
   * Get the value of a field by name.
   */
  getValue(name: string): unknown;

  /**
   * Add an event listener to the form.
   */
  on(event: keyof FormHooks, callback: (form: FormInstance) => void): HookUnregisterHandler;

  /**
   * Remove one or more event listeners from the form.
   */
  off(event: keyof FormHooks, callback?: (form: FormInstance) => void): void;

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

  /**
   * @internal
   */
  emit(event: keyof FormHooks, ...args: unknown[]): void;
};

/**
 * Initialized form configuration always contains the following properties.
 */
export type InstanceFormConfiguration<FC extends FormConfiguration = FormConfiguration> = FC & {
  field: {
    elementProp: boolean;
    wrapper?: ComponentOrHtmlElement;
  };
  fieldDefaults: {
    attributes: AnyAttributes;
    wrapper: boolean;
  };
  form: {
    attributes: AnyAttributes;
    tag: string;
  };
};

export type FormInstance<FC extends InstanceFormConfiguration = InstanceFormConfiguration> = BaseFormInstance<FC>;

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
  [K in N extends string ? N | string : string]: InteractiveElementInstance<C, N, RT>;
};
