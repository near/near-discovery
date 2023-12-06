import Loading from '@/components/Icons/Loading';

import useQuestList from '../../hooks/useQuestList';

import ProcessBar from '../ProcessBar';
import QuestItem from '../QuestItem';
import {
  StyledContainer,
  StyledTitle,
  StyledHeader,
  StyledSubTitle,
  StyledHeaderProcessBox,
  StyledHeaderProcessDesc,
  StyledListBox,
  LoadingWrapper,
} from './styles';

import { memo } from 'react';

const QuestLists = ({ id }: { id?: string }) => {
  const { loading, quests } = useQuestList(id);
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Quest</StyledTitle>
        <StyledHeaderProcessBox>
          <StyledHeaderProcessDesc>
            <span>You‘ve achieved</span>
            <span style={{ fontWeight: '700' }}> 45%</span>
          </StyledHeaderProcessDesc>
          <ProcessBar size={8} value={20} />
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
                <StyledSubTitle style={{ color: `var(--${_quests[0].quest_category_name}-color` }}>
                  #{_quests[0].quest_category_name}
                </StyledSubTitle>
                <StyledListBox>
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
