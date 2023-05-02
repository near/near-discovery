import React, { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";

import useScrollBlock from "../.././../../hooks/useScrollBlock";
import { BottomNavigation } from "./BottomNavigation";
import { MenuLeft } from "./MenuLeft";
import { MenuRight } from "./MenuRight";
import { TopNavigation } from "./TopNavigation";

export function MobileNavigation(props) {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    setShowMenu(false);
    allowScroll();
  }, [location.pathname]);

  const HandleCloseMenu = () => {
    setShowMenu(false);
    allowScroll();
  };

  return (
    <>
      <TopNavigation
        {...props}
        onClickShowMenu={(option) => {
          setShowMenu(option);
          blockScroll();
        }}
      />
      <BottomNavigation {...props} />
      <MenuLeft
        {...props}
        showMenu={showMenu === "left"}
        onCloseMenu={() => HandleCloseMenu()}
      />
      <MenuRight
        {...props}
        showMenu={showMenu === "right"}
        onCloseMenu={() => HandleCloseMenu()}
      />
    </>
  );
}
