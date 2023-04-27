import { ACCOUNT_ID_SUFFIX, handleCreateAccount } from '../utils/auth';
import { NetworkId, networks } from '../data/widgets';
import { accountAddressPatternNoSubaccount, emailPattern, getEmailId, isValidEmail, parseURLParams } from '../utils/generic';

import React from "react";
import styled from "styled-components";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { NetworkId } from "../data/widgets";

const ErrorText = styled.p`
  color: hsla(8, 100%, 33%, 1);
`;

const CreateAccount = () => {
  const history = useHistory();
  const [urlParams, setUrlParams] = React.useState(null);
  const [isAccountAvailable, setIsAccountAvailable] = React.useState(null);
  const [isAccountValid, setIsAccountValid] = React.useState(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, touchedFields },
    clearErrors,
  } = useForm();
  const formValues = watch();

  const checkIsAccountAvailable = async () => {
    // set to null to show loading
    setIsAccountAvailable(null);
    try {
      if (!formValues?.username) return;

      const response = await fetch(networks[NetworkId].nodeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "dontcare",
          method: "query",
          params: {
            request_type: "view_account",
            finality: "final",
            account_id: `${formValues?.username}.${ACCOUNT_ID_SUFFIX}`,
          },
        }),
      });
      const data = await response.json();
      if (data?.error?.cause?.name == "UNKNOWN_ACCOUNT") {
        return setIsAccountAvailable(true);
      }

      if (data?.result?.code_hash) {
        return setIsAccountAvailable(false);
      }
    } catch (error) {
      console.log(error);
      setIsAccountAvailable(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!data?.username || !data.email) return;
    try {
      const fullAccountId = `${data.username}.${ACCOUNT_ID_SUFFIX}`;
      const { publicKey, accountId, email } = await handleCreateAccount(
        fullAccountId,
        data.email
      );
      history.push(
        `/verify-email?publicKey=${encodeURIComponent(
          publicKey
        )}&accountId=${encodeURIComponent(
          accountId
        )}&email=${encodeURIComponent(email)}`
      );
    } catch (error) {
      toast.error(error.message);
    }
  });

  React.useEffect(() => {
    clearErrors("username");
    if (!formValues?.username?.length) {
      setIsAccountValid(null);
      setIsAccountAvailable(null);
      return;
    }

    const isValid = accountAddressPatternNoSubaccount.test(
      formValues?.username
    );
    setIsAccountValid(isValid);
    if (!isValid) return;

    checkIsAccountAvailable();
  }, [formValues?.username]);

  React.useEffect(() => {
    const params = parseURLParams(window.location.search);
    setUrlParams(params);
  }, [window.location.search]);

  // status message, doesn't need to be overoptimized with memoization
  let accountStatusMessage = "";
  let accountStatusState; // "error" or "success"
  if (!formValues?.username?.length) {
    accountStatusMessage = "Use a suggested ID or customize your own.";
  } else if (!isAccountValid) {
    accountStatusMessage =
      "Accounts must be lowercase and may contain - or _, but they may not begin or end with a special character or have two consecutive special characters.";
    accountStatusState = "error";
  } else {
    // valid account is entered, handle availability
    if (isAccountAvailable === null) {
      accountStatusMessage = "Checking availability...";
    } else if (isAccountAvailable) {
      accountStatusMessage = `${formValues?.username}.${ACCOUNT_ID_SUFFIX} is available!`;
      accountStatusState = "success";
    } else {
      accountStatusMessage = `${formValues?.username}.${ACCOUNT_ID_SUFFIX} is taken, try something else.`;
      accountStatusState = "error";
    }
  }

  return (
    <StyledContainer>
      <FormContainer onSubmit={onSubmit}>
        <header>
          <h1>Create account</h1>
          <p className="desc">
            Use this account to sign in everywhere on NEAR, no password
            required.
          </p>
        </header>

        <InputContainer>
          <label htmlFor="email">Email</label>

          <input
            {...register("email", {
              required: "Please enter a valid email address",
              pattern: {
                value: emailPattern,
                message: "Please enter a valid email address",
              },
            })}
            onChange={(e) => {
              clearErrors("email");
              setValue("email", e.target.value);
              if (!isValidEmail(e.target.value)) return;
              if (!formValues?.username || !touchedFields?.username) {
                setValue("username", getEmailId(e.target.value));
              }
            }}
            label="Email"
            placeholder="user_name@email.com"
            type="email"
            required
          />
          {errors.email && (
            <ErrorText role="alert">{errors.email?.message}</ErrorText>
          )}
        </InputContainer>

        <InputContainer>
          <label htmlFor="username">Account ID</label>
          <input
            autoComplete="webauthn username"
            {...register("username", {
              required: "Please enter a valid account ID",
              pattern: {
                value: accountAddressPatternNoSubaccount,
                message: "Please enter a valid account ID",
              },
              validate: (v) => {
                if (!isAccountAvailable) {
                  return "Please enter a valid account ID";
                }
              },
            })}
            label="Account ID"
            placeholder="user_name.near"
          />
          <p className={`subText`}>
            <span className={accountStatusState || ""}>
              {accountStatusMessage}
            </span>
          </p>
          {errors.username && (
            <ErrorText role="alert">{errors.username?.message}</ErrorText>
          )}
        </InputContainer>
        <StyledButton fullWidth onClick={onSubmit} type="button">
          Continue
        </StyledButton>
        <Footer>
          By creating an account, you agree to the NEAR{" "}
          <a href="">terms of service</a> and <a href="">privacy policy</a>
        </Footer>
      </FormContainer>
    </StyledContainer>
  );
};

export default CreateAccount;

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
    font-size: 0.75rem;
    padding: 8px 0;

    .error {
      color: hsla(8, 100%, 33%, 1);
    }

    .success {
      color: hsla(155, 66%, 32%, 1);
    }
  }
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

const Footer = styled.div`
  padding: 12px 16px;
  text-align: center;
  font-size: 13px;
  justify-self: flex-end;
  align-self: flex-end;

  "a": {
    color: "#37819F";
  }
`;
