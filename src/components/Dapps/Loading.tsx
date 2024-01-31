import Skeleton from 'react-loading-skeleton';
import { StyledDapps, StyledDapp, StyledDappInner } from './styles';
import { memo } from 'react';

const LoadingCard = () => {
  return (
    <StyledDapp>
      <StyledDappInner style={{ gap: '16px' }}>
        <Skeleton width="72px" height="72px" borderRadius="16px" containerClassName="skeleton" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <Skeleton width="195px" height="27px" borderRadius="6px" containerClassName="skeleton" />
          <Skeleton width="195px" height="18px" borderRadius="6px" containerClassName="skeleton" />
          <Skeleton width="195px" height="18px" borderRadius="6px" containerClassName="skeleton" />
        </div>
      </StyledDappInner>
    </StyledDapp>
  );
};

const LoadingDapps = ({ length, style }: any) => {
  return (
    <StyledDapps style={style}>
      {new Array(length || 0).fill('1').map((dapp: any, index: number) => (
        <LoadingCard key={index} />
      ))}
    </StyledDapps>
  );
};

export default memo(LoadingDapps);
