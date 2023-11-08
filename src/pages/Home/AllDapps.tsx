import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import chains from '@/config/chains';
import { dapps } from '@/config/dapps';
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
const footer = 'https://ipfs.near.social/ipfs/bafkreiaryuyqhofb3wb4nfljxcclyn7iycrxxblcxefr37gvt4f3y3nao4';

const AllDappsPage = styled.div`
  color: #ffffff;
  padding: 0 12% 80px 12%;
  position: relative;
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
  .tab-content{
    /* padding: 20px 0; */
    .page-netWork-list {
    display: flex;
    flex-wrap: wrap;
    .netWork-list-item {
      margin-right: 12px;
      margin-bottom: 12px;
      flex-basis: auto;
      border: 1px solid #5e617e;
      border-radius: 10px;
      padding: 4px 8px 4px 4px;
      color: #ffffff;
      display: flex;
      cursor: pointer;
      img {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        align-items: center;
        border-radius: 8px;
        margin-right: 10px;
      }
    }
    .active {
      background: rgba(235, 244, 121, 1);
      color: rgba(24, 26, 39, 1);
    }
  }
  .page-function-list {
    display: flex;
    flex-wrap: wrap;
    .function-list-item {
      margin-right: 12px;
      margin-bottom: 12px;
      flex-basis: auto;
      border: 1px solid #5e617e;
      border-radius: 8px;
      padding: 6px 20px;
      color: #ffffff;
      display: flex;
      cursor: pointer;
    }
    .bridge {
      border: 1px solid rgba(227, 233, 157, 1);
    }
    .dex {
      border: 1px solid rgba(172, 252, 237, 1);
    }
    .lending {
      border: 1px solid rgba(173, 255, 181, 1);
    }
    .liquidity {
      border: 1px solid rgba(170, 214, 255, 1);
    }
    .staking {
      border: 1px solid rgba(193, 191, 255, 1);
    }
    .yield {
      border: 1px solid rgba(249, 181, 230, 1);
    }
    .bridgeActive {
      background: rgba(227, 233, 157, 1);
      color: rgba(0, 0, 0, 1);
    }
    .dexActive {
      background: rgba(172, 252, 237, 1);
      color: rgba(0, 0, 0, 1);
    }
    .lendingActive {
      background: rgba(173, 255, 181, 1);
      color: rgba(0, 0, 0, 1);
    }
    .liquidityActive {
      background: rgba(170, 214, 255, 1);
      color: rgba(0, 0, 0, 1);
    }
    .stakingActive {
      background: rgba(193, 191, 255, 1);
      color: rgba(0, 0, 0, 1);
    }
    .yieldActive {
      background: rgba(249, 181, 230, 1);
      color: rgba(0, 0, 0, 1);
    }
  }
  .page-medal-list {
    display: flex;
    flex-wrap: wrap;
    .medal-list-item {
      margin-right: 12px;
      margin-bottom: 12px;
      flex-basis: auto;
      border: 1px solid #5e617e;
      border-radius: 8px;
      padding: 6px 20px;
      color: #ffffff;
      display: flex;
      cursor: pointer;
    }
    .active {
      background: rgba(235, 244, 121, 1);
      color: rgba(24, 26, 39, 1);
    }
  }
  }
  .tab-content-page {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 100px;

    .tab-content-item {
      display: flex;
      margin: 30px 60px 0 0;
      border-bottom: 1px solid #383b48;
      width: 390px;
      display: flex;
      flex-basis: calc(30% - 20px);
      flex-grow: 1;
      .content-item-img {
        margin-right: 16px;
        img {
          width: 72px;
          height: 72px;
        }
      }
      .content-item-text {
        margin-right: 16px;
        h1 {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        p {
          font-size: 14px;
          color: #979abe;
          margin: 6px 0 9px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 200px;
        }
      }
      .content-item-btn {
        .item-btn-item {
          background: linear-gradient(0deg, #373a53, #373a53),
            linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
          border: 1px solid #373a53;
          font-size: 14px;
          color: #ffffff;
          padding: 6px 20px;
          text-align: center;
          align-items: center;
          border-radius: 16px;
          margin-bottom: 14px;
        }
      }
    }

    .tab-content-item:nth-child(3n) {
      margin-right: 0;
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

const Title = styled.div`
  font-size: 16px;
  margin:30px 0 18px 0;
  color: rgba(151, 154, 190, 1);
`;

const Footer = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -36px;
  left: 0;
`;

const AllDappsColumn: NextPageWithLayout = () => {
  const [selectedTab, setSelectedTab] = useState(() => {
    return 'TBD';
  });

  const handleTabClick = (path: string) => {
    setSelectedTab(path);
  };

  const [selectedMenu, setSelectedMenu] = useState(() => {
    return '';
  });
  const handleMenuClick = (path: string) => {
    if (selectedMenu === path) {
      setSelectedMenu('');
    } else {
      setSelectedMenu(path);
    }
  };

  const [selectedFunction, setSelectedFunction] = useState<string[]>(() => {
    return [];
  });
  const handleFunctionClick = (functionType: string) => {
    if (selectedFunction.includes(functionType)) {
      setSelectedFunction(selectedFunction.filter((type) => type !== functionType));
    } else {
      setSelectedFunction([...selectedFunction, functionType]);
    }
  };

  const [selectedMedalMenu, setSelectedMedalMenu] = useState(() => {
    return '';
  });
  const handleMedalMenuClick = (path: string) => {
    setSelectedMedalMenu(path);
  };

  const filteredDapps = dapps.filter(
    ({ tags, on_chain_ids }) =>
      (selectedFunction.length === 0 || tags.some((tags) => selectedFunction.includes(tags))) &&
      (selectedMenu === '' || on_chain_ids.includes(parseInt(selectedMenu))),
  );
  const sortedDapps = filteredDapps.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

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
      <div className='tab-content'>
        <Title>Network</Title>
        <div className="page-netWork-list">
          {Object.values(chains).map((child, index) => (
            <div
              className={`netWork-list-item ${selectedMenu === String(child.chainId) ? 'active' : ''}`}
              key={index}
              onClick={() => child.chainId && handleMenuClick(String(child.chainId))}
            >
              <img src={child.icon} alt="" />
              {child.chainName}
            </div>
          ))}
        </div>
        <Title>Function</Title>
        <div className="page-function-list">
          <div className="page-function-list">
            <div
              className={`function-list-item bridge ${selectedFunction.includes('Bridge') ? 'bridgeActive' : ''}`}
              onClick={() => handleFunctionClick('Bridge')}
            >
              Bridge
            </div>
            <div
              className={`function-list-item dex ${selectedFunction.includes('Dexes') ? 'dexActive' : ''}`}
              onClick={() => handleFunctionClick('Dexes')}
            >
              Dex
            </div>
            <div
              className={`function-list-item lending ${selectedFunction.includes('Lending') ? 'lendingActive' : ''}`}
              onClick={() => handleFunctionClick('Lending')}
            >
              Lending
            </div>
            <div
              className={`function-list-item liquidity ${selectedFunction.includes('Liquidity') ? 'liquidityActive' : ''
                }`}
              onClick={() => handleFunctionClick('Liquidity')}
            >
              Liquidity
            </div>
            <div
              className={`function-list-item staking ${selectedFunction.includes('Staking') ? 'stakingActive' : ''}`}
              onClick={() => handleFunctionClick('Staking')}
            >
              Staking
            </div>
            <div
              className={`function-list-item yield ${selectedFunction.includes('Yield') ? 'yieldActive' : ''}`}
              onClick={() => handleFunctionClick('Yield')}
            >
              Yield
            </div>
          </div>
        </div>

        <Title>Medal Quest</Title>
        <div className="page-medal-list">
          <div
            className={`medal-list-item ${selectedMedalMenu === 'Both' ? 'active' : ''}`}
            onClick={() => handleMedalMenuClick('Both')}
          >
            Both
          </div>
          <div
            className={`medal-list-item ${selectedMedalMenu === 'Yes' ? 'active' : ''}`}
            onClick={() => handleMedalMenuClick('Yes')}
          >
            Yes
          </div>
          <div
            className={`medal-list-item ${selectedMedalMenu === 'No' ? 'active' : ''}`}
            onClick={() => handleMedalMenuClick('No')}
          >
            No
          </div>
        </div>
      </div>
      {selectedTab == 'TBD' ? (
        <div className="tab-content-page">
          {sortedDapps
            .filter((dapp) => dapp.TBD_TOKEN === 'Y')
            .map((dapp, index) => {
              return (
                <div className="tab-content-item" key={index}>
                  <div className="content-item-img">
                    <img src={dapp.logo} alt="" />
                  </div>
                  <div className="content-item-text">
                    <h1>{dapp.name}</h1>
                    <p>{dapp.description}</p>
                    <Tag>
                      {dapp.tags.map((tag, index) => (
                        <div className={`tag-item ${tag}`} key={index}>
                          {tag}
                        </div>
                      ))}
                    </Tag>
                  </div>
                  <div className="content-item-btn">
                    <div className="item-btn-item">Collect</div>
                    <div className="item-btn-item">View</div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : null}
      {selectedTab == 'token' ? (<>
        <div className="tab-content-page">
          {sortedDapps
            .filter((dapp) => dapp.TBD_TOKEN === 'N')
            .map((dapp, index) => {
              return (
                <div className="tab-content-item" key={index}>
                  <div className="content-item-img">
                    <img src={dapp.logo} alt="" />
                  </div>
                  <div className="content-item-text">
                    <h1>{dapp.name}</h1>
                    <p>{dapp.description}</p>
                    <Tag>
                      {dapp.tags.map((tag, index) => (
                        <div className={`tag-item ${tag}`} key={index}>
                          {tag}
                        </div>
                      ))}
                    </Tag>
                  </div>
                  <div className="content-item-btn">
                    <div className="item-btn-item">Collect</div>
                    <div className="item-btn-item">View</div>
                  </div>
                </div>
              );
            })}
        </div>
      </>) : null}

      <Footer>
        <img src={footer} alt="" />
      </Footer>
    </AllDappsPage>
  );
};

AllDappsColumn.getLayout = useDefaultLayout;

export default AllDappsColumn;
