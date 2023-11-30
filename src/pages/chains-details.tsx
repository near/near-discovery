import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { dapps } from '@/config/dapps';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);
const arrowyellow = 'https://ipfs.near.social/ipfs/bafkreieovokoreirgn2zewqmqgddkq4vlaljgvaw6nlqs2psbcq7n3pffi';
const titleBg = 'https://ipfs.near.social/ipfs/bafkreidyzwmfb3u4uxrz2l6n3mzzpfcwvsyhkxiigh7xdmsgiomtbxfjve';
const syncIcon = 'https://ipfs.near.social/ipfs/bafkreidvtwihnl2ggpdxz6y5odaghigvap42p2lqdyxgex5gnl6fo4qxie';
const gold = 'https://ipfs.near.social/ipfs/bafkreidegqrrzlwh4wlfrquhd6n3n7dczefy32hu5locsx5yj6hllqfkuq';
const diagonaltop = 'https://ipfs.near.social/ipfs/bafkreiewy27itzs3bq2et7bxmnv3dlt6rtwofiszkms3baroobjqq6wh5a';
const Dapps = 'https://ipfs.near.social/ipfs/bafkreifyko6xoxde4srussisqazc3jnyqwqrwvhvphifknq4ybxa4kj7yu';
const DeepDive = 'https://ipfs.near.social/ipfs/bafkreig4bv3xu73ouxj5x7zt4qlvnnbvgdqzj5oq6te6y7ax4tz2yid2ma';
const Shotcut = 'https://ipfs.near.social/ipfs/bafkreibexhymj2bp2zhuhlwzcik5o42zg6xvt5i7rbsxcpk7ty7l6mmxum';
const chart = 'https://ipfs.near.social/ipfs/bafkreiabil4iocii42zymoulnypymio4qzflzedpldpcdnmaz2s5bzncmy';
const star = 'https://ipfs.near.social/ipfs/bafkreiduogs6um2scfu53rprwmjjt6f55npfycomoe4za2ve7uucej52vu';
const line = 'https://ipfs.near.social/ipfs/bafkreia3362z25o4wope7mt3jffallldmtmodasm5crpltkfurnem2wxfe';
const chainsconetentImg = 'https://ipfs.near.social/ipfs/bafkreifk3lg7hueyd54w4pqibjejewq6k37cbupfkbmrfb43hal2ofohfq';

const ChainsDetails = styled.div`
  color: #ffffff;
  position: relative;
  padding-bottom: 100px;
`;

const ChainsDetailsTitle = styled.div`
  background: #000000;
  margin: -54px -36px;
  padding: 30px 12% 0 12%;
  background-image: url(${titleBg});
  background-repeat: no-repeat;
  background-size: auto;
  background-position-x: 50%;
  width: auto;
  .header-details-body {
    display: flex;
    .details-body-left {
      .body-left-detailed {
        display: flex;
        margin-bottom: 66px;
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
            background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
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
      .left-enter-Dapp {
        display: flex;
        margin-bottom: 30px;
        .enter-Dapp-item {
          background: #373a5380;
          border-radius: 8px;
          padding: 8px 27px;
          text-align: center;
          margin-right: 16px;
          width: 150px;
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
          background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
          color: #02051e;
          font-size: 16px;
          font-weight: 700;
          line-height: 58px;
        }
      }
    }
    .details-body-right {
      display: flex;
      flex: 1;
      text-align: center;
      justify-content: flex-end;
      position: relative;
      .body-right-btn {
        display: flex;
        .right-btn-item {
          width: 125px;
          height: 46px;
          text-align: center;
          background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
          border-radius: 12px;
          font-size: 16px;
          color: #02051e;
          font-weight: 700;
          line-height: 46px;
          margin-right: 16px;
          img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
          }
          p {
            display: inline-block;
            margin: 0;
          }
        }
      }
      .body-right-img {
        position: absolute;
        bottom: 0;
        right: 2%;
      }
    }
  }
`;

const ChainsDetailsContent = styled.div`
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
    .left-milestones-item {
      display: flex;
      .milestones-item-img {
        margin-right: 18px;
        width: 36px;
        text-align: center;
      }
      .milestones-item-text {
        margin-top: 12px;
        h2 {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #ffffff;
        }
        p {
          font-size: 14px;
          font-weight: 300;
          margin-bottom: 6px;
        }
        span {
          font-size: 14px;
          font-weight: 300;
          color: #979abe;
          img {
            width: 12px;
          }
        }
      }
    }
  }
  .right-side-substance {
    width: 30%;
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

const ChainsDetailsHot = styled.div`
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
          .content-item-img{
            width: 15%;
          }
          .content-item-text{
            width: 60%;
          }
        }
        @media (max-width: 1400px) {
          flex-basis: calc(50% - 20px);
          .content-item-img{
            width: 15%;
          }
          .content-item-text{
            width: 50%;
          }
        }
        @media (max-width: 975px) {
          flex-basis: calc(100% - 20px);
          .content-item-img{
            width: 15%;
          }
          .content-item-text{
            width: 70%;
          }
        }
      }
    }
`;

const ChainsDetailsActivities = styled.div`
  padding: 0 12%;
  p {
    font-size: 16px;
    font-weight: 400;
    color: #979abe;
    display: inline-block;
  }
  .right-btn-item {
    width: 125px;
    height: 46px;
    text-align: center;
    float: right;
    background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
    border-radius: 12px;
    font-size: 16px;
    color: #02051e;
    font-weight: 700;
    line-height: 46px;
    margin-right: 16px;
    img {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
    p {
      display: inline-block;
      margin: 0;
      color: #02051e;
    }
  }
  .details-activities-list {
    display: flex;
    .activities-list-item {
      background: #21232a;
      border-radius: 16px;
      padding: 18px 15px;
      margin-right: 18px;
      p {
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 30px;
        span {
          color: #979abe;
        }
      }
      h2 {
        font-size: 14px;
        color: #979abe;
        margin-bottom: 12px;
        span {
          color: #ffffff;
        }
      }
      h3 {
        font-size: 14px;
        color: #979abe;
        img {
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
      }
    }
  }
`;
const Title = styled.div`
  font-family: Gantari;
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  display: inline-block;
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
const ChainsDetailsColumn: NextPageWithLayout = () => {
  return (
    <ChainsDetails>
      <ChainsDetailsTitle>
        <BreadCrumbs>
          <Link href="/">Home</Link>
          {arrow}
          <Link href="/blockchains">L2 Blockchains</Link>
          {arrow}
          <span>Polygon zkEVM </span>
        </BreadCrumbs>
        <div className="header-details-body">
          <div className="details-body-left">
            <div className="body-left-detailed">
              <img src={syncIcon} alt="" />
              <div className="left-detailed-text">
                <h1>
                  Polygon zkEVM
                  <Golds>
                    <img src={gold} alt="" />
                    <span>20</span>
                  </Golds>
                </h1>
                <p>
                  Add to MetaMask <img src={diagonaltop} alt="" />
                </p>
              </div>
            </div>
            <div className="left-enter-Dapp">
              <div className="enter-Dapp-item">
                <p>Technology</p>
                <h1>ZK Rollup</h1>
              </div>
              <div className="enter-Dapp-item">
                <p>Native Token</p>
                <h1>TBD🔥</h1>
              </div>
            </div>
          </div>
          <div className="details-body-right">
            <div className="body-right-btn">
              <div className="right-btn-item">
                <img src={Dapps} alt="" />
                <p>Dapps</p>
              </div>
              <div className="right-btn-item">
                <img src={DeepDive} alt="" />
                <p>DeepDive</p>
              </div>
              <div className="right-btn-item">
                <img src={Shotcut} alt="" />
                <p>Shotcut</p>
              </div>
              <div className="body-right-img">
                <img src={chart} alt="" />
              </div>
            </div>
          </div>
        </div>
      </ChainsDetailsTitle>

      <ChainsDetailsContent>
        <div className="left-side-substance">
          <Title>Description</Title>
          <p>
            Polygon zkEVM is aiming to become a decentralized Ethereum Layer 2 scalability solution that uses
            cryptographic zero-knowledge proofs to offer validity and finality of off-chain transactions. Polygon zkEVM
            wants to be equivalent with the Ethereum Virtual Machine.
          </p>
          <Title>Milestones</Title>
          <div className="left-milestones-item">
            <div className="milestones-item-img">
              <div>
                <img src={star} alt="" />
              </div>
              <div>
                <img src={line} alt="" />
              </div>
            </div>
            <div className="milestones-item-text">
              <h2>Polygon zkEVM Mainnet Beta is Live</h2>
              <p>2023 Mar 27th</p>
              <span>
                Learn more <img src={arrowyellow} alt="" />
              </span>
            </div>
          </div>
          <div className="left-milestones-item">
            <div className="milestones-item-img">
              <div>
                <img src={star} alt="" />
              </div>
              <div>
                <img src={line} alt="" />
              </div>
            </div>
            <div className="milestones-item-text">
              <h2>Polygon zkEVM Mainnet Beta is Live</h2>
              <p>2023 Mar 27th</p>
              <span>
                Learn more <img src={arrowyellow} alt="" />
              </span>
            </div>
          </div>
        </div>
        <div className="right-side-substance">
          <img src={chainsconetentImg} alt="" />
        </div>
      </ChainsDetailsContent>

      <ChainsDetailsHot>
        <Title>Hot Dapps on Polygon zkEVM</Title>
        <div className="tab-content">
          {dapps.slice(0, 9).map((dapp, index) => {
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
      </ChainsDetailsHot>

      <ChainsDetailsActivities>
        <Title>Activities</Title>
        <div style={{ marginBottom: '24px' }}>
          <p>The most popular actions from other users</p>
          <div className="right-btn-item">
            <img src={DeepDive} alt="" />
            <p>DeepDive</p>
          </div>
        </div>
        <div className="details-activities-list">
          <div className="activities-list-item">
            <p>
              Bridge <span> 0.01 </span> ETH to Polygon zkEVM
            </p>
            <h2>
              Total Execution <span>1223 </span>
            </h2>
            <h3>
              <img src={syncIcon} alt="" />
              ETH-Polygon zkEVM Bridge
            </h3>
          </div>
          <div className="activities-list-item">
            <p>
              Bridge <span> 0.01 </span> ETH to Polygon zkEVM
            </p>
            <h2>
              Total Execution <span>1223 </span>
            </h2>
            <h3>
              <img src={syncIcon} alt="" />
              ETH-Polygon zkEVM Bridge
            </h3>
          </div>
          <div className="activities-list-item">
            <p>
              Bridge <span> 0.01 </span> ETH to Polygon zkEVM
            </p>
            <h2>
              Total Execution <span>1223 </span>
            </h2>
            <h3>
              <img src={syncIcon} alt="" />
              ETH-Polygon zkEVM Bridge
            </h3>
          </div>
        </div>
      </ChainsDetailsActivities>
      <Footer>
        <div className="footer-item footer-left">
          Made with ❤️ by DapXDap team.
          <br /> Bulit on BOS & NEAR Protocol
        </div>
        <div className="footer-item footer-center">
          <div className="footer-center-img">
            <img
              src="https://ipfs.near.social/ipfs/bafkreic2ou5l3zhdefbhswd6jomuhzmvyu5oqpbom3d3vo3djoeywxmyay"
              alt=""
            />
            <img
              src="https://ipfs.near.social/ipfs/bafkreibaof45e2fwgaphbengfh5molv6dwjkcp4zrwkixyqm3mrc3x7jhm"
              alt=""
            />
            <img
              src="https://ipfs.near.social/ipfs/bafkreif3gh6hszingmncy6kg3en6xoumceepw4ys3dq3dbjd7rkn7zfb74"
              alt=""
            />
            <img
              src="https://ipfs.near.social/ipfs/bafkreifyzh5mqbh6z6utj7z4dp2eelhaa654mnt6mut4oxml3mw56fqoxm"
              alt=""
            />
          </div>
        </div>
        <div className="footer-item footer-right">Copyright 2023 DapXDap</div>
      </Footer>
    </ChainsDetails>
  );
};

ChainsDetailsColumn.getLayout = useDefaultLayout;

export default ChainsDetailsColumn;
