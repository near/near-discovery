import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import styled from 'styled-components';

import { recordMouseEnter } from '@/utils/analytics';

import { navCategories } from '../org-links';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
  flex-grow: 1;
  height: var(--nav-height);
`;

const NavRoot = styled(NavigationMenu.Root)`
  height: 100%;

  > div {
    height: 100%;
  }
`;

const NavList = styled(NavigationMenu.List)`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
`;

const NavItem = styled(NavigationMenu.Item)`
  position: relative;
  height: 100%;
`;

const NavTrigger = styled(NavigationMenu.Trigger)`
  all: unset;
  font: var(--text-s);
  color: var(--sand12);
  font-weight: 600;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavContent = styled(NavigationMenu.Content)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 16px 0;
  transform-origin: center top;
  animation: fadeIn 200ms;
  background: var(--white);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  clip-path: inset(0px -100px -100px -100px);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(1, 0.5);
    }
    to {
      opacity: 1;
      transform: scale(1, 1);
    }
  }
`;

const NavLink = styled(NavigationMenu.Link)`
  display: inline-block;
  min-width: 120px;
  padding: 8px 0;
  font: var(--text-s);
  color: var(--sand10);
  transition: color 200ms;
  white-space: nowrap;

  &:hover,
  &:focus,
  &:active {
    color: var(--sand12);
    text-decoration: none;
    outline: none;
  }

  &:focus {
    text-decoration: underline;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0;

  &:nth-child(1),
  &:nth-child(2) {
    padding-top: 0;
  }

  &:nth-child(odd) {
    border-right: 1px solid var(--sand4);
  }

  &:first-child:last-child {
    border-right: none;
  }
`;

const SectionTitle = styled.p`
  font: var(--text-s);
  color: var(--sand12);
  font-weight: 600;
  padding: 8px 0;
  margin: 0;
`;

export const MainNavigationMenu = () => {
  return (
    <Wrapper>
      <NavRoot>
        <NavList>
          {navCategories.map((category) => (
            <NavItem key={category.title}>
              <NavTrigger onMouseEnter={recordMouseEnter}>{category.title}</NavTrigger>

              <NavContent>
                {category.sections.map((section) => (
                  <Section key={section.title}>
                    {section.title && <SectionTitle>{section.title}</SectionTitle>}

                    {section.links.map((link) => (
                      <NavLink key={link.title} asChild>
                        <Link href={link.url}>{link.title}</Link>
                      </NavLink>
                    ))}
                  </Section>
                ))}
              </NavContent>
            </NavItem>
          ))}
        </NavList>
      </NavRoot>
    </Wrapper>
  );
};
