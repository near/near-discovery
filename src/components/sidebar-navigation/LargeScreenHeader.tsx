import { Button } from '@near-pagoda/ui';
import { useContext, useEffect, useState } from 'react';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';

import { UserDropdownMenu } from '../marketing-navigation/UserDropdownMenu';
import { VmComponent } from '../vm/VmComponent';
import { NearContext } from '../WalletSelector';
import { useNavigationStore } from './store';
import * as S from './styles';

export const LargeScreenHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const components = useBosComponents();
  const currentPageTitle = useNavigationStore((store) => store.currentPageTitle);
  const { signedAccountId } = useContext(NearContext);
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
        src={components.navigation.largeScreenHeader}
        props={{
          title: currentPageTitle,
          rightSideChildren: signedAccountId ? (
            <>
              <UserDropdownMenu />
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
