import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';


const ZkevmColumn: NextPageWithLayout = () => {
  const components = useBosComponents();
  const Container = styled.div`
    .title{
      font-size:40px;
      color:#fff;
      font-weight:700;
    }
    .subTitle{
      font-size:20px;
      font-weight:500;
      color:#979ABE;
    }
  `
  return (
    <Container>
      <div className='title'>ZkEvm Column</div>
      <p className='subTitle'>Using ZkEvm conveniently and efficiently</p>
      <ComponentWrapperPage
        src={components.zkevmcolumn}
        meta={{ title: 'Connect with the NEAR community.', description: 'Become part of the NEAR community.' }}
      />
    </Container>
  );
};

ZkevmColumn.getLayout = useDefaultLayout;

export default ZkevmColumn;
