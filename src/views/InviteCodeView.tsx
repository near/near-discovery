import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { inviteCodeActivate } from '@/apis';
import useAuth from '@/hooks/useAuth';
import LoadingIcon from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import { setCookie } from 'cookies-next';

export const yellowbg = 'https://ipfs.near.social/ipfs/bafkreicy6iwoxezg764uhfezusxpc6xd7r3s3hg2nnjdcgt5ktazdnsyje';
export const bluebg = 'https://ipfs.near.social/ipfs/bafkreicqa3b3urjhrrc2xt3kgnyhfuntagepjj7zfnley74u6gjqfmjm44';

export const StyledInviteCodePage = styled.div<{ logined: boolean; loading: boolean }>`
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
      props.logined
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
    left: 0;
    right: 0;
    pointer-events: none;
    img {
      width: 165%;
      height: 165%;
      position: absolute;
      top: -30%;
      left: -25%;
    }
  }
  /* .yellow::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: rgba(235, 244, 121, 0.2);
    filter: blur(10px);
    border-radius: 50%;
    filter: blur(10px);
  } */
  .content {
    position: relative;
  }
  .blue {
    position: absolute;
    width: 319px;
    height: 319px;
    right: 0;
    bottom: 0;
    pointer-events: none;
    img {
      width: 160%;
      height: 160%;
      position: absolute;
      right: -38%;
      bottom: -36%;
    }
  }
  /* .blue::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: rgba(24, 104, 178, 0.2);
    border-radius: 50%;
    filter: blur(10px);
  } */
  .title {
    font-size: 42px;
    font-weight: 700;
    margin-top: 75px;
    margin-bottom: ${(props) => (props.logined ? '16px' : '180px')};
    span {
      color: #ebf479;
    }
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
    margin: 36px 0 10px;
    caret-color: #ebf479;
    ::placeholder {
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
    cursor: ${(props) => (props.loading ? 'not-allowed' : 'pointer')};
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin: 0 auto 10px;
  }
  .notice {
    display: inline-block;
    color: #979abe;
    font-size: 16px;
    margin-top: 20px;
    font-weight: 500;
    cursor: ${(props) => (props.logined ? 'pointer' : 'default')};
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
  const searchParams = useSearchParams();
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
        router.replace(searchParams.get('source') || '/');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handlerClick = () => {
    proceed();
  };

  return (
    <StyledInviteCodePage logined={!!account} loading={loading || logging}>
      <main>
        <div className="yellow">
          <img src={yellowbg} alt="" />
        </div>
        <div className="blue">
          <img src={bluebg} alt="" />
        </div>
        <div className="content">
          {!account && <img src={'/images/eureka-logo.svg'} />}
          <div className="title">
            <p>
              <img src="./images/subtract.svg" style={{ marginRight: '20px' }} />
              Got an invite code?
            </p>
          </div>
          <p>Eureka is currently in beta. Get an invite code from an existing user to sign up</p>
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
