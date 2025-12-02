import {type Ref, watchEffect, type WatchStopHandle} from 'vue';
import {type PromiseOr} from '@myparcel-dev/ts-utils';
import {toPromise} from './toPromise';

export const useDynamicWatcher = (callback: () => PromiseOr<boolean>, property: Ref): WatchStopHandle => {
  return watchEffect(() => {
    void toPromise(callback()).then((value) => {
      property.value = value;
    });
  });
};
