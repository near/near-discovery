import Breadcrumb from '@/components/Breadcrumb';
import Yours from '../Quest/components/Yours';
import Details from './components/Details';
import Actions from './components/Actions';
import Recommends from './components/Recommends';

import { StyledContainer, StyledTopBox } from './styles';

import { memo } from 'react';

const QuestDetailView = () => {
  return (
    <StyledContainer>
      <Breadcrumb
        navs={[
          { name: 'Quest Campaign', path: '/quest' },
          { name: 'Quest detail', path: '/quest/detail' },
        ]}
      />
      <StyledTopBox>
        <Details />
        <Actions />
      </StyledTopBox>
      <Recommends />
      <Yours />
    </StyledContainer>
  );
};

export default memo(QuestDetailView);
