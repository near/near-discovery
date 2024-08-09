import dynamic from 'next/dynamic';

import { useBosLoaderStore } from '@/stores/bos-loader';

const Component = dynamic(() => import('./VM'), {
  ssr: false,
  loading: () => <p style={{ padding: '1rem' }}>Loading ...</p>,
});

type Props = {
  src: string;
  props?: Record<string, unknown>;
};

export function VmComponent(props: Props) {
  const redirectMapStore = useBosLoaderStore();

  return (
    <>
      <Component
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
        {...props}
      />
    </>
  );
}
