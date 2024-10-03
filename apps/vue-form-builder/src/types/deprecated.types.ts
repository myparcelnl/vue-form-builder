// noinspection JSUnusedGlobalSymbols

import {
  type FieldInstance,
  type FieldHooks,
  type FieldConfiguration,
  type FieldName,
  type ComponentProps,
  type FieldSlots,
  type CreatedField,
  type ModularCreatedField,
} from './index';

/**  @deprecated use FieldName */
export type ElementName = FieldName;

/**  @deprecated use FieldSlots */
export type ElementSlots = FieldSlots;

/** @deprecated use FieldConfiguration */
export type BaseElementConfiguration<Props extends ComponentProps = ComponentProps> = FieldConfiguration<
  unknown,
  Props
>;

/** @deprecated use FieldConfiguration */
export type PlainElementConfiguration<
  Type = unknown,
  Props extends ComponentProps = ComponentProps,
> = FieldConfiguration<Type, Props>;

/** @deprecated use FieldConfiguration */
export type InteractiveElementConfiguration<
  Type = unknown,
  Props extends ComponentProps = ComponentProps,
> = FieldConfiguration<Type, Props>;

/** @deprecated use FieldConfiguration * */
export type AnyElementConfiguration<Type = unknown, Props extends ComponentProps = ComponentProps> = FieldConfiguration<
  Type,
  Props
>;

/** @deprecated use FieldConfiguration */
export type ResolvedElementConfiguration<
  Type = unknown,
  Props extends ComponentProps = ComponentProps,
> = FieldConfiguration<Type, Props>;

/** @deprecated use FieldHooks */
export type BaseElementHooks<I extends FieldInstance = FieldInstance> = FieldHooks<unknown, ComponentProps, I>;

/** @deprecated use FieldConfiguration */
export type PlainElementHooks<Type = unknown, Props extends ComponentProps = ComponentProps> = FieldHooks<Type, Props>;

/** @deprecated use FieldConfiguration */
export type InteractiveElementHooks<
  Type = unknown,
  Props extends ComponentProps = ComponentProps,
  I extends FieldInstance<Type, Props> = FieldInstance<Type, Props>,
> = FieldHooks<Type, Props, I>;

/** @deprecated use FieldInstance */
export type BaseFieldInstance<Props extends ComponentProps = ComponentProps> = FieldInstance<unknown, Props>;

/**  @deprecated use FieldInstance */
export type PlainElementInstance<Type = unknown, Props extends ComponentProps = ComponentProps> = FieldInstance<
  Type,
  Props
>;

/**  @deprecated use FieldInstance */
export type InteractiveElementInstance<Type = unknown, Props extends ComponentProps = ComponentProps> = FieldInstance<
  Type,
  Props
>;

/** @deprecated use FieldInstance * */
export type AnyElementInstance<Type = unknown, Props extends ComponentProps = ComponentProps> = FieldInstance<
  Type,
  Props
>;

/** @deprecated use CreatedField */
export type CreatedElement<Type = unknown, Props extends ComponentProps = ComponentProps> = CreatedField<Type, Props>;

/** @deprecated use ModularCreatedField */
export type ModularCreatedElement<Type = unknown, Props extends ComponentProps = ComponentProps> = ModularCreatedField<
  Type,
  Props
>;
