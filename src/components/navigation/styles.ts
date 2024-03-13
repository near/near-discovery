import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
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
  transition: all var(--expand-transition-speed), outline 0;

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
  transition: all var(--expand-transition-speed), outline 0;

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

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-bottom: 1px solid var(--sand6);
  overflow: hidden;

  &:last-child {
    border-bottom: none;
  }
`;

export const NavigationItem = styled(Link)<{
  $active: boolean;
  $expanded?: boolean;
  $type: 'featured' | 'standard';
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
    transition: all 150ms, outline 0;
  }

  span {
    transition: all var(--expand-transition-speed);
  }

  ${(p) =>
    p.$active || p.$expanded
      ? css`
          font-weight: 600;
          color: var(--sand12);
          i {
            --outline-color: var(--sand12);
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
  $gap?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.$gap ?? '0'};
`;

export const SectionLabel = styled.p`
  all: unset;
  font: var(--text-xs);
  color: var(--sand12);
  font-weight: 600;
  letter-spacing: 0.24px;
  transition: all var(--expand-transition-speed);
`;

export const DrawerTitle = styled.p`
  all: unset;
  font: var(--text-l);
  color: var(--sand12);
  font-weight: 700;
  letter-spacing: 0.3px;
`;

export const Sidebar = styled.div<{
  $expanded: boolean;
}>`
  --sidebar-width: 257px;
  --expand-transition-speed: 300ms;
  position: sticky;
  z-index: 1000;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100dvh;
  overflow: auto;
  flex-shrink: 0;
  flex-grow: 0;
  color: var(--sand11);
  background: var(--white);
  border-right: 1px solid var(--sand6);
  transition: all var(--expand-transition-speed);

  ${(p) =>
    p.$expanded
      ? undefined
      : css`
          --sidebar-width: 69px;

          ${ToggleExpandButton} {
            width: calc(var(--sidebar-width) - 1px);
          }

          ${NavigationItem} span,
          ${SectionLabel},
          ${Logo} {
            pointer-events: none;
            opacity: 0;
            padding: 0;
            width: 0;
          }

          ${SectionLabel} {
            margin-bottom: -1.5rem;
          }
        `}
`;

export const Drawer = styled.div<{
  $expanded: boolean;
}>`
  --expand-transition-speed: 300ms;
  position: sticky;
  z-index: 1000;
  top: 0;
  left: 69px;
  width: 0;
  height: 100dvh;
  background-color: red;
  overflow: auto;
  flex-shrink: 0;
  flex-grow: 0;
  opacity: 0;
  color: var(--sand11);
  background: var(--white);
  transition: all var(--expand-transition-speed);

  ${(p) =>
    p.$expanded
      ? css`
          width: 257px;
          opacity: 1;
          border-right: 1px solid var(--sand6);
        `
      : undefined}
`;
