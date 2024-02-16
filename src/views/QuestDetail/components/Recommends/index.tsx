import { memo, useState } from 'react';
import QuestItem from '@/views/Quest/components/QuestItem';
import {
  StyledButtons,
  StyledContainer,
  StyledHeader,
  StyledLeftButton,
  StyledRecommendList,
  StyledTitle,
  StyledRecommendListWrapper,
} from './styles';

const Recommends = ({ recommends }: { recommends: any }) => {
  const [current, setCurrent] = useState(0);
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Featured Quests</StyledTitle>
        <StyledButtons>
          <StyledLeftButton
            $disabled={current === 0}
            onClick={() => {
              if (current <= 0) return;
              setCurrent((prev) => prev - 1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
              <rect x="1" y="1" width="36" height="36" rx="12" fill="#393A4C" stroke="white" strokeOpacity="0.2" />
              <path d="M23 12L16 19L23 26" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
            </svg>
          </StyledLeftButton>
          <StyledLeftButton
            $disabled={current * 3 > Math.ceil(recommends.length / 3)}
            onClick={() => {
              if (current * 3 > Math.ceil(recommends.length / 3)) {
                return;
              }
              setCurrent((prev) => prev + 1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
              <rect x="1" y="1" width="36" height="36" rx="12" fill="#393A4C" stroke="white" strokeOpacity="0.2" />
              <path d="M16 12L23 19L16 26" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
            </svg>
          </StyledLeftButton>
        </StyledButtons>
      </StyledHeader>
      <StyledRecommendListWrapper>
        <StyledRecommendList
          style={{
            transform: `translateX(-${current * 3 * 420}px)`,
          }}
        >
          {recommends.map((recommend: any) => (
            <QuestItem quest={recommend} key={recommend.id} />
          ))}
        </StyledRecommendList>
      </StyledRecommendListWrapper>
    </StyledContainer>
  );
};

export default memo(Recommends);
