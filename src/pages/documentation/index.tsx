import { useEffect, useRef } from 'react';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { useRouter } from 'next/router';

const Documentation: NextPageWithLayout = () => {
  const router = useRouter();
  const { slug } = router.query;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentPath = Array.isArray(slug) ? `/${slug.join('/')}` : '';

  const path = currentPath.replace(/\/documentation/g, '');

  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      if (event.data.type === 'urlChange' && event.data.url && event.data.url !== path) {
        const url = event.data.url.replace(/\/documentation/g, '');

        const newUrl = `/documentation${url}`;
        if (window.location.pathname !== newUrl) {
          window.history.pushState({}, '', newUrl);
        }
      }
    };

    window.addEventListener('message', handleIframeMessage);
    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, [path]);

  return (
    <iframe
      ref={iframeRef}
      style={{ flexGrow: 'inherit', width: '100%', height: '100vh' }}
      src={`https://docs.near.org${path}`}
    ></iframe>
  );
};

Documentation.getLayout = useDefaultLayout;

export default Documentation;
