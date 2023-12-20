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
            <span>You‘ve achieved</span>
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
          {Object.values(quests).map((items) => {
            const _quests = items as any[];
            return _quests?.length ? (
              <>
                <StyledSubTitle
                  key={_quests[0].quest_category_name}
                  style={{ color: `var(--${_quests[0].quest_category_name}-color` }}
                >
                  #{_quests[0].quest_category_name}
                </StyledSubTitle>
                <StyledListBox key={_quests[0].quest_category_name}>
                  {_quests.map((item) => (
                    <QuestItem quest={item} key={item.id} />
                  ))}
                </StyledListBox>
              </>
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
