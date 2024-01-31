import { memo } from 'react';
import Milestones from '../Milestones';
import { StyledMorePanel, StyledChainDesc } from './styles';

const MorePanel = ({ milestones, subname }: any) => {
  return (
    <StyledMorePanel>
      <StyledChainDesc>{subname}</StyledChainDesc>
      <Milestones milestones={milestones} />
    </StyledMorePanel>
  );
};

export default memo(MorePanel);
