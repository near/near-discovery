import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

import { SMALL_SCREEN_LAYOUT_MAX_WIDTH } from './utils';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const overflowContain = css`
  // overflow: auto;
  scroll-behavior: smooth;
  overscroll-behavior: contain;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /*
    The "overflowContain" styles need to be used in combination with a child that is always
    at least 1px taller than the parent via "min-height: calc(100% + 1px)".

    This allows "overscroll-behavior: contain;" to prevent the <body> from scrolling. Setting
    "overflow: hidden;" on the <body> would break the "position: sticky;" behavior of the
    navigation - that's why we need to use this hack instead.

    https://stackoverflow.com/a/48954092
  */
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  min-width: 0;

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    display: none;
  }
`;

export const Logo = styled(Link)`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.9rem;
  padding: 1rem;
  width: 3.5rem;
  flex-shrink: 0;
  outline-offset: -0.75rem;
  transition: all var(--sidebar-expand-transition-speed), outline 0ms;

  &:focus-visible {
    outline: 2px solid var(--violet5);
  }

  img {
    height: 100%;
  }
`;

export const ToggleExpandButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sand11);
  border-radius: 0.9rem;
  padding: 1rem;
  width: 3.5rem;
  flex-shrink: 0;
  outline-offset: -0.75rem;
  transition: all var(--sidebar-expand-transition-speed), outline 0ms;

  &:focus-visible {
    outline: 2px solid var(--violet5);
  }

  &:hover {
    color: var(--sand12);
  }

  i {
    display: block;
    font-size: 1.25rem;
    line-height: 1.25rem;
    transition: all 150ms;
  }
`;

export const Section = styled.div<{
  $screen?: 'small' | 'large';
}>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--sand6);
  overflow: hidden;

  &:last-child {
    border-bottom: none;
  }

  .sidebar-auto-width-button {
    width: 100%;
  }

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    .sidebar-auto-width-button {
      width: min-content;
      white-space: nowrap;
    }
  }

  ${(p) =>
    p.$screen === 'small'
      ? css`
          @media (min-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
            display: none;
          }
        `
      : undefined}

  ${(p) =>
    p.$screen === 'large'
      ? css`
          @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
            display: none;
          }
        `
      : undefined}
`;

export const LoginSection = styled.div<{
  $screen?: 'small' | 'large';
}>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid var(--sand6);
  overflow: hidden;
  position: sticky;
  bottom: 0;
  background: var(--white);

  &:last-child {
    border-bottom: none;
  }

  .sidebar-auto-width-button {
    width: 100%;
  }

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    .sidebar-auto-width-button {
      width: min-content;
      white-space: nowrap;
    }
  }

  ${(p) =>
    p.$screen === 'small'
      ? css`
          @media (min-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
            display: none;
          }
        `
      : undefined}

  ${(p) =>
    p.$screen === 'large'
      ? css`
          @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
            display: none;
          }
        `
      : undefined}
`;

export const NavigationItemThumbnail = styled.div`
  --outline-color: rgba(0, 0, 0, 0.1);
  --outline-width: 1px;
  border-radius: 4px;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    border-radius: 4px;
    box-shadow: inset 0 0 0 var(--outline-width) var(--outline-color);
    transition: all 150ms;
  }

  img {
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border: none;
    outline: none;
  }
`;

export const LoginItem = styled.button<{
  $active: boolean;
  $expanded?: boolean;
  $type: 'featured' | 'standard' | 'simple';
}>`
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--sand11);
  font-size: 0.875rem;
  line-height: 1.2;
  letter-spacing: 0.28px;
  text-decoration: none !important;
  white-space: nowrap;
  cursor: pointer;
  transition: all 150ms;

  &:hover {
    color: var(--sand12);

    i {
      background: var(--sand3);
    }

    ${NavigationItemThumbnail} {
      --outline-color: rgba(0, 0, 0, 0.15);
    }
  }

  &:focus-visible {
    i,
    ${NavigationItemThumbnail} {
      --outline-color: var(--violet5);
      --outline-width: 2px;
    }
  }

  i {
    --outline-width: 1px;
    --outline-color: var(--sand6);
    outline: var(--outline-width) solid var(--outline-color);
    outline-offset: calc(var(--outline-width) * -1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
    font-size: 1.25rem;
    border-radius: 4px;
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
    background: var(--white);
    transition: all 150ms, outline 0ms;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all var(--sidebar-expand-transition-speed);
    font-weight: 600;
  }

  ${(p) =>
    p.$active || p.$expanded
      ? css`
          font-weight: 600;
          color: var(--sand12);
          i {
            --outline-color: var(--sand12) !important;
            --outline-width: 2px;
          }
        `
      : undefined}

  ${(p) =>
    p.$type === 'standard' && (p.$active || p.$expanded)
      ? css`
          i {
            background: var(--sand4);
          }
        `
      : undefined}

  ${(p) =>
    p.$type === 'standard'
      ? css`
          i {
            --outline-width: 0;
          }
        `
      : undefined}

  ${(p) =>
    p.$type === 'simple'
      ? css`
          border-radius: 4px;

          &:hover {
            background: var(--sand3);
          }

          i {
            --outline-color: transparent;
          }
        `
      : undefined}
  ${(p) =>
    p.$type === 'simple' && (p.$active || p.$expanded)
      ? css`
          font-weight: 600;
          color: var(--sand12);
          background: var(--sand4);

          i {
            --outline-color: transparent !important;
            color: var(--sand12);
            background: var(--sand4);
          }
        `
      : undefined}
  }
`;

export const NavigationItem = styled(Link)<{
  $active: boolean;
  $expanded?: boolean;
  $type: 'featured' | 'standard' | 'simple';
}>`
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--sand11);
  font-size: 0.875rem;
  line-height: 1.2;
  letter-spacing: 0.28px;
  text-decoration: none !important;
  white-space: nowrap;
  cursor: pointer;
  transition: all 150ms;

  &:hover {
    color: var(--sand12);

    i {
      background: var(--sand3);
    }

    ${NavigationItemThumbnail} {
      --outline-color: rgba(0, 0, 0, 0.15);
    }
  }

  &:focus-visible {
    i,
    ${NavigationItemThumbnail} {
      --outline-color: var(--violet5);
      --outline-width: 2px;
    }
  }

  i {
    --outline-width: 1px;
    --outline-color: var(--sand6);
    outline: var(--outline-width) solid var(--outline-color);
    outline-offset: calc(var(--outline-width) * -1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
    font-size: 1.25rem;
    border-radius: 4px;
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
    background: var(--white);
    transition: all 150ms, outline 0ms;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all var(--sidebar-expand-transition-speed);
  }

  ${(p) =>
    p.$active || p.$expanded
      ? css`
          font-weight: 600;
          color: var(--sand12);
          i {
            --outline-color: var(--sand12) !important;
            --outline-width: 2px;
          }
        `
      : undefined}

  ${(p) =>
    p.$type === 'standard' && (p.$active || p.$expanded)
      ? css`
          i {
            background: var(--sand4);
          }
        `
      : undefined}

  ${(p) =>
    p.$type === 'standard'
      ? css`
          i {
            --outline-width: 0;
          }
        `
      : undefined}

  ${(p) =>
    p.$type === 'simple'
      ? css`
          border-radius: 4px;

          &:hover {
            background: var(--sand3);
          }

          i {
            --outline-color: transparent;
          }
        `
      : undefined}
  ${(p) =>
    p.$type === 'simple' && (p.$active || p.$expanded)
      ? css`
          font-weight: 600;
          color: var(--sand12);
          background: var(--sand4);

          i {
            --outline-color: transparent !important;
            color: var(--sand12);
            background: var(--sand4);
          }
        `
      : undefined}
  }
`;

export const NavigationSimpleItem = styled(Link)<{
  $active: boolean;
}>`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 2.25rem;
  padding: 0.625rem;
  gap: 0.5rem;
  border-radius: 4px;
  color: var(--sand12);
  font-size: 0.875rem;
  line-height: 1.2;
  letter-spacing: 0.28px;
  text-decoration: none !important;
  white-space: nowrap;
  cursor: pointer;
  transition: all 150ms;

  &:hover {
    background: var(--sand3);

    i {
      color: var(--sand12);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--violet5);
    outline-offset: -2px;
  }

  i {
    color: var(--sand10);
    font-size: 1.25rem;
    transition: all 150ms;
  }

  ${(p) =>
    p.$active
      ? css`
          font-weight: 600;
          color: var(--sand12);
          background: var(--sand4);

          i {
            color: var(--sand12);
          }
        `
      : undefined}
`;

export const Stack = styled.div<{
  $frozenWidth?: boolean;
  $gap?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.$gap ?? '0'};
  width: ${(p) => (p.$frozenWidth ? 'calc(var(--sidebar-width-expanded) - 2rem)' : undefined)};
`;

export const SectionLabel = styled.p`
  all: unset;
  display: flex;
  align-items: center;
  font: var(--text-xs);
  color: var(--sand12);
  font-weight: 600;
  letter-spacing: 0.24px;
  white-space: nowrap;
  transition: all var(--sidebar-expand-transition-speed);
`;

export const SectionLabelIconLink = styled(Link)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 20px;
  color: var(--sand10);
  text-decoration: none !important;
  margin-left: auto;
  border-radius: 2px;
  cursor: pointer;
  transition: all 150ms, opacity 0;

  &:hover {
    color: var(--sand12);
  }

  &:focus-visible {
    outline: 2px solid var(--violet5);
  }
`;

export const OverflowContainChild = styled.div`
  min-height: calc(100% + 1px);
  display: flex;
  flex-direction: column;
`;

export const Sidebar = styled.div<{
  $expanded: boolean;
  $openedOnSmallScreens: boolean;
}>`
  position: sticky;
  z-index: 1010;
  top: 0;
  left: 0;
  width: var(--sidebar-width-expanded);

  height: 100dvh;
  ${overflowContain}

  flex-shrink: 0;
  flex-grow: 0;
  color: var(--sand11);
  background: var(--white);
  box-shadow: 1px 0 var(--sand6);
  transition: all var(--sidebar-expand-transition-speed);

  ${(p) =>
    p.$expanded
      ? undefined
      : css`
          width: var(--sidebar-width-collapsed);

          ${ToggleExpandButton} {
            width: var(--sidebar-width-collapsed);
          }

          ${NavigationItem} span,
          ${SectionLabelIconLink},
          ${SectionLabel},
          ${Logo} {
            pointer-events: none;
            opacity: 0;
            padding: 0;
            width: 0;
          }

          ${SectionLabel} {
            margin-bottom: -2rem;
          }
        `}

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    position: fixed;
    top: var(--header-height);
    height: calc(100dvh - var(--header-height));

    ${(p) =>
      p.$expanded
        ? css`
            width: 100vw;
            opacity: 1;
          `
        : undefined}

    ${(p) =>
      p.$openedOnSmallScreens
        ? undefined
        : css`
            width: 0;
            opacity: 0;
          `}
  }
`;

export const LargeScreenHeader = styled.header<{
  $scrolled: boolean;
}>`
  display: flex;
  position: sticky;
  height: 64px;
  top: 0;
  z-index: 1000;
  background: var(--white);
  box-shadow: ${(p) => (p.$scrolled ? '0 1px 0 var(--sand6)' : '0 0 0 var(--white)')};
  transition: all var(--sidebar-expand-transition-speed);

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    display: none;
  }
`;

export const LargeScreenHeaderActionWrapper = styled.div<{
  $width?: string;
  $alignItems?: string;
  $justifyContent?: string;
}>`
  margin-left: -2px;
  display: flex;
  height: 40px;
  width: ${(p) => p.$width ?? '40px'};
  align-items: ${(p) => p.$alignItems ?? 'center'};
  justify-content: ${(p) => p.$justifyContent ?? 'center'};

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    .profile-dropdown-name {
      display: none;
    }
  }
`;

export const LargeScreenHeaderNameWrapper = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  padding-left: 1rem;
  text-align: left;
  align-items: center;
`;

export const SmallScreenHeader = styled.header`
  display: none;
  position: sticky;
  top: 0;
  z-index: 1000;
  align-items: stretch;
  height: var(--header-height);
  background: var(--white);
  border-bottom: 1px solid var(--sand6);

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    display: flex;
  }
`;

export const SmallScreenHeaderLogo = styled(Link)`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  cursor: pointer;
  padding: 0 1.15rem;
  flex-shrink: 0;
  outline-offset: -2px;
  transition: all 150ms, outline 0ms;
  animation: ${fadeIn} var(--sidebar-expand-transition-speed);

  &:focus-visible {
    outline: 2px solid var(--violet5);
  }

  img {
    width: 2rem;
    height: 2rem;
  }
`;

export const SmallScreenHeaderIconButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sand11);
  padding: 1rem;
  width: 69px;
  flex-shrink: 0;
  outline-offset: -2px;
  transition: all 150ms, outline 0ms;
  animation: ${fadeIn} var(--sidebar-expand-transition-speed);

  &:focus-visible {
    outline: 2px solid var(--violet5);
  }

  &:hover {
    color: var(--sand12);
  }

  i {
    display: block;
    font-size: 2rem;
    line-height: 2rem;
    transition: all 150ms;
  }
`;

export const SmallScreenHeaderTitle = styled.p`
  all: unset;
  font: var(--text-l);
  color: var(--sand12);
  font-weight: 700;
  letter-spacing: 0.3px;
  align-self: center;
  margin-right: auto;
  margin-left: 1rem;
  animation: ${fadeIn} var(--sidebar-expand-transition-speed);
`;

export const SmallScreenHeaderActions = styled.div<{
  $hidden: boolean;
  $gap?: string;
}>`
  display: flex;
  align-items: center;
  height: 100%;
  opacity: 1;
  transition: all var(--sidebar-expand-transition-speed);
  gap: ${(p) => p.$gap ?? 'unset'};

  ${(p) =>
    p.$hidden
      ? css`
          overflow: hidden;
          opacity: 0;
          width: 0;
          pointer-events: none;
        `
      : undefined}
`;

export const SmallScreenNavigationBackground = styled.div<{
  $expanded: boolean;
}>`
  position: fixed;
  z-index: 999;
  top: var(--header-height);
  width: 0;
  height: calc(100dvh - var(--header-height));
  background: var(--white);
  transition: all var(--sidebar-expand-transition-speed);

  ${(p) =>
    p.$expanded
      ? css`
          width: 100vw;
          opacity: 1;
        `
      : undefined}
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  overflow: hidden;
  height: var(--header-height);

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    display: none;
  }
`;

export const DrawerTitle = styled.p`
  all: unset;
  font: var(--text-l);
  color: var(--sand12);
  font-weight: 700;
  letter-spacing: 0.3px;
  margin: -0.15rem 0;
`;

export const Drawer = styled.div<{
  $expanded: boolean;
  $openedOnSmallScreens: boolean;
}>`
  position: sticky;
  z-index: 1005;
  top: 0;
  left: 68px;

  height: 100dvh;
  ${overflowContain}

  width: 0;
  opacity: 0;
  background-color: red;
  flex-shrink: 0;
  flex-grow: 0;
  color: var(--sand11);
  background: var(--white);
  transition: all var(--sidebar-expand-transition-speed);

  ${(p) =>
    p.$expanded
      ? css`
          width: 256px;
          opacity: 1;
          box-shadow: 1px 0 var(--sand6);
        `
      : undefined}

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    position: fixed;
    top: var(--header-height);
    height: calc(100dvh - var(--header-height));
    box-shadow: none;

    ${(p) =>
      p.$expanded
        ? css`
            width: calc(100vw - var(--sidebar-width-collapsed));
          `
        : undefined}

    ${(p) =>
      p.$openedOnSmallScreens
        ? undefined
        : css`
            width: 0;
            opacity: 0;
          `}
  }
`;

export const ProfileDropdownSection = styled(Section)<{
  $expanded: boolean;
}>`
  position: sticky;
  bottom: 0;
  background: var(--white);
  border-top: 1px solid var(--sand6);

  @media (min-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    ${(p) =>
      p.$expanded
        ? css`
            .profile-dropdown-name {
              visibility: visible;
            }
          `
        : css`
            .profile-dropdown-name {
              visibility: hidden;
            }
          `}
  }
  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    display: none;
  }
`;

export const SearchSection = styled(Section)<{
  $expanded: boolean;
}>`
  padding: 0 1rem 1rem 1rem;

  @media (min-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    ${(p) =>
      p.$expanded
        ? css`
            ${SearchIconWrapper} {
              display: none;
            }
            ${SearchWrapper} {
              display: block;
            }
          `
        : css`
            ${SearchIconWrapper} {
              display: block;
            }
            ${SearchWrapper} {
              display: none;
            }
          `}
  }
  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    display: none;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px 10px;
  position: relative;
`;

export const SearchContainer = styled.div<{ $isFocus?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e3e3e0;
  border-radius: 25px;
  padding: 5px 10px;
  width: 250px;

  transition: all 0.3s ease-in-out;
  ${(props) =>
    props.$isFocus &&
    css`
      box-shadow: 0 0 5px 2px rgba(136, 0, 255, 0.5);
      border-color: #cfccf5;
    `}
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
  font-size: 16px;

  &::placeholder {
    color: #868682;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const SearchIcon = styled.div<{ $isFocus?: boolean }>`
  color: #868682;
  transition: color 0.3s ease-in-out;

  ${(props) =>
    props.$isFocus &&
    css`
      color: #6f42c1;
    `}
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 100%;
  padding: 12px 0;
`;

export const Tab = styled.button<{ $active?: boolean; $isFirst?: boolean; $isLast?: boolean }>`
  padding: 10px;
  border: none;
  cursor: pointer;
  flex: 1;
  border-bottom: 2px solid ${(props) => (props.$active ? '#007bff' : 'transparent')};
  background-color: white;
  font-size: 12px;
  &:hover {
    border-bottom: 2px solid #007bff;
  }
`;

export const ResultsPopup = styled.div<{ $show?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 550px;
  border-radius: 10px;
  /* max-height: 300px; */
  background-color: white;
  border: 1px solid #ccc;
  padding: 0 24px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  ${(props) =>
    props.$show
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`;

export const ResultItem = styled.div`
  padding: 10px;
  height: 300px;
  overflow-y: scroll;
`;

export const Footer = styled.div`
  text-align: right;
  width: 100%;
  padding: 16px;
  border-radius: 0 0 10px 10px;
`;

export const SearchIconWrapper = styled.div<{
  $expanded: boolean;
}>`
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--sand11);
  font-size: 0.875rem;
  line-height: 1.2;
  letter-spacing: 0.28px;
  text-decoration: none !important;
  white-space: nowrap;
  cursor: pointer;
  transition: all 150ms;

  &:hover {
    color: var(--sand12);

    i {
      background: var(--sand3);
    }
  }

  &:focus-visible {
    i {
      --outline-color: var(--violet5);
      --outline-width: 2px;
    }
  }

  i {
    --outline-width: 1px;
    --outline-color: var(--sand6);
    outline: var(--outline-width) solid var(--outline-color);
    outline-offset: calc(var(--outline-width) * -1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
    font-size: 1.25rem;
    border-radius: 4px;
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
    background: var(--white);
    transition: all 150ms, outline 0ms;
  }

  ${(p) =>
    p.$expanded
      ? css`
          // font-weight: 600;
          // color: var(--sand12);
          i {
            // --outline-color: var(--sand12) !important;
            // --outline-width: 2px;
          }
        `
      : undefined}
  }
`;
