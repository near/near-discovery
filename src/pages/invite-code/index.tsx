import React, { useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEthersProviderContext } from '@/data/web3';
import useAccount from '@/hooks/useAccount';
import * as http from '@/utils/http';
import { getAccessToken, insertedAccessKey } from '@/apis';

const StyledInviteCodePage = styled.div<{ logined: boolean; loading: boolean }>`
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
    background: url('./images/bg-invite-code.svg') no-repeat;
    background-size: 100% 100%;
    `}
  }
  .yellow {
    position: absolute;
    width: 319px;
    height: 319px;
    left: 0;
    right: 0;
    pointer-events: none;
  }
  .yellow::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: rgba(235, 244, 121, 0.3);
    filter: blur(10px);
    border-radius: 50%;
    filter: blur(10px);
  }
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
  }
  .blue::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: rgba(24, 104, 178, 0.2);
    border-radius: 50%;
    filter: blur(10px);
  }
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
    margin: 36px 0;
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

const InviteCodePage = () => {
  const router = useRouter();
  const { useConnectWallet } = useEthersProviderContext();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { account } = useAccount();
  const [invited, setInvited] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!account) return;
    try {
      const res = await http.get(`/api/invite/check-address/${account}`);
      if (res.data?.is_activated) {
        await getAccessToken(account);
        window.localStorage.setItem('LOGINED_ACCOUNT', account);
        router.replace('/');
      }
    } catch (error) {
      setInvited(false);
    }
  };

  const proceed = async () => {
    if (!account || !code || loading) return;
    setLoading(true);
    try {
      const res = await http.post(`/api/invite/activate`, {
        address: account,
        code,
      });
      const resJSON = await res.json();

      setLoading(false);
      if (resJSON.data?.is_success) {
        await getAccessToken(account);
        window.localStorage.setItem('LOGINED_ACCOUNT', account);
        router.replace('/');
      }
    } catch (error) {
      setLoading(false);
      setInvited(false);
    }
  };

  const handlerClick = () => {
    if (account) {
      proceed();
    } else {
      connect();
    }
  };

  const logout = () => {
    if (!account || !wallet) return;
    disconnect(wallet);
    window.localStorage.setItem(http.AUTH_TOKENS, '{}');
    window.localStorage.setItem('LOGINED_ACCOUNT', '');
    insertedAccessKey('');
  };

  useEffect(() => {
    check();
  }, [account]);

  return (
    <StyledInviteCodePage logined={!!account} loading={loading}>
      <main>
        <div className="yellow"></div>
        <div className="blue"></div>
        <div className="content">
          {!account && <img src={'/images/eureka-logo.svg'} />}
          <div className="title">
            {!account ? (
              <p>
                Your Universal Entry Point Into <span>L2s</span>{' '}
              </p>
            ) : (
              <p>
                <img src="./images/subtract.svg" style={{ marginRight: '20px' }} />
                Got an invite code?
              </p>
            )}
          </div>
          {account && <p>Eureka is currently in beta. Get an invite code from an existing user to sign up</p>}
          <div>
            {account && (
              <input
                type="text"
                placeholder="invte code"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            )}
          </div>
          <button className="connect-btn" onClick={handlerClick}>
            {account ? 'Proceed' : 'Connect Wallet'}
          </button>
          <p>
            <span className="notice" onClick={logout}>
              {account ? (
                <span className="logout">
                  Log out
                  <img src={'/images/arrow-right.svg'} />
                </span>
              ) : (
                '💡 Invited users only'
              )}
            </span>
          </p>
        </div>
      </main>
    </StyledInviteCodePage>
  );
};

export default memo(InviteCodePage);
