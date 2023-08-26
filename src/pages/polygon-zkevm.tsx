import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ZkevmColumn: NextPageWithLayout = () => {
  const components = useBosComponents();
  const Container = styled.div`
  .top{
    .bgIcon{
      display:none;
    }
    .logoIcon{
      display:none;
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
      .top{
        text-align: center;
        text-align: -webkit-center;
        text-align:-moz-center;
        position: relative;
        .bgIcon{
          display:block;
          position: absolute;
          left:-16px;
          width:108%;
        }
        .logoIcon{
          display:block;
        }
        .title {
          font-size:26px;
          position: absolute;
          top: 50%;
          left: 48%;
          transform: translate(-48%, -50%);
         }
         .subTitle {
           font-size: 16px;
           color:#ffffff;
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
      <g filter="url(#filter0_f_2081_3917)">
        <path d="M187.5 80C98.306 80 26 118.056 26 165L349 165C349 118.056 276.694 80 187.5 80Z" fill="#794FDD" />
      </g>
      <defs>
        <filter id="filter0_f_2081_3917" x="-54" y="0" width="483" height="245" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_2081_3917" />
        </filter>
      </defs>
    </svg>
  )

  const logoIcon = (
    <svg width="126" height="138" viewBox="0 0 126 138" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.05" fill-rule="evenodd" clip-rule="evenodd" d="M53.9449 2.38379C59.4753 -0.794599 66.2781 -0.794596 71.8085 2.38379L116.289 27.9475C121.853 31.1449 125.283 37.0721 125.283 43.4888V94.5112C125.283 100.928 121.853 106.855 116.289 110.052L71.8085 135.616C66.2781 138.795 59.4753 138.795 53.9449 135.616L9.46402 110.052C3.90291 106.856 0.470703 100.937 0.470703 94.5179V43.4742C0.470703 37.0518 3.9056 31.142 9.46403 27.9475L53.9449 2.38379ZM9.76521 91.4459V94.5179C9.76521 97.6048 11.4144 100.453 14.0953 101.994L58.5762 127.558C61.239 129.088 64.5144 129.088 67.1772 127.558L111.658 101.994C114.337 100.455 115.988 97.6007 115.988 94.5112V68.3669C111.905 71.7938 106.73 73.9634 100.988 73.9634H24.7658C20.6947 73.9634 17.0121 75.9727 14.2278 79.3214C11.4145 82.7051 9.76521 87.1946 9.76521 91.4459ZM115.988 49.0832C115.988 56.9332 109.056 64.6689 100.988 64.6689H24.7658C18.8492 64.6689 13.7212 67.0464 9.76521 70.5902V43.4742C9.76521 40.3904 11.4117 37.5483 14.0953 36.006L58.5762 10.4423C61.239 8.91193 64.5144 8.91193 67.1772 10.4423L111.658 36.006C114.337 37.5454 115.988 40.3993 115.988 43.4888V49.0832ZM38.3125 41.4484L38.3125 56.386L29.018 56.386L29.018 40.1206C29.018 35.7207 32.5849 32.1539 36.9847 32.1539H50.2626C54.6625 32.1539 58.2293 35.7207 58.2293 40.1206L58.2294 56.386L48.9348 56.386L48.9348 41.4484H38.3125ZM78.81 41.4484L78.81 56.386L69.5155 56.386L69.5155 40.1206C69.5155 35.7207 73.0824 32.1539 77.4822 32.1539H90.7601C95.16 32.1539 98.7268 35.7207 98.7268 40.1206L98.7269 56.386L89.4323 56.386L89.4323 41.4484H78.81ZM38.3125 82.2779L38.3125 97.2155H48.9348L48.9348 82.2779H58.2294L58.2293 98.5433C58.2293 102.943 54.6625 106.51 50.2626 106.51H36.9847C32.5849 106.51 29.018 102.943 29.018 98.5433L29.018 82.2779H38.3125ZM78.81 82.2779L78.81 97.2155H89.4323L89.4323 82.2779H98.7269L98.7268 98.5433C98.7268 102.943 95.16 106.51 90.7601 106.51H77.4822C73.0824 106.51 69.5155 102.943 69.5155 98.5433L69.5155 82.2779H78.81Z" fill="white" />
    </svg>

  )
  return (
    <Container>
      <div className='top'>
        <span className='bgIcon'>{bgIcon}</span>
        <span className='logoIcon'>{logoIcon}</span>
        <div className="title">Polygon zkEVM</div>
        <p className="subTitle">Using Polygon zkEVM conveniently and efficiently</p>
      </div>
      <ComponentWrapperPage
        src={components['polygon-zkevm']}
        meta={{ title: 'Connect with the NEAR community.', description: 'Become part of the NEAR community.' }}
      />
    </Container>
  );
};

ZkevmColumn.getLayout = useDefaultLayout;

export default ZkevmColumn;
