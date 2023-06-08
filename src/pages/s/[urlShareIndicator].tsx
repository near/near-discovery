import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { openToast } from '@/components/lib/Toast';
import { MetaTags } from '@/components/MetaTags';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

type MetaPreview = {
  title: string;
  description: string;
  imageUrl: string | null;
  redirectUrl: string;
};

type MainPostData = Record<
  string,
  | {
      post: {
        main: string;
      };
    }
  | undefined
>;

type CommentPostData = Record<
  string,
  | {
      post: {
        comment: string;
      };
    }
  | undefined
>;

type StringifiedData = {
  type: string;
  text: string;
  image?: ImageData;
};

type ImageData = {
  ipfs_cid?: string;
};

type ShareType = 'POST' | 'COMMENT' | 'INVALID';

function returnImageUrl(data: ImageData | undefined) {
  if (data?.ipfs_cid) {
    return `https://i.near.social/large/https://ipfs.near.social/ipfs/${data.ipfs_cid}`;
  }
  return null;
}

function returnShareType(indicator: string): ShareType {
  switch (indicator) {
    case 'c':
      return 'COMMENT';
    case 'p':
      return 'POST';
    default:
      return 'INVALID';
  }
}

async function returnMetaPreviewForComment(accountId: string, blockHeight: string): Promise<MetaPreview | null> {
  const response = await fetch(`https://api.near.social/get?keys=${accountId}/post/comment&blockHeight=${blockHeight}`);
  const responseData: CommentPostData = await response.json();
  const comment = responseData[accountId]?.post.comment;

  if (comment) {
    const data: StringifiedData = JSON.parse(comment);

    return {
      title: `Comment by @${accountId}`,
      description: sanitizeText(data.text),
      imageUrl: returnImageUrl(data.image),
      redirectUrl: `/near/widget/PostPage?accountId=${accountId}&commentBlockHeight=${blockHeight}`,
    };
  }

  return null;
}

async function returnMetaPreviewForPost(accountId: string, blockHeight: string): Promise<MetaPreview | null> {
  const response = await fetch(`https://api.near.social/get?keys=${accountId}/post/main&blockHeight=${blockHeight}`);
  const responseData: MainPostData = await response.json();
  const main = responseData[accountId]?.post.main;

  if (main) {
    const data: StringifiedData = JSON.parse(main);

    return {
      title: `Post by @${accountId}`,
      description: sanitizeText(data.text),
      imageUrl: returnImageUrl(data.image),
      redirectUrl: `/near/widget/PostPage?accountId=${accountId}&blockHeight=${blockHeight}`,
    };
  }

  return null;
}

function sanitizeText(text: string) {
  return text.replace(/\n/g, ' ').replace(/\s\s/g, ' ').trim();
}

export const getServerSideProps: GetServerSideProps<{
  meta: MetaPreview | null;
}> = async ({ query }) => {
  const indicator = query.urlShareIndicator as string;
  const accountId = query.a as string;
  const blockHeight = query.b as string;
  const shareType = returnShareType(indicator);
  let meta: MetaPreview | null = null;

  if (shareType === 'COMMENT') {
    meta = await returnMetaPreviewForComment(accountId, blockHeight);
  } else if (shareType === 'POST') {
    meta = await returnMetaPreviewForPost(accountId, blockHeight);
  }

  return {
    props: {
      meta,
    },
  };
};

const ShareUrlPage: NextPageWithLayout = ({ meta }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  useEffect(() => {
    if (meta?.redirectUrl) {
      router.replace(meta.redirectUrl);
    } else {
      openToast({
        id: 'invalid-share-url',
        type: 'ERROR',
        title: 'Invalid URL',
      });
      router.replace('/');
    }
  }, [meta, router]);

  if (meta) {
    return <MetaTags title={meta.title} description={meta.description} image={meta.imageUrl} />;
  }

  return null;
};

ShareUrlPage.getLayout = useDefaultLayout;

export default ShareUrlPage;
