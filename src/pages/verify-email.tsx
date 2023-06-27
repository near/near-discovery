import { sendSignInLinkToEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { openToast } from '@/components/lib/Toast';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useCurrentComponentStore } from '@/stores/current-component';
import type { NextPageWithLayout } from '@/utils/types';

import { firebaseAuth } from '../utils/firebase';

// TODO refactor: thoroughly test since param handling changed
const VerifyEmailPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const setComponentSrc = useCurrentComponentStore((store) => store.setSrc);

  useEffect(() => {
    setComponentSrc(null);
  }, [setComponentSrc]);

  const handleResendEmail = async () => {
    const accountRequiredButNotThere = !query?.accountId && query.isRecovery !== 'true';
    if (
      accountRequiredButNotThere ||
      typeof query.email !== 'string' ||
      !query.email.length ||
      typeof query.publicKey !== 'string' ||
      !query.publicKey.length
    )
      return;

    try {
      await sendSignInLinkToEmail(firebaseAuth, query.email, {
        url: `${window.location.origin}/auth-callback?publicKey=${query.publicKey}&accountId=${query.accountId}`,
        handleCodeInApp: true,
      });
      openToast({
        type: 'SUCCESS',
        title: 'Email resent successfully!',
      });
    } catch (error: any) {
      console.log(error);

      if (typeof error?.message === 'string') {
        openToast({
          type: 'ERROR',
          title: error.message,
        });
        return;
      }
      openToast({
        type: 'ERROR',
        title: 'Something went wrong',
      });
    }
  };

  return (
    <StyledContainer>
      <FormContainer onSubmit={handleResendEmail}>
        <header>
          <a
            href={query?.isRecovery === 'true' ? '/signin' : '/signup'}
            style={{ textDecoration: 'underline', color: 'black' }}
          >
            <small>Go back</small>
          </a>
          <h1 style={{ marginTop: '12px' }}>Verify your email</h1>
          <p style={{ fontWeight: 600, marginTop: '12px' }}>{query?.email}</p>
        </header>

        <p>Check your inbox to activate your account.</p>

        <Button label="Resend Email" variant="secondary" onClick={handleResendEmail} />
      </FormContainer>
    </StyledContainer>
  );
};

VerifyEmailPage.getLayout = useDefaultLayout;

export default VerifyEmailPage;

const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f1ea;
  padding: 0 16px;
`;

const FormContainer = styled.form`
  max-width: 450px;
  width: 100%;
  margin: 16px auto;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
