import { memo } from 'react';

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

const QuestLists = ({ achieved, loading, quests }: any) => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Quest</StyledTitle>
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
