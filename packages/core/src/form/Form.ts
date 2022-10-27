import {AnyElementInstance, ComponentOrHtmlElement, FieldConfiguration, FieldName, FieldsToModel} from '../types';
import {ComputedRef, computed, markRaw, reactive} from 'vue';
import {FormConfiguration, FormHooks, FormInstance} from './Form.types';
import {HookManager, HookManagerInput, createHookManager} from '@myparcel/vue-form-builder-hook-manager';
import {InteractiveElement, InteractiveElementConfiguration, InteractiveElementInstance} from './interactive-element';
import {NamedElement, NamedElementConfiguration} from './named-element';
import {PlainElement} from './plain-element';
import {isOfType} from '@myparcel/vue-form-builder-utils';

export const FORM_HOOKS = ['beforeSubmit', 'afterSubmit', 'beforeValidate', 'afterValidate'] as const;

export class Form<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
  FC extends FormConfiguration = FormConfiguration,
  FN extends string = string,
> {
  public readonly name: FN;

  public readonly config: Omit<FC, 'fields'>;
  public readonly fields: AnyElementInstance<C, N, RT>[] = [];
  public readonly hooks: HookManager<HookManagerInput<typeof FORM_HOOKS, FormHooks>>;
  public readonly model = {} as FieldsToModel<C, N, RT>;

  /**
   * Filtered array of fields that have a name and a ref.
   */
  protected fieldsWithNamesAndRefs: ComputedRef<InteractiveElementInstance<C, N, RT>[]>;

  constructor(name: FN, formConfig: FC) {
    const {fields, ...config} = formConfig;

    formConfig.hookNames = [...FORM_HOOKS, ...(formConfig.hookNames ?? [])];

    this.name = name;
    this.config = config;

    // TODO: fix types
    this.hooks = createHookManager(formConfig as any) as any;

    const formInstance = this.createFormInstance();

    fields.forEach((field) => {
      const instance = this.createFieldInstance(field, formInstance);

      this.fields.push(instance);
    });

    // TODO: fix types
    this.fieldsWithNamesAndRefs = computed(() => {
      return this.fields.filter((field) => {
        return isOfType<InteractiveElementInstance<C, N, RT>>(field, 'ref');
      });
    }) as any;
  }

  public addField(newField: PlainElement, sibling: N, position: 'before' | 'after' = 'after'): void {
    const siblingIndex = this.fields.findIndex((field) => field.name === sibling);

    if (siblingIndex === -1) {
      // eslint-disable-next-line no-console
      console.error(`Field ${sibling} not found in form ${this.name}`);
      return;
    }

    const index = position === 'after' ? siblingIndex + 1 : siblingIndex;

    this.fields.splice(index, 0, this.createFieldInstance(newField, this.createFormInstance()));
  }

  public async submit() {
    await this.hooks.execute('beforeSubmit', this);
    await this.validate();
    await this.hooks.execute('afterSubmit', this);
  }

  /**
   * Validate all fields.
   *
   * @returns {Promise<void>}
   */
  public async validate() {
    await this.hooks.execute('beforeValidate', this);

    await Promise.all(
      this.fields.map((field) => {
        if (!isOfType<InteractiveElement<C, N, RT>>(field, 'isValid')) {
          return true;
        }

        if (field.isDirty.value) {
          field.isDirty.value = true;
        }

        return field.validate();
      }),
    );

    await this.hooks.execute('afterValidate', this);

    return this.isValid;
  }

  /**
   * Resets all fields to their initial values.
   */
  public async reset(): Promise<void> {
    await Promise.all(this.fieldsWithNamesAndRefs.value.map((field) => field.reset()));
  }

  /**
   * Whether all fields in the form are valid.
   */
  public get isValid(): boolean {
    return this.fieldsWithNamesAndRefs.value.every((field) => field.isValid);
  }

  private createFieldInstance(
    field: FieldConfiguration<C, N, RT> | FieldConfiguration,
    form: FormInstance<FC, C, N, RT> & {fields: undefined},
  ): InteractiveElementInstance<C, N, RT> {
    let instance;

    if (isOfType<NamedElementConfiguration<C, N> | InteractiveElementConfiguration<C, N, RT>>(field, 'name')) {
      if (field.ref) {
        instance = new InteractiveElement<C, N, RT>(form, field.name, field);
      } else {
        instance = new NamedElement<C, N>(form, field.name, field);
      }
    } else {
      // TODO: fix types
      instance = new PlainElement<C>(form, field as any);
    }

    const reactiveInstance = reactive(instance);

    if (typeof reactiveInstance.component !== 'string') {
      markRaw(reactiveInstance.component);
    }

    if (isOfType<NamedElementConfiguration<C, N> | InteractiveElementConfiguration<C, N, RT>>(field, 'name')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.model[field.name] = reactiveInstance;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return reactiveInstance;
  }

  private createFormInstance(): FormInstance<FC, C, N, RT> & {fields: undefined} {
    return {...this, fields: undefined};
  }
}
