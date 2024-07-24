// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {type Ref, type ComputedRef, type UnwrapNestedRefs, type Component} from 'vue';
import {type AnyAttributes, type FunctionOr} from '@myparcel-vfb/utils';
import {type HookManagerInstance, type HookUnregisterHandler} from '@myparcel-vfb/hook-manager';
import {type ReadonlyOr, type PromiseOr} from '@myparcel/ts-utils';
import {type FormHook} from '../data';
import {type FieldConfiguration, type FieldInstance} from './field.types';
import {type ComponentOrHtmlElement, type ComponentProps} from './component.types';
import {type ToRecord} from './common.types';

export type FormValues = Record<string | symbol, any>;

/**
 * The input configuration for a Form.
 */
export interface FormConfiguration<Values extends FormValues = FormValues> extends FormHooks<Values> {
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
  fieldDefaults?: Partial<Omit<FieldConfiguration, 'ref'>>;

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
  hookNames?: ReadonlyOr<string[]>;

  /**
   * Values to initialize the form with.
   */
  initialValues?: Partial<Values>;

  /**
   * Function executed when any label is rendered.
   */
  renderLabel?: (input: string) => string;

  /**
   * Messages that are used for built-in validations.
   */
  validationMessages?: Record<'required' | string, FunctionOr<string>>;
}

export interface FormHooks<Values extends FormValues = FormValues> {
  beforeSubmit?(form: FormInstance<Values>): PromiseOr<void>;
  afterSubmit?(form: FormInstance<Values>): PromiseOr<void>;

  beforeReset?(form: FormInstance<Values>): PromiseOr<void>;
  afterReset?(form: FormInstance<Values>): PromiseOr<void>;

  beforeValidate?(form: FormInstance<Values>): PromiseOr<void>;
  afterValidate?(form: FormInstance<Values>): PromiseOr<void>;

  beforeAddElement?<T extends keyof Values, Props extends ComponentProps = ComponentProps>(
    form: FormInstance<Values>,
    field: FieldInstance<Values[T], Props>,
  ): PromiseOr<void>;
  afterAddElement?<T extends keyof Values, Props extends ComponentProps = ComponentProps>(
    form: FormInstance<Values>,
    field: FieldInstance<Values[T], Props>,
  ): PromiseOr<void>;

  elementChange?<T extends keyof Values, Props extends ComponentProps = ComponentProps>(
    form: FormInstance<Values>,
    field: FieldInstance<Values[T], Props>,
    value: Values[T],
  ): PromiseOr<void>;
}

export interface BaseFormInstance<Values extends FormValues = FormValues> {
  /**
   * Form configuration.
   */
  readonly config: Omit<InstanceFormConfiguration<Values>, 'fields'>;

  /**
   * The outer HTML element.
   */
  element: HTMLElement;

  /**
   * All fields in the form.
   */
  readonly fields: Ref<FieldInstance[]>;

  /**
   * Hooks that are registered for this form.
   */
  readonly hooks: HookManagerInstance<ToRecord<FormHooks>>;

  /**
   * Exposes whether the form is dirty.
   */
  readonly isDirty: ComputedRef<boolean>;

  /**
   * Determines whether the form is valid.
   */
  readonly isValid: Ref<boolean>;

  /**
   * An object containing all named fields in the form as {name: field} pairs.
   */
  readonly model: FieldsToModel<Values>;

  /**
   * The name of the form.
   */
  readonly name: string;

  /**
   * Computed values from all non-disabled fields.
   */
  readonly values: UnwrapNestedRefs<Values>;

  /**
   * Add a new element to the form.
   *
   * @internal
   */
  addElement<Type = unknown, Props extends ComponentProps = ComponentProps>(
    element: FieldConfiguration<Type, Props>,
  ): Promise<FieldInstance<Type, Props>>;

  /**
   * Get a field by name.
   */
  getField<F extends FieldInstance | null = FieldInstance | null>(name: string): F;

  /**
   * Get the value of a field by name.
   * @deprecated use computed values
   */
  getValue<T = unknown, K extends keyof Values | string = keyof Values>(
    fieldName: K,
  ): K extends keyof Values ? Values[K] : T;

  /**
   * Get values from all non-disabled fields.
   * @deprecated use computed values
   */
  getValues<T extends FormValues = Values>(): T;

  /**
   * Remove one or more event listeners from the form.
   */
  off(event: FormHook, callback?: (form: FormInstance<Values>) => void): void;

  /**
   * Add an event listener to the form.
   */
  on(event: FormHook, callback: (form: FormInstance<Values>) => void): HookUnregisterHandler;

  /**
   * Remove an element from the form by name.
   *
   * @internal
   */
  removeElement(name: string): void;

  /**
   * Reset all fields to their original state.
   */
  reset(): PromiseOr<void>;

  /**
   * Destroy the form.
   */
  destroy(): void;

  /**
   * Set the value of a field by name.
   */
  setValue<T = unknown, K extends keyof Values | string = keyof Values>(
    fieldName: K,
    value: K extends keyof Values ? Values[K] : T,
  ): void;

  /**
   * Set values for multiple fields at once.
   */
  setValues<T extends FormValues = Values>(values: T): void;

  /**
   * Submit the form.
   */
  submit(): PromiseOr<void>;

  /**
   * Validate all fields in the form.
   */
  validate(): PromiseOr<boolean>;
}

/**
 * Initialized form configuration always contains the following properties.
 */
export interface InstanceFormConfiguration<V extends FormValues = FormValues> extends FormConfiguration<V> {
  field: {
    elementProp: boolean;
    wrapper?: ComponentOrHtmlElement;
  };

  fieldDefaults: Partial<FieldConfiguration> & {
    attributes: AnyAttributes;
    wrapper: boolean;
  };

  form: {
    attributes: AnyAttributes;
    tag: string;
    wrapper?: ComponentOrHtmlElement;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormInstance<Values extends FormValues = FormValues> = BaseFormInstance<Values>;

export type FieldsToModel<Values extends FormValues> = {
  [K in keyof Values]: FieldInstance<ComponentProps, Values[K]>;
};

export interface CreatedForm<Values extends FormValues = FormValues> {
  Component: Component;
  instance: FormInstance<Values>;
}
