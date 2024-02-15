import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MEDIUM_SCREEN } from '@/components/near/NearStyleVar';
import { onboard } from '@/data/web3';
import { useEthersProviderContext } from '@/data/web3';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { flushEvents } from '@/utils/analytics';

import { NotificationButton } from '../NotificationButton';
import { UserDropdownMenu } from './UserDropdownMenu';

const nearIcon = (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.21053 2.47646V9.60233L5.89474 6.8798L6.26316 7.19935L3.1737 11.5031C2.0258 12.5446 0 11.8399 0 10.3991V1.60091C0 0.110658 2.1444 -0.568147 3.25115 0.571763L11.7895 9.3659V2.5324L8.47368 4.96254L8.10526 4.64299L10.733 0.625611C11.8298 -0.535405 14 0.137252 14 1.63821V10.2414C14 11.7317 11.8556 12.4105 10.7488 11.2706L2.21053 2.47646Z"
      fill="#332C4B"
    />
  </svg>
);

const zkevmIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="url(#pattern0)" stroke="#332C4B" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_1261_11" transform="scale(0.0208333)" />
      </pattern>
      <image
        id="image0_1261_11"
        width="48"
        height="48"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

const baseIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" transform="matrix(1 0 0 -1 0 32)" fill="#004BFC" />
    <path
      d="M15.981 27C22.0673 27 27 22.076 27 16C27 9.924 22.0673 5 15.981 5C10.2066 5 5.46987 9.432 5 15.074H19.566V16.924H5C5.46987 22.568 10.2066 27 15.981 27Z"
      fill="white"
    />
  </svg>
);

const mantleIcon = (
  <img src="https://assets.dapdap.net/images/bafkreiehsmxrfkil52ow2o3afcryjfpm7eovsrrjgb75eupx2vuhkiajq4.svg"></img>
);
const arbitrumIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="32" y="32" width="32" height="32" rx="8" transform="rotate(180 32 32)" fill="black" />
    <path
      d="M6.75715 11.8606V20.711C6.75715 21.2742 7.05724 21.7959 7.54663 22.0776L15.2105 26.5005C15.6999 26.7821 16.3001 26.7821 16.7895 26.5005L24.4534 22.0776C24.9427 21.7959 25.2428 21.2742 25.2428 20.711V11.8606C25.2428 11.2973 24.9427 10.7756 24.4534 10.494L16.7895 6.0711C16.3001 5.78947 15.6999 5.78947 15.2105 6.0711L7.54663 10.494C7.06186 10.7756 6.75715 11.2973 6.75715 11.8606Z"
      fill="#213147"
    />
    <path
      d="M17.6755 18.0015L16.5813 20.9978C16.549 21.0809 16.549 21.1732 16.5813 21.2563L18.4603 26.4133L20.6348 25.1575L18.0263 18.0015C17.9663 17.8353 17.7355 17.8353 17.6755 18.0015Z"
      fill="#12AAFF"
    />
    <path
      d="M19.8639 12.9614C19.8039 12.7952 19.573 12.7952 19.513 12.9614L18.4188 15.9577C18.3865 16.0408 18.3865 16.1332 18.4188 16.2163L21.4982 24.6604L23.6727 23.4046L19.8639 12.9614Z"
      fill="#12AAFF"
    />
    <path
      d="M16 6.39889C16.0554 6.39889 16.1062 6.41274 16.157 6.44044L24.4488 11.2281C24.5457 11.2835 24.6057 11.385 24.6057 11.4958V21.0711C24.6057 21.1819 24.5457 21.2835 24.4488 21.3389L16.157 26.1311C16.1108 26.1588 16.0554 26.1727 16 26.1727C15.9446 26.1727 15.8938 26.1588 15.843 26.1311L7.55586 21.3435C7.45891 21.2881 7.39889 21.1865 7.39889 21.0757V11.4958C7.39889 11.385 7.45891 11.2835 7.55586 11.2281L15.8476 6.44044C15.8938 6.41274 15.9492 6.39889 16 6.39889ZM16 5C15.7045 5 15.409 5.07849 15.1459 5.23084L6.85411 10.0185C6.32779 10.3232 6 10.8864 6 11.4958V21.0711C6 21.6805 6.32779 22.2484 6.85411 22.5531L15.1459 27.3407C15.409 27.4931 15.7045 27.5716 16 27.5716C16.2955 27.5716 16.591 27.4931 16.8541 27.3407L25.1459 22.5531C25.6768 22.2484 26 21.6851 26 21.0711V11.4958C26 10.8864 25.6722 10.3186 25.1459 10.0139L16.8587 5.23084C16.591 5.07849 16.2955 5 16 5Z"
      fill="#9DCCED"
    />
    <path d="M10.5198 24.6676L11.2816 22.5808L12.8144 23.8551L11.3832 25.1662L10.5198 24.6676Z" fill="#213147" />
    <path
      d="M15.3029 10.8126H13.2022C13.0452 10.8126 12.9021 10.9095 12.8513 11.0573L8.34533 23.4118L10.5198 24.6676L15.4829 11.0619C15.5245 10.9418 15.4367 10.8126 15.3029 10.8126Z"
      fill="white"
    />
    <path
      d="M18.9826 10.8127H16.8819C16.7249 10.8127 16.5818 10.9096 16.531 11.0573L11.3833 25.1663L13.5578 26.4221L19.158 11.0666C19.2042 10.9419 19.1118 10.8127 18.9826 10.8127Z"
      fill="white"
    />
  </svg>
);
const bscIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="32" y="32" width="32" height="32" rx="8" transform="rotate(180 32 32)" fill="white" />
    <path
      d="M18.0311 22.6097V24.8507L15.9707 26L13.9709 24.8507V22.6097L15.9707 23.7589L18.0311 22.6097ZM7 14.8503L8.99978 15.9995V19.8505L12.4549 21.8043V24.0453L7 20.9998V14.8503ZM24.9404 14.8503V20.9998L19.4248 24.0453V21.8043L22.88 19.8505V16.0005L24.9404 14.8503ZM19.4248 11.8047L21.4852 12.954V15.1951L18.0301 17.1488V21.0572L16.0303 22.2065L14.0305 21.0572V17.1497L10.4551 15.1951V12.954L12.5155 11.8047L15.9707 13.7585L19.4248 11.8047ZM10.4551 16.8049L12.4549 17.9542V20.1953L10.4551 19.046V16.8049ZM21.4852 16.8049V19.046L19.4854 20.1953V17.9542L21.4852 16.8049ZM8.99978 9.85097L11.0602 11.0002L8.99978 12.1495V14.3906L7 13.2413V11.0002L8.99978 9.85097ZM22.9396 9.85097L25 11.0002V13.2413L22.9396 14.3906V12.1495L20.9398 11.0002L22.9396 9.85097ZM15.9697 9.85097L18.0301 11.0002L15.9697 12.1495L13.9699 11.0002L15.9697 9.85097ZM15.9697 6L21.4852 9.04555L19.4854 10.1948L16.0303 8.24107L12.5155 10.1957L10.5157 9.04648L15.9697 6Z"
      fill="#F3BA2F"
    />
  </svg>
);

const lineaIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="32" y="32" width="32" height="32" rx="8" transform="rotate(180 32 32)" fill="#131313" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.2625 13.6465C22.8218 13.6465 24.0858 12.3825 24.0858 10.8232C24.0858 9.26401 22.8218 8 21.2625 8C19.7033 8 18.4393 9.26401 18.4393 10.8232C18.4393 12.3825 19.7033 13.6465 21.2625 13.6465ZM8 10.4949H11.2172V21.8535H21.2627V24.8081H8V10.4949Z"
      fill="#56DAFF"
    />
  </svg>
);

const polygonIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="32" y="32" width="32" height="32" rx="8" transform="rotate(180 32 32)" fill="white" />
    <path
      d="M21.819 20.7892L27.5117 17.542C27.8135 17.3695 28 17.0496 28 16.7063V10.2117C28 9.8684 27.8135 9.54853 27.5117 9.37603L21.819 6.12874C21.5172 5.95625 21.1426 5.95792 20.8425 6.12874L15.1498 9.37603C14.8481 9.54853 14.6616 9.8684 14.6616 10.2117V21.8175L10.6692 24.0935L6.67684 21.8175V17.264L10.6692 14.9881L13.302 16.4902V13.4355L11.1574 12.2113C11.0099 12.1276 10.8405 12.0824 10.6692 12.0824C10.4979 12.0824 10.3285 12.1276 10.181 12.2113L4.48824 15.4586C4.18648 15.6311 4 15.951 4 16.2943V22.7889C4 23.1322 4.18648 23.4521 4.48824 23.6246L10.181 26.8719C10.4827 27.0427 10.8557 27.0427 11.1574 26.8719L16.8502 23.6246C17.152 23.4521 17.3384 23.1322 17.3384 22.7889V11.1814L17.4096 11.1412L21.3291 8.90544L25.3215 11.1814V15.735L21.3291 18.0109L18.6997 16.512V19.5668L20.8408 20.7876C21.1426 20.9584 21.5172 20.9584 21.8173 20.7876L21.819 20.7892Z"
      fill="url(#paint0_linear_3778_10365)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3778_10365"
        x1="3.92202"
        y1="23.4253"
        x2="26.8267"
        y2="9.96749"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A726C1" />
        <stop offset="0.88" stopColor="#803BDF" />
        <stop offset="1" stopColor="#7B3FE4" />
      </linearGradient>
    </defs>
  </svg>
);

const metisIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="32" y="32" width="32" height="32" rx="8" transform="rotate(180 32 32)" fill="#131313" />
    <path
      d="M27.9931 16.0638C27.8519 9.20374 22.0452 3.77009 15.0651 4.00749C8.24689 4.23876 2.8555 9.86066 3.00295 16.5837C3.11302 21.5507 6.19085 25.7667 10.5335 27.6208C11.1503 26.8493 11.6632 25.4637 11.9187 24.6901C12.1741 24.0598 12.4441 23.4438 12.7266 22.8462C13.9955 23.2821 15.7006 22.8687 16.6309 21.87L16.6684 21.829H16.6642C15.5344 21.3399 13.9789 21.5937 12.9529 22.3755C13.3019 21.6612 13.6715 20.9715 14.0599 20.3084C15.308 20.7996 17.0256 20.466 18.0037 19.5123L18.0432 19.4734H18.0391C16.9508 18.9414 15.416 19.1071 14.3548 19.8132C14.741 19.1808 15.1419 18.5709 15.5614 17.9876C16.8532 18.3826 18.5562 17.8955 19.4471 16.8497L19.4824 16.8088H19.4782C18.4253 16.4077 17.0422 16.6431 16.0577 17.3204C16.0931 17.2754 16.1263 17.2284 16.1616 17.1833C16.4129 16.86 16.6704 16.5468 16.9321 16.2398C18.4585 15.8142 19.8188 14.2813 20.0369 12.6973L20.0452 12.6338H20.039C18.4606 12.9449 16.9985 14.4757 16.7057 16.0945C16.4544 16.3893 16.2073 16.6901 15.9664 16.9991C16.361 15.9452 16.2904 14.664 15.7151 13.7799V13.7758L15.6777 13.8187C14.8075 14.8993 14.6684 16.6635 15.3434 17.8321C14.9466 18.3847 14.5645 18.9598 14.1969 19.5553C14.4275 18.358 14.0391 16.9684 13.1855 16.1846H13.1814L13.1586 16.2317C12.5957 17.4801 12.8969 19.2033 13.8252 20.1734C13.4597 20.8016 13.1087 21.4505 12.7764 22.1238C12.9799 20.8794 12.5272 19.4407 11.6217 18.6589L11.6175 18.6548L11.5968 18.706C11.0838 20.0158 11.4784 21.7902 12.4752 22.7377C12.2593 23.1982 12.0495 23.6669 11.8481 24.1478C11.7982 24.0987 11.7359 24.0598 11.6653 24.0393C11.4057 23.9636 11.0464 23.8306 10.6497 23.5952C10.3881 23.4417 10.1098 23.3149 9.82109 23.2207C8.6934 22.8564 8.85956 22.3202 8.27181 21.2478C8.23443 21.1782 7.76715 20.6994 7.66746 20.6134C7.64254 20.5929 7.34556 20.421 7.19395 20.1079C7.0548 19.8193 6.97796 19.5532 6.94889 19.2913C6.9115 18.9414 6.76405 18.7121 6.4193 18.5955C4.75993 18.0306 5.50343 15.9083 5.56158 15.6259C5.61142 15.3844 5.39751 14.8605 5.31859 14.5719C5.31028 14.5371 5.30198 14.4941 5.29159 14.443C5.17114 13.874 5.44112 13.3931 5.6405 13.1946C5.83987 12.9961 6.52729 12.6809 6.67267 12.4946C6.81389 12.3125 6.92812 12.1037 7.07349 11.9257C7.26664 11.6883 7.85853 11.2237 8.65602 10.8021C9.13784 10.5483 9.22507 9.88118 9.40782 9.67854C9.72347 9.32858 10.1991 9.32858 10.5542 9.01341C10.7328 8.85378 10.9924 8.77601 11.1586 8.60819C11.981 7.77728 13.0817 7.44164 14.172 7.24108C14.9051 7.106 15.7234 7.31476 16.4897 7.44164C16.6019 7.46006 16.7099 7.48667 16.8137 7.51736C18.5354 7.57467 20.6101 7.92873 21.3577 8.64912C21.8251 9.09936 22.0535 9.5885 22.1656 9.92621C22.2903 10.3027 22.4626 10.663 22.6724 11.0006L23.1334 11.7394C23.4242 12.206 23.5218 12.7689 23.3951 13.303C23.3245 13.6079 23.2871 13.9272 23.3785 14.1053C23.5218 14.3815 23.9642 14.8338 24.23 15.0917C24.3587 15.2166 24.5 15.3271 24.6537 15.4233C25.0088 15.6443 25.6796 16.068 25.6817 16.1048C25.6817 16.1539 25.7377 16.3647 25.4407 16.6185C25.1438 16.8723 24.583 17.2775 24.583 17.2775C24.583 17.2775 24.6121 17.4637 24.691 17.6111C24.77 17.7584 24.9631 17.9795 24.905 18.178C24.8468 18.3765 24.4335 18.5361 24.5519 18.7571C24.6703 18.9782 24.961 19.0478 24.878 19.2483C24.7928 19.4489 24.3837 19.7927 24.4252 19.9421C24.4668 20.0915 24.7969 21.4647 24.0327 21.7042C23.4553 21.8843 21.8728 21.9866 21.1293 22.0255C20.8074 22.0419 20.5188 22.222 20.3651 22.4983C20.2488 22.707 20.1366 22.9935 20.0785 23.3762C19.9352 24.3484 18.959 26.5832 18.959 26.5832C18.959 26.5832 18.93 26.6405 18.8863 26.7327C18.8012 26.9332 18.6808 27.2504 18.6974 27.3773C18.7078 27.4612 18.8241 27.6229 18.9923 27.8214C19.1252 27.979 19.3454 28.0404 19.5426 27.9728C24.554 26.2865 28.1115 21.5589 27.9973 16.0638"
      fill="#00DACC"
    />
  </svg>
);

const GnosisIcon = (
  <img src="https://assets.dapdap.net/images/bafkreiflvhldlljkmvy6i7xos6w5i56i4nt5mwr7pgu6f3kowqnqdz2vme.png" />
);
const ZkSyncIcon = (
  <img src="https://assets.dapdap.net/images/bafkreiepgmcd2oa6ufoejvgqiukfomo5gnxm4ltlyf2wsrowyouq3gkvcu.png" />
);

const AvalanchecIcon = (
  <img src="https://assets.dapdap.net/images/bafkreie2h3qc42tkuj73ip6qs6nl463qm5qiumkicnw5wy4x5jvkjhvrdi.svg" />
);

const OptimismIcon = (
  <img src="https://assets.dapdap.net/images/bafkreidax5cwumzbzrttt7iswlzhdndtbzyiyrg6yy4jbtydm2ihvlpo6a.svg" />
);

const NearSignInButton = styled.div`
  width: 123px;
  cursor: pointer;
  height: 40px;
  border-radius: 12px;
  background: #00faa0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #02051e;
  position: fixed;
  top: 28px;
  right: 30px;
  .near-icon-wrapper {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
  }

  @media (max-width: ${MEDIUM_SCREEN}) {
    .near-icon-wrapper {
      display: none;
    }
    /* height: 436px; */
    width: auto;
    height: auto;

    background: #ebf479;
    padding: 6px 4px;
    border-radius: 6px;
    font-family: Gantari;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    top: 25px;
    right: 55px;
    text-align: left;
  }
`;

const ZKEVMSignInButton = styled.div`
  width: 123px;
  cursor: pointer;
  height: 40px;
  border-radius: 12px;
  background: #794fdd;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;
  position: fixed;
  top: 28px;
  right: 30px;

  @media (max-width: ${MEDIUM_SCREEN}) {
    .zk-evm-icon {
      display: none;
    }
    width: auto;
    height: auto;

    background: #ebf479;
    padding: 6px 4px;
    border-radius: 6px;
    font-family: Gantari;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
    top: 25px;
    right: 55px;
  }
`;

const BaseSignInButton = styled.div`
  width: 123px;
  cursor: pointer;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #332c4b;
  position: fixed;
  top: 28px;
  right: 30px;

  @media (max-width: ${MEDIUM_SCREEN}) {
    .base-icon {
      display: none;
    }
    width: auto;
    height: auto;

    background: #ebf479;
    padding: 6px 4px;
    border-radius: 6px;
    font-family: Gantari;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
    top: 25px;
    right: 55px;
  }
`;

const MantleSignInButton = styled.div`
  width: 123px;
  cursor: pointer;
  height: 40px;
  border-radius: 12px;
  background: #00ffe0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #332c4b;
  position: fixed;
  top: 28px;
  right: 30px;

  @media (max-width: ${MEDIUM_SCREEN}) {
    .mantle-icon {
      display: none;
    }
    width: auto;
    height: auto;

    background: #ebf479;
    padding: 6px 4px;
    border-radius: 6px;
    font-family: Gantari;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
    top: 25px;
    right: 55px;
  }
`;

const SignInButton = styled.div<{ backgroundColor: string; color: string }>`
  width: 123px;
  cursor: pointer;
  height: 40px;
  border-radius: 12px;
  background: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ color }) => color};
  position: fixed;
  top: 28px;
  right: 30px;

  @media (max-width: ${MEDIUM_SCREEN}) {
    .icon {
      display: none;
    }
    width: auto;
    height: auto;

    background: #ebf479;
    padding: 6px 4px;
    border-radius: 6px;
    font-family: Gantari;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
    top: 25px;
    right: 55px;
  }
`;

const LoginArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  position: fixed;
  z-index: 100;
  top: 28px;
  right: 30px;
  @media (max-width: ${MEDIUM_SCREEN}) {
    /* height: 436px; */
    z-index: 100;
    top: 26px;
    right: 56px;
  }
`;

export const LoginBox = () => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const { requestAuthentication } = useSignInRedirect();

  const { useConnectWallet } = useEthersProviderContext();

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const router = useRouter();

  function isActive(name: string) {
    let paths: string[] = [];
    if (name == 'near') {
      paths = ['ref-home', 'xBox', 'near', 'rainbow-bridge', 'MetaPool.Stake'];
    } else if (name == 'polygon-zkevm') {
      paths = [
        'ZKEVMSwap.zkevm-swap',
        'ZKEVMSwap.zkevm-bridge',
        'ZKEVM.GAMMA',
        'ZKEVM.AAVE',
        'polygon-zkevm',
        'warmup',
        'ZKEVM.ExecuteRecords',
        'ZKEVM.QuestionList',
        'ZKEVM-all-in-one',
      ];
    } else if (name === 'base') {
      paths = ['base', 'Base.BaseDex', 'Base.Lending', 'Base.All-in-one'];
    } else if (name === 'mantle') {
      paths = ['mantle', 'Mantle.Swap', 'Mantle.GAMMA', 'Mantle.Lending', 'Mantle.All-in-one'];
    } else if (name === 'arbitrum') {
      paths = ['arbitrum', 'Arbitrum.Swap.Dex', 'Arbitrum.Pendle', 'Arbitrum.Lending', 'Arbitrum.All-in-one'];
    } else if (name === 'bsc') {
      paths = ['bsc', 'Bsc.Swap.Dex', 'Bsc.Lending', 'Bsc.All-in-one'];
    } else if (name === 'linea') {
      paths = ['linea', 'Linea.Swap.Dex', 'Linea.Liquidity.GAMMA', 'Linea.Lending', 'Linea.All-in-one'];
    } else if (name === 'polygon') {
      paths = ['polygon', 'Polygon.Swap.Dex', 'Polygon.Lending', 'Polygon.All-in-one'];
    } else if (name === 'metis') {
      paths = ['metis', 'Metis.Swap.Dex', 'Metis.All-in-one'];
    } else if (name === 'gnosis') {
      paths = ['gnosis', 'Gnosis.Swap.Dex', 'Gnosis.Lending', 'Gnosis.All-in-one'];
    } else if (name === 'zkSync') {
      paths = ['zkSync', 'zkSync.Swap.Dex', 'zkSync.All-in-one'];
    } else if (name === 'avalanche') {
      paths = ['avalanche', 'Avalanche.Lending', 'Avalanche.All-in-one'];
    } else if (name === 'optimism') {
      paths = ['optimism', 'Optimism.Lending', 'Optimism.All-in-one'];
    }
    const r = router.asPath.split('/').pop() || '';
    return paths.some((p) => r.includes(p));
  }

  const isDappActive =
    isActive('polygon-zkevm') ||
    isActive('base') ||
    isActive('mantle') ||
    isActive('arbitrum') ||
    isActive('bsc') ||
    isActive('polygon') ||
    isActive('linea') ||
    isActive('metis') ||
    isActive('gnosis') ||
    isActive('zkSync') ||
    isActive('optimism') ||
    isActive('avalanche');

  function handleSignIn() {
    flushEvents();
    requestAuthentication();
  }

  const NearLoginArea = (
    <LoginArea>
      {!signedIn && (
        <>
          <NearSignInButton onClick={handleSignIn}>
            <div className="near-icon-wrapper">{nearIcon}</div>

            <span>Connect</span>
          </NearSignInButton>
        </>
      )}
      {signedIn && (
        <>
          <NotificationButton />
          <UserDropdownMenu />
        </>
      )}
    </LoginArea>
  );

  const ZKEVMloginArea = wallet ? null : (
    <LoginArea>
      <ZKEVMSignInButton
        onClick={() => {
          connect();
        }}
      >
        <span className="zk-evm-icon">{zkevmIcon}</span>

        <span>Connect</span>
      </ZKEVMSignInButton>
    </LoginArea>
  );

  const BaseloginArea = wallet ? null : (
    <LoginArea>
      <BaseSignInButton
        onClick={() => {
          connect();
        }}
      >
        <span className="base-icon">{baseIcon}</span>

        <span>Connect</span>
      </BaseSignInButton>
    </LoginArea>
  );

  const MantleloginArea = wallet ? null : (
    <LoginArea>
      <MantleSignInButton
        onClick={() => {
          connect();
        }}
      >
        <span className="mantle-icon">{mantleIcon}</span>

        <span>Connect</span>
      </MantleSignInButton>
    </LoginArea>
  );

  const ArbitrumloginArea = wallet ? null : (
    <LoginArea>
      <SignInButton
        backgroundColor="#33549C"
        color="#fff"
        onClick={() => {
          connect();
        }}
      >
        <span className="icon">{arbitrumIcon}</span>

        <span>Connect</span>
      </SignInButton>
    </LoginArea>
  );

  const BscloginArea = wallet ? null : (
    <LoginArea>
      <SignInButton
        backgroundColor="#D39808"
        color="#fff"
        onClick={() => {
          connect();
        }}
      >
        <span className="icon">{bscIcon}</span>

        <span>Connect</span>
      </SignInButton>
    </LoginArea>
  );

  const LinealoginArea = wallet ? null : (
    <LoginArea>
      <SignInButton
        backgroundColor="#56DAFF"
        color="#fff"
        onClick={() => {
          connect();
        }}
      >
        <span className="icon">{lineaIcon}</span>

        <span
          style={{
            color: '#332C4B',
          }}
        >
          Connect
        </span>
      </SignInButton>
    </LoginArea>
  );

  const PolygonloginArea = wallet ? null : (
    <LoginArea>
      <SignInButton
        backgroundColor="#783BF0"
        color="#fff"
        onClick={() => {
          connect();
        }}
      >
        <span className="icon">{polygonIcon}</span>

        <span>Connect</span>
      </SignInButton>
    </LoginArea>
  );

  const MetisloginArea = wallet ? null : (
    <LoginArea>
      <SignInButton
        backgroundColor="#00DACC"
        color="#fff"
        onClick={() => {
          connect();
        }}
      >
        <span className="icon">{metisIcon}</span>

        <span
          style={{
            color: '#332C4B',
          }}
        >
          Connect
        </span>
      </SignInButton>
    </LoginArea>
  );

  const GnosisloginArea = wallet ? null : (
    <LoginArea>
      <SignInButton
        backgroundColor="#04795B"
        color="#fff"
        onClick={() => {
          connect();
        }}
      >
        <span className="icon">{GnosisIcon}</span>
        <span>Connect</span>
      </SignInButton>
    </LoginArea>
  );

  const ZkSyncloginArea = wallet ? null : (
    <LoginArea>
      <SignInButton
        backgroundColor="#3B6BDC"
        color="#fff"
        onClick={() => {
          connect();
        }}
      >
        <span className="icon">{ZkSyncIcon}</span>
        <span>Connect</span>
      </SignInButton>
    </LoginArea>
  );

  const OptimismloginArea = wallet ? null : (
    <LoginArea>
      <SignInButton
        backgroundColor="#FFFFFF"
        color="#000000"
        onClick={() => {
          connect();
        }}
      >
        <span className="icon">{OptimismIcon}</span>
        <span>Connect</span>
      </SignInButton>
    </LoginArea>
  );

  const AvalancheloginArea = wallet ? null : (
    <LoginArea>
      <SignInButton
        backgroundColor="#FFFFFF"
        color="#000000"
        onClick={() => {
          connect();
        }}
      >
        <span className="icon">{AvalanchecIcon}</span>
        <span>Connect</span>
      </SignInButton>
    </LoginArea>
  );

  useEffect(() => {
    if (!isDappActive) {
      onboard.state.actions.updateAccountCenter({
        enabled: false,
      });
    } else {
      onboard.state.actions.updateAccountCenter({
        enabled: false,
      });
    }
  }, [isDappActive]);

  return isActive('near')
    ? NearLoginArea
    : isActive('polygon-zkevm')
      ? ZKEVMloginArea
      : isActive('base')
        ? BaseloginArea
        : isActive('mantle')
          ? MantleloginArea
          : isActive('arbitrum')
            ? ArbitrumloginArea
            : isActive('bsc')
              ? BscloginArea
              : isActive('linea')
                ? LinealoginArea
                : isActive('polygon')
                  ? PolygonloginArea
                  : isActive('metis')
                    ? MetisloginArea
                    : isActive('gnosis')
                      ? GnosisloginArea
                      : isActive('zkSync')
                        ? ZkSyncloginArea
                        : isActive('avalanche')
                          ? AvalancheloginArea
                          : isActive('optimism')
                            ? OptimismloginArea
                            : null;
};
