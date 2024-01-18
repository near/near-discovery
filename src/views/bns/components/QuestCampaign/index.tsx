import { memo, useRef } from 'react';


import QuestItem from '@/views/Quest/components/QuestItem';
import Timer from '@/views/Quest/components/Timer';
import { formatPeriodDate } from '@/views/Quest/helpers';
import useLike from '@/views/Quest/hooks/useLike';
import useQuestList from '../../hooks/useQuestList';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import Loading from '@/components/Icons/Loading';
import {
  StyledBox,
  StyledCampaipnContainer,
  StyledCampaipnsContainer,
  StyledCoin,
  StyledDesc,
  StyledHeader,
  StyledLoadingWrapper,
  StyledQuestCampaign,
  StyledQuestList,
  StyledSwiperButton,
  StyledTag,
  StyledTags,
  StyledTimerBox,
  StyledTitle,
  StyledFlex
} from './styles';


const iconLeft = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path d="M9 1L2 8L9 15" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
)
const iconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path d="M1 1L8 8L1 15" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
)
const Campaign = ({ campaign, categories }: { campaign: any; categories: any }) => {
  const { like, handleLike } = useLike(campaign.id, 'quest_campaign');
  return (
    <StyledCampaipnContainer>
      <StyledBox>
        <div>
          <StyledHeader>
            <StyledTitle>{campaign.name}</StyledTitle>
          </StyledHeader>
          <StyledDesc>{campaign.description}</StyledDesc>
        </div>
        <StyledTags>
          <StyledTag style={{ padding: '0px 10px 0px 6px' }}>
            <StyledCoin $size={20} />
            <span style={{ color: '#EBF479' }}>Extra {campaign.reward} PTS</span>
          </StyledTag>
          <StyledTag>
            <span>{campaign.quests.total} Quests:</span>
            {campaign.quests.total_category
              .sort((a: any, b: any) => a.quest_category_id - b.quest_category_id)
              .map(({ total, quest_category_id }: { total: number; quest_category_id: number }) => (
                <span style={{ color: `var(--${categories[quest_category_id]?.name}-color` }} key={quest_category_id}>
                  {total} #{categories[quest_category_id]?.name}
                </span>
              ))}
          </StyledTag>
          <StyledTag>{formatPeriodDate(campaign.start_time, campaign.end_time)} UTC</StyledTag>
        </StyledTags>
      </StyledBox>
      <StyledBox>
        <StyledTimerBox>
          {campaign.start_time > Date.now() && <div>Upcoming</div>}
          {campaign.start_time > Date.now() ? (
            <Timer endTime={Number(campaign.start_time)} />
          ) : (
            <Timer endTime={Number(campaign.end_time)} />
          )}
        </StyledTimerBox>
      </StyledBox>
    </StyledCampaipnContainer>
  );
};
const SlideButtonList = function () {
  const swiper = useSwiper()
  const handleClickSlideButton = function (type: string) {
    if (type === 'prev') {
      swiper.slidePrev()
    } else {
      swiper.slideNext()
    }
  }
  return (
    <>
      <StyledSwiperButton onClick={() => handleClickSlideButton('prev')}>{iconLeft}</StyledSwiperButton>
      <StyledSwiperButton className='right' onClick={() => handleClickSlideButton('next')}>{iconRight}</StyledSwiperButton>
    </>
  )
}
const QuestList = ({ questList }: any) => {
  return (
    <StyledQuestList>
      <Swiper
        spaceBetween={18}
        slidesPerView={4}
      >
        {
          questList.map((quest: any, index: number) => (
            <SwiperSlide key={index}>
              <QuestItem quest={quest} />
            </SwiperSlide>
          ))
        }
        <SlideButtonList />
      </Swiper>
    </StyledQuestList>
  )
}

const QuestCampaign = ({ campaign, categories }: any) => {
  const { loading, questList } = useQuestList(campaign.id);
  return loading ? (
    <StyledLoadingWrapper>
      <Loading size={60} />
    </StyledLoadingWrapper>
  ) : (
    <StyledQuestCampaign>
      <Campaign campaign={campaign} categories={categories} />
      <QuestList questList={questList} />
    </StyledQuestCampaign>
  )
}
const Index = ({ onLoad, campaigns, categories }: any) => {
  return (
    <StyledCampaipnsContainer>
      <StyledHeader style={{ marginTop: 40, marginBottom: 20 }}>
        <StyledTitle>Quest Campaign</StyledTitle>
      </StyledHeader>
      <StyledFlex $direction='column' $gap='30px'>
        {campaigns.map((campaign: any) => <QuestCampaign key={campaign.id} campaign={campaign} categories={categories} />)}
      </StyledFlex>
    </StyledCampaipnsContainer>
  );
};

export default memo(Index);
