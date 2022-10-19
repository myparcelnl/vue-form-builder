import {FieldName, FieldOrElement} from '../../types';
import {ComponentOrHtmlElement} from '../plain-element';

export const defineField = <
  C extends ComponentOrHtmlElement,
  N extends FieldName,
  RT,
  FC extends FieldOrElement<C, N, RT>,
>(
  fieldConfig: FC,
): FC => fieldConfig;
