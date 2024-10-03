import {type Validator} from '../../types/validator.types';

export const firstNameNotDuane = (): Validator<string> => ({
  validate: (_, value) => !String(value).startsWith('Duane'),
  errorMessage: 'Duane, we told you to never come back here.',
});

export const canNotContainX = (): Validator<string> => ({
  validate: (_, value) => !String(value).includes('x'),
  errorMessage: 'The letter "x" is too negative and is not allowed.',
});
