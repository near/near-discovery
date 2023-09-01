import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
      fill-rule="evenodd"
      clip-rule="evenodd"
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
  <img src="https://ipfs.near.social/ipfs/bafkreiehsmxrfkil52ow2o3afcryjfpm7eovsrrjgb75eupx2vuhkiajq4"></img>
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
`;

const LoginArea = styled.div`
  display: none;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  position: fixed;
  top: 28px;
  right: 30px;
  z-index: 10;
  @media (min-width: 901px) {
    display: flex;
  }
`;

export const LoginBox = () => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const { requestAuthentication } = useSignInRedirect();

  const { useConnectWallet } = useEthersProviderContext();

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const router = useRouter();

  const isHome = router.pathname === '/';

  function isActive(name: string) {
    let paths: string[] = [];
    if (name == 'near') {
      paths = ['ref-home', 'xBox', 'near', 'rainbow-bridge'];
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
      paths = ['base', 'Base.BaseDex'];
    } else if (name === 'mantle') {
      paths = ['mantle', 'Mantle.Swap'];
    }
    const r = router.asPath.split('/').pop() || '';
    return paths.some((p) => r.includes(p));
  }

  const isZKEVMActive = isActive('polygon-zkevm') || isActive('base') || isActive('mantle');

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
        {zkevmIcon}

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
        {baseIcon}

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
        {mantleIcon}

        <span>Connect</span>
      </MantleSignInButton>
    </LoginArea>
  );

  useEffect(() => {
    if (!isZKEVMActive) {
      onboard.state.actions.updateAccountCenter({
        position: 'topRight',
        enabled: false,
        minimal: false,
      });
    } else {
      onboard.state.actions.updateAccountCenter({
        position: 'topRight',
        enabled: true,
        minimal: false,
      });
    }
  }, [isZKEVMActive]);

  return isActive('near')
    ? NearLoginArea
    : isActive('polygon-zkevm')
    ? ZKEVMloginArea
    : isActive('base')
    ? BaseloginArea
    : isActive('mantle')
    ? MantleloginArea
    : null;
};
