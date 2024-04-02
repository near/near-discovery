import Image from 'next/image';
import { useRouter } from 'next/router';

import { Tooltip } from '../lib/Tooltip';
import NearIconSvg from './icons/near-icon.svg';
import { PinnedApps } from './PinnedApps';
import { useNavigationStore } from './store';
import * as S from './styles';
import { currentPathMatchesRoute } from './utils';

export const Sidebar = () => {
  const router = useRouter();
  const expandedDrawer = useNavigationStore((store) => store.expandedDrawer);
  const isSidebarExpanded = useNavigationStore((store) => store.isSidebarExpanded && !store.expandedDrawer);
  const isOpenedOnSmallScreens = useNavigationStore((store) => store.isOpenedOnSmallScreens);
  const toggleExpandedSidebar = useNavigationStore((store) => store.toggleExpandedSidebar);
  const toggleExpandedDrawer = useNavigationStore((store) => store.toggleExpandedDrawer);
  const handleBubbledClickInSidebar = useNavigationStore((store) => store.handleBubbledClickInSidebar);
  const tooltipsDisabled = isSidebarExpanded;

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

            <Tooltip content="Activity" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/activity')} $type="featured" href="/activity">
                <i className="ph-bold ph-pulse" />
                <span>Activity</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Discover" side="right" disabled={tooltipsDisabled}>
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
            </Tooltip>
          </S.Stack>
        </S.Section>

        <PinnedApps />

        <S.Section>
          <S.SectionLabel>Resources</S.SectionLabel>

          <S.Stack>
            <Tooltip content="Documentation" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="standard" href="https://docs.near.org/" target="_blank">
                <i className="ph-bold ph-book-open-text" />
                <span>Documentation</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Get Funding" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                $active={isNavigationItemActive('/ecosystem/get-funding')}
                $type="standard"
                href="/ecosystem/get-funding"
              >
                <i className="ph-bold ph-coin-vertical" />
                <span>Get Funding</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Careers" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="standard" href="https://careers.near.org/" target="_blank">
                <i className="ph-bold ph-briefcase" />
                <span>Careers</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Support" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                $active={false}
                $type="standard"
                href="https://pages.near.org/about/contact-us/"
                target="_blank"
              >
                <i className="ph-bold ph-question" />
                <span>Support</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="More" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                as="button"
                type="button"
                $active={false}
                $expanded={expandedDrawer === 'marketing'}
                $type="standard"
                onClick={(event) => toggleExpandedDrawer('marketing', event)}
              >
                <i className="ph-bold ph-dots-three-outline-vertical" />
                <span>More</span>
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>
      </S.OverflowContainChild>
    </S.Sidebar>
  );
};
