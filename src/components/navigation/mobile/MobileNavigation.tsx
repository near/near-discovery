import { useState } from 'react';

import { useScrollBlock } from '@/hooks/useScrollBlock';

import { MenuLeft } from './MenuLeft';
import { TopNavigation } from './TopNavigation';

export const MobileNavigation = () => {
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const HandleCloseMenu = () => {
    setShowLeftMenu(false);
    allowScroll();
  };

  return (
    <>
      <TopNavigation
        onClickShowMenu={() => {
          setShowLeftMenu(true);
          blockScroll();
        }}
      />
      <MenuLeft showMenu={showLeftMenu} onCloseMenu={() => HandleCloseMenu()} />
    </>
  );
};
