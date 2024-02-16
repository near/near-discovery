import { memo } from 'react';
import Dapps from '@/components/Dapps';
import { StyledContainer, StyledTitle } from './styles';

const DappsCom = ({ dapps, chainName }: any) => {
  return (
    <StyledContainer>
      <StyledTitle>dApps on {chainName}</StyledTitle>
      <Dapps dapps={dapps || []} bp={{ detail: '100121-007' }} />
    </StyledContainer>
  );
};

export default memo(DappsCom);
