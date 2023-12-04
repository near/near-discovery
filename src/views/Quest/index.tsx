import Breadcrumb from '@/components/Breadcrumb';
import Campaign from './components/Campaign';
import QuestLists from './components/QuestLists';
import Yours from './components/Yours';
import { StyledContainer } from './styles';

import { memo, useState } from 'react';

const QuestView = () => {
  const [id, setId] = useState<string>();
  return (
    <StyledContainer>
      <Breadcrumb navs={[{ name: 'Quest Campaign', path: '/quest' }]} />
      <Campaign
        onLoad={(campainId) => {
          setId(campainId);
        }}
      />
      <QuestLists id={id} />
      <Yours />
    </StyledContainer>
  );
};

export default memo(QuestView);
