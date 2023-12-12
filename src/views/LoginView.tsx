import React from 'react';

import LoadingIcon from '@/components/Icons/Loading';
import useAuth from '@/hooks/useAuth';

import { bluebg,StyledInviteCodePage, yellowbg } from './InviteCodeView';

export default function LoginView({ logging }: { logging: boolean }) {
  const { connect, connecting } = useAuth();
  return (
    <StyledInviteCodePage $logined={false} $loading={false}>
      <main>
        <div className="yellow">
          <img src={yellowbg} alt="" />
        </div>
        <div className="blue">
          <img src={bluebg} alt="" />
        </div>
        <div className="content">
          <img src="https://assets.dapdap.net/images/logo.png" style={{ height: '60px' }} />
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
            {(connecting || logging) && <LoadingIcon />}
            Connect Wallet
          </button>
          <p>💡 Invited users only</p>
        </div>
      </main>
    </StyledInviteCodePage>
  );
}
