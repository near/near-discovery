import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';

import SearchIcon from '../icons/search.svg';
import { AccordionMenu } from './AccordionMenu';

type Props = {
  isVisible: boolean;
  onCloseMenu: () => void;
};

const Wrapper = styled.div<{
  visible: boolean;
}>`
  position: fixed;
  top: var(--nav-height);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  display: ${(p) => (p.visible ? 'block' : 'none')};
  transition: 200ms;
  background: var(--white);
  border-top: 1px solid var(--sand6);
  overflow: auto;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  transform-origin: center top;
  animation: fadeIn 200ms;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(1, 0);
    }
    to {
      opacity: 1;
      transform: scale(1, 1);
    }
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  min-height: calc(100% + 1px);

  /*
    The +1px for "min-height" allows "overscroll-behavior: contain;" on the <Wrapper>
    to prevent the <body> from scrolling. Setting "overflow: hidden;" on the <body> would
    break the "position: sticky;" behavior of the navigation - that's why we need to
    use this hack instead.

    https://stackoverflow.com/a/48954092
  */
`;

const SearchButton = styled.button`
  all: unset;
  padding-left: 44px;
  margin: 0;
  border: 1px solid var(--sand6);
  border-radius: 50px;
  min-height: 48px;
  height: 48px;
  color: #868682;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-position: 12px 12px;
  background-image: url(${SearchIcon.src});
  transition: all 200ms;

  :focus {
    background-color: white;
    border: 1px solid #604cc8;
    box-shadow: 0px 0px 0px 4px #cbc7f4;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function Menu(props: Props) {
  const router = useRouter();
  const signedIn = useAuthStore((store) => store.signedIn);
  const components = useBosComponents();
  const { requestAuthentication } = useSignInRedirect();

  function handleSignIn() {
    props.onCloseMenu();
    requestAuthentication();
  }

  function handleCreateAccount() {
    props.onCloseMenu();
    requestAuthentication(true);
  }

  function search() {
    props.onCloseMenu();
    router.push(`/${components.search.indexPage}`);
  }

  return (
    <Wrapper visible={props.isVisible}>
      <InnerWrapper>
        <SearchButton onClick={search}>Search NEAR</SearchButton>

        <AccordionMenu onCloseMenu={props.onCloseMenu} />

        {!signedIn && (
          <Actions>
            <Button label="Create Account" variant="primary" size="large" onClick={handleCreateAccount} />
            <Button label="Sign in" variant="secondary" size="large" onClick={handleSignIn} />
          </Actions>
        )}
      </InnerWrapper>
    </Wrapper>
  );
}
