import ProcessBar from '../ProcessBar';
import {
  StyledContainer,
  StyledTask,
  StyledIconBox,
  StyledIcon,
  StyledTaskName,
  StyledTaskDesc,
  StyledProcessBars,
  StyledTags,
  StyledTag,
  StyledCoin,
} from './styles';

import { memo } from 'react';

const QuestItem = () => {
  return (
    <StyledContainer>
      <StyledTask>
        <StyledIconBox>
          <StyledIcon src="https://i1.huishahe.com/uploads/tu/202204/3/d4116f6117%20(1).jpg" />
        </StyledIconBox>
        <div>
          <StyledTaskName>DapDap Newbie</StyledTaskName>
          <StyledTaskDesc>Follow the newbie guide</StyledTaskDesc>
        </div>
      </StyledTask>
      <StyledProcessBars>
        <ProcessBar size={4} value={0} noBorder={true} />
        <ProcessBar size={4} value={50} noBorder={true} />
        <ProcessBar size={4} value={100} noBorder={true} />
      </StyledProcessBars>
      <StyledTags>
        <StyledTag style={{ padding: '0px 10px 0px 6px' }}>
          <StyledCoin $size={18} />
          <span style={{ color: '#EBF479' }}>20 PTS</span>
        </StyledTag>
        <StyledTag>Once</StyledTag>
      </StyledTags>
    </StyledContainer>
  );
};

export default memo(QuestItem);
