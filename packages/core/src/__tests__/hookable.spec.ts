import {beforeEach, describe, expect, it, vi} from 'vitest';
import {HookManager} from '../services';

const HOOKS = ['start', 'sanitize'] as const;

type Configuration<I> = {
  beforeStart: (instance: I) => void;
  start: (instance: I, value: string) => void;
  afterStart: (instance: I, value: string) => void;
  sanitize: (instance: I, value: string) => string;
};

// eslint-disable-next-line no-invalid-this
class Throwaway<HC extends Configuration<typeof this>> {
  public hooks: HookManager<HC>;

  constructor(config: Partial<HC>) {
    this.hooks = new HookManager<HC>({...config, hookNames: HOOKS});
  }

  async start() {
    await this.hooks.execute('beforeStart', this);
    await this.hooks.execute('start', this);
    await this.hooks.execute('afterStart', this);
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

  it('registers registeredHooks', () => {
    const instance = new Throwaway(DEFAULT_CONFIG);

    expect(instance.hooks.registeredHooks).toHaveLength(3);
    expect(instance.hooks.registeredHooks.map((hook) => hook.name)).toEqual(['start', 'afterStart', 'sanitize']);
  });

  it('executes registeredHooks', async () => {
    expect.assertions(3);
    const instance = new Throwaway(DEFAULT_CONFIG);

    await instance.start();

    expect(DEFAULT_CONFIG.start).toBeCalledTimes(1);
    expect(DEFAULT_CONFIG.afterStart).toBeCalledTimes(1);
    expect(DEFAULT_CONFIG.sanitize).toBeCalledTimes(0);
  });
});
