import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { openToast } from '@/components/lib/Toast';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';

import { handleCreateAccount } from '../utils/auth';
import { isValidEmail } from '../utils/form-validation';

const SignInPage: NextPageWithLayout = () => {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);
  const signedIn = useAuthStore((store) => store.signedIn);

  useClearCurrentComponent();

  // redirect to home upon signing in
  useEffect(() => {
    if (signedIn) {
      router.push('/');
    }
  }, [router, signedIn]);

  const onSubmit = handleSubmit(async (data) => {
    if (!data.email) return;
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect');
    try {
      const { publicKey, email } = await handleCreateAccount(null, data.email, true, redirect);
      router.push(
        `/verify-email?publicKey=${publicKey}&email=${email}&isRecovery=true${redirect ? `&redirect=${redirect}` : ''}`,
      );
    } catch (error: any) {
      console.log(error);

      if (typeof error?.message === 'string') {
        openToast({
          type: 'ERROR',
          title: error.message,
        });
      } else {
        openToast({
          type: 'ERROR',
          title: 'Something went wrong',
        });
      }
    }
  });

  return (
    <StyledContainer>
      <FormContainer onSubmit={onSubmit}>
        <header>
          <h1>{'Sign In'}</h1>
          <p className="desc">Use this account to sign in everywhere on NEAR, no password required.</p>
        </header>

        <InputContainer>
          <label htmlFor="email">Email</label>

          <input
            {...register('email', {
              required: 'Please enter a valid email address',
            })}
            onChange={(e) => {
              setValue('email', e.target.value);
              if (!isValidEmail(e.target.value)) return;
            }}
            placeholder="user_name@email.com"
            type="email"
            required
          />
        </InputContainer>

        <Button label="Continue" variant="affirmative" onClick={onSubmit} />
        <Button label="Continue with wallet" variant="primary" onClick={requestSignInWithWallet} />
      </FormContainer>
    </StyledContainer>
  );
};
SignInPage.getLayout = useDefaultLayout;

export default SignInPage;

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

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    font-size: 12px;
    font-weight: 500;
  }

  input {
    padding: 8px 12px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    font-size: 14px;
    margin-top: 4px;
    min-height: 50px;
    cursor: text;

    &:focus {
      outline: none;
      border: 1px solid #e5e5e5;
    }
  }

  .subText {
    font-size: 12px;
  }
`;
