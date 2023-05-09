import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/client/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';

import LogoBlack from '../icons/logo-black.svg';
import NearLogotype from '../icons/near-logotype.svg';

type Props = {
  onClickShowMenu: () => void;
};

const StyledNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.border-bottom {
    border-bottom: 1px solid #e3e3e0;
  }

  .logo-link {
    img {
      width: 28px;
      height: 28px;
    }

    &.large {
      img {
        width: 110px;
      }
    }
  }

  .nav-notification-button {
    margin: 0;
  }

  .mobile-nav-profile-btn {
    width: 40px;
    height: 40px;
    padding: 0;
    outline: none;
    border: 0;
    border-radius: 50%;

    img,
    svg {
      border-radius: 50% !important;
    }

    .menu-icon {
      background-color: #161615;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      i {
        color: white;
      }
    }
  }

  .mobile-nav-develop-btn {
    background-color: #f3f3f2;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid #e3e3e0;
    padding: 0;
    outline: none;
    border-radius: 50%;
  }

  i {
    font-size: 20px;
  }
`;

export function TopNavigation(props: Props) {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const components = useBosComponents();
  const signedIn = useAuthStore((store) => store.signedIn);
  const accountId = useAuthStore((store) => store.accountId);

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

  return (
    <StyledNavigation className={`${scrolled ? 'border-bottom' : ''}`}>
      {signedIn && (
        <button
          onClick={() => router.push(`/${components.profilePage}?accountId=${accountId}`)}
          className="mobile-nav-profile-btn"
        >
          <VmComponent
            src={components.profileImage}
            props={{
              accountId: accountId,
              className: 'd-inline-block',
              style: { width: '40px', height: '40px' },
            }}
          />
        </button>
      )}
      <Link href="/" className={classNames(['logo-link', { large: !signedIn }])}>
        <Image src={signedIn ? LogoBlack : NearLogotype} alt="NEAR logo" />
      </Link>
      <button onClick={() => props.onClickShowMenu()} className="mobile-nav-profile-btn">
        <div className="menu-icon">
          <i className="ph-bold ph-list"></i>
        </div>
      </button>
    </StyledNavigation>
  );
}
