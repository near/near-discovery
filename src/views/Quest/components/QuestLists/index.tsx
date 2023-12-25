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
        <>
          {Object.keys(quests)
            .sort((a: any, b: any) => b - a)
            .map((key) => {
              const _quests = quests[key] as any[];
              return _quests?.length ? (
                <div key={_quests[0].quest_category_name + Math.random()}>
                  <StyledSubTitle style={{ color: `var(--${_quests[0].quest_category_name}-color` }}>
                    #{_quests[0].quest_category_name}
                  </StyledSubTitle>
                  <StyledListBox>
                    {_quests.map((item) => (
                      <QuestItem quest={item} key={item.id + Math.random()} />
                    ))}
                  </StyledListBox>
                </div>
              ) : (
                <div key={Date.now()} />
              );
            })}
        </>
      )}
    </StyledContainer>
  );
};

export default memo(QuestLists);
