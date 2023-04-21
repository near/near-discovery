import React, { useState, useEffect } from "react";
import { TopNavigation } from "./TopNavigation";
import { MenuLeft } from "./MenuLeft";
import { useLocation } from "react-router-dom";
import useScrollBlock from "../.././../../hooks/useScrollBlock";

const MobileNavigation = (props) => {
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
      <MenuLeft
        {...props}
        showMenu={showMenu === "left"}
        onCloseMenu={() => HandleCloseMenu()}
      />
    </>
  );
};

export default MobileNavigation;
