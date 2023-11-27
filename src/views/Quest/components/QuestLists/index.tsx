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
} from './styles';

import { memo } from 'react';

const QuestLists = () => {
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
      <StyledSubTitle style={{ color: 'var(--onboarding-color' }}>#onboarding</StyledSubTitle>
      <StyledListBox>
        <QuestItem />
      </StyledListBox>
      <StyledSubTitle style={{ color: 'var(--social-color' }}>#social</StyledSubTitle>
      <StyledListBox></StyledListBox>
      <StyledSubTitle style={{ color: 'var(--engage-color' }}>#engage</StyledSubTitle>
      <StyledListBox></StyledListBox>
    </StyledContainer>
  );
};

export default memo(QuestLists);
