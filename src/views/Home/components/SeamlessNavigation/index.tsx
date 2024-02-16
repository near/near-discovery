import { memo } from 'react';
import { useRouter } from 'next/router';
import { IdToPath } from '@/config/all-in-one/chains';
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
  const router = useRouter();
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
            <StyledChain
              key={chain.id}
              data-bp="1001-010"
              onClick={() => {
                router.push(`/all-in-one/${IdToPath[chain.id]}`);
              }}
            >
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
