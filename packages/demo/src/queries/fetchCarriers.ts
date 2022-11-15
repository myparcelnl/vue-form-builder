/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {FetchClient, GetCarriers, createMyParcelSdk} from '@myparcel/sdk';
import {useQuery} from 'vue-query';

export const useFetchCarriers = () => {
  return useQuery('carriers', async () => {
    const sdk = createMyParcelSdk(new FetchClient(), [new GetCarriers()]);

    return sdk.getCarriers();
  });
};
