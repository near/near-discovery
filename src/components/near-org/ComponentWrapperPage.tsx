import { VmComponent } from '@/components/vm/VmComponent';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';

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
  const { emitGatewayEvent } = useGatewayEvents();

  return (
    <>
      {props.meta && <MetaTags {...props.meta} />}
      <VmComponent src={props.src} props={{ ...props.componentProps, emitGatewayEvent }} />
    </>
  );
}
