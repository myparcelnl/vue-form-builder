import {Component, ComponentOptions, EmitsOptions, HTMLAttributes, Ref, UnwrapRef, ref} from 'vue';
import {ComponentProps, MakeOptional} from '@myparcel/vue-form-builder-shared/src/utils';
import {FieldName, FieldOrElement} from '@myparcel/vue-form-builder/src/types';
import {ComponentOrHtmlElement} from '@myparcel/vue-form-builder/src/form';
import {PromiseOr} from '@myparcel/vue-form-builder-shared';
import TTextInput from './components/template/TTextInput.vue';
import TSelect from './components/template/TSelect.vue';

type FieldsToModel<T extends {fields: NewFieldObj[]}> = {
  [K in T['fields'][number] as K['name'] extends string ? K['name'] : never]: K extends {ref: Ref<infer RT>}
    ? Omit<K, 'ref'> & {ref: RT}
    : K;
};
// type FieldsToModel<T extends {fields: FieldOrElement[]}> = {
//   [K in T['fields'][number] as K['name'] extends string ? K['name'] : never]: K extends {ref: Ref}
//     ? Omit<K, 'ref'> & {ref: UnwrapRef<K['ref']>}
//     : K;
// };

type ElementsList = FieldOrElement[];
type FormConfig = {
  fields: ElementsList;
};

declare function defineForm<O extends NewFieldObj = NewFieldObj, C extends {fields: O[]} = {fields: O[]}>(
  config: C,
): {model: FieldsToModel<C>};

type B = FieldsToModel<{fields: [{name: 'test'; component: typeof TTextInput; ref: Ref<'boo'>}]}>;

const bbbbb: B = {test: {name: 'test', component: TTextInput, ref: 'boo'}};

// type Umm = {name?: string; ref?: Ref; sanitize?: (field: unknown, value: unknown) => PromiseOr<unknown>};

interface Base<C extends ComponentOrHtmlElement> {
  component: C;
  props?: C extends Component ? FilteredComponentProps<C> : never;
}

interface Named<C extends ComponentOrHtmlElement, N extends FieldName> extends Base<C> {
  name: N;
}

type OneOrMore<T> = T | T[];

interface Reffed<C extends ComponentOrHtmlElement, N extends FieldName, RT = any> extends Named<C, N> {
  ref: Ref<RT>;

  sanitize?: (value: RT) => PromiseOr<RT>;
  validate?: (value: RT) => PromiseOr<boolean>;
}

type NoInfer<T> = [T][T extends any ? 0 : 1];

type Obj<C extends ComponentOrHtmlElement = ComponentOrHtmlElement, N extends FieldName = FieldName, RT = any> =
  | Base<C>
  | Named<C, N>
  | Reffed<C, N, RT>;

const aa: Obj = {
  component: 'input',
  name: 'foo',
  ref: ref('bar'),
  sanitize: (value) => value,
  validate: (value) => value.length > 0,
};

// type BB = {

//   component: 'input';
//   name: 'foo';
//   ref: Ref<'bar'>;
//   sanitize: (value: string) => string;
//   validate: (value: string) => boolean;
// } extends {ref: Ref<infer RT>}
//   ? RT
//   : never;
// const b: BB = 'bar';

const bb = defineObj({
  component: 'input',
  name: 'foo',
  props: {},
  ref: ref('bar'),
  sanitize: (value) => value,
  validate: (value) => value.length > 0,
});

type FieldChecc<
  R extends Obj,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = string,
> = (Base<C> | Named<C, N>) &
  (R extends {ref: Ref<infer RT>}
    ? {
        ref: Ref<RT>;
        sanitize?: (value: RT) => PromiseOr<RT>;
        validate?: (value: RT) => PromiseOr<boolean>;
      }
    : never);

type GetRefType<T extends {ref?: Ref}> = T extends {ref: Ref<infer RT>} ? RT : never;

declare function defineObj<O extends Obj>(obj: FieldChecc<O>[]): FieldChecc<O>;

// declare function defineA<C extends Obj>(conf: C[]): C;

const boo = defineObj([
  {
    name: 'borp',
    component: 'input',
    ref: ref('strink'),
    sanitize: (value) => value.trim(),
    validate: (value) => value.length,
  },
  {
    name: 'borp2',
    component: TTextInput,
    props: {},
    ref: ref(124),
    sanitize: (value) => value.toFixed(2),
    validate: (value) => value.length,
  },
]);

declare function defineSingleObj<C extends ComponentOrHtmlElement, N extends FieldName, RT>(
  obj: Base<C> | Named<C, N> | Reffed<C, N, RT>,
): Obj<C, N, RT>;

declare function defineSingleObj2<C extends ComponentOrHtmlElement, N extends FieldName, RT>(
  field: NewFieldObj<C, N, RT>,
): NewFieldObj<C, N, RT>;

type FilteredComponentProps<C extends Component> = Exclude<
  Omit<MakeOptional<ComponentProps<C>, 'label'>, 'name' | 'id' | 'modelValue'>,
  EmitsOptions
>;

type A<C extends Component> = C extends abstract new (...args: any) => any ? InstanceType<C> : C;

const b: A<typeof TTextInput> = {
  $props: {
    onChange: () => {},
  },
};

const obj = defineSingleObj({
  name: 'borp2',
  component: TSelect,
  props: {
    onClick: () => {},
  },
  ref: ref(124),
  sanitize: (value) => Math.ceil(value),
  validate: (value) => value > 0,
});

type FieldHooks<C extends ComponentOrHtmlElement, N extends FieldName, RT = never> = {
  sanitize?: (instance: NewFieldObj<C, N, RT>, value: RT) => PromiseOr<RT>;
  validate?: (instance: NewFieldObj<C, N, RT>, value: RT) => PromiseOr<boolean>;
};

type NewFieldObj<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = any,
> = {
  component: C;
  name?: N | never;
  ref?: N extends string ? Ref<RT> : never;
  attrs?: HTMLAttributes;
  props?: C extends Component ? FilteredComponentProps<C> : never;
} & (RT extends string | number | boolean | symbol
  ? {
      name: string;
    } & FieldHooks<C, N, RT>
  : object);

type FormInstancccc<T extends NewFieldObj = NewFieldObj> = {
  model: FieldsToModel<{fields: T[]}>;
};

declare function defineMultiObj<T extends NewFieldObj = NewFieldObj>(obj: T[]): FormInstancccc<T>;

// todo: PROBEER HET MET EEN ARRAY??

const obj2 = defineSingleObj2({
  name: 'borp2',
  component: TTextInput,
  props: {disabled: true},
  attrs: {},
  ref: ref(124),

  sanitize: (_, value) => Math.ceil(value),
  validate: (_, value) => value > 0,
});

const obj3 = defineMultiObj([
  {
    name: 'borp2',
    component: 'TSelect',
    attrs: {},
    ref: ref(124),
    sanitize: (_, value) => Math.ceil(value),
    validate: (_, value) => value > 0,
  },
  {
    name: 'borp3',
    component: 'TSelect',
    ref: ref('124'),
    sanitize: (_, value) => value.trim(),
    validate: (_, value) => value.length > 0,
  },
  {
    component: TTextInput,
    props: {},
  },
]);

const form = defineMultiObj([
  defineSingleObj2({
    name: 'borp2',
    component: 'TSelect',
    attrs: {},
    ref: ref(124),
    sanitize: (_, value) => Math.ceil(value),
    validate: (_, value) => value > 0,
  }),
  defineSingleObj2({
    name: 'borp3',
    component: 'TSelect',
    ref: ref('124'),
    sanitize: (_, value) => value.trim(),
    validate: (_, value) => value.length > 0,
  }),
  // defineSingleObj2({
  //   component: TTextInput,
  //   props: {},
  // }),
]);

form.model;

const onlyComponent = defineSingleObj2({
  component: TSelect,
  // name: 'borp2',

  // extraProp: {},
});

const named = defineSingleObj2({
  component: TSelect,
  name: 'borp2',
});
