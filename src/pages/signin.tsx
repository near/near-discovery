import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';

import { handleCreateAccount } from '../utils/auth';
import { isValidEmail } from '../utils/form-validation';
import EmailProvidersList from '@/components/auth/EmailProvidersList';
import Link from 'next/link';

const SignInPage: NextPageWithLayout = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const formValues = watch();

  const router = useRouter();
  const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);
  const signedIn = useAuthStore((store) => store.signedIn);

  // redirect to home upon signing in
  useEffect(() => {
    if (signedIn) {
      router.push('/');
    }
  }, [router, signedIn]);

  const onSubmit = handleSubmit(async (data) => {
    if (!data.email) return;
    try {
      const { publicKey, email } = await handleCreateAccount(null, data.email, true);
      router.push(`/verify-email?publicKey=${publicKey}&email=${email}&isRecovery=true`);
    } catch (error: any) {
      console.log(error);

      if (typeof error?.message === 'string') {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  });

  return (
    <StyledContainer>
      <FormContainer onSubmit={onSubmit}>
        <header>
          <h2>{'Sign In'}</h2>
          <p className="desc">or <Link href="/signup">create an account</Link></p>
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
          <EmailProvidersList
            handleSelect={(provider) => setValue('email', `${formValues?.email?.split('@')[0]}@${provider}.com`)}
            value={formValues?.email}
          />
        </InputContainer>

        <StyledButton disabled={!formValues?.email} onClick={onSubmit} style={{ marginTop: 40 }} type="button" variant='primary'>
          Continue with email
        </StyledButton>
        <StyledDivider>or</StyledDivider>
        <StyledButton onClick={requestSignInWithWallet} type="button" variant="secondary">
          Continue with wallet
        </StyledButton>
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
  background-color: #F9F9F8;
  padding: 0 16px;
`;

const FormContainer = styled.form`
  max-width: 450px;
  width: 100%;
  margin: 16px auto;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.06);


  header{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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

const StyledButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  margin-top: 4px;
  min-height: 48px;
  cursor: pointer;
  background-color: #6be89e;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background-color: ${({ variant }: { variant: string }) => variant === "primary" ? '#6be89e' : '#161615'};
  color: ${({ variant }: { variant: string }) => variant === "primary" ? '#000000' : '#ffffff'};

  &:focus {
    outline: none;
  }
`;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px 0;

  &::before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
    display: block;
  }

  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
    display: block;
  }
`