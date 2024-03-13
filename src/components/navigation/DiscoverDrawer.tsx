import { useRouter } from 'next/router';

import * as S from './styles';

type Props = {
  expanded: boolean;
};

export const DiscoverDrawer = ({ expanded }: Props) => {
  const router = useRouter();

  const isNavigationItemActive = (route: string | string[], exactMatch = false) => {
    const path = router.asPath.split('?').shift() ?? '/';

    const routes = typeof route === 'string' ? [route] : route;
    const matchingRoute = exactMatch ? routes.includes(path) : routes.find((r) => path.indexOf(r) === 0);
    return !!matchingRoute;
  };

  return (
    <S.Drawer $expanded={expanded}>
      <S.Section>
        <S.DrawerTitle>Discover</S.DrawerTitle>

        <S.Stack $gap="0.25rem">
          <S.NavigationSimpleItem $active={isNavigationItemActive('/applications')} href="/applications">
            <i className="ph-bold ph-app-window" />
            <span>Applications</span>
          </S.NavigationSimpleItem>

          <S.NavigationSimpleItem $active={isNavigationItemActive('/components')} href="/components">
            <i className="ph-bold ph-git-fork" />
            <span>Components</span>
          </S.NavigationSimpleItem>

          <S.NavigationSimpleItem $active={isNavigationItemActive('/gateways')} href="/gateways">
            <i className="ph-bold ph-compass" />
            <span>Gateways</span>
          </S.NavigationSimpleItem>
        </S.Stack>
      </S.Section>
    </S.Drawer>
  );
};
