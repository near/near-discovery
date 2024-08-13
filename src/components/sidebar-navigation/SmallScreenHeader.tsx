import { Button } from '@near-pagoda/ui';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { useSignInRedirect } from '@/hooks/useSignInRedirect';

import { UserDropdownMenu } from '../marketing-navigation/UserDropdownMenu';
import { NearContext } from '../WalletSelector';
import NearIconSvg from './icons/near-icon.svg';
import { useNavigationStore } from './store';
import * as S from './styles';

export const SmallScreenHeader = () => {
  const router = useRouter();
  const redirect = (url: string) => () => router.push(url);
  const isOpenedOnSmallScreens = useNavigationStore((store) => store.isOpenedOnSmallScreens);
  const toggleExpandedSidebarOnSmallScreens = useNavigationStore((store) => store.toggleExpandedSidebarOnSmallScreens);
  const setNavigation = useNavigationStore((store) => store.set);
  const showDrawerCollapse = useNavigationStore((store) => store.isOpenedOnSmallScreens && !!store.expandedDrawer);
  const expandedDrawerTitle = useNavigationStore((store) => store.expandedDrawerTitle);
  const { signedAccountId } = useContext(NearContext);
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

      {signedAccountId ? (
        <S.SmallScreenHeaderActions $hidden={isOpenedOnSmallScreens} $gap="16px">
          <Button label="search" icon={<MagnifyingGlass />} variant="secondary" onClick={redirect('/search')} />
          <UserDropdownMenu />
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
