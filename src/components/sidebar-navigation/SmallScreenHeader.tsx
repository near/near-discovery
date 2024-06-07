import Image from 'next/image';
import { useCallback } from 'react';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';

import { Button } from '../lib/Button';
import { VmComponent } from '../vm/VmComponent';
import NearIconSvg from './icons/near-icon.svg';
import { useNavigationStore } from './store';
import * as S from './styles';
import { LargeScreenProfileDropdown } from './LargeScreenProfileDropdown';

export const SmallScreenHeader = ({ hideNav }: { hideNav: boolean }) => {
  const components = useBosComponents();
  const isOpenedOnSmallScreens = useNavigationStore((store) => store.isOpenedOnSmallScreens);
  const toggleExpandedSidebarOnSmallScreens = useNavigationStore((store) => store.toggleExpandedSidebarOnSmallScreens);
  const setNavigation = useNavigationStore((store) => store.set);
  const showDrawerCollapse = useNavigationStore((store) => store.isOpenedOnSmallScreens && !!store.expandedDrawer);
  const expandedDrawerTitle = useNavigationStore((store) => store.expandedDrawerTitle);

  const near = useVmStore((store) => store.near);
  const availableStorage = useAuthStore((store) => store.availableStorage);
  const availableStorageDisplay = availableStorage?.gte(10) ? availableStorage.div(1000).toFixed(2) : '0';
  const logOut = useAuthStore((store) => store.logOut);
  const signedIn = useAuthStore((store) => store.signedIn);
  const { requestAuthentication } = useSignInRedirect();

  const handleSignIn = () => {
    requestAuthentication();
  };
  const handleCreateAccount = () => {
    requestAuthentication(true);
  };

  const withdrawTokens = useCallback(async () => {
    if (!near) return;
    await near.contract.storage_withdraw({}, undefined, '1');
  }, [near]);

  return (
    <S.SmallScreenHeader>
      {showDrawerCollapse ? (
        <>
          <S.SmallScreenHeaderIconButton
            type="button"
            aria-label="Back to Main Menu"
            onClick={() => setNavigation({ expandedDrawer: null })}
          >
            <i className="ph ph-arrow-left" />
          </S.SmallScreenHeaderIconButton>

          <S.SmallScreenHeaderTitle>{expandedDrawerTitle}</S.SmallScreenHeaderTitle>
        </>
      ) : (
        <S.SmallScreenHeaderLogo
          href="/"
          aria-label="Go Home"
          onClick={() => setNavigation({ isOpenedOnSmallScreens: false })}
        >
          <Image src={NearIconSvg} alt="NEAR" />
        </S.SmallScreenHeaderLogo>
      )}

      {signedIn ? (
        <S.SmallScreenHeaderActions $hidden={isOpenedOnSmallScreens}>
          <LargeScreenProfileDropdown />

          {/* <VmComponent
            showLoadingSpinner={false}
            src={components.navigation.smallScreenHeader}
            props={{ availableStorage: availableStorageDisplay, withdrawTokens, logOut }}
          /> */}
        </S.SmallScreenHeaderActions>
      ) : (
        <>
          <Button
            label="Sign-up or Login"
            variant="primary"
            onClick={handleCreateAccount}
            style={{ alignSelf: 'center', marginRight: '1rem' }}
          />
        </>
      )}

      <S.SmallScreenHeaderIconButton
        type="button"
        aria-label="Expand/Collapse Menu"
        onClick={toggleExpandedSidebarOnSmallScreens}
      >
        <i className={`ph ${isOpenedOnSmallScreens ? 'ph-x' : 'ph-list'}`} />
      </S.SmallScreenHeaderIconButton>

      <S.SmallScreenNavigationBackground $expanded={isOpenedOnSmallScreens} />
    </S.SmallScreenHeader>
  );
};
