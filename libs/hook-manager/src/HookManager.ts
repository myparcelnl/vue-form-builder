// noinspection JSUnusedGlobalSymbols

import {type ReadonlyOr, type ResolvePromise} from '@myparcel/ts-utils';
import {filterMatchingHooks} from './utils/filterMatchingHooks';
import {type CustomHookItem, type HookCallback, type HookManagerConfiguration} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetParameters<T> = T extends (...args: any[]) => any ? Parameters<T> : any[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetReturnType<T> = ResolvePromise<T extends (...args: any[]) => any ? ReturnType<T> : Promise<any>>;

export type HookUnregisterHandler = () => void;

export type HookManagerInstance<
  HC extends HookManagerConfiguration = HookManagerConfiguration,
  HN extends string = string,
> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute<N extends HN>(name: N, ...args: any[]): Promise<GetReturnType<HC[N]>>;

  getAvailableHooks(): ReadonlyOr<HN[]>;

  getRegisteredHooks(): CustomHookItem[];

  has(name: HN, predicate?: (hook: CustomHookItem) => boolean): boolean;

  register(name: HN, callback: HookCallback): HookUnregisterHandler;

  unregister(name: HN, callback?: HookCallback): void;
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
    const returnValue = await Promise.all(
      this.registeredHooks.filter((hook) => hook.name === name).map((hook) => hook.callback(...args)),
    );

    return returnValue[returnValue.length - 1];
  }

  public has(name: HN | string, predicate?: (hook: CustomHookItem) => boolean): boolean {
    return this.registeredHooks.some((hook) => hook.name === name && predicate?.(hook));
  }

  public register(name: HN | string, callback: HookCallback): HookUnregisterHandler {
    const unregisterCallback = () => this.unregister(name, callback);

    if (this.has(name, (hook) => this.callbackMatches(hook, callback))) {
      return unregisterCallback;
    }

    this.registeredHooks.push({name, callback});

    return unregisterCallback;
  }

  public unregister(name: HN | string, callback?: HookCallback): void {
    const findHookIndex = () => {
      return this.registeredHooks.findIndex((hook) => {
        return hook.name === name && (!callback || this.callbackMatches(hook, callback));
      });
    };

    let hookIndex: number;

    while ((hookIndex = findHookIndex()) > -1) {
      this.registeredHooks.splice(hookIndex, 1);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private callbackMatches(hook: CustomHookItem, callback: HookCallback): boolean {
    return hook.callback.toString() === callback.toString();
  }
}
