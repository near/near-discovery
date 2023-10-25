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
        src={components.base || ''}
        meta={{ title: 'Connect with the BASE community.', description: 'Become part of the BASE community.' }}
      />
    </Container>
  );
};

BaseColumn.getLayout = useDefaultLayout;

export default BaseColumn;
