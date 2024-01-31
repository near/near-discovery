import { memo } from 'react';
import { useRouter } from 'next/router';
import QuestItem from '@/views/Quest/components/QuestItem';
import { StyledContainer, StyledTitle, StyledAction, StyledList } from './styles';

const Quests = ({ quests }: any) => {
  const router = useRouter();
  return (
    <StyledContainer>
      <StyledTitle>
        <div>Related Quests</div>
        <StyledAction
          onClick={() => {
            router.push('/quest/leaderboard');
          }}
        >
          Explore Quest
        </StyledAction>
      </StyledTitle>
      <StyledList>
        {quests?.map((item: any, i: number) => <QuestItem quest={item} key={item.id + Math.random()} />)}
      </StyledList>
    </StyledContainer>
  );
};

export default memo(Quests);
