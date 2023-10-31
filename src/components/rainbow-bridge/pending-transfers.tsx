import { act, checkStatusAll, get, type Transfer } from '@near-eth/client';
import { Status } from '@near-eth/client/dist/statuses';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ethIcon, nearIcon } from './icons';
import { formateDate, shrinkToken } from './utils';
import { tokenList } from './config';
import { SMALL_SCREEN } from '../near/NearStyleVar';

const IconRight = (
  <svg width="14" height="5" viewBox="0 0 14 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.0185 4.66665H0.981563C0.439 4.66665 4.29153e-05 4.2763 4.29153e-05 3.79381C4.29153e-05 3.31133 0.439 2.92098 0.981563 2.92098H10.6356L9.02696 1.49049C8.64254 1.14863 8.64254 0.595833 9.02696 0.256396C9.41139 -0.0854654 10.033 -0.0854654 10.4147 0.256396L13.6101 3.09554C13.8473 3.25556 14 3.50772 14 3.79381C14 4.2763 13.561 4.66665 13.0185 4.66665Z"
      fill="#787DA2"
    />
  </svg>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 736px;

  @media (max-width: ${SMALL_SCREEN}) {
    width: 100%;
  }

  padding-bottom: 32px;
  color: #787da1;
  .new-transfer-title {
    display: flex;
    width: 100%;
    align-items: center;
    padding-bottom: 12px;
    justify-content: space-between;
    padding-left: 8px;
    .transfer-left {
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: #787da1;
      @media (max-width: ${SMALL_SCREEN}) {
        font-size: 16px;
      }
    }

    .transfer-right {
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
      display: flex;
      align-items: center;
      color: #979abe;
    }
  }

  .pending-list-wrapper {
    width: 100%;
  }

  .bridge-title {
    color: #787da1;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    padding-left: 8px;
    padding-bottom: 8px;
    padding-top: 8px;
    @media (max-width: ${SMALL_SCREEN}) {
      font-size: 16px;
    }
  }

  .transfer-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .transfer-list-item-mobile {
    @media (min-width: ${SMALL_SCREEN}) {
      display: none;
    }

    display: flex;
    padding: 16px;

    flex-direction: column;

    border-radius: 10px;

    background: #25283a;

    gap: 12px;

    width: 100%;

    position: relative;
    .source-item {
      color: white;
      display: flex;
      align-items: center;

      padding-bottom: 6px;
      border-bottom: 1px solid #4e536d;
      justify-content: space-between;

      font-size: 16px;
      font-weight: 500;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: left;
      gap: 6px;

      .source-item-amount-and-symbol {
        display: flex;
        align-items: center;
        gap: 4px;
        padding-left: 5px;
      }
      .source-item-icon {
        width: 26px;
        height: 26px;
        border-radius: 6px;
      }
    }

    .chain-flow {
      width: 80px;
      padding-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      .chain-icon {
        width: 26px;
        height: 26px;
        border-radius: 6px;
      }
    }
    .bridge-time {
      color: #979abe;
      width: 175px;
      text-align: left;

      font-family: Gantari;
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
    }

    .tx-link {
      color: #64b5ff;
      text-decoration: underline;
    }

    .bridge-detail {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
  }

  .transfer-list-item {
    @media (max-width: ${SMALL_SCREEN}) {
      display: none;
    }
    display: flex;
    align-items: center;
    padding-left: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(120, 125, 161, 0.2);

    width: 100%;

    justify-content: space-between;

    position: relative;
    .source-item {
      color: white;
      display: flex;
      align-items: center;

      font-size: 16px;
      font-weight: 500;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: left;

      gap: 6px;
      .source-item-icon {
        width: 26px;
        height: 26px;
        border-radius: 100%;
      }
    }

    .bridge-detail {
      display: flex;
      align-items: center;
      gap: 8px;
      .chain-flow {
        width: 80px;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        .chain-icon {
          width: 26px;
          height: 26px;
          border-radius: 6px;
        }
      }
      .bridge-time {
        color: #979abe;
        width: 175px;
        text-align: left;
      }

      .tx-link {
        color: #64b5ff;
        text-decoration: underline;
      }
    }
  }

  .state-processing {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #64b5ff;
    width: 90px;
  }

  .state-need-action {
    width: 90px;
    height: 32px;
    border-radius: 8px;
    background: #00faa0;
    font-family: Gantari;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
    cursor: pointer;
  }

  .action-state {
    @media (max-width: ${SMALL_SCREEN}) {
      position: absolute;
      right: 16px;
      font-size: 15px;

      width: 90px;
      height: 30px;

      border-radius: 6px;
    }
  }
`;

const PendingTransfers = (props: {
  bothConnected: boolean;
  refreshTrigger: boolean;
  setRefreshTrigger: (b: boolean) => void;
}) => {
  const { bothConnected, refreshTrigger, setRefreshTrigger } = props;

  const [pendingList, setPendingList] = useState<Transfer[]>([]);

  useEffect(() => {
    console.log('check status start');

    checkStatusAll().then(() => {
      const list = get({
        filter: (t: Transfer) =>
          (t.status === Status.ACTION_NEEDED || t.status === Status.IN_PROGRESS) && t.completedStep !== null,
      });

      console.log('check status end');

      setPendingList(list);
    });
  }, [refreshTrigger]);

  const displayList = pendingList.map((item: any) => {
    const fromChain = item.type.includes('sendToEthereum') ? 'near' : 'eth';
    const tx = item?.burnHashes?.[0] || item?.lockHashes?.[0];

    const token = tokenList.find(
      (token) => token.ethereum_address == item.sourceToken || token.near_address === item.sourceToken,
    );

    return {
      ...item,
      tokenAddress: item.sourceToken,
      symbol: item.symbol,
      startTime: formateDate(item.startTime),
      fromChainIcon: item.type.includes('sendToEthereum') ? nearIcon : ethIcon,
      toChainIcon: item.type.includes('sendToEthereum') ? ethIcon : nearIcon,
      tx: item?.burnHashes?.[0] || item?.lockHashes?.[0],
      txLink: fromChain == 'eth' ? `https://etherscan.io/tx/${tx}` : `https://nearblocks.io/txns/${tx}`,
      amount: shrinkToken(item.amount, item.decimals).toFixed(),
      action:
        item.status === 'in-progress' ? (
          <div className="state-processing action-state"> Processing </div>
        ) : (
          <div
            className="state-need-action action-state"
            onClick={() => {
              act(item.id).then(() => {
                setRefreshTrigger(!refreshTrigger);
              });
            }}
          >
            Finalize
          </div>
        ),
      tokenMeta: token,
    };
  });

  if (!bothConnected || pendingList.length == 0) return <div></div>;

  return (
    <Wrapper>
      <div className="new-transfer-title">
        <div className="transfer-left">Pending Transfers</div>
      </div>
      <div className="transfer-list-wrapper">
        {displayList.map((item) => {
          return (
            <>
              <div className="transfer-list-item" key={item.startTime}>
                <div className="source-item">
                  <img src={item.tokenMeta?.icon} className="source-item-icon" alt="" />

                  <span>{item.amount}</span>

                  <span>{item.symbol}</span>
                </div>

                <div className="bridge-detail ">
                  <div className="chain-flow">
                    <img src={item.fromChainIcon} className="chain-icon" alt="" />

                    <div className=""> {IconRight} </div>

                    <img src={item.toChainIcon} className="chain-icon" alt="" />
                  </div>

                  <div className="bridge-time"> {item.startTime} </div>
                  <a className="tx-link" href={item.txLink} target="_blank">
                    {' '}
                    Tx{' '}
                  </a>

                  {item.action}
                </div>
              </div>
              <div className="transfer-list-item-mobile" key={item.startTime}>
                {item.action}

                <div className="chain-flow">
                  <img src={item.fromChainIcon} className="chain-icon" alt="" />

                  <div className=""> {IconRight} </div>

                  <img src={item.toChainIcon} className="chain-icon" alt="" />
                </div>
                <div className="source-item">
                  <div className="source-item-amount-and-symbol">
                    <span>{item.amount}</span>

                    <span>{item.symbol}</span>
                  </div>

                  <img src={item.tokenMeta?.icon} className="source-item-icon" alt="" />
                </div>

                <div className="bridge-detail ">
                  <div className="bridge-time"> {item.startTime} </div>
                  <a className="tx-link" href={item.txLink} target="_blank">
                    {' '}
                    Tx{' '}
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </Wrapper>
  );
};

export { PendingTransfers };
