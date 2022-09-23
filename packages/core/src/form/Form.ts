import {ComponentOrHtmlElement, PlainElement} from './plain-element';
import {Field, FieldInstance} from './field';
import {FieldName, FieldOrElement, FieldWithNameAndRef} from '../types';
import {HookManager, InputHookConfiguration} from '../services';
import {PromiseOr, isOfType} from '@myparcel/vue-form-builder-shared';
import {Ref, UnwrapRef, reactive} from 'vue';
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
  Form<FieldName, any, ComponentOrHtmlElement, string, FC>,
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
  N extends FieldName = FieldName,
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  FN extends string = string,
  FC extends FormConfiguration<N> = FormConfiguration<N>,
  // eslint-disable-next-line no-invalid-this
  HC extends InputHookConfiguration = FormHooks<typeof this>,
> {
  public readonly name: FN;
  public readonly config: Omit<FC & HC, 'fields'>;
  public readonly fields: FieldInstance<N, RT, C>[] = [];
  public readonly hooks: HookManager<HC>;
  public readonly model = {} as N extends string ? FieldsToModel<FC> : never;

  constructor(name: FN, formConfig: FC & HC) {
    const {fields, ...config} = formConfig;

    this.hooks = new HookManager<HC>({...formConfig, hookNames: FORM_HOOKS});
    this.name = name;
    this.config = config;

    const formWithoutFields = {...this, fields: undefined};

    fields.forEach((field) => {
      let instance: FieldInstance<N, RT, C>;

      if (isOfType<FieldOrElement<NonNullable<N>, C, RT>>(field, 'name')) {
        const name = field.name as string as NonNullable<N>;

        if (isOfType<FieldWithNameAndRef>(field, 'ref')) {
          instance = new Field<N, RT, C>(formWithoutFields, name, field);
        } else {
          instance = new NamedElement<N, C>(formWithoutFields, name, field);
        }

        this.model[name] = reactive(instance);
      } else {
        instance = new PlainElement<C>(formWithoutFields, field);
      }

      this.fields.push(reactive(instance));
    });
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
        if (!isOfType<Field<N, RT, C>>(field, 'validateAll')) {
          return true;
        }

        return field.validateAll();
      }),
    );

    await this.hooks.execute('afterValidate', this);
  }
}
