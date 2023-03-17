import {AnyElementInstance, ComponentOrHtmlElement} from '../../types';
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
import {get} from '@vueuse/core';
import {useDynamicWatcher} from '../../utils';

// noinspection JSUnusedGlobalSymbols
export class InteractiveElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends string = string,
  RT = unknown,
> extends PlainElement<C, N> {
  public declare hooks: InteractiveElementInstance<C, N, RT>['hooks'];
  public declare readonly form: InteractiveElementInstance<C, N, RT>['form'];

  public errorsTarget?: string;
  public focus: InteractiveElementConfiguration<C, N, RT>['focus'];
  public isDirty = ref(false);
  public isDisabled = ref(false);
  public isOptional = ref(false);
  public isSuspended = ref(false);
  public isTouched = ref(false);
  public isValid: Ref<boolean> = ref(true);
  public label?: string;
  public lazy = false;
  public ref: InteractiveElementInstance<C, N, RT>['ref'];
  public validators = ref<Validator<C, N, RT>[]>([]);

  protected declare config: InteractiveElementConfiguration<C, N, RT>;

  /**
   * The initial value of the field.
   */
  protected initialValue: RT;

  protected sanitize: InteractiveElementConfiguration<C, N, RT>['sanitize'];

  public blur = async (): Promise<void> => {
    await this.hooks.execute('beforeBlur', this, get(this.ref));

    this.isSuspended.value = true;
    this.ref.value = ((await this.hooks.execute('sanitize', this, get(this.ref))) as RT) ?? get(this.ref);

    if (get(this.isDirty)) {
      await this.validate();
    }

    this.isTouched.value = true;
    this.isSuspended.value = false;

    await this.hooks.execute('afterBlur', this, get(this.ref));
  };

  public validate = async (): Promise<boolean> => {
    this.resetValidation();
    await this.hooks.execute('beforeValidate', this, get(this.ref));

    if (get(this.isDisabled)) {
      this.isValid.value = true;
      return get(this.isValid);
    }

    const doValidate = async (validator: Validator<C, N, RT>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const valid = await validator.validate(this, get(this.ref));

      if (!valid && validator.errorMessage) {
        if (this.errorsTarget) {
          const target = get(this.form.fields).find((field: AnyElementInstance) => field.name === this.errorsTarget);

          get(target?.errors).push(validator.errorMessage);
        } else {
          get(this.errors).push(validator.errorMessage);
        }
      }

      return valid;
    };

    // validation schema: 1) validators without precedence 2) validators with precedence
    // if a validator with precedence fails, the rest of the validators are not executed.
    const withoutPrecedence = get(this.validators).filter((validator) => !validator.precedence);
    const withPrecedence = get(this.validators)
      .filter((validator) => isOfType<ValidatorWithPrecedence<C, N, RT>>(validator, 'precedence'))
      .sort((validatorA, validatorB) => (validatorA.precedence ?? 0) - (validatorB.precedence ?? 0));

    this.isValid.value =
      (await asyncEvery(withoutPrecedence, doValidate)) && (await asyncEvery(withPrecedence, doValidate));

    await this.hooks.execute('afterValidate', this, get(this.ref), get(this.isValid));

    return get(this.isValid);
  };

  public reset = (): void => {
    this.resetValidation();
    this.isDirty.value = false;
    this.isTouched.value = false;
    this.ref.value = this.initialValue;
  };

  public constructor(form: FormInstance, name: N, config: InteractiveElementConfiguration<C, N, RT>) {
    super(form, {...config, hookNames: INTERACTIVE_ELEMENT_HOOKS});

    this.ref = config.ref;
    this.initialValue = get(this.ref);

    this.lazy = config.lazy ?? false;

    this.isDisabled.value = config.disabled ?? false;
    this.isOptional.value = config.optional ?? false;

    this.errorsTarget = config.errorsTarget;

    this.label = config.label ? form.config.renderLabel?.(config.label) ?? config.label : undefined;

    // @ts-expect-error idk
    this.focus = async (instance, event) => {
      await this.hooks.execute('beforeFocus', this, event);
      await this.hooks.execute('focus', this, event);
      await this.hooks.execute('afterFocus', this, event);
    };

    // @ts-expect-error idk
    this.sanitize = async (instance, value) => {
      await this.hooks.execute('beforeSanitize', this, value);
      const sanitizedValue = await this.hooks.execute('sanitize', this, value);
      await this.hooks.execute('afterSanitize', this, sanitizedValue);

      return sanitizedValue;
    };

    if (config.disabledWhen) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      useDynamicWatcher(() => config.disabledWhen(this), this.isDisabled);
    }

    if (config.optionalWhen) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      useDynamicWatcher(() => config.optionalWhen(this), this.isOptional);
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

    if (!get(this.isOptional)) {
      validators.push(isRequired<C, N, RT>(this.form.config.validationMessages?.required ?? ''));
    }

    this.validators.value = validators;
  }
}
