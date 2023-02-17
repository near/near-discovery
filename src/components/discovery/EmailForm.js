import React, { useState } from "react";
import ArrowIconHeavy from "../../media/ArrowIconHeavy.js";
import styled from "styled-components";

const StyledInputForm = styled.form`
  position: relative;
  max-width: 520px;

  input {
    font-size: 16px;
    width: 100%;
    outline: none;
    border-radius: 100px;
    border: 0;
    padding: 12px 25px;
    box-shadow: 0px 0px 20px 0px #6b6ef940;

    ::placeholder {
      color: #555555;
    }

    @media (min-width: 751px) {
      padding-right: 244px;
    }
  }

  button {
    height: 100%;
    border: 0;
    border-radius: 100px;
    background-color: black;
    color: white;
    padding: 12px 25px;
    transition: background-color 0.2s;
    font-size: 16px;

    @media (max-width: 750px) {
      width: 100%;
      margin-top: 20px;
    }

    @media (min-width: 751px) {
      position: absolute;
      right: 0;
      top: 0;
    }

    :hover {
      background-color: #282828;
    }

    svg {
      margin-left: 5px;
      path {
        fill: white;
      }
    }
  }
  .form-error {
    position: absolute;
    bottom: -30px;
    left: 0;
    color: #ff3232;
  }
`;

export default function EmailForm() {
  const [error, setError] = useState(false);

  function validateEmail(email) {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <StyledInputForm
      action="https://pagoda.us14.list-manage.com/subscribe/post?u=9a67f4eac197159cd85f8f6b6&id=379472243f&f_id=001988e0f0"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="_self"
      onChange={() => setError(false)}
      onSubmit={(e) => {
        if (
          !e.target[0].value.length > 0 ||
          !validateEmail(e.target[0].value)
        ) {
          e.preventDefault();
          setError(true);
        }
      }}
    >
      <input
        type="email"
        name="EMAIL"
        id="mce-EMAIL"
        placeholder="Enter email address"
        autoCapitalize="none"
      />

      {/*real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
        <input
          type="text"
          name="b_9a67f4eac197159cd85f8f6b6_379472243f"
          tabIndex="-1"
        />
      </div>

      <button
        type="submit"
        value="Subscribe"
        name="subscribe"
        id="mc-embedded-subscribe"
      >
        Register for Early Access
        <ArrowIconHeavy />
      </button>
      {error && (
        <div className="form-error">Please enter a valid email address</div>
      )}
    </StyledInputForm>
  );
}
