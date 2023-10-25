import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const BaseColumn: NextPageWithLayout = () => {
  const components = useBosComponents();
  const Container = styled.div``;

  return (
    <Container>
      <ComponentWrapperPage
        src={components.mantle || ''}
        meta={{ title: 'Connect with the Mantle community.', description: 'Become part of the Mantle community.' }}
      />
    </Container>
  );
};

BaseColumn.getLayout = useDefaultLayout;

export default BaseColumn;
