import React, { useEffect, useState } from 'react';

import MobileNavigation from './mobile/MobileNavigation';
import DesktopNavigation from './wrapper/desktop/DesktopNavigation';

export const NavigationWrapper = (props) => {
  const [matches, setMatches] = useState(true);

  useEffect(() => {
    setMatches(window.matchMedia('(min-width: 992px)').matches);
  }, []);

  useEffect(() => {
    window.matchMedia('(min-width: 992px)').addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  return (
    <>
      {matches && <DesktopNavigation {...props} />}
      {!matches && <MobileNavigation {...props} />}
    </>
  );
};
