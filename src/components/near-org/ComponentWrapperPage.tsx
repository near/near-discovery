import { useEffect } from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useCurrentComponentStore } from '@/stores/current-component';

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

  useEffect(() => {
    if (
      props.componentProps &&
      'targetComponent' in props.componentProps &&
      typeof props.componentProps.targetComponent === 'string'
    ) {
      /*
        If we're rendering a wrapper component, we want to display the component being wrapped
        (props.componentProps.targetComponent). Without this check, we'd be rendering "GatewayWrapper"
        or "TosCheck" as the current component instead of something like "ActivityPage".
      */
      setCurrentComponentSrc(props.componentProps.targetComponent);
    } else {
      setCurrentComponentSrc(props.src);
    }
  }, [setCurrentComponentSrc, props]);

  return (
    <>
      {props.meta && <MetaTags {...props.meta} />}
      <div
        style={{
          paddingTop: 'var(--body-top-padding)',
        }}
      >
        <VmComponent src={props.src} props={props.componentProps} />
      </div>
    </>
  );
}
