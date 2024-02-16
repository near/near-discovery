import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Column: NextPageWithLayout = () => {
  const components = useBosComponents();
  const Container = styled.div``;

  return (
    <Container>
      <ComponentWrapperPage
        src={components.polygon || ''}
        meta={{ title: 'Connect with the Polygon community.', description: 'Become part of the Polygon community.' }}
      />
    </Container>
  );
};

Column.getLayout = useDefaultLayout;

export default Column;
