import { memo, useMemo } from 'react';
import chainsConfig from '@/config/all-in-one/chains';
import GoMore from '@/components/GoMore';
import Item from './Item';
import { StyledContainer, StyledTitle, StyledSubtitle, StyledList } from './styles';

const QuickOnboarding = ({ activities, path }: any) => {
  const list = useMemo(() => {
    if (!activities) return [];
    return activities.map((item: any) => {
      const network = chainsConfig[path];
      return {
        ...item,
        logo: network?.icon,
        name: network?.title,
        bgColor: network?.bgColor,
      };
    });
  }, [activities]);

  return (
    <StyledContainer>
      <StyledTitle>Quick Onboarding</StyledTitle>
      <StyledSubtitle>
        <span>The most popular actions from other users</span>
        <GoMore label="More" path="" bp="100121-006" />
      </StyledSubtitle>
      <StyledList>
        {list.map((item: any, index: number) => (
          <Item key={item.action_title + index} {...item} />
        ))}
      </StyledList>
    </StyledContainer>
  );
};

export default memo(QuickOnboarding);
