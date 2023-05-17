import { sendSignInLinkToEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'sonner';
import styled from 'styled-components';

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
  }, []);

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
        url: `${window.location.origin}/auth-callback?publicKey=${query.publicKey}&accountId=${query.accountId}${
          query?.redirect ? `&redirect=${query.redirect}` : ''
        }`,
        handleCodeInApp: true,
      });
      toast.success('Email resent successfully!');
    } catch (error: any) {
      console.log(error);

      if (typeof error?.message === 'string') {
        toast.error(error.message);
        return;
      }
      toast.error('Something went wrong');
    }
  };

  const redirect = query?.redirect ? `?redirect=${query.redirect}` : '';
  return (
    <StyledContainer>
      <FormContainer onSubmit={handleResendEmail}>
        <header>
          <a
            href={query?.isRecovery === 'true' ? `/signin${redirect}` : `/signup${redirect}`}
            style={{ textDecoration: 'underline', color: 'black' }}
          >
            <small>Go back</small>
          </a>
          <h1 style={{ marginTop: '12px' }}>Verify your email</h1>
          <p style={{ fontWeight: 600, marginTop: '12px' }}>{query?.email}</p>
        </header>

        <p>Check your inbox to activate your account.</p>

        <StyledButton onClick={handleResendEmail} type="button">
          Resend Email
        </StyledButton>
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
const StyledButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  margin-top: 4px;
  min-height: 40px;
  cursor: pointer;
  background-color: #6be89e;
  color: #000000;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:focus {
    outline: none;
  }
`;
