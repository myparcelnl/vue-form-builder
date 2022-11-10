import {AnyElementConfiguration, AnyElementInstance, ComponentOrHtmlElement, FieldsToModel} from '../types';
import {ComputedRef, Ref, computed, markRaw, ref} from 'vue';
import {FormConfiguration, FormHooks, FormInstance} from './Form.types';
import {HookManager, createHookManager} from '@myparcel-vfb/hook-manager';
import {InteractiveElement, InteractiveElementConfiguration, InteractiveElementInstance} from './interactive-element';
import {PlainElement, PlainElementConfiguration} from './plain-element';
import {isOfType} from '@myparcel/ts-utils';

export const FORM_HOOKS = ['beforeSubmit', 'afterSubmit', 'beforeValidate', 'afterValidate'] as const;

export class Form<FC extends FormConfiguration = FormConfiguration, FN extends string = string> {
  public readonly name: FN;

  public readonly config: Omit<FC, 'fields'>;
  public readonly fields: AnyElementInstance[] = [];
  public readonly hooks: HookManager<typeof FORM_HOOKS[number], FormHooks>;
  public readonly model = {} as FieldsToModel;

  /**
   * Whether all fields in the form are valid.
   */
  public isValid: Ref<boolean> = ref(true);

  /**
   * Filtered array of fields that have a name and a ref.
   */
  protected fieldsWithNamesAndRefs: ComputedRef<InteractiveElementInstance[]>;

  public constructor(name: FN, formConfig: FC) {
    const {fields, ...config} = formConfig;

    formConfig.hookNames = [...FORM_HOOKS, ...(formConfig.hookNames ?? [])];

    this.name = name;
    this.config = config;

    // TODO: fix types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.hooks = createHookManager(formConfig as any);

    const formInstance = this.createFormInstance();

    fields.forEach((field) => {
      const instance = this.createFieldInstance(field, formInstance);

      this.fields.push(instance);
    });

    this.fieldsWithNamesAndRefs = computed(() => {
      return this.fields.filter((field) => {
        return isOfType<InteractiveElementInstance>(field, 'ref');
      });

      // TODO: fix types
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
  }

  public addElement(element: AnyElementConfiguration, sibling?: string, position: 'before' | 'after' = 'after'): void {
    const newIndex = sibling ? this.fields.findIndex((field) => field.name === sibling) : this.fields.length;

    if (newIndex === -1) {
      // eslint-disable-next-line no-console
      console.error(`Field ${sibling} not found in form ${this.name}`);
      return;
    }

    const index = position === 'after' ? newIndex + 1 : newIndex;

    this.fields.splice(index, 0, this.createFieldInstance(element, this.createFormInstance()));
  }

  public async submit(): Promise<void> {
    await this.hooks.execute('beforeSubmit', this);
    await this.validate();
    await this.hooks.execute('afterSubmit', this);
  }

  /**
   * Validate all fields.
   *
   * @returns {Promise<void>}
   */
  public async validate(): Promise<boolean> {
    await this.hooks.execute('beforeValidate', this);
    const res = await Promise.all(
      this.fields.map(async (field) => {
        if (!isOfType<InteractiveElement>(field, 'isValid')) {
          return true;
        }

        return field.validate();
      }),
    );
    this.isValid.value = res.every(Boolean);
    await this.hooks.execute('afterValidate', this);
    return this.isValid.value;
  }

  public async reset(): Promise<void> {
    await Promise.all(this.fieldsWithNamesAndRefs.value.map((field) => field.reset()));
  }

  private createFieldInstance(
    field: AnyElementConfiguration,
    form: FormInstance<FC> & {fields: undefined},
  ): AnyElementInstance {
    let instance;

    if (isOfType<InteractiveElementConfiguration<ComponentOrHtmlElement, string>>(field, 'ref')) {
      instance = new InteractiveElement<ComponentOrHtmlElement, string>(form, field.name, field);
    } else {
      instance = new PlainElement(form, field);
    }

    if (typeof instance.component !== 'string') {
      markRaw(instance.component);
    }

    if (isOfType<PlainElementConfiguration<ComponentOrHtmlElement, string>>(field, 'name')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.model[field.name] = instance;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    return instance;
  }

  private createFormInstance(): FormInstance<FC> & {fields: undefined} {
    return {...this, fields: undefined};
  }
}
