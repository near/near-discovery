import { networkId } from '@/config';
import { componentsByNetworkId } from '@/data/bos-components';

export function useBosComponents() {
  const components = componentsByNetworkId[networkId];

  if (!components) {
    throw new Error(
      `useBosComponents(): unimplemented NetworkId "${networkId}". Add values to "data/bos-components.ts"`,
    );
  }

  return components;
}
