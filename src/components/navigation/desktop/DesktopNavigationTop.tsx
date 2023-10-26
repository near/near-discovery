import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { menuData } from '@/data/menuData';

export const DesktopNavigationTop = () => {
  const Container = styled.div`
    color: #979abe;
    padding: 26px 36px 0 36px;
    width: 100%;
    .container-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
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
  `;

  const LogoContainer = styled.div`
    width: auto;
    align-items: center;
    padding-bottom: 20px;
  `;

  const MenuContainer = styled.div`
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    font-family: Gantari;
    font-size: 18px;
    font-weight: 500;
    margin: 0 24% 0 14%;
    align-items: center;
    .container-menu-item {
      margin: 0 10px;
      flex: 1;
      text-align: center;
      align-items: center;
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

  const LoginContainer = styled.div`
    width: auto;
    align-items: center;
  `;

  const logoUrl = 'https://ipfs.near.social/ipfs/bafkreifzlmyfwus3t24c5xwz5hg5j4p7tk2pa4lisq4qkxuyky5huxkz6e';

  const lockUrl = 'https://ipfs.near.social/ipfs/bafkreihwfdlygayrdbdjzofkt7js7dhaopyvys7pyglb7zdqvsao7ynt2u';

  const router = useRouter();
  const currentPath = router.pathname;

  const [showSubmenu, setShowSubmenu] = useState(false);
  const [activeParentIndex, setActiveParentIndex] = useState(-1);

  useEffect(() => {
    const parentIndex = menuData.findIndex(
      (item) =>
        item.path === currentPath || (item.children && item.children.some((child) => child.path === currentPath)),
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
    <Container>
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
                    <div className="current-version">
                      <img src={lockUrl} alt="" />
                      Lv.3
                    </div>
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
        <LoginContainer>
          <div className="container-login"></div>
        </LoginContainer>
      </div>

      {showSubmenu && (
        <div className={`container-submenu ${showSubmenu ? 'show' : ''}`}>
          {menuData[activeParentIndex]?.children?.map((child, childIndex) => (
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
                  className={`submenu-item ${child.path === currentPath ? 'active' : ''}`}
                >
                  <div className="submenu-item-icon" style={{ backgroundColor: child.bgColor }}>
                    <img src={child.icon} alt="" />
                  </div>
                  {child.title}
                </Link>
              )}
            </>
          ))}
        </div>
      )}
    </Container>
  );
};
