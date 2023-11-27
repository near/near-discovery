import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import Loading from '@/components/Icons/Loading';
import chains from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useSwitchChain from '@/hooks/useSwitchChain';

const StyledContainer = styled.div<{ $mt?: number; $showName?: number }>`
  width: ${({ $showName }) => ($showName ? '204px' : '70px')};
  height: 38px;
  margin: 0 auto;
  border: 1px solid #373a53;
  border-radius: 8px;
  background-color: rgba(55, 58, 83, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 0px 10px 0px 4px;
  margin-top: ${({ $mt }) => $mt + 'px'};
`;
const StyledChain = styled.div`
  display: flex;
  gap: 10px;
  color: #fff;
  cursor: pointer;
  align-items: center;
  line-height: 38px;
`;
const ChainLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 8px;
`;
const ChainName = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
const ArrowIconWrapper = styled.div`
  color: #979abe;
`;
const ChainList = styled.div<{ display?: number }>`
  width: 204px;
  border: 1px solid #373a53;
  border-radius: 8px;
  background-color: rgba(55, 58, 83);
  position: absolute;
  top: 38px;
  left: 0px;
  box-sizing: border-box;
  display: ${({ display }) => (display ? 'block' : 'none')};
  z-index: 200;
`;
const ChainItem = styled(StyledChain)<{ active?: number }>`
  padding: 0px 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${({ active }) => active && 'background-color: #ebf479; pointer-events: none;color: #000'}
`;

const Chain = ({
  mt,
  showName = true,
  showChains,
  setShowChains,
}: {
  mt?: number;
  showName?: boolean;
  showChains?: boolean;
  setShowChains?: (show: boolean) => void;
}) => {
  const { chainId } = useAccount();
  const currentChain = useMemo(() => (chainId ? chains[chainId] : null), [chainId]);
  const { switching, switchNetwork } = useSwitchChain();
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    const hideList = () => {
      showName ? setShowChains?.(false) : setShowList(false);
    };
    document.addEventListener('click', hideList);
    return () => {
      document.removeEventListener('click', hideList);
    };
  }, []);

  return (
    <StyledContainer
      $mt={mt}
      $showName={showName ? 1: 0}
      onClick={(ev) => {
        ev.stopPropagation();
        showName ? setShowChains?.(!showChains) : setShowList(!showList);
      }}
    >
      <StyledChain>
        {currentChain && !switching && <ChainLogo src={currentChain.icon} />}
        {switching && <Loading />}
        {showName && (
          <ChainName>{switching ? 'Request' : currentChain ? currentChain.chainName : 'Select Network'}</ChainName>
        )}
      </StyledChain>
      <ArrowIconWrapper>
        <ArrowIcon size={12} />
      </ArrowIconWrapper>
      <ChainList display={showName ? Number(showChains || 0) : Number(showList || 0)}>
        {Object.values(chains).map((chain) => (
          <ChainItem
            key={chain.chainId}
            onClick={() => {
              switchNetwork(chain);
            }}
            active={chain.chainId === currentChain?.chainId ? 1: 0}
          >
            <ChainLogo src={chain.icon} />
            <ChainName>{chain.chainName}</ChainName>
          </ChainItem>
        ))}
      </ChainList>
    </StyledContainer>
  );
};

export default memo(Chain);
