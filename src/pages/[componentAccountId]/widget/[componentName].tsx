import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import strip from 'strip-markdown';

import { MetaTags } from '@/components/MetaTags';
import { RootContentContainer } from '@/components/RootContentContainer';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { useCurrentComponentStore } from '@/stores/current-component';
import { privacyDomainName, termsDomainName } from '@/utils/config';
import type { NextPageWithLayout } from '@/utils/types';

type ComponentMetaPreview = {
  title: string;
  description: string;
  imageUrl: string | null;
};

type ComponentPayload = Record<string, { widget: Record<string, { '': string; metadata: ComponentMetadata }> }>;
type ComponentMetadata = {
  name: string;
  description: string;
  linktree: {
    website: string;
  };
  image: ImageData;
  tags: Record<string, string>;
};

type ImageData = {
  ipfs_cid?: string;
};

function returnImageUrl(data: ImageData | undefined) {
  if (data?.ipfs_cid) {
    return `https://i.near.social/large/https://ipfs.near.social/ipfs/${data.ipfs_cid}`;
  }
  return null;
}

async function fetchPreviewData(accountId: string, componentName: string): Promise<ComponentMetaPreview | null> {
  try {
    const response = await fetch(`https://api.near.social/get?keys=${accountId}/widget/${componentName}/**`);
    const responseData: ComponentPayload = await response.json();
    const metadata = responseData[accountId]?.widget?.[componentName]?.metadata;

    if (!metadata) {
      return null;
    }

    const strippedDescriptionVFile = await remark().use(strip).process(metadata.description);
    // recommended conversion from remark docs
    const strippedDescription = String(strippedDescriptionVFile);

    return {
      title: `${metadata.name} by ${accountId} on BOS`,
      description: strippedDescription,
      imageUrl: returnImageUrl(metadata.image),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getServerSideProps: GetServerSideProps<{
  meta: ComponentMetaPreview | null;
}> = async ({ params }) => {
  const componentAccountId = params?.componentAccountId;
  const componentName = params?.componentName;

  if (typeof componentAccountId !== 'string' || typeof componentName !== 'string') {
    return {
      notFound: true,
    };
  }

  const meta = await fetchPreviewData(componentAccountId, componentName);

  return {
    props: {
      meta,
    },
  };
};

const ViewComponentPage: NextPageWithLayout = ({ meta }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);
  const componentSrc = `${router.query.componentAccountId}/widget/${router.query.componentName}`;
  const [componentProps, setComponentProps] = useState<Record<string, unknown>>({});
  const authStore = useAuthStore();
  const components = useBosComponents();
  const { requestAuthentication } = useSignInRedirect();
  const { emitGatewayEvent, shouldPassGatewayEventProps } = useGatewayEvents();

  useEffect(() => {
    const { requestAuth, createAccount } = componentProps;
    if (requestAuth && !authStore.account) {
      requestAuthentication(!!createAccount);
    }
  }, [authStore, componentProps, requestAuthentication]);

  useEffect(() => {
    setComponentSrc(componentSrc);
  }, [setComponentSrc, componentSrc]);

  useEffect(() => {
    setComponentProps(router.query);
  }, [router.query]);

  return (
    <RootContentContainer>
      {meta && <MetaTags title={meta.title} description={meta.description} image={meta.imageUrl} />}

      <VmComponent
        key={components.wrapper}
        src={components.wrapper}
        props={{
          emitGatewayEvent: shouldPassGatewayEventProps(router.query.componentAccountId as string)
            ? emitGatewayEvent
            : undefined,
          logOut: authStore.logOut,
          targetProps: componentProps,
          targetComponent: componentSrc,
          termsDomainName,
          privacyDomainName,
        }}
      />
    </RootContentContainer>
  );
};

ViewComponentPage.getLayout = useDefaultLayout;

export default ViewComponentPage;
