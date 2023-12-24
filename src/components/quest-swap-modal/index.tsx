import Big from 'big.js';
import { Contract, utils } from 'ethers';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';
import useTokenBalance from '@/hooks/useTokenBalance';

import { dexs, iconMap, SwapTokens, TOKEN_ABI, WETH_ADDRESS } from './const';
import SwapBtn from './swap-btn';

interface IProps {
  item: any;
  onCloseModal: any;
}

const Wrapper = styled.div`
  .one-clickExecution-masklayer {
    background: rgba(22, 24, 29, 1);
    opacity: 0.8;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 3;
  }
  .one-clickExecution-popup {
    width: 450px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 32px;
    background: linear-gradient(0deg, #262836, #262836), linear-gradient(0deg, #373a53, #373a53);
    padding: 20px 30px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    .clickExecution-popup-title {
      margin-bottom: 16px;
      h1 {
        font-size: 26px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        display: inline-block;
        margin: 0;
      }
      img {
        float: right;
        cursor: pointer;
      }
    }
    .clickExecution-popup-content {
      margin-bottom: 20px;
      background: rgba(27, 30, 39, 1);
      border-radius: 12px;
      padding: 22px 12px 1px 12px;
      .popup-content-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 18px;
        img {
          width: 20px;
          height: 20px;
        }
        p {
          color: rgba(151, 154, 190, 1);
          font-size: 14px;
          font-weight: 500;
          margin: 0;
        }
        h1 {
          color: rgba(255, 255, 255, 1);
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
`;
const QuestSwapModal: FC<IProps> = ({ item, onCloseModal }) => {
  //   const [tokenBalance, setTokenBalance] = useState(0);

  //   const { account, provider } = useAccount();

  const parseActionTokens = (actionTokensString: string) => {
    try {
      const actionTokensArray = JSON.parse(actionTokensString);
      if (Array.isArray(actionTokensArray)) {
        return actionTokensArray.join(' - ');
      } else {
        console.error('Parsed action_tokens is not an array');
        return 'Invalid action_tokens';
      }
    } catch (error) {
      console.error('Error parsing action_tokens:', error);
      return 'Invalid action_tokens';
    }
  };

  const displayTitles = item.action_title;

  const currencyCodeMatch = displayTitles.match(/\b\s*([A-Za-z]+)\s*on\b/);

  const currencyCode = currencyCodeMatch ? currencyCodeMatch[1] : '';
  const token = SwapTokens.find((item) => item.symbol === currencyCode);
  const { tokenBalance, isError, isLoading, update } = useTokenBalance(token?.address, token?.decimals);

  //   const getBalance = async (address: string) => {
  //     if (!account || !address) return '';

  //     if (address === 'native') {
  //       const rawBalance = await provider.getBalance(account);
  //       //   console.info(
  //       //     1111111,
  //       //     rawBalance,
  //       //     rawBalance.toString(),
  //       //     utils.formatEther(rawBalance),
  //       //     Big(utils.formatEther(rawBalance)).toFixed(4, 0),
  //       //   );
  //       setTokenBalance(utils.formatEther(rawBalance));
  //     } else {
  //       const TokenContract = new Contract(address, TOKEN_ABI, provider.getSigner());
  //       const rawBalance = await TokenContract.balanceOf(account);
  //       setTokenBalance(utils.formatUnits(rawBalance, token.decimals));
  //     }
  //   };

  //   useEffect(() => {
  //     getBalance(token?.address);
  //     getBalance('native');
  //   }, []);

  return (
    <Wrapper>
      <div className="one-clickExecution-masklayer"></div>
      <div className="one-clickExecution-popup">
        <div className="clickExecution-popup-title">
          <h1>Swap</h1>
          <img
            src="https://ipfs.near.social/ipfs/bafkreif62pul5mxaiz3vnwi63qzxf5g7j6ifjesxmrkx2xjwmpddfiddbq"
            onClick={() => onCloseModal()}
          />
        </div>
        <div className="clickExecution-popup-content">
          <div className="popup-content-item">
            <p>Dapp</p>
            <h1>
              <img src={iconMap[item.template]} style={{ marginRight: '5px' }} />
              {item.template}
            </h1>
          </div>
          <div className="popup-content-item">
            <p>Suggestion</p>
            <h1>{displayTitles}</h1>
          </div>
          <div className="popup-content-item">
            <p>Your balance</p>
            <h1>
              {tokenBalance ? Big(tokenBalance).toFixed(4, 0) : ''} {currencyCode}
            </h1>
          </div>
          <div className="popup-content-item">
            <p>Swap pair</p>
            {item.action_tokens && typeof item.action_tokens === 'string' && (
              <h1>{parseActionTokens(item.action_tokens)}</h1>
            )}
          </div>
        </div>
        <SwapBtn
          title={item.template}
          uniType={dexs[item?.template].uniType}
          currencyCode={currencyCode}
          inputCurrency={{
            address: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4', //TODO
            symbol: 'DAI', //TODO,
            decimals: 18, //TODO
          }}
          inputCurrencyAmount={item.action_amount}
          maxInputBalance={tokenBalance}
          outputCurrency={{
            address: 'native', //TODO
            symbol: 'ETH', //TODO
            decimals: 18, //TODO
          }}
          routerAddress={dexs[item?.template].routerAddress}
          wethAddress={WETH_ADDRESS}
          //   amountOutFn= {"guessme.near/widget/ZKEVMSwap.swap-quoter"}
          //   handlerV2="guessme.near/widget/ZKEVMSwap.swap-handler"
          outputCurrencyAmount={1} //TODO
          noPair={false}
          token={token}
          updateBalance={update}
        />
        {/* <Widget
        src="guessme.near/widget/ZKEVMWarmUp.quest-modal-swap-btn"
        props={{

          title: item.template,
          add: false,
          uniType: dexs[item?.template].uniType,
          currencyCode,
          inputCurrency: {
            address: "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4", //TODO
            symbol: "", //TODO,
            decimals: 8, //TODO
          },
          inputCurrencyAmount: item.action_amount,
          maxInputBalance: balance,
          outputCurrency: {
            address: "native", //TODO
            symbol: "", //TODO
          },
          routerAddress: dexs[item?.template].routerAddress,
          wethAddress: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
          amountOutFn: "guessme.near/widget/ZKEVMSwap.swap-quoter",
          handlerV2: "guessme.near/widget/ZKEVMSwap.swap-handler",
          outputCurrencyAmount: 1, //TODO
          noPair: false,
        }}
      /> */}
      </div>
    </Wrapper>
  );
};

export default QuestSwapModal;
