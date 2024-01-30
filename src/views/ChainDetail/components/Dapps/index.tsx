import { memo } from 'react';
import Dapps from '@/components/Dapps';
import { StyledContainer, StyledTitle } from './styles';

const DappsCom = ({ dapps }: any) => {
  return (
    <StyledContainer>
      <StyledTitle>dApps on Polygon zkEVM</StyledTitle>
      <Dapps dapps={dapps || []} />
    </StyledContainer>
  );
};

export default memo(DappsCom);
