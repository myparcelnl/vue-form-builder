import {ComponentOrHtmlElement, ElementName} from '../../types';
import {
  INTERACTIVE_ELEMENT_HOOKS,
  InteractiveElementConfiguration,
  InteractiveElementInstance,
} from './InteractiveElement.types';
import {MultiValidator, SingleValidator, Validator, ValidatorWithPrecedence, isRequired} from '../validator';
import {Ref, ref, watch} from 'vue';
import {asyncEvery, isOfType} from '@myparcel/ts-utils';
import {FormInstance} from '../Form.types';
import {PlainElement} from '../plain-element';
import {useDynamicWatcher} from '../../utils/useDynamicWatcher';

export class InteractiveElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> extends PlainElement<C, N> {
  public focus;

  public isDirty = ref(false);

  public isSuspended = ref(false);
  public isTouched = ref(false);
  public isValid: Ref<boolean> = ref(true);
  public isOptional = ref(false);

  public isDisabled = ref(false);
  public errors = ref<string[]>([]);

  public label?: string;

  public lazy = false;
  public ref: InteractiveElementInstance<C, N, RT>['ref'];

  public validators = ref<Validator<C, N, RT>[]>([]);
  public declare readonly form: InteractiveElementInstance<C, N, RT>['form'];

  public declare hooks: InteractiveElementInstance<C, N, RT>['hooks'];

  protected declare config: InteractiveElementConfiguration<C, N, RT>;

  /**
   * The initial value of the field.
   */
  protected initialValue: RT;

  /**
   * Default sanitizer does nothing.
   */
  protected sanitize: InteractiveElementInstance<C, N, RT>['sanitize'];

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

  public validate = async (): Promise<boolean> => {
    this.resetValidation();
    await this.hooks.execute('beforeValidate', this, this.ref.value);

    if (this.isDisabled.value) {
      this.isValid.value = true;
      return this.isValid.value;
    }

    const doValidate = async (validator: Validator<C, N, RT>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const valid = await validator.validate(this, this.ref.value);

      if (!valid && validator.errorMessage) {
        this.errors.value.push(validator.errorMessage);
      }

      return valid;
    };

    // validation schema: 1) validators without precedence 2) validators with precedence
    // if a validator with precedence fails, the rest of the validators are not executed.
    const withoutPrecedence = this.validators.value.filter((validator) => !validator.precedence);
    const withPrecedence = this.validators.value
      .filter((validator) => isOfType<ValidatorWithPrecedence<C, N, RT>>(validator, 'precedence'))
      .sort((validatorA, validatorB) => (validatorA.precedence ?? 0) - (validatorB.precedence ?? 0));

    this.isValid.value =
      (await asyncEvery(withoutPrecedence, doValidate)) && (await asyncEvery(withPrecedence, doValidate));

    await this.hooks.execute('afterValidate', this, this.ref.value, this.isValid.value);
    return this.isValid.value;
  };

  public reset = (): void => {
    this.resetValidation();
    this.isDirty.value = false;
    this.isTouched.value = false;
    this.ref.value = this.initialValue;
  };

  public constructor(form: FormInstance, name: N, config: InteractiveElementConfiguration<C, N, RT>) {
    super(form, {...config, hookNames: INTERACTIVE_ELEMENT_HOOKS});

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.ref = config.ref;
    this.initialValue = this.ref.value;
    this.lazy = config.lazy ?? false;

    this.label = config.label ? form.config.renderLabel?.(config.label) ?? config.label : undefined;

    this.focus = async (instance: typeof this, event: FocusEvent): Promise<void> => {
      await this.hooks.execute('focus', this, event);
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.sanitize = config.sanitize ?? (((_, value) => value) as InteractiveElementConfiguration<C, N, RT>['sanitize']);

    if (config.disabledCb) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      useDynamicWatcher(() => config.disabledCb(this), this.isDisabled);
    }

    if (config.optionalCb) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      useDynamicWatcher(() => config.optionalCb(this), this.isOptional);
    }

    this.createValidators(config);

    watch(this.ref, async (value: RT, oldValue: RT) => {
      await this.hooks.execute('beforeUpdate', this, value, oldValue);
      this.isDirty.value = true;
      await this.hooks.execute('afterUpdate', this, value, oldValue);
    });
  }

  public setOptional(value: boolean): void {
    this.isOptional.value = value;
  }

  public setDisabled(value: boolean): void {
    this.isDisabled.value = value;
  }

  private createValidators(config: InteractiveElementConfiguration<C, N, RT>): void {
    let validators: Validator<C, N, RT>[] = [];

    if (isOfType<SingleValidator<C, N, RT>>(config, 'validate')) {
      validators = [
        {
          validate: config.validate,
          errorMessage: config.errorMessage,
        },
      ];
    }

    if (isOfType<MultiValidator<C, N, RT>>(config, 'validators')) {
      validators = config.validators ?? [];
    }

    if (!this.isOptional.value) {
      validators.push(isRequired<C, N, RT>(this.form.config.validationMessages?.required ?? ''));
    }

    this.validators.value = validators;
  }

  private resetValidation(): void {
    this.errors.value = [];
  }
}
