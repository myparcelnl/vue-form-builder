import {ComponentOrHtmlElement, PlainElement} from '../plain-element';
import {FieldName, FieldWithName} from '../../types';
import {Form} from '../Form';

export class NamedElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> extends PlainElement<C> {
  public readonly name: N;

  constructor(form: Form, name: N, config: FieldWithName<N, C>) {
    super(form, config);

    this.name = name;
  }
}
