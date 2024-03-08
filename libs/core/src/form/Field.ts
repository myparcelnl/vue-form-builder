// noinspection JSUnusedGlobalSymbols
import {ref, watch, toValue, reactive, type UnwrapNestedRefs, computed, markRaw, type Ref} from 'vue';
import {isDefined} from '@vueuse/core';
import {type CustomHookItem, createHookManager} from '@myparcel-vfb/hook-manager';
import {isOfType, asyncEvery, type PromiseOr} from '@myparcel/ts-utils';
import {isRequired} from '../validators';
import {normalizeFieldConfiguration} from '../utils/normalizeFieldConfiguration';
import {useDynamicWatcher} from '../utils';
import {
  type ToRecord,
  type FieldConfiguration,
  type FormInstance,
  type FieldInstance,
  type ValidatorWithPrecedence,
  type Validator,
  type WithMultiValidator,
  type ComponentProps,
} from '../types';
import {FIELD_HOOKS} from '../data';

export class Field<Type = unknown, Props extends ComponentProps = ComponentProps> {
  public readonly name: FieldInstance<Type, Props>['name'];
  public readonly component: FieldInstance<Type, Props>['component'];
  public readonly form: FieldInstance<Type, Props>['form'];
  public readonly wrapper: FieldInstance<Type, Props>['wrapper'];
  public readonly ref: FieldInstance<Type, Props>['ref'];

  public readonly errors: FieldInstance<Type, Props>['errors'] = ref([]);
  public readonly formattedErrors: FieldInstance<Type, Props>['formattedErrors'];
  public readonly errorsTarget?: FieldInstance<Type, Props>['errorsTarget'];

  public readonly hooks: FieldInstance<Type, Props>['hooks'];
  public readonly attributes: FieldInstance<Type, Props>['attributes'];
  public readonly props: FieldInstance<Type, Props>['props'];

  public readonly label?: FieldInstance<Type, Props>['label'];
  public readonly lazy: FieldInstance<Type, Props>['lazy'] = false;
  public readonly validators: FieldInstance<Type, Props>['validators'] = ref([]);

  public readonly isDirty: FieldInstance<Type, Props>['isDirty'] = ref(false);
  public readonly isDisabled: FieldInstance<Type, Props>['isDisabled'] = ref(false);
  public readonly isOptional: FieldInstance<Type, Props>['isOptional'] = ref(false);
  public readonly isReadOnly: FieldInstance<Type, Props>['isReadOnly'] = ref(false);
  public readonly isSuspended: FieldInstance<Type, Props>['isSuspended'] = ref(false);
  public readonly isTouched: FieldInstance<Type, Props>['isTouched'] = ref(false);
  public readonly isValid: FieldInstance<Type, Props>['isValid'] = ref(true);
  public readonly isVisible: FieldInstance<Props>['isVisible'] = ref(true);

  protected readonly config: FieldConfiguration<Type, Props>;
  protected readonly destroyHandles: Ref<(() => void)[]> = ref([]);
  protected readonly initialValue: Type;

  public setVisible(value: boolean): void {
    this.isVisible.value = value;
  }

  public resetValidation(): void {
    this.errors.value = [];
  }

  public async destroy(): Promise<void> {
    await Promise.all([
      ...this.destroyHandles.value.map((handle) => handle()),
      ...this.hooks.getRegisteredHooks().map((hook: CustomHookItem) => this.hooks.unregister(hook.name)),
    ]);
  }

  // eslint-disable-next-line max-lines-per-function
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

    this.component =
      typeof resolvedConfig.component === 'string' ? resolvedConfig.component : markRaw(resolvedConfig.component);

    if (form.config.initialValues?.hasOwnProperty(resolvedConfig.name)) {
      this.ref.value = form.config.initialValues[resolvedConfig.name];
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

    (
      [
        [config.visibleWhen, this.isVisible, resolvedConfig.visible],
        [config.disabledWhen, this.isDisabled, resolvedConfig.disabled],
        [config.optionalWhen, this.isOptional, resolvedConfig.optional],
        [config.readOnlyWhen, this.isReadOnly, resolvedConfig.readOnly],
      ] satisfies [undefined | ((instance: FieldInstance<Type, Props>) => PromiseOr<boolean>), Ref<boolean>, boolean][]
    ).forEach(([configProperty, computedProperty, staticProperty]) => {
      if (!isDefined(configProperty)) {
        return;
      }

      computedProperty.value = staticProperty;

      // @ts-expect-erro todo
      const stopHandler = useDynamicWatcher(() => configProperty(this), computedProperty);

      this.destroyHandles.value.push(stopHandler);
    });

    const stopRefWatcher = watch(this.ref, async (value: Type, oldValue: Type) => {
      await this.hooks.execute('beforeUpdate', this, value, oldValue);
      this.isDirty.value = true;
      await this.hooks.execute('afterUpdate', this, value, oldValue);
    });

    this.destroyHandles.value.push(stopRefWatcher);
  }

  public blur = async (): Promise<void> => {
    await this.hooks.execute('beforeBlur', this, toValue(this.ref));

    this.isSuspended.value = true;
    this.ref.value = ((await this.hooks.execute('sanitize', this, toValue(this.ref))) as Type) ?? toValue(this.ref);

    if (toValue(this.isDirty)) {
      await this.validate();
    }

    this.isTouched.value = true;
    this.isSuspended.value = false;

    await this.hooks.execute('afterBlur', this, toValue(this.ref));
  };

  public focus: FieldConfiguration<Type, Props>['focus'] = async (_, event) => {
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
    await this.hooks.execute('beforeValidate', this, toValue(this.ref));

    if (toValue(this.isDisabled)) {
      this.isValid.value = true;
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

    this.isValid.value = validatedWithoutPrecedence && validatedWithPrecedence;

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

    this.validators.value = validators;
  }
}
