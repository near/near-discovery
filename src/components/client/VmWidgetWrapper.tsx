import { useEthersProviderStore } from '@/stores/ethers-provider';

export function VmWidgetWrapper(props: any) {
  const { Provider, context, Widget } = useEthersProviderStore();

  if (!Provider) {
    return <div>Loading...</div>;
  }

  return (
    <Provider value={context}>
      <Widget {...props} />
    </Provider>
  );
}
