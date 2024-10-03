import {type VueWrapper, config} from '@vue/test-utils';
import {type RequireOnly} from '@myparcel/ts-utils';

const resolveSelector = (input: string | Record<string, string>): string => {
  if (typeof input === 'string') {
    input = {id: input};
  }

  let selector = '';

  Object.entries(input).forEach(([key, value]) => {
    selector += `[data-test-${key}="${value}"]`;
  });

  return selector;
};

type PluginObject = RequireOnly<VueWrapper, 'findByTest' | 'findAllByTest'>;

const dataTestPlugin = (wrapper: VueWrapper): PluginObject => {
  return {
    findByTest: (input) => wrapper.find(resolveSelector(input)),
    findAllByTest: (input) => wrapper.findAll(resolveSelector(input)),
  };
};

config.plugins.VueWrapper.install(dataTestPlugin);
