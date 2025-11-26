/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery} from '@tanstack/vue-query';
import {FetchClient, GetCarriers, createPublicSdk} from '@myparcel-dev/sdk';

export const useFetchCarriers = () => {
  return useQuery(['carriers'], async () => {
    const sdk = createPublicSdk(new FetchClient(), [new GetCarriers()]);

    return sdk.getCarriers();
  });
};
