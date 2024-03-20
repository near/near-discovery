import Image from 'next/image';
import { useCallback } from 'react';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';

import { VmComponent } from '../vm/VmComponent';
import NearIconSvg from './icons/near-icon.svg';
import { useNavigationStore } from './store';
import * as S from './styles';

export const SmallScreenHeader = () => {
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

      <S.SmallScreenHeaderActions $hidden={isOpenedOnSmallScreens}>
        <VmComponent
          showLoadingSpinner={false}
          src={components.navigation.smallScreenHeader}
          props={{ availableStorage: availableStorageDisplay, withdrawTokens, logOut }}
        />
      </S.SmallScreenHeaderActions>

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
