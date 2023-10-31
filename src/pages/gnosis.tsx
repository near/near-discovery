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
      <g filter="url(#filter0_f_3774_8219)">
        <path d="M187.5 80C98.306 80 26 118.056 26 165L349 165C349 118.056 276.694 80 187.5 80Z" fill="#04795B" />
      </g>
      <defs>
        <filter id="filter0_f_3774_8219" x="-54" y="0" width="483" height="245" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_3774_8219" />
        </filter>
      </defs>
    </svg>

  );

  const logoIcon = (
    <svg width="100%" height="126" viewBox="0 0 144 170" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.05" d="M88.2485 141.182V160.231L71.7654 170L55.7672 160.231V141.182L71.7654 150.951L88.2485 141.182ZM0 75.2273L15.9983 84.9961V117.729L43.6394 134.336V153.385L0 127.498V75.2273ZM143.523 75.2273V127.498L99.3988 153.385V134.336L127.04 117.729V85.0039L143.523 75.2273ZM99.3988 49.3401L115.882 59.1089V78.1579L88.2407 94.7648V127.986L72.2424 137.755L56.2441 127.986V94.7727L27.6412 78.1579V59.1089L44.1242 49.3401L71.7654 65.947L99.3988 49.3401ZM27.6412 91.8421L43.6394 101.611V120.66L27.6412 110.891V91.8421ZM115.882 91.8421V110.891L99.8836 120.66V101.611L115.882 91.8421ZM15.9983 32.7332L32.4813 42.502L15.9983 52.2707V71.3198L0 61.551V42.502L15.9983 32.7332ZM127.517 32.7332L144 42.502V61.551L127.517 71.3198V52.2707L111.519 42.502L127.517 32.7332ZM71.7576 32.7332L88.2407 42.502L71.7576 52.2707L55.7593 42.502L71.7576 32.7332ZM71.7576 0L115.882 25.8872L99.8836 35.656L72.2424 19.0491L44.1242 35.6638L28.126 25.8951L71.7576 0Z" fill="white" />
    </svg>
  );

  return (
    <Container>
      <div className="top">
        <span className="bgIcon">{bgIcon}</span>
        <span className="logoIcon">{logoIcon}</span>
        <div className="title">Gnosis</div>
        <p className="subTitle">Using Gnosis conveniently and efficiently</p>
      </div>
      <ComponentWrapperPage
        src={components.gnosis || ''}
        meta={{ title: 'Connect with the Gnosis community.', description: 'Become part of the Gnosis community.' }}
      />
    </Container>
  );
};

Column.getLayout = useDefaultLayout;

export default Column;
