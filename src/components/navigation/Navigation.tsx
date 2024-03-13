import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Tooltip } from '../lib/Tooltip';
import { DiscoverDrawer } from './DiscoverDrawer';
import NearIconSvg from './icons/near-icon.svg';
import * as S from './styles';

type NavigationDrawer = 'discover' | 'more';

export const Navigation = () => {
  const [_sidebarIsExpanded, setSidebarIsExpanded] = useState(true);
  const [expandedDrawer, setExpandedDrawer] = useState<NavigationDrawer | null>(null);
  const sidebarIsExpanded = _sidebarIsExpanded && !expandedDrawer;
  const tooltipsDisabled = sidebarIsExpanded;
  const router = useRouter();

  const toggleExpandedDrawer = (drawer: NavigationDrawer) => {
    if (expandedDrawer === drawer) {
      setExpandedDrawer(null);
    } else {
      setExpandedDrawer(drawer);
    }
  };

  const toggleExpandedSidebar = () => {
    if (expandedDrawer) {
      setSidebarIsExpanded(true);
      setExpandedDrawer(null);
    } else {
      setSidebarIsExpanded((value) => !value);
    }
  };

  const isNavigationItemActive = (route: string | string[], exactMatch = false) => {
    if (expandedDrawer) return false;

    const path = router.asPath.split('?').shift() ?? '/';

    const routes = typeof route === 'string' ? [route] : route;
    const matchingRoute = exactMatch ? routes.includes(path) : routes.find((r) => path.indexOf(r) === 0);
    return !!matchingRoute;
  };

  return (
    <>
      <S.Sidebar $expanded={sidebarIsExpanded}>
        <S.Top>
          <S.Logo href="/" aria-label="Go Home">
            <Image src={NearIconSvg} alt="NEAR" />
          </S.Logo>

          <S.ToggleExpandButton type="button" aria-label="Expand/Collapse Menu" onClick={toggleExpandedSidebar}>
            <i className={`ph-bold ${sidebarIsExpanded ? 'ph-arrow-line-left' : 'ph-list'}`} />
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
                $active={isNavigationItemActive(['/applications', '/components', '/gateways'])}
                $expanded={expandedDrawer === 'discover'}
                $type="featured"
                onClick={() => toggleExpandedDrawer('discover')}
              >
                <i className="ph-bold ph-shapes" />
                <span>Discover</span>
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>

        <S.Section>
          <S.SectionLabel>Resources</S.SectionLabel>

          <S.Stack>
            <S.NavigationItem $active={false} $type="standard" href="/">
              <i className="ph-bold ph-book-open-text" />
              <span>Documentation</span>
            </S.NavigationItem>

            <S.NavigationItem $active={false} $type="standard" href="/">
              <i className="ph-bold ph-coin-vertical" />
              <span>Earn & Contribute</span>
            </S.NavigationItem>

            <S.NavigationItem $active={false} $type="standard" href="/">
              <i className="ph-bold ph-briefcase" />
              <span>Careers</span>
            </S.NavigationItem>

            <S.NavigationItem $active={false} $type="standard" href="/">
              <i className="ph-bold ph-question" />
              <span>Support</span>
            </S.NavigationItem>

            <S.NavigationItem $active={false} $type="standard" href="/">
              <i className="ph-bold ph-dots-three-outline-vertical" />
              <span>More</span>
            </S.NavigationItem>
          </S.Stack>
        </S.Section>
      </S.Sidebar>

      <DiscoverDrawer expanded={expandedDrawer === 'discover'} />
    </>
  );
};
