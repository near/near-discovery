import type { BigSource } from 'big.js';
import Big from 'big.js';
import { useState } from 'react';
import { styled } from 'styled-components';

import { QuestBridgeModal, QuestGammaModal, QuestSwapModal } from '@/components';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const QuestCardWrapper = styled.div`
  position: relative;

  .delete-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 2px solid #7c7f96;
    width: 16px;
    height: 16px;

    .row-bar {
      width: 75%;
      height: 2px;
      background: #7c7f96;
      border-radius: 6px;
    }
  }

  .delete-icon:hover {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 2px solid #ff61d3;
    width: 16px;
    height: 16px;

    .row-bar {
      width: 75%;
      height: 2px;
      background: #ff61d3;
      border-radius: 6px;
    }
  }

  .quest-card-out {
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 4px; */
    width: 259px;
    border: 1px solid transparent;
    position: relative;
    cursor: pointer;
    .quest-card-inner {
      border-radius: 20px;
      background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      width: 250px;
      height: 108px;
      position: relative;
      text-decoration: none;
      color: #02051e;
      padding: 0px 12px;
      padding-top: 20px;

      .quest-card-name {
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        gap: 4px;
        white-space: nowrap;

        .quest-card-name-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
        }
      }

      .quest-card-info {
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        line-height: 24px;
      }
      .trend-card-execute-mobile {
        display: none;
      }
    }
    .one-click-execution {
      display: none;
      position: absolute;
      margin: 0 14px;
      .click-execution-btn {
        cursor: pointer;
        display: inline-block;
        background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
        color: rgba(30, 32, 40, 1);
        white-space: nowrap;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        border-radius: 8px;
        margin-right: 12px;
        padding: 0 15px;
      }
      .click-execution-arrow {
        cursor: pointer;
        display: inline-block;
        border: 1px solid rgba(236, 244, 136, 1);
        background: linear-gradient(0deg, rgba(24, 26, 39, 0.8), rgba(24, 26, 39, 0.8)),
          linear-gradient(0deg, #ecf488, #ecf488);
        border-radius: 8px;
        width: 32px;
        height: 32px;
        text-align: center;
        align-items: center;
        line-height: 30px;
        img {
          width: 12px;
        }
      }
    }
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
      z-index: 1;
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
      z-index: 30;
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
      .clickExecution-popup-btn {
        display: flex;
        .popup-swap-input {
          width: 70%;
          position: relative;
          input {
            width: 100%;
            height: 48px;
            line-height: 48px;
            background: transparent;
            border: 1px solid rgba(235, 244, 121, 0.2);
            padding-right: 24px;
            border-radius: 12px;
            padding: 16px 56px 16px 16px;
            color: #ffffff;
            background: linear-gradient(0deg, #282a33, #282a33), linear-gradient(0deg, #343743, #343743);
          }
          input:focus {
            outline: none;
            color: #ffffff;
            border: 1px solid rgba(235, 244, 121, 0.2);
            background: none;
          }
          span {
            font-size: 14px;
            color: rgba(151, 154, 190, 1);
            position: absolute;
            right: 12px;
            top: 14px;
          }
        }
        .popup-swap-btn {
          width: 30%;
          margin-left: 12px;
          background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
          height: 48px;
          line-height: 48px;
          text-align: center;
          border-radius: 12px;
          font-size: 16px;
          color: rgba(2, 5, 30, 1);
        }
        .disabled {
          opacity: 0.5;
          cursor: not-allowed;
          width: 100%;
          background: rgb(255, 97, 211);
          color: #ffffff;
        }
      }
    }
  }
  .quest-card-out:hover {
    border: 1px solid rgba(235, 244, 121, 1);
    .one-click-execution {
      display: inline-block;
    }
    .quest-card-inner {
      background: linear-gradient(0deg, rgba(22, 24, 29, 0.8), rgba(22, 24, 29, 0.8)),
        linear-gradient(0deg, #ebf479, #ebf479);
      filter: blur(4px);
    }
  }

  .quest-card-execute-date {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #979abe;
    width: 250px;

    padding: 8px 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .quest-card-show-delete-icon {
      cursor: pointer;
    }
  }

  .quest-card-execute-date-number {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 1000;
  }

  .operation-filed {
    display: flex;
    align-items: center;
    gap: 8px;

    .sticky-top {
      cursor: pointer;
      color: #7c7f96;
      z-index: 0;
      :hover {
        color: #ebf479;
      }
    }
  }

  @media (max-width: 900px) {
    .quest-card-out {
      width: 100%;

      .quest-card-inner {
        background: rgba(55, 58, 83, 0.5);
        width: 100%;
        height: 80px;
        padding: 14px 12px;

        .quest-card-info {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          text-align: left;
        }

        .quest-card-name {
          transform: translateX(-0);
          left: 20px;
          color: rgba(151, 154, 190, 1);
          font-size: 14px;
          img {
            width: 18px;
            height: 18px;
          }
          .quest-card-name-icon {
            width: 18px;
            height: 18px;
          }
        }

        .trend-card-execute-mobile {
          display: inline-block;
          color: #979abe;
          font-size: 12px;
          position: absolute;
          right: 14px;
          bottom: 12px;
          border-bottom: 1px rgba(151, 154, 190, 1) solid;
        }
      }
    }

    .quest-card-execute-date {
      .quest-card-execute-date-number {
        display: none;
      }
      .quest-card-show-delete-icon {
        display: none;
      }
      .quest-card-show-delete-mobile {
        position: absolute;
        top: 16px;
        right: 16px;
      }
    }
    .delete-card {
      font-weight: 500;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(65, 68, 90, 1);
      padding: 28px 12px 18px 12px;
      background: linear-gradient(0deg, #1e202f, #1e202f), linear-gradient(0deg, #41445a, #41445a);
      .delete-card-mobile {
        display: block;
        color: #979abe;
        font-size: 16px;
        margin: 12px 0px;
        font-weight: 500;
        text-align: center;
      }
    }
  }
`;
const iconMap = {
  'native bridge': (
    <img
      className="quest-card-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreigawbz26l7mhfewlxwnjomos6njdkchnfnw2dnb6xtzf7j2t6jdxm"
    />
  ),

  'Pancake Swap': (
    <img
      className="quest-card-name-icon "
      src="https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4"
    />
  ),

  '0vix Lending': (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"
    />
  ),

  '0vix': (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"
    />
  ),
  Gamma: (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa"
    />
  ),
  QuickSwap: (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreibzpvczmrw2jvua3lsuwmvb7ldlztsszbo4dd6jagfsqkk6ub5opa"
    />
  ),
  Balancer: (
    <img
      className="quest-card-name-icon "
      src="https://ipfs.near.social/ipfs/bafkreieg6jpfhxra6c3dspiijg6fj5ga5dpqcn4vmtzdceqa3nheredq5m"
    />
  ),
};
const stickTopIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 4L2 8.52941M8 4L14 8.52941M8 4V15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M1 1H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);
const SwapTokens = [
  {
    address: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
    chainId: 1101,
    symbol: 'WETH',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295',
  },
  {
    address: '0xa2036f0538221a77a3937f1379699f44945018d0',
    chainId: 1101,
    symbol: 'MATIC',
    extra: true,
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
  },
  {
    address: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4',
    chainId: 1101,
    symbol: 'DAI',
    extra: true,
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508',
  },
  {
    address: '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
    chainId: 1101,
    symbol: 'USDC',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  },

  {
    address: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
    chainId: 1101,
    symbol: 'USDT',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663',
  },
  {
    address: '0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1',
    chainId: 1101,
    symbol: 'WBTC',
    decimals: 8,
    extra: true,
    logoURI: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744',
  },
];

enum ModalType {
  SWAP = 'SWAP',
  NATIVE_BRIDGE = 'NATIVE_BRIDGE',
  GAMMA = 'GAMMA',
}

const QuestCard: NextPageWithLayout = (props) => {
  const { isInMoreList, onStickyTop, item, onDelete } = props;
  const [showDelete, setShowDelete] = useState(false);

  const onCancel = () => setShowDelete(false);
  const [balanceLoaded, setBalanceLoaded] = useState(false);
  const [balance, setbalance] = useState('0');
  const [inputValue, setInputValue] = useState('');
  const [outputCurrency, setoutputCurrency] = useState({});
  const [swapping, setSwapping] = useState(false);

  const [showSwap, setShowSwap] = useState(false);
  const [showGamma, setShowGamma] = useState(false);
  const [showNativeBridge, setShowNativeBridge] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();

  let link = '';
  if (!item) {
    return null;
  }
  const arr = item.action_title.split(/\s+/);
  const [action_type, amount, symbol, on, dexName1, dexName2] = arr;
  const isBridge = arr[0].toLowerCase() === 'bridge';
  const isSwap = arr[0].toLowerCase() === 'swap';
  const isSupply = arr[0].toLowerCase() === 'supply';
  const isBorrow = arr[0].toLowerCase() === 'borrow';
  const isRepay = arr[0].toLowerCase() === 'repay';
  const isWithdraw = arr[0].toLowerCase() === 'withdraw';
  const isDeposit = arr[0].toLowerCase() === 'deposit';
  const isWithdrawGamma = isWithdraw && arr?.[3]?.toLowerCase() === 'gamma';
  if (isBridge) {
    link = '/guessme.near/widget/ZKEVMSwap.zkevm-bridge?source=quest-card';
  }
  if (isSwap) {
    link = '/guessme.near/widget/ZKEVMSwap.zkevm-swap?source=quest-card';
  }
  if (isDeposit) {
    link = '/guessme.near/widget/ZKEVM.GAMMA?tab=deposit';
  }
  if (isWithdrawGamma) {
    link = '/guessme.near/widget/ZKEVM.GAMMA?tab=withdraw';
  }
  if (isSupply || (isWithdraw && !isWithdrawGamma)) {
    link = '/bluebiu.near/widget/0vix.Lending?tab=supply';
  }
  if (isBorrow || isRepay) {
    link = '/bluebiu.near/widget/0vix.Lending?tab=borrow';
  }

  const getAmountFromTitle = (title: any) => {
    const arr = title.split(/\s+/);
    const index = arr.findIndex((item: any) => !isNaN(item) || !isNaN(item.substring(1)));
    return index;
  };
  let displayTitle = item.action_title;
  let displayTitles = item.action_title;
  const currencyCodeMatch = displayTitles.match(/\b\s*([A-Za-z]+)\s*on\b/);
  const currencyCode = currencyCodeMatch ? currencyCodeMatch[1] : '';
  const amountIndex = getAmountFromTitle(item.action_title);
  let amountNumber: any;
  if (amountIndex > -1) {
    const arr = item.action_title.split(/\s+/);
    const amount = item.action_title.split(/\s+/)[amountIndex];
    amountNumber = amount;
    displayTitle = (
      <>
        {' '}
        {arr.slice(0, amountIndex).join(' ')}{' '}
        <span
          style={{
            color: '#7C7F96',
          }}
        >
          {amountNumber}{' '}
        </span>{' '}
        {arr.slice(amountIndex + 1, arr.length).join(' ')}
      </>
    );
    displayTitles = (
      <>
        {amountNumber} {currencyCode}
      </>
    );
  }
  const token = SwapTokens.find((item) => item.symbol === currencyCode);
  const handleButtonClick = () => {
    console.info('item.template: ', item.template);
    if (['Pancake Swap', 'QuickSwap', 'Balancer'].includes(item?.template)) {
      setModalType(ModalType.SWAP);
      setShowSwap(true);
    }
    if (item?.template === 'native bridge') {
      setModalType(ModalType.NATIVE_BRIDGE);
      setShowNativeBridge(true);
    }
    if (item?.template === 'Gamma') {
      setModalType(ModalType.GAMMA);
      setShowGamma(true);
    }
  };

  const expandToken = (value: BigSource, decimals: number) => {
    return new Big(value).mul(new Big(10).pow(decimals));
  };

  const isSwapDisabled = balance === '0.0';

  const handleInputChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const handleSwapButtonClick = () => {
    if (!isSwapDisabled) {
      const inputValueAsNumber = parseFloat(inputValue);
      const amountNumberAsNumber = parseFloat(amountNumber);

      if (!isNaN(inputValueAsNumber) && !isNaN(amountNumberAsNumber)) {
        const outputCurrencySymbol =
          item.action_tokens && typeof item.action_tokens === 'string'
            ? parseActionTokens(item.action_tokens).split(' - ')[1]
            : '';

        const outputCurrency = SwapTokens.find((token) => token.symbol === outputCurrencySymbol);

        setSwapping(true);
        setoutputCurrency(outputCurrency || {});
      } else {
        console.error('Invalid input value or amountNumber');
      }
    }
  };

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
  return (
    <QuestCardWrapper>
      <div className={'quest-card-out'}>
        <div
          className="quest-card-inner"
          style={{
            background: isInMoreList ? '#373A53' : '',
            color: isInMoreList ? 'white' : '',
          }}
        >
          <div className="quest-card-info">{displayTitle}</div>
          <div className="quest-card-name">
            {item.template && iconMap[item.template as keyof typeof iconMap]} {item.template}
          </div>
          <div className="trend-card-execute-mobile">{item.count_number} times</div>
        </div>
        <div className="one-click-execution">
          <div className="click-execution-btn" onClick={() => handleButtonClick()}>
            One-Click Execution
          </div>
          <a className="click-execution-arrow" href={link}>
            <img
              src="https://ipfs.near.social/ipfs/bafkreiaintqynrr22hf6vcvvqul7qfwpncvoryt5d4vk6ma4w6bum6rypi"
              alt=""
            />
          </a>
        </div>
      </div>

      <div className="quest-card-execute-date">
        <span className="quest-card-execute-date-number">
          My Execution
          <span>{item.count_number}</span>
        </span>

        <div className="operation-filed">
          {isInMoreList && (
            <div
              className="sticky-top"
              onClick={() => {
                onStickyTop();
              }}
            >
              {stickTopIcon}
            </div>
          )}

          <div
            className="delete-icon"
            onClick={() => {
              onDelete(item.action_id);
            }}
          >
            <div className="row-bar"></div>
          </div>
        </div>
      </div>
      {showSwap && modalType === ModalType.SWAP ? (
        <QuestSwapModal item={item} onCloseModal={() => setShowSwap(false)} />
      ) : null}
      {showNativeBridge && modalType === ModalType.NATIVE_BRIDGE ? (
        <QuestBridgeModal item={item} onCloseModal={() => setShowNativeBridge(false)} />
      ) : null}
      {showGamma && modalType === ModalType.GAMMA ? (
        <QuestGammaModal
          item={item}
          // item={{
          //   pairId: 'USDT-DAI', //gamma pairid
          //   account_id: '0xc25d79fc4970479b88068ce8891ed9be5799210d',
          //   account_info: 'b1fe48f8-a954-4819-8f8b-c64768896bf9',
          //   action_id: 1148,
          //   action_title: 'Deposit USDT-DAI on Gamma',
          //   action_tokens: '["USDT","DAI"]',
          //   count_number: 1,
          //   template: 'Gamma',
          //   timestamp: 1703631952,
          //   token_in_currency: null,
          //   token_out_currency: null,
          // }}
          onCloseModal={() => setShowGamma(false)}
        />
      ) : null}
    </QuestCardWrapper>
  );
};

QuestCard.getLayout = useDefaultLayout;

export default QuestCard;
