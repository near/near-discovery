/* eslint-disable react/display-name */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';
import chains from '@/config/chains';
import { dapps } from '@/config/dapps';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);
const carouselbg = 'https://assets.dapdap.net/images/bafybeicoasvzxskocvjpdzanvpzip2zoortjo7gttbrmqnuf3vsenvhvty.svg';
const carouseicon = 'https://assets.dapdap.net/images/bafkreigqhaprvqrmha234q4k2rqnd4kraqh6k4cpbjoaga3te3zey5kg3e.svg';
const syncIcon = 'https://assets.dapdap.net/images/bafkreihzr73on5kcq3zgwjg3jwumiyutxm3np77sri4xfmc5dhtaqmwi3y.svg';

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
  .tab-content {
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
    /* border-bottom: 1px solid #383b48; */
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 100px;

    .tab-content-item {
      margin: 30px 20px 0 0;
      border-bottom: 1px solid #383b48;
      display: flex;
      width: 30%;
      flex-basis: calc(33.3333% - 20px);
      box-sizing: border-box;
      .content-item-img {
        margin-right: 16px;
        width: 20%;
        img {
          width: 72px;
          height: 72px;
        }
      }
      .content-item-text {
        margin-right: 16px;
        width: 49%;
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
        }
      }
      .content-item-btn {
        width: 22%;
        .item-btn-item {
          background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
          border: 1px solid #373a53;
          font-size: 14px;
          color: #ffffff;
          padding: 6px 20px;
          text-align: center;
          align-items: center;
          border-radius: 16px;
          margin-bottom: 14px;
          a {
            color: #ffffff;
            text-decoration: none;
          }
        }
      }
      @media (max-width: 1500px) {
        flex-basis: calc(50% - 20px);
        .content-item-img {
          width: 15%;
        }
        .content-item-text {
          width: 60%;
        }
      }
      @media (max-width: 1400px) {
        flex-basis: calc(50% - 20px);
        .content-item-img {
          width: 15%;
        }
        .content-item-text {
          width: 50%;
        }
      }
      @media (max-width: 975px) {
        flex-basis: calc(100% - 20px);
        .content-item-img {
          width: 15%;
        }
        .content-item-text {
          width: 70%;
        }
      }
    }
  }
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
const CarouselList = styled.div`
  position: relative;
  overflow: hidden;
  .carousel-right-icon {
    position: absolute;
    right: 0;
    top: 40%;
    z-index: 1;
    cursor: pointer;
  }
  .carousel {
    display: none;
    width: 97%;
    background-image: url(${carouselbg});
    border-radius: 20px;
    height: 352px;
    align-items: center;
    padding: 26px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    margin-bottom: 42px;
    animation: slideIn 0.5s forwards;
    will-change: transform;
    @keyframes slideIn {
      from {
        transform: translate3d(100%, 0, 0);
      }
      to {
        transform: translate3d(0, 0, 0);
      }
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
          background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
          font-size: 16px;
          color: #ffffff;
          text-align: center;
          align-items: center;
          height: 43px;
          line-height: 43px;
          border-radius: 12px;
          border: 1px solid #373a53;
          a {
            color: #ffffff;
            text-decoration: none;
          }
          img {
            width: 12px;
            height: 8px;
            margin-left: 6px;
          }
        }
      }
    }
  }
  .active {
    display: block;
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
  margin: 30px 0 18px 0;
  color: rgba(151, 154, 190, 1);
`;

const Footer = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -36px;
  left: 0;
  display: flex;
  color: rgba(151, 154, 190, 1);
  font-size: 14px;
  font-weight: 400;
  padding: 0 10%;
  .footer-item {
    flex: 1;
    text-align: center;
  }
  .footer-center {
    img {
      margin-right: 32px;
    }
  }
`;

const carouselData = [
  {
    title: 'SyncSwap',
  },
  {
    title: 'Test',
  },
];

const Carousel = React.memo(({ active, children }: { active: boolean; children: React.ReactNode }) => {
  return <div className={`carousel ${active ? 'active' : ''}`}>{children}</div>;
});

const AllDappsColumn: NextPageWithLayout = () => {
  const [networkList, setNetworkList] = useState<any[]>([]);
  const [dappList, setDappList] = useState<any[]>([]);
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const resultNetwork = await get(`${QUEST_PATH}:9991/operations/Network/GetList`);
        setNetworkList(resultNetwork.data?.data || []);
      } catch (error) {
        console.error('Error fetching resultNetwork data:', error);
      }
    };
    const fetchDappData = async () => {
      try {
        const resultDapp = await get(`${QUEST_PATH}:9991/operations/Dapp/GetList`);
        setDappList(resultDapp.data?.data || []);
      } catch (error) {
        console.error('Error fetching resultDapp data:', error);
      }
    };
    fetchDappData();
    fetchNetworkData();
  }, []);

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

  const [activeIndex, setActiveIndex] = useState(0);

  const handleCarouselClick = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  }, [carouselData.length]);

  return (
    <AllDappsPage>
      <BreadCrumbs>
        <Link href="/">Home</Link>
        {arrow}
        <span>All Dapps</span>
      </BreadCrumbs>

      <CarouselList>
        <div className="carousel-right-icon" onClick={handleCarouselClick}>
          <img src={carouseicon} alt="" />
        </div>
        {dappList
          .filter((dapp) => dapp.recommend === true)
          .map((child, index) => (
            <Carousel key={index} active={index === activeIndex}>
              <div className="carousel-content">
                <img src={child.recommend_icon} alt="" />
                <h1>{child.title}</h1>
                <Tag>
                  {child.tag &&
                    child.tag.map((tagItem: string, index: number) => (
                      <div className={`tag-item ${tagItem}`} key={index}>
                        {tagItem}
                      </div>
                    ))}
                </Tag>
                <p>{child.description}</p>
                <div className="carousel-btn">
                  <div className="carousel-btn-item">
                    <Link href="/dapps-details">View Detail</Link>
                  </div>
                  <div className="carousel-btn-item" style={{ marginRight: '0' }}>
                    <Link href={child.route}>Dapp</Link>{' '}
                    <img src="https://assets.dapdap.net/images/arrow-white.png" alt="" />
                  </div>
                </div>
              </div>
            </Carousel>
          ))}
      </CarouselList>

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
      <div className="tab-content">
        <Title>Network</Title>
        <div className="page-netWork-list">
          {networkList &&
            networkList.map((child, index) => (
              <div
                className={`netWork-list-item ${selectedMenu === String(child.chain_id) ? 'active' : ''}`}
                key={index}
                onClick={() => child.chain_id && handleMenuClick(String(child.chain_id))}
              >
                <img src={child.logo} alt="" />
                {child.name}
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
              className={`function-list-item liquidity ${
                selectedFunction.includes('Liquidity') ? 'liquidityActive' : ''
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
          {dappList
            .filter((dapp) => dapp.tbd_token === 'Y')
            .slice(0, 9)
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
                      {/* {dapp.tag &&
                        dapp.tag.map((tagItem: string, index: number) => (
                          <div className={`tag-item ${tagItem}`} key={index}>
                            {tagItem}
                          </div>
                        ))} */}
                    </Tag>
                  </div>
                  <div className="content-item-btn">
                    <div className="item-btn-item">
                      <Link href="/dapps-details">Detail</Link>
                    </div>
                    <div className="item-btn-item">
                      {' '}
                      <Link href={dapp.route}>Dapp</Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : null}
      {selectedTab == 'token' ? (
        <>
          <div className="tab-content-page">
            {dappList
              .filter((dapp) => dapp.tbd_token === 'N')
              .slice(0, 9)
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
                        {dapp.tag &&
                          dapp.tag.map((tagItem: string, index: number) => (
                            <div className={`tag-item ${tagItem}`} key={index}>
                              {tagItem}
                            </div>
                          ))}
                      </Tag>
                    </div>
                    <div className="content-item-btn">
                      <div className="item-btn-item">
                        <Link href="/dapps-details">Detail</Link>
                      </div>
                      <div className="item-btn-item">
                        <Link href={dapp.route}>Dapp</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : null}
      <Footer>
        <div className="footer-item footer-left">
          Made with ❤️ by DapXDap team.
          <br /> Bulit on BOS & NEAR Protocol
        </div>
        <div className="footer-item footer-center">
          <div className="footer-center-img">
            <img
              src="https://assets.dapdap.net/images/bafkreic2ou5l3zhdefbhswd6jomuhzmvyu5oqpbom3d3vo3djoeywxmyay.svg"
              alt=""
            />
            <img
              src="https://assets.dapdap.net/images/bafkreibaof45e2fwgaphbengfh5molv6dwjkcp4zrwkixyqm3mrc3x7jhm.svg"
              alt=""
            />
            <img
              src="https://assets.dapdap.net/images/bafkreif3gh6hszingmncy6kg3en6xoumceepw4ys3dq3dbjd7rkn7zfb74.svg"
              alt=""
            />
            <img
              src="https://assets.dapdap.net/images/bafkreifyzh5mqbh6z6utj7z4dp2eelhaa654mnt6mut4oxml3mw56fqoxm.svg"
              alt=""
            />
          </div>
        </div>
        <div className="footer-item footer-right">Copyright 2023 DapXDap</div>
      </Footer>
    </AllDappsPage>
  );
};

AllDappsColumn.getLayout = useDefaultLayout;

export default AllDappsColumn;
