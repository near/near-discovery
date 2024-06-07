import Image from 'next/image';
import { useRouter } from 'next/router';

import { Tooltip } from '../lib/Tooltip';
import NearIconSvg from './icons/near-icon.svg';
import { PinnedApps } from './PinnedApps';
import { useNavigationStore } from './store';
import * as S from './styles';
import { currentPathMatchesRoute } from './utils';
import { LargeScreenProfileDropdown } from './LargeScreenProfileDropdown';
import { LargeScreenNameDropdown } from './LargeScreenNameDropdown';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';

export const Sidebar = () => {
  const router = useRouter();
  const expandedDrawer = useNavigationStore((store) => store.expandedDrawer);
  const isSidebarExpanded = useNavigationStore((store) => store.isSidebarExpanded && !store.expandedDrawer);
  const isOpenedOnSmallScreens = useNavigationStore((store) => store.isOpenedOnSmallScreens);
  const toggleExpandedSidebar = useNavigationStore((store) => store.toggleExpandedSidebar);
  const toggleExpandedDrawer = useNavigationStore((store) => store.toggleExpandedDrawer);
  const handleBubbledClickInSidebar = useNavigationStore((store) => store.handleBubbledClickInSidebar);
  const { requestAuthentication } = useSignInRedirect();
  const tooltipsDisabled = isSidebarExpanded;
  const signedIn = useAuthStore((store) => store.signedIn);
  const signedAccountId = useAuthStore((store) => store.accountId);

  const handleSignIn = () => {
    requestAuthentication(true);
  };

  const isNavigationItemActive = (route: string | string[], exactMatch = false) => {
    if (expandedDrawer) return false;
    return currentPathMatchesRoute(router.asPath, route, exactMatch);
  };

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

          <S.ToggleExpandButton type="button" aria-label="Expand/Collapse Menu" onClick={toggleExpandedSidebar}>
            <i className={`ph-bold ${isSidebarExpanded ? 'ph-arrow-line-left' : 'ph-list'}`} />
          </S.ToggleExpandButton>
        </S.Top>

        <S.Section>
          <S.Stack $gap="0.5rem">
            <Tooltip content="Home" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/', true)} $type="featured" href="/">
                <i className="ph-bold ph-house" />
                <span>Home</span>
              </S.NavigationItem>
            </Tooltip>

            {/* <Tooltip content="Activity" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/activity')} $type="featured" href="/activity">
                <i className="ph-bold ph-pulse" />
                <span>Activity</span>
              </S.NavigationItem>
            </Tooltip> */}
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

            <Tooltip content="Support" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/contact-us')} $type="featured" href="/contact-us">
                <i className="ph-bold ph-question" />
                <span>Support</span>
              </S.NavigationItem>
            </Tooltip>

            {/* <Tooltip content="Discover" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                as="button"
                type="button"
                $active={isNavigationItemActive(['/applications', '/components', '/gateways'])}
                $expanded={expandedDrawer === 'discover'}
                $type="featured"
                onClick={(event) => toggleExpandedDrawer('discover', event)}
              >
                <i className="ph-bold ph-shapes" />
                <span>Discover</span>
              </S.NavigationItem>
            </Tooltip> */}
          </S.Stack>
        </S.Section>

        {/* <PinnedApps /> */}

        <S.Section>
          <S.SectionLabel>Discover </S.SectionLabel>

          <S.Stack $gap="0.5rem">
            <Tooltip content="Applications" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/applications')} $type="featured" href="/applications">
                <i className="ph-bold ph-shapes" />
                <span>Applications</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Events" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://near.org/events" target="_blank">
                <i className="ph-calendar ph-bold" />
                <span>Events</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>

            {/* <Tooltip content="More" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                as="button"
                type="button"
                $active={false}
                $expanded={expandedDrawer === 'marketing'}
                $type="featured"
                onClick={(event) => toggleExpandedDrawer('marketing', event)}
              >
                <i className="ph-bold ph-dots-three-outline-vertical" />
                <span>More</span>
              </S.NavigationItem>
            </Tooltip> */}

            <Tooltip content="News" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                $active={isNavigationItemActive('/nearweekapp.near/widget/nearweek.com')}
                $type="featured"
                href="/nearweekapp.near/widget/nearweek.com"
              >
                <i className="ph-newspaper ph-bold" />
                <span>News</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Blog" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://near.org/blog">
                <i className="ph-bold ph-chat-centered-text" />
                <span>Blog</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>

        <S.Section style={{ flexGrow: 1 }}>
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
              <S.NavigationItem
                $active={isNavigationItemActive('/ecosystem/get-funding')}
                $type="featured"
                href="/ecosystem/get-funding"
              >
                <i className="ph-bold ph-coin-vertical" />
                <span>Get Funding</span>
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>

        {/* TODO: Improve handling the sidebar opening */}
        <S.LoginSection
          onFocus={() => {
            !isSidebarExpanded && toggleExpandedSidebar();
          }}
        >
          {signedIn ? (
            <Tooltip content={signedAccountId} side="right" disabled={tooltipsDisabled}>
              <S.LoginItem $active={false} $type="featured">
                <LargeScreenProfileDropdown />
                <LargeScreenNameDropdown />
              </S.LoginItem>
            </Tooltip>
          ) : (
            <Tooltip content="Sign-up or Login" side="right" disabled={tooltipsDisabled}>
              <S.LoginItem $active={false} $type="featured" onClick={handleSignIn}>
                <i className="ph-bold ph-keyhole" />
                <span>Sign-up or Login</span>
              </S.LoginItem>
            </Tooltip>
          )}
        </S.LoginSection>

        {/* <LargeScreenProfileDropdown /> */}
      </S.OverflowContainChild>
    </S.Sidebar>
  );
};
