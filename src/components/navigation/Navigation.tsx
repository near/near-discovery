import { useEffect } from 'react';

import { DiscoverDrawer } from './DiscoverDrawer';
import { MarketingDrawer } from './MarketingDrawer';
import { Sidebar } from './Sidebar';
import { SmallScreenHeader } from './SmallScreenHeader';
import type { NavigationDrawer } from './store';
import { useNavigationStore } from './store';

export const Navigation = () => {
  const expandedDrawer = useNavigationStore((store) => store.expandedDrawer);
  const initializeNavigation = useNavigationStore((store) => store.initialize);
  const setNavigation = useNavigationStore((store) => store.set);

  const setInitialExpandedDrawer = (drawer: NavigationDrawer) => {
    if (typeof expandedDrawer === 'undefined') {
      setNavigation({
        expandedDrawer: drawer,
      });
    }
  };

  useEffect(() => {
    initializeNavigation();
  }, [initializeNavigation]);

  useEffect(() => {
    let expandedDrawerTitle = '';

    switch (expandedDrawer) {
      case 'discover':
        expandedDrawerTitle = 'Discover';
        break;
      case 'marketing':
        expandedDrawerTitle = 'More';
        break;
    }

    setNavigation({ expandedDrawerTitle });
  }, [expandedDrawer, setNavigation]);

  return (
    <>
      <SmallScreenHeader />

      <Sidebar />

      <DiscoverDrawer
        expanded={expandedDrawer === 'discover'}
        onItemActivated={() => setInitialExpandedDrawer('discover')}
      />

      <MarketingDrawer
        expanded={expandedDrawer === 'marketing'}
        onItemActivated={() => setInitialExpandedDrawer('marketing')}
      />
    </>
  );
};
