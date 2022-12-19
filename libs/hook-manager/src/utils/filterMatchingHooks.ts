import {ReadonlyOr} from '@myparcel/ts-utils';

const upperFirst = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const filterMatchingHooks = (hooks: ReadonlyOr<string[]>, key: string): boolean => {
  const matches = [key];

  if (key.startsWith('before')) {
    const baseHook = key.replace(/^before/, '').toLowerCase();
    matches.push(baseHook);
    matches.push(`after${upperFirst(baseHook)}`);
  }

  if (key.startsWith('after')) {
    const baseHook = key.replace(/^after/, '').toLowerCase();
    matches.push(baseHook);
    matches.push(`before${upperFirst(baseHook)}`);
  }

  return matches.some((match) => hooks.includes(match));
};
