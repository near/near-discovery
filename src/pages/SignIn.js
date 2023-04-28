import React from 'react';
import { isValidEmail } from '../utils/generic';
import { useHistory } from 'react-router-dom';

import { findValidKeyPair, handleCreateAccount } from '../utils/auth';
import styled from 'styled-components';
import { toast } from 'sonner'
import { useForm } from 'react-hook-form';
import { getKeys } from '../biometric-ed25519/src'

const SignIn = ({ requestSignInWithWallet }) => {
  const history = useHistory();
  const { register, handleSubmit, setValue } = useForm();


  const onSubmit = handleSubmit(async (data) => {
    if (!data.email) return
    try {
      const [accountId, keyPair] = await getKeys('random-string').then(findValidKeyPair);
      if(accountId) {
        window.localStorage.setItem('fast-auth:account-creation-data', JSON.stringify({
          accountId,
          privateKey: keyPair.toString(),
          isCreated: true
        }));
        history.push('/')
        window.location.reload();
      } else {
        const { publicKey, email } = await handleCreateAccount(null, data.email, true)
        history.push(`/verify-email?publicKey=${publicKey}&email=${email}&isRecovery=true`)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  });

  return (
    <StyledContainer>
      <FormContainer onSubmit={onSubmit}>
        <header>
          <h1>{'Sign In'}</h1>
          <p className='desc'>Use this account to sign in everywhere on NEAR, no password required.</p>
        </header>

        <InputContainer>
          <label htmlFor="email">Email</label>

          <input
            {...register('email', {
              required: 'Please enter a valid email address',
            })}
            onChange={(e) => {
              setValue('email', e.target.value)
              if (!isValidEmail(e.target.value)) return
            }}
            label='Email'
            placeholder='user_name@email.com'
            type="email"
            required
          />
        </InputContainer>
        <StyledButton fullWidth onClick={onSubmit} type="button">
          {/* <IconFingerPrint /> */}
          Continue
        </StyledButton>
        <StyledButton fullWidth onClick={requestSignInWithWallet} type="button">
          {/* <IconFingerPrint /> */}
          Continue with wallet
        </StyledButton>
        <Footer>
          {`By signing in to an account, you agree to the NEAR`} <a href="">terms of service</a> and <a href="">privacy policy</a>
        </Footer>
      </FormContainer>
    </StyledContainer>
  )
}

export default SignIn


const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F2F1EA;
  padding: 0 16px;
`

const FormContainer = styled.form`
  max-width: 450px;
  width: 100%;
  margin: 16px auto;
  background-color: #FFFFFF;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

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
    border: 1px solid #E5E5E5;
    border-radius: 10px;
    font-size: 14px;
    margin-top: 4px;
    min-height: 50px; 
    cursor: text;


    &:focus {
      outline: none;
      border: 1px solid #E5E5E5;
    }
  }

  .subText {
    font-size: 12px;
  }
`

const StyledButton = styled.button`
  // width: 100%;
  padding: 8px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  margin-top: 4px;
  min-height: 40px;
  cursor: pointer;
  background-color: #6BE89E;
  color: #000000;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:focus {
    outline: none;
  }
`

const Footer = styled.div`
  padding: 12px 16px;
  text-align: center;
  font-size: 13px;
  justify-self: flex-end;
  align-self: flex-end;

  'a': {
      color: '#37819F'
  }
`