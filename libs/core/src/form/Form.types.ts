/* eslint-disable @typescript-eslint/unified-signatures */
import {type ComputedRef, type Ref, type UnwrapNestedRefs} from 'vue';
import {type AnyAttributes, type FunctionOr, type ComponentProps} from '@myparcel-vfb/utils';
import {type HookManagerInstance, type HookUnregisterHandler} from '@myparcel-vfb/hook-manager';
import {type PromiseOr, type ReadonlyOr} from '@myparcel/ts-utils';
import {type ToRecord} from '../types/common.types';
import {type AnyElementConfiguration, type AnyElementInstance, type ComponentOrHtmlElement} from '../types';
import {FormHook} from '../data';
import {type InteractiveElementInstance} from './interactive-element';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValues = Record<string | symbol, any>;

/**
 * The input configuration for a Form.
 */
export interface FormConfiguration<V extends FormValues = FormValues> extends FormHooks<V> {
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
   * @TODO find a way to type this without having it cause a billion errors.
   */
  fields: unknown[];

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
  initialValues?: Partial<V>;

  /**
   * Function executed when any label is rendered.
   */
  renderLabel?: (input: string) => string;

  /**
   * Messages that are used for built-in validations.
   */
  validationMessages?: Record<'required' | string, FunctionOr<string>>;
}

export interface FormHooks<V extends FormValues = FormValues> {
  [FormHook.BeforeSubmit]?(form: FormInstance<V>): PromiseOr<void>;

  [FormHook.AfterSubmit]?(form: FormInstance<V>): PromiseOr<void>;

  [FormHook.BeforeReset]?(form: FormInstance<V>): PromiseOr<void>;

  [FormHook.AfterReset]?(form: FormInstance<V>): PromiseOr<void>;

  [FormHook.BeforeValidate]?(form: FormInstance<V>): PromiseOr<void>;

  [FormHook.AfterValidate]?(form: FormInstance<V>): PromiseOr<void>;

  [FormHook.BeforeAddElement]?<T extends keyof V, Props extends ComponentProps = ComponentProps>(
    form: FormInstance<V>,
    field: AnyElementInstance<V[T], Props>,
  ): PromiseOr<void>;

  [FormHook.AfterAddElement]?<T extends keyof V, Props extends ComponentProps = ComponentProps>(
    form: FormInstance<V>,
    field: AnyElementInstance<V[T], Props>,
  ): PromiseOr<void>;

  [FormHook.ElementChange]?<T extends keyof V, Props extends ComponentProps = ComponentProps>(
    form: FormInstance<V>,
    field: AnyElementInstance<V[T], Props>,
    value: V[T],
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
  readonly fields: Ref<AnyElementInstance[]>;

  /**
   * Hooks that are registered for this form.
   */
  readonly hooks: HookManagerInstance<ToRecord<FormHooks>>;

  /**
   * All fields in the form that have a name and a ref.
   */
  readonly interactiveFields: ComputedRef<InteractiveElementInstance[]>;

  /**
   * Exposes whether the form is dirty.
   */
  isDirty: ComputedRef<boolean>;

  /**
   * Determines whether the form is valid.
   */
  isValid: Ref<boolean>;

  /**
   * An object containing all named fields in the form as {name: field} pairs.
   */
  readonly model: FieldsToModel<Values>;

  /**
   * The name of the form.
   */
  readonly name: string;

  /**
   * Whether the form is stable. A form is stable when it is done first initialization and all fields are available.
   */
  readonly stable: Ref<boolean>;

  /**
   * Computed values from all non-disabled fields.
   */
  readonly values: UnwrapNestedRefs<Values>;

  /**
   * Add a new element to the form at the end, or before or after an existing element.
   */
  addElement<Type = unknown, Props extends ComponentProps = ComponentProps>(
    element: AnyElementConfiguration<Type, Props>,
  ): Promise<AnyElementInstance<Type, Props>>;

  addElement<Type = unknown, Props extends ComponentProps = ComponentProps>(
    element: AnyElementConfiguration<Type, Props>,
    sibling: string,
    position?: 'before' | 'after',
  ): Promise<undefined | AnyElementInstance<Type, Props>>;

  /**
   * Get a field by name.
   */
  getField<F extends AnyElementInstance | null = AnyElementInstance | null>(name: string): F;

  /**
   * Get the value of a field by name.
   */
  getValue<T = unknown, K extends keyof Values | string = keyof Values>(
    fieldName: K,
  ): K extends keyof Values ? Values[K] : T;

  /**
   * Get values from all non-disabled fields.
   */
  getValues<T extends FormValues = Values>(): T;

  /**
   * Remove one or more event listeners from the form.
   */
  off(event: keyof FormHooks, callback?: (form: FormInstance<Values>) => void): void;

  /**
   * Add an event listener to the form.
   */
  on(event: keyof FormHooks, callback: (form: FormInstance<Values>) => void): HookUnregisterHandler;

  /**
   * Remove an element from the form by name.
   */
  removeElement(name: string): void;

  /**
   * Reset all fields to their original state.
   */
  reset(): PromiseOr<void>;

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

  fieldDefaults: {
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
export type FormInstance<V extends FormValues = any> = BaseFormInstance<V>;

export type FieldsToModel<V extends FormValues> = {
  [K in keyof V]: K extends string ? InteractiveElementInstance<ComponentProps, V[K]> : never;
};
