import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { inviteCodeActivate } from '@/apis';
import useAuth from '@/hooks/useAuth';
import LoadingIcon from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import { setCookie } from 'cookies-next';

export const yellowbg =
  'https://assets.dapdap.net/images/bafkreicy6iwoxezg764uhfezusxpc6xd7r3s3hg2nnjdcgt5ktazdnsyje.svg';
export const bluebg =
  'https://assets.dapdap.net/images/bafkreicqa3b3urjhrrc2xt3kgnyhfuntagepjj7zfnley74u6gjqfmjm44.svg';

export const StyledInviteCodePage = styled.div<{ $logined: boolean; $loading: boolean }>`
  font-family: Gantari;
  background-color: #000;
  height: 100vh;
  width: 100vw;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  main {
    position: relative;
    font-size: 16px;
    text-align: center;
    ${(props) =>
      props.$logined
        ? ''
        : `
    background: url('/images/bg-invite-code.svg') no-repeat;
    background-size: 100% 100%;
    `}
  }
  .yellow {
    position: absolute;
    width: 228px;
    height: 228px;
    left: 100px;
    top: 80px;
    border-radius: 228px;
    opacity: 0.6;
    background: #ebf479;
    filter: blur(100px);
  }
  .content {
    position: relative;
  }
  .blue {
    position: absolute;
    width: 319px;
    height: 319px;
    right: -60px;
    bottom: -90px;
    border-radius: 319px;
    opacity: 0.6;
    background: #1868b2;
    filter: blur(100px);
  }
  .title {
    display: flex;
    gap: 22px;
    justify-content: center;
    font-size: 42px;
    font-weight: 700;
    margin-top: 75px;
    margin-bottom: ${(props) => (props.$logined ? '16px' : '180px')};
    span {
      color: #ebf479;
    }
  }
  .desc {
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 161.2%;
  }
  input {
    height: 46px;
    width: 272px;
    border: 1px solid rgba(235, 244, 121, 0.3);
    outline: none;
    border-radius: 10px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-weight: 500;
    margin: 36px 0 0px;
    caret-color: #ebf479;
    &::placeholder {
      color: #5e617e;
    }
  }
  .connect-btn {
    background-color: #ebf479;
    height: 46px;
    width: 272px;
    border: none;
    outline: none;
    border-radius: 10px;
    font-weight: 500;
    cursor: ${(props) => (props.$loading ? 'not-allowed' : 'pointer')};
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin: 38px auto 16px;

    &:disabled {
      opacity: 0.5;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .notice {
    display: inline-block;
    color: #979abe;
    font-size: 16px;
    font-weight: 500;
    cursor: ${(props) => (props.$logined ? 'pointer' : 'default')};
  }
  .logout {
    display: flex;
    img {
      margin-left: 4px;
    }
  }
`;
const ErrorTips = styled.div`
  color: #ff64b8;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 30px;
`;

export default function InviteCodeView() {
  const { account } = useAccount();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { logging, logout } = useAuth();
  const router = useRouter();
  const [errorTips, setErrorTips] = useState<string>('');

  const proceed = async () => {
    if (!account || !code || loading) return;
    setLoading(true);
    try {
      const { isSuccess, errorMsg } = await inviteCodeActivate(account, code);
      setLoading(false);
      if (!isSuccess) {
        setErrorTips(errorMsg);
      } else {
        setCookie('AUTHED_ACCOUNT', account);
        router.replace('/landing');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handlerClick = () => {
    proceed();
  };

  return (
    <StyledInviteCodePage $logined={!!account} $loading={loading || logging}>
      <main>
        <div className="yellow"></div>
        <div className="blue"></div>
        <div className="content">
          <div className="title">
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="50" viewBox="0 0 53 50" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M52.381 26.5226C52.381 25.6187 52.1238 24.7334 51.6393 23.9702C51.304 23.4422 50.868 22.9854 50.3562 22.6259C49.8443 22.2664 49.2667 22.0113 48.6562 21.8751C48.0457 21.7389 47.4144 21.7243 46.7983 21.8321C46.1822 21.94 45.5934 22.1681 45.0655 22.5036L26.1405 34.5238L7.32143 22.525C6.60162 22.0662 5.77171 21.8093 4.91857 21.7812C4.06544 21.7531 3.22043 21.9549 2.47201 22.3654C1.72358 22.7758 1.09925 23.38 0.664361 24.1145C0.229471 24.849 1.17421e-05 25.6869 0 26.5405V42.8571C0 44.7515 0.752549 46.5684 2.09209 47.9079C3.43164 49.2475 5.24845 50 7.14286 50H45.2381C47.1325 50 48.9493 49.2475 50.2889 47.9079C51.6284 46.5684 52.381 44.7515 52.381 42.8571V26.5226ZM43.146 2.09209C41.8065 0.752549 39.9896 0 38.0952 0H14.2857C12.3913 0 10.5745 0.752549 9.23495 2.09209C7.89541 3.43164 7.14286 5.24845 7.14286 7.14286V19.0476L26.2298 30.9524L45.2381 19.0476V7.14286C45.2381 5.24845 44.4855 3.43164 43.146 2.09209ZM26.1905 21.4296C26.7449 21.4296 27.2767 21.2105 27.6703 20.8201V20.8213L33.0941 15.4285L33.181 15.3392C34.0572 14.424 34.5391 13.2014 34.5229 11.9345C34.5066 10.6676 33.9935 9.45774 33.0941 8.56537C32.1759 7.65497 30.9353 7.14416 29.6423 7.14416C28.3493 7.14416 27.1087 7.65497 26.1905 8.56537C25.2724 7.65497 24.0317 7.14416 22.7387 7.14416C21.4457 7.14416 20.2051 7.65497 19.287 8.56537C18.3854 9.45966 17.872 10.6728 17.8577 11.9426C17.8435 13.2124 18.3295 14.4368 19.2108 15.3511L19.287 15.4273L24.7108 20.8201C25.1043 21.2105 25.6362 21.4296 26.1905 21.4296Z"
                fill="url(#paint0_linear_73_4432)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_73_4432"
                  x1="9.16822e-08"
                  y1="49.7619"
                  x2="52.381"
                  y2="31.4286"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#62FFF6" />
                  <stop offset="0.520833" stop-color="#B479FF" />
                  <stop offset="1" stop-color="#FFC289" />
                </linearGradient>
              </defs>
            </svg>
            <p>Got an invite code?</p>
          </div>
          <p className="desc">Dapdap is currently in beta. Get an invite code from an existing user to sign up</p>
          <div>
            <input
              type="text"
              placeholder="invte code"
              onChange={(e) => {
                setCode(e.target.value);
                setErrorTips('');
              }}
            />
            {errorTips && <ErrorTips>{errorTips}</ErrorTips>}
          </div>
          <button className="connect-btn" onClick={handlerClick} disabled={!code}>
            {loading && <LoadingIcon />}
            Proceed
          </button>
          <p>
            <span className="notice" onClick={logout}>
              <span className="logout">
                Log out
                <img src={'/images/arrow-right.svg'} />
              </span>
            </span>
          </p>
        </div>
      </main>
    </StyledInviteCodePage>
  );
}
