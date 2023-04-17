import { getEmailId, isValidEmail, parseURLParams } from '../utils/generic';

import { MASTER_USER_ID } from '../utils/biometricsAuthUtils';
import React from 'react';
import { createKey } from '@near-js/biometric-ed25519';
import { firebaseAuth } from '../utils/firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const CreateAccount = () => {
  const history = useHistory();
  const [urlParams, setUrlParams] = React.useState(null);
  const [isAccountAvailable, setIsAccountAvailable] = React.useState(null);
  const { register, handleSubmit, watch, setValue, formState } = useForm();
  const formValues = watch();
  const defaultAccountId = getEmailId(formValues?.email || '')

  const checkIsAccountAvailable = async () => {
    try {
      if (!formValues?.accountId) return

      const response = await fetch('https://rpc.testnet.near.org', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": "dontcare",
          "method": "query",
          "params": {
            "request_type": "view_account",
            "finality": "final",
            "account_id": `${formValues?.accountId}.${MASTER_USER_ID}`
          }
        })
      });
      const data = await response.json();
      if (data?.error?.cause?.name == "UNKNOWN_ACCOUNT") {
        return setIsAccountAvailable(true)
      }

      if (data?.result?.code_hash) {
        return setIsAccountAvailable(false)
      }
    } catch (error) {
      c
      console.log(error)
      setIsAccountAvailable(false)
    }
  }


  const onSubmit = handleSubmit(async (data) => {
    if (!data?.accountId || !data.email) return

    try {
      const name = `${data.accountId}.${MASTER_USER_ID}`;
      const key = await createKey(name);
      const publicKey = key.getPublicKey().toString();

      if (!!key) {
        sendSignInLinkToEmail(firebaseAuth, data.email, {
          url: `${window.location.origin}/verify-email?publicKey=${publicKey}&accountId=${name}`,
          handleCodeInApp: true,
        }).then((res) => {
          window.localStorage.setItem('emailForSignIn', data.email);
          history.push('/email-sent')
        })
      }
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  });


  React.useEffect(() => {
    if (!formValues?.accountId) return
    checkIsAccountAvailable()
  }, [formValues?.accountId])

  React.useEffect(() => {
    const params = parseURLParams(window.location.search)
    setUrlParams(params)
  }, [window.location.search])

  return (
    <StyledContainer>
      <FormContainer onSubmit={onSubmit}>
        <header>
          <h1>Create account</h1>
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
              if (!formValues?.accountId || formValues.accountId === defaultAccountId) {
                setValue('accountId', getEmailId(e.target.value))
              }
            }}
            label='Email'
            placeholder='user_name@email.com'
            type="email"
            required
          />
        </InputContainer>


        <InputContainer>
          <label htmlFor="accountId">Account ID</label>
          <input
            // rightAddOn=".testnet"
            {...register('accountId', {
              required: 'Please enter a valid account ID',
            })}
            onChange={(e) => {
              setValue('accountId', e.target.value)

              if (e.target.value == "") {
                setIsAccountAvailable(null)
              }
            }}
            label='Account ID'
            placeholder='user_name.near'
            statusState={isAccountAvailable === null ? 'default' : !!isAccountAvailable ? 'success' : 'error'}
            statusMessage={isAccountAvailable === null ? 'Use a suggested ID or customize your own.' : !!isAccountAvailable ? `${formValues?.accountId}.${MASTER_USER_ID} is available!` : `${formValues?.accountId}.${MASTER_USER_ID} is taken, try something else.`}
          />
          <p className="subText">
            {isAccountAvailable === null ? 'Use a suggested ID or customize your own.' : !!isAccountAvailable ? `${formValues?.accountId}.${MASTER_USER_ID} is available!` : `${formValues?.accountId}.${MASTER_USER_ID} is taken, try something else.`}
          </p>

        </InputContainer>
        <StyledButton fullWidth onClick={onSubmit} type="button">
          {/* <IconFingerPrint /> */}
          Continue with Fingerprint
        </StyledButton>
        <Footer>
          By creating an account, you agree to the NEAR <a href="">terms of service</a> and <a href="">privacy policy</a>
        </Footer>
      </FormContainer>
    </StyledContainer>
  )
}

export default CreateAccount


const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - 66px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F2F1EA;
`

const FormContainer = styled.form`
  max-width: 450px;
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
  width: 100%;
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