import {ComponentHooks, ComponentOrHtmlElement} from '../../types';
import {ComputedRef, Ref, ref, watch} from 'vue';
import {
  INTERACTIVE_ELEMENT_HOOKS,
  InteractiveElementConfiguration,
  InteractiveElementHooks,
  InteractiveElementInstance,
} from './InteractiveElement.types';
import {MultiValidator, SingleValidator, Validator} from './validator';
import {PromiseOr, createComputedValue, isOfType} from '@myparcel-vfb/utils';
import {FormInstance} from '../Form.types';
import {HookManager} from '@myparcel-vfb/hook-manager';
import {PlainElement} from '../plain-element';

type Hooks<C extends ComponentOrHtmlElement, N extends string, RT = unknown> = InteractiveElementHooks &
  ComponentHooks<C, InteractiveElementInstance<C, N, RT>>;

export class InteractiveElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends string = string,
  RT = unknown,
> extends PlainElement<C, N> {
  public focus;

  public isDirty = ref(false);
  public isSuspended = ref(false);
  public isTouched = ref(false);

  public isDisabled: ComputedRef<PromiseOr<boolean>>;
  public isOptional: ComputedRef<PromiseOr<boolean>>;
  public isVisible: ComputedRef<PromiseOr<boolean>>;
  public isValid: Ref<PromiseOr<boolean>> = ref(true);

  public errors: Ref<string[]> = ref([]);

  public label?: string;
  public lazy = false;
  public ref: Ref<RT>;
  public validators = ref<Validator<RT, C, N>[]>([]);

  public declare readonly form: FormInstance;
  // todo fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public declare hooks: HookManager<typeof INTERACTIVE_ELEMENT_HOOKS[number], Hooks<C, N, RT>> | any;

  /**
   * Enable to trigger validation.
   */
  protected isValidated = ref(false);

  /**
   * The initial value of the field.
   */
  protected initialValue: RT;

  /**
   * Default sanitizer does nothing.
   */
  protected sanitize: InteractiveElementConfiguration<C, N, RT>['sanitize'];

  public blur = async (): Promise<void> => {
    await this.hooks.execute('beforeBlur', this, this.ref.value);
    this.isSuspended.value = true;

    this.ref.value = ((await this.hooks.execute('sanitize', this, this.ref.value)) as RT) ?? this.ref.value;

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

  public reset(): void {
    this.resetValidation();
    this.isDirty.value = false;
    this.isTouched.value = false;
    this.ref.value = this.initialValue;
  }

  public constructor(form: FormInstance, name: N, config: InteractiveElementConfiguration<C, N, RT>) {
    super(form, {...config, hookNames: INTERACTIVE_ELEMENT_HOOKS});

    this.ref = config.ref;
    this.initialValue = this.ref.value;

    this.sanitize = config.sanitize ?? (((_, value) => value) as InteractiveElementConfiguration<C, N, RT>['sanitize']);

    this.label = config.label;
    this.lazy = config.lazy ?? false;

    this.isOptional = createComputedValue(config.optional, false);
    this.isDisabled = createComputedValue(config.disabled, false);
    this.isVisible = createComputedValue(config.visible, true);

    // this.isValid = this.createComputedIsValid(config);

    // this.isDisabled.value = config.disabled ?? false;
    // this.isOptional.value = config.optional ?? false;
    // this.isVisible.value = config.visible ?? true;

    // this.click = (event: MouseEvent) => this.hooks.execute('click', this, event);
    this.focus = async (instance: typeof this, event: FocusEvent): Promise<void> => {
      await this.hooks.execute('focus', this, event);
    };

    this.createValidators(config);

    watch(this.ref, async (value: RT, oldValue: RT) => {
      await this.hooks.execute('beforeUpdate', this, value, oldValue);
      this.isDirty.value = true;
      await this.hooks.execute('afterUpdate', this, value, oldValue);
    });

    watch([this.isDirty, this.isDisabled, this.isValidated, this.validators], async () => {
      if (this.isDisabled.value || !this.isDirty.value || !this.isValidated.value) {
        this.isValid.value = true;
        return;
      }

      const promises = await Promise.all(
        this.validators.value.map(async (validator) => {
          // TODO: fix types
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const valid = await validator.validate(this as any, this.ref.value);

          if (!valid && validator.errorMessage) {
            this.errors.value.push(validator.errorMessage);
          }

          return valid;
        }),
      );

      this.isValid.value = promises.every(Boolean);
    });
  }

  private createValidators(config: InteractiveElementConfiguration<C, N, RT>): void {
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

    this.validators.value = validators;
  }

  private resetValidation(): void {
    this.errors.value = [];
    this.isValidated.value = false;
  }
}
