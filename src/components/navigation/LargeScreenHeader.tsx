import { useEffect, useState } from 'react';

import { useBosComponents } from '@/hooks/useBosComponents';

import { VmComponent } from '../vm/VmComponent';
import { LargeScreenNotificationButton } from './LargeScreenNotificationButton';
import { LargeScreenProfileDropdown } from './LargeScreenProfileDropdown';
import { useNavigationStore } from './store';
import * as S from './styles';

export const LargeScreenHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const components = useBosComponents();
  const currentPageTitle = useNavigationStore((store) => store.currentPageTitle);

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
          rightSideChildren: (
            <>
              <LargeScreenNotificationButton />
              <LargeScreenProfileDropdown />
            </>
          ),
        }}
      />
    </S.LargeScreenHeader>
  );
};
