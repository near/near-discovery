import type { GetServerSideProps } from 'next';
import { useCallback, useEffect } from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useCookiePreferences } from '@/hooks/useCookiePreferences';
import { useDefaultLayout } from '@/hooks/useLayout';
import { recordHandledError } from '@/utils/analytics';
import type { NextPageWithLayout } from '@/utils/types';

export const getServerSideProps = (async ({ resolvedUrl }) => {
  const blogParts = resolvedUrl.split('blog/');
  let title = 'index.html';
  if (blogParts[1] !== title) {
    title = `${blogParts[1].substring(0, blogParts[1].indexOf('/'))}/index.html`;
  }
  const res = await fetch(`https://raw.githubusercontent.com/near/nearorg_marketing/main/public/blog/${title}`).catch(
    (e) => {
      recordHandledError({ title, message: 'failed to fetch github blog html for requested title' });
      throw e;
    },
  );

  const __html = await (await res.blob()).text();

  return { props: { bloghtml: { __html } } };
}) satisfies GetServerSideProps<{ bloghtml: any }>;

const StaticBlogPage: NextPageWithLayout = (props) => {
  useClearCurrentComponent();
  const cookieData = useCookiePreferences();
  const components = useBosComponents();

  const onBlogLinkClick = useCallback((event: any) => {
    const url = event.target.href;
    if (url) {
      event.preventDefault();
      window.location = url;
    }
  }, []);

  useEffect(() => {
    //this query fetches almost all links, except the clickable elements that are children of a tags
    // like document.querySelectorAll("h3[class^='headline_type-4']")
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
