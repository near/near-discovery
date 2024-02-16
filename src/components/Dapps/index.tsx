import { memo } from 'react';
import DappCard from './DappCard';
import { StyledDapps } from './styles';

const Dapps = ({ dapps, bp }: any) => {
  return (
    <StyledDapps>
      {dapps.map((dapp: any) => (
        <DappCard key={dapp.id} {...dapp} bp={bp} />
      ))}
    </StyledDapps>
  );
};

export default memo(Dapps);
