import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountItem from '@/components/AccountSider/components/AccountItem';
import Chain from '@/components/AccountSider/components/Chain';
import { menuData } from '@/data/menuData';
import useAccount from '@/hooks/useAccount';
import { useLayoutStore } from '@/stores/layout';
import { useSearchParams } from 'next/navigation';
import { dapps } from '@/config/dapps';

const BackRoute = styled.div`
  /* position: absolute; */
  width: 100%;

  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 6px;

  .back-icon {
    padding-left: 100px;
    padding-right: 8px;
  }

  .dapp-logo {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .dapp-name {
    font-size: 16px;
    font-style: italic;
    font-weight: 900;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: var(--button-color);
  }
`;

const backIcon = (
  <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12L2 6.5L7 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
);

const LoginContainer = styled.div`
  width: auto;
  align-items: center;
  display: flex;
  gap: 10px;
`;
const AccountWrapper = styled.div<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Container = styled.div`
  color: #979abe;
  padding: 20px 36px 0 36px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
  background: #000000;
  &.show-border {
    border-bottom: 1px solid #343838;
  }

  .container-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
  }
  .container-submenu {
    display: none;
    align-items: center;
    margin-top: 30px;
    z-index: 1;
    padding-bottom: 20px;
    margin: 0 -36px;
    padding: 20px 36px;
    &.show {
      display: flex;
      border-bottom: 1px solid #343838;
      animation: slideDown 0.5s ease forwards;
    }
    .submenu-item {
      margin: 5px 0;
      text-align: center;
      opacity: 0.5;
      background: #373a53;
      border-radius: 10px;
      padding: 4px 8px 4px 4px;
      font-size: 14px;
      margin-right: 14px;
      color: #ffffff;
      text-decoration: none;
      height: 32px;
      line-height: 26px;
      display: flex;
      .submenu-item-icon {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        align-items: center;
        border-radius: 10px;
        margin-right: 10px;
      }
      &:hover {
        opacity: 1;
      }
      &.active {
        background-color: #ebf479;
        color: #181a27;
        opacity: 1;
      }
    }
    .submenu-item-disable {
      cursor: not-allowed;
      &:hover {
        opacity: 0.5;
      }
    }
  }
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LogoContainer = styled.div`
  width: auto;
  align-items: center;
  padding-bottom: 20px;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  flex: 1;
  display: flex;
  justify-content: center;
  font-family: Gantari;
  font-size: 18px;
  font-weight: 500;

  gap: 50px;
  /* margin: 0 24% 0 14%; */
  align-items: center;
  .container-menu-item {
    display: flex;
    align-items: center;
    margin: 0 10px;
    flex: 1;
    text-align: center;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    color: #979abe;
    position: relative;
    &:hover {
      color: #ebf479;
    }
    &.active {
      font-weight: 700;
      color: #ebf479;
    }
    &.version {
      cursor: not-allowed;
      span {
        opacity: 0.6;
      }
      .current-version {
        margin-left: 6px;
        padding: 4px 14px 4px 8px;
        background: rgba(55, 58, 83, 0.5);
        border-radius: 10px;
        display: inline-block;
        font-family: Gantari;
        font-size: 12px;
        font-style: italic;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0em;
        text-align: left;
        white-space: nowrap;
        img {
          width: 12px;
          height: 12px;
          margin-right: 4px;
        }
      }
    }
    &.version:hover {
      color: #979abe;
    }
  }
`;

const logoUrl = 'https://ipfs.near.social/ipfs/bafkreifzlmyfwus3t24c5xwz5hg5j4p7tk2pa4lisq4qkxuyky5huxkz6e';

const lockUrl = 'https://ipfs.near.social/ipfs/bafkreihwfdlygayrdbdjzofkt7js7dhaopyvys7pyglb7zdqvsao7ynt2u';
const extendPaths = {
  '/near': ['/rainbow-bridge'],
  '/rainbow-bridge': ['/near'],
} as {
  [key: string]: string[];
};

export const DesktopNavigationTop = () => {
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { account } = useAccount();
  const router = useRouter();
  const currentPath = router.pathname;

  const query = router.query;
  // console.log('query: ', query, currentPath);

  const dappRoute = query.dappRoute;

  const dappConfig = dapps.find((item) => typeof dappRoute === 'string' && item.dappRoute.indexOf(dappRoute) > -1);

  const [showSubmenu, setShowSubmenu] = useState(false);
  const [activeParentIndex, setActiveParentIndex] = useState(-1);
  const [showBorder, setShowBorder] = useState(false);
  const hasSubmenu = activeParentIndex === 1 || activeParentIndex === 2;

  const search = useSearchParams();

  const dappLogo = search.get('logo') || dappConfig?.logo;

  const name = search.get('name') || dappConfig?.name;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBorder(scrollTop > 0 && !hasSubmenu);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasSubmenu]);

  useEffect(() => {
    const parentIndex = menuData.findIndex(
      (item) =>
        item.path === currentPath ||
        (item.children &&
          item.children.some(
            (child) =>
              child.path === currentPath ||
              (child.path && extendPaths[child.path] && extendPaths[child.path].includes(currentPath)),
          )),
    );

    setActiveParentIndex(parentIndex);
    setShowSubmenu(parentIndex === 1 || parentIndex === 2);
  }, [currentPath]);

  const handleMenuClick = (index: number, hasChildren: boolean) => {
    if (hasChildren) {
      if (index === activeParentIndex) {
        setShowSubmenu(!showSubmenu);
      } else {
        setShowSubmenu(true);
        setActiveParentIndex(index);
      }
    } else {
      setShowSubmenu(false);
      setActiveParentIndex(-1);
    }

    if (hasChildren && index !== activeParentIndex) {
      const firstChildPath = menuData[index]?.children?.[0]?.path;
      if (firstChildPath) {
        router.push(firstChildPath);
      }
    }
  };

  return (
    <Container className={showBorder ? 'show-border' : ''}>
      <div className="container-nav">
        <LogoContainer>
          <img src={logoUrl} alt="" />
        </LogoContainer>
        <MenuContainer>
          {menuData.map((item, index) => {
            const isActive =
              item.path === currentPath || (item.children && item.children.some((child) => child.path === currentPath));
            const isParentActive = activeParentIndex === index;
            const hasChildren = !!item.children;
            const className = `container-menu-item ${isActive || isParentActive ? 'active' : ''} ${
              item.version === false ? 'version' : ''
            }`;
            return item.children ? (
              <div key={index} className={className} onClick={() => handleMenuClick(index, hasChildren)}>
                <span>{item.title}</span>
              </div>
            ) : (
              <>
                {item.version === false ? (
                  <div key={index} className={className}>
                    <span>{item.title}</span>
                    <>
                      {item.level && (
                        <div className="current-version">
                          <img src={lockUrl} alt="" />
                          Lv.3
                        </div>
                      )}
                    </>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={item.path || ''}
                    className={className}
                    onClick={() => handleMenuClick(index, hasChildren)}
                  >
                    <span>{item.title}</span>
                  </Link>
                )}
              </>
            );
          })}
        </MenuContainer>
        {account ? (
          <LoginContainer>
            <Chain showName={false} />
            <AccountWrapper
              onClick={() => {
                setLayoutStore({ showAccountSider: true });
              }}
            >
              <AccountItem showCopy={false} logoSize={28} />
            </AccountWrapper>
          </LoginContainer>
        ) : (
          <div />
        )}
      </div>

      {showSubmenu && (
        <div className={`container-submenu ${showSubmenu ? 'show' : ''}`}>
          {menuData[activeParentIndex]?.children?.map((child, childIndex) => {
            const extendActive = extendPaths[child?.path || '']?.includes(currentPath);

            return (
              <>
                {child.disable ? (
                  <div key={childIndex} className="submenu-item submenu-item-disable">
                    <div className="submenu-item-icon" style={{ backgroundColor: child.bgColor }}>
                      <img src={child.icon} alt="" />
                    </div>
                    {child.title}
                  </div>
                ) : (
                  <Link
                    key={childIndex}
                    href={child.path || ''}
                    className={`submenu-item ${child.path === currentPath || extendActive ? 'active' : ''}`}
                  >
                    <div className="submenu-item-icon" style={{ backgroundColor: child.bgColor }}>
                      <img src={child.icon} alt="" />
                    </div>
                    {child.title}
                  </Link>
                )}
              </>
            );
          })}
        </div>
      )}

      {dappLogo && name && (
        <BackRoute>
          <Link className="back-icon" href="/">
            {backIcon}
          </Link>

          <img className="dapp-logo" src={dappLogo} />

          <div className="dapp-name">{name}</div>
        </BackRoute>
      )}
    </Container>
  );
};
