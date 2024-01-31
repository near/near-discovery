import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { VmComponent } from '@/components/vm/VmComponent';
import useAddAction from '@/hooks/useAddAction';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';

import { lifi } from '@/components/Bridge/init'

const ViewComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const componentSrc = `${router.query.componentAccountId}/widget/${router.query.componentName}`;
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});
  const authStore = useAuthStore();
  const components = useBosComponents();
  const { addAction } = useAddAction('all-in-one');
  useEffect(() => {
    setComponentSrc(componentSrc);
  }, [setComponentSrc, componentSrc]);

  useEffect(() => {
    setComponentProps(router.query);
  }, [router.query]);

  return <ComponentWrapperPage src={componentSrc} componentProps={{
    ...componentProps, addAction, getLifi: () => {
      return lifi
    }
  }} />;

};

ViewComponentPage.getLayout = useDefaultLayout;

export default ViewComponentPage;
