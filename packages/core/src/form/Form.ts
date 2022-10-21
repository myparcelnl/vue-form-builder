import {ComponentOrHtmlElement, PlainElement} from './plain-element';
import {Field, FieldInstance} from './field';
import {FieldIdentifier, FieldOrElement, NamedElementOrField} from '../types';
import {PromiseOr, isOfType} from '@myparcel/vue-form-builder-utils';
import {UnwrapNestedRefs, markRaw, reactive} from 'vue';
import {ComponentLifecycleHooks} from '../services/hook-manager/componentHooks';
import {HookManager} from '../services';
import {NamedElement} from './named-element';

export const FORM_HOOKS = ['beforeSubmit', 'afterSubmit', 'beforeValidate', 'afterValidate'] as const;

export type FormConfiguration<F extends FieldOrElement[] = FieldOrElement[]> = {
  /**
   * Fields in the form.
   */
  fields: F;

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

export type FormInstance<
  FC extends FormConfiguration = FormConfiguration,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldIdentifier = FieldIdentifier,
  RT = unknown,
> = Form<C, N, RT, any, FC>;

type FormHooks<I extends Form> = {
  [k in typeof FORM_HOOKS[number]]: (form: I) => PromiseOr<void>;
} & ComponentLifecycleHooks<I>;

// type FieldsToModel<T extends FormConfiguration, I extends number = number> = {
//   [K in T['fields'][I] as K['name'] extends string ? K['name'] : never]: K extends {ref: Ref}
//     ? Omit<K, 'ref'> & {ref: UnwrapRef<K['ref']>}
//     : K;
// };

export type FieldsToModel<
  FC extends FormConfiguration,
  // C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  // N extends NonNullable<FieldIdentifier> = NonNullable<FieldIdentifier>,
  // RT = unknown,
> = {
  [K in FC['fields'][number] as K['id'] extends string ? K['id'] : never]: UnwrapNestedRefs<K>;
};

export class Form<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldIdentifier = FieldIdentifier,
  RT = unknown,
  FN extends string = string,
  FC extends FormConfiguration = FormConfiguration,
> {
  public readonly config: Omit<FC, 'fields'>;
  public readonly fields: UnwrapNestedRefs<FieldInstance<C, N, RT>>[] = [];
  // eslint-disable-next-line no-invalid-this
  public readonly hooks: HookManager<FormHooks<Form>>;
  public readonly model = {} as FieldsToModel<FC>;
  public readonly name: FN;

  constructor(name: FN, formConfig: FC) {
    const {fields, ...config} = formConfig;

    this.hooks = new HookManager<FormHooks<Form>>({...formConfig, hookNames: FORM_HOOKS});
    this.name = name;
    this.config = config;

    const formInstance = this.createFormInstance();

    fields.forEach((field) => {
      const instance = this.createFieldInstance(field, formInstance);

      this.fields.push(instance);
    });
  }

  public addField(newField: PlainElement, sibling: N, position: 'before' | 'after' = 'after'): void {
    const siblingIndex = this.fields.findIndex((field) => field.id === sibling);

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

  private createFieldInstance(
    field: FieldOrElement<C, N, RT>,
    form: Form<C, N, RT, FN> & {fields: undefined},
  ): UnwrapNestedRefs<FieldInstance<C, N, RT>> {
    let instance;

    if (isOfType<NamedElementOrField<C, N, RT>>(field, 'id')) {
      if (field.ref) {
        instance = new Field<C, N, RT>(form, field.id, field);
      } else {
        instance = new NamedElement<C, N>(form, field.id, field);
      }
    } else {
      instance = new PlainElement<C>(form, field);
    }

    const reactiveInstance = reactive(instance);

    if (typeof reactiveInstance.component !== 'string') {
      markRaw(reactiveInstance.component);
    }

    if (isOfType<NamedElementOrField<C, N, RT>>(field, 'id')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.model[field.id] = reactiveInstance;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return reactiveInstance;
  }

  private createFormInstance(): Form<C, N, RT, FN> & {fields: undefined} {
    return {...this, fields: undefined};
  }
}
