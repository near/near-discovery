/* eslint-disable @next/next/no-html-link-for-pages */
// eslint-disable-next-line simple-import-sort/imports
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import useAddAction from '@/hooks/useAddAction';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import InputSearch from './search';
import HotDapps from './hot-dapps';
import MyQuest from './my-quest';
import QuestTrends from './quest-trends';
import { ethers } from 'ethers';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);
const ArrowRight = (
  <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464467C11.9763 0.269205 11.6597 0.269205 11.4645 0.464467C11.2692 0.659729 11.2692 0.976312 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM-4.37114e-08 4.5L15 4.5L15 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
      fill="#EBF479"
    />
  </svg>
);
const newUIbg = 'https://ipfs.near.social/ipfs/bafkreifua4bxuylicypouz6ng3pstjam4zvr3nifvchutndwlo5zuklxtu';
const zkEVMIcon = 'https://assets.dapdap.net/images/bafkreie5b65e7cp7jtvhrwgibvoqpf7ekj4v7jgo2egjr3qmfsl3p4ulam.svg';
const diagonaltop = 'https://assets.dapdap.net/images/bafkreiewy27itzs3bq2et7bxmnv3dlt6rtwofiszkms3baroobjqq6wh5a.svg';
const hotIcon = 'https://assets.dapdap.net/images/bafkreiewzowjm4fk7m5x3h32k6b4hpcdvwg23wndqpo5frzjiqr35xwnd4.png';
const trendIcon = 'https://assets.dapdap.net/images/bafkreid7uzfypfjyz7lvfjwpxyq5ikjxvzxf66vibmfujqhiafhwrcg2tm.png';
const myQuestIcon = 'https://assets.dapdap.net/images/bafkreigdmz5vpe5h2ifmenv5fklls4jay7smqvjw7u35e6xaclkwa3te6e.png';

const Container = styled.div`
  margin: 0 8%;
  position: relative;
`;

const BreadCrumbs = styled.div`
  color: #979abe;
  font-size: 14px;
  margin-bottom: 30px;
  a {
    text-decoration: none;
    color: #979abe;
    display: inline-block;
    cursor: pointer;
  }
  svg {
    margin: 0 8px;
  }
  span {
    color: #ffffff;
  }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  width: 100%;
  gap: 28px;
  color: white;
  padding: 0 120px 60px 120px;
  background-image: url(${newUIbg});
  background-repeat: no-repeat;
  background-size: 100%;
  font-family: 'Gantari';
  z-index: 1;
  .page-head {
    display: flex;
    padding-top: 50px;
    /* margin-bottom: 24px; */
    .details-body-left {
      .body-left-detailed {
        display: flex;
        img {
          width: 72px;
          height: 72px;
          margin-right: 24px;
        }
        .left-detailed-text {
          h1 {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
          }
          p {
            border: 1px solid #373a53;
            background: rgba(0, 0, 0, 0.3);
            color: #979abe;
            border-radius: 8px;
            padding: 6px 12px;
            font-weight: 300;
            height: 30px;
            line-height: 16px;
            width: fit-content;
            cursor: pointer;
            img {
              width: 12px;
              height: 12px;
              margin: 0;
            }
          }
        }
      }
    }
  }
  .page-quest-wrapper {
    /* margin-top: 30px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .quest-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      font-weight: 700;
      line-height: 22px;
      text-align: left;
    }
    .execute-records {
      color: #ecf488;
      border: 1px solid #ecf488;
      width: 139px;
      border-radius: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 14px;
      padding: 6px 0px;
      :hover {
        text-decoration: none;
      }
    }
    .view-all {
      color: #ecf488;
      border: 1px solid #ecf488;
      width: 100px;
      border-radius: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 14px;
      padding: 6px 0px;
      cursor: pointer;
      :hover {
        text-decoration: none;
      }
    }
  }
`;

const WarmUp: NextPageWithLayout = () => {
  const addMetaMask = async ({
    chainId,
    chainName,
    rpcUrls,
  }: {
    chainId: number;
    chainName: string;
    rpcUrls: string;
  }) => {
    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);

    etherProvider
      .send('wallet_switchEthereumChain', [{ chainId: `0x${Number(chainId).toString(16)}` }])
      .catch((err) => {
        const chain = {
          chainId: `0x${Number(chainId).toString(16)}`,
          chainName: chainName,
          rpcUrls: rpcUrls,
        };

        if (err.code === 4902) {
          etherProvider.send('wallet_addEthereumChain', [chain]);
        }
      });
  };
  return (
    <Container>
      <BreadCrumbs>
        <Link href="/">Home</Link>
        {arrow}
        Deep Dive
        {arrow}
        <span>Polygon zkEVM</span>
      </BreadCrumbs>
      <Page>
        <div className="page-head">
          <div className="details-body-left">
            <div className="body-left-detailed">
              <img src={zkEVMIcon} alt="" />
              <div className="left-detailed-text">
                <h1>Polygon zkEVM</h1>
                <p
                  onClick={() =>
                    addMetaMask({
                      chainId: 1101,
                      chainName: 'Polygon zkEVM',
                      rpcUrls: '["https://zkevm-rpc.com"]',
                    })
                  }
                >
                  Add to MetaMask <img src={diagonaltop} alt="" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <InputSearch></InputSearch>
        </div>
        <div className="page-quest-wrapper">
          <div className="quest-title">
            <img src={myQuestIcon} width={'39'} alt="" />
            My Quest
          </div>
          <a href="/warmup/my-quest/execute-records" className="execute-records">
            Execute Records
          </a>
        </div>
        <MyQuest />
        {/* <ComponentWrapperPage src="guessme.near/widget/ZKEVMWarmUp.quest-list" componentProps={{ addAction }} /> */}
        <div className="page-quest-wrapper">
          <div className="quest-title">
            <img src={trendIcon} width={'26'} alt="" />
            Quest Trends{' '}
          </div>

          <a className="view-all" href="/warmup/quest-trends/question-list">
            <span>View All</span>
            {ArrowRight}
          </a>
        </div>
        <QuestTrends />
        <div className="page-quest-wrapper" style={{ marginTop: '40px' }}>
          <div className="quest-title">
            <img src={hotIcon} width={'26'} alt="" />
            Hot Polygon zkEVM DApps{' '}
          </div>
        </div>
        <HotDapps />
      </Page>
    </Container>
  );
};

WarmUp.getLayout = useDefaultLayout;

export default WarmUp;
