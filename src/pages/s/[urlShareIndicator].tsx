import { openToast } from '@near-pagoda/ui';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

type ShareType = 'POST' | 'COMMENT' | 'BLOG' | 'REPOST' | 'INVALID';

type markdownObject = {
  type: string;
  imageUrl?: any;
  level?: any;
  text?: any;
  listType?: string;
  content?: any;
};

function returnImageUrl(data: ImageData | undefined) {
  if (data?.ipfs_cid) {
    return `https://ipfs.near.social/ipfs/${data.ipfs_cid}`;
  }
  return null;
}

function returnShareType(indicator: string): ShareType {
  switch (indicator) {
    case 'c':
      return 'COMMENT';
    case 'p':
      return 'POST';
    case 'bp':
      return 'BLOG';
    case 'rp':
      return 'REPOST';
    default:
      return 'INVALID';
  }
}

function isImage(line: string) {
  return line.trim().startsWith('![');
}

function getImageUrl(line: string) {
  const match = line.match(/\((.*?)\)/);
  if (match) {
    return match[1].replace(/'/g, '');
  }
  return null;
}

function getFirstHeading(markdownArray: markdownObject[]) {
  for (const element of markdownArray) {
    if (element.type === 'header') {
      return element;
    }
  }
  return null;
}
function parseMarkdown(markdown: string) {
  const parsedMarkdown: { type: string; imageUrl?: any; level?: any; text?: any; listType?: string; content?: any }[] =
    [];
  const lines = markdown.split('\n');

  let currentHeader: { type: string; level: any; text: any } | null = null;
  let listType: string | null = null;
  let headerImageUrl: string | null = null;

  lines.forEach((line, index) => {
    line = line.trim();
    if (index === 0 && isImage(line)) {
      headerImageUrl = getImageUrl(line);
      parsedMarkdown.push({ type: 'header-image', imageUrl: headerImageUrl });
    } else if (line.startsWith('#')) {
      listType = null;
      const match = line.match(/^#+/);
      const level = match ? match[0].length : 0;
      const text = line.replace(/^#+\s*/, '');
      currentHeader = { type: 'header', level, text };
      parsedMarkdown.push(currentHeader);
    } else if (line.startsWith('* ') || line.startsWith('- ') || /^\d+\./.test(line)) {
      if (listType !== 'unordered' && listType !== 'ordered') {
        listType = line.startsWith('* ') || line.startsWith('- ') ? 'unordered' : 'ordered';
        parsedMarkdown.push({ type: 'list-start', listType });
      }
      parsedMarkdown.push({ type: 'list-item', content: line });
    } else {
      if (currentHeader) {
        currentHeader = null;
      }
      if (line.trim().length > 0) {
        parsedMarkdown.push({ type: 'paragraph', content: line });
        listType = null;
      }
    }
  });

  return parsedMarkdown;
}

async function returnMetaPreviewForComment(accountId: string, blockHeight: string): Promise<MetaPreview | null> {
  try {
    const response = await fetch(
      `https://api.near.social/get?keys=${accountId}/post/comment&blockHeight=${blockHeight}`,
    );
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
  } catch (err) {
    console.warn('Failed to fetch meta preview for Comment', err);
  }
  return null;
}

async function returnMetaPreviewForPost(accountId: string, blockHeight: string): Promise<MetaPreview | null> {
  try {
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
  } catch (err) {
    console.warn('Failed to fetch meta preview for Post', err);
  }
  return null;
}
async function returnMetaPreviewForBlog(accountId: string, blockHeight: string): Promise<MetaPreview | null> {
  try {
    const response = await fetch(`https://api.near.social/get?keys=${accountId}/post/main&blockHeight=${blockHeight}`);
    const responseData: MainPostData = await response.json();
    const main = responseData[accountId]?.post.main;

    if (main) {
      const data = JSON.parse(main);
      const content = parseMarkdown(data.text);
      const info = getFirstHeading(content);
      const imageUrl = content.find((element) => element.type === 'header-image')?.imageUrl || null;

      return {
        title: `Blog Post of @${accountId}`,
        description: info?.text || '',
        imageUrl,
        redirectUrl: `/near/widget/BlogPostPage?accountId=${accountId}&blockHeight=${blockHeight}`,
      };
    }
  } catch (err) {
    console.warn('Failed to fetch meta preview for Post', err);
  }
  return null;
}

async function returnMetaPreviewForRepost(
  accountId: string,
  blockHeight: string,
  rbAccountId: string,
): Promise<MetaPreview | null> {
  try {
    const response = await fetch(`https://api.near.social/get?keys=${accountId}/post/main&blockHeight=${blockHeight}`);
    const responseData: MainPostData = await response.json();
    const main = responseData[accountId]?.post.main;

    if (main) {
      const data = JSON.parse(main);

      return {
        title: `Repost by @${rbAccountId}`,
        description: sanitizeText(data.text),
        imageUrl: returnImageUrl(data.image),
        redirectUrl: `/near/widget/PostPage?accountId=${accountId}&blockHeight=${blockHeight}&isRepost=true&repostedBy=${rbAccountId}`,
      };
    }
  } catch (err) {
    console.warn('Failed to fetch meta preview for Repost', err);
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
  const repostedBy = query.rb as string;
  const shareType = returnShareType(indicator);
  let meta: MetaPreview | null = null;

  if (shareType === 'COMMENT') {
    meta = await returnMetaPreviewForComment(accountId, blockHeight);
  } else if (shareType === 'POST') {
    meta = await returnMetaPreviewForPost(accountId, blockHeight);
  } else if (shareType === 'BLOG') {
    meta = await returnMetaPreviewForBlog(accountId, blockHeight);
  } else if (shareType === 'REPOST') {
    meta = await returnMetaPreviewForRepost(accountId, blockHeight, repostedBy);
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
        type: 'error',
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
