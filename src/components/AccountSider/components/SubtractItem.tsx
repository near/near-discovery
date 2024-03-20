import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import InviteCode from './InviteCode';

const StyledSubtractItem = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
const Item = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(115, 119, 155, 0.5);
  }
`;

const StyledInviteCode = styled(Item)`
  position: relative;
`;
const StyledDisconnect = styled(Item)`
  position: relative;
  .tips {
    padding: 10px;
    border-radius: 8px;
    background-color: rgba(55, 58, 83, 0.5);
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    color: #ff61d3;
    position: absolute;
    bottom: -41px;
    right: 0px;
    display: none;
  }
  &:hover .tips {
    display: block;
  }
`;

const oneSvg = (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="32" height="32" rx="8" fill="#373A53" fillOpacity="0.5" stroke="#373A53" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.3096 12.9755C18.3096 14.8228 17.3439 16.4296 15.9142 17.2883C18.6321 18.2805 20.6607 20.8938 20.9951 24.0683C21.0479 24.5671 20.6692 25 20.2034 25H6.79659C6.33081 25 5.95205 24.5671 6.00494 24.0683C6.34105 20.8725 8.39524 18.2449 11.1421 17.2669C9.72944 16.4047 8.77912 14.8068 8.77912 12.9755C8.77912 10.2268 10.9118 8 13.5444 8C16.1769 8 18.3096 10.2285 18.3096 12.9755ZM25.3114 15.6886H26.6886C27.413 15.6886 28 16.2756 28 17C28 17.7244 27.413 18.3114 26.6886 18.3114H25.3114V19.6886C25.3114 20.413 24.7244 21 24 21C23.2756 21 22.6886 20.413 22.6886 19.6886V18.3114H21.3114C20.587 18.3114 20 17.7244 20 17C20 16.2756 20.587 15.6886 21.3114 15.6886H22.6886V14.3114C22.6886 13.587 23.2756 13 24 13C24.7244 13 25.3114 13.587 25.3114 14.3114V15.6886Z"
      fill="url(#paint0_linear_7078_9837)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_7078_9837"
        x1="5.49703"
        y1="16.5"
        x2="24.742"
        y2="22.3216"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#62FFF6" />
        <stop offset="0.520833" stopColor="#B479FF" />
        <stop offset="1" stopColor="#FFC289" />
      </linearGradient>
    </defs>
  </svg>
);

const twoSvg = (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="32" height="32" rx="8" fill="url(#paint0_linear_7078_10077)" stroke="#373A53" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.3096 12.9755C18.3096 14.8228 17.3439 16.4296 15.9142 17.2883C18.6321 18.2805 20.6607 20.8938 20.9951 24.0683C21.0479 24.5671 20.6692 25 20.2034 25H6.79659C6.33081 25 5.95205 24.5671 6.00494 24.0683C6.34105 20.8725 8.39524 18.2449 11.1421 17.2669C9.72944 16.4047 8.77912 14.8068 8.77912 12.9755C8.77912 10.2268 10.9118 8 13.5444 8C16.1769 8 18.3096 10.2285 18.3096 12.9755ZM25.3114 15.6886H26.6886C27.413 15.6886 28 16.2756 28 17C28 17.7244 27.413 18.3114 26.6886 18.3114H25.3114V19.6886C25.3114 20.413 24.7244 21 24 21C23.2756 21 22.6886 20.413 22.6886 19.6886V18.3114H21.3114C20.587 18.3114 20 17.7244 20 17C20 16.2756 20.587 15.6886 21.3114 15.6886H22.6886V14.3114C22.6886 13.587 23.2756 13 24 13C24.7244 13 25.3114 13.587 25.3114 14.3114V15.6886Z"
      fill="#262836"
    />
    <defs>
      <linearGradient
        id="paint0_linear_7078_10077"
        x1="0.268401"
        y1="17"
        x2="29.2396"
        y2="23.772"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#62FFF6" />
        <stop offset="0.520833" stopColor="#B479FF" />
        <stop offset="1" stopColor="#FFC289" />
      </linearGradient>
    </defs>
  </svg>
);

const SubtractItem = ({
  showInviteLink,
  setShowInviteLink,
}: {
  showInviteLink: boolean;
  setShowInviteLink: (show: boolean) => void;
}) => {
  return (
    <StyledSubtractItem>
      <StyledInviteCode
        onClick={(ev) => {
          ev.stopPropagation();
          // setShowCodes(!showCodes);
          setShowInviteLink(!showInviteLink);
        }}
        data-bp="30012-002"
      >
        {showInviteLink ? twoSvg : oneSvg}
      </StyledInviteCode>
    </StyledSubtractItem>
  );
};

export default memo(SubtractItem);
