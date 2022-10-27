import {ComponentHooks, ComponentOrHtmlElement, FieldName} from '../../types';
import {ComputedRef, Ref, computed, ref, watch} from 'vue';
import {HookManager, HookManagerInput} from '@myparcel/vue-form-builder-hook-manager';
import {
  INTERACTIVE_ELEMENT_HOOKS,
  InteractiveElementConfiguration,
  InteractiveElementHooks,
  InteractiveElementInstance,
} from './InteractiveElement.types';
import {MultiValidator, SingleValidator, Validator} from './validator';
import {PromiseOr, isOfType} from '@myparcel/vue-form-builder-utils';
import {FormInstance} from '../Form.types';
import {NamedElement} from '../named-element';

const normalizeValue = <T>(value: undefined | Ref<T> | ComputedRef<T> | T, defaultValue: T): ComputedRef<T> => {
  return computed(() => {
    const resolvedValue = isOfType<Ref>(value, 'value') ? value.value : value;

    return resolvedValue ?? defaultValue;
  });
};

export class InteractiveElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
  FC extends InteractiveElementConfiguration<C, N, RT> = InteractiveElementConfiguration<C, N, RT>,
> extends NamedElement<C, N> {
  public focus;

  public isDirty = ref(false);
  public isSuspended = ref(false);
  public isTouched = ref(false);

  public isDisabled: ComputedRef<PromiseOr<boolean>>;
  public isOptional: ComputedRef<PromiseOr<boolean>>;
  public isVisible: ComputedRef<PromiseOr<boolean>>;
  public isValid: ComputedRef<PromiseOr<boolean>>;

  public errors: Ref<string[]> = ref([]);

  public label?: string;
  public lazy = false;
  public ref: Ref<RT>;
  public validators: Validator<RT, C, N>[] = [];

  public declare hooks: HookManager<
    HookManagerInput<
      typeof INTERACTIVE_ELEMENT_HOOKS,
      InteractiveElementHooks<InteractiveElementInstance, RT> & ComponentHooks<C, InteractiveElementInstance>
    >
  >;

  /**
   * Enable to trigger validation..
   */
  protected isValidated = ref(false);

  /**
   * The initial value of the field.
   */
  protected initialValue: RT;

  /**
   * Default sanitizer does nothing.
   */
  protected sanitize: FC['sanitize'];

  public blur = async () => {
    await this.hooks.execute('beforeBlur', this, this.ref.value);
    this.isSuspended.value = true;

    this.ref.value = await this.hooks.execute('sanitize', this, this.ref.value);

    if (this.isDirty.value) {
      await this.validate();
    }

    this.isTouched.value = true;
    this.isSuspended.value = false;
    await this.hooks.execute('afterBlur', this, this.ref.value);
  };

  public validate = async (): Promise<void> => {
    this.resetValidation();
    await this.hooks.execute('beforeValidate', this, this.ref.value);
    this.isValidated.value = true;
    await this.hooks.execute('afterValidate', this, this.ref.value, this.isValid.value);
  };

  public reset() {
    this.resetValidation();
    this.isDirty.value = false;
    this.isTouched.value = false;
    this.ref.value = this.initialValue;
  }

  public constructor(form: FormInstance, name: N, config: FC) {
    super(form, name, {...config, hookNames: INTERACTIVE_ELEMENT_HOOKS});

    this.ref = config.ref;
    this.initialValue = this.ref.value;

    this.sanitize = config.sanitize ?? (((_, value) => value) as FC['sanitize']);

    this.label = config.label;
    this.lazy = config.lazy ?? false;

    this.isOptional = this.createComputedIsOptional(config);
    this.isDisabled = this.createComputedIsDisabled(config);
    this.isVisible = this.createComputedIsVisible(config);

    this.isValid = this.createComputedIsValid(config);

    // this.isDisabled.value = config.disabled ?? false;
    // this.isOptional.value = config.optional ?? false;
    // this.isVisible.value = config.visible ?? true;

    // this.click = (event: MouseEvent) => this.hooks.execute('click', this, event);
    this.focus = (event: FocusEvent) => this.hooks.execute('focus', this, event);

    watch(this.ref, async (value: RT, oldValue: RT) => {
      await this.hooks.execute('beforeUpdate', this, value, oldValue);
      // this.isDirty.value = true;
      // await this.validateAll();
      await this.hooks.execute('afterUpdate', this, value, oldValue);
    });
  }

  private createComputedIsValid(config: FC): ComputedRef<Promise<boolean>> {
    let validators: Validator[] = [];

    if (isOfType<SingleValidator>(config, 'validate')) {
      validators = [
        {
          validate: config.validate,
          errorMessage: config.errorMessage,
        },
      ];
    }

    if (isOfType<MultiValidator>(config, 'validators')) {
      validators = config.validators ?? [];
    }

    if (!this.isOptional.value) {
      validators.push({
        validate: (value) => Boolean(value),
        errorMessage: this.form.config.validationMessages?.required ?? '',
      });
    }

    this.validators = validators;

    return computed(async () => {
      if (!this.isValidated.value) {
        return true;
      }

      const promises = await Promise.all(
        this.validators.map(async (validator) => {
          // TODO: fix types
          const valid = await validator.validate(this as any, this.ref.value);

          if (!valid && validator.errorMessage) {
            this.errors.value.push(validator.errorMessage);
          }

          return valid;
        }),
      );

      return promises.every(Boolean);
    });
  }

  private createComputedIsDisabled(config: FC): ComputedRef<PromiseOr<boolean>> {
    return normalizeValue(config.disabled, false);
  }

  private createComputedIsOptional(config: FC): ComputedRef<PromiseOr<boolean>> {
    return normalizeValue(config.optional, false);
  }

  private createComputedIsVisible(config: FC): ComputedRef<PromiseOr<boolean>> {
    return normalizeValue(config.visible, true);
  }

  private resetValidation(): void {
    this.errors.value = [];
    this.isValidated.value = false;
  }
}
