import {ComponentOrHtmlElement, FieldName} from '../../types';
import {FormInstance} from '../Form.types';
import {HookManagerInput} from '@myparcel/vue-form-builder-hook-manager';
import {NamedElementConfiguration} from './NamedElement.types';
import {PlainElement} from '../plain-element';

export class NamedElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> extends PlainElement<C> {
  public readonly name: N;

  constructor(form: FormInstance, name: N, config: NamedElementConfiguration<C, N> & HookManagerInput<any, any>) {
    super(form, config);

    this.name = name;
  }
}
