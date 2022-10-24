import {FieldName, FieldOrElement, FieldWithNameAndRef} from '../../types';
import {Ref, ref, watch} from 'vue';
import {ComponentLifecycleHooks} from '../../services/hook-manager/componentHooks';
import {ComponentOrHtmlElement} from '../plain-element';
import {FormInstance} from '../Form';
import {HookManager} from '../../services';
import {NamedElement} from '../named-element';

const FIELD_HOOKS = [
  'beforeBlur',
  'afterBlur',

  'beforeFocus',
  'focus',
  'afterFocus',

  'beforeSanitize',
  'sanitize',
  'afterSanitize',

  'beforeUpdate',
  'afterUpdate',

  'beforeValidate',
  'validate',
  'validators',
  'afterValidate',
] as const;

type BaseFieldInstance<RT = unknown> = {
  hooks: HookManager<FieldHooks<FieldInstance, RT>>;
  form: FormInstance;
};

export type FieldInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = Omit<FieldOrElement<C, N, RT>, 'form'> & BaseFieldInstance<RT>;

type Validator = {
  validate: (value: unknown) => boolean;
  errorMessage: string;
}

type FieldHooks<N, RT> = {
  beforeBlur: (field: N, value: RT) => void;
  afterBlur: (field: N, value: RT) => void;

  beforeFocus: (field: N, event: FocusEvent) => void;
  focus: (field: N, event: FocusEvent) => void;
  afterFocus: (field: N, event: FocusEvent) => void;

  beforeSanitize: (field: N, value: RT) => void;
  sanitize: (field: N, value: RT) => RT;
  afterSanitize: (field: N, value: RT) => void;

  beforeUpdate: (field: N, value: RT, oldValue: RT) => void;
  afterUpdate: (field: N, value: RT, oldValueT: RT) => void;

  beforeValidate: (field: N, value: RT) => void;
  validate: (field: N, value: RT) => boolean;
  validators: Validator[];
  afterValidate: (field: N, value: RT, isValid: boolean) => void;
} & ComponentLifecycleHooks<N>;

export class Field<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
  FC extends FieldWithNameAndRef<C, N, RT> = FieldWithNameAndRef<C, N, RT>,
> extends NamedElement<C, N> {
  public focus;

  public isDirty = ref(false);
  public isDisabled = ref(false);
  public isOptional = ref(false);
  public isSuspended = ref(false);
  public isTouched = ref(false);
  public isValid = ref(true);
  public isVisible = ref(true);
  public errors = ref([]);
  public label?: string;
  public lazy = false;
  public ref: Ref<RT>;

  // eslint-disable-next-line no-invalid-this
  public declare hooks: HookManager<FieldHooks<typeof this, RT>>;

  private validationCache: Record<string, boolean> = {};

  public blur = async () => {
    await this.hooks.execute('beforeBlur', this, this.ref.value);
    this.isSuspended.value = true;

    this.ref.value = await this.hooks.execute('sanitize', this, this.ref.value);

    if (this.isDirty.value) {
      await this.validateAll();
    }

    this.isTouched.value = true;
    this.isSuspended.value = false;
    await this.hooks.execute('afterBlur', this, this.ref.value);
  };

  public validateAll = async (): Promise<void> => {
    this.isValid.value = await this.cachedValidate(this.ref.value);
  };

  private cachedValidate = async (value: RT): Promise<boolean> => {
    const cacheKey = String(`${value}${this.isOptional.value ? '_optional' : ''}`);

    this.errors.value = [];
    if (!this.validationCache[cacheKey]) {
      if (!this.isDirty.value) {
        return true;
      }

      await this.hooks.execute('beforeValidate', this, value);

      if (!this.isOptional.value && !value) {
        return false;
      }

      const valid = await this.hooks.execute('validate', this, value);
      await this.hooks.execute('afterValidate', this, value, valid);
      this.validationCache[cacheKey] = valid;
    }

    return this.validationCache[cacheKey];
  };

  // protected declare readonly config: FieldDefinition<N, RT>;

  constructor(form: FormInstance, name: N, config: FC & FieldHooks<Field<C, N, RT>, RT>) {
    let sanitize = config.sanitize || ((_, value) => value);
    let validate = (field, value) => true;

    if (config.validate) {
      // if only a validator is set, use it as the validate function
      validate = config.validate;
    } else if (config.validators) {
      // if validators are set, use it to loop and validate
      validate = (field, value) => {
        config.validators.forEach((validator: Validator) => {
          if (!validator.validate(field, value)) {
            this.errors.value.push(validator.errorMessage);
          }
        });
        if (this.errors.value.length) {
          return false;
        }
        return true;
      }
    }

    const defaultConfig = {
      sanitize,
      validate,
    };

    const fieldConfig = {
      ...defaultConfig,
      ...config,
    };

    super(form, name, {...fieldConfig, hookNames: FIELD_HOOKS});

    this.label = fieldConfig.label;
    this.isOptional.value = fieldConfig.optional ?? false;
    this.isVisible.value = fieldConfig.visible ?? true;
    this.isDisabled.value = fieldConfig.disabled ?? false;

    this.ref = fieldConfig.ref;

    // this.click = (event: MouseEvent) => this.hooks.execute('click', this, event);
    this.focus = (event: FocusEvent) => this.hooks.execute('focus', this, event);

    watch(this.ref, async (value: RT, oldValue: RT) => {
      await this.hooks.execute('beforeUpdate', this, value, oldValue);
      // this.isDirty.value = true;
      // await this.validateAll();
      await this.hooks.execute('afterUpdate', this, value, oldValue);
    });
  };
}
