import Image from 'next/image';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';

import { Button } from '../lib/Button';
import NearIconSvg from './icons/near-icon.svg';
import { LargeScreenProfileDropdown } from './LargeScreenProfileDropdown';
import { useNavigationStore } from './store';
import * as S from './styles';
import { useRouter } from 'next/router';

export const SmallScreenHeader = () => {
  const router = useRouter();
  const redirect = (url: string) => () => router.push(url);
  const components = useBosComponents();
  const isOpenedOnSmallScreens = useNavigationStore((store) => store.isOpenedOnSmallScreens);
  const toggleExpandedSidebarOnSmallScreens = useNavigationStore((store) => store.toggleExpandedSidebarOnSmallScreens);
  const setNavigation = useNavigationStore((store) => store.set);
  const showDrawerCollapse = useNavigationStore((store) => store.isOpenedOnSmallScreens && !!store.expandedDrawer);
  const expandedDrawerTitle = useNavigationStore((store) => store.expandedDrawerTitle);
  const signedIn = useAuthStore((store) => store.signedIn);
  const { requestAuthentication } = useSignInRedirect();

  const handleCreateAccount = () => {
    requestAuthentication(true);
  };

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
        <S.SmallScreenHeaderActions $hidden={isOpenedOnSmallScreens} $gap="16px">
          <Button label="search" icon="ph ph-magnifying-glass" variant="secondary" onClick={redirect('/search')} />
          <LargeScreenProfileDropdown />
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
