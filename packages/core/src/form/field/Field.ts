import {FieldIdentifier, FieldOrElement, FieldWithIdAndRef} from '../../types';
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
  'afterValidate',
] as const;

type BaseFieldInstance<RT = unknown> = {
  hooks: HookManager<FieldHooks<FieldInstance, RT>>;
  form: FormInstance;
};

export type FieldInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  I extends FieldIdentifier = FieldIdentifier,
  RT = unknown,
> = Omit<FieldOrElement<C, I, RT>, 'form'> & BaseFieldInstance<RT>;

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
  afterValidate: (field: I, value: RT, isValid: boolean) => void;
} & ComponentLifecycleHooks<I>;

export class Field<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  I extends FieldIdentifier = FieldIdentifier,
  RT = unknown,
  FC extends FieldWithIdAndRef<C, I, RT> = FieldWithIdAndRef<C, I, RT>,
> extends NamedElement<C, I> {
  public focus;

  public isDirty = ref(false);
  public isDisabled = ref(false);
  public isOptional = ref(false);
  public isSuspended = ref(false);
  public isTouched = ref(false);
  public isValid = ref(true);
  public isVisible = ref(true);
  public label?: string;
  public lazy = false;
  public ref: Ref<RT>;

  // eslint-disable-next-line no-invalid-this
  public declare hooks: HookManager<FieldHooks<typeof this, RT>>;

  private validationCache: Record<string, boolean> = {};

  public blur = async () => {
    await this.hooks.execute('beforeBlur', this, this.ref.value);
    this.isSuspended.value = true;

    if (this.hooks.has('sanitize')) {
      const sanitized = await this.hooks.execute('sanitize', this, this.ref.value);
      this.ref.value = sanitized ?? this.ref.value;
    }

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

  // protected declare readonly config: FieldDefinition<I, RT>;

  constructor(form: FormInstance, name: I, config: FC & FieldHooks<Field<C, I, RT>, RT>) {
    super(form, name, {...config, hookNames: FIELD_HOOKS});

    const fieldConfig = {
      ...this.getDefaultConfig(),
      ...config,
    };

    this.label = fieldConfig.label;

    this.isOptional.value = fieldConfig.optional ?? false;
    this.isVisible.value = fieldConfig.visible ?? true;

    this.ref = fieldConfig.ref;

    // this.click = (event: MouseEvent) => this.hooks.execute('click', this, event);
    this.focus = (event: FocusEvent) => this.hooks.execute('focus', this, event);

    watch(this.ref, async (value: RT, oldValue: RT) => {
      await this.hooks.execute('beforeUpdate', this, value, oldValue);
      this.isDirty.value = true;
      await this.validateAll();
      await this.hooks.execute('afterUpdate', this, value, oldValue);
    });
  }

  private getDefaultConfig(): Partial<FieldHooks<I, RT>> {
    return {
      sanitize: (_, value) => value,
      validate: () => true,
    };
  }
}
