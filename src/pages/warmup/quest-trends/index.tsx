import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { QUEST_PATH } from '@/config/quest';
import { useDefaultLayout } from '@/hooks/useLayout';
import { get } from '@/utils/http';
import type { NextPageWithLayout } from '@/utils/types';

const QuestTrendsPage = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 17px;
  flex-wrap: wrap;
  a {
    text-decoration: none;
  }

  .trend-card {
    cursor: pointer;
    width: 240px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 108px;
    background: linear-gradient(0deg, rgba(55, 58, 83, 0), rgba(55, 58, 83, 1));
    gap: 8px;
    padding: 0px 12px;

    :hover {
      text-decoration: none;
      .trend-card-dapp-name-text {
        color: #979abe;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
      }
    }
    .trend-card-text {
      color: white;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: center;
      vertical-align: middle;
      height: 50px;
      .trend-card-text-number {
        color: #979abe;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        padding-left: 4px;
        padding-right: 4px;
      }
    }

    .trend-card-dapp-name {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #979abe;
      width: 100%;
      gap: 6px;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;

      .trend-card-dapp-name-icon {
        width: 26px;
        height: 26px;
        border-radius: 8px;
      }

      .trend-card-dapp-name-text {
        color: #979abe;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
      }
    }
  }

  .trend-card-execute-mobile {
    display: none;
  }

  .trend-card-execute-date {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #5e617e;
    width: 240px;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 900px) {
    .trend-card {
      width: 100%;
      height: auto;
      align-items: start;
      padding: 12px 14px;
      position: relative;
      .trend-card-text {
        height: auto;
        margin-bottom: 6px;
        text-align: left;
        font-size: 16px;
      }
      .trend-card-dapp-name {
        display: inline-block;
        font-size: 14px;
      }
      .trend-card-execute-mobile {
        display: inline-block;
        color: #979abe;
        font-size: 12px;
        position: absolute;
        right: 14px;
        bottom: 12px;
      }
    }
    .trend-card-execute-date {
      display: none;
    }
  }
`;
const iconMap = {
  'Pancake Swap': (
    <img
      className="trend-card-dapp-name-icon"
      src="https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4"
    />
  ),

  '0vix Lending': (
    <img
      className="trend-card-dapp-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"
    />
  ),

  '0vix': (
    <img
      className="trend-card-dapp-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"
    />
  ),

  Gamma: (
    <img
      className="trend-card-dapp-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa"
    />
  ),
  'native bridge': (
    <img
      className="trend-card-dapp-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreigawbz26l7mhfewlxwnjomos6njdkchnfnw2dnb6xtzf7j2t6jdxm"
    />
  ),

  'ETH-Polygon zkEVM Bridge': (
    <img
      className="trend-card-dapp-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreigawbz26l7mhfewlxwnjomos6njdkchnfnw2dnb6xtzf7j2t6jdxm"
    />
  ),

  'Polygon zkEVM Dex': (
    <img
      className="trend-card-dapp-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreicahuzb3ikvxml6qrns3zijfddhwgbttqkb3t6ltq5t64k2mduiem"
    />
  ),
  QuickSwap: (
    <img
      className="trend-card-dapp-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreibzpvczmrw2jvua3lsuwmvb7ldlztsszbo4dd6jagfsqkk6ub5opa"
    />
  ),
  Balancer: (
    <img
      className="trend-card-dapp-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreieg6jpfhxra6c3dspiijg6fj5ga5dpqcn4vmtzdceqa3nheredq5m"
    />
  ),
};
const SwapTokens = [
  {
    address: '0x0000000000000000000000000000000000000000',
    chainId: 1101,
    symbol: 'ETH',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
  },

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

const QuestTrends: NextPageWithLayout = () => {
  const [questTrends, setQuestTrends] = useState<any[]>([]);
  useEffect(() => {
    const fetchQuestTrends = async () => {
      try {
        const resultQuestTrends = await get(`${QUEST_PATH}/api/action/get-special-action`);
        if (resultQuestTrends.code === 0) {
          resultQuestTrends.data[0].action_title = 'Bridge 0.01 ETH to Polygon zkEVM';

          resultQuestTrends.data[0].action_amount = '0.01';

          resultQuestTrends.data[0].template = 'ETH-Polygon zkEVM Bridge';

          resultQuestTrends.data[1].action_title = 'Swap 0.01 ETH to USDC on QuickSwap';

          resultQuestTrends.data[1].action_amount = '0.01';

          resultQuestTrends.data[1].template = 'Polygon zkEVM Dex';

          resultQuestTrends.data[2].action_title = 'Supply 0.01 ETH on 0vix';

          resultQuestTrends.data[2].action_amount = '0.01';

          resultQuestTrends.data[2].template = '0vix Lending';

          resultQuestTrends.data[3].template = 'Gamma';
        }
        setQuestTrends(resultQuestTrends.data || []);
      } catch (error) {
        console.error('Error fetching resultNetwork data:', error);
      }
    };
    setTimeout(() => {
      fetchQuestTrends();
    }, 100);
  }, []);
  function formatTitle(title: string) {
    const regex = /\b\d+(\.\d+)?\b/g;
    const newTitle = title.replace(regex, (match) => `<span style="color:gray">${match}</span>`);
    return <div dangerouslySetInnerHTML={{ __html: newTitle }} />;
  }

  function getLink(action_title: string) {
    let link = '';
    const arr = action_title.split(/\s+/);

    const [action_type, amount, symbol, on, dexName1, dexName2] = arr;

    const isBridge = arr[0].toLowerCase() === 'bridge';
    const isSwap = arr[0].toLowerCase() === 'swap';
    const isBorrow = arr[0].toLowerCase() === 'borrow';
    const isRepay = arr[0].toLowerCase() === 'repay';
    const isSupply = arr[0].toLowerCase() === 'supply';
    const isWithdraw = arr[0].toLowerCase() === 'withdraw';
    const isDeposit = arr[0].toLowerCase() === 'deposit';
    const isWithdrawGamma = isWithdraw && arr?.[3]?.toLowerCase() === 'gamma';

    if (isBridge) {
      link = '/guessme.near/widget/ZKEVMSwap.zkevm-bridge?source=trend';
    }
    if (isSwap) {
      link = '/guessme.near/widget/ZKEVMSwap.zkevm-swap?source=trend';
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

    return link;
  }

  return (
    <QuestTrendsPage>
      <>
        {questTrends &&
          questTrends.map((item, index) => {
            return (
              <div key={index}>
                <div className="trend-card-out">
                  <a className="trend-card" href={getLink(item.action_title)}>
                    <div className="trend-card-text"> {formatTitle(item.action_title)}</div>
                    <div className="trend-card-dapp-name">
                      {item.template && iconMap[item.template as keyof typeof iconMap]} {item.template}
                    </div>
                  </a>
                </div>
                <div className="trend-card-execute-date">
                  <div>Total Execution</div>
                  <div>{item.count_number}</div>
                </div>
              </div>
            );
          })}
      </>
    </QuestTrendsPage>
  );
};

QuestTrends.getLayout = useDefaultLayout;

export default QuestTrends;
