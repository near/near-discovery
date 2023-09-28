import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { NearconBanner } from '@/components/banners/NearconBanner';
import { Button } from '@/components/lib/Button';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { recordEvent } from '@/utils/analytics';

import NearLogo from '../icons/near-logo.svg';
import ReturnIconImage from '../icons/return.svg';
import SearchIconImage from '../icons/search.svg';
import { NotificationButton } from '../NotificationButton';
import { UserDropdownMenu } from '../UserDropdownMenu';
import { MainNavigationMenu } from './MainNavigationMenu';
import { TypeAheadDropdown } from './TypeAheadDropdown';

const Wrapper = styled.div<{
  scrolled?: boolean;
}>`
  --nav-height: 75px;
  z-index: 1000;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: var(--nav-height);
  box-shadow: ${(p) => (p.scrolled ? '0 1px 0 var(--sand6)' : 'none')};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0 auto;
`;

const Logo = styled.a`
  text-decoration: none;
  cursor: pointer;
  outline: none;
  margin-right: auto;
  transition: all 200ms;

  &:hover,
  &:focus {
    opacity: 0.5;
  }

  img {
    width: 110px;
  }
`;

const Search = styled.div`
  position: relative;
  z-index: 10;

  input {
    background-repeat: no-repeat;
    border-radius: 50px;
    padding: 7px 25px 7px 44px;
    background-position: 12px center;
    border: 1px solid var(--sand6);
    background-color: white;
    font-size: 16px;
    margin-left: 30px;
    width: 200px;
    transition: all 200ms;

    :focus {
      outline: 0;
      border-color: var(--violet8);
      box-shadow: 0 0 0 4px var(--violet4);

      & ~ img {
        opacity: 1;
      }
    }

    ::placeholder {
      color: #9ba1a6;
    }

    & ~ img {
      position: absolute;
      right: 16px;
      top: 10px;
      width: 20px;
      height: 20px;
      opacity: 0;
      transition: all 200ms;
    }
  }
`;

const TypeAheadDropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 31px;
  margin-top: 10px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
  z-index: 10;
  gap: 10px;
`;

export const DesktopNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const [searchIsFocused, _setSearchIsFocused] = useState(false);
  const showTypeAheadDropdown = searchIsFocused && !!searchTerm;
  const components = useBosComponents();
  const searchFocusTimeout = useRef<NodeJS.Timeout>();
  const signedIn = useAuthStore((store) => store.signedIn);
  const { requestAuthentication } = useSignInRedirect();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const setSearchIsFocused = (isFocused: boolean) => {
    if (isFocused) {
      _setSearchIsFocused(true);
      clearTimeout(searchFocusTimeout.current);
    } else {
      searchFocusTimeout.current = setTimeout(() => {
        _setSearchIsFocused(false);
      }, 100);
    }
  };

  const handleSignIn = () => {
    requestAuthentication();
  };

  const handleCreateAccount = () => {
    requestAuthentication(true);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${components.search.indexPage}?term=${encodeURIComponent(searchTerm)}`);
    setSearchIsFocused(false);
  };

  return (
    <>
      <NearconBanner />

      <Wrapper scrolled={scrolled}>
        <Container className="container-xl">
          <Link href="/" passHref legacyBehavior>
            <Logo>
              <Image priority src={NearLogo} alt="NEAR" />
            </Logo>
          </Link>

          <Search>
            <form onSubmit={handleSearchSubmit}>
              <input
                placeholder="Search NEAR"
                style={{ backgroundImage: `url(${SearchIconImage.src})` }}
                onFocus={() => {
                  setSearchIsFocused(true);
                  recordEvent('click-navigation-search');
                }}
                onBlur={() => {
                  setSearchIsFocused(false);
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={searchRef}
              />
              <Image src={ReturnIconImage} alt="Return" />
            </form>

            {showTypeAheadDropdown && (
              <TypeAheadDropdownContainer>
                <TypeAheadDropdown term={searchTerm} focusChange={setSearchIsFocused} />
              </TypeAheadDropdownContainer>
            )}
          </Search>

          <MainNavigationMenu />

          <Actions>
            {signedIn ? (
              <>
                <NotificationButton />
                <UserDropdownMenu />
              </>
            ) : (
              <>
                <Button label="Sign In" variant="secondary" onClick={handleSignIn} />
                <Button label="Create Account" variant="primary" onClick={handleCreateAccount} />
              </>
            )}
          </Actions>
        </Container>
      </Wrapper>
    </>
  );
};
