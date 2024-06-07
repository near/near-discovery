import { useEffect } from 'react';

// import { DiscoverDrawer } from './DiscoverDrawer';
// import { MarketingDrawer } from './MarketingDrawer';
import { Sidebar } from './Sidebar';
import { SmallScreenHeader } from './SmallScreenHeader';
import { useNavigationStore } from './store';

export const SidebarNavigation = ({ hideNav }: { hideNav: boolean }) => {
  const expandedDrawer = useNavigationStore((store) => store.expandedDrawer);
  const initializeNavigation = useNavigationStore((store) => store.initialize);
  const setNavigation = useNavigationStore((store) => store.set);

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
      <SmallScreenHeader hideNav={hideNav} />

      <Sidebar />

      {/* <DiscoverDrawer expanded={expandedDrawer === 'discover'} /> */}

      {/* <MarketingDrawer expanded={expandedDrawer === 'marketing'} /> */}
    </>
  );
};
