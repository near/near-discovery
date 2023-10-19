import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const BaseColumn: NextPageWithLayout = () => {
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
          left: 50%;
          transform: translate(-50%, -50%);
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
      <g filter="url(#filter0_f_2373_4908)">
        <path d="M187.5 80C98.306 80 26 118.056 26 165L349 165C349 118.056 276.694 80 187.5 80Z" fill="#00775A" />
      </g>
      <defs>
        <filter id="filter0_f_2373_4908" x="-54" y="0" width="483" height="245" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_2373_4908" />
        </filter>
      </defs>
    </svg>
  )

  const logoIcon = (
    <svg width="100%" height="126" viewBox="0 0 160 161" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.05" fill-rule="evenodd" clip-rule="evenodd" d="M88.2959 27.7343L92.4043 1.14182C88.3363 0.511083 84.1874 0.185547 80.0385 0.185547H79.9778V54.4286H80.0385C82.3052 54.4286 84.572 54.7135 86.7375 55.3035L93.7198 28.8737C91.9388 28.3854 90.1376 28.0192 88.2959 27.7343ZM67.026 57.9283L53.6079 34.6726C52.0293 35.6085 50.4911 36.6055 49.0137 37.6838L32.9847 15.6081C36.3443 13.1259 39.9468 10.9082 43.6505 8.99562L55.8341 32.9431C58.3032 31.6817 60.8735 30.6033 63.5248 29.7284L55.227 4.13287C59.1937 2.83071 63.3021 1.83375 67.4308 1.18267L71.7012 28.2025C69.8797 28.4873 68.0784 28.8942 66.3177 29.3622L73.2595 55.324C71.094 55.9141 68.9892 56.7889 67.026 57.9283ZM8.77782 44.1334L33.0236 56.5446C31.7689 59.0065 30.7164 61.5905 29.8664 64.2355L3.98127 55.8121C5.27654 51.8039 6.87539 47.8771 8.77782 44.1334ZM125.677 53.9404L102.544 67.4503C103.677 69.4239 104.568 71.5399 105.155 73.7169L130.979 66.7178C131.465 68.488 131.85 70.2988 132.133 72.1096L159.01 67.8165C158.362 63.6659 157.37 59.5356 156.055 55.5478L130.615 63.9304C129.745 61.2651 128.672 58.6811 127.417 56.1988L151.238 43.9097C149.336 40.1863 147.13 36.5647 144.661 33.1873L122.702 49.3218C123.754 50.8071 124.746 52.3534 125.677 53.9404ZM104.629 4.05141C108.616 5.35357 112.522 6.96092 116.246 8.87347L103.921 33.2483C101.452 31.9868 98.8812 30.9288 96.2705 30.0742L104.629 4.05141ZM106.571 34.2045L92.991 57.9079C94.9541 59.0473 96.7756 60.4512 98.3745 62.0585L136.463 23.6245C133.509 20.6539 130.291 17.9072 126.931 15.4453L111.226 37.2361C109.728 36.1374 108.19 35.1201 106.571 34.2045ZM57.5121 67.5317L33.9544 53.8591C34.8854 52.2517 35.8973 50.6851 36.9699 49.1794L15.3147 33.3704C17.7635 29.9929 20.4957 26.7579 23.4506 23.7873L61.6408 62.0993C60.0419 63.727 58.6455 65.5582 57.5121 67.5317ZM28.6526 66.7789L54.9425 73.8187C54.3759 75.9958 54.0723 78.2542 54.0723 80.5533H0.116211C0.116211 76.3824 0.440025 72.1707 1.06742 68.0811L27.5192 72.2317C27.8026 70.4006 28.1871 68.5694 28.6526 66.7789ZM127.094 104.562L151.34 116.973C153.242 113.229 154.841 109.302 156.136 105.294L130.251 96.8708C129.401 99.5158 128.349 102.1 127.094 104.562ZM93.0726 103.158L106.491 126.414C108.09 125.498 109.628 124.501 111.105 123.382L127.134 145.478C123.775 147.96 120.172 150.178 116.468 152.091L104.265 128.143C101.795 129.405 99.2252 130.483 96.5739 131.358L104.872 156.953C100.905 158.256 96.7965 159.252 92.6679 159.904L88.3975 132.884C90.219 132.599 92.0202 132.192 93.781 131.724L86.8392 105.762C89.0047 105.172 91.1095 104.297 93.0726 103.158ZM34.4408 107.166L57.5735 93.636C56.4401 91.6624 55.5496 89.5464 54.9627 87.3693L29.1383 94.3684C28.6526 92.5983 28.268 90.7875 27.9847 88.9767L1.10786 93.2697C1.75549 97.4204 2.74718 101.551 4.06269 105.539L29.5026 97.1762C30.3728 99.8212 31.4455 102.426 32.7003 104.908L8.87947 117.197C10.7819 120.92 12.9879 124.542 15.457 127.919L37.4159 111.785C36.3635 110.3 35.3718 108.753 34.4408 107.166ZM55.4895 157.055C51.5025 155.753 47.5964 154.146 43.8725 152.233L56.1978 127.858C58.6669 129.12 61.2372 130.178 63.848 131.032L55.4895 157.055ZM53.5249 126.902L67.105 103.199C65.1418 102.059 63.3204 100.655 61.7215 99.048L23.6325 137.482C26.5873 140.453 29.8053 143.199 33.1649 145.661L48.87 123.87C50.3677 124.949 51.926 125.966 53.5249 126.902ZM102.584 93.575L126.142 107.248C125.231 108.855 124.219 110.401 123.147 111.927L144.802 127.736C142.353 131.114 139.621 134.349 136.666 137.319L98.4557 99.0074C100.055 97.3797 101.451 95.5486 102.584 93.575ZM73.3592 105.803L66.3769 132.233C68.1579 132.701 69.9794 133.087 71.8008 133.372L67.6924 159.965C71.7603 160.595 75.9093 160.921 80.0582 160.921H80.1189V106.678H80.0582C77.7914 106.678 75.5247 106.373 73.3592 105.803ZM105.174 87.2881C105.761 85.1111 106.044 82.8526 106.044 80.5535H160C160 84.7245 159.676 88.9361 159.049 93.0257L132.597 88.8751C132.314 90.7063 131.929 92.5374 131.464 94.3279L105.174 87.2881Z" fill="white" />
    </svg>
  )

  return (
    <Container>
      <div className='top'>
        <span className='bgIcon'>{bgIcon}</span>
        <span className='logoIcon'>{logoIcon}</span>
        <div className="title">Optimism</div>
        <p className="subTitle">Using Optimism conveniently and efficiently</p>
      </div>
      <ComponentWrapperPage
        src={components.optimism || ''}
        meta={{ title: 'Connect with the Optimism community.', description: 'Become part of the Optimism community.' }}
      />
    </Container>
  );
};

BaseColumn.getLayout = useDefaultLayout;

export default BaseColumn;
