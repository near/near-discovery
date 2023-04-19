import React, { useState, useEffect } from "react";
import DesktopNavigation from "./wrapper/desktop/DesktopNavigation";
import MobileNavigation from "./mobile/MobileNavigation";

const NavigationWrapper = (props) => {
  const [matches, setMatches] = useState(false);

  // useEffect(() => {
  //   window
  //     .matchMedia("(min-width: 992px)")
  //     .addEventListener("change", (e) => setMatches(e.matches));
  // }, []);

  return (
    <>
      {/* {matches && <DesktopNavigation {...props} />} */}
      <MobileNavigation {...props} />
    </>
  );
};

export default NavigationWrapper;
