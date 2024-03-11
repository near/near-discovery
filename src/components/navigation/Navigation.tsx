import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled, { css } from 'styled-components';

import NearIconSvg from './icons/near-icon.svg';

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
`;

const Logo = styled(Link)`
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

const ToggleExpandButton = styled.button`
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

const Section = styled.div`
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

const NavigationItem = styled(Link)<{
  $active: boolean;
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
    transition: all 150ms, outline 0;
  }

  ${(p) =>
    p.$type === 'standard'
      ? css`
          i {
            --outline-width: 0;
          }
        `
      : undefined}

  ${(p) =>
    p.$active
      ? css`
          font-weight: 600;
          color: var(--sand12);
          i {
            --outline-color: var(--sand12);
            --outline-width: 2px;
            background: var(--sand4);
          }
        `
      : undefined}
`;

const Stack = styled.div<{
  $gap?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.$gap ?? '1.5rem'};
`;

const SectionLabel = styled.p`
  all: unset;
  font: var(--text-xs);
  color: var(--sand12);
  font-weight: 600;
  letter-spacing: 0.24px;
  transition: all var(--expand-transition-speed);
`;

const Wrapper = styled.div<{
  $expanded: boolean;
}>`
  --sidebar-width: 69px;
  --expand-transition-speed: 300ms;
  width: var(--sidebar-width);
  flex-shrink: 0;
  flex-grow: 0;
  color: var(--sand11);
  background: var(--white);
  border-right: 1px solid var(--sand6);
  transition: all var(--expand-transition-speed);

  ${(p) =>
    p.$expanded
      ? css`
          --sidebar-width: 257px;
        `
      : css`
          ${NavigationItem} span {
            display: none;
          }

          ${ToggleExpandButton} {
            width: calc(var(--sidebar-width) - 1px);
          }

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

export const Navigation = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Wrapper $expanded={expanded}>
      <Top>
        <Logo href="/" aria-label="Go Home">
          <Image src={NearIconSvg} alt="NEAR" />
        </Logo>

        <ToggleExpandButton
          type="button"
          aria-label="Expand/Collapse Menu"
          onClick={() => setExpanded((value) => !value)}
        >
          <i className={`ph-bold ${expanded ? 'ph-arrow-line-left' : 'ph-list'}`} />
        </ToggleExpandButton>
      </Top>

      <Section>
        <Stack $gap="0.5rem">
          <NavigationItem $active={true} $type="featured" href="/">
            <i className="ph-bold ph-house" />
            <span>Home</span>
          </NavigationItem>

          <NavigationItem $active={false} $type="featured" href="/activity">
            <i className="ph-bold ph-pulse" />
            <span>Activity</span>
          </NavigationItem>

          <NavigationItem $active={false} $type="featured" href="/applications">
            <i className="ph-bold ph-shapes" />
            <span>Discover</span>
          </NavigationItem>
        </Stack>
      </Section>

      <Section>
        <SectionLabel>Resources</SectionLabel>

        <Stack $gap="0">
          <NavigationItem $active={false} $type="standard" href="/">
            <i className="ph-bold ph-book-open-text" />
            <span>Documentation</span>
          </NavigationItem>

          <NavigationItem $active={false} $type="standard" href="/">
            <i className="ph-bold ph-coin-vertical" />
            <span>Earn & Contribute</span>
          </NavigationItem>

          <NavigationItem $active={false} $type="standard" href="/">
            <i className="ph-bold ph-briefcase" />
            <span>Careers</span>
          </NavigationItem>

          <NavigationItem $active={false} $type="standard" href="/">
            <i className="ph-bold ph-question" />
            <span>Support</span>
          </NavigationItem>

          <NavigationItem $active={false} $type="standard" href="/">
            <i className="ph-bold ph-dots-three-outline-vertical" />
            <span>More</span>
          </NavigationItem>
        </Stack>
      </Section>
    </Wrapper>
  );
};
