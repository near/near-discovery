import { memo, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import useAccount from '@/hooks/useAccount';
import useSwitchChain from '@/hooks/useSwitchChain';
import chains from '@/config/chains';
import Loading from '@/components/Icons/Loading';

const StyledContainer = styled.div<{ mt?: number }>`
  width: 204px;
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
  margin-top: ${({ mt }) => mt + 'px'};
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
const ChainList = styled.div<{ display?: boolean }>`
  width: 204px;
  border: 1px solid #373a53;
  border-radius: 8px;
  background-color: rgba(55, 58, 83);
  position: absolute;
  top: 38px;
  left: 0px;
  box-sizing: border-box;
  display: ${({ display }) => (display ? 'block' : 'none')};
`;
const ChainItem = styled(StyledChain)<{ active?: boolean }>`
  padding: 0px 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${({ active }) => active && 'background-color: #ebf479; pointer-events: none;color: #000'}
`;

const Chain = ({ mt }: { mt?: number }) => {
  const { chainId } = useAccount();
  const currentChain = useMemo(() => (chainId ? chains[chainId] : null), [chainId]);
  const { switching, switchNetwork } = useSwitchChain();
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    const hideList = () => {
      setShowList(false);
    };
    document.addEventListener('click', hideList);
    return () => {
      document.removeEventListener('click', hideList);
    };
  }, []);

  return (
    <StyledContainer
      mt={mt}
      onClick={(ev) => {
        ev.stopPropagation();
        setShowList(!showList);
      }}
    >
      <StyledChain>
        {currentChain && !switching && <ChainLogo src={currentChain.icon} />}
        {switching && <Loading />}
        <ChainName>{switching ? 'Request' : currentChain ? currentChain.chainName : 'Select Network'}</ChainName>
      </StyledChain>
      <ArrowIconWrapper>
        <ArrowIcon size={12} />
      </ArrowIconWrapper>
      <ChainList display={showList}>
        {Object.values(chains).map((chain) => (
          <ChainItem
            key={chain.chainId}
            onClick={() => {
              switchNetwork(chain);
            }}
            active={chain.chainId === currentChain?.chainId}
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
