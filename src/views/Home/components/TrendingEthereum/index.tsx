import { memo } from 'react';
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
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Trending Ethereum L2s</StyledTitle>
        <GoMore label="Explore all" path="/blockchains" />
      </StyledHeader>
      <StyledChians>
        {chains.slice(0, 8).map((chain: any) => (
          <StyledChain>
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
