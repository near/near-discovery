import { Button } from '@near-pagoda/ui';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { NearContext } from '@/components/WalletSelector';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { signInContractId } from '@/utils/config';
import signedOutRoute from '@/utils/route/signedOutRoute';
import type { NextPageWithLayout } from '@/utils/types';

import { isValidEmail } from '../utils/form-validation';

const SignInPage: NextPageWithLayout = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { signedAccountId, wallet } = useContext(NearContext);
  const searchParams = useSearchParams();
  const { redirect } = useSignInRedirect();

  useEffect(() => {
    if (signedAccountId) {
      redirect();
    }
  }, [redirect, signedAccountId]);

  useEffect(() => {
    if (wallet?.selector && searchParams.get('account_id') && searchParams.get('public_key')) {
      wallet.selector
        .then((selector: any) => {
          const walletSelectorState = selector.store.getState();

          if (walletSelectorState.selectedWalletId === 'fast-auth-wallet') {
            return selector.wallet('fast-auth-wallet');
          }
        })
        .then((fastAuthWallet: any) => {
          if (fastAuthWallet) {
            fastAuthWallet.signIn({
              contractId: signInContractId,
            });
          }
        });
    }
  }, [searchParams, wallet]);

  useClearCurrentComponent();

  const onSubmit = handleSubmit(async (data) => {
    if (!data.email || !wallet) return;

    wallet.selector
      .then((selector: any) => selector.wallet('fast-auth-wallet'))
      .then((fastAuthWallet: any) =>
        fastAuthWallet.signIn({
          contractId: signInContractId,
          email: data.email,
          isRecovery: true,
        }),
      );
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

        <Button type="submit" label="Continue" variant="affirmative" onClick={onSubmit} />
        <Button type="button" label="Continue with wallet" variant="primary" onClick={wallet?.signIn} />
      </FormContainer>
    </StyledContainer>
  );
};
SignInPage.getLayout = useDefaultLayout;

export default signedOutRoute(SignInPage);

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
