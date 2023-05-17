import Image from 'next/image';
import { useRouter } from 'next/router';
import type { UIEvent } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { flushEvents, recordClick } from '@/utils/analytics';

import { UserDropdownMenu } from '../desktop/UserDropdownMenu';
import CloseIcon from '../icons/close.svg';
import NearLogotype from '../icons/near-logotype.svg';
import SearchIcon from '../icons/search.svg';
import { NotificationButton } from '../NotificationButton';
import { AccordionMenu } from './AccordionMenu';
import { getRedirectQueryParams } from '@/utils/navigation';

type Props = {
  onCloseMenu: () => void;
  showMenu: boolean;
};

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000000;
  display: flex;
  transition: 350ms;
  transform: translateX(-100%);

  &.show {
    transform: translateX(0);
  }

  .near-logotype {
    width: 110px;
  }

  .left-side {
    flex: 90;
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 25px;
    overflow-x: auto;
  }

  .close-button {
    background-color: #f3f3f2;
    border: 0.5px solid #e3e3e0;
    position: absolute;
    right: 25px;
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    svg {
      margin: 0;
      min-width: 24px;
      min-height: 24px;

      path {
        stroke: #1b1b18;
      }
    }
  }

  .search-btn {
    all: unset;
    background-repeat: no-repeat;
    background-position: 12px 12px;
    padding-left: 44px;
    margin: 45px 0;
    border: 1px solid #e3e3e0;
    border-radius: 50px;
    min-height: 48px;
    height: 48px;
    color: #868682;
    display: flex;
    align-items: center;

    :focus {
      background-color: white;
      border: 1px solid #604cc8;
      box-shadow: 0px 0px 0px 4px #cbc7f4;
    }
  }

  .current-component {
    margin-bottom: 25px;
  }

  .bottom-btns {
    margin-top: auto;

    button {
      width: 100%;
      height: 48px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sign-in {
      background-color: #f3f3f2;
      color: #1b1b18;
      border: 0.5px solid #e3e3e0;
      margin: 20px 0;
    }
    .create-account {
      background-color: #161615;
      color: white;
      border: 0;
    }
  }

  .logged-in-btns {
    margin-top: auto;
    display: flex;

    .nav-notification-button {
      margin: 0;
      min-width: 46px;
      min-height: 46px;
      margin-right: 20px;

      a {
        min-width: 46px;
        min-height: 46px;
      }
    }

    > div {
      :nth-child(2) {
        width: fill-available;
        > button {
          width: 100%;

          i {
            margin: 0 15px 0 0;
            margin-left: auto;
          }
        }
      }
    }
  }

  .right-side {
    flex: 20;
    opacity: 0.6;
    background-color: #000;
  }
`;

export function MenuLeft(props: Props) {
  const router = useRouter();
  const signedIn = useAuthStore((store) => store.signedIn);
  const requestSignIn = useAuthStore((store) => store.requestSignIn);
  const components = useBosComponents();
  const previousPath = useRef('');

  async function clearAnalytics(event: UIEvent) {
    recordClick(event);
    await flushEvents();
  }

  function handleSignIn(event: UIEvent) {
    clearAnalytics(event);
    props.onCloseMenu();
    const queryParam = getRedirectQueryParams(router);
    requestSignIn(queryParam);
  }

  function search() {
    props.onCloseMenu();
    router.push(`/${components.search.indexPage}`);
  }

  useEffect(() => {
    if (previousPath.current && previousPath.current !== router.asPath) {
      props.onCloseMenu();
    }
    previousPath.current = router.asPath;
  }, [router.asPath, props]);

  return (
    <StyledMenu className={props.showMenu ? 'show' : ''}>
      <div className="left-side">
        <button className="close-button" onClick={props.onCloseMenu}>
          <Image src={CloseIcon} alt="Close" />
        </button>
        <Image className="near-logotype" src={NearLogotype} alt="NEAR logotype" onClick={() => router.push('/')} />
        <button className="search-btn" style={{ backgroundImage: `url(${SearchIcon.src})` }} onClick={search}>
          Search NEAR
        </button>
        <AccordionMenu />

        {!signedIn && (
          <div className="bottom-btns">
            <button className="sign-in" onClick={handleSignIn}>
              Sign in
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
          </div>
        )}
        {signedIn && (
          <div className="logged-in-btns">
            <NotificationButton />
            <UserDropdownMenu />
          </div>
        )}
      </div>
      <div className="right-side" onClick={props.onCloseMenu} />
    </StyledMenu>
  );
}
