import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { flushEvents } from '@/utils/analytics';

import { NotificationButton } from '../NotificationButton';
import { UserDropdownMenu } from './UserDropdownMenu';

const LoginArea = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:12px;
`
export const LoginBox = () => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const { requestAuthentication } = useSignInRedirect();
  function handleSignIn() {
    flushEvents();
    requestAuthentication();
  }

  function handleCreateAccount() {
    flushEvents();
    requestAuthentication(true);
  }

  return (
    <LoginArea>
      {!signedIn && (
        <>
          <Button label="Sign In" variant="secondary" onClick={handleSignIn} />
          <Button label="Create Account" variant="primary" onClick={handleCreateAccount} />
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
};
