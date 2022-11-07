import {beforeEach, describe, expect, it, vi} from 'vitest';
import {HookManager} from '@myparcel-vfb/hook-manager';
import {createHookManager} from '../createHookManager';

const HOOKS = ['start', 'sanitize'] as const;

type Configuration<I> = {
  beforeStart: (instance: I) => void;
  start: (instance: I, value: string) => void;
  afterStart: (instance: I, value: string) => void;
  sanitize: (instance: I, value: string) => string;
};

// eslint-disable-next-line no-invalid-this
class Throwaway {
  public hooks: HookManager<typeof HOOKS[number], Configuration<Throwaway>>;

  public constructor(config: Partial<Configuration<Throwaway>>) {
    // TODO: fix types
    this.hooks = createHookManager({...config, hookNames: HOOKS});
  }

  public async start() {
    await this.hooks.execute('beforeStart', this);
    await this.hooks.execute('start', this, 'value1');
    await this.hooks.execute('afterStart', this, 'value2');
  }
}

const DEFAULT_CONFIG = {
  start: vi.fn(),
  afterStart: vi.fn(),
  sanitize: vi.fn(),
  notAHook: vi.fn(),
};

describe('Hookable', () => {
  beforeEach(() => {
    Object.values(DEFAULT_CONFIG).forEach((fn) => fn.mockClear());
  });

  it('registers hooks', () => {
    const instance = new Throwaway(DEFAULT_CONFIG);

    expect(instance.hooks.registeredHooks).toHaveLength(3);
    expect(instance.hooks.registeredHooks.map((hook) => hook.name)).toEqual(['start', 'afterStart', 'sanitize']);
  });

  it('executes hooks', async () => {
    expect.assertions(3);
    const instance = new Throwaway(DEFAULT_CONFIG);

    await instance.start();

    expect(DEFAULT_CONFIG.start).toBeCalledTimes(1);
    expect(DEFAULT_CONFIG.afterStart).toHaveBeenCalledTimes(1);
    expect(DEFAULT_CONFIG.sanitize).toBeCalledTimes(0);
  });
});
