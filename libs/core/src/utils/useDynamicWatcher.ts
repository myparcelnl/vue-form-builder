import {type Ref, watchEffect} from 'vue';
import {toPromise} from '@myparcel-vfb/utils/src';
import {type PromiseOr} from '@myparcel/ts-utils';

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
