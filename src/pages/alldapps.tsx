/* eslint-disable react/display-name */
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import chains from '@/config/chains';
import { dapps } from '@/config/dapps';
import { QUEST_PATH } from '@/config/quest';
import useDappOpen from '@/hooks/useDappOpen';
import { useDefaultLayout } from '@/hooks/useLayout';
import { get } from '@/utils/http';
import type { NextPageWithLayout } from '@/utils/types';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);
const carouseicon = 'https://assets.dapdap.net/images/bafkreigqhaprvqrmha234q4k2rqnd4kraqh6k4cpbjoaga3te3zey5kg3e.svg';

const AllDappsPage = styled.div`
  color: #ffffff;
  padding: 0 12% 80px 12%;
  position: relative;
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
  .tab-content {
    /* padding: 20px 0; */
    .page-netWork-list {
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      .netWork-list-conter {
        display: flex;
        flex-wrap: wrap;
        width: 84%;
      }
      .netWork-list-btn {
        width: 12%;
        border: 1px solid rgba(55, 58, 83, 1);
        height: 32px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        background-color: rgb(45, 48, 58);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        cursor: pointer;
        .list-btn-img {
          width: 8px;
          margin-left: 8px;
          transform: rotate(270deg);
        }
        .rotate {
          transform: rotate(90deg);
        }
      }
      .netWork-list-line {
        width: 1px;
        height: 30px;
        margin: 0 20px;
        background-color: rgb(45, 48, 58);
      }
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
      .none {
        display: none;
      }
      .block {
        display: block;
      }
    }
    .expanded {
      overflow: hidden;
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
      .Bridge {
        border: 1px solid rgba(227, 233, 157, 1);
      }
      .Swap {
        border: 1px solid rgba(172, 252, 237, 1);
      }
      .Dex {
        border: 1px solid rgba(172, 252, 237, 1);
      }
      .Lending {
        border: 1px solid rgba(173, 255, 181, 1);
      }
      .Liquidity {
        border: 1px solid rgba(170, 214, 255, 1);
      }
      .Staking {
        border: 1px solid rgba(193, 191, 255, 1);
      }
      .Yield {
        border: 1px solid rgba(249, 181, 230, 1);
      }
      .BridgeActive {
        background: rgba(227, 233, 157, 1);
        color: rgba(0, 0, 0, 1);
      }
      .SwapActive {
        background: rgba(172, 252, 237, 1);
        color: rgba(0, 0, 0, 1);
      }
      .DexActive {
        background: rgba(172, 252, 237, 1);
        color: rgba(0, 0, 0, 1);
      }
      .LendingActive {
        background: rgba(173, 255, 181, 1);
        color: rgba(0, 0, 0, 1);
      }
      .LiquidityActive {
        background: rgba(170, 214, 255, 1);
        color: rgba(0, 0, 0, 1);
      }
      .StakingActive {
        background: rgba(193, 191, 255, 1);
        color: rgba(0, 0, 0, 1);
      }
      .YieldActive {
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
    /* margin-bottom: 100px; */

    .tab-content-item {
      margin: 30px 20px 0 0;
      border-bottom: 1px solid rgba(38, 40, 47, 1);
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
          cursor: pointer;
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
      @media (max-width: 1200px) {
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
  }
  .Swap {
    color: rgba(172, 252, 237, 1);
    border: 1px solid rgba(172, 252, 237, 1);
  }
  .Bridge {
    color: rgba(227, 233, 157, 1);
    border: 1px solid rgba(227, 233, 157, 1);
  }
  .DEX {
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

const Pagination = styled.div`
  margin-top: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .pagination-item {
    width: 55px;
    height: 30px;
    border-radius: 16px;
    border: 1px solid rgba(55, 58, 83, 1);
    text-align: center;
    line-height: 25px;
    cursor: pointer;
    img {
      width: 6px;
      height: 12px;
    }
    &:hover {
      background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
    }
  }
  .pagination-right {
    img {
      transform: rotate(180deg);
    }
  }
  .pagination-number {
    font-family: Gantari;
    font-size: 14px;
    font-weight: 400;
    color: rgba(151, 154, 190, 1);
    cursor: pointer;
  }
  .active {
    color: rgba(255, 255, 255, 1);
  }
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

const AllDappsColumn: NextPageWithLayout = () => {
  const [networkList, setNetworkList] = useState<any[]>([]);
  const [dappList, setDappList] = useState<any>(null);
  const [carouselList, setCarouselList] = useState<any[]>([]);
  const { loading, categories } = useCategoryDappList();
  const categoryArray = Object.values(categories);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useDappOpen();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [listHeight, setListHeight] = useState('auto');
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFunction, setSelectedFunction] = useState<string[]>([]);
  const [isFavoriteList, setIsFavoriteList] = useState<any[]>([]);
  const [isFavoriteTab, setIsFavoriteTab] = useState(false);
  const [selectedTab, setSelectedTab] = useState(() => {
    return 'token';
  });
  const [selectedMedalMenu, setSelectedMedalMenu] = useState<number | ''>('');
  const [selectedMenu, setSelectedMenu] = useState(() => {
    return '';
  });

  function getCategoryNames(dappCategories: any, categoryArray: any[]) {
    const categories = Array.isArray(dappCategories) ? dappCategories : Object.values(dappCategories);
    return categories.map((categoryItem: any) => {
      const categoryId =
        typeof categoryItem === 'object' && categoryItem !== null ? categoryItem.category_id : categoryItem;
      const category = categoryArray.find((c: any) => c.id === categoryId);
      return category && typeof category === 'object' && 'name' in category ? category.name : 'Category not found';
    });
  }
  const handleCarouselClick = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselList.filter((dapp) => dapp.recommend === true).length);
  }, [carouselList.filter((dapp) => dapp.recommend === true).length]);
  const handleTabClick = (path: string) => {
    if (path === 'favorites') {
      setIsFavoriteTab(true);
    } else {
      setIsFavoriteTab(false);
    }
    setSelectedTab(path);
  };
  const handleMenuClick = (path: string) => {
    if (selectedMenu === path) {
      setSelectedMenu('');
    } else {
      setSelectedMenu(path);
    }
  };
  const handleFunctionClick = (functionType: any) => {
    const id = functionType.id;
    let _selectedFunction: string[] = [];
    if (selectedFunction.includes(String(id))) {
      _selectedFunction = selectedFunction.filter((type) => type !== String(id));
    } else {
      _selectedFunction = [...selectedFunction, String(id)];
    }
    const params = new URLSearchParams(searchParams);
    if (_selectedFunction.length) {
      params.set('category', _selectedFunction.join(','));
    } else {
      params.delete('category');
    }
    router.push(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`);
  };
  const handleMedalMenuClick = (path: number) => {
    if (selectedMedalMenu === path) {
      setSelectedMedalMenu('');
    } else {
      setSelectedMedalMenu(path);
    }
  };

  const fetchIsFavoriteList = async () => {
    try {
      const resultDapp = await get(`${QUEST_PATH}/api/dapp/favorite_list`);
      setIsFavoriteList(resultDapp.data || []);
    } catch (error) {
      console.error('Error fetching resultDapp data:', error);
    }
  };
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const resultNetwork = await get(`${QUEST_PATH}/api/network/list`);
        setNetworkList(resultNetwork.data || []);
      } catch (error) {
        console.error('Error fetching resultNetwork data:', error);
      }
    };
    const fetchCarouselData = async () => {
      try {
        const resultDapp = await get(`${QUEST_PATH}/api/dapp/list?page=1&page_size=31`);
        setCarouselList(resultDapp.data?.data || []);
        setTotalPages(resultDapp.data.total_page || 0);
      } catch (error) {
        console.error('Error fetching resultDapp data:', error);
      }
    };
    fetchCarouselData();
    fetchNetworkData();
    fetchIsFavoriteList();
  }, []);

  const fetchDappData = async (page: number) => {
    try {
      const resultDapp = await get(`${QUEST_PATH}/api/dapp/list?&page=${page}&page_size=31`);
      setDappList(resultDapp.data?.data || []);
    } catch (error) {
      console.error('Error fetching resultDapp data:', error);
    }
  };
  const fetchFilteredDappData = async (page: number) => {
    try {
      const params = {
        tbd_token: selectedTab === 'TBD',
        network_ids: selectedMenu,
        category_ids: selectedFunction.length ? selectedFunction.join(',') : undefined,
        quest: selectedMedalMenu,
        is_favorite: isFavoriteTab,
      };
      if (typeof params !== 'object') {
        throw new Error('params is not an object');
      }
      const entries = Object.entries(params);
      if (!Array.isArray(entries)) {
        throw new Error('Object.entries(params) did not return an array');
      }
      const filteredEntries = entries.filter(([, value]) => value !== undefined && value !== '');
      if (!Array.isArray(filteredEntries)) {
        throw new Error('filter did not return an array');
      }
      const queryString = filteredEntries.map(([key, value]) => `${key}=${value}`).join('&');
      const url = `${QUEST_PATH}/api/dapp/filter_list?${queryString}&page=${page}&page_size=31`;
      const resultDapp = await get(url);
      if (selectedTab === 'favorites') {
        setIsFavoriteList(resultDapp.data?.data || []);
      } else {
        setDappList(resultDapp.data?.data || []);
      }
    } catch (error) {
      console.error('Error fetching filtered dapp data:', error);
    }
  };
  useEffect(() => {
    const categoryFromQuery = router.query.category ? (router.query.category as string).split(',') : [];
    setSelectedFunction(categoryFromQuery);
  }, [router.query.category]);
  useEffect(() => {
    const categoryFromQuery = router.query.category ? (router.query.category as string).split(',') : [];
    if (JSON.stringify(categoryFromQuery) === JSON.stringify(selectedFunction)) {
      if (selectedMenu || selectedFunction.length || selectedMedalMenu !== '') {
        fetchFilteredDappData(currentPage);
      } else {
        if (selectedTab === 'favorites') {
          fetchIsFavoriteList();
        } else {
          fetchDappData(currentPage);
        }
      }
    }
  }, [selectedMenu, selectedFunction, selectedMedalMenu, selectedTab, router.query.category, currentPage]);

  const toggleExpanded = () => {
    if (isExpanded) {
      setListHeight(`auto`);
      setIsExpanded(false);
    } else {
      setListHeight('45px');
      setIsExpanded(true);
    }
  };
  useEffect(() => {
    const checkHeight = () => {
      if (listRef.current && listRef.current.offsetHeight > 45) {
        setListHeight('45px');
        setIsExpanded(true);
      } else {
        setListHeight('auto');
      }
    };
    if (typeof window !== 'undefined') {
      const timer = setTimeout(checkHeight, 0);
      window.addEventListener('resize', checkHeight);

      return () => {
        window.removeEventListener('resize', checkHeight);
        clearTimeout(timer);
      };
    }
  }, [
    networkList,
    typeof window !== 'undefined' && window.innerWidth,
    typeof window !== 'undefined' && window.innerHeight,
  ]);

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
        {carouselList
          .filter((dapp) => dapp.recommend === true)
          .map((child, index) => {
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
                    <div className="carousel-btn-item">
                      <Link href={`/dapps-details?dapp_id=${child.id}`}>View Detail</Link>
                    </div>
                    <div className="carousel-btn-item" style={{ marginRight: '0' }}>
                      <Link href={child.route}>Dapp</Link>{' '}
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
          💰 Native token
        </div>
        <div className={`tab-list-item ${selectedTab === 'TBD' ? 'active' : ''}`} onClick={() => handleTabClick('TBD')}>
          🔥 Token-TBD
        </div>
        <div
          className={`tab-list-item ${selectedTab === 'favorites' ? 'active' : ''}`}
          onClick={() => handleTabClick('favorites')}
        >
          ❤️ Favorites
        </div>
      </div>
      <div className="tab-content">
        <Title>Network</Title>
        <div
          className={`page-netWork-list ${isExpanded ? 'expanded' : ''}`}
          ref={listRef}
          style={{ height: listHeight }}
        >
          <div className="netWork-list-conter">
            {networkList &&
              networkList.map((child, index) => (
                <div
                  className={`netWork-list-item ${selectedMenu === String(child.id) ? 'active' : ''}`}
                  key={index}
                  onClick={() => child.id && handleMenuClick(String(child.id))}
                >
                  <img src={child.logo} alt="" />
                  {child.name}
                </div>
              ))}
          </div>
          <div className="netWork-list-line"> </div>
          <div className="netWork-list-btn" onClick={toggleExpanded}>
            {isExpanded ? 'Other Chains' : 'Close Chains'}
            <img
              src="https://assets.dapdap.net/images/bafkreigissws3h5v2ubdkitniqr5v3mqq2gg5fj2jje4tzxqg2ttjto5fy.svg"
              alt=""
              className={`list-btn-img ${isExpanded ? '' : 'rotate'}`}
            />
          </div>
        </div>
        <Title>Function</Title>
        <div className="page-function-list">
          <div className="page-function-list">
            {categoryArray &&
              categoryArray.map((item: any, index: number) => {
                // REF-5789 隐藏Bridge
                if (item.name === 'Bridge') return null;
                return (
                  <div
                    key={index}
                    className={`function-list-item ${item.name} ${
                      selectedFunction.includes(String(item.id)) ? item.name + 'Active' : ''
                    }`}
                    onClick={() => handleFunctionClick(item)}
                  >
                    {item.name}
                  </div>
                );
              })}
          </div>
        </div>

        <Title>Medal Quest</Title>
        <div className="page-medal-list">
          <div
            className={`medal-list-item ${selectedMedalMenu === 0 ? 'active' : ''}`}
            onClick={() => handleMedalMenuClick(0)}
          >
            Both
          </div>
          <div
            className={`medal-list-item ${selectedMedalMenu === 1 ? 'active' : ''}`}
            onClick={() => handleMedalMenuClick(1)}
          >
            Yes
          </div>
          <div
            className={`medal-list-item ${selectedMedalMenu === 2 ? 'active' : ''}`}
            onClick={() => handleMedalMenuClick(2)}
          >
            No
          </div>
        </div>
      </div>
      {selectedTab == 'TBD' ? (
        <div className="tab-content-page">
          {dappList &&
            dappList
              .filter((dapp: any) => dapp.tbd_token === 'Y')
              .map((dapp: any, index: number) => {
                const categoryData = dapp.dapp_category || dapp.category_ids;
                const categoryNames = getCategoryNames(categoryData, categoryArray);
                return (
                  <div className="tab-content-item" key={index}>
                    <div className="content-item-img">
                      <img src={dapp.logo} alt="" />
                    </div>
                    <div className="content-item-text">
                      <h1>{dapp.name}</h1>
                      <p>{dapp.description}</p>
                      <Tag>
                        {categoryNames.map((categoryName: string, index: number) => (
                          <div className={`tag-item ${categoryName}`} key={index}>
                            {categoryName}
                          </div>
                        ))}
                      </Tag>
                    </div>
                    <div className="content-item-btn">
                      <div className="item-btn-item">
                        <Link href={`/dapps-details?dapp_id=${dapp.id}`}>Detail</Link>
                      </div>
                      <div
                        className="item-btn-item"
                        onClick={() => {
                          open(dapp, 'alldapps');
                        }}
                      >
                        Dapp
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
            {dappList &&
              dappList
                .filter((dapp: any) => dapp.tbd_token === 'N')
                .map((dapp: any, index: number) => {
                  const categoryData = dapp.dapp_category || dapp.category_ids;
                  const categoryNames = getCategoryNames(categoryData, categoryArray);
                  return (
                    <div className="tab-content-item" key={index}>
                      <div className="content-item-img">
                        <img src={dapp.logo} alt="" />
                      </div>
                      <div className="content-item-text">
                        <h1>{dapp.name}</h1>
                        <p>{dapp.description}</p>
                        <Tag>
                          {categoryNames.map((categoryName: string, index: number) => (
                            <div className={`tag-item ${categoryName}`} key={index}>
                              {categoryName}
                            </div>
                          ))}
                        </Tag>
                      </div>
                      <div className="content-item-btn">
                        <div className="item-btn-item">
                          <Link href={`/dapps-details?dapp_id=${dapp.id}`}>Detail</Link>
                        </div>
                        <div
                          className="item-btn-item"
                          onClick={() => {
                            open(dapp, 'alldapps');
                          }}
                        >
                          Dapp
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </>
      ) : null}
      {selectedTab == 'favorites' ? (
        <>
          <div className="tab-content-page">
            {isFavoriteList &&
              isFavoriteList.map((dapp: any, index: number) => {
                const categoryData = dapp.dapp_category || dapp.category_ids;
                const categoryNames = getCategoryNames(categoryData, categoryArray);
                return (
                  <div className="tab-content-item" key={index}>
                    <div className="content-item-img">
                      <img src={dapp.logo} alt="" />
                    </div>
                    <div className="content-item-text">
                      <h1>{dapp.name}</h1>
                      <p>{dapp.description}</p>
                      <Tag>
                        {categoryNames.map((categoryName: string, index: number) => (
                          <div className={`tag-item ${categoryName}`} key={index}>
                            {categoryName}
                          </div>
                        ))}
                      </Tag>
                    </div>
                    <div className="content-item-btn">
                      <div className="item-btn-item">
                        <Link href={`/dapps-details?dapp_id=${dapp.id}`}>Detail</Link>
                      </div>
                      <div
                        className="item-btn-item"
                        onClick={() => {
                          open(dapp, 'alldapps');
                        }}
                      >
                        Dapp
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : null}
      {dappList && dappList.length > 0 && selectedTab !== 'favorites' && (
        <Pagination>
          <div
            className="pagination-item"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            <img
              src="https://assets.dapdap.net/images/bafkreigissws3h5v2ubdkitniqr5v3mqq2gg5fj2jje4tzxqg2ttjto5fy.svg"
              alt=""
            />
          </div>
          {Array.from(Array(totalPages).keys()).map(
            (page) =>
              Math.abs(currentPage - (page + 1)) <= 5 && (
                <div
                  key={page}
                  className={`pagination-number ${currentPage === page + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </div>
              ),
          )}
          <div
            className="pagination-item pagination-right"
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            style={{
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            <img
              src="https://assets.dapdap.net/images/bafkreigissws3h5v2ubdkitniqr5v3mqq2gg5fj2jje4tzxqg2ttjto5fy.svg"
              alt=""
            />
          </div>
        </Pagination>
      )}
    </AllDappsPage>
  );
};

AllDappsColumn.getLayout = useDefaultLayout;

export default AllDappsColumn;
