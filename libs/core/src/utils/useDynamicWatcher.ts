import {type Ref, watchEffect, type WatchStopHandle} from 'vue';
import {toPromise} from '@myparcel-vfb/utils';
import {type PromiseOr} from '@myparcel/ts-utils';

export const useDynamicWatcher = (callback: () => PromiseOr<boolean>, property: Ref): WatchStopHandle => {
  return watchEffect(() => {
    void toPromise(callback()).then((value) => {
      property.value = value;
    });
  });
};
