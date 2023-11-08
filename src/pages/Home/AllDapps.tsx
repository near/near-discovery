import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" stroke-linecap="round" />
  </svg>
);
const carouselbg = 'https://ipfs.near.social/ipfs/bafybeicoasvzxskocvjpdzanvpzip2zoortjo7gttbrmqnuf3vsenvhvty';
const carouseicon = 'https://ipfs.near.social/ipfs/bafkreigqhaprvqrmha234q4k2rqnd4kraqh6k4cpbjoaga3te3zey5kg3e';
const syncIcon = 'https://ipfs.near.social/ipfs/bafkreihzr73on5kcq3zgwjg3jwumiyutxm3np77sri4xfmc5dhtaqmwi3y';
const arrows = 'https://ipfs.near.social/ipfs/bafkreieovokoreirgn2zewqmqgddkq4vlaljgvaw6nlqs2psbcq7n3pffi';

const AllDappsPage = styled.div`
  color: #ffffff;
  padding: 0 12% 80px 12%;
  .token-tab-list {
    width: 100%;
    color: #ffffff;
    border-bottom: 1px solid #383b48;
    font-size: 18px;
    color: #979abe;
    display: flex;
    position: relative;
    .tab-list-item {
      padding: 10px 40px;
      margin-right: 24px;
      font-weight: 700;
      cursor: pointer;
      &.active {
        color: #ffffff;
        border-bottom: 4px #ebf479 solid;
      }
    }
  }
`;
const BreadCrumbs = styled.div`
  color: #979abe;
  font-size: 14px;
  margin-bottom: 30px;
  svg {
    margin: 0 8px;
  }
  span {
    color: #ffffff;
  }
`;
const Carousel = styled.div`
  width: 100%;
  background-image: url(${carouselbg});
  border-radius: 20px;
  height: 352px;
  align-items: center;
  padding: 26px;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin-bottom: 42px;
  .carousel-right-icon {
    position: absolute;
    right: -26px;
    top: 50%;
  }
  .carousel-content {
    background: linear-gradient(180deg, rgba(55, 58, 83, 0.9) 0%, rgba(19, 20, 27, 0.9) 100%);
    padding: 24px;
    border-radius: 20px;
    width: fit-content;
    img {
      width: 72px;
      height: 72px;
    }
    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #ffffff;
      margin: 14px 0;
    }
    p {
      font-size: 14px;
      color: #979abe;
    }
    .carousel-btn {
      display: flex;
      .carousel-btn-item {
        flex: 1;
        margin-right: 18px;
        background: linear-gradient(0deg, #373a53, #373a53),
          linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
        font-size: 16px;
        color: #ffffff;
        text-align: center;
        align-items: center;
        height: 43px;
        line-height: 43px;
        border-radius: 12px;
        border: 1px solid #373a53;
      }
    }
  }
`;

const Tag = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 14px;
  .tag-item {
    margin-right: 6px;
    flex-basis: auto;
    border-radius: 30px;
    padding: 2px 8px;
    font-size: 12px;
    display: flex;
    cursor: pointer;
  }
  .Bridge {
    color: rgba(227, 233, 157, 1);
    border: 1px solid rgba(227, 233, 157, 1);
  }
  .Dexes {
    color: rgba(172, 252, 237, 1);
    border: 1px solid rgba(172, 252, 237, 1);
  }
  .Lending {
    color: rgba(173, 255, 181, 1);
    border: 1px solid rgba(173, 255, 181, 1);
  }
  .Liquidity {
    color: #aad6ff;
    border: 1px solid #aad6ff;
  }
  .Staking {
    color: rgba(193, 191, 255, 1);
    border: 1px solid rgba(193, 191, 255, 1);
  }
  .Yield {
    color: rgba(249, 181, 230, 1);
    border: 1px solid rgba(249, 181, 230, 1);
  }
`;


const AllDappsColumn: NextPageWithLayout = () => {
  const [selectedTab, setSelectedTab] = useState(() => {
    return 'TBD';
  });

  const handleTabClick = (path: string) => {
    setSelectedTab(path);
  };

  return (
    <AllDappsPage>
      <BreadCrumbs>
        Home
        {arrow}
        <span>All Dapps</span>
      </BreadCrumbs>
      <Carousel>
        <div className="carousel-right-icon">
          <img src={carouseicon} alt="" />
        </div>
        <div className="carousel-content">
          <img src={syncIcon} alt="" />
          <h1>SyncSwap</h1>
          <Tag>
            <div className="tag-item Dexes">Dexes</div>
            <div className="tag-item Bridge">Bridge</div>
            <div className="tag-item Liquidity">Liquidity</div>
          </Tag>
          <p>Seamless and Efficient Trading on zk Rollups</p>
          <div className="carousel-btn">
            <div className="carousel-btn-item">Collect</div>
            <div className="carousel-btn-item" style={{ marginRight: '0' }}>
              View
            </div>
          </div>
        </div>
      </Carousel>
      <div className="token-tab-list">
        <div className={`tab-list-item ${selectedTab === 'TBD' ? 'active' : ''}`} onClick={() => handleTabClick('TBD')}>
          Token-TBD🔥
        </div>
        <div
          className={`tab-list-item ${selectedTab === 'token' ? 'active' : ''}`}
          onClick={() => handleTabClick('token')}
        >
          Native token
        </div>
      </div>
    </AllDappsPage>
  );
};

AllDappsColumn.getLayout = useDefaultLayout;

export default AllDappsColumn;
