import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { QUEST_PATH } from '@/config/quest';
import useDappOpen from '@/hooks/useDappOpen';
import { useDefaultLayout } from '@/hooks/useLayout';
import { get } from '@/utils/http';
import type { NextPageWithLayout } from '@/utils/types';
import ProcessBar from '@/views/Quest/components/ProcessBar';
import Steps from '@/views/Quest/components/QuestItem/step-icon';
import { StyledCoin, StyledProcessBars, StyledTag } from '@/views/Quest/components/QuestItem/styles';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';
import useLike from '@/views/Quest/hooks/useLike';
import { StyledHeartBox } from '@/views/QuestDetail/components/Details/styles';
import Empty from '@/components/Empty';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);
const several = 'https://assets.dapdap.net/images/bafkreib4xkaqeaxyfbdbjnvvnptlch3t6qtautxw2miflew4oqmc45nxdy.svg';
const arrowBlock = 'https://assets.dapdap.net/images/bafkreihv4t6xu7bzjxeqdi7do4qdbncolgyhk3d4c53vbsu22xkv3hrrge.svg';

const DappsDetails = styled.div`
  color: #ffffff;
  position: relative;
  padding-bottom: 100px;
`;
const DappsDetailsTitle = styled.div`
  background: #000000;
  margin: -54px -36px;
  padding: 30px 12%;
  width: auto;
  .header-details-body {
    display: flex;
    .details-body-left {
      .body-left-detailed {
        display: flex;
        margin-bottom: 26px;
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
            margin-right: 10px;
            margin-top: -4px;
          }
        }
      }
      .body-left-several {
        display: flex;
        margin-bottom: 27px;
        img {
          height: 20px;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          margin: 0 30px 0 10px;
        }
        .left-several-btn {
          background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
          border: 1px solid #373a53;
          text-align: center;
          font-size: 14px;
          border-radius: 16px;
          padding: 4px 16px;
        }
      }
      .left-enter-Dapp {
        display: flex;
        .enter-Dapp-item {
          width: auto;
          background: #373a5380;
          border-radius: 8px;
          padding: 8px 27px;
          text-align: center;
          margin-right: 16px;
          height: 72px;
          p {
            color: #979abe;
            font-size: 14px;
            font-weight: 300;
            margin-bottom: 8px;
          }
          img {
            width: 20px;
            height: 20px;
            margin-right: 6px;
          }
          h1 {
            font-size: 16px;
            font-weight: 400;
            color: #ffffff;
          }
        }
        .Dapp-item-special {
          width: auto;
          display: flex;
          align-items: center;
          background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
          color: #02051e;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          a {
            color: #02051e;
            text-decoration: none;
            margin-right: 8px;
          }
        }
      }
    }
    .details-body-right {
      display: flex;
      flex: 1;
      text-align: center;
      justify-content: flex-end;
    }
  }
`;

const DappsDetailsContent = styled.div`
  display: flex;
  padding: 100px 12%;
  .left-side-substance {
    /* width: 70%; */
    flex: 1;
    margin-right: 86px;
    p {
      font-size: 14px;
      font-weight: 300;
      color: #979abe;
      margin-bottom: 100px;
    }
    .title-right-list {
      display: flex;
      float: right;
      .right-list-item {
        display: flex;
        margin-left: 60px;
        line-height: 30px;
        p {
          color: #ebf479;
          font-size: 20px;
          font-weight: 400;
          margin: 0 8px 0 0;
        }
        span {
          font-size: 14px;
          font-weight: 400;
          color: #979abe;
        }
      }
    }
    .left-side-tab {
      background: rgba(33, 35, 42, 0.9);
      border-radius: 20px;
      padding: 20px 0;
      table {
        width: 100%;
        tr {
          th {
            padding: 0 24px;
            color: rgba(124, 127, 150, 1);
            font-size: 14px;
            font-weight: 400;
          }
          td {
            padding: 0 24px;
            font-size: 14px;
            font-weight: 400;
            height: 44px;
            line-height: 44px;
            .td-avatar {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              display: inline-block;
              margin-right: 4px;
              background: conic-gradient(from 180deg at 50% 50%, #00d1ff 0deg, #ff008a 360deg);
            }
          }
        }
        tr:has(td):hover {
          background-color: rgba(53, 55, 73, 0.5);
        }
        @media (max-width: 1380px) {
          tr {
            td {
              padding: 0 18px;
            }
          }
        }
        @media (max-width: 1327px) {
          tr {
            td {
              padding: 0 8px;
            }
          }
        }
      }
    }
  }
  .right-side-substance {
    width: 416px;
    .right-side-item {
      text-decoration: none;
      /* width: auto; */
      height: 196px;
      border: 1px solid rgba(55, 58, 83, 1);
      background: rgb(44, 46, 62);
      border-radius: 20px;
      display: -webkit-box;
      margin-top: 15px;
      padding: 24px 20px 20px 20px;
      margin-bottom: 15px;
      .side-item-icon {
        width: 30%;
        height: 70%;
        margin-right: 27px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .side-item-text {
        width: 60%;
        h1 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: Gantari;
          font-size: 18px;
          font-weight: 700;
          color: rgba(255, 255, 255, 1);
        }
        p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          /* height: 72px; */
          overflow: hidden;
          font-family: Gantari;
          font-size: 15px;
          font-weight: 400;
          color: rgba(151, 154, 190, 1);
        }
        .side-item-tag {
          display: flex;
          gap: 8px;
          margin-top: 11px;
          /* @media (max-width: 1600px) {
            display: grid;
          } */
        }
      }
    }
  }
`;
const DappsDetailBottom = styled.div`
  padding: 0 12%;
  .tab-content {
    /* border-bottom: 1px solid #383b48; */
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 100px;

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
          text-decoration: none;
          display: inline-block;
          background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
          border: 1px solid #373a53;
          font-size: 12px;
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

const Golds = styled.div`
  float: right;
  background: linear-gradient(180deg, #ffe98b 0%, #ffdd4d 100%);
  border-radius: 16px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 700;
  color: #000000;
  width: auto;
  margin-left: 12px;
  height: 26px;
  line-height: 18px;
  img {
    width: 18px !important;
    height: 18px !important;
    margin-right: 2px !important;
  }
`;

const Title = styled.div`
  font-family: Gantari;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  display: inline-block;
`;

const STEPS_MAP: { [key: string]: number } = {
  Begginer: 1,
  Intermediate: 2,
  Senior: 3,
};

const DappsDetailsColumn: NextPageWithLayout = () => {
  const router = useRouter();
  const { dapp_id } = router.query;
  const [data, setData] = useState<any>(null);
  const { loading, categories } = useCategoryDappList();
  const categoryArray = Object.values(categories);
  const [networkList, setNetworkList] = useState<any[]>([]);
  const [relatedDapps, setRelatedDapps] = useState<any>(null);
  const [activity, setActivity] = useState<any>(null);
  const [questList, setQuestList] = useState<any[]>([]);
  const { open } = useDappOpen();
  const [advertise, setAdvertise] = useState<any>([]);
  let id = '';
  if (typeof dapp_id !== 'undefined') {
    id = dapp_id.toString();
  }
  const { like, handleLike } = useLike(id, 'dapp');
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const resultNetwork = await get(`${QUEST_PATH}/api/network/list`);
        setNetworkList(resultNetwork.data || []);
      } catch (error) {
        console.error('Error fetching resultNetwork data:', error);
      }
    };
    fetchNetworkData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (dapp_id) {
        try {
          const response = await get(`${QUEST_PATH}/api/dapp?id=${dapp_id}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    const fetchRelatedDapps = async () => {
      if (dapp_id) {
        try {
          const response = await get(`${QUEST_PATH}/api/dapp/relate_list?dapp_id=${dapp_id}`);
          setRelatedDapps(response.data);
        } catch (error) {
          console.error('Error fetching related dapps:', error);
        }
      }
    };
    const fetchquestList = async () => {
      if (dapp_id) {
        try {
          const response = await get(`${QUEST_PATH}/api/quest/list_by_dapp?dapp_id=${dapp_id}`);
          setQuestList(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    const fetchactivityData = async () => {
      if (dapp_id) {
        try {
          const response = await get(
            `${QUEST_PATH}/api/action/get-actions-by-dapp?dapp_id=${dapp_id}&page=1&page_size=10`,
          );
          setActivity(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    const fetchAdvertiseasync = async () => {
      if (dapp_id) {
        try {
          const response = await get(`${QUEST_PATH}/api/ad?category=dapp&category_id=${dapp_id}`);
          setAdvertise(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    if (dapp_id) {
      fetchData();
      fetchRelatedDapps();
      fetchactivityData();
      fetchquestList();
      fetchAdvertiseasync();
    }
  }, [dapp_id]);

  function getCategoryNamess(dappCategories: any, categoryArray: any[]) {
    const categories = Array.isArray(dappCategories) ? dappCategories : Object.values(dappCategories);
    return categories.map((categoryItem: any) => {
      const categoryId =
        typeof categoryItem === 'object' && categoryItem !== null ? categoryItem.category_id : categoryItem;
      const category = categoryArray.find((c: any) => c.id === categoryId);
      return category && typeof category === 'object' && 'name' in category ? category.name : 'Category not found';
    });
  }

  function getCategoryNames(dappCategories: any[], categoryArray: any[]) {
    if (!Array.isArray(dappCategories)) {
      return [];
    }
    return dappCategories.map((categoryItem: any) => {
      const category = categoryArray.find((c: any) => c.id === categoryItem.category_id);
      if (category) {
        return category.name;
      } else {
        return 'Category not found';
      }
    });
  }
  function formatDate(timestamp: number) {
    const date = new Date((timestamp + 8 * 60 * 60) * 1000);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    } as const;
    return date.toLocaleString('en-US', options);
  }

  const formatId = (tx: string) => {
    if (!tx) return '-';
    else {
      return <>{tx.substring(0, 6) + '...' + tx.substring(tx.length - 4, tx.length)}</>;
    }
  };

  const categoryNames = getCategoryNames(data?.dapp_category, categoryArray);
  return (
    <DappsDetails>
      <DappsDetailsTitle>
        <BreadCrumbs>
          <Link href="/">Home</Link>
          {arrow}
          <Link href="/alldapps">All Dapps</Link>
          {arrow}
          <span>{data && data.name}</span>
        </BreadCrumbs>
        <div className="header-details-body">
          <div className="details-body-left">
            <div className="body-left-detailed">
              <img src={data && data.logo} alt="" />
              <div className="left-detailed-text">
                <div style={{ display: 'flex' }}>
                  <h1>{data && data.name}</h1>
                  <StyledHeartBox
                    whileHover={{ opacity: 0.9 }}
                    whileTap={{ opacity: 0.7 }}
                    onClick={() => {
                      handleLike(!like);
                    }}
                  >
                    {!like ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                        <path
                          d="M8.50419 15C8.28039 15 8.07318 14.9117 7.91569 14.7671L1.51685 8.56799C1.03435 8.10292 0.65186 7.54977 0.391498 6.94054C0.131136 6.33132 -0.00192296 5.67811 2.09967e-05 5.01874C2.09967e-05 3.67773 0.538784 2.41702 1.51685 1.46949C2.49491 0.521949 3.79623 0 5.18043 0C6.40716 0 7.56757 0.409529 8.50419 1.16435C10.5349 -0.473769 13.5768 -0.377409 15.4832 1.47752C16.4544 2.41906 17 3.69568 17 5.02677C17 6.35785 16.4544 7.63447 15.4832 8.57602L9.09268 14.7671C8.9352 14.9197 8.71969 15 8.50419 15ZM5.18043 1.606C4.23553 1.606 3.35693 1.95931 2.68555 2.60974C2.02245 3.25214 1.64946 4.11135 1.64946 5.02677C1.64946 5.94218 2.01417 6.79336 2.68555 7.44379L8.4959 13.0728L14.298 7.45182C14.6251 7.13498 14.8846 6.7588 15.0617 6.34477C15.2388 5.93074 15.3299 5.48697 15.3299 5.03881C15.3299 4.59065 15.2388 4.14689 15.0617 3.73286C14.8846 3.31883 14.6251 2.94265 14.298 2.6258C13.6349 1.9834 12.748 1.62206 11.8031 1.62206C10.8582 1.62206 9.97957 1.97537 9.30819 2.6258L9.06782 2.85867C8.99113 2.93311 8.90005 2.99217 8.79978 3.03247C8.69951 3.07276 8.59202 3.0935 8.48347 3.0935C8.37491 3.0935 8.26742 3.07276 8.16715 3.03247C8.06688 2.99217 7.9758 2.93311 7.89911 2.85867L7.65874 2.6258C7.01223 1.95931 6.12534 1.606 5.18043 1.606Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.91579 16.0243C8.07327 16.1735 8.28049 16.2646 8.50429 16.2646C8.7198 16.2646 8.9353 16.1818 9.09279 16.0243L15.4834 9.63364C16.4546 8.66175 17.0002 7.34399 17.0002 5.97001C17.0002 4.59603 16.4546 3.27827 15.4834 2.30638C13.577 0.391678 10.535 0.292213 8.50429 1.98312C7.56766 1.20398 6.40723 0.78125 5.1805 0.78125C3.79627 0.78125 2.49494 1.32002 1.51686 2.29809C0.53879 3.27617 2.09969e-05 4.5775 2.09969e-05 5.96172C-0.00192298 6.64235 0.131138 7.3166 0.391503 7.94546C0.651868 8.57432 1.03437 9.1453 1.51686 9.62535L7.91579 16.0243ZM4.82472 7.47007C5.77793 8.4813 7.11242 9.0698 8.50493 9.0698C9.1968 9.06964 9.88111 8.9259 10.5146 8.64769C11.148 8.36948 11.7169 7.96284 12.1851 7.45349C12.3335 7.29192 12.4116 7.07801 12.4023 6.85883C12.393 6.63966 12.297 6.43316 12.1354 6.28478C11.9738 6.13639 11.7599 6.05827 11.5407 6.06759C11.3216 6.07692 11.1151 6.17293 10.9667 6.33451C10.3367 7.02248 9.43327 7.42034 8.49664 7.42034C7.55172 7.42034 6.6814 7.03905 6.03488 6.3428C5.88539 6.18232 5.67828 6.0878 5.4591 6.08003C5.35058 6.07618 5.24236 6.09374 5.14062 6.13172C5.03888 6.16969 4.94562 6.22734 4.86616 6.30135C4.7867 6.37537 4.7226 6.46431 4.67751 6.56311C4.63243 6.6619 4.60724 6.7686 4.60339 6.87713C4.59562 7.0963 4.67523 7.30959 4.82472 7.47007Z"
                          fill="#FF6B8E"
                        />
                      </svg>
                    )}
                  </StyledHeartBox>
                </div>
                <Tag>
                  {categoryNames &&
                    categoryNames.map((categoryName: string, index: number) => (
                      <div className={`tag-item ${categoryName}`} key={index}>
                        {categoryName}
                      </div>
                    ))}
                </Tag>
              </div>
            </div>
            {/* <div className="body-left-several">
              <img src={several} alt="" />
              <p>12K+</p>
              <div className="left-several-btn">+ Favorite</div>
            </div> */}
            <div className="left-enter-Dapp">
              <div className="enter-Dapp-item">
                <p>Blockchain</p>
                {data &&
                  data.dapp_network.map((item: any, index: number) => {
                    const networkItem = networkList.find((network: any) => network.id === item.network_id);
                    const logo = networkItem ? networkItem.logo : '';
                    return (
                      <div key={index} style={{ display: 'inline-block' }}>
                        <img src={logo} alt="" />
                      </div>
                    );
                  })}
              </div>
              <div className="enter-Dapp-item">
                <p>Native Token</p>
                {data && data.tbd_token === 'Y' ? <h1>Token-TBD🔥</h1> : <h1>-</h1>}
              </div>
              <div
                className="enter-Dapp-item Dapp-item-special"
                onClick={() => {
                  open({ dapp: data, from: 'alldapps' });
                }}
                data-bp="100111-001"
              >
                <div>Enter Dapp</div>
                <img src={arrowBlock} alt="" />
              </div>
            </div>
          </div>
          <div className="details-body-right">
            <img src={advertise?.data?.ad_images} alt="" data-bp="100111-002" />
          </div>
        </div>
      </DappsDetailsTitle>

      <DappsDetailsContent>
        <div className="left-side-substance">
          <Title>Description</Title>
          <p>{data && data.description}</p>
          <Title>Activity</Title>
          <div className="title-right-list">
            <div className="right-list-item">
              <p>-</p>
              <span>Participants</span>
            </div>
            <div className="right-list-item">
              <p>{activity && activity.data.length}</p>
              <span>Acctions</span>
            </div>
          </div>
          <div className="left-side-tab">
            <table>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Actions</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {activity &&
                  activity.data.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="td-avatar"></div>
                          {formatId(item.account_id)}
                        </td>
                        <td>{item.action_title}</td>
                        <td style={{ color: ' #979ABE' }}>{formatDate(item.timestamp)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="right-side-substance">
          <Title>Quest</Title>
          {questList?.length ? (
            questList.map((item, index) => {
              const actions = Array.from({ length: item.total_action }, (val, i) => i);
              return (
                <Link href={`/quest/detail?id=${item.id}`} data-bp="100111-003" className="right-side-item" key={index}>
                  <div className="side-item-icon">
                    <img src={item.logo} alt="" />
                  </div>
                  <div className="side-item-text">
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <StyledProcessBars style={{ marginTop: '0' }}>
                      {actions.map((action, i) => (
                        <ProcessBar size={4} key={i} value={item.action_completed > i ? 100 : 0} noBorder={true} />
                      ))}
                    </StyledProcessBars>
                    <div className="side-item-tag">
                      <StyledTag style={{ padding: '0px 10px 0px 6px', width: 'fit-content' }}>
                        <StyledCoin $size={18} />
                        <span style={{ color: '#EBF479' }}>{item.reward} PTS</span>
                      </StyledTag>
                      {item.difficulty && (
                        <StyledTag style={{ width: 'fit-content' }}>
                          <Steps step={STEPS_MAP[item.difficulty]} />
                          {item.difficulty}
                        </StyledTag>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <Empty size={42} tips="No quest yet" />
          )}
        </div>
      </DappsDetailsContent>

      <DappsDetailBottom>
        <Title>Related Dapps</Title>
        <div className="tab-content">
          {relatedDapps &&
            relatedDapps.map((dapp: any, index: number) => {
              const categoryNamess = getCategoryNamess(dapp.category_ids, categoryArray);
              return (
                <div className="tab-content-item" key={index}>
                  <div className="content-item-img">
                    <img src={dapp.logo} alt="" />
                  </div>
                  <div className="content-item-text">
                    <h1>{dapp.name}</h1>
                    <p>{dapp.description}</p>
                    <Tag>
                      {categoryNamess.map((categoryName: string, index: number) => (
                        <div className={`tag-item ${categoryName}`} key={index}>
                          {categoryName}
                        </div>
                      ))}
                    </Tag>
                  </div>
                  <div className="content-item-btn">
                    <Link className="item-btn-item" data-bp="100111-004" href={`/dapps-details?dapp_id=${dapp.id}`}>
                      Detail
                    </Link>
                    <div
                      className="item-btn-item"
                      onClick={() => {
                        open({ dapp, from: 'alldapps' });
                      }}
                      data-bp="100111-005"
                    >
                      <p>Dapp</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </DappsDetailBottom>
    </DappsDetails>
  );
};

DappsDetailsColumn.getLayout = useDefaultLayout;

export default DappsDetailsColumn;
