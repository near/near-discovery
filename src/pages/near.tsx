import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const NearColumn: NextPageWithLayout = () => {



  const search = useSearchParams()



  const initTab = search.get('initTab')



 console.log({initTab})

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
          width: 108%;
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
      <g filter="url(#filter0_f_2081_3803)">
        <path d="M187.5 80C98.306 80 26 118.056 26 165L349 165C349 118.056 276.694 80 187.5 80Z" fill="#00FFA3" />
      </g>
      <defs>
        <filter
          id="filter0_f_2081_3803"
          x="-54"
          y="0"
          width="483"
          height="245"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_2081_3803" />
        </filter>
      </defs>
    </svg>
  );

  const logoIcon = (
    <svg width="134" height="113" viewBox="0 0 134 113" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.05"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.1579 23.32V90.422L56.4211 64.7848L59.9474 67.7939L30.3768 108.321C19.3898 118.128 0 111.493 0 97.9245V15.0753C0 1.04203 20.525 -5.35005 31.1182 5.3841L112.842 88.1955V23.8468L81.1053 46.7306L77.5789 43.7215L102.73 5.89117C113.228 -5.04173 134 1.29245 134 15.4265V96.4402C134 110.473 113.475 116.866 102.882 106.131L21.1579 23.32Z"
        fill="white"
      />
    </svg>
  );
  return (
    <Container>

      <ComponentWrapperPage
        src={components.near || ''}
        meta={{ title: 'Connect with the NEAR community.', description: 'Become part of the NEAR community.' }}
        componentProps={{
          initTab
        }}
      />
    </Container>
  );
};

NearColumn.getLayout = useDefaultLayout;

export default NearColumn;
