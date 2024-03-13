import { useRouter } from 'next/router';

import { marketingDrawerSections } from './sections';
import * as S from './styles';
import { currentPathMatchesRoute } from './utils';

type Props = {
  expanded: boolean;
};

export const MarketingDrawer = ({ expanded }: Props) => {
  const router = useRouter();

  const isNavigationItemActive = (route: string | string[], exactMatch = false) => {
    return currentPathMatchesRoute(router.asPath, route, exactMatch);
  };

  return (
    <S.Drawer $expanded={expanded}>
      <S.Section>
        <S.DrawerTitle>More</S.DrawerTitle>
      </S.Section>

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
    </S.Drawer>
  );
};
