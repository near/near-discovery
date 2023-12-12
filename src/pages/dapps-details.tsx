import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { dapps } from '@/config/dapps';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { TTAPI_PATH } from '@/config/quest';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);

const syncIcon = 'https://assets.dapdap.net/images/bafkreihzr73on5kcq3zgwjg3jwumiyutxm3np77sri4xfmc5dhtaqmwi3y.svg';
const gold = 'https://assets.dapdap.net/images/bafkreidegqrrzlwh4wlfrquhd6n3n7dczefy32hu5locsx5yj6hllqfkuq.svg';
const several = 'https://assets.dapdap.net/images/bafkreib4xkaqeaxyfbdbjnvvnptlch3t6qtautxw2miflew4oqmc45nxdy.svg';
const arrowBlock = 'https://assets.dapdap.net/images/bafkreihv4t6xu7bzjxeqdi7do4qdbncolgyhk3d4c53vbsu22xkv3hrrge.svg';
const dappsDetails = 'https://assets.dapdap.net/images/bafybeibz3uwngzvaffn5hfsk7eg33tv3pmletxhocc4brvow6a463s5w2i.svg';

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
    width: 70%;
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
      }
    }
  }
  .right-side-substance {
    width: 36%;
    .right-side-item {
      border: 1px solid #ebf4794d;
      background: #1c1d2a;
      border-radius: 16px;
      display: -webkit-box;
      margin-top: 28px;
      padding: 30px 20px;
      input {
        width: 23px;
        height: 23px;
        border: 1px solid #ebf479;
      }
      p {
        font-size: 18px;
        font-weight: 500;
        color: #ffffff;
        margin: 0 0 0 12px;
        width: 70%;
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

const DappsDetailsColumn: NextPageWithLayout = () => {
  const router = useRouter();
  const { dapp_id } = router.query;
  const [data, setData] = useState<any>(null);
  console.log(data);
  const { loading, categories } = useCategoryDappList();
  const categoryArray = Object.values(categories);
  useEffect(() => {
    if (dapp_id) {
      fetch(`${TTAPI_PATH}/operations/Dapp/GetOne?id=${dapp_id}`)
        .then((response) => response.json())
        .then((data) => setData(data.data.data));
    }
  }, [dapp_id]);

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
                <h1>
                  {data && data.name}
                  {/* <Golds>
                    <img src={gold} alt="" />
                    <span>10</span>
                  </Golds> */}
                </h1>
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
            <div className="body-left-several">
              <img src={several} alt="" />
              <p>12K+</p>
              {/* <div className="left-several-btn">+ Favorite</div> */}
            </div>
            <div className="left-enter-Dapp">
              <div className="enter-Dapp-item">
                <p>Blockchain</p>
                <img
                  src="https://assets.dapdap.net/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg"
                  alt=""
                />
                <img
                  src="https://assets.dapdap.net/images/bafkreie5b65e7cp7jtvhrwgibvoqpf7ekj4v7jgo2egjr3qmfsl3p4ulam.svg"
                  alt=""
                />
                <img
                  src="https://assets.dapdap.net/images/bafkreib5v3jonanuknj5db5ysuhb6ubowv2pqnopyg3yraknfr3jn7el4u.svg"
                  alt=""
                />
              </div>
              <div className="enter-Dapp-item">
                <p>Native Token</p>
                {data && data.tbd_token === 'Y' ? (
                  <h1>Token-TBD🔥</h1>
                ) : (
                  <h1>{JSON.parse(data && data.native_currency).name}</h1>
                )}
              </div>
              <div className="enter-Dapp-item Dapp-item-special">
                <Link href="/dapp/Syncswap">Enter Dapp</Link>
                <img src={arrowBlock} alt="" />
              </div>
            </div>
          </div>
          <div className="details-body-right">
            <img src={dappsDetails} alt="" />
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
              <p>356</p>
              <span>Participants</span>
            </div>
            <div className="right-list-item">
              <p>654</p>
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
                <tr>
                  <td>
                    <div className="td-avatar"></div>
                    0x3bcb...b717
                  </td>
                  <td>bridge 0.1 ETH from ethereum to polygon zkEVM </td>
                  <td style={{ color: ' #979ABE' }}>Sep 15, 2023, 21:23</td>
                </tr>
                <tr>
                  <td>
                    <div className="td-avatar"></div>
                    0x3bcb...b717
                  </td>
                  <td>bridge 0.1 ETH from ethereum to polygon zkEVM </td>
                  <td style={{ color: ' #979ABE' }}>Sep 15, 2023, 21:23</td>
                </tr>
                <tr>
                  <td>
                    <div className="td-avatar"></div>
                    0x3bcb...b717
                  </td>
                  <td>bridge 0.1 ETH from ethereum to polygon zkEVM </td>
                  <td style={{ color: ' #979ABE' }}>Sep 15, 2023, 21:23</td>
                </tr>
                <tr>
                  <td>
                    <div className="td-avatar"></div>
                    0x3bcb...b717
                  </td>
                  <td>bridge 0.1 ETH from ethereum to polygon zkEVM </td>
                  <td style={{ color: ' #979ABE' }}>Sep 15, 2023, 21:23</td>
                </tr>
                <tr>
                  <td>
                    <div className="td-avatar"></div>
                    0x3bcb...b717
                  </td>
                  <td>bridge 0.1 ETH from ethereum to polygon zkEVM </td>
                  <td style={{ color: ' #979ABE' }}>Sep 15, 2023, 21:23</td>
                </tr>
                <tr>
                  <td>
                    <div className="td-avatar"></div>
                    0x3bcb...b717
                  </td>
                  <td>bridge 0.1 ETH from ethereum to polygon zkEVM </td>
                  <td style={{ color: ' #979ABE' }}>Sep 15, 2023, 21:23</td>
                </tr>
                <tr>
                  <td>
                    <div className="td-avatar"></div>
                    0x3bcb...b717
                  </td>
                  <td>bridge 0.1 ETH from ethereum to polygon zkEVM </td>
                  <td style={{ color: ' #979ABE' }}>Sep 15, 2023, 21:23</td>
                </tr>
                <tr>
                  <td>
                    <div className="td-avatar"></div>
                    0x3bcb...b717
                  </td>
                  <td>bridge 0.1 ETH from ethereum to polygon zkEVM </td>
                  <td style={{ color: ' #979ABE' }}>Sep 15, 2023, 21:23</td>
                </tr>
                <tr>
                  <td>
                    <div className="td-avatar"></div>
                    0x3bcb...b717
                  </td>
                  <td>bridge 0.1 ETH from ethereum to polygon zkEVM </td>
                  <td style={{ color: ' #979ABE' }}>Sep 15, 2023, 21:23</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="right-side-substance">
          <Title>Quest & Rewards</Title>
          {/* <div className="right-side-item"></div> */}
        </div>
      </DappsDetailsContent>

      <DappsDetailBottom>
        <Title>Related Dapps</Title>
        <div className="tab-content">
          {dapps.slice(0, 3).map((dapp, index) => {
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
                  <div className="item-btn-item">
                    <Link href="/dapps-details">Detail</Link>
                  </div>
                  <div className="item-btn-item">
                    <Link href={dapp.dappRoute}>Dapp</Link>
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
