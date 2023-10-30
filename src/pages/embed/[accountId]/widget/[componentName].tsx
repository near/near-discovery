import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useSimpleLayout } from '@/hooks/useLayout';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';

const EmbedComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const componentSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setComponentSrc(componentSrc);
  }, [setComponentSrc, componentSrc]);

  useEffect(() => {
    setComponentProps(router.query);
  }, [router.query]);

  return (
    <div className="d-inline-block position-relative overflow-hidden">
      <VmComponent key={componentSrc} src={componentSrc} props={componentProps} />
    </div>
  );
};

EmbedComponentPage.getLayout = useSimpleLayout;

export default EmbedComponentPage;
