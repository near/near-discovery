/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/display-name */
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const blueBg = (
  <svg width="719" height="719" viewBox="0 0 719 719" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.6" filter="url(#filter0_f_513_4283)">
      <circle cx="359.5" cy="359.5" r="159.5" fill="#1868B3" />
    </g>
    <defs>
      <filter
        id="filter0_f_513_4283"
        x="0"
        y="0"
        width="719"
        height="719"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_513_4283" />
      </filter>
    </defs>
  </svg>
);
const yellowBg = (
  <svg width="628" height="570" viewBox="0 0 628 570" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.4" filter="url(#filter0_f_513_4284)">
      <circle cx="314" cy="256" r="114" fill="#EBF479" />
    </g>
    <defs>
      <filter
        id="filter0_f_513_4284"
        x="0"
        y="-58"
        width="628"
        height="628"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_513_4284" />
      </filter>
    </defs>
  </svg>
);

//test
const syncIcon = 'https://assets.dapdap.net/images/bafkreihzr73on5kcq3zgwjg3jwumiyutxm3np77sri4xfmc5dhtaqmwi3y.svg';
const carouselbg = 'https://assets.dapdap.net/images/bafybeicoasvzxskocvjpdzanvpzip2zoortjo7gttbrmqnuf3vsenvhvty.svg';

//home-deepdive-scatter
const deppDiveRightIcon =
  'https://assets.dapdap.net/images/bafkreihhoqvns4ydkem3mbrd52fnpsqrvdzoqqoemaizjxqur7tprzadya.svg';
const decentralizedIcon =
  'https://assets.dapdap.net/images/bafkreibhxqbh3tlqm6cqwqmu7j6afzsc7qab743bvn43zg4klk54tvyceq.svg';
const learningOne = 'https://assets.dapdap.net/images/bafkreigsyle3grerozvpmp42vhv3d36ny4gdc4vkgthcwefjyinvoangwy.svg';
const learningTwo = 'https://assets.dapdap.net/images/bafybeibgwjzaepfwgtmej4dnjjvtlnbtqukkn3fkde4ufvejnc2hf4yofi.svg';
const learningThree =
  'https://assets.dapdap.net/images/bafkreihnl55yd5ud2nchalsgeyzy2tjq7cqw2bvp25cikxkixj55h6zyte.svg';

const HomePage = styled.div`
  padding: 0 12% 80px 12%;
  position: relative;
`;

const Content = styled.div`
  .how-it-works {
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
        @media (max-width: 1688px) {
          padding: 80px 30px 30px;
          .list-item-img {
            position: absolute;
            top: -56px;
            right: 36%;
          }
        }
      }
      .works-list-arrow {
        padding: 40px 24px 0 24px;
        img {
          width: 20px;
        }
      }
    }
  }

  .explore-dapps {
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
  }

  .explore-layer-blockchains {
    .explore-layer-list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 100px;
      padding-left: 18px;
      .layer-list-item {
        margin: 0 18px 20px 0;
        background: #21232a;
        border-radius: 20px;
        padding: 20px 60px;
        border-bottom: 1px solid #383b48;
        flex-basis: calc(25% - 18px);
        color: #ffffff;
        text-align: center;
        position: relative;
        a {
          color: #ffffff;
          text-decoration: none;
        }
        img {
          width: 72px;
          height: 72px;
        }
        h1 {
          font-size: 20px;
          font-weight: 700;
          margin: 8px 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
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
            text-decoration: none;
          }
        }
        &:hover {
          cursor: pointer;
          .list-item-bottom {
            display: block;
          }
        }
        @media (max-width: 1668px) {
          flex-basis: calc(33% - 18px);
        }
      }
      /* .layer-list-item:nth-child(4n) {
      margin-right: 0;
    } */
    }
  }

  .deep-dive {
    .deepDive-title {
      width: 100%;
      text-align: center;
      img {
        height: 93px;
        margin-bottom: 32px;
        margin-right: 20px;
      }
    }
    .deepDive-content {
      display: flex;
      margin-bottom: 100px;
      .deepDive-content-img {
        width: 70%;
        margin-right: 48px;
        border-radius: 20px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
      }
      .deepDive-content-list {
        width: 30%;
        color: #ffffff;
        a {
          color: #ffffff;
          text-decoration: none;
        }
        .deepDive-list-item {
          background: linear-gradient(180deg, #a55fff 0%, #21232a 100%);
          border-radius: 32px;
          padding: 30px;
          position: relative;
          height: 207px;
          font-weight: 700;
          margin-bottom: 20px;
          .item-right-bg {
            position: absolute;
            right: 0;
            bottom: 0;
          }
          .item-bg-icon {
            position: absolute;
            left: 20px;
            top: 20px;
            img {
              width: 150px;
            }
          }
          .item-arrow-icon {
            position: absolute;
            top: 60px;
            right: 30px;
            img {
              width: 26px;
            }
          }
          p {
            font-size: 18px;
            font-weight: 700;
          }
          h1 {
            font-size: 24px;
            font-weight: 700;
          }
        }
        .list-item-sprcial {
          background: linear-gradient(180deg, #256cb0 0%, #21232a 100%);
        }
      }
    }
  }

  .shortcuts {
    .shortcuts-title {
      width: 100%;
      text-align: center;
      img {
        height: 93px;
        margin-bottom: 32px;
        margin-right: 20px;
      }
      p {
        color: rgba(255, 255, 255, 1);
        font-family: Gantari;
        font-size: 26px;
        font-weight: 500;
        margin-bottom: 42px;
      }
    }
    .shortcuts-content {
      display: flex;
      margin-bottom: 100px;
      .shortcuts-content-img {
        width: 70%;
        margin-right: 48px;
        border: 2px solid #373a52;
        border-radius: 20px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
        .shortcuts-img-banner {
          display: none;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          background: rgba(55, 58, 83, 0.8);
          padding: 14px 45px;
          border-radius: 0 0 20px 20px;
          h1 {
            color: rgba(235, 244, 121, 1);
            font-size: 16px;
            font-weight: 700;
          }
          p {
            color: rgba(255, 255, 255, 1);
            font-size: 16px;
            font-weight: 700;
            display: list-item;
            margin: 0;
          }
        }
        &:hover {
          cursor: pointer;
          .shortcuts-img-banner {
            display: block;
          }
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
      @media (max-width: 1539px) {
        display: block;
        .shortcuts-content-img {
          width: 100%;
          margin-bottom: 24px;
        }
        .shortcuts-content-list {
          width: 100%;
        }
      }
    }
  }

  .decentralized-frotnend {
    text-align: center;
    margin-bottom: 86px;
    .decentralized-frotnend-title {
      width: 100%;
      text-align: center;
      img {
        width: fit-content;
        height: 93px;
        margin-bottom: 32px;
        margin-right: 20px;
      }
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
    }
    p {
      font-size: 16px;
      color: #979abe;
      margin-bottom: 40px;
      text-decoration: underline;
      a {
        color: #979abe;
        text-decoration: none;
      }
    }
    img {
      width: 100%;
    }
  }

  .learning {
    .learning-contents-item {
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
      display: flex;
      text-align: center;
      justify-content: center;
      margin-top: 30px;
      .learning-icon-item {
        border: 1px solid rgba(55, 58, 83, 1);
        width: 55px;
        height: 30px;
        line-height: 26px;
        text-align: center;
        border-radius: 16px;
        margin-right: 14px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          background: #272a38;
        }
      }
      .learning-icon-right {
        img {
          transform: rotate(180deg);
        }
      }
    }
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 448px;
  position: relative;
  background-image: url(https://assets.dapdap.net/images/home-banner-bg.png);
  background-repeat: no-repeat;
  background-size: 94%;
  background-position-x: 18%;
  .blue-bg {
    position: absolute;
    right: 0;
    /* bottom: 0; */
    @media (max-width: 1556px) {
      width: 50%;
      img {
        width: 100%;
      }
    }
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
      /* font-size: 42px; */
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
  @media (max-width: 1500px) {
    height: 336px;
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
  overflow: hidden;
  .carousel-right-icon {
    position: absolute;
    right: 0;
    top: 40%;
    z-index: 1;
    cursor: pointer;
    img {
      height: 36px;
    }
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
          a {
            color: #ffffff;
            text-decoration: none;
          }
          img {
            width: 12px;
            height: 8px;
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
    margin-bottom: 4px;
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


const Carousel = React.memo(({ active, children }: { active: boolean; children: React.ReactNode }) => {
  return <div className={`carousel ${active ? 'active' : ''}`}>{children}</div>;
});

const initialLearningData = [
  {
    icon: learningOne,
    title: 'User Journey',
  },
  {
    icon: learningTwo,
    title: 'User Journey',
  },
  {
    icon: learningThree,
    title: 'User Journey',
  },
];

const HomeContent: NextPageWithLayout = () => {
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

  const [activeIndex, setActiveIndex] = useState(0);
  const handleCarouselClick = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % dappList.filter((dapp) => dapp.recommend === true).length);
  }, [dappList.filter((dapp) => dapp.recommend === true).length]);
  const [learningData, setLearningData] = useState(initialLearningData);
  const handleLeftClick = () => {
    const newData = [...learningData];
    const lastItem = newData.pop();
    if (lastItem) {
      newData.unshift(lastItem);
      setLearningData(newData);
    }
  };
  const handleRightClick = () => {
    const newData = [...learningData];
    const firstItem = newData.shift();
    if (firstItem) {
      newData.push(firstItem);
      setLearningData(newData);
    }
  };

  return (
    <HomePage>
      <Banner>
        <div className="blue-bg">{blueBg}</div>
        <div className="yellow-bg">{yellowBg}</div>
        <div className="banner-content">
          <img src="https://assets.dapdap.net/images/logo.png" alt="" />
          <h1>
            Your Universal Entry Point Into <span>L2s</span>
          </h1>
          <span>Built On Bos </span>
        </div>
      </Banner>

      <Content>
        <div className="how-it-works">
          <Title>How It Works</Title>
          <div className="it-works-list">
            <div className="works-list-item">
              <h1>Quick Sign-In</h1>
              <p>Create an account or log in within seconds to obtain your unique web3 identity.</p>
              {/* <a href="#">Sign in / View my profile</a> */}
              {/* <a href="#">View my profile</a> */}
              <div className="list-item-img">
                <img src="https://assets.dapdap.net/images/home-itworks-quick.png" alt="" />
              </div>
            </div>
            <div className="works-list-arrow">
              <img src="https://assets.dapdap.net/images/arrow-yellow.png" alt="" />
            </div>
            <div className="works-list-item">
              <h1>Discover DApps</h1>
              <p>Explore a vast array of decentralized applications (DApps) easily and find your favorites.</p>
              <Link href="/alldapps">Explore</Link>
              <div className="list-item-img">
                <img src="https://assets.dapdap.net/images/home-itworks-discover.png" alt="" />
              </div>
            </div>
            <div className="works-list-arrow">
              <img src="https://assets.dapdap.net/images/arrow-yellow.png" alt="" />
            </div>
            <div className="works-list-item">
              <h1>Earn Rewards</h1>
              <p>
                Engage with the DApps of your choice, enjoy a seamless experience, and collect your rewards along the
                way.
              </p>
              <a href="#">View</a>
              <div className="list-item-img">
                <img src="https://assets.dapdap.net/images/home-itworks-earn.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="explore-dapps">
          <Title>Explore Dapps</Title>

          <CarouselList>
            <div className="carousel-right-icon" onClick={handleCarouselClick}>
              <img src="https://assets.dapdap.net/images/arrows-carousel.png" alt="" />
            </div>
            {dappList
              .filter((dapp) => dapp.recommend === true)
              .map((child, index) => (
                <Carousel key={index} active={index === activeIndex}>
                  <div className="carousel-content">
                    <img src={child.recommend_icon} alt="" />
                    <h1>{child.title}</h1>
                    <Tag>
                      {/* {child.tag &&
                        child.tag.map((tagItem: string, index: number) => (
                          <div className={`tag-item ${tagItem}`} key={index}>
                            {tagItem}
                          </div>
                        ))} */}
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
                <img src="https://assets.dapdap.net/images/arrow-yellow.png" alt="" />
              </Link>
            </ViewAll>
          </div>
          {selectedTab == 'TBD' ? (
            <div className="tab-content">
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
                          <Link href={dapp.route}>Dapp</Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : null}
          {selectedTab == 'token' ? (
            <div className="tab-content">
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
          ) : null}
        </div>

        <div className="explore-layer-blockchains">
          <div style={{ position: 'relative' }}>
            <Title>Explore Layer 2 Blockchains</Title>
            <ViewAll>
              <Link href="/blockchains">
                <span>View all</span>
                <img src="https://assets.dapdap.net/images/arrow-yellow.png" alt="" />
              </Link>
            </ViewAll>
          </div>
          <div className="explore-layer-list">
            {networkList &&
              networkList.slice(0, 8).map((child, index) => (
                <div className="layer-list-item" key={index}>
                  <Link href="/chains-details">
                    <img src={child.logo} alt="" />
                    <h1>{child.name}</h1>
                    {/* <Gold>
                      <img src="https://assets.dapdap.net/images/gold.png" alt="" className="gold-icon" />
                      <p>10</p>
                    </Gold> */}
                    <p>{child.description}</p>
                    {child.name === 'Polygon zkEVM' && (
                      <div className="list-item-bottom">
                        <Link href="/warmup">
                          Deep Dive
                          <img src="https://assets.dapdap.net/images/arrow-black.png" alt="" />
                        </Link>
                      </div>
                    )}
                  </Link>
                </div>
              ))}
          </div>
        </div>

        <div className="deep-dive">
          <div className="deepDive-title">
            <img src="https://assets.dapdap.net/images/home-deepdive.png" alt="" />
            <Title>Deep Dive</Title>
            <Paragraph>
              Real-time DApp trend data, simple and economical one-click interaction, and easily accessible historical
              transaction data.
            </Paragraph>
          </div>
          <div className="deepDive-content">
            <div className="deepDive-content-img">
              <img src="https://assets.dapdap.net/images/home-deepdive-example.png" alt="" />
            </div>
            <div className="deepDive-content-list">
              <Link href="/warmup">
                <div className="deepDive-list-item">
                  <div className="item-right-bg">
                    <img src={deppDiveRightIcon} alt="" />
                  </div>
                  <div className="item-bg-icon">
                    <img src="https://assets.dapdap.net/images/polygon-zkEVM-bg.png" alt="" />
                  </div>
                  <div className="item-arrow-icon">
                    <img src="https://assets.dapdap.net/images/arrow-white.png" alt="" />
                  </div>
                  <p>Deep Dive into</p>
                  <h1>Polygon zkEVM</h1>
                </div>
              </Link>
              <div className="deepDive-list-item list-item-sprcial">
                <div className="item-right-bg">
                  <img src={deppDiveRightIcon} alt="" />
                </div>
                <div className="item-bg-icon">
                  <img
                    src="https://assets.dapdap.net/images/bafkreie7thart7hj63xd2q27eronnchjfikyxjh3jwhzbjckvbp74so4fi.svg"
                    alt=""
                  />
                </div>
                <div className="item-arrow-icon">
                  <img src="https://assets.dapdap.net/images/arrow-white.png" alt="" />
                </div>
                <p>Deep Dive into</p>
                <h1>Linea</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="shortcuts">
          <div className="shortcuts-title">
            <img src="https://assets.dapdap.net/images/home-shortcuts.png" alt="" />
            <Title>Shortcuts</Title>
            <p>Streamline your crypto experience with intuitive processes and comprehensive support.</p>
            <Paragraph>
              With our streamlined shortcut features, users from all levels can easily familiarize themselves with and
              harness the power of core decentralized applications. With dapdap, embark on a simplified yet robust Web3
              journey. From asset bridging to earning passive income through liquidity provision, we've got you covered.
            </Paragraph>
          </div>
          <div className="shortcuts-content">
            <div className="shortcuts-content-img">
              <img src="./shortcut.gif" alt="" />
              <div className="shortcuts-img-banner">
                <h1>Connect L1 to L2 with Ease</h1>
                <p>Quick and Secure: Transition your assets from Ethereum to Layer 2 swiftly and securely.</p>
                <p>Cost-Effective: Benefit from lower transaction fees for maximized efficiency. User-Friendly: Our</p>
                <p>step-by-step guidance simplifies the bridging process for all users.</p>
              </div>
            </div>
            <div className="shortcuts-content-list">
              {networkList &&
                networkList.map((child, index) => (
                  <div style={{ display: 'inline-block' }} key={index}>
                    <div className="shortcuts-list-item">
                      <img src={child.logo} alt="" />
                      {child.name}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="decentralized-frotnend">
          <div className="decentralized-frotnend-title">
            <img
              src="https://assets.dapdap.net/images/bafkreianvp55gpfwvvlamdmvq6yx5omqomtjcntbtkiouv4bxukpgcbwwe.svg"
              alt=""
            />
            <Title>Decentralized frotnend</Title>
            <div className="frotnend-content-title">
              Powered by <span>BOS</span>allows us to redesign the Web3 user journey
            </div>
          </div>
          <p>
            <Link href="https://near.org/"> Learn more</Link>
          </p>
          <img src={decentralizedIcon} alt="" />
        </div>

        <div className="learning">
          <Title>Learning</Title>
          <div className="learning-contents-item">
            {learningData.map((item, index) => (
              <div className="learning-content-item" key={index}>
                <div className="content-item-img">
                  <img src={item.icon} alt="" />
                </div>
                <div className="content-item-text">
                  <h1>{item.title}</h1>
                  <p>Explore a vast array of decentralized applications (DApps) easily and find your favorites.</p>
                  <Link href="https://dapdapnet.notion.site/Dap-Dap-The-Beginning-of-a-New-Web3-Experience-471b4ceb6757464b9fe59708f7cfb0e8">
                    <span>Explore</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="learning-icon">
            <div className="learning-icon-item learning-icon-left" onClick={handleRightClick}>
              <img
                src="https://assets.dapdap.net/images/bafkreigissws3h5v2ubdkitniqr5v3mqq2gg5fj2jje4tzxqg2ttjto5fy.svg"
                alt=""
              />
            </div>
            <div className="learning-icon-item learning-icon-right" onClick={handleLeftClick}>
              <img
                src="https://assets.dapdap.net/images/bafkreigissws3h5v2ubdkitniqr5v3mqq2gg5fj2jje4tzxqg2ttjto5fy.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </Content>
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
    </HomePage>
  );
};

HomeContent.getLayout = useDefaultLayout;

export default HomeContent;
