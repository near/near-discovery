import QuestItem from '@/views/Quest/components/QuestItem';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledButtons,
  StyledLeftButton,
  StyledRightButton,
  StyledRecommendList,
} from './styles';

import { memo } from 'react';

const Recommends = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Recommend Quest</StyledTitle>
        <StyledButtons>
          <StyledLeftButton>
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
              <rect x="1" y="1" width="36" height="36" rx="12" fill="#393A4C" stroke="white" stroke-opacity="0.2" />
              <path d="M23 12L16 19L23 26" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
            </svg>
          </StyledLeftButton>
          <StyledRightButton>
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
              <rect x="1" y="1" width="36" height="36" rx="12" fill="#393A4C" stroke="white" stroke-opacity="0.2" />
              <path d="M16 12L23 19L16 26" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
            </svg>
          </StyledRightButton>
        </StyledButtons>
      </StyledHeader>
      <StyledRecommendList>
        <QuestItem />
      </StyledRecommendList>
    </StyledContainer>
  );
};

export default memo(Recommends);
