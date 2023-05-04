import React from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')`
  background-color: #37cd83;
  padding: 8px 0;
`;

const Text = styled('div')`
  color: var(--slate-dark-1);
  margin-left: 24px;
`;

const VsCodeLink = styled.span`
  text-decoration: underline;
  color: var(--blue-light-1);
  font-weight: 700;
  cursor: pointer;
`;

export default function BannerOboarding({ handleExitOnboarding }) {
  return (
    <Wrapper className="d-flex align-center justify-content-center">
      <Text>
        Welcome to the <b>Onboarding flow</b>. You can exit anytime by&nbsp;
        <VsCodeLink onClick={handleExitOnboarding}>clicking here</VsCodeLink>
      </Text>
    </Wrapper>
  );
}
