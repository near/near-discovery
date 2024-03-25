import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';
import { useRouter } from 'next/router';

const Blog: NextPageWithLayout = () => {
  const components = useBosComponents();
  const { requestAuthentication } = useSignInRedirect();
  const router = useRouter();
  const accountId = router.query.accountId;
  const blockHeight = router.query.blockHeight;
  const contributors = ['near', 'jacksonthedev.near'];

  if (accountId && blockHeight) {
    return (
      <ComponentWrapperPage
        src={components.blogPost}
        meta={{
          title: 'NEAR | Blog Post',
          description: 'The latest on the Near Ecosystem',
        }}
        componentProps={{
          requestAuthentication,
          accountId,
          blockHeight,
        }}
      />
    );
  }
  return (
    <ComponentWrapperPage
      src={components.blog}
      meta={{
        title: 'NEAR | Blog',
        description: 'The latest on the Near Ecosystem',
      }}
      componentProps={{
        contributors,
        requestAuthentication,
      }}
    />
  );
};

Blog.getLayout = useDefaultLayout;

export default Blog;
