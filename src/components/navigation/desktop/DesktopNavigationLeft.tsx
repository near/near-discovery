import Link from 'next/link';
import { useRouter } from 'next/router';
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
    height: 60px;
    border-radius: 16px;
    cursor: pointer;
    padding-left: 32px;
    font-size: 18px;
    font-weight: 500;
    margin: 6px 0;
    color: rgba(151, 154, 190, 1);
    text-decoration: none;
    .icon {
      display: flex;
      align-items: center;
      width: 32px;
    }
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
    width: 180px;
    background-color: #373a53;
    border-radius: 16px;
    padding: 10px 10px 4px 10px;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    .child-item {
      white-space: nowrap;
      height: 50px;
      padding: 0 16px;
      margin: 0 0 6px 0;
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
`;
const ContainerMobile = styled.div`
  display: none;
  position: relative;
  @media (max-width: 900px) {
    display: block;
  }

  .top_menu_icon {
    position: fixed;
    width: 100%;
    left: 0;
    align-items: center;
    justify-content: space-between;
    background-color: #1e202f;
    padding: 24px;
    z-index: 999;
    .right_p {
      position: absolute;
      right: 24px;
    }
  }
  .show {
    display: block;
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
      paths = ['ref-home', 'xBox', 'near'];
    } else if (name == 'polygon-zkevm') {
      paths = [
        'ZKEVMSwap.zkevm-swap',
        'ZKEVM-all-in-one',
        'ZKEVMSwap.zkevm-bridge',
        'ZKEVM.GAMMA',
        'ZKEVM.AAVE',
        'polygon-zkevm',
      ];
    } else if (name == 'base') {
      paths = ['Base.BaseDex', 'base'];
    } else if (name == 'warmup') {
      paths = ['ZKEVM.ExecuteRecords', 'ZKEVM.QuestionList', 'warmup'];
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

  const nearActive = isActive('near') || isActive('polygon-zkevm') || isActive('base');
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
              <span
                onClick={() => {
                  set_show_menu_list(false);
                }}
              >
                {m_closeIcon}
              </span>
            </div>
            <div className="list">
              <Link className={`item ${router.asPath == '/' ? 'active' : ''}`} href="/" onClick={closeMenu}>
                Home
              </Link>
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
                    className={`item child-item ${isActive('near') ? 'active' : ''}`}
                    href="/near"
                    onClick={closeMenu}
                  >
                    NEAR
                  </Link>
                  <Link
                    className={`item child-item ${isActive('polygon-zkevm') ? 'active' : ''}`}
                    href="/polygon-zkevm"
                    onClick={closeMenu}
                  >
                    Polygon zkEVM
                  </Link>
                  <Link
                    className={`item child-item ${isActive('base') ? 'active' : ''}`}
                    href="/base"
                    onClick={closeMenu}
                  >
                    Base
                  </Link>
                  <Link className={`item child-item ${isActive('mantle') ? 'active' : ''}`} href="" onClick={closeMenu}>
                    Mantle
                  </Link>
                  <Link className={`item child-item ${isActive('zkSync') ? 'active' : ''}`} href="" onClick={closeMenu}>
                    zkSync
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('arbitrum') ? 'active' : ''}`}
                    href=""
                    onClick={closeMenu}
                  >
                    Arbitrum
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('avalanche') ? 'active' : ''}`}
                    href=""
                    onClick={closeMenu}
                  >
                    Avalanche
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link className={`item child-item ${isActive('BSC') ? 'active' : ''}`} href="" onClick={closeMenu}>
                    BSC
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('Polygon') ? 'active' : ''}`}
                    href=""
                    onClick={closeMenu}
                  >
                    Polygon
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link
                    className={`item child-item ${isActive('Optimism') ? 'active' : ''}`}
                    href=""
                    onClick={closeMenu}
                  >
                    Optimism
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link className={`item child-item ${isActive('Linea') ? 'active' : ''}`} href="" onClick={closeMenu}>
                    Linea
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                  <Link className={`item child-item ${isActive('Metis') ? 'active' : ''}`} href="" onClick={closeMenu}>
                    Metis
                    <span className="soonIcon"> {soonIcon}</span>
                  </Link>
                </div>
              </div>
              <Link className={`item ${isActive('warmup') ? 'active' : ''}`} onClick={closeMenu} href="/warmup">
                zkEVM Warm up
              </Link>
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
                    setShowChildBox(true);
                  }}
                  onMouseLeave={() => {
                    setShowChildBox(false);
                  }}
                >
                  <div
                    className={`item ${
                      isActive('near') || isActive('polygon-zkevm') || isActive('base') ? 'active' : ''
                    }`}
                  >
                    <div className="icon">{templatesIcon}</div>
                  </div>
                  <div className="childBox" style={{ display: showChildBox ? 'block' : 'none' }}>
                    <Link className={`item child-item ${isActive('near') ? 'active' : ''}`} href="/near">
                      NEAR
                    </Link>
                    <Link
                      className={`item child-item ${isActive('polygon-zkevm') ? 'active' : ''}`}
                      href="/polygon-zkevm"
                    >
                      Polygon zkEVM
                    </Link>
                    <Link className={`item child-item ${isActive('base') ? 'active' : ''}`} href="/base">
                      Base
                    </Link>
                    <Link className={`item child-item ${isActive('mantle') ? 'active' : ''}`} href="">
                      Mantle
                    </Link>
                    <Link className={`item child-item ${isActive('zkSync') ? 'active' : ''}`} href="">
                      zkSync <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('arbitrum') ? 'active' : ''}`} href="">
                      Arbitrum <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('avalanche') ? 'active' : ''}`} href="">
                      Avalanche <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('BSC') ? 'active' : ''}`} href="">
                      BSC <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('polygon') ? 'active' : ''}`} href="">
                      Polygon <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('Optimism') ? 'active' : ''}`} href="">
                      Optimism <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('Linea') ? 'active' : ''}`} href="">
                      Linea <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('Metis') ? 'active' : ''}`} href="">
                      Metis <span className="soonIcon"> {soonIcon}</span>
                    </Link>
                  </div>
                </div>
                <Link className={`item ${isActive('warmup') ? 'active' : ''}`} href="/warmup">
                  <div className="icon">{zkevmIcon}</div>
                  {isActive('warmup') ? <span className="bag">{visible_bag}</span> : null}
                </Link>
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
                      setOpenChainsPc(!openChainsPc);
                    }}
                    className={`item parentItem ${
                      isActive('near') || isActive('polygon-zkevm') || isActive('base') ? 'active' : ''
                    }`}
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
                    <Link className={`item child-item ${isActive('near') ? 'active' : ''}`} href="/near">
                      NEAR<span className="bag">{isActive('near') ? visible_bag : null}</span>
                    </Link>
                    <Link
                      className={`item child-item ${isActive('polygon-zkevm') ? 'active' : ''}`}
                      href="/polygon-zkevm"
                    >
                      Polygon zkEVM<span className="bag">{isActive('polygon-zkevm') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('base') ? 'active' : ''}`} href="/base">
                      Base<span className="bag">{isActive('base') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('mantle') ? 'active' : ''}`} href="">
                      Mantle<span className="bag">{isActive('mantle') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('zkSync') ? 'active' : ''}`} href="">
                      zkSync <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('zkSync') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('arbitrum') ? 'active' : ''}`} href="">
                      Arbitrum <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('arbitrum') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('avalanche') ? 'active' : ''}`} href="">
                      Avalanche <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('avalanche') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('BSC') ? 'active' : ''}`} href="">
                      BSC <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('BSC') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('Polygon') ? 'active' : ''}`} href="">
                      Polygon <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('Polygon') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('Optimism') ? 'active' : ''}`} href="">
                      Optimism <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('Optimism') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('Linea') ? 'active' : ''}`} href="">
                      Linea <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('Linea') ? visible_bag : null}</span>
                    </Link>
                    <Link className={`item child-item ${isActive('Metis') ? 'active' : ''}`} href="">
                      Metis <span className="soonIcon"> {soonIcon}</span>
                      <span className="bag">{isActive('Metis') ? visible_bag : null}</span>
                    </Link>
                  </div>
                </div>
                <Link className={`item ${isActive('warmup') ? 'active' : ''}`} href="/warmup">
                  <div className="icon">{zkevmIcon}</div>
                  zkEVM Warm up
                  {isActive('warmup') ? <span className="bag">{visible_bag}</span> : null}
                </Link>
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
const shanshanLogo = (
  <svg width="59" height="23" viewBox="0 0 59 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.390781 22.04V2.24H5.81078V4.44H2.89078V19.84H5.81078V22.04H0.390781ZM15.3275 0.559999H17.8675V16.22H15.3275V0.559999ZM8.5275 4.88H10.9875V18.58H8.5275V4.88ZM22.4075 4.84H24.8875V18.5H22.4075V4.84ZM9.7275 14.76H23.5075V17.24H9.7275V14.76ZM28.7475 20.22L27.3075 19.52C27.6008 19.0133 27.8342 18.4667 28.0075 17.88C28.1808 17.3067 28.2675 16.76 28.2675 16.24V14.46H30.7275V16.24C30.7275 17.1733 30.5675 17.9467 30.2475 18.56C29.9275 19.1867 29.4275 19.74 28.7475 20.22ZM40.9525 0.559999H43.4925V16.22H40.9525V0.559999ZM34.1525 4.88H36.6125V18.58H34.1525V4.88ZM48.0325 4.84H50.5125V18.5H48.0325V4.84ZM35.3525 14.76H49.1325V17.24H35.3525V14.76ZM53.1725 22.04V19.84H56.0925V4.44H53.1725V2.24H58.5925V22.04H53.1725Z"
      fill="#EBF479"
    />
  </svg>
);

const shanshanPutLogo = (
  <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.593906 20.04V0.239999H6.01391V2.44H3.09391V17.84H6.01391V20.04H0.593906ZM16.9694 20.04V17.84H19.8894V2.44H16.9694V0.239999H22.3894V20.04H16.9694Z"
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
