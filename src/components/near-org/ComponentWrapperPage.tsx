import { VmWidgetWrapper } from '@/components/client/VmWidgetWrapper';

import { MetaTags } from '../MetaTags';

type Props = {
  src: string;
  meta?: {
    title: string;
    description: string;
  };
};

export function ComponentWrapperPage(props: Props) {
  return (
    <>
      {props.meta && <MetaTags {...props.meta} />}
      <VmWidgetWrapper src={props.src} />
    </>
  );
}
