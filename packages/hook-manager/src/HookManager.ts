import {CustomHookItem, HookManagerConfiguration, HookNames} from './types';
import {ResolvePromise} from '@myparcel-vfb/utils';
import {filterMatchingHooks} from './utils/filterMatchingHooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetParameters<T> = T extends (...args: any[]) => any ? Parameters<T> : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetReturnType<T> = ResolvePromise<T extends (...args: any[]) => any ? ReturnType<T> : never>;

export class HookManager<
  HN extends string = string,
  HC extends HookManagerConfiguration<HN> = HookManagerConfiguration<HN>,
> {
  public availableHooks: HookNames<HN>;

  public registeredHooks: CustomHookItem<HN | string>[] = [];
  public constructor(config: HC) {
    this.availableHooks = config.hookNames ?? [];

    Object.keys(config)
      .filter((key) => filterMatchingHooks(this.availableHooks, key))
      .forEach((key) => {
        this.register(key as HN, config[key] as HC[HN]);
      });
  }

  public async execute<N extends HN | string>(name: N, ...args: GetParameters<HC[N]>): Promise<GetReturnType<HC[N]>> {
    if (this.has(name) && import.meta.env.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.info(`%c@${name}`, 'color: yellow', ...args);
    }

    const returnValue = await Promise.all(
      this.registeredHooks.filter((hook) => hook.name === name).map((hook) => hook.callback(...args)),
    );

    return returnValue[returnValue.length - 1];
  }

  public has(name: HN | string): boolean {
    return this.registeredHooks.some((hook) => hook.name === name);
  }

  public register(name: HN | string, callback: HC[HN]): void {
    if (!callback) {
      return;
    }

    // TODO: fix types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.registeredHooks.push({name, callback: callback as any});
  }
}
