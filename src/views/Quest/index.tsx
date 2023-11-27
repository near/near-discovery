import Breadcrumb from '@/components/Breadcrumb';
import Campaign from './components/Campaign';
import QuestLists from './components/QuestLists';
import Yours from './components/Yours';
import { StyledContainer } from './styles';

import { memo } from 'react';

const QuestView = () => {
  return (
    <StyledContainer>
      <Breadcrumb navs={[{ name: 'Quest Campaign', path: '/quest' }]} />
      <Campaign />
      <QuestLists />
      <Yours />
    </StyledContainer>
  );
};

export default memo(QuestView);
