import {ref, watch, toValue, reactive, type UnwrapNestedRefs, computed, markRaw, type Ref, isRef} from 'vue';
import {isDefined} from '@vueuse/core';
import {isOfType, asyncEvery, type PromiseOr} from '@myparcel/ts-utils';
import {isRequired} from '../validators/isRequired';
import {useDynamicWatcher} from '../utils/useDynamicWatcher';
import {normalizeFieldConfiguration} from '../utils/normalizeFieldConfiguration';
import {type Validator, type ValidatorWithPrecedence, type WithMultiValidator} from '../types/validator.types';
import {type CustomHookItem} from '../types/hooks.types';
import {type FormInstance} from '../types/form.types';
import {type FieldConfiguration, type FieldInstance} from '../types/field.types';
import {type ComponentProps} from '../types/component.types';
import {type ToRecord} from '../types/common.types';
import {createHookManager} from '../hooks/createHookManager';
import {FIELD_HOOKS, FormHook} from '../data/hooks';

// noinspection JSUnusedGlobalSymbols
export class Field<Type = unknown, Props extends ComponentProps = ComponentProps> {
  public readonly attributes: FieldInstance<Type, Props>['attributes'];
  public readonly component: FieldInstance<Type, Props>['component'];
  public readonly config: FieldConfiguration<Type, Props>;
  public readonly errors: FieldInstance<Type, Props>['errors'] = ref([]);
  public readonly errorsTarget?: FieldInstance<Type, Props>['errorsTarget'];
  public readonly form: FieldInstance<Type, Props>['form'];
  public readonly formattedErrors: FieldInstance<Type, Props>['formattedErrors'];
  public readonly hooks: FieldInstance<Type, Props>['hooks'];
  public readonly isDirty: FieldInstance<Type, Props>['isDirty'] = ref(false);
  public readonly isDisabled: FieldInstance<Type, Props>['isDisabled'] = ref(false);
  public readonly isOptional: FieldInstance<Type, Props>['isOptional'] = ref(false);
  public readonly isReadOnly: FieldInstance<Type, Props>['isReadOnly'] = ref(false);
  public readonly isSuspended: FieldInstance<Type, Props>['isSuspended'] = ref(false);
  public readonly isTouched: FieldInstance<Type, Props>['isTouched'] = ref(false);
  public readonly isValid: FieldInstance<Type, Props>['isValid'] = ref(true);
  public readonly isVisible: FieldInstance<Props>['isVisible'] = ref(true);
  public readonly label?: FieldInstance<Type, Props>['label'];
  public readonly lazy: FieldInstance<Type, Props>['lazy'] = false;
  public readonly name: FieldInstance<Type, Props>['name'];
  public readonly props: FieldInstance<Type, Props>['props'];
  public readonly ref: FieldInstance<Type, Props>['ref'];
  public readonly validators: FieldInstance<Type, Props>['validators'] = ref([]);
  public readonly wrapper: FieldInstance<Type, Props>['wrapper'];
  protected readonly destroyHandles: Ref<(() => void)[]> = ref([]);
  protected readonly initialValue: Type;

  // eslint-disable-next-line max-lines-per-function, complexity
  public constructor(form: FormInstance, config: ToRecord<FieldConfiguration<Type, Props>>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore todo: throws error in build
    const resolvedConfig = normalizeFieldConfiguration(config, form);

    this.config = resolvedConfig;
    this.ref = (resolvedConfig.ref ?? ref<Type>()) as Ref<Type>;
    this.form = form;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore todo: throws error in build
    this.hooks = createHookManager({
      ...resolvedConfig,
      hookNames: [...FIELD_HOOKS, ...(resolvedConfig.hookNames ?? [])],
    });

    this.props = reactive(resolvedConfig.props ?? {}) as UnwrapNestedRefs<Props>;
    this.attributes = reactive(resolvedConfig.attributes ?? {});

    this.name = resolvedConfig.name;
    this.wrapper = resolvedConfig.wrapper;
    this.lazy = resolvedConfig.lazy;

    this.setVisible(resolvedConfig.visible ?? true);
    this.setDisabled(resolvedConfig.disabled ?? false);
    this.setOptional(resolvedConfig.optional ?? false);
    this.setReadOnly(resolvedConfig.readOnly ?? false);

    this.component =
      typeof resolvedConfig.component === 'string' ? resolvedConfig.component : markRaw(resolvedConfig.component);

    if (form.config.initialValues?.hasOwnProperty(resolvedConfig.name)) {
      this.setValue(form.config.initialValues[resolvedConfig.name]);
    }

    this.initialValue = toValue(this.ref);

    this.errorsTarget = resolvedConfig.errorsTarget;
    this.label = resolvedConfig.label
      ? form.config.renderLabel?.(resolvedConfig.label) ?? resolvedConfig.label
      : undefined;

    this.createValidators(config);

    this.formattedErrors = computed(() => {
      return toValue(this.errors).map((error) => (typeof error === 'function' ? error() : error));
    });

    const initializeCallback = () => {
      this.initializeWatchers(config, resolvedConfig);
    };

    initializeCallback();
    form.on(FormHook.AfterAddElement, initializeCallback);

    const stopRefWatcher = watch(this.ref, async (value: Type, oldValue: Type) => {
      await this.hooks.execute('beforeUpdate', this, value, oldValue);
      this.setIsDirty(true);
      await this.hooks.execute('afterUpdate', this, value, oldValue);
    });

    this.destroyHandles.value.push(stopRefWatcher);
  }

  public addError(error: string): void {
    if (isRef(this.errors)) {
      this.errors.value.push(error);
    } else {
      // @ts-expect-error todo
      this.errors.push(error);
    }
  }

  public blur = async (): Promise<void> => {
    await this.hooks.execute('beforeBlur', this, toValue(this.ref));

    this.setIsSuspended(true);
    this.setValue(((await this.hooks.execute('sanitize', this, toValue(this.ref))) as Type) ?? toValue(this.ref));

    if (toValue(this.isDirty)) {
      await this.validate();
    }

    this.setIsTouched(true);
    this.setIsSuspended(false);

    await this.hooks.execute('afterBlur', this, toValue(this.ref));
  };

  public async destroy(): Promise<void> {
    await Promise.all([
      ...this.destroyHandles.value.map((handle) => handle()),
      ...this.hooks.getRegisteredHooks().map((hook: CustomHookItem) => this.hooks.unregister(hook.name)),
    ]);
  }

  public focus: FieldConfiguration<Type, Props>['focus'] = async (_, event) => {
    await this.hooks.execute('beforeFocus', this, event);
    await this.hooks.execute('focus', this, event);
    await this.hooks.execute('afterFocus', this, event);
  };

  public reset = (): void => {
    this.resetValidation();
    this.setIsDirty(false);
    this.setIsTouched(false);
    this.setValue(this.initialValue);
  };

  public resetValidation(): void {
    this.setErrors([]);
  }

  public setDisabled(value: boolean): void {
    if (isRef(this.isDisabled)) {
      this.isDisabled.value = value;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.isDisabled = value;
    }
  }

  public setInvalid(): void {
    this.setValid(false);
  }

  public setOptional(value: boolean): void {
    if (isRef(this.isOptional)) {
      this.isOptional.value = value;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.isOptional = value;
    }
  }

  public setReadOnly(value: boolean): void {
    if (isRef(this.isReadOnly)) {
      this.isReadOnly.value = value;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.isReadOnly = value;
    }
  }

  public setValue(value: Type): void {
    if (isRef(this.ref)) {
      this.ref.value = value;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.ref = value;
    }
  }

  public setVisible(value: boolean): void {
    if (isRef(this.isVisible)) {
      this.isVisible.value = value;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.isVisible = value;
    }
  }

  public validate = async (): Promise<boolean> => {
    this.resetValidation();
    await this.hooks.execute('beforeValidate', this, toValue(this.ref));

    if (toValue(this.isDisabled)) {
      this.setValid(true);
      return toValue(this.isValid);
    }

    const doValidate = async (validator: Validator<Type, Props>) => {
      const valid = await validator.validate(this, toValue(this.ref));

      if (!valid && validator.errorMessage) {
        if (this.errorsTarget) {
          const target = toValue(this.form.fields).find((field: FieldInstance) => field.name === this.errorsTarget);

          toValue(target?.errors)?.push(validator.errorMessage);
        } else {
          toValue(this.errors).push(validator.errorMessage);
        }
      }

      return valid;
    };

    // validation schema: 1) validators without precedence 2) validators with precedence
    // if a validator with precedence fails, the rest of the validators are not executed.
    const withoutPrecedence = toValue(this.validators).filter((validator) => !validator.precedence);
    const withPrecedence = toValue(this.validators)
      .filter((validator) => isOfType<ValidatorWithPrecedence<Type, Props>>(validator, 'precedence'))
      .sort((validatorA, validatorB) => (validatorA.precedence ?? 0) - (validatorB.precedence ?? 0));

    // add the isRequired validator in-line when the field is not optional
    if (!toValue(this.isOptional)) {
      withoutPrecedence.push(isRequired<Type, Props>(this.form.config.validationMessages?.required ?? ''));
    }

    const validatedWithoutPrecedence = (await Promise.all(withoutPrecedence.map(doValidate))).every(Boolean);
    const validatedWithPrecedence = await asyncEvery(withPrecedence, doValidate);

    this.setValid(validatedWithoutPrecedence && validatedWithPrecedence);

    await this.hooks.execute('afterValidate', this, toValue(this.ref), toValue(this.isValid));

    return toValue(this.isValid);
  };

  private createValidators(config: FieldConfiguration<Type, Props>): void {
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

    this.setValidators(validators);
  }

  private initializeWatchers(
    config: FieldConfiguration<Type, Props>,
    resolvedConfig: FieldConfiguration<Type, Props>,
  ): void {
    (
      [
        [config.visibleWhen, this.isVisible, resolvedConfig.visible],
        [config.disabledWhen, this.isDisabled, resolvedConfig.disabled],
        [config.optionalWhen, this.isOptional, resolvedConfig.optional],
        [config.readOnlyWhen, this.isReadOnly, resolvedConfig.readOnly],
      ] satisfies [
        undefined | ((instance: FieldInstance<Type, Props>) => PromiseOr<boolean>),
        Ref<boolean>,
        boolean | undefined,
      ][]
    ).forEach(([configProperty, computedProperty, staticProperty]) => {
      if (!isDefined(configProperty)) {
        return;
      }

      // @ts-expect-error todo
      computedProperty.value = staticProperty;

      const stopHandler = useDynamicWatcher(() => configProperty(this), computedProperty);

      this.destroyHandles.value.push(stopHandler);
    });
  }

  private setErrors(errors: string[]): void {
    if (isRef(this.errors)) {
      this.errors.value = errors;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.errors = errors;
    }
  }

  private setIsDirty(value: boolean): void {
    if (isRef(this.isDirty)) {
      this.isDirty.value = value;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.isDirty = value;
    }
  }

  private setIsSuspended(value: boolean): void {
    if (isRef(this.isSuspended)) {
      this.isSuspended.value = value;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.isSuspended = value;
    }
  }

  private setIsTouched(value: boolean): void {
    if (isRef(this.isTouched)) {
      this.isTouched.value = value;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.isTouched = value;
    }
  }

  private setValid(valid: boolean): void {
    if (isRef(this.isValid)) {
      this.isValid.value = valid;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.isValid = valid;
    }
  }

  private setValidators(validators: Validator<Type, Props>[]): void {
    if (isRef(this.validators)) {
      this.validators.value = validators;
    } else {
      // @ts-expect-error todo
      // noinspection JSConstantReassignment
      this.validators = validators;
    }
  }
}
