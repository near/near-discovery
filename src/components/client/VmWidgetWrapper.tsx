import { useVmStore } from '@/stores/vm';

export function VmWidgetWrapper(props: any) {
  const { EthersProvider, ethersContext, Widget } = useVmStore();

  if (!EthersProvider) {
    return <div>Loading...</div>;
  }

  return (
    <EthersProvider value={ethersContext}>
      <Widget {...props} />
    </EthersProvider>
  );
}
