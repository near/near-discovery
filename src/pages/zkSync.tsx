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
      <g filter="url(#filter0_f_3785_11549)">
        <path d="M187.5 80C98.306 80 26 118.056 26 165L349 165C349 118.056 276.694 80 187.5 80Z" fill="#3B6BDC" />
      </g>
      <defs>
        <filter id="filter0_f_3785_11549" x="-54" y="0" width="483" height="245" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_3785_11549" />
        </filter>
      </defs>
    </svg>
  );

  const logoIcon = (
    <svg width="100%" height="126" viewBox="0 0 211 121" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.05" fill-rule="evenodd" clip-rule="evenodd" d="M60.2857 0V30.1429H120.571L60.2857 75.3571V120.571L0 60.2857L60.2857 0ZM150.714 120.571V90.4286H90.4286L150.714 45.2143V0L211 60.2857L150.714 120.571Z" fill="white" />
    </svg>
  );

  return (
    <Container>
      <div className="top">
        <span className="bgIcon">{bgIcon}</span>
        <span className="logoIcon">{logoIcon}</span>
        <div className="title">zkSync</div>
        <p className="subTitle">Using zkSync conveniently and efficiently</p>
      </div>
      <ComponentWrapperPage
        src={components.zkSync || ''}
        meta={{ title: 'Connect with the zkSync community.', description: 'Become part of the zkSync community.' }}
      />
    </Container>
  );
};

Column.getLayout = useDefaultLayout;

export default Column;
