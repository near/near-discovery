import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Column: NextPageWithLayout = () => {
  const components = useBosComponents();
  const Container = styled.div`
    .top {
      .bgIcon {
        display: none;
      }
      .logoIcon {
        display: none;
      }
    }
    .title {
      font-size: 40px;
      color: #fff;
      font-weight: 700;
    }
    .subTitle {
      font-size: 20px;
      font-weight: 500;
      color: #979abe;
    }
    @media (max-width: 900px) {
      .top {
        text-align: center;
        text-align: -webkit-center;
        text-align: -moz-center;
        position: relative;
        .bgIcon {
          display: block;
          position: absolute;
          left: -16px;
          width: 100%;
        }
        .logoIcon {
          display: block;
        }
        .title {
          font-size: 26px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .subTitle {
          font-size: 16px;
          color: #ffffff;
          position: absolute;
          top: calc(50% + 26px);
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          text-align: center;
        }
      }
    }
  `;

  const bgIcon = (
    <svg width="100%" height="100%" viewBox="0 0 375 245" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_2081_5325)">
        <path d="M187.5 80C98.306 80 26 118.056 26 165L349 165C349 118.056 276.694 80 187.5 80Z" fill="#0042C1" />
      </g>
      <defs>
        <filter
          id="filter0_f_2081_5325"
          x="-54"
          y="0"
          width="483"
          height="245"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_2081_5325" />
        </filter>
      </defs>
    </svg>
  );

  const logoIcon = (
    <svg width="126" height="126" viewBox="0 0 126 126" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.05"
        d="M62.8912 126C97.7493 126 126 97.7989 126 63C126 28.2011 97.7493 0 62.8912 0C29.8195 0 2.69108 25.3833 0 57.6965H83.4236V68.292H0C2.69108 100.617 29.8195 126 62.8912 126Z"
        fill="white"
      />
    </svg>
  );

  return (
    <Container>
      <div className="top">
        <span className="bgIcon">{bgIcon}</span>
        <span className="logoIcon">{logoIcon}</span>
        <div className="title">Arbitrum</div>
        <p className="subTitle">Using Arbitrum conveniently and efficiently</p>
      </div>
      <ComponentWrapperPage
        src={components.arbitrum || ''}
        meta={{ title: 'Connect with the Arbitrum community.', description: 'Become part of the Arbitrum community.' }}
      />
    </Container>
  );
};

Column.getLayout = useDefaultLayout;

export default Column;
