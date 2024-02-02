import { memo } from 'react';
import { useRouter } from 'next/router';
import { IdToPath } from '@/config/all-in-one/chains';
import GoMore from '@/components/GoMore';

import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledChians,
  StyledChain,
  StyledChainIcon,
  StyledChainTitle,
  StyledChainDesc,
} from './styles';

const TrendingEthereum = ({ chains }: any) => {
  const router = useRouter();
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Trending Ethereum L2s</StyledTitle>
        <GoMore label="Explore all" path="/blockchains" bp="1001-007" />
      </StyledHeader>
      <StyledChians>
        {chains.slice(0, 8).map((chain: any) => (
          <StyledChain
            key={chain.id}
            data-bp="1001-008"
            onClick={() => {
              router.push(`/network/${IdToPath[chain.id]}`);
            }}
          >
            <StyledChainIcon src={chain.logo} />
            <StyledChainTitle>{chain.name}</StyledChainTitle>
            <StyledChainDesc>{chain.description}</StyledChainDesc>
          </StyledChain>
        ))}
      </StyledChians>
    </StyledContainer>
  );
};

export default memo(TrendingEthereum);
