import { useEffect, useState } from 'react';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';

import { Button } from '../lib/Button';
import { VmComponent } from '../vm/VmComponent';
import { LargeScreenNotificationButton } from './LargeScreenNotificationButton';
import { LargeScreenProfileDropdown } from './LargeScreenProfileDropdown';
import { useNavigationStore } from './store';
import * as S from './styles';

export const LargeScreenHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const components = useBosComponents();
  const currentPageTitle = useNavigationStore((store) => store.currentPageTitle);
  const signedIn = useAuthStore((store) => store.signedIn);
  const { requestAuthentication } = useSignInRedirect();

  const handleSignIn = () => {
    requestAuthentication();
  };

  const handleCreateAccount = () => {
    requestAuthentication(true);
  };

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <S.LargeScreenHeader $scrolled={scrolled}>
      <VmComponent
        showLoadingSpinner={false}
        src={components.navigation.largeScreenHeader}
        props={{
          title: currentPageTitle,
          rightSideChildren: signedIn ? (
            <>
              <LargeScreenNotificationButton />
              <LargeScreenProfileDropdown />
            </>
          ) : (
            <>
              <Button label="Sign In" variant="secondary" onClick={handleSignIn} />
              <Button label="Create Account" variant="primary" onClick={handleCreateAccount} />
            </>
          ),
        }}
      />
    </S.LargeScreenHeader>
  );
};
