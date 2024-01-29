import { memo, useEffect } from 'react';
import DappCard from './DappCard';
import { StyledDapps } from './styles';

const Dapps = ({ dapps }: any) => {
  useEffect(() => {}, []);

  return (
    <StyledDapps>
      {dapps.map((dapp: any) => (
        <DappCard key={dapp.id} {...dapp} />
      ))}
    </StyledDapps>
  );
};

export default memo(Dapps);
