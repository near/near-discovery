import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import useAddAction from '@/hooks/useAddAction';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

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
      font-weight: 500;
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

const CardListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
`;

const WarmUp: NextPageWithLayout = () => {
  const components = useBosComponents();
  const [innerWidth, setInnerWidth] = useState<number>();
  const [putMenu, setPutMenu] = useState(false);
  const { addAction } = useAddAction('all-in-one');
  useEffect(() => {
    const offset = putMenu ? 170 : 350;

    const innerWidth = window.innerWidth;
    setInnerWidth(innerWidth > 900 ? innerWidth - offset : innerWidth);
    const handleResize = () => {
      const innerWidth = window.innerWidth;

      setInnerWidth(innerWidth > 900 ? innerWidth - offset : innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [putMenu]);

  useEffect(() => {
    const getPutMenu = (e: any) => {
      setPutMenu(e.detail);
    };
    window.addEventListener('changePutEvent', getPutMenu);
    return () => window.removeEventListener('setItemEvent', getPutMenu);
  }, []);
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
                <p>
                  Add to MetaMask <img src={diagonaltop} alt="" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: '30px' }}>
          <ComponentWrapperPage src="guessme.near/widget/ZKEVMWarmUp.input-search" />
        </div>
        <div className="page-quest-wrapper">
          <div className="quest-title">
            <img src={myQuestIcon} width={'39'} alt="" />
            My Quest
          </div>
          <a href="/guessme.near/widget/ZKEVM.ExecuteRecords" className="execute-records">
            Execute Records
          </a>
        </div>
        <ComponentWrapperPage src="guessme.near/widget/ZKEVMWarmUp.quest-list" componentProps={{ addAction }} />
        <div className="page-quest-wrapper">
          <div className="quest-title">
            <img src={trendIcon} width={'26'} alt="" />
            Quest Trends{' '}
          </div>

          <a className="view-all" href="/guessme.near/widget/ZKEVM.QuestionList">
            <span>View All</span>
            {ArrowRight}
          </a>
        </div>
        <ComponentWrapperPage src="guessme.near/widget/ZKEVMWarmUp.trend-list" />
        <div className="page-quest-wrapper" style={{ marginTop: '40px' }}>
          <div className="quest-title">
            <img src={hotIcon} width={'26'} alt="" />
            Hot Polygon zkEVM DApps{' '}
          </div>
        </div>
        <CardListWrapper>
          <ComponentWrapperPage
            src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
            componentProps={{
              background: 'linear-gradient(180deg, #7347DA 0%, #202445 100%)',
              dappName: 'Polygon zkEVM All-in-one',
              creator: 'bluebiu.near',
              widgetSrc: 'bluebiu.near/widget/ZKEVM-all-in-one',
              src: 'https://assets.ref.finance/images/zkevm-swap.png',
            }}
          />
          <ComponentWrapperPage
            src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
            componentProps={{
              background: 'linear-gradient(180deg, #8C36D8 0%, #24264C 100%)',
              dappName: 'Polygon zkEVM Dex',
              creator: 'guessme.near',
              widgetSrc: 'guessme.near/widget/ZKEVMSwap.zkevm-swap',
              src: 'https://assets.ref.finance/images/zkevm-swap.png',
            }}
          />
          <ComponentWrapperPage
            src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
            componentProps={{
              background: 'linear-gradient(180deg, #7347DA 0%, #202445 100%)',
              dappName: 'zkEVM-bridge',
              creator: 'guessme.near',
              widgetSrc: 'guessme.near/widget/ZKEVMSwap.zkevm-bridge',
              src: 'https://assets.ref.finance/images/zkevm-swap.png',
            }}
          />

          <ComponentWrapperPage
            src="guessme.near/widget/ZKEVMWarmUp.hot-dapp-card"
            componentProps={{
              background: 'linear-gradient(180deg, #895C5C 0%, #343149 100%)',
              dappName: 'Gamma',
              creator: 'guessme.near',
              widgetSrc: 'guessme.near/widget/ZKEVM.GAMMA',

              src: 'https://assets.ref.finance/images/zkevm-swap.png',
            }}
          />
        </CardListWrapper>
      </Page>
    </Container>
  );
};

WarmUp.getLayout = useDefaultLayout;

export default WarmUp;
