// eslint-disable-next-line no-invalid-this

type CustomHookItem<HN extends string> = {
  name: HN;
  callback: HookCallback;
};

type HookCallback = (...args: any[]) => any;

export type InputHookConfiguration = {
  [k in string]: HookCallback;
};

export class HookManager<HC extends InputHookConfiguration = InputHookConfiguration, HN extends keyof HC = keyof HC> {
  public availableHooks: ReadonlyArray<HN>;
  public registeredHooks: CustomHookItem<HN>[] = [];

  constructor(config: Partial<HC> & {hookNames?: ReadonlyArray<HN>}) {
    this.availableHooks = config.hookNames ?? [];

    Object.keys(config)
      .filter((key) => this.availableHooks.includes(key as HN))
      .forEach((key) => {
        this.register(key as HN, config[key] as HC[HN]);
      });
  }

  public async execute<N extends HN>(name: N, ...args: Parameters<HC[N]>): Promise<ReturnType<HC[N]>> {
    if (this.has(name)) {
      console.log(`%c@${name}`, 'color: yellow', ...args);
    }

    const returnValue = await Promise.all(
      this.registeredHooks.filter((hook) => hook.name === name).map((hook) => hook.callback(...args)),
    );

    return returnValue[returnValue.length - 1];
  }

  public has(name: HN): boolean {
    return this.registeredHooks.some((hook) => hook.name === name);
  }

  public register(name: HN, callback: HC[HN]): void {
    this.registeredHooks.push({name, callback});
  }
}
