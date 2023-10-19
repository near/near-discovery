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
      <g filter="url(#filter0_f_3785_11479)">
        <path d="M187.5 80C98.306 80 26 118.056 26 165L349 165C349 118.056 276.694 80 187.5 80Z" fill="#60DFFF" />
      </g>
      <defs>
        <filter id="filter0_f_3785_11479" x="-54" y="0" width="483" height="245" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_3785_11479" />
        </filter>
      </defs>
    </svg>

  );

  const logoIcon = (
    <svg width="100%" height="126" viewBox="0 0 141 147" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.05" fill-rule="evenodd" clip-rule="evenodd" d="M115.707 49.129C129.273 49.129 140.271 38.1311 140.271 24.5645C140.271 10.9979 129.273 0 115.707 0C102.14 0 91.1423 10.9979 91.1423 24.5645C91.1423 38.1311 102.14 49.129 115.707 49.129ZM0.310547 21.7082H28.3027V120.537H115.707V146.244H0.310547V21.7082Z" fill="white" />
    </svg>
  );

  return (
    <Container>
      <div className="top">
        <span className="bgIcon">{bgIcon}</span>
        <span className="logoIcon">{logoIcon}</span>
        <div className="title">Linea</div>
        <p className="subTitle">Using Linea conveniently and efficiently</p>
      </div>
      <ComponentWrapperPage
        src={components.linea || ''}
        meta={{ title: 'Connect with the Linea community.', description: 'Become part of the Linea community.' }}
      />
    </Container>
  );
};

Column.getLayout = useDefaultLayout;

export default Column;
