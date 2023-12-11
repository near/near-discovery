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

const SubtractItem = ({ showCodes, setShowCodes }: { showCodes: boolean; setShowCodes: (show: boolean) => void }) => {
  useEffect(() => {
    const hideCode = () => {
      setShowCodes(false);
    };
    document.addEventListener('click', hideCode);
    return () => {
      document.removeEventListener('click', hideCode);
    };
  }, []);

  return (
    <StyledSubtractItem>
      <StyledInviteCode
        onClick={(ev) => {
          ev.stopPropagation();
          setShowCodes(!showCodes);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 10.1268C20 9.78168 19.9018 9.44366 19.7168 9.15227C19.5888 8.95066 19.4223 8.77625 19.2269 8.63899C19.0315 8.50173 18.8109 8.40432 18.5778 8.35232C18.3447 8.30031 18.1037 8.29474 17.8685 8.33591C17.6332 8.37708 17.4084 8.4642 17.2068 8.59227L9.98091 13.1818L2.79545 8.60046C2.52062 8.42527 2.20375 8.32719 1.878 8.31646C1.55226 8.30574 1.22962 8.38278 0.943857 8.5395C0.658095 8.69623 0.419714 8.92689 0.253665 9.20734C0.0876161 9.48779 4.48098e-06 9.80772 0 10.1336V16.3636C0 17.087 0.287337 17.7806 0.7988 18.2921C1.31026 18.8036 2.00396 19.0909 2.72727 19.0909H17.2727C17.996 19.0909 18.6897 18.8036 19.2012 18.2921C19.7127 17.7806 20 17.087 20 16.3636V10.1268ZM16.4739 0.7988C15.9625 0.287337 15.2688 0 14.5455 0H5.45455C4.73123 0 4.03754 0.287337 3.52607 0.7988C3.01461 1.31026 2.72727 2.00396 2.72727 2.72727V7.27273L10.015 11.8182L17.2727 7.27273V2.72727C17.2727 2.00396 16.9854 1.31026 16.4739 0.7988ZM10 8.18213C10.2117 8.18213 10.4147 8.09849 10.565 7.94943V7.94988L12.6359 5.89079L12.6691 5.8567C13.0037 5.50728 13.1877 5.04046 13.1814 4.55673C13.1752 4.07301 12.9793 3.61106 12.6359 3.27034C12.2854 2.92273 11.8117 2.72769 11.318 2.72769C10.8243 2.72769 10.3506 2.92273 10 3.27034C9.64945 2.92273 9.17575 2.72769 8.68206 2.72769C8.18837 2.72769 7.71467 2.92273 7.3641 3.27034C7.01987 3.61179 6.82385 4.075 6.8184 4.55983C6.81296 5.04466 6.99853 5.51215 7.33501 5.86125L7.3641 5.89034L9.43501 7.94943C9.58528 8.09849 9.78836 8.18213 10 8.18213Z"
            fill="url(#paint0_linear_30_222)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_30_222"
              x1="3.50059e-08"
              y1="19"
              x2="20"
              y2="12"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#62FFF6" />
              <stop offset="0.520833" stopColor="#B479FF" />
              <stop offset="1" stopColor="#FFC289" />
            </linearGradient>
          </defs>
        </svg>
        <InviteCode
          show={showCodes}
          onClose={() => {
            setTimeout(() => {
              setShowCodes(false);
            }, 500);
          }}
        />
      </StyledInviteCode>
    </StyledSubtractItem>
  );
};

export default memo(SubtractItem);
