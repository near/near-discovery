import { KeyPair } from 'near-api-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';
import type { NextPageWithLayout } from '@/utils/types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 50%;
`;

const PrivateText = styled.div`
  opacity: 0.3;
  font-size: 12px;
  overflow-wrap: anywhere;
  cursor: pointer;
`;

const FadeIn = styled.div`
  animation: fadeIn 5s;
`;

const AddKey: NextPageWithLayout = () => {
  const [credentials, setCreds] = useState({ publicKey: '', secretKey: '' });
  const [wallet, setWallet] = useState(undefined as any);
  const [textCopied, setCopiedText] = useState(false);
  const [nonFastAuthAlertDisplayed, setDisplayedNonFastAuthAlert] = useState(false);
  const { requestAuthentication } = useSignInRedirect();
  const authStore = useAuthStore();
  const router = useRouter();
  const near = useVmStore((store) => store.near);

  useEffect(() => {
    if (nonFastAuthAlertDisplayed) {
      router.push('/');
    }
  }, [nonFastAuthAlertDisplayed, router]);

  useEffect(() => {
    async function restrictToFastAuthUsers() {
      if (!near || !authStore.account.accountId) return;
      const wallet = await (await near.selector).wallet();
      setWallet(wallet);
      if (!nonFastAuthAlertDisplayed && !wallet.signAndSendDelegateAction) {
        //TODO implement this as a modal, not an alert.
        alert('This is for FastAuth accounts only: show error message modal with link to redirect elsewhere');
        setDisplayedNonFastAuthAlert(true);
      }
    }
    restrictToFastAuthUsers();
  }, [authStore.account, near, nonFastAuthAlertDisplayed]);

  function handleGenerateKey() {
    const { account } = authStore;
    if (!account || !account.accountId) {
      requestAuthentication(false);
    } else {
      generateKey();
    }
  }

  useEffect(() => {
    const { publicKey, secretKey } = credentials;
    if (!!publicKey && !!secretKey) {
      try {
        requestAddKey();
      } catch (e) {
        console.error(e);
      }
    }

    function requestAddKey() {
      if (!wallet) throw Error('wallet not defined');
      wallet.signAndSendTransaction({
        receiverId: authStore.account.accountId,
        actions: [
          {
            type: 'AddKey',
            params: {
              publicKey: publicKey,
              accessKey: {
                permission: 'FullAccess',
              },
            },
          },
        ],
      });
    }
  }, [authStore, credentials, wallet]);

  const generateKey = () => {
    const keyPair = KeyPair.fromRandom('ed25519');
    const publicKey = keyPair.getPublicKey().toString();
    const secretKey = keyPair.toString();
    setCreds({ publicKey, secretKey });
  };

  const copy = () => {
    const privateText = document.querySelector('#private');
    if (!privateText) {
      //TODO: this error should be unlikely, but how might we handle this in a better way?
      alert('failed to copy the key');
      return;
    }

    privateText.textContent && navigator.clipboard.writeText(privateText.textContent);
    setCopiedText(true);
  };

  return (
    <Wrapper className="gateway-page-container">
      <div
        style={{
          width: 480,
          border: '1px solid #ccc',
          padding: 24,
          paddingTop: 16,
          borderRadius: 24,
          margin: '20% auto 0',
        }}
      >
        {credentials.publicKey ? (
          <div>
            <ol>
              Just a couple steps remain:
              <li>
                The private key below is sensitve like a password, copy it and then...
                <PrivateText id="private" onClick={copy}>
                  {credentials.secretKey}
                  <i className="ph ph-copy"></i>
                  {textCopied && <FadeIn>Copied!</FadeIn>}
                </PrivateText>
              </li>
              <li>
                On&nbsp;
                <a href="https://wallet.bitte.ai/account/connect" target="_blank">
                  Bitte Wallet&apos;s Import Page
                </a>
                , paste the text below into the <b>Private Key</b> section
              </li>
            </ol>
          </div>
        ) : (
          <>
            <h2>Export account</h2>
            <p>In order to export your account to a new wallet, you need to</p>
            <ol>
              <li>Use the button below to create a new full access key</li>
              <li>Review & Confirm the requested transaction</li>
              <li>Then we will guide you to copy & paste into Bitte Wallet&apos;s Import Account flow</li>
            </ol>
            <button
              disabled={authStore.account && authStore.account.accountId == null}
              onClick={handleGenerateKey}
              className="btn btn-dark btn-lg"
            >
              Create new access key
            </button>
          </>
        )}
      </div>
    </Wrapper>
  );
};

AddKey.getLayout = useDefaultLayout;

export default AddKey;
