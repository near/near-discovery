import { useRouter } from 'next/router';

import { DrawerHeader } from './DrawerHeader';
import { marketingDrawerSections } from './sections';
import { useNavigationStore } from './store';
import * as S from './styles';
import { currentPathMatchesRoute } from './utils';

type Props = {
  expanded: boolean;
};

export const MarketingDrawer = ({ expanded }: Props) => {
  const router = useRouter();
  const isOpenedOnSmallScreens = useNavigationStore((store) => store.isOpenedOnSmallScreens);
  const handleBubbledClickInDrawer = useNavigationStore((store) => store.handleBubbledClickInDrawer);
  const setInitialExpandedDrawer = useNavigationStore((store) => store.setInitialExpandedDrawer);

  const isNavigationItemActive = (route: string | string[]) => {
    const isActive = currentPathMatchesRoute(router.asPath, route);
    setTimeout(() => {
      if (isActive) setInitialExpandedDrawer('marketing');
    });
    return isActive;
  };

  return (
    <S.Drawer $expanded={expanded} $openedOnSmallScreens={isOpenedOnSmallScreens} onClick={handleBubbledClickInDrawer}>
      <S.OverflowContainChild>
        <DrawerHeader title="More" />

        {marketingDrawerSections.map((section) => (
          <S.Section key={section.title}>
            <S.SectionLabel>{section.title}</S.SectionLabel>

            <S.Stack $gap="0.25rem">
              {section.links.map((link) => (
                <S.NavigationSimpleItem
                  $active={isNavigationItemActive(link.url)}
                  href={link.url}
                  key={link.url}
                  target={link.url.indexOf('https://') > -1 ? '_blank' : undefined}
                >
                  <i className={`ph-bold ${link.icon}`} />
                  <span>{link.title}</span>
                </S.NavigationSimpleItem>
              ))}
            </S.Stack>
          </S.Section>
        ))}
      </S.OverflowContainChild>
    </S.Drawer>
  );
};
