import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import chains from '@/config/chains';
import { dapps } from '@/config/dapps';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const logoUrl = 'https://ipfs.near.social/ipfs/bafkreig5ka5mpgawcpswpfqinzpyuxl7wmfbs7xeln3l7udigzvbtotlle';
const bannerBg = 'https://ipfs.near.social/ipfs/bafkreigu5rr2jqcw53jwawwyw7ug7uza4gpev2dpftxgs3w7exib2m4bmu';
const blueBg = 'https://ipfs.near.social/ipfs/bafkreihu2rxecbig3cyici5sbvjus42fazzorn2lq22b32arr3slzbzdye';
const yellowBg = 'https://ipfs.near.social/ipfs/bafkreiejilw7ah4y2nhn3ohhzl73u7flxafygpiwksc4iepq75s43f3gfa';
const quick = 'https://ipfs.near.social/ipfs/bafkreic3hzaaz2iteac2oruyk62an47db2vo3z4furlk2rwhxyzks3m23i';
const syncIcon = 'https://ipfs.near.social/ipfs/bafkreihzr73on5kcq3zgwjg3jwumiyutxm3np77sri4xfmc5dhtaqmwi3y';
const arrow = 'https://ipfs.near.social/ipfs/bafkreieovokoreirgn2zewqmqgddkq4vlaljgvaw6nlqs2psbcq7n3pffi';
const arrowBlock = 'https://ipfs.near.social/ipfs/bafkreihv4t6xu7bzjxeqdi7do4qdbncolgyhk3d4c53vbsu22xkv3hrrge';
const discover = 'https://ipfs.near.social/ipfs/bafkreic5n7m4pvmtudbuhlgggfkkwv7ynqd66tml2ffh5rx4vvbowlf4qu';
const earn = 'https://ipfs.near.social/ipfs/bafkreib54d2j2gfmn5nw45woc3wcntukrub4zcexaeksguj2fsbojesqoq';
const carouselbg = 'https://ipfs.near.social/ipfs/bafybeicoasvzxskocvjpdzanvpzip2zoortjo7gttbrmqnuf3vsenvhvty';
const carouseicon = 'https://ipfs.near.social/ipfs/bafkreigqhaprvqrmha234q4k2rqnd4kraqh6k4cpbjoaga3te3zey5kg3e';
const gold = 'https://ipfs.near.social/ipfs/bafkreidegqrrzlwh4wlfrquhd6n3n7dczefy32hu5locsx5yj6hllqfkuq';
const shortcutsIcon = 'https://ipfs.near.social/ipfs/bafkreidzyndlxwqshuuejb7xfpycpsn5srfdmprxuilireqy4mqn45ghre';
const decentralizedIcon = 'https://ipfs.near.social/ipfs/bafkreibhxqbh3tlqm6cqwqmu7j6afzsc7qab743bvn43zg4klk54tvyceq';
const learningOne = 'https://ipfs.near.social/ipfs/bafkreigsyle3grerozvpmp42vhv3d36ny4gdc4vkgthcwefjyinvoangwy';
const learningTwo = 'https://ipfs.near.social/ipfs/bafybeibgwjzaepfwgtmej4dnjjvtlnbtqukkn3fkde4ufvejnc2hf4yofi';
const learningThree = 'https://ipfs.near.social/ipfs/bafkreihnl55yd5ud2nchalsgeyzy2tjq7cqw2bvp25cikxkixj55h6zyte';
const learningIcon = 'https://ipfs.near.social/ipfs/bafkreicgtx436rdzzaj4qgilgti63niv5ymeesxjzfwmtopsrlmoipehxi';
const footer = 'https://ipfs.near.social/ipfs/bafkreiaryuyqhofb3wb4nfljxcclyn7iycrxxblcxefr37gvt4f3y3nao4';

const HomePage = styled.div`
  padding: 0 12% 80px 12%;
  position: relative;
`;

const Content = styled.div`
  .it-works-list {
    display: flex;
    .works-list-item {
      flex: 1;
      background: linear-gradient(180deg, #373a53 0%, #16181d 100%);
      padding: 30px;
      border-radius: 20px;
      color: #d2d2d2;
      position: relative;
      margin-bottom: 60px;
      h1 {
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 14px;
        color: #ffffff;
      }
      p {
        font-size: 18px;
      }
      a {
        color: #d2d2d2;
        text-decoration: underline;
      }
      .list-item-img {
        position: absolute;
        right: 12px;
        top: -36px;
        img {
          width: 120px;
          height: 120px;
        }
      }
    }
    .works-list-arrow {
      padding: 40px 24px 0 24px;
    }
  }
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
    /* border-bottom: 1px solid #383b48; */
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 100px;

    .tab-content-item {
      margin: 30px 60px 0 0;
      border-bottom: 1px solid #383b48;
      min-width: 390px;
      display: flex;
      flex-basis: calc(30% - 20px);
      /* flex-grow: 1; */
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
          }
        }
      }
    }

    /* .tab-content-item:nth-child(3n) {
      margin-right: 0;
    } */
    /* .tab-content-item:last-child,
    .tab-content-item:nth-last-child(2),
    .tab-content-item:nth-last-child(3) {
      border-bottom: none;
    } */
  }
  .explore-layer-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 100px;
    .layer-list-item {
      margin: 0 18px 20px 0;
      background: #21232a;
      border-radius: 20px;
      padding: 20px 60px;
      border-bottom: 1px solid #383b48;
      width: 300px;
      flex-basis: calc(25% - 20px);
      color: #ffffff;
      text-align: center;
      position: relative;
      img {
        width: 72px;
        height: 72px;
      }
      h1 {
        font-size: 20px;
        font-weight: 700;
        margin: 8px 0 12px 0;
      }
      p {
        font-size: 14px;
        color: #979abe;
      }
      .list-item-bottom {
        display: none;
        height: 28px;
        line-height: 28px;
        left: 0;
        border-radius: 0 0 20px 20px;
        background: #ebf479e5;
        position: absolute;
        bottom: 0;
        width: 100%;
        color: #000000;
        img {
          width: 16px;
          height: 16px;
          margin-left: 10px;
        }
        a {
          color: #000000;
        }
      }
      &:hover {
        cursor: pointer;
        .list-item-bottom {
          display: block;
        }
      }
    }
    /* .layer-list-item:nth-child(4n) {
      margin-right: 0;
    } */
  }
  .shortcuts-content {
    display: flex;
    margin-bottom: 100px;
    .shortcuts-content-img {
      width: 70%;
      margin-right: 48px;
      img {
        width: 100%;
      }
    }
    .shortcuts-content-list {
      width: 30%;
      .shortcuts-list-item {
        margin-right: 12px;
        margin-bottom: 12px;
        width: fit-content;
        border: 1px solid #373a53;
        background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
        font-size: 16px;
        font-weight: 700;
        border-radius: 16px;
        color: #ffffff;
        height: 60px;
        line-height: 60px;
        padding: 0 16px;
        display: flex;
        img {
          width: 40px;
          height: 40px;
          text-align: center;
          align-items: center;
          border-radius: 8px;
          margin-right: 10px;
          margin-top: 8px;
        }
      }
    }
  }
  .decentralized-frotnend-content {
    text-align: center;
    margin-bottom: 86px;
    .frotnend-content-title {
      font-family: Gantari;
      font-size: 26px;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 14px;
      span {
        background: #00ec97;
        color: #000000;
        border-radius: 10px;
        padding: 6px;
        margin: 0 10px;
      }
    }
    p {
      font-size: 16px;
      color: #979abe;
      margin-bottom: 40px;
      text-decoration: underline;
    }
    img {
      width: 100%;
    }
  }
  .learning-content-item {
    display: flex;
    overflow: hidden;
    .learning-content-item {
      min-width: 539px;
      background: #21232ae5;
      border-radius: 20px;
      padding: 28px 26px;
      display: flex;
      margin-right: 20px;
      .content-item-img {
        margin-right: 20px;
        img {
          width: 150px;
          height: 150px;
        }
      }
      .content-item-text {
        color: #ffffff;
        h1 {
          font-size: 26px;
          font-weight: 700;
        }
        p {
          font-size: 18px;
          color: #d2d2d2;
        }
        span {
          color: #d2d2d2;
          text-decoration: underline;
        }
      }
    }
  }
  .learning-icon {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 448px;
  position: relative;
  background-image: url(${bannerBg});
  background-repeat: no-repeat;
  background-size: 86%;
  background-position-x: 50%;
  .blue-bg {
    position: absolute;
    right: 0;
    /* bottom: 0; */
  }
  .yellow-bg {
    position: absolute;
    left: 15%;
    top: -20%;
  }
  .banner-content {
    font-family: Gantari;
    color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    img {
      height: 76px;
    }
    h1 {
      font-size: 42px;
      font-weight: 700;
      margin: 32px 0 20px 0;
      span {
        color: #ebf479;
      }
    }
    p {
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  background-image: linear-gradient(270deg, #ebf479 0%, #979abe 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 36px;
  display: inline-block;
`;

const CarouselList = styled.div`
  position: relative;
  .carousel-right-icon {
    position: absolute;
    right: -26px;
    top: 50%;
    cursor: pointer;
  }
  .carousel {
    display: none;
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

const Gold = styled.div`
  .gold-icon {
    width: 18px !important;
    height: 18px !important;
  }
  p {
    display: inline-block;
    color: #ffdd4d;
    font-size: 14px;
    font-weight: 700;
  }
`;

const ViewAll = styled.div`
  position: absolute;
  right: 0;
  top: 16px;
  font-size: 16px;
  a {
    color: #ebf479;
    text-decoration: none;
  }
  img {
    width: 16px;
    margin-left: 8px;
  }
`;

const Paragraph = styled.div`
  font-size: 16px;
  color: #979abe;
  margin: -24px 0 30px 0;
`;

const Footer = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -36px;
  left: 0;
`;

const HomeContent: NextPageWithLayout = () => {
  const [selectedTab, setSelectedTab] = useState(() => {
    return 'TBD';
  });

  const handleTabClick = (path: string) => {
    setSelectedTab(path);
  };

  const carouselData = [
    {
      title: 'SyncSwap',
    },
    {
      title: 'Test',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleCarouselClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const Carousel = ({ active, children }: { active: boolean; children: React.ReactNode }) => {
    return <div className={`carousel ${active ? 'active' : ''}`}>{children}</div>;
  };

  return (
    <HomePage>
      <Banner>
        <div className="blue-bg">
          <img src={blueBg} alt="" />
        </div>
        <div className="yellow-bg">
          <img src={yellowBg} alt="" />
        </div>
        <div className="banner-content">
          <img src={logoUrl} alt="" />
          <h1>
            your universal entry point into <span>L2s</span>
          </h1>
          <span>Built on Bos </span>
        </div>
      </Banner>

      <Content>
        <Title>How it works</Title>
        <div className="it-works-list">
          <div className="works-list-item">
            <h1>Quick Sign-In</h1>
            <p>Create an account or log in within seconds to obtain your unique web3 identity.</p>
            <a href="#">Sign in / View my profile</a>
            <div className="list-item-img">
              <img src={quick} alt="" />
            </div>
          </div>
          <div className="works-list-arrow">
            <img src={arrow} alt="" />
          </div>
          <div className="works-list-item">
            <h1>Discover DApps</h1>
            <p>Explore a vast array of decentralized applications (DApps) easily and find your favorites.</p>
            <a href="#">Explore</a>
            <div className="list-item-img">
              <img src={discover} alt="" />
            </div>
          </div>
          <div className="works-list-arrow">
            <img src={arrow} alt="" />
          </div>
          <div className="works-list-item">
            <h1>Earn Rewards</h1>
            <p>
              Engage with the DApps of your choice, enjoy a seamless experience, and collect your rewards along the way.
            </p>
            <a href="#">View</a>
            <div className="list-item-img">
              <img src={earn} alt="" />
            </div>
          </div>
        </div>

        <Title>Explore Dapps</Title>

        <CarouselList>
          <div className="carousel-right-icon" onClick={handleCarouselClick}>
            <img src={carouseicon} alt="" />
          </div>
          {carouselData.map((child, index) => (
            <Carousel key={index} active={index === activeIndex}>
              <div className="carousel-content">
                <img src={syncIcon} alt="" />
                <h1>{child.title}</h1>
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
          ))}
        </CarouselList>

        <div className="token-tab-list">
          <div
            className={`tab-list-item ${selectedTab === 'TBD' ? 'active' : ''}`}
            onClick={() => handleTabClick('TBD')}
          >
            Token-TBD🔥
          </div>
          <div
            className={`tab-list-item ${selectedTab === 'token' ? 'active' : ''}`}
            onClick={() => handleTabClick('token')}
          >
            Native token
          </div>
          <ViewAll>
            <Link href="/alldapps">
              <span>View all</span>
              <img src={arrow} alt="" />
            </Link>
          </ViewAll>
        </div>
        {selectedTab == 'TBD' ? (
          <div className="tab-content">
            {dapps
              .filter((dapp) => dapp.TBD_TOKEN === 'Y')
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
                        {dapp.tags.map((tag, index) => (
                          <div className={`tag-item ${tag}`} key={index}>
                            {tag}
                          </div>
                        ))}
                      </Tag>
                    </div>
                    <div className="content-item-btn">
                      <div className="item-btn-item">Collect</div>
                      <div className="item-btn-item">
                        <Link href="/dapps-details">View</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : null}
        {selectedTab == 'token' ? (
          <div className="tab-content">
            {dapps
              .filter((dapp) => dapp.TBD_TOKEN === 'N')
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

        <div style={{ position: 'relative' }}>
          <Title>Explore Layer 2 Blockchains</Title>
          <ViewAll>
            <Link href="/blockchains">
              <span>View all</span>
              <img src={arrow} alt="" />
            </Link>
          </ViewAll>
        </div>
        <div className="explore-layer-list">
          {Object.values(chains)
            .slice(0, 8)
            .map((child, index) => (
              <div className="layer-list-item" key={index}>
                <img src={child.icon} alt="" />
                <h1>{child.chainName}</h1>
                <Gold>
                  <img src={gold} alt="" className="gold-icon" />
                  <p>10</p>
                </Gold>
                <p>Ethereum scalability with zkEVM performance and security</p>
                <div className="list-item-bottom">
                  <Link href="/chains-details">
                    Deep Dive
                    <img src={arrowBlock} alt="" />
                  </Link>
                </div>
              </div>
            ))}
        </div>

        <Title>Shortcuts</Title>
        <Paragraph>
          Shortcuts integrate common functions and the most popular dapps, makes your Defi journey much easier and
          seamless.
        </Paragraph>
        <div className="shortcuts-content">
          <div className="shortcuts-content-img">
            <img src={shortcutsIcon} alt="" />
          </div>
          <div className="shortcuts-content-list">
            {Object.values(chains).map((child, index) => (
              <div style={{ display: 'inline-block' }} key={index}>
                <div className="shortcuts-list-item">
                  <img src={child.icon} alt="" />
                  {child.chainName}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="decentralized-frotnend-content">
          <Title>Decentralized frotnend</Title>
          <div className="frotnend-content-title">
            Powered by <span>BOS</span>allows us to redesign the Web3 user journey
          </div>
          <p>Learn more</p>
          <img src={decentralizedIcon} alt="" />
        </div>

        <Title>Learning</Title>
        <div className="learning-content-item">
          <div className="learning-content-item">
            <div className="content-item-img">
              <img src={learningOne} alt="" />
            </div>
            <div className="content-item-text">
              <h1>User Journey</h1>
              <p>Explore a vast array of decentralized applications (DApps) easily and find your favorites.</p>
              <span>Explore</span>
            </div>
          </div>
          <div className="learning-content-item">
            <div className="content-item-img">
              <img src={learningTwo} alt="" />
            </div>
            <div className="content-item-text">
              <h1>User Journey</h1>
              <p>Explore a vast array of decentralized applications (DApps) easily and find your favorites.</p>
              <span>Explore</span>
            </div>
          </div>
          <div className="learning-content-item">
            <div className="content-item-img">
              <img src={learningThree} alt="" />
            </div>
            <div className="content-item-text">
              <h1>User Journey</h1>
              <p>Explore a vast array of decentralized applications (DApps) easily and find your favorites.</p>
              <span>Explore</span>
            </div>
          </div>
        </div>
        <div className="learning-icon">
          <img src={learningIcon} alt="" />
        </div>
      </Content>
      <Footer>
        <img src={footer} alt="" />
      </Footer>
    </HomePage>
  );
};

HomeContent.getLayout = useDefaultLayout;

export default HomeContent;
