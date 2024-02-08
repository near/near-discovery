import useToast from '@/hooks/useToast';
import { useBosLoaderStore } from '@/stores/bos-loader';
import { useVmStore } from '@/stores/vm';
import useAddAction from '@/hooks/useAddAction';

type Props = {
  src: string;
  props?: Record<string, unknown>;
};

export function VmComponent(props: Props) {
  const { EthersProvider, ethersContext, Widget } = useVmStore();
  const redirectMapStore = useBosLoaderStore();
  const toast = useToast();
  const { addAction } = useAddAction('quick_onboarding');

  if (!EthersProvider || !redirectMapStore.hasResolved) {
    return <div />;
  }

  return (
    <EthersProvider value={ethersContext}>
      <Widget
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
        src={props.src}
        props={{ toast, addAction, ...props.props }}
      />
    </EthersProvider>
  );
}
