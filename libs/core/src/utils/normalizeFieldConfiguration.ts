import {type FieldConfiguration, type ComponentProps, type FormInstance} from '../types';

type PropsWithDefault = 'visible' | 'wrapper' | 'optional' | 'lazy' | 'disabled' | 'readOnly';

export type MakeRequired<Type, Keys extends keyof Type> = Omit<Type, Keys> & Required<Pick<Type, Keys>>;

export type NormalizedFieldConfiguration<Type, Props extends ComponentProps> = MakeRequired<
  FieldConfiguration<Type, Props>,
  PropsWithDefault
>;

/**
 * Normalize an input field configuration with default values, optionally from a form configuration.
 */
export const normalizeFieldConfiguration = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  input: FieldConfiguration<Type, Props>,
  form?: FormInstance,
): NormalizedFieldConfiguration<Type, Props> => {
  return {
    disabled: false,
    lazy: false,
    optional: false,
    readOnly: false,
    visible: true,
    wrapper: true,
    ...form?.config.fieldDefaults,
    ...input,
  } satisfies NormalizedFieldConfiguration<Type, Props>;
};
