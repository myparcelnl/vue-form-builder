import {ComponentOrHtmlElement, PlainElement} from '../plain-element';
import {ElementWithName, FieldName} from '../../types';
import {FormInstance} from '../Form';

export class NamedElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> extends PlainElement<C> {
  public readonly name: N;

  constructor(form: FormInstance, name: N, config: ElementWithName<C, N>) {
    super(form, config);

    this.name = name;
  }
}
