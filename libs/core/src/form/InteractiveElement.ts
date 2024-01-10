// noinspection JSUnusedGlobalSymbols
import {ref, watch} from 'vue';
import {get} from '@vueuse/core';
import {isOfType, asyncEvery} from '@myparcel/ts-utils';
import {isRequired} from '../validators/isRequired';
import {useDynamicWatcher} from '../utils';
import {type ToRecord} from '../types/common.types';
import {
  type InteractiveElementConfiguration,
  type InteractiveElementHooks,
  type InteractiveElementInstance,
  type FormInstance,
  type AnyElementInstance,
  type ValidatorWithPrecedence,
  type Validator,
  type WithMultiValidator,
  type ComponentProps,
} from '../types';
import {INTERACTIVE_ELEMENT_HOOKS} from '../data';
import {PlainElement} from './PlainElement';

export class InteractiveElement<
  Type = unknown,
  Props extends ComponentProps = ComponentProps,
  Config extends InteractiveElementConfiguration<Type, Props> = InteractiveElementConfiguration<Type, Props>,
> extends PlainElement<Props, Config, InteractiveElementHooks<Type, Props>> {
  public declare errors: InteractiveElementInstance<Type, Props>['errors'];

  public declare readonly attributes: InteractiveElementInstance<Type, Props>['attributes'];
  public declare readonly component: InteractiveElementInstance<Type, Props>['component'];
  public declare readonly form: InteractiveElementInstance<Type, Props>['form'];
  public declare readonly formattedErrors: InteractiveElementInstance<Type, Props>['formattedErrors'];
  public declare readonly name: InteractiveElementInstance<Type, Props>['name'];
  public declare readonly props: InteractiveElementInstance<Type, Props>['props'];
  public declare readonly wrapper: InteractiveElementInstance<Type, Props>['wrapper'];

  public errorsTarget?: string;
  public isDirty: InteractiveElementInstance<Type, Props>['isDirty'] = ref(false);
  public isDisabled: InteractiveElementInstance<Type, Props>['isDisabled'] = ref(false);
  public isOptional: InteractiveElementInstance<Type, Props>['isOptional'] = ref(false);
  public isReadOnly: InteractiveElementInstance<Type, Props>['isReadOnly'] = ref(false);
  public isSuspended: InteractiveElementInstance<Type, Props>['isSuspended'] = ref(false);
  public isTouched: InteractiveElementInstance<Type, Props>['isTouched'] = ref(false);
  public isValid: InteractiveElementInstance<Type, Props>['isValid'] = ref(true);
  public label?: InteractiveElementInstance<Type, Props>['label'];
  public lazy: InteractiveElementInstance<Type, Props>['lazy'] = false;
  public ref: InteractiveElementInstance<Type, Props>['ref'];
  public validators: InteractiveElementInstance<Type, Props>['validators'] = ref([]);

  protected readonly initialValue: Type;

  // eslint-disable-next-line max-lines-per-function
  public constructor(form: FormInstance, config: ToRecord<Config>) {
    super(form, {...config, hookNames: INTERACTIVE_ELEMENT_HOOKS});

    this.ref = config.ref;

    if (form.config.initialValues?.hasOwnProperty(config.name)) {
      this.ref.value = form.config.initialValues[config.name];
    }

    this.initialValue = get(this.ref);

    this.lazy = config.lazy ?? false;
    this.errorsTarget = config.errorsTarget;
    this.label = config.label ? form.config.renderLabel?.(config.label) ?? config.label : undefined;

    this.isDisabled.value = config.disabled ?? false;
    this.isOptional.value = config.optional ?? false;
    this.isReadOnly.value = config.readOnly ?? false;

    this.createValidators(config);

    watch(this.ref, async (value: Type, oldValue: Type) => {
      await this.hooks.execute('beforeUpdate', this, value, oldValue);
      this.isDirty.value = true;
      await this.hooks.execute('afterUpdate', this, value, oldValue);
    });

    // initialize dynamic field checks when the form is stable:
    watch(form.stable, (value: boolean) => {
      if (!value) {
        return;
      }

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

      if (config.readOnlyWhen) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        useDynamicWatcher(() => config.readOnlyWhen(this), this.isReadOnly);
      }
    });
  }

  public blur = async (): Promise<void> => {
    await this.hooks.execute('beforeBlur', this, get(this.ref));

    this.isSuspended.value = true;
    this.ref.value = ((await this.hooks.execute('sanitize', this, get(this.ref))) as Type) ?? get(this.ref);

    if (get(this.isDirty)) {
      await this.validate();
    }

    this.isTouched.value = true;
    this.isSuspended.value = false;

    await this.hooks.execute('afterBlur', this, get(this.ref));
  };

  public focus: InteractiveElementConfiguration<Type, Props>['focus'] = async (_, event) => {
    await this.hooks.execute('beforeFocus', this, event);
    await this.hooks.execute('focus', this, event);
    await this.hooks.execute('afterFocus', this, event);
  };

  public reset = (): void => {
    this.resetValidation();
    this.isDirty.value = false;
    this.isTouched.value = false;
    this.ref.value = this.initialValue;
  };

  public setDisabled(value: boolean): void {
    this.isDisabled.value = value;
  }

  public setOptional(value: boolean): void {
    this.isOptional.value = value;
  }

  public setReadOnly(value: boolean): void {
    this.isReadOnly.value = value;
  }

  public validate = async (): Promise<boolean> => {
    this.resetValidation();
    await this.hooks.execute('beforeValidate', this, get(this.ref));

    if (get(this.isDisabled)) {
      this.isValid.value = true;
      return get(this.isValid);
    }

    const doValidate = async (validator: Validator<Type, Props>) => {
      const valid = await validator.validate(this, get(this.ref));

      if (!valid && validator.errorMessage) {
        if (this.errorsTarget) {
          const target = get(this.form.fields).find((field: AnyElementInstance) => field.name === this.errorsTarget);

          get(target?.errors)?.push(validator.errorMessage);
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
      .filter((validator) => isOfType<ValidatorWithPrecedence<Type, Props>>(validator, 'precedence'))
      .sort((validatorA, validatorB) => (validatorA.precedence ?? 0) - (validatorB.precedence ?? 0));

    // add the isRequired validator in-line when the field is not optional
    if (!get(this.isOptional)) {
      withoutPrecedence.push(isRequired<Type, Props>(this.form.config.validationMessages?.required ?? ''));
    }

    const validatedWithoutPrecedence = await asyncEvery(withoutPrecedence, doValidate);
    const validatedWithPrecedence = await asyncEvery(withPrecedence, doValidate);
    this.isValid.value = validatedWithoutPrecedence && validatedWithPrecedence;

    await this.hooks.execute('afterValidate', this, get(this.ref), get(this.isValid));

    return get(this.isValid);
  };

  private createValidators(config: InteractiveElementConfiguration<Type, Props>): void {
    let validators: Validator<Type, Props>[] = [];

    if (isOfType<Validator<Type, Props>>(config, 'validate')) {
      validators = [
        {
          validate: config.validate,
          errorMessage: config.errorMessage,
        },
      ];
    }

    if (isOfType<WithMultiValidator<Type, Props>>(config, 'validators')) {
      validators = config.validators ?? [];
    }

    this.validators.value = validators;
  }
}
