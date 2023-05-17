import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { recordEvent } from '@/utils/analytics';
import { flushEvents, recordClick } from '@/utils/analytics';

import LogoBlack from '../icons/logo-black.svg';
import NearLogotype from '../icons/near-logotype.svg';
import ReturnIconImage from '../icons/return.svg';
import SearchIconImage from '../icons/search.svg';
import { NotificationButton } from '../NotificationButton';
import { MainNavigationMenu } from './MainNavigationMenu';
import { TypeAheadDropdown } from './TypeAheadDropdown';
import { UserDropdownMenu } from './UserDropdownMenu';
import { getRedirectQueryParams } from '@/utils/navigation';

const StyledNavigation = styled.div`
  z-index: 1000;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding-top: 16px;
  padding-bottom: 16px;

  button {
    border: 0;
  }

  &.border-bottom {
    border-bottom: 1px solid #e3e3e0;
  }

  a {
    :hover {
      text-decoration: none;
      cursor: pointer;
    }
  }

  img {
    width: 110px;
    &.logo-only {
      width: 27px;
      height: 27px;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  nav {
    margin: 0 auto;
  }

  .form-wrapper {
    position: relative;
    z-index: 10;

    input {
      background-repeat: no-repeat;
      border-radius: 50px;
      padding: 7px 25px 7px 44px;
      background-position: 12px 8px;
      border: 1px solid #e3e3e0;
      background-color: white;
      font-size: 16px;
      margin-left: 30px;
      width: 200px;

      :focus {
        outline: 0;
        border: 1px solid #6d62d4;
        box-shadow: 0px 0px 0px 4px #cbc7f4;
      }

      ::placeholder {
        color: #9ba1a6;
      }
    }

    img {
      position: absolute;
      right: 16px;
      top: 10px;
      width: 20px;
      height: 20px;
    }
  }

  .right-side-actions {
    display: flex;
    align-items: center;
    margin-left: auto;

    .sign-in,
    .create-account {
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      padding: 0 20px;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
    }

    .sign-in {
      color: #1b1b18;
      font-weight: 500;
      margin-right: 10px;
      border: 1px solid transparent;
      :hover {
        background-color: #f3f3f2;
      }
      :focus {
        background-color: white;
        border: 1px solid #604cc8;
        box-shadow: 0px 0px 0px 4px #cbc7f4;
      }
    }
    .create-account {
      background-color: #161615;
      color: white;
      :hover {
        background-color: #2e2e2b;
      }
      :focus {
        box-shadow: 0px 0px 0px 4px #cbc7f4;
      }
    }
  }
`;

const TypeAheadDropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 31px;
  margin-top: 10px;
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
  const requestSignIn = useAuthStore((store) => store.requestSignIn);

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

  async function clearAnalytics(event: any) {
    recordClick(event);
    await flushEvents();
  }

  function handleSignIn(event: any) {
    clearAnalytics(event);
    const queryParam = getRedirectQueryParams(router);
    requestSignIn(queryParam);
  }

  return (
    <StyledNavigation className={`${scrolled ? 'border-bottom' : ''}`}>
      <div className="container">
        <Link href="/">
          <Image
            priority
            className={signedIn ? 'logo-only' : ''}
            src={signedIn ? LogoBlack : NearLogotype}
            alt="NEAR"
          />
        </Link>

        <div className="form-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/${components.search.indexPage}?term=${searchTerm}`);
              setSearchIsFocused(false);
            }}
          >
            <input
              placeholder="Search"
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
          </form>

          {showTypeAheadDropdown && (
            <TypeAheadDropdownContainer>
              <TypeAheadDropdown term={searchTerm} focusChange={setSearchIsFocused} />
            </TypeAheadDropdownContainer>
          )}

          {searchIsFocused && <Image src={ReturnIconImage} alt="Return" />}
        </div>
        <MainNavigationMenu />
        <div className="right-side-actions">
          {!signedIn && (
            <>
              <button className="sign-in" onClick={handleSignIn}>
                Sign In
              </button>
              <button
                className="create-account"
                onClick={(event) => {
                  clearAnalytics(event);
                  router.push(`/signup${getRedirectQueryParams(router)}`);
                }}
              >
                Create Account
              </button>
            </>
          )}
          {signedIn && (
            <>
              <NotificationButton />
              <UserDropdownMenu />
            </>
          )}
        </div>
      </div>
    </StyledNavigation>
  );
};
