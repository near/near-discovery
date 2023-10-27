import Big from 'big.js';
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, YAxis } from 'recharts';
import styled from 'styled-components';

import {
  AllNetWorkTab,
  ChartDataWrapper,
  CheckBox,
  DiffWrapper,
  HoldingTable,
  HoldingTableWrapper,
  HoldingTitle,
  NetWorkTab,
  NetworkTabWrapper,
  NoAssetText,
  NoAssetWrapper,
  PortfolioTabs,
  Profile,
  ProtocolArrowWrapper,
  ProtocolCard,
  ProtocolSelectBox,
  ProtocolTable,
  SortArrowDownWrapper,
  TotalBalanceWrapper,
  Wrapper,
  YourAssetsTitle,
  DefaultProfileIcon,
} from '@/components/portfolio';
import { NoDataLayout } from '@/components/portfolio/common';
import { IconSeries } from '@/components/portfolio/icons';
import {
  AllNetWorkIcon,
  ArrowDone,
  MetaMaskIcon,
  NoAssetsIcon,
  ProtocolArrowDown,
  sortArrowDown,
} from '@/components/portfolio/imgs';
import { VmComponent } from '@/components/vm/VmComponent';
import useEthersSender from '@/hooks/useEthersSender';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { AllChainBalanceInterface } from '@/hooks/usePortfolioService';
import { useNetCurve24h, useSenderPortfolioData, useTotalBalance } from '@/hooks/usePortfolioService';
import {
  formateAddress,
  formateValue,
  formateValueWithThousandSeparator,
  formateValueWithThousandSeparatorAndFont,
} from '@/utils/formate';
import type { NextPageWithLayout } from '@/utils/types';

import { CheckDot } from '../components/portfolio/index';

const DEFAULT_TOKEN_ICON = 'https://ipfs.near.social/ipfs/bafkreiddol6jzrlwliyh2vrjk3u2ajp3z5cubb5gzedifearly2bvdraay';

const ExecutionRecords = () => {
  return <VmComponent src="bluebiu.near/widget/ZKEVM.ExecuteRecords"></VmComponent>;
};

const PortfolioDailyData = ({ totalBalance }: { totalBalance: number | undefined }) => {
  const ChartContainer = styled.div`
    color: #fff;
    width: 425px;
    height: 120px;
  `;

  const { netCurve24h, diff } = useNetCurve24h();

  if (!netCurve24h || !diff || totalBalance === undefined) return <></>;

  const data = netCurve24h;

  return (
    <ChartContainer
      style={{
        position: 'relative',
      }}
    >
      <ChartDataWrapper>
        <TotalBalanceWrapper>
          <span className="format-decimals">
            $
            <span className="integer-part">
              {formateValueWithThousandSeparatorAndFont(totalBalance || 0, 4).integer}
            </span>
            <span className="decimal-part">
              {formateValueWithThousandSeparatorAndFont(totalBalance || 0, 4).decimal}
            </span>
          </span>
        </TotalBalanceWrapper>

        <DiffWrapper dir={diff.dir}>{diff.value}</DiffWrapper>
      </ChartDataWrapper>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={200}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(99, 195, 65, 0.1)" />
              <stop offset="50%" stopColor="rgba(99, 195, 65, 0)" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="transparent" />
          <YAxis width={0} axisLine={false} tick={false} tickLine={false} domain={['dataMin', 'dataMax']} />
          <Area
            height={100}
            width={425}
            type="linear"
            dataKey="usd_value"
            stroke="#63C341"
            fill="url(#gradient)"
            min={Math.min(...data.map((item) => item.usd_value))}
            max={Math.max(...data.map((item) => item.usd_value))}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

type colorKeyEnums = 'default' | 'Staked' | 'Deposit' | 'Liquidity Pool' | 'Lending';

const colorConfig = {
  default: {
    titleColor: '#ACFCED',
    titleBg: 'rgba(172,252,237,0.3)',
  },

  Staked: {
    titleColor: '#ACFCED',
    titleBg: 'rgba(172,252,237,0.3)',
  },

  Deposit: {
    titleColor: '#ACFCED',
    titleBg: 'rgba(172,252,237,0.3)',
  },

  'Liquidity Pool': {
    titleColor: '#4594FF',
    titleBg: 'rgba(86,150,236,0.3)',
  },
  Lending: {
    titleColor: '#FFBF19',
    titleBg: 'rgba(255,191,25,0.3)',
  },
};

const ChainList = ['op', 'eth', 'metis', 'era', 'bsc', 'base', 'mnt', 'avax', 'pze', 'matic', 'xdai', 'linea', 'arb'];

const useAllPorfolioDataList = (allChainsBalance: AllChainBalanceInterface) => {
  const [sortBy, setSortBy] = useState<'usd_value' | 'price' | 'amount'>('usd_value');

  const data = useSenderPortfolioData();
  console.log('data: ', data);

  const { allChainList, allTokenList, protocolList } = data;

  const allChainListSupported = allChainList.filter((item) => ChainList.includes(item.id));

  const allChainMap = allChainList.reduce((pre, cur) => {
    return {
      ...pre,
      [cur.id]: cur,
    };
  }, {}) as any;

  const supportedChainList: any[] = [];

  allChainListSupported.forEach((chain) => {
    const this_chain_value = allChainsBalance.chain_list.find((chain_info) => {
      return chain_info.id === chain.id;
    });

    if (this_chain_value) {
      supportedChainList.push({
        ...this_chain_value,
        ...chain,
      });
    }
  });

  const totalUsdValueOfSupportedChains = supportedChainList.reduce((total, item) => total + item.usd_value, 0);

  const supportedChainsWithPercentage = supportedChainList.map((chain) => {
    return {
      ...chain,
      percentage: Big((chain.usd_value / totalUsdValueOfSupportedChains) * 100).toFixed(2),
    };
  });

  const parsedAllTokenList = allTokenList
    .map((token) => {
      return {
        ...token,
        chain_info: allChainMap[token.chain],
        usd_value: token.price * token.amount,
      };
    })
    .sort((a, b) => {
      // depend on sortBy, sort it

      if (sortBy === 'amount') {
        return b.amount - a.amount;
      } else if (sortBy === 'price') {
        return b.price - a.price;
      } else {
        return b.usd_value - a.usd_value;
      }
    });

  const parsedProtocolList = protocolList.map((protocol: any) => {
    const protocolNetUsdValue = protocol.portfolio_item_list.reduce(
      (total: number, item: any) => total + item.stats.net_usd_value,
      0,
    ) as number;

    const protocolRewardUsdValue = protocol.portfolio_item_list.reduce((total: number, item: any) => {
      const itemDetail = item.detail as any;

      if (!itemDetail.reward_token_list) {
        return total;
      } else {
        const reward_token_list = itemDetail.reward_token_list as any[];

        const total_reward_this_item = reward_token_list.reduce(
          (total, reward_item) => total + reward_item.price * reward_item.amount,
          0,
        );

        return total + total_reward_this_item;
      }
    }, 0);

    const protocol_usd_value = protocolNetUsdValue + protocolRewardUsdValue;

    return {
      ...protocol,
      protocol_usd_value,
      protocolRewardUsdValue,
      protocolNetUsdValue,
      chain_info: allChainMap[protocol.chain],
    };
  });

  return {
    parsedAllTokenList,
    supportedChainList: supportedChainsWithPercentage,
    allChainsBalance,
    sortBy,
    setSortBy,
    parsedProtocolList,
    totalUsdValueOfSupportedChains,
  };
};

const WalletComponent = (props: any) => {
  const {
    parsedAllTokenList,
    supportedChainList,
    totalUsdValueOfSupportedChains,
    allChainsBalance,
    setSortBy,
    sortBy,
    filterFunc,
  } = props.data;

  const value_all = parsedAllTokenList.filter(filterFunc).reduce((pre: any, cur: any) => {
    return pre.plus(cur.price * cur.amount);
  }, Big(0));

  const displayAllTokenList = parsedAllTokenList.filter(filterFunc);

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const [isHide, setIsHide] = useState<boolean>(true);

  const hasData = displayAllTokenList.length > 0;

  return (
    <>
      <HoldingTitle>
        <div className="holding-text">Holding</div>

        <div className="frcs">
          <div className="holding-value">
            <span className="format-decimals">
              $
              <span className="integer-part">
                {formateValueWithThousandSeparatorAndFont(value_all.toFixed(), 4).integer}
              </span>
              <span className="decimal-part">
                {formateValueWithThousandSeparatorAndFont(value_all.toFixed(), 4).decimal}
              </span>
            </span>
          </div>

          <div
            className="asset-function-button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpenOptions((b) => !b);
            }}
          >
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />

            {openOptions && (
              <ProtocolSelectBox
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <div className="function-item">
                  <div>Hide</div>
                  <div className="minimum-value-box">{'< $0.1'}</div>

                  <CheckBox
                    active={isHide}
                    onClick={() => {
                      setIsHide((h) => !h);
                    }}
                  >
                    <div></div>
                  </CheckBox>
                </div>
              </ProtocolSelectBox>
            )}
          </div>
        </div>
      </HoldingTitle>

      <HoldingTableWrapper>
        <HoldingTable>
          <thead>
            <tr>
              <th>Token</th>

              <th>
                <div
                  className="frcs-gm"
                  onClick={() => {
                    setSortBy('price');
                  }}
                >
                  <span>Price</span>{' '}
                  <SortArrowDownWrapper active={sortBy === 'price'}> {sortArrowDown} </SortArrowDownWrapper>{' '}
                </div>{' '}
              </th>

              <th>
                <div
                  className="frcs-gm"
                  onClick={() => {
                    setSortBy('amount');
                  }}
                >
                  <span>Amount</span>{' '}
                  <SortArrowDownWrapper active={sortBy === 'amount'}> {sortArrowDown} </SortArrowDownWrapper>{' '}
                </div>{' '}
              </th>

              <th>
                <div
                  className="frcs-gm"
                  onClick={() => {
                    setSortBy('usd_value');
                  }}
                >
                  <span>USD value</span>{' '}
                  <SortArrowDownWrapper active={sortBy === 'usd_value'}> {sortArrowDown} </SortArrowDownWrapper>{' '}
                </div>{' '}
              </th>
            </tr>
          </thead>

          <tbody>
            {displayAllTokenList.map((token: any) => {
              if (isHide && token.usd_value < 0.1) return <></>;

              return (
                <tr key={token.id}>
                  <td>
                    <div className="frcs token-info">
                      <img src={token.logo_url || DEFAULT_TOKEN_ICON} className="token-icon" />

                      <div>
                        <div className="token-symbol">{token.symbol}</div>

                        <div className="chain-info">
                          <img src={token?.chain_info?.logo_url || ''} className="chain-icon" />

                          <div className="chain-name"> {token.chain_info?.name} </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{formateValue(token.price, 2)}</td>
                  <td>{formateValue(token.amount, 4)}</td>
                  <td>${formateValueWithThousandSeparator(token.usd_value, 4)}</td>
                </tr>
              );
            })}
          </tbody>
        </HoldingTable>

        {!hasData && <NoDataLayout></NoDataLayout>}
      </HoldingTableWrapper>
    </>
  );
};

const ProtocolComponent = (props: any) => {
  const {
    parsedAllTokenList,
    parsedProtocolList,
    supportedChainList,
    allChainsBalance,
    setSortBy,
    sortBy,
    filterFunc,
  } = props.data;

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const [isHide, setIsHide] = useState<boolean>(true);

  const [isExpand, setIsExpand] = useState<boolean>(false);

  const displayProtocolList = parsedProtocolList.filter(filterFunc);
  console.log('displayProtocolList: ', displayProtocolList);

  return (
    <>
      <YourAssetsTitle>
        <div className="assets-text">Your Assets & Positions</div>

        <div
          className="asset-function-button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpenOptions((b) => !b);
          }}
        >
          <div className="dot" />

          <div className="dot" />

          <div className="dot" />

          {openOptions && (
            <ProtocolSelectBox
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <div className="function-item">
                <div>Hide</div>

                <div className="minimum-value-box">{'< $0.1'}</div>

                <CheckBox
                  active={isHide}
                  onClick={() => {
                    setIsHide((h) => !h);
                  }}
                >
                  <div></div>
                </CheckBox>
              </div>

              <div className="function-item" style={{ gap: '28px' }}>
                <div
                  className="frcs"
                  onClick={() => {
                    setIsExpand(false);
                  }}
                >
                  <CheckDot active={!isExpand}>
                    <div />
                  </CheckDot>

                  <div>Collapse</div>
                </div>

                <div
                  className="frcs"
                  onClick={() => {
                    setIsExpand(true);
                  }}
                >
                  <CheckDot active={isExpand}>
                    <div />
                  </CheckDot>
                  <div>Expand</div>
                </div>

                {/* <CheckBox active={isExpand}>
                  <div
                    onClick={() => {
                      setIsExpand((h) => !h);
                    }}
                  ></div>
                </CheckBox> */}
              </div>
            </ProtocolSelectBox>
          )}
        </div>
      </YourAssetsTitle>

      {displayProtocolList.map((protocol: any, index: number) => {
        return (
          <ProtocolItem
            isHide={isHide}
            isExpand={isExpand}
            protocolItem={protocol}
            key={'protocol-' + index}
          ></ProtocolItem>
        );
      })}
      <div
        style={{
          position: 'relative',
        }}
      >
        {displayProtocolList.length === 0 && <NoDataLayout shrink={true}></NoDataLayout>}
      </div>
    </>
  );
};

const ProtocolTableGenerator = ({
  columns,
  rows,
  name,
  showTitle,
}: {
  columns: string[];
  rows: (JSX.Element | string)[][];
  name: colorKeyEnums;
  showTitle: boolean;
}) => {
  return (
    <ProtocolTable
      titleColor={(colorConfig[name] || colorConfig['default']).titleColor}
      titleBg={(colorConfig[name] || colorConfig['default']).titleBg}
    >
      <div className="type-title">{name}</div>

      <table>
        <thead>
          <tr>
            {columns.map((column, index) => {
              return <th key={column + index}>{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index + '-row-tr' + index}>
                {row.map((item, index) => {
                  if (item === 'omit') return <></>;
                  return <td key={index + 'row-td'}>{item}</td>;
                })}
              </tr>
            );
          })}
        </tbody>{' '}
      </table>
    </ProtocolTable>
  );
};

const ProtocolItem = (props: any) => {
  const { isExpand, protocolItem, isHide } = props;

  const [thisCardExpand, setThisCardExpand] = useState<boolean>(false);

  useEffect(() => {
    setThisCardExpand(isExpand);
  }, [isExpand]);

  const groupedPortfolioItemList = protocolItem.portfolio_item_list.reduce((pre: any, cur: any) => {
    const name = cur.name;

    if (!pre[name]) {
      pre[name] = [];
    }

    pre[name].push(cur);

    return pre;
  }, {});

  const checkHideValue = (value: number) => {
    return isHide && value < 0.01;
  };

  if (!protocolItem.chain_info) return <></>;

  return (
    <ProtocolCard>
      <div className="protocol-title">
        <div className="title-filed">
          <div className="icon-filed">
            <img className="protocol-icon" src={protocolItem.logo_url || ''} />
            <img className="chain-icon " src={protocolItem.chain_info?.logo_url || ''} />
          </div>

          <div>
            <div className="protocol-name">{protocolItem.name}</div>

            <div className="chain-name">{protocolItem.chain_info.name}</div>
          </div>
        </div>

        <div className="value-filed">
          <span className="format-decimals">
            <span
              className="integer-part"
              style={{
                fontSize: '24px',
              }}
            >
              ${formateValueWithThousandSeparatorAndFont(protocolItem.protocol_usd_value, 4).integer}
            </span>
            <span
              className="decimal-part"
              style={{
                fontSize: '18px',
              }}
            >
              {formateValueWithThousandSeparatorAndFont(protocolItem.protocol_usd_value, 4).decimal}
            </span>
          </span>

          <ProtocolArrowWrapper
            onClick={() => {
              setThisCardExpand((b) => !b);
            }}
            isExpand={thisCardExpand}
          >
            {ProtocolArrowDown}
          </ProtocolArrowWrapper>
        </div>
      </div>

      {thisCardExpand &&
        Object.entries(groupedPortfolioItemList).map(([name, itemList]: [string, any], index: number) => {
          const renderList = [];

          if (name === 'Lending') {
            const item = itemList[0];

            const { supply_token_list, reward_token_list, borrow_token_list } = item.detail;

            if (supply_token_list && supply_token_list.length > 0) {
              renderList.push(
                <ProtocolTableGenerator
                  name={name}
                  showTitle={false}
                  columns={['Supplied', 'Balance', 'USD Value']}
                  rows={supply_token_list.map((token: any) => {
                    if (checkHideValue(token.amount * token.price)) return ['omit', 'omit', 'omit'];

                    return [
                      <div className="frcs" key={token.id}>
                        <img className="token-icon" src={token.logo_url || ''} />
                        <div className="token-name">{token.name}</div>
                      </div>,
                      formateValue(token.amount, 4),
                      formateValueWithThousandSeparator(token.amount * token.price, 4),
                    ];
                  })}
                ></ProtocolTableGenerator>,
              );
            }

            if (reward_token_list && reward_token_list.length > 0) {
              const rows = reward_token_list.map((token: any) => {
                if (checkHideValue(token.amount * token.price)) return false;

                return [
                  <div className="frcs" key={token.id}>
                    <img className="token-icon" src={token.logo_url || ''} />
                    <div className="token-name">{token.name}</div>
                  </div>,
                  formateValue(token.amount, 4),
                  formateValueWithThousandSeparator(token.amount * token.price, 4),
                ];
              });

              const displayRows = rows.filter((row: any) => row !== false);

              if (displayRows.length > 0) {
                renderList.push(
                  <ProtocolTableGenerator
                    name={name}
                    showTitle={false}
                    columns={['Rewards', 'Balance', 'USD Value']}
                    rows={displayRows}
                  ></ProtocolTableGenerator>,
                );
              }
            }

            if (borrow_token_list && borrow_token_list.length > 0) {
              renderList.push(
                <ProtocolTableGenerator
                  name={name}
                  showTitle={false}
                  columns={['Borrowed', 'Balance', 'USD Value']}
                  rows={borrow_token_list.map((token: any) => {
                    if (checkHideValue(token.amount * token.price)) return ['omit', 'omit', 'omit'];
                    return [
                      <div className="frcs" key={token.id}>
                        <img className="token-icon" src={token.logo_url || ''} />
                        <div className="token-name">{token.name}</div>
                      </div>,
                      formateValue(token.amount, 4),
                      `$${formateValueWithThousandSeparator(token.amount * token.price, 4)}`,
                    ];
                  })}
                />,
              );
            }
          }

          if (name === 'Liquidity Pool' || name === 'Staked' || name === 'Deposit') {
            const rows = itemList.map((item: any) => {
              const { supply_token_list, reward_token_list } = item.detail;

              const tokenSeries = (
                <div className={` ${name === 'Deposit' ? 'frcs' : 'fccc'}  token-series`}>
                  <IconSeries ulrs={supply_token_list.map((token: any) => token.logo_url || '')} />

                  <span className="symbo-series">
                    {supply_token_list.map((token: any, index: number) => (
                      <span key={'token-series-' + index}>{(index === 0 ? '' : '+') + token.symbol}</span>
                    ))}
                  </span>
                </div>
              );

              const balanceList = (
                <div className="fccc">
                  {supply_token_list.map((token: any) => {
                    return (
                      <div className="frcs balance-value" key={token.id + token.chain}>
                        <span>{formateValue(token.amount, 4)}</span>
                        <span>{token.symbol}</span>
                      </div>
                    );
                  })}
                </div>
              );

              const rewardList = !reward_token_list ? (
                'omit'
              ) : (
                <div className="fccc">
                  {reward_token_list.map((token: any) => {
                    return (
                      <div className="frcs reward-item" key={token.id + token.chain}>
                        {`${formateValue(token.amount, 4)} ${token.symbol} $(${formateValueWithThousandSeparator(
                          token.amount * token.price,
                          4,
                        )})`}
                      </div>
                    );
                  })}
                </div>
              );

              const usd_value = `$${formateValueWithThousandSeparator(item.stats.net_usd_value, 4)}`;

              if (checkHideValue(item.stats.net_usd_value)) return ['omit', 'omit', 'omit', 'omit'];

              return [tokenSeries, balanceList, rewardList, usd_value];
            });

            let columns = ['Position', 'Balance', 'Rewards', 'USD value'];

            // check if all rewars omit or not in rows

            const allRewardsOmit = rows.every((row: any) => row[2] === 'omit');

            if (allRewardsOmit) {
              columns = ['Position', 'Balance', 'USD value'];
            }

            if (rows.length > 0) {
              renderList.push(
                <ProtocolTableGenerator
                  name={name}
                  showTitle={false}
                  columns={columns}
                  rows={rows}
                ></ProtocolTableGenerator>,
              );
            }
          }

          if (renderList.length > 0) {
            return renderList.map((renderItem: any, index: number) => {
              return <>{renderItem}</>;
            });
          }

          return <></>;
        })}
    </ProtocolCard>
  );
};

const PortFolioDataArea = ({
  totalBalance,
  allChainsBalance,
}: {
  totalBalance: number | undefined;
  allChainsBalance: AllChainBalanceInterface;
}) => {
  const [CurTab, setCurTab] = useState<'Wallet' | 'Protocol' | 'Execution Records'>('Wallet');

  const [network, setNetwork] = useState<string>('all');

  const data = useAllPorfolioDataList(allChainsBalance);

  const {
    parsedAllTokenList,
    parsedProtocolList,
    totalUsdValueOfSupportedChains,
    supportedChainList,
    sortBy,
    setSortBy,
  } = data;

  const filterFunc = (token: any) => {
    return network === 'all' || token.chain === network;
  };

  return (
    <>
      <PortfolioTabs>
        {['Wallet', 'Protocol', 'Execution Records'].map((tab) => {
          const isActive = tab === CurTab.toString();
          return (
            <div
              key={tab}
              className={`item ${isActive ? 'active' : ''}`}
              onClick={() => {
                setCurTab(tab as 'Wallet' | 'Protocol' | 'Execution Records');
              }}
            >
              {tab}

              {isActive && <div className="active-bar"></div>}
            </div>
          );
        })}
      </PortfolioTabs>

      {CurTab !== 'Execution Records' && (
        <NetworkTabWrapper>
          <AllNetWorkTab
            active={network === 'all'}
            onClick={() => {
              setNetwork('all');
            }}
          >
            {AllNetWorkIcon}

            <div>
              <div className="network-name">All Networks</div>
              <div className="usd-value">${formateValueWithThousandSeparator(totalUsdValueOfSupportedChains, 4)}</div>
            </div>
          </AllNetWorkTab>

          {supportedChainList.map((chain) => {
            return (
              <NetWorkTab
                active={network === chain.id}
                key={chain.community_id}
                onClick={() => {
                  setNetwork(chain.id);
                }}
                className="frcs-gm"
              >
                {chain.logo_url ? (
                  <img className="network-icon-chain" src={chain.logo_url} />
                ) : (
                  <div className="default-icon network-icon">{chain.name[0]}</div>
                )}

                <div>
                  <div className="network-name">{chain.name}</div>

                  <div className="value-filed frcs-gm">
                    <div className="usd-value">${formateValueWithThousandSeparator(chain.usd_value, 2)}</div>
                    <div className="usd-value-percent">{chain.percentage}%</div>
                  </div>
                </div>
              </NetWorkTab>
            );
          })}
        </NetworkTabWrapper>
      )}

      {CurTab === 'Wallet' && (
        <WalletComponent
          data={{
            ...data,
            network,
            filterFunc,
          }}
        ></WalletComponent>
      )}

      {CurTab === 'Protocol' && (
        <ProtocolComponent
          data={{
            ...data,
            network,
            filterFunc,
          }}
        ></ProtocolComponent>
      )}

      {CurTab === 'Execution Records' && <ExecutionRecords></ExecutionRecords>}
    </>
  );
};

const PortfolioPage: NextPageWithLayout = () => {
  const { sender, wallet, provider, connect } = useEthersSender();

  const { totalBalance, allChainsBalance } = useTotalBalance();

  return (
    <Wrapper>
      <div className="frcb-start">
        <Profile className="frcs">
          <DefaultProfileIcon></DefaultProfileIcon>

          <div className="">
            <div className="address-filed ">
              <span>{formateAddress(sender)}</span>
              {/* <div className="arrow-filed frcc">{ArrowDone}</div> */}
            </div>

            <div className="frcs metamask-filed">
              {MetaMaskIcon}
              <span>MetaMask</span>
            </div>
          </div>
        </Profile>

        <PortfolioDailyData totalBalance={totalBalance}></PortfolioDailyData>
      </div>

      <PortFolioDataArea totalBalance={totalBalance} allChainsBalance={allChainsBalance}></PortFolioDataArea>
    </Wrapper>
  );
};

PortfolioPage.getLayout = useDefaultLayout;

export default PortfolioPage;
