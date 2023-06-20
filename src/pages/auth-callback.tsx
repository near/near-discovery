import type { User } from 'firebase/auth';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import * as nearAPI from 'near-api-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { openToast } from '@/components/lib/Toast';
import { useDefaultLayout } from '@/hooks/useLayout';
import { network, signInContractId } from '@/utils/config';
import type { NextPageWithLayout } from '@/utils/types';

import { firebaseAuth } from '../utils/firebase';

const AuthCallbackPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState('Loading...');

  useEffect(() => {
    if (!router) {
      return;
    }

    const locationUrl = window.location.href;

    if (isSignInWithEmailLink(firebaseAuth, locationUrl)) {
      const url = new URL(locationUrl);
      const searchParams = new URLSearchParams(url.search);
      const accountId = searchParams.get('accountId');
      const publicKey = searchParams.get('publicKey');
      const isRecovery = searchParams.get('isRecovery') === 'true';
      const redirect = searchParams.get('redirect');

      // TODO: consider passing email in the callback url
      let email = window.localStorage.getItem('emailForSignIn');

      while (!email) {
        // TODO refactor: review
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:

        // TODO: replace window.prompt with regular form with one input
        email = window.prompt('Please provide your email for confirmation');
      }

      setStatusMessage('Verifying email...');

      // TODO: refactor this function, introduce early return pattern and cleanup async/await
      signInWithEmailLink(firebaseAuth, email, window.location.href)
        .then(async (result) => {
          window.localStorage.removeItem('emailForSignIn');

          const limitedAccessKey = nearAPI.KeyPair.fromRandom('ED25519');

          // TODO refactor: remove weird typing here, it is a temporary hack to get around
          // a TypeScript error where the defined type does not match the actual
          // type returned by the function
          const user: User & { accessToken?: string } = result.user;
          if (!!user.emailVerified) {
            setStatusMessage(isRecovery ? 'Recovering account...' : 'Creating account...');

            // TODO: Call MPC Service with accountId, publicKey,  and oauthToken to create account
            const data = {
              ...(accountId && accountId.includes('.') ? { near_account_id: accountId } : {}),
              create_account_options: {
                full_access_keys: [publicKey],
                limited_access_keys: [
                  {
                    public_key: limitedAccessKey.getPublicKey().toString(),
                    receiver_id: signInContractId,
                    allowance: '250000000000000',
                    method_names: '',
                  },
                ],
              },
              oidc_token: user.accessToken,
            };

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const options = {
              method: 'POST',
              mode: 'cors' as const,
              body: JSON.stringify(data),
              headers,
            };

            await fetch(`${network.fastAuth.mpcRecoveryUrl}/${isRecovery ? 'add_key' : 'new_account'}`, options).then(
              async (response) => {
                if (!response.ok) {
                  console.log(response);
                  throw new Error('Network response was not ok');
                }
                setStatusMessage(isRecovery ? 'Account recovered successfully!' : 'Account created successfully!');
                const accountCreationData = JSON.parse(
                  window.localStorage.getItem('fast-auth:account-creation-data') || JSON.stringify({}),
                );
                const res = await response.json();
                const accId = accountCreationData.accountId || res.near_account_id;
                // TODO: Check if account ID matches the one from email
                if (!accId) {
                  throw 'Could not find account creation data';
                }

                window.localStorage.setItem(
                  'fast-auth:account-creation-data',
                  JSON.stringify({
                    ...accountCreationData,
                    limitedAccessKey: limitedAccessKey.toString(),
                    accountId: accId,
                    isCreated: true,
                  }),
                );

                setStatusMessage('Redirecting to app...');
                if (redirect) {
                  window.location.href = redirect;
                } else {
                  window.location.href = '/';
                }
              },
            );
          }
        })
        .catch((error) => {
          console.log(error);
          const errorMessages: Record<string, string> = {
            'auth/expired-action-code': 'Link expired, please try again.',
            'auth/invalid-action-code': 'Link expired, please try again.',
            'auth/invalid-email': 'Invalid email address.',
            'auth/user-disabled': 'User disabled',
            'auth/missing-email': 'No email found, please try again.',
          };
          const message = errorMessages[error.code] || error.message;
          router.push('/signup');
          openToast({
            type: 'ERROR',
            title: message,
          });
        });
    } else {
      router.push('/signup');
    }
  }, []);

  return <StyledStatusMessage>{statusMessage}</StyledStatusMessage>;
};

AuthCallbackPage.getLayout = useDefaultLayout;

export default AuthCallbackPage;

const StyledStatusMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
`;
