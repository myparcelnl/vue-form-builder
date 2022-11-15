import {CustomHookItem, HookCallback, HookManagerConfiguration} from './types';
import {ReadonlyOr, ResolvePromise} from '@myparcel/ts-utils';
import {filterMatchingHooks} from './utils/filterMatchingHooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetParameters<T> = T extends (...args: any[]) => any ? Parameters<T> : any[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetReturnType<T> = ResolvePromise<T extends (...args: any[]) => any ? ReturnType<T> : Promise<any>>;

export type HookManagerInstance<
  HC extends HookManagerConfiguration = HookManagerConfiguration,
  HN extends string = string,
> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute<N extends HN>(name: N, ...args: any[]): Promise<GetReturnType<HC[N]>>;

  getAvailableHooks(): ReadonlyOr<HN[]>;

  getRegisteredHooks(): CustomHookItem[];

  has(name: HN): boolean;

  register(name: HN, callback: HookCallback): void;
};

export class HookManager<HC extends HookManagerConfiguration = HookManagerConfiguration, HN extends string = string> {
  protected readonly availableHooks: ReadonlyOr<(HN | string)[]>;
  protected readonly registeredHooks: CustomHookItem[] = [];

  public constructor(config: HC) {
    this.availableHooks = config.hookNames ?? [];

    Object.keys(config)
      .filter((key) => filterMatchingHooks(this.availableHooks, key))
      .forEach((key) => {
        this.register(key, config[key] as HookCallback);
      });
  }

  public getAvailableHooks(): ReadonlyOr<string[]> {
    return this.availableHooks;
  }

  public getRegisteredHooks(): CustomHookItem[] {
    return this.registeredHooks;
  }

  public async execute<N extends HN>(name: N, ...args: GetParameters<HC[N]>): Promise<GetReturnType<HC[N]>> {
    if (import.meta.env.MODE === 'development') {
      if (this.has(name)) {
        // eslint-disable-next-line no-console
        console.info(`%c@${name}`, 'color: yellow', ...args);
      } else {
        // eslint-disable-next-line no-console
        console.info(`%c@${name} does not exist`, 'color: red', ...args);
      }
    }

    const returnValue = await Promise.all(
      this.registeredHooks.filter((hook) => hook.name === name).map((hook) => hook.callback(...args)),
    );

    return returnValue[returnValue.length - 1];
  }

  public has(name: HN | string): boolean {
    return this.registeredHooks.some((hook) => hook.name === name);
  }

  public register(name: HN | string, callback: HookCallback): void {
    if (!callback) {
      return;
    }

    this.registeredHooks.push({name, callback});
  }
}
