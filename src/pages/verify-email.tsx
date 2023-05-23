import { sendSignInLinkToEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

import { firebaseAuth } from '../utils/firebase';
import IconEmailLogin from '@/assets/svgs/IconEmailLogin';
import IconEmailSignup from '@/assets/svgs/IconEmailSignup';

// TODO refactor: thoroughly test since param handling changed
const VerifyEmailPage: NextPageWithLayout = () => {
  const { query } = useRouter();

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

  return (
    <StyledContainer>
      <FormContainer onSubmit={handleResendEmail}>
        <header>
          {query.isRecovery ? <IconEmailLogin /> : <IconEmailSignup />}
          <h2 style={{ marginTop: '12px' }}>{query.isRecovery ? 'Check Your Email' : 'Verify your email'}</h2>
          <h5 className='email' style={{ fontWeight: 600, marginTop: '12px' }}>{query?.email}</h5>
        </header>
        {!!query.isRecovery && <p>We sent you instructions to finish signing in.</p>}
        {!query.isRecovery && <p>Check your inbox to activate your account.</p>}
        <StyledButton onClick={handleResendEmail} type="button">
          Resend
        </StyledButton>
        <div>
          Scan to Sign In
        </div>
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
  background-color: #F9F9F8;
  padding: 0 16px;
`;

const FormContainer = styled.form`
  max-width: 450px;
  width: 100%;
  margin: 16px auto;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.06);

  * {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  header{
    .email{
      color: #604CC8;
    }
  }

  p{
    color: #706F6C;
  }
`;

const StyledButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  margin-top: 4px;
  min-height: 48px;
  cursor: pointer;
  background-color: #161615;
  color: #FFFFFF;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:focus {
    outline: none;
  }
`;
