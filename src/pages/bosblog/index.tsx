import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Blog: NextPageWithLayout = () => {
  const components = useBosComponents();
  return (
    <ComponentWrapperPage
      src={components.blog}
      meta={{
        title: 'NEAR | Blog',
        description: 'The latest on the Near Ecosystem',
      }}
      componentProps={{
        blogPostIds: [75675],
      }}
    />
  );
};

Blog.getLayout = useDefaultLayout;

export default Blog;
