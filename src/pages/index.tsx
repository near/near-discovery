import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { MetaTags } from '@/components/MetaTags';
import NearHomePage from '@/components/near/NearHomePage/Near.HomePage';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NearOrgHomePage } from '@/components/near-org/NearOrg.HomePage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout, useSimpleLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';

import NewHomePage from './homePage';

const LS_ACCOUNT_ID = 'near-social-vm:v01::accountId:';

const HomePage: NextPageWithLayout = () => {
  // const router = useRouter();
  // const [signedInOptimistic, setSignedInOptimistic] = useState(false);
  // const signedIn = useAuthStore((store) => store.signedIn);
  // // const components = useBosComponents();
  // const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  // const authStore = useAuthStore();
  // const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});

  // useEffect(() => {
  //   const optimisticAccountId = window.localStorage.getItem(LS_ACCOUNT_ID);
  //   setSignedInOptimistic(!!optimisticAccountId);
  // }, []);

  // useEffect(() => {
  //   if (!signedIn) {
  //     setComponentSrc(null);
  //   }
  // }, [signedIn, setComponentSrc]);

  // if we are loading the ActivityPage, process the query params into componentProps
  // useEffect(() => {
  //   if (signedIn || signedInOptimistic) {
  //     setComponentProps(router.query);
  //   }
  // }, [router.query, signedIn, signedInOptimistic]);

  // if (signedIn || signedInOptimistic) {
  //   return (
  //     <ComponentWrapperPage
  //       src={components.tosCheck}
  //       componentProps={{
  //         logOut: authStore.logOut,
  //         targetProps: componentProps,
  //         targetComponent: components.default,
  //         tosName: components.tosContent,
  //       }}
  //     />
  //   );
  // }

  // return (
  //   <>
  //     <MetaTags
  //       title={`NEAR | The OS for an Open Web`}
  //       description={`"NEAR isn’t just a Layer 1 blockchain — it’s the Blockchain Operating System for an  Open Web. Create and discover decentralized apps, and help build the future of the web, today."`}
  //     />
  //     <NearOrgHomePage />
  //   </>
  // );
  return <NewHomePage />;
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
