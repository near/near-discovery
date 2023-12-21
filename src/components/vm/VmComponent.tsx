import { useBosLoaderStore } from '@/stores/bos-loader';
import { useVmStore } from '@/stores/vm';
import useToast from '@/hooks/useToast';

import { Spinner } from '../lib/Spinner';

type Props = {
  src: string;
  props?: Record<string, unknown>;
};

export function VmComponent(props: Props) {
  const { EthersProvider, ethersContext, Widget } = useVmStore();
  const redirectMapStore = useBosLoaderStore();
  const toast = useToast();

  if (!EthersProvider || !redirectMapStore.hasResolved) {
    return <Spinner />;
  }

  return (
    <EthersProvider value={ethersContext}>
      <Widget
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
        src={props.src}
        props={{ toast, ...props.props }}
      />
    </EthersProvider>
  );
}
