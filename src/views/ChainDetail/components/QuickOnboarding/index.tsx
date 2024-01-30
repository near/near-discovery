import { memo, useMemo } from 'react';
import chainsConfig from '@/config/all-in-one/chains';
import Item from './Item';
import { StyledContainer, StyledTitle, StyledSubtitle, StyledMore, StyledList } from './styles';

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
        <StyledMore onClick={() => {}}>
          <span>More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path
              d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM15.5657 6.56569C15.8781 6.25327 15.8781 5.74674 15.5657 5.43432L10.4745 0.343147C10.1621 0.0307272 9.65557 0.0307272 9.34315 0.343147C9.03073 0.655566 9.03073 1.1621 9.34315 1.47452L13.8686 6L9.34314 10.5255C9.03073 10.8379 9.03073 11.3444 9.34314 11.6569C9.65556 11.9693 10.1621 11.9693 10.4745 11.6569L15.5657 6.56569ZM1 6.8L15 6.8L15 5.2L1 5.2L1 6.8Z"
              fill="#EBF479"
            />
          </svg>
        </StyledMore>
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
