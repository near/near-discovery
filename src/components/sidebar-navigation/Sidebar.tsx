import { Dropdown, SvgIcon, Tooltip } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { CaretDown } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { networkId } from '@/config';

import NearIconSvg from './icons/near-icon.svg';
import { Search } from './Search';
import { useNavigationStore } from './store';
import * as S from './styles';
import { UserDropdownMenu } from './UserDropdownMenu';
import { currentPathMatchesRoute } from './utils';

const Redirect = styled.a<{ selected?: boolean }>`
  text-decoration: none;
  color: #444;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${() => (networkId === 'mainnet' ? '#0072de' : '#d14e00')};
  background-color: ${() => (networkId === 'mainnet' ? '#0084f116' : '#f9900026')};
  text-transform: capitalize;
  border-radius: 0.25rem;
  letter-spacing: 0.05em;
`;

export const Sidebar = () => {
  const router = useRouter();
  const expandedDrawer = useNavigationStore((store) => store.expandedDrawer);
  const isSidebarExpanded = useNavigationStore((store) => store.isSidebarExpanded && !store.expandedDrawer);
  const isOpenedOnSmallScreens = useNavigationStore((store) => store.isOpenedOnSmallScreens);
  const toggleExpandedSidebar = useNavigationStore((store) => store.toggleExpandedSidebar);
  const handleBubbledClickInSidebar = useNavigationStore((store) => store.handleBubbledClickInSidebar);
  const tooltipsDisabled = isSidebarExpanded;
  const { signIn, signedAccountId } = useWalletSelector();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenNetwork, setIsOpenNetwork] = useState(false);

  const preventRedirect = (network: string) => (e: React.MouseEvent) => {
    if (networkId == network) {
      e.preventDefault();
    }
  };

  const isNavigationItemActive = useCallback(
    (route: string | string[], exactMatch = false) => {
      if (expandedDrawer) return false;
      return currentPathMatchesRoute(router.asPath, route, exactMatch);
    },
    [expandedDrawer, router.asPath],
  );

  useEffect(() => {
    isNavigationItemActive('/documentation') && isSidebarExpanded && toggleExpandedSidebar();
  }, [router.asPath, isNavigationItemActive, isSidebarExpanded, toggleExpandedSidebar]);

  return (
    <S.Sidebar
      $openedOnSmallScreens={isOpenedOnSmallScreens}
      $expanded={isSidebarExpanded}
      onClick={(event) => handleBubbledClickInSidebar(event)}
    >
      <S.OverflowContainChild>
        <S.Top>
          <S.Logo href="/" aria-label="Go Home">
            <Image src={NearIconSvg} alt="NEAR" />
          </S.Logo>
          <S.Network>
            <Dropdown.Root open={isOpenNetwork} onOpenChange={(open) => setIsOpenNetwork(open)}>
              <Dropdown.Trigger asChild>
                <Badge>
                  {networkId}{' '}
                  <SvgIcon
                    icon={<CaretDown />}
                    size="xs"
                    style={{
                      marginBottom: '1px',
                      transform: isOpenNetwork ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'all 200ms',
                    }}
                  />
                </Badge>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Section>
                  <Redirect href="https://dev.near.org" target="_blank" onClick={preventRedirect('mainnet')}>
                    <Dropdown.Item>Mainnet</Dropdown.Item>
                  </Redirect>
                  <Redirect href="https://test.near.org" target="_blank" onClick={preventRedirect('testnet')}>
                    <Dropdown.Item>Testnet</Dropdown.Item>
                  </Redirect>
                </Dropdown.Section>
              </Dropdown.Content>
            </Dropdown.Root>
          </S.Network>

          <S.ToggleExpandButton type="button" aria-label="Expand/Collapse Menu" onClick={toggleExpandedSidebar}>
            <i className={`ph-bold ${isSidebarExpanded ? 'ph-arrow-line-left' : 'ph-list'}`} />
          </S.ToggleExpandButton>
        </S.Top>
        <S.SearchSection
          $expanded={isSidebarExpanded}
          onClick={() => {
            if (!isSidebarExpanded) {
              toggleExpandedSidebar();
              setTimeout(() => {
                inputRef.current?.focus();
              }, 200);
            }
          }}
        >
          <Search inputRef={inputRef} />
          <Tooltip content="Search" side="right" disabled={tooltipsDisabled}>
            <S.SearchIconWrapper $expanded={isSidebarExpanded}>
              <i className="ph-bold ph-magnifying-glass" />
            </S.SearchIconWrapper>
          </Tooltip>
        </S.SearchSection>

        <S.Section>
          <S.Stack $gap="0.5rem">
            <Tooltip content="Home" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/', true)} $type="featured" href="/">
                <i className="ph-bold ph-house" />
                <span>Home</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Documentation" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                $active={isNavigationItemActive('/documentation')}
                $type="featured"
                href="/documentation"
              >
                <i className="ph-bold ph-book-open-text" />
                <span>Documentation</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Community Support" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/communities')} $type="featured" href="/communities">
                <i className="ph-bold ph-question" />
                <span>Community Support</span>
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>

        <S.Section>
          <S.SectionLabel>Developer Resources </S.SectionLabel>

          <S.Stack $gap="0.5rem">
            <Tooltip content="Faucet" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/faucet')} $type="featured" href="/faucet">
                <i className="ph-drop ph-bold" />
                <span>Faucet</span>
              </S.NavigationItem>
            </Tooltip>
            <Tooltip content="Toolbox" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/tools')} $type="featured" href="/tools">
                <i className="ph-toolbox ph-bold" />
                <span>Toolbox</span>
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>
        <S.Section>
          <S.SectionLabel> Discover </S.SectionLabel>

          <S.Stack $gap="0.5rem">
            <Tooltip content="Applications" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/applications')} $type="featured" href="/applications">
                <i className="ph-bold ph-shapes" />
                <span>Applications</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Events" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/events')} $type="featured" href="/events">
                <i className="ph-calendar ph-bold" />
                <span>Events</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="News" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/newsletter')} $type="featured" href="/newsletter">
                <i className="ph-newspaper ph-bold" />
                <span>News</span>
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>

        <S.Section style={{ flexGrow: 1, borderBottom: 'none' }}>
          <S.SectionLabel>Resources </S.SectionLabel>

          <S.Stack $gap="0.5rem">
            <Tooltip content="Standards & Proposals" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://github.com/near/NEPs" target="_blank">
                <i className="ph-file-text ph-bold" />
                <span>Standards & Proposals</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="GitHub" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://github.com/near" target="_blank">
                <i className="ph-bold ph-github-logo" />
                <span>GitHub</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Careers" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://careers.near.org/" target="_blank">
                <i className="ph-bold ph-briefcase" />
                <span>Careers</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Get Funding" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://www.near.org/funding" target="_blank">
                <i className="ph-bold ph-coin-vertical" />
                <span>Get Funding</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>
        <S.ProfileDropdownSection $expanded={isSidebarExpanded}>
          {signedAccountId ? (
            <UserDropdownMenu collapsed={!isSidebarExpanded} />
          ) : (
            <Tooltip content="Login" side="right" disabled={tooltipsDisabled} asChild>
              <S.LoginItem $active={false} $type="featured" onClick={signIn}>
                <i className="ph-bold ph-user" />
                <span>Login</span>
              </S.LoginItem>
            </Tooltip>
          )}
        </S.ProfileDropdownSection>
      </S.OverflowContainChild>
    </S.Sidebar>
  );
};
