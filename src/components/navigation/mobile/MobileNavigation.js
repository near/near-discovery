import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useScrollBlock from '.././../../hooks/useScrollBlock';
import { Menu } from './Menu';
import { Navigation } from './Navigation';

export function MobileNavigation(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    setShowMenu(false);
    getCurrentPage();
    allowScroll();
  }, [allowScroll, getCurrentPage, location.pathname]);

  const getCurrentPage = useCallback(() => {
    switch (location.pathname) {
      case '/':
        return setCurrentPage('Home');
      case `/${props.widgets.profilePage}`:
        return setCurrentPage('Profile');
      case '/edit':
        return setCurrentPage('Create');
      default:
        return setCurrentPage('');
    }
  }, [location.pathname, props.widgets.profilePage]);

  return (
    <>
      <Navigation
        {...props}
        currentPage={currentPage}
        onClickShowMenu={() => {
          setShowMenu(true);
          blockScroll();
        }}
      />
      <Menu
        {...props}
        showMenu={showMenu}
        onCloseMenu={() => {
          setShowMenu(false);
          allowScroll();
        }}
      />
    </>
  );
}
