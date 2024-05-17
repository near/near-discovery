import { useRouter } from 'next/router';

import { DrawerHeader } from './DrawerHeader';
import { marketingDrawerSections } from './sections';
import { useNavigationStore } from './store';
import * as S from './styles';
import { currentPathMatchesRoute } from './utils';
import { useCurrentComponentStore } from '@/stores/current-component';
import { useEffect } from 'react';

type Props = {
  expanded: boolean;
};

export const MarketingDrawer = ({ expanded }: Props) => {
  const router = useRouter();
  const isOpenedOnSmallScreens = useNavigationStore((store) => store.isOpenedOnSmallScreens);
  const handleBubbledClickInDrawer = useNavigationStore((store) => store.handleBubbledClickInDrawer);
  const setInitialExpandedDrawer = useNavigationStore((store) => store.setInitialExpandedDrawer);
  const currentComponentSrc = useCurrentComponentStore((store) => store.src);

  const isNavigationItemActive = (route: string | string[]) => {
    const isActive = currentPathMatchesRoute(router.asPath, route);
    setTimeout(() => {
      if (isActive) setInitialExpandedDrawer('marketing');
    });
    return isActive;
  };

  useEffect(() => {
    const developLinks = marketingDrawerSections[1].links;
    const isComponentURL = () => ['/widget/', '/component/'].some((p) => router.asPath.indexOf(p) !== -1);

    if (currentComponentSrc && developLinks.length === 5) {
      developLinks.unshift({
        title: 'Inspect Component',
        url: `/near/widget/ComponentDetailsPage?src=${currentComponentSrc}`,
        icon: 'ph-magnifying-glass ph-bold',
      });
    } else if (!isComponentURL() && !currentComponentSrc && developLinks.length === 6) {
      developLinks.shift();
    }
  }, [currentComponentSrc, router]);

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
                  {link.url.indexOf('https://') > -1 && <i className="ph-bold ph-arrow-square-out ms-auto" />}
                </S.NavigationSimpleItem>
              ))}
            </S.Stack>
          </S.Section>
        ))}
      </S.OverflowContainChild>
    </S.Drawer>
  );
};
