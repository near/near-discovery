/* eslint-disable @next/next/no-img-element */

import { Tooltip } from '@near-pagoda/ui';
import { Button } from '@near-pagoda/ui';
import { Text } from '@near-pagoda/ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useAuthStore } from '@/stores/auth';

import { useNavigationStore } from './store';
import * as S from './styles';
import { currentPathMatchesRoute } from './utils';

export const PinnedApps = () => {
  const router = useRouter();
  const accountId = useAuthStore((store) => store.accountId);
  const loadPinnedApps = useNavigationStore((store) => store.loadPinnedApps);
  const pinnedApps = useNavigationStore((store) => store.pinnedApps);
  const expandedDrawer = useNavigationStore((store) => store.expandedDrawer);
  const isSidebarExpanded = useNavigationStore((store) => store.isSidebarExpanded && !store.expandedDrawer);
  const tooltipsDisabled = isSidebarExpanded;
  const components = useBosComponents();
  const discoverAppsPath = `/${components.componentsPage}?tab=apps`;
  const discoverTooltipContent = 'Discover apps to pin';

  const isNavigationItemActive = (route: string | string[], exactMatch = false) => {
    if (expandedDrawer) return false;
    return currentPathMatchesRoute(router.asPath, route, exactMatch);
  };

  useEffect(() => {
    loadPinnedApps(accountId);
  }, [accountId, loadPinnedApps]);

  return (
    <S.Section>
      <S.SectionLabel>
        Pinned Apps
        <Tooltip content={discoverTooltipContent} side="right">
          <S.SectionLabelIconLink href={discoverAppsPath}>
            <i className="ph-bold ph-circles-three-plus" />
          </S.SectionLabelIconLink>
        </Tooltip>
      </S.SectionLabel>

      {pinnedApps && pinnedApps.length > 0 ? (
        <S.Stack $gap="0.5rem">
          {pinnedApps?.map((app) => (
            <Tooltip
              content={app.displayName}
              side="right"
              disabled={tooltipsDisabled}
              key={app.authorAccountId + app.componentName}
            >
              <S.NavigationItem
                $active={isNavigationItemActive(`/${app.authorAccountId}/widget/${app.componentName}`)}
                $type="featured"
                href={`/${app.authorAccountId}/widget/${app.componentName}`}
              >
                {app.imageUrl ? (
                  <S.NavigationItemThumbnail>
                    <img src={app.imageUrl} alt={app.displayName} />
                  </S.NavigationItemThumbnail>
                ) : (
                  <i className="ph-bold ph-app-window" />
                )}
                <span>{app.displayName}</span>
              </S.NavigationItem>
            </Tooltip>
          ))}
        </S.Stack>
      ) : (
        <>
          {isSidebarExpanded ? (
            <S.Stack $gap="1rem" $frozenWidth>
              <Text size="text-xs" color="sand11">
                Discover apps from the NEAR developer community to pin.
              </Text>

              <Button
                label="Discover Apps"
                size="small"
                variant="secondary"
                href={discoverAppsPath}
                className="sidebar-auto-width-button"
              />
            </S.Stack>
          ) : (
            <S.Stack>
              <Tooltip content={discoverTooltipContent} side="right" disabled={tooltipsDisabled}>
                <S.NavigationItem
                  $active={isNavigationItemActive(discoverAppsPath)}
                  $type="featured"
                  href={discoverAppsPath}
                >
                  <i className="ph-bold ph-circles-three-plus" />
                  <span>Discover Apps</span>
                </S.NavigationItem>
              </Tooltip>
            </S.Stack>
          )}
        </>
      )}
    </S.Section>
  );
};
