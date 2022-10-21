import {ComponentOrHtmlElement, PlainElement} from '../plain-element';
import {ElementWithId, FieldIdentifier} from '../../types';
import {FormInstance} from '../Form';

export class NamedElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  I extends FieldIdentifier = FieldIdentifier,
> extends PlainElement<C> {
  public readonly id: I;

  constructor(form: FormInstance, id: I, config: ElementWithId<C, I>) {
    super(form, config);

    this.id = id;
  }
}
