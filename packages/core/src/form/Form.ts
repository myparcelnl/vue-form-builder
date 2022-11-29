import {AnyElementConfiguration, AnyElementInstance, ComponentOrHtmlElement} from '../types';
import {ComputedRef, UnwrapNestedRefs, computed, markRaw, reactive, ref} from 'vue';
import {FormConfiguration, FormHooks, FormInstance} from './Form.types';
import {InteractiveElement, InteractiveElementConfiguration, InteractiveElementInstance} from './interactive-element';
import {PlainElement, PlainElementConfiguration, PlainElementInstance} from './plain-element';
import {createHookManager} from '@myparcel-vfb/hook-manager';
import {isOfType} from '@myparcel/ts-utils';

export const FORM_HOOKS = ['beforeSubmit', 'afterSubmit', 'beforeValidate', 'afterValidate'] as const;

export class Form<FC extends FormConfiguration = FormConfiguration, FN extends string = string> {
  public readonly name: FN;

  public readonly config: Omit<FC, 'fields'>;
  public readonly fields: FormInstance<FC>['fields'] = ref([]);
  public readonly hooks: FormInstance<FC>['hooks'];
  public readonly model = {} as FormInstance<FC>['model'];

  /**
   * Whether all fields in the form are valid.
   */
  public isValid: FormInstance<FC>['isValid'] = ref(true);

  /**
   * Filtered array of fields that have a name and a ref.
   */
  protected fieldsWithNamesAndRefs: ComputedRef<InteractiveElementInstance<ComponentOrHtmlElement, string>[]>;

  public constructor(name: FN, formConfig: FC & FormHooks) {
    const {fields, ...config} = formConfig;

    formConfig.hookNames = [...FORM_HOOKS, ...(formConfig.hookNames ?? [])];
    this.hooks = createHookManager(formConfig);

    this.name = name;
    this.config = config;

    fields.forEach((field) => {
      const instance = this.createFieldInstance(field, this);

      this.fields.value.push(instance);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.fieldsWithNamesAndRefs = computed(() => {
      return this.fields.value.filter((field) => {
        return isOfType<InteractiveElementInstance>(field, 'ref');
      });
    });
  }

  public addElement(element: AnyElementConfiguration, sibling?: string, position: 'before' | 'after' = 'after'): void {
    const newIndex = sibling
      ? this.fields.value.findIndex((field) => field.name === sibling)
      : this.fields.value.length;

    if (newIndex === -1) {
      // eslint-disable-next-line no-console
      console.error(`Field ${sibling} not found in form ${this.name}`);
      return;
    }

    const index = position === 'after' ? newIndex + 1 : newIndex;

    const newElement = this.createFieldInstance(element, this);
    this.fields.value.splice(index, 0, newElement);
  }

  public removeElement(name: string): void {
    const index = this.fields.value.findIndex((field) => field.name === name);
    this.fields.value.splice(index, 1);
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
      this.fields.value.map(async (field) => {
        if (!isOfType<InteractiveElement>(field, 'isValid')) {
          field.resetValidation();
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
    form: FormInstance,
  ): UnwrapNestedRefs<AnyElementInstance> {
    let instance: InteractiveElementInstance | PlainElementInstance;

    if (isOfType<InteractiveElementConfiguration<ComponentOrHtmlElement, string>>(field, 'ref')) {
      instance = new InteractiveElement<ComponentOrHtmlElement, string>(form, field.name, field);
    } else {
      instance = new PlainElement(form, field as PlainElementConfiguration);
    }

    if (typeof instance.component !== 'string') {
      markRaw(instance.component);
    }

    const reactiveInstance = reactive(instance);

    if (isOfType<PlainElementConfiguration<ComponentOrHtmlElement, string>>(field, 'name')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.model[field.name] = reactiveInstance;
    }

    return reactiveInstance;
  }

  private createFormInstance(): FormInstance<FC> & {fields: undefined} {
    return {...this, fields: undefined};
  }
}
