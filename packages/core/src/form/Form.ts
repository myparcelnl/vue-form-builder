import {ComponentOrHtmlElement, PlainElement} from './plain-element';
import {Field, FieldInstance} from './field';
import {FieldName, FieldOrElement, FieldWithNameAndRef} from '../types';
import {HookManager, InputHookConfiguration} from '../services';
import {PromiseOr, isOfType} from '@myparcel/vue-form-builder-shared';
import {Ref, UnwrapNestedRefs, UnwrapRef, reactive} from 'vue';
import {ComponentLifecycleHooks} from '../services/hook-manager/componentHooks';
import {NamedElement} from './named-element';

export const FORM_HOOKS = ['beforeSubmit', 'afterSubmit'] as const;

export type FormConfiguration<N extends FieldName = FieldName> = {
  /**
   * Fields in the form.
   */
  fields: FieldOrElement[];

  /**
   * Function executed when any label is rendered.
   */
  renderLabel?: (input: string) => string;

  /**
   * Classes that are applied to each field.
   */
  fieldClass?: string | string[] | Record<string, string>;

  /**
   * Classes that are applied to the form.
   */
  formClass?: string | string[] | Record<string, string>;
} & Partial<FormHooks<Form>>;

export type FormInstance<FC extends FormConfiguration = FormConfiguration> = Omit<
  Form<ComponentOrHtmlElement, FieldName, any, string, FC>,
  'fields'
>;

type FormHooks<I> = {
  [k in typeof FORM_HOOKS[number]]: (form: I) => PromiseOr<void>;
} & ComponentLifecycleHooks<I>;

type FieldsToModel<T extends FormConfiguration> = {
  [K in T['fields'][number] as K['name'] extends string ? K['name'] : never]: K extends {ref: Ref}
    ? Omit<K, 'ref'> & {ref: UnwrapRef<K['ref']>}
    : K;
};

export class Form<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
  FN extends string = string,
  FC extends FormConfiguration<N> = FormConfiguration<N>,
  // eslint-disable-next-line no-invalid-this
  HC extends InputHookConfiguration = FormHooks<typeof this>,
> {
  public readonly name: FN;
  public readonly config: Omit<FC & HC, 'fields'>;
  public readonly fields: UnwrapNestedRefs<FieldInstance<C, N, RT>>[] = [];
  public readonly hooks: HookManager<HC>;
  public readonly model = {} as N extends string ? FieldsToModel<FC> : never;

  constructor(name: FN, formConfig: FC & HC) {
    const {fields, ...config} = formConfig;

    this.hooks = new HookManager<HC>({...formConfig, hookNames: FORM_HOOKS});
    this.name = name;
    this.config = config;

    const formInstance = this.createFormInstance();

    fields.forEach((field) => {
      const instance = this.createFieldInstance(field, formInstance);

      this.fields.push(reactive(instance));
    });
  }

  private createFormInstance(): Form<C, N, RT, FN, FC, HC> & {fields: undefined} {
    return {...this, fields: undefined};
  }

  private createFieldInstance(
    field: FieldOrElement,
    form: Form<C, N, RT, FN, FC, HC> & {fields: undefined},
  ): FieldInstance<C, N, RT> {
    let instance;

    if (isOfType<FieldOrElement<C, NonNullable<N>, RT>>(field, 'name')) {
      const name = field.name as string as NonNullable<N>;

      if (isOfType<FieldWithNameAndRef>(field, 'ref')) {
        instance = new Field<C, N, RT>(form, name, field);
      } else {
        instance = new NamedElement<C, N>(form, name, field);
      }

      this.model[name] = reactive(instance);
      return instance;
    }

    return new PlainElement<C>(form, field);
  }

  public addField(newField: FieldOrElement, sibling: N, position: 'before' | 'after' = 'after'): void {
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
    console.log('submit form', this.name);
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
        if (!isOfType<Field<C, N, RT>>(field, 'validateAll')) {
          return true;
        }

        return field.validateAll();
      }),
    );

    await this.hooks.execute('afterValidate', this);
  }
}
