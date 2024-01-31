import { memo } from 'react';

import {
  StyledContainer,
  StyledTitle,
  StyledSubtitle,
  StyledImageWrapper,
  StyledImage,
  StyledChains,
  StyledChain,
  StyledChainLogo,
  StyledChainName,
} from './styles';

const SeamlessNavigation = ({ chains }: any) => {
  return (
    <StyledContainer>
      <StyledTitle>Seamless Navigation</StyledTitle>
      <StyledSubtitle>
        Streamline your Open Web experience at DapDap with intuitive processes, coupled with straightforward
        user-centric pathways.
      </StyledSubtitle>
      <StyledImageWrapper>
        <StyledImage src="/images/home/seamless.png" />
        <StyledChains>
          {chains.map((chain: any) => (
            <StyledChain key={chain.id}>
              <StyledChainLogo src={chain.logo} />
              <StyledChainName>{chain.name}</StyledChainName>
            </StyledChain>
          ))}
        </StyledChains>
      </StyledImageWrapper>
    </StyledContainer>
  );
};

export default memo(SeamlessNavigation);
