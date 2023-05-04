import { componentsByNetworkId } from '@/data/bos-components';

import { useEnvironment } from './useEnvironment';

export function useBosComponents() {
  const { networkId } = useEnvironment();
  const components = componentsByNetworkId[networkId];

  if (!components) {
    throw new Error(
      `useBosComponents(): unimplemented NetworkId "${networkId}". Add values to "data/bos-components.ts"`,
    );
  }

  return components;
}
