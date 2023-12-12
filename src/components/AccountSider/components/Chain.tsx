import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import Loading from '@/components/Icons/Loading';
import { overlay } from '@/components/animation';
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
  width: 22px;
  height: 22px;
  border-radius: 8px;
`;
const ChainName = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const ArrowIconWrapper = styled.div`
  color: #979abe;
`;
const ChainList = styled.div<{ display?: number }>`
  width: 204px;
  border: 1px solid #373a53;
  border-radius: 12px;
  background-color: #303142;
  position: absolute;
  top: 38px;
  left: 0px;
  box-sizing: border-box;
  display: ${({ display }) => (display ? 'block' : 'none')};
  z-index: 200;
  padding: 12px 0px;
`;
const ChainItem = styled(StyledChain)<{ active?: number }>`
  padding: 0px 10px;
  display: flex;
  alignitems: center;
  justify-content: space-between;
  &:hover {
    background-color: rgba(24, 26, 39, 0.3);
  }
  ${({ active }) => active && 'background-color: rgba(24, 26, 39, 0.3);pointer-events: none;'}
`;
const EmptyChainLogo = styled.div`
  padding-left: 6px;
  position: relative;
`;
const EmptyChainTips = styled(motion.div)`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 44px;
  left: -178px;
  top: -4px;
  .bg {
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .text {
    position: relative;
    z-index: 10;
    color: #979abe;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    width: 147px;
  }
`;
const LogoName = styled(StyledChain)``;

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
  console.log(showName);
  const { chainId } = useAccount();
  const currentChain = useMemo(() => (chainId ? chains[chainId] : null), [chainId]);
  const { switching, switchNetwork } = useSwitchChain();
  const [showList, setShowList] = useState(false);
  const [showEmptyChainTips, setShowEmptyChainTips] = useState(false);
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
      $showName={showName ? 1 : 0}
      onClick={(ev) => {
        ev.stopPropagation();
        showName ? setShowChains?.(!showChains) : setShowList(!showList);
      }}
    >
      <StyledChain>
        {currentChain && !switching && <ChainLogo src={currentChain.icon} />}
        {!currentChain && !switching && (
          <EmptyChainLogo
            onMouseEnter={() => {
              !showName && setShowEmptyChainTips(true);
            }}
            onMouseLeave={() => {
              !showName && setShowEmptyChainTips(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path
                d="M18.3846 20H2.61607C1.55862 20 0.709131 19.5737 0.284885 18.8302C-0.139477 18.0868 -0.0878445 17.1156 0.427057 16.1666L8.38317 1.50385C8.90105 0.547928 9.67117 0 10.4951 0C11.3191 0 12.0885 0.547241 12.6078 1.50232L20.5722 16.1681C21.087 17.1171 21.1403 18.0876 20.7151 18.831C20.2916 19.5744 19.4414 20 18.3846 20ZM10.4959 1.53921C10.2339 1.53921 9.93383 1.80625 9.69057 2.25345L1.73449 16.9177C1.48521 17.3779 1.42685 17.7913 1.57575 18.0521C1.72479 18.3123 2.10415 18.4617 2.61607 18.4617H18.3846C18.8974 18.4617 19.276 18.3131 19.4249 18.0521C19.573 17.792 19.5155 17.3788 19.2655 16.9185L11.3012 2.25343C11.0586 1.80625 10.7571 1.53921 10.4959 1.53921ZM10.5004 13.0566C10.0873 13.0566 9.75202 12.7125 9.75202 12.2869V5.36039C9.75202 4.93552 10.0873 4.59073 10.5004 4.59073C10.9135 4.59073 11.2488 4.93554 11.2488 5.36039V12.2869C11.2488 12.7125 10.9135 13.0566 10.5004 13.0566ZM10.495 16.8186C11.139 16.8186 11.6611 16.2807 11.6611 15.6172C11.6611 14.9538 11.139 14.4159 10.495 14.4159C9.85098 14.4159 9.32889 14.9538 9.32889 15.6172C9.32889 16.2807 9.85098 16.8186 10.495 16.8186Z"
                fill="#979ABE"
              />
            </svg>
            {showEmptyChainTips && (
              <EmptyChainTips className="tips" {...overlay}>
                <svg
                  className="bg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="170"
                  height="44"
                  viewBox="0 0 170 44"
                  fill="none"
                >
                  <path
                    d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5H155C159.142 0.5 162.5 3.85787 162.5 8V14.5858C162.5 14.9836 162.658 15.3651 162.939 15.6464L163.293 15.2929L162.939 15.6464L168.939 21.6464C169.135 21.8417 169.135 22.1583 168.939 22.3536L162.939 28.3536L163.293 28.7071L162.939 28.3536C162.658 28.6349 162.5 29.0164 162.5 29.4142V36C162.5 40.1421 159.142 43.5 155 43.5H8C3.85787 43.5 0.5 40.1421 0.5 36V8Z"
                    fill="#1C1F26"
                    stroke="#272938"
                  />
                </svg>
                <div className="text">Your wallet's current network is unsupported.</div>
              </EmptyChainTips>
            )}
          </EmptyChainLogo>
        )}
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
            active={chain.chainId === currentChain?.chainId ? 1 : 0}
          >
            <LogoName>
              <ChainLogo src={chain.icon} />
              <ChainName>{chain.chainName}</ChainName>
            </LogoName>
            <div>
              {chain.chainId === currentChain?.chainId && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 4.11111L5.28571 8L13 1" stroke="#EBF479" stroke-width="2" stroke-linecap="round" />
                </svg>
              )}
            </div>
          </ChainItem>
        ))}
      </ChainList>
    </StyledContainer>
  );
};

export default memo(Chain);
