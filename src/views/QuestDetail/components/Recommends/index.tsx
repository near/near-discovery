import QuestItem from '@/views/Quest/components/QuestItem';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledButtons,
  StyledLeftButton,
  StyledRecommendList,
} from './styles';

import { memo } from 'react';
import useRecommendList from '../../hooks/useRecommendList';

const Recommends = ({ campaignId }: { campaignId: string }) => {
  const { loading, recommends, handlePageChange, page, maxPage } = useRecommendList(campaignId);
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Recommend Quest</StyledTitle>
        <StyledButtons>
          <StyledLeftButton
            $disabled={page === 1}
            onClick={() => {
              page > 1 && handlePageChange(-1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
              <rect x="1" y="1" width="36" height="36" rx="12" fill="#393A4C" stroke="white" strokeOpacity="0.2" />
              <path d="M23 12L16 19L23 26" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
            </svg>
          </StyledLeftButton>
          <StyledLeftButton
            $disabled={page === maxPage}
            onClick={() => {
              page < maxPage && handlePageChange(1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
              <rect x="1" y="1" width="36" height="36" rx="12" fill="#393A4C" stroke="white" strokeOpacity="0.2" />
              <path d="M16 12L23 19L16 26" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
            </svg>
          </StyledLeftButton>
        </StyledButtons>
      </StyledHeader>
      <StyledRecommendList>
        {recommends.map((recommend: any) => (
          <QuestItem quest={recommend} />
        ))}
      </StyledRecommendList>
    </StyledContainer>
  );
};

export default memo(Recommends);
