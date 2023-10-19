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
      <g filter="url(#filter0_f_3742_3519)">
        <path d="M187.5 80C98.306 80 26 118.056 26 165L349 165C349 118.056 276.694 80 187.5 80Z" fill="#33549C" />
      </g>
      <defs>
        <filter id="filter0_f_3742_3519" x="-54" y="0" width="483" height="245" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_3742_3519" />
        </filter>
      </defs>
    </svg>

  );

  const logoIcon = (
    <svg width="100%" height="126" viewBox="0 0 145 164" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.05" fill-rule="evenodd" clip-rule="evenodd" d="M67.5434 1.27034C70.4772 -0.423447 74.0917 -0.423449 77.0254 1.27034L139.828 37.5294C142.762 39.2231 144.569 42.3534 144.569 45.741V118.259C144.569 121.647 142.762 124.777 139.828 126.471L77.0254 162.73C74.0917 164.423 70.4772 164.423 67.5434 162.73L4.74099 126.471C1.80726 124.777 0 121.647 0 118.259V45.741C0 42.3534 1.80725 39.2232 4.74099 37.5294L67.5434 1.27034ZM72.2844 11.0461L10.8365 46.5231V117.477L72.2844 152.954L133.732 117.477V46.5231L72.2844 11.0461ZM59.0933 38.1935C59.2873 37.6569 59.7967 37.2993 60.3673 37.2993H68.3233C69.2621 37.2993 69.9163 38.2312 69.5972 39.1142L41.4529 117.002C41.259 117.538 40.7496 117.896 40.179 117.896H32.223C31.2842 117.896 30.63 116.964 30.9491 116.081L59.0933 38.1935ZM75.9448 37.2993C75.3742 37.2993 74.8648 37.6569 74.6709 38.1935L46.5266 116.081C46.2075 116.964 46.8617 117.896 47.8005 117.896H55.7565C56.3271 117.896 56.8365 117.538 57.0304 117.002L85.1747 39.1142C85.4938 38.2312 84.8396 37.2993 83.9008 37.2993H75.9448ZM89.1213 48.2367C88.6924 47.0487 87.0145 47.0425 86.5767 48.2272L82.2789 59.8566C82.1667 60.16 82.1669 60.4936 82.2793 60.7969L103.112 117.012C103.309 117.543 103.816 117.896 104.382 117.896H112.347C113.285 117.896 113.94 116.964 113.621 116.081L89.1213 48.2367ZM78.4538 69.2109C78.8911 68.0276 80.5663 68.032 80.9974 69.2175L98.0377 116.078C98.359 116.962 97.7048 117.896 96.7647 117.896H88.7968C88.2341 117.896 87.7301 117.548 87.5304 117.022L74.1579 81.7969C74.0417 81.4911 74.0403 81.1535 74.1537 80.8466L78.4538 69.2109Z" fill="white" />
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
