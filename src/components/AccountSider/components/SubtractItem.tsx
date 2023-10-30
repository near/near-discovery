import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLayoutStore } from '@/stores/layout';
import useAuth from '@/hooks/useAuth';
import InviteCode from './InviteCode';
import useAccount from '@/hooks/useAccount';

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
  background-color: rgba(115, 119, 155, 0.5);
  border-radius: 8px;
  cursor: pointer;
`;

const StyledInviteCode = styled(Item)`
  position: relative;
`;

const SubtractItem = () => {
  const [showCode, setShowCode] = useState<boolean>(false);
  const { account } = useAccount();
  const { connect, logout } = useAuth();
  const setLayoutStore = useLayoutStore((store) => store.set);

  useEffect(() => {
    const hideCode = () => {
      setShowCode(false);
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
          setShowCode(!showCode);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
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
              <stop stop-color="#62FFF6" />
              <stop offset="0.520833" stop-color="#B479FF" />
              <stop offset="1" stop-color="#FFC289" />
            </linearGradient>
          </defs>
        </svg>
        <InviteCode
          show={showCode}
          onClose={() => {
            setTimeout(() => {
              setShowCode(false);
            }, 500);
          }}
        />
      </StyledInviteCode>
      <Item
        onClick={async () => {
          if (account) {
            await logout();
            setLayoutStore({ showAccountSider: false });
          } else {
            connect();
          }
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.1 6.0998C7.7 5.6998 7.1 5.6998 6.7 6.0998C6.3 6.4998 6.3 7.0998 6.7 7.4998L16.6 17.3998C16.8 17.5998 17.05 17.6998 17.3 17.6998C17.55 17.6998 17.8 17.5998 18 17.3998C18.4 16.9998 18.4 16.3998 18 15.9998L8.1 6.0998ZM12.15 16.1998L11.25 17.0998C10.9 17.4498 10.55 17.6998 10.1 17.8498C9.25 18.1998 8.3 18.1998 7.45 17.8498C7 17.6498 6.65 17.3998 6.3 17.0998C5.95 16.7498 5.7 16.3998 5.55 15.9498C5.4 15.5498 5.3 15.0998 5.3 14.6498C5.3 14.1998 5.4 13.7498 5.55 13.3498C5.75 12.8998 6 12.5498 6.3 12.1998L7.2 11.2998C7.6 10.8998 7.6 10.2998 7.2 9.89981C6.8 9.4998 6.2 9.4998 5.8 9.89981L4.9 10.7998C4.4 11.2998 3.95 11.9498 3.7 12.5998C3.45 13.2498 3.3 13.9498 3.3 14.6498C3.3 15.3498 3.45 16.0498 3.7 16.6998C4 17.3998 4.4 17.9998 4.9 18.4998C5.4 18.9998 6.05 19.4498 6.7 19.6998C7.35 19.9498 8.05 20.0998 8.75 20.0998C9.45 20.0998 10.15 19.9498 10.8 19.6998C11.5 19.3998 12.1 18.9998 12.6 18.4998L13.5 17.5998C13.9 17.1998 13.9 16.5998 13.5 16.1998C13.15 15.7998 12.55 15.7998 12.15 16.1998ZM20.25 6.1498C19.95 5.4498 19.55 4.8498 19.05 4.3498C18.55 3.8498 17.9 3.3998 17.25 3.1498C15.95 2.5998 14.45 2.5998 13.1 3.1498C12.4 3.4498 11.8 3.8498 11.3 4.3498L10.4 5.2498C10 5.6498 10 6.2498 10.4 6.64981C10.8 7.04981 11.4 7.04981 11.8 6.64981L12.7 5.7498C13.05 5.3998 13.4 5.1498 13.85 4.9998C14.7 4.6498 15.65 4.6498 16.5 4.9998C16.95 5.1998 17.3 5.4498 17.65 5.7498C18 6.0998 18.25 6.4498 18.4 6.89981C18.55 7.2998 18.65 7.7498 18.65 8.19981C18.65 8.64981 18.55 9.09981 18.4 9.49981C18.2 9.94981 17.95 10.2998 17.65 10.6498L16.75 11.5498C16.35 11.9498 16.35 12.5498 16.75 12.9498C16.95 13.1498 17.2 13.2498 17.45 13.2498C17.7 13.2498 17.95 13.1498 18.15 12.9498L19.05 12.0498C19.55 11.5498 20 10.8998 20.25 10.2498C20.5 9.59981 20.65 8.89981 20.65 8.19981C20.65 7.4998 20.5 6.7998 20.25 6.1498Z"
            fill="#979ABE"
          />
        </svg>
      </Item>
    </StyledSubtractItem>
  );
};

export default memo(SubtractItem);
