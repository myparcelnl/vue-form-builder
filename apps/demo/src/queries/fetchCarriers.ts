/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery} from '@tanstack/vue-query';
import {FetchClient, GetCarriers, createMyParcelSdk} from '@myparcel/sdk';

export const useFetchCarriers = () => {
  return useQuery(['carriers'], async () => {
    const sdk = createMyParcelSdk(new FetchClient(), [new GetCarriers()]);

    return sdk.getCarriers();
  });
};
