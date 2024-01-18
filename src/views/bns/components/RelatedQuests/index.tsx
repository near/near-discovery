import Loading from '@/components/Icons/Loading';
import QuestItem from '@/views/Quest/components/QuestItem';
import { memo } from 'react';
import {
  StyledContainer,
  StyledHead,
  StyledLoadingWrapper,
  StyledQuestList
} from './styles';


const RelatedQuests = ({ loading, questList = [] }) => {
  return (
    <StyledContainer>
      <StyledHead>Related Quests</StyledHead>
      {loading ? (
        <StyledLoadingWrapper>
          <Loading size={60} />
        </StyledLoadingWrapper>
      ) : (
        <StyledQuestList>
          {
            questList.map(quest => <QuestItem quest={quest} key={quest.id + Math.random()} />)
          }
        </StyledQuestList>
      )}
    </StyledContainer>
  );
};

export default memo(RelatedQuests);
