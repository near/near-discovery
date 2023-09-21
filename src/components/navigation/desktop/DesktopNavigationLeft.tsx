import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: none;
  position: relative;
  z-index: 50;
  width: 260px;
  min-height: 100vh;
  background: rgba(24, 26, 39, 1);
  padding: 10px;
  flex-shrink: 0;
  z-index: 10;
  .logo {
    padding: 24px 0 18px 32px;
  }
  .item {
    position: relative;
    display: flex;
    align-items: center;
    height: 46px;
    border-radius: 16px;
    cursor: pointer;
    padding-left: 32px;
    font-family: Gantari;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    margin: 6px 0;
    color: rgba(151, 154, 190, 1);
    text-decoration: none;
    .icon {
      display: flex;
      align-items: center;
      width: 32px;
    }
  }
  .item:hover{
    background: rgba(55, 58, 83, 1);
  }
  .show {
    display: block;
  }
  .hidden {
    display: none;
  }
  .child-item {
    padding-left: 64px;
  }
  .disabled {
    cursor: not-allowed;
  }
  .item.active {
    background: rgba(55, 58, 83, 1);
    color: #ebf479;
    .bag {
      position: absolute;
      right: -10px;
      top: -12px;
    }
  }
  .parentItem {
    position: relative;
    .arrow {
      position: absolute;
      right: 24px;
    }
  }
  .parentItem.active {
    background: transparent;
  }
  .small .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .small .logo {
    padding: 24px 0 18px 30px;
  }
  .small .item {
    padding-left: 0;
  }
  .small .item.active {
    background: transparent;
  }
  .small .item .icon {
    width: auto;
  }
  .small .hasChildBox {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
  }
  .small .active .bag {
    right: -16px;
    top: 5px;
  }
  .small .childBox {
    position: absolute;
    left: 80px;
    top: 0;
    width: 200px;
    background-color: #373a53;
    border-radius: 16px;
    padding: 10px 10px 4px 10px;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    .child-item {
      white-space: nowrap;
      height: 46px;
      padding: 0 16px;
      margin: 0 0 6px 0;
      box-sizing: border-box;
    }
    .active,
    .child-item:hover {
      background-color: rgba(24, 26, 39, 0.3);
    }
  }
  .putButton {
    position: absolute;
    right: 0;
    top: 31px;
    cursor: pointer;
  }
  @media (min-width: 901px) {
    display: block;
  }
  .soonIcon {
    margin-left: 2px;
  }
  .newIcon {
    margin-left: 6px;
  }
`;
const ContainerMobile = styled.div`
  display: none;
  position: relative;
  @media (max-width: 900px) {
    display: block;
    .show {
      display: block;
      overflow: auto;
    }
  }

  .top_menu_icon {
    position: fixed;
    width: 100%;
    left: 0;
    align-items: center;
    justify-content: space-between;
    background-color: #1e202f;
    padding: 24px;
    z-index: 99;
    .right_p {
      position: absolute;
      right: 24px;
      top: 28px;
    }
  }
  .show {
    display: block;
    overflow: auto;
  }
  .hidden {
    display: none;
  }
  .menu_list {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #1e202f;
    z-index: 999;
    .operation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
    }
    .list {
      .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 75px;
        border-bottom: 1px solid #332c4b;
        font-size: 24px;
        color: #979abe;
        font-weight: 500;
        .arrow {
          position: absolute;
          right: 24px;
        }
      }
      .active {
        color: #ebf479;
        background-color: #2b2d3f;
        border-bottom: 1px solid #3b3e53;
      }
    }
    .activeWhole {
      background-color: #2b2d3f;
      .item {
        border-bottom: 1px solid #3b3e53;
      }
    }
  }
  .soonIcon {
    margin-left: 2px;
  }
  .newIcon {
    margin-left: 6px;
  }
`;

const soonIcon = (
  <svg width="46" height="16" viewBox="0 0 46 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.95143 2.39672C6.58841 0.940775 8.02687 0 9.61606 0H39.8839C42.7685 0 44.7048 2.96052 43.5486 5.60328L40.0486 13.6033C39.4116 15.0592 37.9731 16 36.3839 16H6.11606C3.23146 16 1.29523 13.0395 2.45143 10.3967L5.95143 2.39672Z"
      fill="#37394F"
    />
    <path
      d="M11.036 12.12C10.54 12.12 10.052 12.028 9.572 11.844C9.092 11.652 8.672 11.356 8.312 10.956L8.876 10.212C9.26 10.556 9.628 10.808 9.98 10.968C10.332 11.128 10.72 11.208 11.144 11.208C11.592 11.208 11.98 11.148 12.308 11.028C12.636 10.908 12.892 10.728 13.076 10.488C13.26 10.24 13.352 9.936 13.352 9.576C13.352 9.28 13.268 9.044 13.1 8.868C12.932 8.692 12.68 8.572 12.344 8.508L11.012 8.244C10.428 8.132 10 7.916 9.728 7.596C9.456 7.268 9.32 6.888 9.32 6.456C9.32 5.96 9.44 5.516 9.68 5.124C9.92 4.732 10.264 4.424 10.712 4.2C11.168 3.976 11.712 3.864 12.344 3.864C12.8 3.864 13.264 3.944 13.736 4.104C14.216 4.264 14.628 4.512 14.972 4.848L14.42 5.604C14.14 5.356 13.824 5.156 13.472 5.004C13.128 4.852 12.756 4.776 12.356 4.776C11.74 4.776 11.256 4.912 10.904 5.184C10.552 5.448 10.376 5.82 10.376 6.3C10.376 6.58 10.46 6.8 10.628 6.96C10.796 7.112 11.056 7.22 11.408 7.284L12.74 7.548C13.124 7.62 13.436 7.752 13.676 7.944C13.924 8.136 14.104 8.36 14.216 8.616C14.336 8.872 14.396 9.144 14.396 9.432C14.396 9.992 14.26 10.472 13.988 10.872C13.716 11.272 13.328 11.58 12.824 11.796C12.32 12.012 11.724 12.12 11.036 12.12ZM18.2216 12.12C17.6936 12.12 17.2416 12.012 16.8656 11.796C16.4896 11.58 16.1976 11.288 15.9896 10.92C15.7896 10.552 15.6896 10.14 15.6896 9.684C15.6896 8.98 15.8296 8.372 16.1096 7.86C16.3976 7.34 16.7936 6.94 17.2976 6.66C17.8096 6.38 18.3976 6.24 19.0616 6.24C19.5896 6.24 20.0416 6.348 20.4176 6.564C20.7936 6.78 21.0816 7.072 21.2816 7.44C21.4896 7.8 21.5936 8.212 21.5936 8.676C21.5936 9.38 21.4496 9.992 21.1616 10.512C20.8816 11.024 20.4856 11.42 19.9736 11.7C19.4696 11.98 18.8856 12.12 18.2216 12.12ZM18.3176 11.268C18.7656 11.268 19.1616 11.164 19.5056 10.956C19.8496 10.748 20.1176 10.456 20.3096 10.08C20.5016 9.696 20.5976 9.244 20.5976 8.724C20.5976 8.244 20.4536 7.852 20.1656 7.548C19.8776 7.244 19.4776 7.092 18.9656 7.092C18.5176 7.092 18.1216 7.196 17.7776 7.404C17.4336 7.612 17.1656 7.908 16.9736 8.292C16.7816 8.668 16.6856 9.116 16.6856 9.636C16.6856 10.116 16.8296 10.508 17.1176 10.812C17.4056 11.116 17.8056 11.268 18.3176 11.268ZM25.2997 12.12C24.7717 12.12 24.3197 12.012 23.9437 11.796C23.5677 11.58 23.2757 11.288 23.0677 10.92C22.8677 10.552 22.7677 10.14 22.7677 9.684C22.7677 8.98 22.9077 8.372 23.1877 7.86C23.4757 7.34 23.8717 6.94 24.3757 6.66C24.8877 6.38 25.4757 6.24 26.1397 6.24C26.6677 6.24 27.1197 6.348 27.4957 6.564C27.8717 6.78 28.1597 7.072 28.3597 7.44C28.5677 7.8 28.6717 8.212 28.6717 8.676C28.6717 9.38 28.5277 9.992 28.2397 10.512C27.9597 11.024 27.5637 11.42 27.0517 11.7C26.5477 11.98 25.9637 12.12 25.2997 12.12ZM25.3957 11.268C25.8437 11.268 26.2397 11.164 26.5837 10.956C26.9277 10.748 27.1957 10.456 27.3877 10.08C27.5797 9.696 27.6757 9.244 27.6757 8.724C27.6757 8.244 27.5317 7.852 27.2437 7.548C26.9557 7.244 26.5557 7.092 26.0437 7.092C25.5957 7.092 25.1997 7.196 24.8557 7.404C24.5117 7.612 24.2437 7.908 24.0517 8.292C23.8597 8.668 23.7637 9.116 23.7637 9.636C23.7637 10.116 23.9077 10.508 24.1957 10.812C24.4837 11.116 24.8837 11.268 25.3957 11.268ZM29.7018 12L30.6858 6.36H31.6218L31.4898 7.092C31.7298 6.788 32.0018 6.572 32.3058 6.444C32.6178 6.308 33.0018 6.24 33.4578 6.24C33.8898 6.24 34.2338 6.3 34.4898 6.42C34.7538 6.54 34.9498 6.708 35.0778 6.924C35.2058 7.132 35.2778 7.376 35.2938 7.656C35.3178 7.928 35.3058 8.22 35.2578 8.532L34.6458 12H33.6738L34.2618 8.64C34.3018 8.464 34.3178 8.288 34.3098 8.112C34.3098 7.928 34.2738 7.76 34.2018 7.608C34.1378 7.456 34.0178 7.332 33.8418 7.236C33.6738 7.14 33.4378 7.092 33.1338 7.092C32.6138 7.092 32.1898 7.252 31.8618 7.572C31.5338 7.884 31.3138 8.352 31.2018 8.976L30.6738 12H29.7018Z"
      fill="#979ABE"
    />
  </svg>
);

const newIcon = (
  <svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="16" rx="4" fill="#E9F456" />
    <path
      d="M3.948 12V3.984H5.268L9.492 10.26V3.984H10.692V12H9.372L5.148 5.724V12H3.948ZM15.2247 12.12C14.6567 12.12 14.1447 12.008 13.6887 11.784C13.2407 11.552 12.8847 11.22 12.6207 10.788C12.3567 10.348 12.2247 9.812 12.2247 9.18C12.2247 8.58 12.3487 8.06 12.5967 7.62C12.8527 7.18 13.1927 6.84 13.6167 6.6C14.0487 6.36 14.5287 6.24 15.0567 6.24C15.6087 6.24 16.0887 6.348 16.4967 6.564C16.9047 6.78 17.2167 7.072 17.4327 7.44C17.6567 7.8 17.7687 8.212 17.7687 8.676C17.7687 8.812 17.7487 8.96 17.7087 9.12C17.6767 9.28 17.6327 9.408 17.5767 9.504H13.3767C13.4167 9.864 13.5167 10.168 13.6767 10.416C13.8447 10.656 14.0687 10.84 14.3487 10.968C14.6287 11.088 14.9527 11.148 15.3207 11.148C15.6887 11.148 16.0127 11.092 16.2927 10.98C16.5807 10.868 16.8567 10.712 17.1207 10.512L17.5287 11.34C17.2167 11.596 16.8647 11.792 16.4727 11.928C16.0887 12.056 15.6727 12.12 15.2247 12.12ZM13.3767 8.64H16.6047C16.6127 8.616 16.6167 8.596 16.6167 8.58C16.6167 8.564 16.6167 8.544 16.6167 8.52C16.6167 8.248 16.5607 8.016 16.4487 7.824C16.3367 7.624 16.1687 7.468 15.9447 7.356C15.7207 7.244 15.4367 7.188 15.0927 7.188C14.8127 7.188 14.5527 7.248 14.3127 7.368C14.0807 7.48 13.8807 7.644 13.7127 7.86C13.5527 8.068 13.4407 8.328 13.3767 8.64ZM20.1277 12L18.1477 6.36H19.3597L20.7037 10.584L22.1197 6.36H23.1757L24.5797 10.584L25.9357 6.36H27.1477L25.1557 12H24.0517L22.6477 7.8L21.2437 12H20.1277Z"
      fill="#181A27"
    />
  </svg>
);

export const DesktopNavigationLeft = () => {
  let storedShowMenu = null;

  if (typeof window !== 'undefined') {
    storedShowMenu = window.localStorage.getItem('def-def-put-menu');
  }

  const [putMenu, setPutMenu] = useState(storedShowMenu === '1' || false);
  const [showChildBox, setShowChildBox] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openChains, setOpenChains] = useState(false);
  const [openChainsPc, setOpenChainsPc] = useState(true);
  const [openWarm, setOpenWarm] = useState(false);
  const [showWarmBox, setShowWarmBox] = useState(false);
  const [openWarmPc, setOpenWarmPc] = useState(true);

  const [show_menu_list, set_show_menu_list] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (document.documentElement.clientWidth <= 1023) {
      setIsMobile(true);
    }
  }, []);
  function isActive(name: string) {
    let paths: string[] = [];
    if (name == 'near') {
      paths = ['ref-home', 'xBox', 'near', 'MetaPool.Stake'];
    } else if (name == 'polygon-zkevm') {
      paths = [
        'ZKEVMSwap.zkevm-swap',
        'ZKEVM-all-in-one',
        'ZKEVMSwap.zkevm-bridge',
        'ZKEVM.GAMMA',
        'ZKEVM.AAVE',
        'polygon-zkevm',
        '0vix.Lending',
      ];
    } else if (name == 'base') {
      paths = ['Base.BaseDex', 'base'];
    } else if (name === 'mantle') {
      paths = ['mantle', 'Mantle.Swap'];
    } else if (name == 'warmup') {
      paths = ['ZKEVM.ExecuteRecords', 'ZKEVM.QuestionList', 'warmup'];
    } else if (name == 'allChains') {
      paths = ['allChains', 'AllChains.AllChainsPage'];
    } else if (name === 'arbitrum') {
      paths = ['arbitrum', 'Arbitrum.Swap.Dex', 'Arbitrum.Pendle.TradeMarkets'];
    } else if (name === 'bsc') {
      paths = ['bsc', 'Bsc.Swap.Dex'];
    } else if (name === 'polygon') {
      paths = ['polygon', 'Polygon.Swap.Dex'];
    } else if (name === 'linea') {
      paths = ['linea', 'Linea.Swap.Dex'];
    } else if (name === 'metis') {
      paths = ['metis', 'Metis.Swap.Dex'];
    }
    const r = router.asPath.split('/').pop() || '';
    return paths.includes(r);
  }
  const visible_bag = (
    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="5.23218"
        y="9.56238"
        width="7"
        height="3"
        rx="1.5"
        transform="rotate(-30 5.23218 9.56238)"
        fill="url(#paint0_linear_1_257)"
      />
      <rect
        x="0.905762"
        y="6.06897"
        width="7"
        height="3"
        rx="1.5"
        transform="rotate(-45 0.905762 6.06897)"
        fill="url(#paint1_linear_1_257)"
      />
      <rect
        width="7"
        height="3"
        rx="1.5"
        transform="matrix(-0.965926 0.258819 0.258819 0.965926 13.4338 12.6924)"
        fill="url(#paint2_linear_1_257)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_257"
          x1="8.73218"
          y1="9.56238"
          x2="8.73218"
          y2="12.5624"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EEF3BF" />
          <stop offset="1" stop-color="#E9F456" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_257"
          x1="4.40576"
          y1="6.06897"
          x2="4.40576"
          y2="9.06897"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EEF3BF" />
          <stop offset="1" stop-color="#E9F456" />
        </linearGradient>
        <linearGradient id="paint2_linear_1_257" x1="3.5" y1="0" x2="3.5" y2="3" gradientUnits="userSpaceOnUse">
          <stop stop-color="#EEF3BF" />
          <stop offset="1" stop-color="#E9F456" />
        </linearGradient>
      </defs>
    </svg>
  );

  const nearActive =
    isActive('near') ||
    isActive('polygon-zkevm') ||
    isActive('base') ||
    isActive('mantle') ||
    isActive('allChains') ||
    isActive('arbitrum') ||
    isActive('bsc');
  const warmActive = isActive('warmup');
  function openMenu() {
    set_show_menu_list(true);
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    set_show_menu_list(false);
    document.body.style.overflow = 'auto';
  }
  return (
    <>
      {isMobile ? (
        <ContainerMobile>
          <div className="top_menu_icon">
            {shanshanLogo}
            <span className="right_p" onClick={openMenu}>
              {m_menuIcon}
            </span>
          </div>
          <div className={`menu_list ${show_menu_list ? 'show' : 'hidden'}`}>
            <div className="operation">
              {shanshanLogo}
              <span onClick={closeMenu}>{m_closeIcon}</span>
            </div>
            <div className="list">
              <Link className={`item ${router.asPath == '/' ? 'active' : ''}`} href="/" onClick={closeMenu}>
                Home
              </Link>
              <Link className={`item ${isActive('warmup') ? 'active' : ''}`} onClick={closeMenu} href="/warmup">
                Polygon zkEVM Warm up
              </Link>
              {/* <div className={`${warmActive ? 'activeWhole' : ''}`}>
                <div
                  onClick={() => {
                    setOpenWarm(!openWarm);
                  }}
                  className={`item ${warmActive ? 'active' : ''}`}
                >
                  Warm up
                  <ArrowIcon
                    className="arrow"
                    style={{
                      transform: openWarm ? 'rotate(180deg)' : '',
                    }}
                  ></ArrowIcon>
                </div>
                <div className={`${openWarm ? 'show' : 'hidden'}`}>
                  <Link
                    className={`item child-item ${isActive('warmup') ? 'active' : ''}`}
                    href="/warmup"
                    onClick={closeMenu}
                  >
                    Polygon zkEVM
                  </Link>
                </div>
              </div> */}
              <div className={`${nearActive ? 'activeWhole' : ''}`}>
                <div
                  onClick={() => {
                    setOpenChains(!openChains);
                  }}
                  className={`item ${nearActive ? 'active' : ''}`}
                >
                  Chains
                  <ArrowIcon
                    className="arrow"
                    style={{
                      transform: openChains ? 'rotate(180deg)' : '',
                    }}
                  ></ArrowIcon>
                </div>
                <div className={`${openChains ? 'show' : 'hidden'}`}>
                  <Link
                    className={`item child-item ${isActive('allChains') ? 'active' : ''}`}
                    href="/allChains"
                    onClick={closeMenu}
                  >
                    All Chains
                  </Link>
                  <Link
                    className={`item child-item ${isActive('near') ? 'active' : ''}`}
                    href="/near"
                    onClick={closeMenu}
                  >
                    NEAR(4)
                  </Link>
                  <Link
                    className={`item child-item ${isActive('polygon-zkevm') ? 'active' : ''}`}
                    href="/polygon-zkevm"
                    onClick={closeMenu}
                  >
                    Polygon zkEVM(5)
                  </Link>
                  <Link
                    className={`item child-item ${isActive('mantle') ? 'active' : ''}`}
                    href="/mantle"
                    onClick={closeMenu}
                  >
                    Mantle(2)
                    <span className="newIcon">{newIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('base') ? 'active' : ''}`}
                    href="/base"
                    onClick={closeMenu}
                  >
                    Base(1)
                    <span className="newIcon">{newIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('arbitrum') ? 'active' : ''}`}
                    href="/arbitrum"
                    onClick={closeMenu}
                  >
                    Arbitrum(2)
                    <span className="newIcon">{newIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('bsc') ? 'active' : ''}`}
                    href="/bsc"
                    onClick={closeMenu}
                  >
                    BSC(1)
                    <span className="newIcon">{newIcon}</span>
                  </Link>

                  <Link
                    className={`item child-item ${isActive('linea') ? 'active' : ''} `}
                    href="/linea"
                    onClick={closeMenu}
                  >
                    Linea(1)
                    <span className="newIcon">{newIcon}</span>
                  </Link>

                  <Link
                    className={`item child-item ${isActive('metis') ? 'active' : ''} `}
                    href="/metis"
                    onClick={closeMenu}
                  >
                    Metis(1)
                    <span className="newIcon">{newIcon}</span>
                  </Link>

                  <Link
                    className={`item child-item ${isActive('polygon') ? 'active' : ''} `}
                    href="/polygon"
                    onClick={closeMenu}
                  >
                    Polygon(1)
                    <span className="newIcon">{newIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('Optimism') ? 'active' : ''} disabled`}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Optimism
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('avalanche') ? 'active' : ''} disabled`}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Avalanche
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('zkSync') ? 'active' : ''} disabled`}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    zkSync
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>

                  <Link
                    className={`item child-item ${isActive('Scroll') ? 'active' : ''} disabled`}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Scroll
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('Gnosis') ? 'active' : ''} disabled`}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Gnosis
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>

                  <Link
                    className={`item child-item ${isActive('Berachain') ? 'active' : ''} disabled`}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Berachain
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('Monad') ? 'active' : ''} disabled`}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Monad
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('Taiko') ? 'active' : ''} disabled`}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                  >
                    Taiko
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ContainerMobile>
      ) : (
        <Container style={{ width: putMenu ? '80px' : '260px', padding: putMenu ? '10px 0' : '10px' }}>
          <div
            className="putButton"
            style={{ transform: putMenu ? 'rotateY(180deg)' : '', right: putMenu ? '-21px' : '0px' }}
            onClick={() => {
              setPutMenu(!putMenu);

              if (typeof window !== 'undefined') {
                if (putMenu) {
                  window.localStorage.removeItem('def-def-put-menu');
                } else {
                  window.localStorage.setItem('def-def-put-menu', '1');
                }
              }
            }}
          >
            {putIcon}
          </div>
          {putMenu ? (
            <div className="small">
              <div className="logo">{shanshanPutLogo}</div>
              <div className="menu">
                <Link className={`item ${router.asPath == '/' ? 'active' : ''}`} href="/">
                  <div className="icon">{homeIcon}</div>
                  <span className="bag">{router.asPath == '/' ? visible_bag : null}</span>
                </Link>
                <div
                  className="hasChildBox"
                  onMouseEnter={() => {
                    setShowWarmBox(true);
                  }}
                  onMouseLeave={() => {
                    setShowWarmBox(false);
                  }}
                >
                  <div className={`item ${isActive('warmup') ? 'active' : ''}`}>
                    <div className="icon">{zkevmIcon}</div>
                  </div>
                  <div className="childBox" style={{ display: showWarmBox ? 'block' : 'none' }}>
                    <Link className={`item child-item ${isActive('warmup') ? 'active' : ''}`} href="/warmup">
                      Polygon zkEVM
                    </Link>
                  </div>
                </div>
                <div
                  className="hasChildBox"
                  onMouseEnter={() => {
                    setShowChildBox(true);
                  }}
                  onMouseLeave={() => {
                    setShowChildBox(false);
                  }}
                >
                  <div
                    className={`item ${isActive('allChains') ||
                        isActive('near') ||
                        isActive('polygon-zkevm') ||
                        isActive('base') ||
                        isActive('mantle') ||
                        isActive('arbitrum') ||
                        isActive('bsc') ||
                        isActive('polygon') ||
                        isActive('linea') ||
                        isActive('metis')
                        ? 'active'
                        : ''
                      }`}
                  >
                    <div className="icon">{templatesIcon}</div>
                  </div>
                  <div className="childBox" style={{ display: showChildBox ? 'block' : 'none' }}>
                    <Link className={`item child-item ${isActive('allChains') ? 'active' : ''}`} href="/allChains">
                      All Chains
                    </Link>
                    <Link className={`item child-item ${isActive('near') ? 'active' : ''}`} href="/near">
                      NEAR(4)
                    </Link>
                    <Link
                      className={`item child-item ${isActive('polygon-zkevm') ? 'active' : ''}`}
                      href="/polygon-zkevm"
                    >
                      Polygon zkEVM(5)
                    </Link>
                    <Link className={`item child-item ${isActive('mantle') ? 'active' : ''}`} href="/mantle">
                      Mantle(2)
                      <span className="newIcon">{newIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('base') ? 'active' : ''}`} href="/base">
                      Base(1)
                      <span className="newIcon">{newIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('arbitrum') ? 'active' : ''}`} href="/arbitrum">
                      Arbitrum(2)
                      <span className="newIcon">{newIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('bsc') ? 'active' : ''}`} href="/bsc">
                      BSC(1)
                      <span className="newIcon">{newIcon}</span>
                    </Link>

                    <Link className={`item child-item ${isActive('linea') ? 'active' : ''}`} href="/linea">
                      Linea(1) <span className="newIcon">{newIcon}</span>
                    </Link>

                    <Link className={`item child-item ${isActive('metis') ? 'active' : ''} `} href="/metis">
                      Metis(1) <span className="soonIcon"> {soonIcon}</span>
                    </Link>

                    <Link className={`item child-item ${isActive('polygon') ? 'active' : ''} `} href="/polygon">
                      Polygon(1)
                      <span className="newIcon">{newIcon}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('Optimism') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Optimism
                      <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('avalanche') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Avalanche
                      <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('zkSync') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      zkSync
                      <span className="soonIcon"> {soonIcon}</span>
                    </Link>

                    <Link
                      className={`item child-item ${isActive('Scroll') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Scroll <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('Gnosis') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Gnosis <span className="soonIcon"> {soonIcon}</span>
                    </Link>

                    <Link
                      className={`item child-item ${isActive('Berachain') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Berachain <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('Monad') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Monad <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('Taiko') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Taiko <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="logo">{shanshanLogo}</div>
              <div className="menu">
                <Link className={`item ${router.asPath == '/' ? 'active' : ''}`} href="/">
                  <div className="icon">{homeIcon}</div>Home
                  <span className="bag">{router.asPath == '/' ? visible_bag : null}</span>
                </Link>
                <div>
                  <div
                    onClick={() => {
                      setOpenWarmPc(!openWarmPc);
                    }}
                    className={`item parentItem ${warmActive ? 'active' : ''}`}
                  >
                    <div className="icon">{zkevmIcon}</div>Warm up
                    <ArrowPcIcon
                      className="arrow"
                      style={{
                        transform: openWarmPc ? '' : 'rotate(180deg)',
                      }}
                    ></ArrowPcIcon>
                  </div>
                  <div className={`${openWarmPc ? 'show' : 'hidden'}`}>
                    <Link className={`item child-item ${isActive('warmup') ? 'active' : ''}`} href="/warmup">
                      Polygon zkEVM<span className="bag">{isActive('warmup') ? visible_bag : null}</span>
                    </Link>
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => {
                      setOpenChainsPc(!openChainsPc);
                    }}
                    className={`item parentItem ${nearActive ? 'active' : ''}`}
                  >
                    <div className="icon">{templatesIcon}</div>Chains
                    <ArrowPcIcon
                      className="arrow"
                      style={{
                        transform: openChainsPc ? '' : 'rotate(180deg)',
                      }}
                    ></ArrowPcIcon>
                  </div>
                  <div className={`${openChainsPc ? 'show' : 'hidden'}`}>
                    <Link className={`item child-item ${isActive('allChains') ? 'active' : ''}`} href="/allChains">
                      All Chains<span className="bag">{isActive('allChains') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('near') ? 'active' : ''}`} href="/near">
                      NEAR(4)<span className="bag">{isActive('near') ? visible_bag : null}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('polygon-zkevm') ? 'active' : ''}`}
                      href="/polygon-zkevm"
                    >
                      Polygon zkEVM(5)<span className="bag">{isActive('polygon-zkevm') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('mantle') ? 'active' : ''}`} href="/mantle">
                      Mantle(2)<span className="newIcon">{newIcon}</span>
                      <span className="bag">{isActive('mantle') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('base') ? 'active' : ''}`} href="/base">
                      Base(1)<span className="newIcon">{newIcon}</span>
                      <span className="bag">{isActive('base') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('arbitrum') ? 'active' : ''}`} href="/arbitrum">
                      Arbitrum(2) <span className="newIcon">{newIcon}</span>
                      <span className="bag">{isActive('arbitrum') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('bsc') ? 'active' : ''}`} href="/bsc">
                      BSC(1) <span className="newIcon">{newIcon}</span>
                      <span className="bag">{isActive('bsc') ? visible_bag : null}</span>
                    </Link>

                    <Link className={`item child-item ${isActive('linea') ? 'active' : ''} `} href="/linea">
                      Linea(1)<span className="newIcon">{newIcon}</span>
                      <span className="bag">{isActive('linea') ? visible_bag : null}</span>
                    </Link>

                    <Link className={`item child-item ${isActive('metis') ? 'active' : ''} `} href="/metis">
                      Metis(1) <span className="newIcon">{newIcon}</span>
                      <span className="bag">{isActive('metis') ? visible_bag : null}</span>
                    </Link>

                    <Link className={`item child-item ${isActive('polygon') ? 'active' : ''} `} href="/polygon">
                      Polygon(1) <span className="newIcon">{newIcon}</span>
                      <span className="bag">{isActive('polygon') ? visible_bag : null}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('Optimism') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Optimism <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('Optimism') ? visible_bag : null}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('avalanche') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                      
                    >
                      Avalanche <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('avalanche') ? visible_bag : null}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('zkSync') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      zkSync <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('zkSync') ? visible_bag : null}</span>
                    </Link>

                    <Link
                      className={`item child-item ${isActive('Scroll') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Scroll <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('Scroll') ? visible_bag : null}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('Gnosis') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Gnosis <span className="Gnosis"> {soonIcon}</span>
                      <span className="bag">{isActive('Scroll') ? visible_bag : null}</span>
                    </Link>

                    <Link
                      className={`item child-item ${isActive('Berachain') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Berachain <span className="Berachain"> {soonIcon}</span>
                      <span className="bag">{isActive('Berachain') ? visible_bag : null}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('Monad') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Monad <span className="Monad"> {soonIcon}</span>
                      <span className="bag">{isActive('Monad') ? visible_bag : null}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('Metis') ? 'active' : ''} disabled`}
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      Taiko <span className="Taiko"> {soonIcon}</span>
                      <span className="bag">{isActive('Taiko') ? visible_bag : null}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </>
  );
};

const homeIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.6488 7.28424L10.3259 0.646165C9.95621 0.235971 9.42099 0 8.85402 0C8.29613 0 7.76091 0.233766 7.40712 0.621906L0.356321 7.28204C0.00480133 7.63269 -0.0972526 8.13992 0.0977841 8.59201C0.292821 9.04411 0.744127 9.32639 1.24759 9.32639H1.8826V16.0968C1.8826 17.1465 2.74665 18 3.82616 18H6.85376C7.24611 18 7.59536 17.6913 7.59536 17.3097V12.8042C7.59536 12.6123 7.72463 12.4425 7.92193 12.4425H10.0583C10.2556 12.4425 10.4052 12.6146 10.4052 12.8042V17.3075C10.4052 17.6913 10.7341 17.9978 11.1264 17.9978H14.154C15.2335 17.9978 16.118 17.1465 16.118 16.0946V9.32419H16.7507C17.2519 9.32419 17.7032 9.0419 17.8983 8.59201C18.0979 8.14433 17.9981 7.63489 17.6488 7.28424Z"
      fill="currentColor"
    />
  </svg>
);

const templatesIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.998 4.51323C17.998 4.49288 17.9898 4.47252 17.9878 4.45216C17.9837 4.38295 17.9756 4.31373 17.9573 4.24655C17.9451 4.20787 17.9268 4.17326 17.9105 4.13662C17.8902 4.0898 17.8739 4.04298 17.8475 4.00023C17.8231 3.96155 17.7925 3.92694 17.7641 3.89233C17.7356 3.85773 17.7092 3.82108 17.6746 3.79055C17.638 3.75594 17.5973 3.72947 17.5566 3.70097C17.5322 3.68265 17.5098 3.66026 17.4834 3.64397C17.4712 3.63787 17.457 3.63379 17.4447 3.62769C17.4285 3.61954 17.4163 3.60529 17.398 3.59715L10.2977 0.242253C9.8746 0.0427505 9.4007 0 9.07732 0C8.59325 0 8.13359 0.0956797 7.78376 0.266682L0.587848 3.77426C0.225815 3.95137 -0.00401466 4.30966 5.31251e-05 4.70052C5.31251e-05 4.70866 0.004121 4.71477 0.004121 4.72495C0.004121 4.73309 5.31251e-05 4.74124 5.31251e-05 4.74938V13.3361C5.31251e-05 13.9346 0.528865 14.6329 1.20208 14.9484L8.19461 17.8819C8.35122 17.9613 8.52206 18 8.69494 18C8.82511 18 8.95325 17.9695 9.07732 17.9226C9.19121 17.9084 9.30511 17.884 9.41087 17.8351L16.7675 14.7367C17.4692 14.4069 18 13.7066 18 13.1102V4.52341V4.51934C17.998 4.5173 17.998 4.51527 17.998 4.51323ZM9.2502 7.10269C9.12206 7.15359 8.7641 7.15969 8.64816 7.12101L3.47598 4.67813L8.75393 2.10699C8.78037 2.09477 8.8963 2.0622 9.07732 2.0622C9.22782 2.0622 9.32545 2.0846 9.35392 2.09478L14.52 4.53563L9.2502 7.10269ZM15.8481 12.8679C15.84 12.874 15.8319 12.8781 15.8258 12.8822L9.96816 15.5856L9.7668 9.21782C9.77901 9.20968 9.79121 9.20154 9.80545 9.19543L15.8502 6.21307V12.8679H15.8481Z"
      fill="currentColor"
    />
  </svg>
);

const zkevmIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1_303)">
      <path
        d="M19.0929 11.5086C18.9929 11.5084 18.8938 11.528 18.8014 11.566C18.7089 11.6041 18.6249 11.6601 18.554 11.7306C18.4832 11.8012 18.4269 11.885 18.3885 11.9774C18.3501 12.0697 18.3302 12.1686 18.33 12.2686C18.33 12.471 18.4104 12.665 18.5534 12.8081C18.6965 12.9511 18.8905 13.0315 19.0929 13.0315C19.2952 13.0315 19.4892 12.9511 19.6323 12.8081C19.7753 12.665 19.8557 12.471 19.8557 12.2686C19.8555 12.1686 19.8356 12.0697 19.7972 11.9774C19.7588 11.885 19.7025 11.8012 19.6317 11.7306C19.5609 11.6601 19.4768 11.6041 19.3844 11.566C19.2919 11.528 19.1928 11.5084 19.0929 11.5086ZM18.4743 8.45149C18.4743 8.65381 18.5547 8.84785 18.6977 8.99091C18.8408 9.13397 19.0348 9.21435 19.2371 9.21435C19.4395 9.21435 19.6335 9.13397 19.7766 8.99091C19.9196 8.84785 20 8.65381 20 8.45149C20 8.24917 19.9196 8.05513 19.7766 7.91207C19.6335 7.769 19.4395 7.68863 19.2371 7.68863C19.0348 7.68863 18.8408 7.769 18.6977 7.91207C18.5547 8.05513 18.4743 8.24917 18.4743 8.45149ZM12.2814 18.2943C12.0759 18.2928 11.8782 18.3729 11.7317 18.517C11.5852 18.6611 11.5019 18.8574 11.5 19.0629C11.5 19.4872 11.85 19.8315 12.2814 19.8315C12.3833 19.8324 12.4844 19.8133 12.5788 19.7752C12.6733 19.7371 12.7593 19.6807 12.832 19.6093C12.9047 19.538 12.9627 19.453 13.0025 19.3592C13.0424 19.2655 13.0634 19.1648 13.0643 19.0629C13.0634 18.961 13.0424 18.8604 13.0025 18.7666C12.9627 18.6728 12.9047 18.5879 12.832 18.5165C12.7593 18.4451 12.6733 18.3888 12.5788 18.3507C12.4844 18.3125 12.3833 18.2934 12.2814 18.2943ZM17.71 14.6058C17.5068 14.6069 17.3123 14.6886 17.1693 14.833C17.0263 14.9773 16.9464 15.1726 16.9471 15.3758C16.9471 15.8001 17.2886 16.1443 17.71 16.1443C17.913 16.1432 18.1072 16.0617 18.2502 15.9176C18.3932 15.7736 18.4732 15.5787 18.4729 15.3758C18.4734 15.2751 18.4541 15.1753 18.4161 15.0821C18.378 14.9889 18.322 14.9041 18.2511 14.8326C18.1803 14.7611 18.096 14.7042 18.0031 14.6653C17.9103 14.6264 17.8107 14.6061 17.71 14.6058ZM15.3914 16.9043C15.1871 16.9066 14.992 16.9899 14.849 17.1358C14.7059 17.2818 14.6267 17.4786 14.6286 17.6829C14.6286 18.1129 14.97 18.4615 15.3914 18.4615C15.5958 18.4592 15.7909 18.376 15.9339 18.23C16.0769 18.084 16.1562 17.8873 16.1543 17.6829C16.1562 17.4786 16.0769 17.2818 15.9339 17.1358C15.7909 16.9899 15.5958 16.9066 15.3914 16.9043ZM10 18.5715C8.87389 18.5746 7.75835 18.3544 6.71792 17.9235C5.67748 17.4927 4.73281 16.8598 3.93857 16.0615C3.14141 15.2664 2.50927 14.3216 2.07851 13.2813C1.64776 12.2411 1.42688 11.126 1.42857 10.0001C1.42546 8.87395 1.6457 7.75841 2.07653 6.71798C2.50737 5.67754 3.14026 4.73287 3.93857 3.93863C4.73371 3.14153 5.67855 2.50944 6.71878 2.07868C7.75901 1.64793 8.87411 1.42702 10 1.42863C11.1261 1.42552 12.2416 1.64576 13.2821 2.0766C14.3225 2.50743 15.2672 3.14032 16.0614 3.93863C16.8445 4.71974 17.4684 5.64543 17.8986 6.66435L17.9271 6.73435L19.2486 6.19006C18.3652 4.05073 16.7674 2.28392 14.7272 1.19076C12.6871 0.0975995 10.3311 -0.254259 8.0606 0.195151C5.79013 0.644562 3.74576 1.86743 2.27592 3.65533C0.806088 5.44324 0.00175235 7.68554 0 10.0001C0 12.6522 1.05357 15.1958 2.92893 17.0711C4.8043 18.9465 7.34784 20.0001 10 20.0001V18.5715Z"
        fill="currentColor"
      />
      <path
        d="M13.6144 8.66574H12.143C11.8244 8.66574 10.943 8.82431 10.633 8.63717C10.5744 8.42288 10.7701 8.03145 10.8215 7.84574L11.2758 6.22145L11.9387 3.85717C12.0244 3.54859 11.6201 3.41717 11.4501 3.65002C9.68868 6.07717 7.92297 8.50288 6.15726 10.9286C6.0344 11.0986 6.20011 11.3315 6.38868 11.3315H8.53583C8.68726 11.3315 9.25297 11.2429 9.34726 11.3757C9.43297 11.4943 9.26726 11.8386 9.23011 11.9715L8.06154 16.1429C7.9744 16.45 8.38011 16.5815 8.54868 16.3486L13.843 9.07145C13.9673 8.90002 13.8001 8.66574 13.6144 8.66574Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_303">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const shanshanLogoSvg = (
  <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.91839 15.6483C1.39153 13.3488 3.87506 7.45045 3.87506 7.45045L17.178 6.56635C19.7509 5.87693 22.3955 7.40382 23.0849 9.97673L28.7103 19.2472C27.806 23.7688 27.0567 26.3322 24.4837 27.0216L11.0003 30.9079C8.42742 31.5973 5.78278 30.0704 5.09337 27.4975L1.91839 15.6483Z"
      fill="#EBF479"
    />
    <path
      d="M3.5883 10.6389C2.8783 7.98911 4.45079 5.2655 7.10054 4.5555L19.3036 1.28569C21.9534 0.57569 24.677 2.14817 25.387 4.79793L28.6568 17.001C29.3668 19.6508 27.7943 22.3744 25.1446 23.0844L12.9415 26.3542C10.2917 27.0642 7.56811 25.4917 6.85811 22.842L3.5883 10.6389Z"
      fill="black"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.625 2.48514L7.42193 5.75495C5.43462 6.28745 4.25525 8.33016 4.78775 10.3175L8.05756 22.5206C8.59006 24.5079 10.6328 25.6872 12.6201 25.1547L24.8232 21.8849C26.8105 21.3524 27.9899 19.3097 27.4574 17.3224L24.1875 5.11932C23.655 3.132 21.6123 1.95264 19.625 2.48514ZM7.10054 4.5555C4.45079 5.2655 2.8783 7.98911 3.5883 10.6389L6.85811 22.842C7.56811 25.4917 10.2917 27.0642 12.9415 26.3542L25.1446 23.0844C27.7943 22.3744 29.3668 19.6508 28.6568 17.001L25.387 4.79793C24.677 2.14817 21.9534 0.57569 19.3036 1.28569L7.10054 4.5555Z"
      fill="#EBF479"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.0454 7.9507L11.7892 8.82321C11.2557 8.96615 10.9391 9.51449 11.0821 10.048L11.4412 11.3883C11.5841 11.9217 12.1325 12.2383 12.6659 12.0954L15.6242 11.3027C16.7112 11.0114 17.8286 11.6565 18.1199 12.7436C18.4112 13.8307 17.7661 14.948 16.679 15.2393L13.7208 16.032C13.1873 16.1749 12.8707 16.7233 13.0136 17.2567L13.3879 18.6533C13.5308 19.1868 14.0791 19.5034 14.6126 19.3604L17.8689 18.4879C20.7786 17.7083 22.5054 14.7174 21.7258 11.8076C20.9461 8.89782 17.9552 7.17103 15.0454 7.9507Z"
      fill="#EBF479"
    />
  </svg>
);

const dapdapText = (
  <svg width="83" height="17" viewBox="0 0 83 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 0H5.86531C7.2777 0 8.52661 0.281169 9.61205 0.843507C10.7106 1.40584 11.5606 2.1905 12.1622 3.19748C12.7768 4.20446 13.0842 5.35529 13.0842 6.64997C13.0842 8.01005 12.7834 9.20665 12.1818 10.2398C11.5933 11.2729 10.7498 12.0772 9.65129 12.6526C8.56584 13.2149 7.30385 13.4961 5.86531 13.4961H0V0ZM5.66915 9.96515C6.64997 9.96515 7.3954 9.65783 7.90542 9.04318C8.42853 8.41545 8.69008 7.60464 8.69008 6.61074C8.69008 5.66915 8.43507 4.92373 7.92504 4.37447C7.42809 3.81213 6.67613 3.53096 5.66915 3.53096H4.33523V9.96515H5.66915Z"
      fill="#EBF479"
    />
    <path
      d="M19.0215 13.653C18.1715 13.653 17.3737 13.4307 16.6283 12.9861C15.896 12.5284 15.3075 11.9137 14.8628 11.1421C14.4182 10.3575 14.1959 9.48782 14.1959 8.53315C14.1959 7.59156 14.4182 6.74152 14.8628 5.98301C15.3075 5.21143 15.9025 4.60986 16.6479 4.1783C17.3933 3.74674 18.1845 3.53096 19.0215 3.53096C19.7015 3.53096 20.3293 3.72059 20.9047 4.09984C21.4932 4.47909 21.9378 5.04796 22.2386 5.80647V3.53096H26.3581V13.4961H22.2386V11.6718C21.5847 12.9926 20.5124 13.653 19.0215 13.653ZM20.2966 10.5536C20.8197 10.5536 21.2643 10.3706 21.6305 10.0044C22.0097 9.62513 22.2125 9.1805 22.2386 8.67047V8.51353C22.2125 7.99043 22.0032 7.54579 21.6109 7.17962C21.2316 6.81344 20.7935 6.63036 20.2966 6.63036C19.7473 6.63036 19.2765 6.82652 18.8842 7.21885C18.5049 7.5981 18.3153 8.05582 18.3153 8.592C18.3153 9.14126 18.5115 9.60552 18.9038 9.98477C19.2961 10.364 19.7604 10.5536 20.2966 10.5536Z"
      fill="#EBF479"
    />
    <path
      d="M28.345 3.80559H32.4841V5.51222C33.1118 4.19138 34.1776 3.53096 35.6815 3.53096C36.5577 3.53096 37.362 3.75328 38.0944 4.19792C38.8398 4.62948 39.4217 5.23105 39.8402 6.00263C40.2718 6.77421 40.4876 7.63733 40.4876 8.592C40.4876 9.54667 40.2652 10.4098 39.8206 11.1814C39.389 11.953 38.8005 12.5611 38.0551 13.0057C37.3228 13.4373 36.5381 13.653 35.7011 13.653C34.2103 13.653 33.1379 12.9926 32.4841 11.6718V16.0462L28.345 16.8309V3.80559ZM34.4457 10.5536C34.9819 10.5536 35.4396 10.3575 35.8189 9.96515C36.1981 9.57282 36.3877 9.11511 36.3877 8.592C36.3877 8.04274 36.1916 7.57848 35.7992 7.19923C35.42 6.81998 34.9688 6.63036 34.4457 6.63036C33.9095 6.63036 33.4518 6.81998 33.0725 7.19923C32.6933 7.56541 32.5037 8.00351 32.5037 8.51353V8.592C32.5037 9.14126 32.6933 9.60552 33.0725 9.98477C33.4649 10.364 33.9226 10.5536 34.4457 10.5536Z"
      fill="#EBF479"
    />
    <path
      d="M42.1638 0H48.0292C49.4415 0 50.6905 0.281169 51.7759 0.843507C52.8744 1.40584 53.7245 2.1905 54.326 3.19748C54.9407 4.20446 55.248 5.35529 55.248 6.64997C55.248 8.01005 54.9472 9.20665 54.3457 10.2398C53.7572 11.2729 52.9137 12.0772 51.8151 12.6526C50.7297 13.2149 49.4677 13.4961 48.0292 13.4961H42.1638V0ZM47.833 9.96515C48.8138 9.96515 49.5592 9.65783 50.0693 9.04318C50.5924 8.41545 50.8539 7.60464 50.8539 6.61074C50.8539 5.66915 50.5989 4.92373 50.0889 4.37447C49.5919 3.81213 48.84 3.53096 47.833 3.53096H46.4991V9.96515H47.833Z"
      fill="#EBF479"
    />
    <path
      d="M61.1854 13.653C60.3353 13.653 59.5376 13.4307 58.7921 12.9861C58.0598 12.5284 57.4713 11.9137 57.0267 11.1421C56.582 10.3575 56.3597 9.48782 56.3597 8.53315C56.3597 7.59156 56.582 6.74152 57.0267 5.98301C57.4713 5.21143 58.0663 4.60986 58.8118 4.1783C59.5572 3.74674 60.3484 3.53096 61.1854 3.53096C61.8654 3.53096 62.4931 3.72059 63.0685 4.09984C63.657 4.47909 64.1017 5.04796 64.4025 5.80647V3.53096H68.5219V13.4961H64.4025V11.6718C63.7486 12.9926 62.6762 13.653 61.1854 13.653ZM62.4604 10.5536C62.9835 10.5536 63.4282 10.3706 63.7943 10.0044C64.1736 9.62513 64.3763 9.1805 64.4025 8.67047V8.51353C64.3763 7.99043 64.1671 7.54579 63.7747 7.17962C63.3955 6.81344 62.9574 6.63036 62.4604 6.63036C61.9112 6.63036 61.4404 6.82652 61.048 7.21885C60.6688 7.5981 60.4792 8.05582 60.4792 8.592C60.4792 9.14126 60.6753 9.60552 61.0677 9.98477C61.46 10.364 61.9242 10.5536 62.4604 10.5536Z"
      fill="#EBF479"
    />
    <path
      d="M70.5088 3.80559H74.6479V5.51222C75.2756 4.19138 76.3415 3.53096 77.8454 3.53096C78.7216 3.53096 79.5259 3.75328 80.2582 4.19792C81.0036 4.62948 81.5856 5.23105 82.0041 6.00263C82.4356 6.77421 82.6514 7.63733 82.6514 8.592C82.6514 9.54667 82.4291 10.4098 81.9845 11.1814C81.5529 11.953 80.9644 12.5611 80.219 13.0057C79.4866 13.4373 78.702 13.653 77.865 13.653C76.3741 13.653 75.3018 12.9926 74.6479 11.6718V16.0462L70.5088 16.8309V3.80559ZM76.6096 10.5536C77.1457 10.5536 77.6034 10.3575 77.9827 9.96515C78.362 9.57282 78.5516 9.11511 78.5516 8.592C78.5516 8.04274 78.3554 7.57848 77.9631 7.19923C77.5838 6.81998 77.1327 6.63036 76.6096 6.63036C76.0734 6.63036 75.6156 6.81998 75.2364 7.19923C74.8571 7.56541 74.6675 8.00351 74.6675 8.51353V8.592C74.6675 9.14126 74.8571 9.60552 75.2364 9.98477C75.6287 10.364 76.0864 10.5536 76.6096 10.5536Z"
      fill="#EBF479"
    />
  </svg>
);

const shanshanLogo = (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    {shanshanLogoSvg}

    {dapdapText}
  </div>
);

const shanshanPutLogo = (
  <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.91839 15.6483C1.39153 13.3488 3.87506 7.45045 3.87506 7.45045L17.178 6.56635C19.7509 5.87693 22.3955 7.40382 23.0849 9.97673L28.7103 19.2472C27.806 23.7688 27.0567 26.3322 24.4837 27.0216L11.0003 30.9079C8.42742 31.5973 5.78278 30.0704 5.09337 27.4975L1.91839 15.6483Z"
      fill="#EBF479"
    />
    <path
      d="M3.5883 10.6387C2.8783 7.98899 4.45079 5.26537 7.10054 4.55537L19.3036 1.28557C21.9534 0.575568 24.677 2.14805 25.387 4.79781L28.6568 17.0009C29.3668 19.6506 27.7943 22.3743 25.1446 23.0843L12.9415 26.3541C10.2917 27.0641 7.56811 25.4916 6.85811 22.8418L3.5883 10.6387Z"
      fill="black"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.625 2.48502L7.42193 5.75483C5.43462 6.28733 4.25525 8.33004 4.78775 10.3174L8.05756 22.5204C8.59006 24.5078 10.6328 25.6871 12.6201 25.1546L24.8232 21.8848C26.8105 21.3523 27.9899 19.3096 27.4574 17.3223L24.1875 5.1192C23.655 3.13188 21.6123 1.95252 19.625 2.48502ZM7.10054 4.55537C4.45079 5.26537 2.8783 7.98899 3.5883 10.6387L6.85811 22.8418C7.56811 25.4916 10.2917 27.0641 12.9415 26.3541L25.1446 23.0843C27.7943 22.3743 29.3668 19.6506 28.6568 17.0009L25.387 4.79781C24.677 2.14805 21.9534 0.575568 19.3036 1.28557L7.10054 4.55537Z"
      fill="#EBF479"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.0454 7.9507L11.7892 8.82321C11.2557 8.96615 10.9391 9.51449 11.0821 10.048L11.4412 11.3883C11.5841 11.9217 12.1325 12.2383 12.6659 12.0954L15.6242 11.3027C16.7112 11.0114 17.8286 11.6565 18.1199 12.7436C18.4112 13.8307 17.7661 14.948 16.679 15.2393L13.7208 16.032C13.1873 16.1749 12.8707 16.7233 13.0136 17.2567L13.3879 18.6533C13.5308 19.1868 14.0791 19.5034 14.6126 19.3604L17.8689 18.4879C20.7786 17.7083 22.5054 14.7174 21.7258 11.8076C20.9461 8.89782 17.9552 7.17103 15.0454 7.9507Z"
      fill="#EBF479"
    />
  </svg>
);

const putIcon = (
  <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 0H8C3.58172 0 0 3.58172 0 8V18C0 22.4183 3.58172 26 8 26H21V0Z" fill="#373A53" />
    <path d="M12 8L8 13L12 18" stroke="#E9F456" stroke-width="2" stroke-linecap="round" />
  </svg>
);

const m_menuIcon = (
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2H20" stroke="#E9F456" stroke-width="3" stroke-linecap="round" />
    <path d="M2 9H20" stroke="#E9F456" stroke-width="3" stroke-linecap="round" />
    <path d="M2 16H20" stroke="#E9F456" stroke-width="3" stroke-linecap="round" />
  </svg>
);

const m_closeIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.63599 14.3638L14.3639 1.63585" stroke="#E9F456" stroke-width="3" stroke-linecap="round" />
    <path d="M14.3643 14.3638L1.63634 1.63585" stroke="#E9F456" stroke-width="3" stroke-linecap="round" />
  </svg>
);

function ArrowIcon(props: any) {
  return (
    <svg {...props} width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 1L8.5 7L1 0.999999" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  );
}

function ArrowPcIcon(props: any) {
  return (
    <svg {...props} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 6L6 2L1 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  );
}
