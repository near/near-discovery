import React from 'react';
import useAuth from '@/hooks/useAuth';
import LoadingIcon from '@/components/Icons/Loading';
import { StyledInviteCodePage, yellowbg, bluebg } from './InviteCodeView';

export default function LoginView() {
  const { connect, connecting } = useAuth();
  return (
    <StyledInviteCodePage logined={false} loading={false}>
      <main>
        <div className="yellow">
          <img src={yellowbg} alt="" />
        </div>
        <div className="blue">
          <img src={bluebg} alt="" />
        </div>
        <div className="content">
          <img src={'/images/eureka-logo.svg'} />
          <div className="title">
            <p>
              Your Universal Entry Point Into <span>L2s</span>{' '}
            </p>
          </div>
          <button
            className="connect-btn"
            onClick={() => {
              connect();
            }}
            disabled={connecting}
          >
            {connecting && <LoadingIcon />}
            Connect Wallet
          </button>
          <p>💡 Invited users only</p>
        </div>
      </main>
    </StyledInviteCodePage>
  );
}
