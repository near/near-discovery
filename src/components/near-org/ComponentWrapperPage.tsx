import { useEffect } from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useDevice } from '@/hooks/useDevice';
import { useCurrentComponentStore } from '@/stores/current-component';
import { recordClick, recordTouchStart } from '@/utils/analytics';

import { MetaTags } from '../MetaTags';

type Props = {
  componentProps?: Record<string, unknown>;
  src: string;
  meta?: {
    title: string;
    description: string;
  };
};

export function ComponentWrapperPage(props: Props) {
  const setCurrentComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const device = useDevice();

  useEffect(() => {
    setCurrentComponentSrc(props.src);
  }, [setCurrentComponentSrc, props]);

  const handleAnalyticsTrack = (e: React.MouseEvent) => device === 'desktop' ? recordClick(e) : recordTouchStart(e);

  return (
    <>
      {props.meta && <MetaTags {...props.meta} />}
      <div
        style={{
          paddingTop: 'var(--body-top-padding)',
        }}
        onPointerUp={handleAnalyticsTrack}
      >
        <VmComponent src={props.src} props={props.componentProps} />
      </div>
    </>
  );
}
