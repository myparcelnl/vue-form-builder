import {Ref, watchEffect} from 'vue';
import {PromiseOr} from '@myparcel/ts-utils';
import {toPromise} from '@myparcel-vfb/utils';

export const useDynamicWatcher = (callback: () => PromiseOr<boolean>, property: Ref): void => {
  if (!callback) {
    return;
  }

  watchEffect(() => {
    void toPromise(callback()).then((value) => {
      property.value = value;
    });
  });
};
