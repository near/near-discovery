import React, { useEffect,useState } from "react";

import MobileNavigation from "./mobile/MobileNavigation";
import DesktopNavigation from "./wrapper/desktop/DesktopNavigation";

const NavigationWrapper = (props) => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 992px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 992px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return (
    <>
      {matches && <DesktopNavigation {...props} />}
      {!matches && <MobileNavigation {...props} />}
    </>
  );
};

export default NavigationWrapper;
