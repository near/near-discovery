import { useRouter } from 'next/navigation';
import { memo } from 'react';

import ProcessBar from '../ProcessBar';
import Steps from './step-icon';
import {
  StyledCalimable,
  StyledCoin,
  StyledContainer,
  StyledFooter,
  StyledIcon,
  StyledIconBox,
  StyledLive,
  StyledProcessBars,
  StyledTag,
  StyledTags,
  StyledTask,
  StyledTaskDesc,
  StyledTaskName,
  StyledCategoryName,
} from './styles';

const STEPS_MAP: { [key: string]: number } = {
  Begginer: 1,
  Intermediate: 2,
  Senior: 3,
};

const QuestItem = ({
  quest: {
    isCampaign,
    is_claimed,
    participation_status,
    live,
    logo,
    name,
    description,
    sub_name,
    total_action,
    action_completed,
    reward,
    is_period,
    difficulty,
    id,
    quest_category_name,
  },
  mt,
  bp,
  onClick,
}: {
  quest: any;
  mt?: number;
  bp?: string;
  onClick?: any;
}) => {
  const router = useRouter();
  const actions = Array.from({ length: total_action }, (val, i) => i);
  return (
    <StyledContainer
      $isCampaign={isCampaign}
      $mt={mt}
      whileHover={{ opacity: 0.9 }}
      onClick={(event) => {
        event.stopPropagation();
        router.push(`/quest/detail?id=${id}`);
        onClick?.();
      }}
      data-bp={bp}
    >
      <StyledTask>
        <StyledIconBox>{logo && <StyledIcon src={logo} $disabled={live === false} />}</StyledIconBox>
        <div>
          <StyledTaskName>{name}</StyledTaskName>
          <StyledTaskDesc $isCampaign={isCampaign}>{sub_name}</StyledTaskDesc>
        </div>
      </StyledTask>
      <div>
        <StyledProcessBars>
          {actions.map((item, i) => (
            <ProcessBar size={4} key={i} value={action_completed >= i + 1 ? 100 : 0} noBorder={true} />
          ))}
        </StyledProcessBars>
        <StyledFooter>
          <StyledTags>
            <StyledTag style={{ padding: '0px 10px 0px 6px' }}>
              <StyledCoin $size={18} />
              <span style={{ color: '#EBF479' }}>{reward} PTS</span>
            </StyledTag>
            {difficulty && (
              <StyledTag>
                <Steps step={STEPS_MAP[difficulty]} />
                {difficulty}
              </StyledTag>
            )}
            {/* <StyledTag>{is_period ? 'Period' : 'Once'}</StyledTag> */}
            {quest_category_name && (
              <StyledCategoryName style={{ color: `var(--${quest_category_name}-color)` }}>
                #{quest_category_name}
              </StyledCategoryName>
            )}
          </StyledTags>
          {is_claimed ? (
            <StyledCalimable style={{ color: '#979ABE' }}>Claimed</StyledCalimable>
          ) : participation_status === 'completed' ? (
            <StyledCalimable>Unclaimed</StyledCalimable>
          ) : (
            ''
          )}
        </StyledFooter>
      </div>

      {live !== undefined && (
        <StyledLive>
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill={live ? '#31B03E' : '#979ABE'} />
          </svg>
          <span>{live ? 'Live' : 'Expired'}</span>
        </StyledLive>
      )}
    </StyledContainer>
  );
};

export default memo(QuestItem);
