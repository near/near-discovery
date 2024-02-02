import { memo, useRef } from 'react';

import QuestItem from '@/views/Quest/components/QuestItem';
import { formatPeriodDate } from '@/views/Quest/helpers';
import useLike from '@/views/Quest/hooks/useLike';
import { Swiper, SwiperSlide } from 'swiper/react';
import useQuestList from '../../hooks/useQuestList';
import Timer from '../Timer';

import Loading from '@/components/Icons/Loading';
import { useRouter } from 'next/router';
import {
  StyledButton,
  StyledCampaipnContainer,
  StyledCampaipnsContainer,
  StyledCoin,
  StyledDesc,
  StyledFlex,
  StyledHeader,
  StyledLoadingWrapper,
  StyledQuestCampaign,
  StyledQuestList,
  StyledSvg,
  StyledSwiperButton,
  StyledTag,
  StyledTags,
  StyledText,
  StyledTimerBox,
  StyledTitle,
  StyledWrapper,
} from './styles';

const iconLeft = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path d="M9 1L2 8L9 15" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
);
const iconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path d="M1 1L8 8L1 15" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
);
const iconExploreRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
    <path
      d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"
      fill="#1E2028"
    />
  </svg>
);
const Campaign = ({ campaign, categories, bp }: { campaign: any; categories: any; bp?: string }) => {
  const router = useRouter();
  const { like, handleLike } = useLike(campaign.id, 'quest_campaign');
  const handleClickExplore = function (event: any) {
    event.stopPropagation();
    router.push('/quest/leaderboard/' + campaign.name.replace(/\s/g, ''));
  };
  return (
    <StyledCampaipnContainer onClick={handleClickExplore}>
      <StyledFlex $direction="column" $align="flex-start">
        <StyledFlex $align="flex-start" $justify="space-between">
          <StyledWrapper style={{ width: 665 }}>
            <StyledHeader>
              <StyledTitle>{campaign.name}</StyledTitle>
            </StyledHeader>
            <StyledDesc>{campaign.description}</StyledDesc>
          </StyledWrapper>
          <StyledButton
            $width="506px"
            $height="auto"
            $background="#2C2E3E"
            $borderRadius="33px"
            style={{ paddingTop: 8, paddingRight: 8, paddingBottom: 8, paddingLeft: 40 }}
          >
            <StyledTimerBox>
              {campaign.start_time > Date.now() && <div>Upcoming</div>}
              {campaign.start_time > Date.now() ? (
                <Timer endTime={Number(campaign.start_time)} />
              ) : (
                <Timer endTime={Number(campaign.end_time)} />
              )}
            </StyledTimerBox>
            <StyledButton
              style={{ marginLeft: 48 }}
              $width="227px"
              $borderRadius="27px"
              $background="linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%)"
            >
              <StyledText $color="#02051E" $size="16px" $weight="700">
                Explore now
              </StyledText>
              <StyledSvg style={{ marginLeft: 9 }}>{iconExploreRight}</StyledSvg>
            </StyledButton>
          </StyledButton>
        </StyledFlex>
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
      </StyledFlex>
    </StyledCampaipnContainer>
  );
};
const QuestList = ({ questList, bp }: any) => {
  const swiperRef = useRef<any>(null);
  const handleClickSlideButton = function (event: any, type: string) {
    event.stopPropagation();
    if (type === 'prev') {
      swiperRef.current && swiperRef.current.slidePrev();
    } else {
      swiperRef.current && swiperRef.current.slideNext();
    }
  };
  return (
    <StyledQuestList>
      <Swiper
        width={402}
        spaceBetween={15}
        slidesPerView={1}
        slidesPerGroupSkip={3}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {questList.map((quest: any, index: number) => (
          <SwiperSlide key={index}>
            <QuestItem quest={quest} bp={bp} />
          </SwiperSlide>
        ))}
      </Swiper>
      <StyledSwiperButton onClick={(event) => handleClickSlideButton(event, 'prev')}>{iconLeft}</StyledSwiperButton>
      <StyledSwiperButton className="right" onClick={(event) => handleClickSlideButton(event, 'next')}>
        {iconRight}
      </StyledSwiperButton>
    </StyledQuestList>
  );
};

const QuestCampaign = ({ campaign, categories, bp }: any) => {
  const { loading, questList } = useQuestList(campaign.id);
  return loading ? (
    <StyledLoadingWrapper>
      <Loading size={60} />
    </StyledLoadingWrapper>
  ) : (
    <StyledQuestCampaign data-bp={bp?.wrap}>
      <Campaign campaign={campaign} categories={categories} />
      <QuestList questList={questList} bp={bp?.card} />
    </StyledQuestCampaign>
  );
};
const Index = ({ onLoad, campaigns, categories, bp }: any) => {
  return (
    <StyledCampaipnsContainer>
      <StyledHeader style={{ marginTop: 40, marginBottom: 20 }}>Quest Campaign</StyledHeader>
      <StyledFlex $direction="column" $gap="30px">
        {campaigns.map((campaign: any) => (
          <QuestCampaign key={campaign.id} campaign={campaign} categories={categories} bp={bp} />
        ))}
      </StyledFlex>
    </StyledCampaipnsContainer>
  );
};

export default memo(Index);
