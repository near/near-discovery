import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ZkevmColumn: NextPageWithLayout = () => {
  const components = useBosComponents();
  const Container = styled.div`
    
  `;
  return (
    <Container>
      <ComponentWrapperPage
        src={components['polygon-zkevm']}
        meta={{ title: 'Connect with the NEAR community.', description: 'Become part of the NEAR community.' }}
      />
    </Container>
  );
};

ZkevmColumn.getLayout = useDefaultLayout;

export default ZkevmColumn;
