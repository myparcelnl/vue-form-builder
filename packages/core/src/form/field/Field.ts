import {FieldName, FieldOrElement, FieldWithNameAndRef} from '../../types';
import {Form, FormInstance} from '../Form';
import {Ref, UnwrapRef, ref, watch} from 'vue';
import {ComponentLifecycleHooks} from '../../services/hook-manager/componentHooks';
import {ComponentOrHtmlElement} from '../plain-element';
import {HookManager} from '../../services';
import {NamedElement} from '../named-element';
import {RequireOnly} from '@myparcel/vue-form-builder-shared';

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

export type FieldInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = Omit<FieldOrElement<C, N, RT>, 'form'> & {
  hooks: HookManager<FieldHooks<FieldInstance, RT>>;
  form: FormInstance;

  ref: Ref<RT>;
  isDirty: UnwrapRef<boolean>;
  isDisabled: UnwrapRef<boolean>;
  isOptional: UnwrapRef<boolean>;
  isSuspended: UnwrapRef<boolean>;
  isTouched: UnwrapRef<boolean>;
  isValid: UnwrapRef<boolean>;
  isVisible: UnwrapRef<boolean>;

  lazy: boolean;
};

type Validator = {
  validator: (value: unknown) => boolean;
  errorMessage: string;
}

type FieldHooks<I, RT> = {
  beforeBlur: (field: I, value: RT) => void;
  afterBlur: (field: I, value: RT) => void;

  beforeFocus: (field: I, event: FocusEvent) => void;
  focus: (field: I, event: FocusEvent) => void;
  afterFocus: (field: I, event: FocusEvent) => void;

  beforeSanitize: (field: I, value: RT) => void;
  sanitize: (field: I, value: RT) => RT;
  afterSanitize: (field: I, value: RT) => void;

  beforeUpdate: (field: I, value: RT, oldValue: RT) => void;
  afterUpdate: (field: I, value: RT, oldValueT: RT) => void;

  beforeValidate: (field: I, value: RT) => void;
  validate: (field: I, value: RT) => boolean;
  validators: Validator[];
  afterValidate: (field: I, value: RT) => void;
} & ComponentLifecycleHooks<I>;

export class Field<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
  FC extends FieldWithNameAndRef<C, N, RT> = FieldWithNameAndRef<C, N, RT>,
> extends NamedElement<N, C> {
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

    // if (this.hooks.has('sanitize')) {
    this.ref.value = await this.hooks.execute('sanitize', this, this.ref.value);
    // }

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

    console.log('cached?', this.label, this.validationCache[cacheKey]);
    if (!this.validationCache[cacheKey]) {
      if (!this.isDirty.value) {
        return true;
      }

      await this.hooks.execute('beforeValidate', this, value);

      if (!this.isOptional.value && !value) {
        return false;
      }

      console.log(this.label, 'validate');

      const valid = await this.hooks.execute('validate', this, value);
      await this.hooks.execute('afterValidate', this, value, valid);

      this.validationCache[cacheKey] = valid;
    }

    return this.validationCache[cacheKey];
  };

  // protected declare readonly config: FieldDefinition<N, RT>;

  constructor(form: Form, name: N, config: FC & FieldHooks<typeof this, RT>) {
    let sanitize = config.sanitize || ((_, value) => value);
    let validate;
    if (config.validate) {
      validate = config.validate;
    } else if (config.validators) {
      validate = (field, value) => {
        config.validators.forEach((validator: Validator) => {
          if (!validator.validate(value)) {
            this.errors.value.push(validator.errorMessage);
          }
        });
        if (this.errors.value.length) {
          return false;
        }
        return true;
      }
    } else {
      validate = () => true;
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
