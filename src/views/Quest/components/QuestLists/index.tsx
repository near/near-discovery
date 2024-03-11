import { memo, useMemo } from 'react';
import Loading from '@/components/Icons/Loading';
import ProcessBar from '../ProcessBar';
import QuestItem from '../QuestItem';
import {
  LoadingWrapper,
  StyledContainer,
  StyledHeader,
  StyledHeaderProcessBox,
  StyledHeaderProcessDesc,
  StyledListBox,
  StyledSubTitle,
  StyledTitle,
} from './styles';

const QuestLists = ({ loading, quests }: any) => {
  const achieved = useMemo(() => {
    if (!quests) return 0;
    const questsArray = Object.values(quests);
    if (!questsArray.length) return 0;
    let completed = 0;
    questsArray.forEach((item: any) => {
      item.forEach((slip: any) => {
        if (slip.action_completed >= slip.total_action) {
          completed++;
        }
      });
    });
    return Math.ceil((completed / questsArray.length) * 100);
  }, [quests]);
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Quests</StyledTitle>
        <StyledHeaderProcessBox>
          <StyledHeaderProcessDesc>
            <span>You&apos;ve achieved</span>
            <span style={{ fontWeight: '700' }}> {achieved || 0}%</span>
          </StyledHeaderProcessDesc>
          <ProcessBar size={8} value={achieved || 0} />
        </StyledHeaderProcessBox>
      </StyledHeader>
      {loading ? (
        <LoadingWrapper>
          <Loading size={60} />
        </LoadingWrapper>
      ) : (
        <StyledListBox>
          {Object.keys(quests)
            .sort((a: any, b: any) => a - b)
            .map((key) => {
              const _quests = quests[key] as any[];
              return _quests?.length ? (
                <>
                  {_quests.map((item) => (
                    <QuestItem quest={item} key={item.id + Math.random()} />
                  ))}
                </>
              ) : (
                <div key={Date.now()} />
              );
            })}
        </StyledListBox>
      )}
    </StyledContainer>
  );
};

export default memo(QuestLists);
