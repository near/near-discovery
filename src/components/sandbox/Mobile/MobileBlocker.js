import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  z-index: 95;
  width: 100%;
  height: 100%;
  background: #fff;
  display: none;
  top: 40px;

  h4 {
    color: #1b1b18;
    font-weight: 700;
  }

  @media only screen and (max-width: 1024px) {
    .mobile {
      ${'' /* display: block; */}
    }
  }
`;

const MobileBlocker = ({ onboarding }) => (
  <>
    {onboarding && (
      <Wrapper>
        <div className={`d-flex min-vh-100 `}>
          <div
            className="container-fluid mt-5"
            style={{
              width: '500px',
            }}
          >
            <h4>{`Oops...We're gonna need a bigger screen.`}</h4>
            <br />
            Please visit the onboarding flow from a larger screen.
          </div>
        </div>
      </Wrapper>
    )}
  </>
);

export default MobileBlocker;
