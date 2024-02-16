/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/display-name */
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import popupsData, { IdToPath } from '@/config/all-in-one/chains';
import { QUEST_PATH } from '@/config/quest';
import useDappOpen from '@/hooks/useDappOpen';
import { useDefaultLayout } from '@/hooks/useLayout';
import Dapps from '@/components/Dapps';
import { get } from '@/utils/http';
import type { NextPageWithLayout } from '@/utils/types';
import useCategoryDappList from './Quest/hooks/useCategoryDappList';

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

const deppDiveRightIcon =
  'https://assets.dapdap.net/images/bafkreihhoqvns4ydkem3mbrd52fnpsqrvdzoqqoemaizjxqur7tprzadya.svg';
const decentralizedIcon =
  'https://assets.dapdap.net/images/bafkreibhxqbh3tlqm6cqwqmu7j6afzsc7qab743bvn43zg4klk54tvyceq.svg';

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
          font-size: 16px;
        }
        a {
          color: #d2d2d2;
          text-decoration: underline;
          font-size: 18px;
        }
        .list-item-img {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);

          .img-signin {
            width: 120px;
            height: 120px;
          }
          .img-discover {
            width: 109px;
            height: 96px;
          }
          .img-works {
            width: 90px;
            height: 90px;
          }
        }
        &:nth-child(1) .list-item-img {
          top: -17%;
        }
        &:nth-child(3) .list-item-img {
          top: -12%;
        }
        &:nth-child(5) .list-item-img {
          top: -12%;
        }
        @media (max-width: 1688px) {
          padding: 80px 30px 30px;
          margin-top: 8px;
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
      border-bottom: 1px solid rgba(33, 35, 42, 1);
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
  }

  .explore-layer-blockchains {
    margin-top: 100px;
    .explore-layer-list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 100px;
      padding-left: 18px;
      height: 460px;
      overflow: hidden;
      .layer-list-item {
        height: 220px;
        margin: 0 18px 20px 0;
        background: #21232a;
        border-radius: 20px;
        padding: 20px 60px;
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
      .title {
        font-size: 42px;
      }
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
      .title {
        font-size: 42px;
      }
    }
    .shortcuts-content {
      display: flex;
      margin-bottom: 100px;
      .shortcuts-content-img {
        width: 70%;
        height: fit-content;
        margin-right: 48px;
        border: 2px solid #373a52;
        border-radius: 20px;
        position: relative;
        img {
          width: 100%;
          /* height: 100%; */
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
        a {
          text-decoration: none;
        }
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
      .title {
        font-size: 42px;
      }
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
      height: 206px;
      display: flex;
      overflow: hidden;
      .learning-content-item {
        /* min-width: 539px; */
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
            font-size: 18px;
            color: #d2d2d2;
            text-decoration: underline;
          }
        }
      }
    }

    .learning-icon {
      @media (min-width: 2400px) {
        display: none;
      }
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
        &.disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
  background-image: url(https://assets.dapdap.net/images/banner.png);
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
    border-radius: 20px;
    height: auto;
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
      width: 354px;
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
          text-decoration: none;
          cursor: pointer;
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
            margin-left: 8px;
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

const Carousel = React.memo(
  ({ active, children, style }: { active: boolean; children: React.ReactNode; style?: React.CSSProperties }) => {
    return (
      <div className={`carousel ${active ? 'active' : ''}`} style={style}>
        {children}
      </div>
    );
  },
);

const initialLearningData = [
  {
    icon: '/images/home/learning-1.jpg',
    title: 'User Journey',
  },
  {
    icon: '/images/home/learning-2.jpg',
    title: 'User Journey',
  },
  {
    icon: '/images/home/learning-3.jpg',
    title: 'User Journey',
  },
];

const HomeContent: NextPageWithLayout = () => {
  const [networkList, setNetworkList] = useState<any[]>([]);
  const [nativeToken, setNativeToken] = useState<any[]>([]);
  const [tokenTBD, setTokenTBD] = useState<any[]>([]);
  const [exploreDappList, setExploreDappList] = useState<any[]>([]);
  const { loading, categories } = useCategoryDappList();
  const categoryArray = Object.values(categories);
  const { open } = useDappOpen();
  const popupsDataArray = Object.values(popupsData);
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const resultNetwork = await get(`${QUEST_PATH}/api/network/list`);
        setNetworkList(resultNetwork.data || []);
      } catch (error) {
        console.error('Error fetching resultNetwork data:', error);
      }
    };
    const fetchDappData = async () => {
      try {
        const resultDapp = await get(`${QUEST_PATH}/api/dapp/list?is_recommend=true`);
        setExploreDappList(resultDapp.data?.data || []);
      } catch (error) {
        console.error('Error fetching resultDapp data:', error);
      }
    };
    const fetchNativeToken = async () => {
      try {
        const resultNativeToken = await get(`${QUEST_PATH}/api/dapp/list?tbd_token=N`);
        const data = resultNativeToken.data?.data.slice(0, 9) || [];
        setNativeToken(
          data.map((item: any) => ({
            ...item,
            category_ids: item.dapp_category?.map((_category: any) => _category.category_id),
          })),
        );
      } catch (error) {
        console.error('Error fetching resultDapp data:', error);
      }
    };
    const fetchTokenTBD = async () => {
      try {
        const resultTokenTBD = await get(`${QUEST_PATH}/api/dapp/list?tbd_token=Y`);
        const data = resultTokenTBD.data?.data.slice(0, 9) || [];
        setTokenTBD(
          data.map((item: any) => ({
            ...item,
            category_ids: item.dapp_category?.map((_category: any) => _category.category_id),
          })),
        );
      } catch (error) {
        console.error('Error fetching resultDapp data:', error);
      }
    };
    fetchTokenTBD();
    fetchNativeToken();
    fetchDappData();
    fetchNetworkData();
  }, []);

  function getCategoryNames(dappCategories: any, categoryArray: any[]) {
    const categories = Array.isArray(dappCategories) ? dappCategories : Object.values(dappCategories);
    return categories.map((categoryItem: any) => {
      const categoryId =
        typeof categoryItem === 'object' && categoryItem !== null ? categoryItem.category_id : categoryItem;
      const category = categoryArray.find((c: any) => c.id === categoryId);
      return category && typeof category === 'object' && 'name' in category ? category.name : 'Category not found';
    });
  }

  const [selectedTab, setSelectedTab] = useState(() => {
    return 'token';
  });
  const handleTabClick = (path: string) => {
    setSelectedTab(path);
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const handleCarouselClick = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % exploreDappList.length);
  }, [exploreDappList.filter((dapp) => dapp.recommend === true).length]);

  const [items, setItems] = useState(initialLearningData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learningPage, setLearningPage] = useState(1);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const page = Math.ceil(carouselRef.current.clientWidth / 540);
      setLearningPage(page);
    }
    // if (carouselRef.current && currentIndex === items.length - 1) {
    //   const carousel = carouselRef.current;
    //   carousel.style.transform = `translateX(-${currentIndex * 550}px)`;
    //   setTimeout(() => {
    //     carousel.style.transition = '0.5s';
    //   }, 0);
    // }
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setCurrentIndex(items.length - 2);
    } else if (currentIndex === items.length - 1) {
      setCurrentIndex(1);
    }
  };

  const handleLeftClick = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleRightClick = () => {
    // console.log('currentIndex', currentIndex, learningPage);
    if (currentIndex < learningPage - 1) setCurrentIndex(currentIndex + 1);
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
              <div className="list-item-img">
                <img src="https://assets.dapdap.net/images/home-itworks-quick.png" alt="" className="img-signin" />
              </div>
              <h1>Quick Sign-In</h1>
              <p>Create an account or log in within seconds to obtain your unique web3 identity.</p>
              {/* <a href="#">Sign in / View my profile</a> */}
              {/* <a href="#">View my profile</a> */}
            </div>
            <div className="works-list-arrow">
              <img src="https://assets.dapdap.net/images/arrow-yellow.png" alt="" />
            </div>
            <div className="works-list-item">
              <div className="list-item-img">
                <img src="https://assets.dapdap.net/images/home-itworks-discover.png" alt="" className="img-discover" />
              </div>
              <h1>Discover DApps</h1>
              <p>Explore a vast array of decentralized applications (DApps) easily and find your favorites.</p>
              <Link href="/alldapps">Explore</Link>
            </div>
            <div className="works-list-arrow">
              <img src="https://assets.dapdap.net/images/arrow-yellow.png" alt="" />
            </div>
            <div className="works-list-item">
              <div className="list-item-img">
                <img src="https://assets.dapdap.net/images/home-itworks-earn.png" alt="" className="img-works" />
              </div>
              <h1>Earn Rewards</h1>
              <p>
                Engage with the DApps of your choice, enjoy a seamless experience, and collect your rewards along the
                way.
              </p>
              <Link href="/quest/leaderboard">View</Link>
            </div>
          </div>
        </div>

        <div className="explore-dapps">
          <Title>Explore Dapps</Title>

          <CarouselList>
            <div className="carousel-right-icon" onClick={handleCarouselClick}>
              <img src="https://assets.dapdap.net/images/arrows-carousel.png" alt="" />
            </div>
            {exploreDappList.map((child, index) => {
              const categoryNames = getCategoryNames(child.dapp_category, categoryArray);
              return (
                <Carousel
                  key={index}
                  active={index === activeIndex}
                  style={{ backgroundImage: `url(${child.recommend_icon})` }}
                >
                  <div className="carousel-content">
                    <img src={child.logo} alt="" />
                    <h1>{child.name}</h1>
                    <Tag>
                      {categoryNames.map((categoryName: string, index: number) => (
                        <div className={`tag-item ${categoryName}`} key={index}>
                          {categoryName}
                        </div>
                      ))}
                    </Tag>
                    <p>{child.description}</p>
                    <div className="carousel-btn">
                      <Link className="carousel-btn-item" href={`/dapps-details?dapp_id=${child.id}`}>
                        View Detail
                      </Link>
                      <div
                        className="carousel-btn-item"
                        style={{ marginRight: '0' }}
                        onClick={() => {
                          open({ dapp: child, from: 'home' });
                        }}
                      >
                        Dapp
                        <img src="https://assets.dapdap.net/images/arrow-white.png" alt="" />
                      </div>
                    </div>
                  </div>
                </Carousel>
              );
            })}
          </CarouselList>

          <div className="token-tab-list">
            <div
              className={`tab-list-item ${selectedTab === 'token' ? 'active' : ''}`}
              onClick={() => handleTabClick('token')}
            >
              Native token
            </div>
            <div
              className={`tab-list-item ${selectedTab === 'TBD' ? 'active' : ''}`}
              onClick={() => handleTabClick('TBD')}
            >
              Token-TBD🔥
            </div>
            <ViewAll>
              <Link href="/alldapps">
                <span>View all</span>
                <img src="https://assets.dapdap.net/images/arrow-yellow.png" alt="" />
              </Link>
            </ViewAll>
          </div>
          {selectedTab == 'TBD' && <Dapps dapps={tokenTBD} />}
          {selectedTab == 'token' && <Dapps dapps={nativeToken} />}
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
              networkList.slice(0, 9).map((child, index) => (
                <div className="layer-list-item" key={index}>
                  <Link href={`/network/${IdToPath[child.id]}`}>
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
            <Title className="title">Deep Dive</Title>
            <p>
              Real-time DApp trend data, simple and economical one-click interaction,
              <br /> and easily accessible historical transaction data.
            </p>
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
            </div>
          </div>
        </div>

        <div className="shortcuts">
          <div className="shortcuts-title">
            <img src="https://assets.dapdap.net/images/home-shortcuts.png" alt="" />
            <Title className="title">Shortcuts</Title>
            <p>Streamline your crypto experience with intuitive processes and comprehensive support.</p>
            <Paragraph>
              With our streamlined shortcut features, users from all levels can easily familiarize themselves with and
              harness the power of core decentralized applications.
              <br />
              With dapdap, embark on a simplified yet robust Web3 journey. From asset bridging to earning passive income
              through liquidity provision, we've got you covered.
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
                networkList.map((child, index) => {
                  const matchedItem = popupsDataArray.find((item) => item.chainId === child.chain_id);
                  const path = matchedItem ? matchedItem.path : '';
                  return (
                    <div style={{ display: 'inline-block' }} key={index}>
                      <Link href={`/all-in-one/${path}`}>
                        <div className="shortcuts-list-item">
                          <img src={child.logo} alt="" />
                          {child.name}
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Content>
    </HomePage>
  );
};

HomeContent.getLayout = useDefaultLayout;

export default HomeContent;
