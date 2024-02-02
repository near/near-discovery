import { memo, useState } from 'react';
import { useRouter } from 'next/router';
import GoMore from '@/components/GoMore';
import chainsConfig, { IdToPath } from '@/config/all-in-one/chains';
import ChainBg from './ChainBg';

import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledChians,
  StyledChain,
  StyledChainIcon,
  StyledChainTitle,
  StyledChainDesc,
  StyledChainColorBg,
} from './styles';

const TrendingEthereum = ({ chains }: any) => {
  const router = useRouter();
  const [showBg, setShowBg] = useState('');
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
            onMouseEnter={() => {
              setShowBg(chain.id);
            }}
            onMouseLeave={() => {
              setShowBg('');
            }}
          >
            {showBg === chain.id && (
              <StyledChainColorBg style={{ color: chainsConfig[IdToPath[chain.id]].selectBgColor }}>
                <ChainBg />
              </StyledChainColorBg>
            )}

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
