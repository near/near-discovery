import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const logoUrl = 'https://ipfs.near.social/ipfs/bafkreig5ka5mpgawcpswpfqinzpyuxl7wmfbs7xeln3l7udigzvbtotlle';
const bannerBg = 'https://ipfs.near.social/ipfs/bafkreigu5rr2jqcw53jwawwyw7ug7uza4gpev2dpftxgs3w7exib2m4bmu';
const blueBg = 'https://ipfs.near.social/ipfs/bafkreihu2rxecbig3cyici5sbvjus42fazzorn2lq22b32arr3slzbzdye';
const yellowBg = 'https://ipfs.near.social/ipfs/bafkreiejilw7ah4y2nhn3ohhzl73u7flxafygpiwksc4iepq75s43f3gfa';
const quick = 'https://ipfs.near.social/ipfs/bafkreic3hzaaz2iteac2oruyk62an47db2vo3z4furlk2rwhxyzks3m23i';
const arrow = 'https://ipfs.near.social/ipfs/bafkreieovokoreirgn2zewqmqgddkq4vlaljgvaw6nlqs2psbcq7n3pffi';
const discover = 'https://ipfs.near.social/ipfs/bafkreic5n7m4pvmtudbuhlgggfkkwv7ynqd66tml2ffh5rx4vvbowlf4qu';
const earn = 'https://ipfs.near.social/ipfs/bafkreib54d2j2gfmn5nw45woc3wcntukrub4zcexaeksguj2fsbojesqoq';

const HomePage = styled.div`
  padding: 0 10%;
  .home-page-content {
    .it-works-list {
      display: flex;
      .works-list-item {
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

const HomeContent: NextPageWithLayout = () => {
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
      <div className="home-page-content">
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
      </div>
    </HomePage>
  );
};

HomeContent.getLayout = useDefaultLayout;

export default HomeContent;
