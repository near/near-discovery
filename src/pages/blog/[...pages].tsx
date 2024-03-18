import type { GetServerSideProps } from 'next';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useCookiePreferences } from '@/hooks/useCookiePreferences';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { recordHandledError } from '@/utils/analytics';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps = (async ({ resolvedUrl }) => {
  const blog = resolvedUrl.split('blog/')[1];
  const title = blog.substring(0, blog.indexOf('/'));

  const res = await fetch(
    `https://raw.githubusercontent.com/near/near-discovery/main/public/blog/${title}/index.html`,
  ).catch((e) => {
    recordHandledError({ title, message: 'failed to fetch github blog html for requested title' });
    throw e;
  });

  const __html = await (await res.blob()).text();

  return { props: { bloghtml: { __html } } };
}) satisfies GetServerSideProps<{ bloghtml: any }>;

const StaticBlogPage: NextPageWithLayout = (props) => {
  useClearCurrentComponent();
  const cookieData = useCookiePreferences();
  const components = useBosComponents();
  const router = useRouter();

  const onBlogLinkClick = useCallback(
    (event: any) => {
      const url = event.target.href;
      if (url) {
        event.preventDefault();
        router.push(url);
      }
    },
    [router],
  );

  useEffect(() => {
    document.querySelectorAll("a[href^='/blog").forEach((element) => {
      element.addEventListener('click', onBlogLinkClick);
    });

    return () => {
      document.querySelectorAll("a[href^='/blog").forEach((element) => {
        element.removeEventListener('click', onBlogLinkClick);
      });
    };
  }, [onBlogLinkClick]);

  return (
    <>
      <div dangerouslySetInnerHTML={props.bloghtml} />
      <VmComponent src={components.nearOrg.cookiePrompt} props={{ cookiesAcknowleged: cookieData }} />
    </>
  );
};

StaticBlogPage.getLayout = useDefaultLayout;

export default StaticBlogPage;
