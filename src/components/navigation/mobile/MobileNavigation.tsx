import { useCallback, useState } from 'react';

import { useScrollBlock } from '@/hooks/useScrollBlock';

import { MenuLeft } from './MenuLeft';
import { TopNavigation } from './TopNavigation';

export const MobileNavigation = () => {
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const closeMenu = useCallback(() => {
    setShowLeftMenu(false);
    allowScroll();
  }, [allowScroll]);

  const openLeftMenu = useCallback(() => {
    setShowLeftMenu(true);
    blockScroll();
  }, [blockScroll]);

  return (
    <>
      <TopNavigation onClickShowMenu={openLeftMenu} />
      <MenuLeft showMenu={showLeftMenu} onCloseMenu={closeMenu} />
    </>
  );
};
