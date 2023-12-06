import Link from 'next/link';
import styled from 'styled-components';

import { SMALL_SCREEN } from '../near/NearStyleVar';

const AbsoluteContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #ffffff;
  padding: 30px 24px 20px 24px;
  border-bottom: 1px #292c42 solid;
  display: flex;

  .icon {
    line-height: 56px;
  }
  img {
    width: 52px;
    height: 52px;
    margin: 0 14px 0 30px;
  }
  .container-text {
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
      font-size: 20px;
      font-weight: 700;
    }
    img {
      width: 16px;
      height: 16px;
      margin: 0 6px 0 0;
    }
    p {
      display: inline-block;
      margin: 0;
      font-size: 16px;
    }
  }

  @media (min-width: ${SMALL_SCREEN}) {
    .go-back-icon-mobile {
      display: none;
    }
  }

  @media (max-width: ${SMALL_SCREEN}) {
    font-size: 16px;
    position: relative;
    border-bottom: none;
    height: auto;
    padding: 20px 20px 20px 10px;

    .icon {
      line-height: 56px;
      .go-back-icon-pc {
        display: none;
      }
    }

    img {
      display: none;
    }

    .container-text {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      h3 {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 0 !important;
      }
      img {
        width: 16px;
        height: 16px;
        margin: 0 6px 0 0;
        display: none;
      }
      p {
        display: inline-block;
        margin: 0;
        font-size: 16px;
        display: none;
      }
    }
  }
`;

const GoBackIcon = (
  <svg
    className="go-back-icon-pc"
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z"
      fill="#979ABE"
    />
  </svg>
);

const GoBackIconMobile = (
  <svg
    className="go-back-icon-mobile"
    width="32"
    height="26"
    viewBox="0 0 32 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_b_2997_1980)">
      <rect width="32" height="26" rx="8" fill="#373A53" fill-opacity="0.5" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.4926 17.7803L8.71967 13.0074C8.42678 12.7145 8.42678 12.2396 8.71967 11.9467L13.4926 7.17373C13.7855 6.88083 14.2604 6.88083 14.5533 7.17373C14.8462 7.46662 14.8462 7.94149 14.5533 8.23439L11.0607 11.727L21.25 11.727C21.6642 11.727 22 12.0628 22 12.477C22 12.8912 21.6642 13.227 21.25 13.227L11.0607 13.227L14.5533 16.7197C14.8462 17.0126 14.8462 17.4874 14.5533 17.7803C14.2604 18.0732 13.7855 18.0732 13.4926 17.7803Z"
      fill="#979ABE"
    />
    <defs>
      <filter
        id="filter0_b_2997_1980"
        x="-10"
        y="-10"
        width="52"
        height="46"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2997_1980" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2997_1980" result="shape" />
      </filter>
    </defs>
  </svg>
);

const GoBackNav = () => {
  return (
    <AbsoluteContainer>
      <Link href={'/near'} className="icon">
        {GoBackIcon}
        {GoBackIconMobile}
      </Link>

      <img src={'https://assets.dapdap.net/images/bafkreia75l4donjlz36m7lmdu3ymfeunk2bisfk73rvtqe55uqw7a5rhzq.png'} alt="" />

      <div className="container-text">
        <h3>NEAR-Ethereum Bridge </h3>
      </div>
    </AbsoluteContainer>
  );
};

const GoBackNavSourceAllInOne = () => {
  return (
    <AbsoluteContainer>
      <Link href={'/near'} className="icon">
        {GoBackIcon}
        {GoBackIconMobile}
      </Link>

      <img src={'https://assets.dapdap.net/images/bafkreigq5clxrflxne3bwmtxhwmji774eye5hm6nlrbospjaljuocesyuy.svg'} alt="" />

      <div className="container-text">
        <h3>NEAR All-in-one</h3>
      </div>
    </AbsoluteContainer>
  );
};

export { GoBackNav, GoBackNavSourceAllInOne };
