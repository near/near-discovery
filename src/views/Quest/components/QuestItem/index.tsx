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
  StyledLive,
  StyledCalimable,
  StyledFooter,
} from './styles';

import { memo } from 'react';

type QuestItemProps = {
  live?: boolean;
  claimable?: boolean;
  isCampaign?: boolean;
  mt?: number;
};

const QuestItem = ({ live, claimable, isCampaign, mt }: QuestItemProps) => {
  return (
    <StyledContainer $isCampaign={isCampaign} $mt={mt}>
      <StyledTask>
        <StyledIconBox>
          <StyledIcon src="https://i1.huishahe.com/uploads/tu/202204/3/d4116f6117%20(1).jpg" />
        </StyledIconBox>
        <div>
          <StyledTaskName>DapDap Newbie</StyledTaskName>
          <StyledTaskDesc $isCampaign={isCampaign}>Follow the newbie guide</StyledTaskDesc>
        </div>
      </StyledTask>
      <StyledProcessBars>
        <ProcessBar size={4} value={0} noBorder={true} />
        <ProcessBar size={4} value={50} noBorder={true} />
        <ProcessBar size={4} value={100} noBorder={true} />
      </StyledProcessBars>
      <StyledFooter>
        <StyledTags>
          <StyledTag style={{ padding: '0px 10px 0px 6px' }}>
            <StyledCoin $size={18} />
            <span style={{ color: '#EBF479' }}>20 PTS</span>
          </StyledTag>
          <StyledTag>Once</StyledTag>
        </StyledTags>
        {claimable && <StyledCalimable>To be claimed!</StyledCalimable>}
      </StyledFooter>

      {live && (
        <StyledLive>
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill="#31B03E" />
          </svg>
          <span>Live</span>
        </StyledLive>
      )}
    </StyledContainer>
  );
};

export default memo(QuestItem);
