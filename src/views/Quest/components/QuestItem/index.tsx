import { memo } from 'react';
import { useRouter } from 'next/navigation';

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

const QuestItem = ({
  quest: { isCampaign, mt, claimable, live, logo, name, description, total_action, reward, is_period, id },
}: {
  quest: any;
}) => {
  const router = useRouter();
  return (
    <StyledContainer
      $isCampaign={isCampaign}
      $mt={mt}
      whileHover={{ opacity: 0.9 }}
      onClick={() => {
        router.push(`/quest/detail?id=${id}`);
      }}
    >
      <StyledTask>
        <StyledIconBox>{logo && <StyledIcon src={logo} />}</StyledIconBox>
        <div>
          <StyledTaskName>{name}</StyledTaskName>
          <StyledTaskDesc $isCampaign={isCampaign}>{description}</StyledTaskDesc>
        </div>
      </StyledTask>
      <StyledProcessBars>
        {new Array(total_action || 0).map((i) => (
          <ProcessBar size={4} value={0} noBorder={true} />
        ))}
      </StyledProcessBars>
      <StyledFooter>
        <StyledTags>
          <StyledTag style={{ padding: '0px 10px 0px 6px' }}>
            <StyledCoin $size={18} />
            <span style={{ color: '#EBF479' }}>{reward} PTS</span>
          </StyledTag>
          <StyledTag>{is_period ? 'Period' : 'Once'}</StyledTag>
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
