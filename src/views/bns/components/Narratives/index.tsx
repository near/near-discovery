import { memo, useRef } from 'react';

import Loading from '@/components/Icons/Loading';
import QuestItem from '@/views/Quest/components/QuestItem';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import useQuestList from '../../hooks/useQuestList';
import {
  StyledButton,
  StyledCampaign,
  StyledContainer,
  StyledFlex,
  StyledHeader,
  StyledLoadingWrapper,
  StyledSvg,
  StyledText,
  StyledWrapper,
  StyledExplore
} from './styles';
const iconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
    <path d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z" />
  </svg>
)
const iconSwiperLeft = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path d="M9 1L2 8L9 15" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
)
const iconSwiperRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path d="M1 1L8 8L1 15" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
)
const Campaign = function ({ campaign }: any) {
  const router = useRouter()
  const { loading, questList } = useQuestList(campaign.id)
  const swiperRef = useRef<any>(null);
  const handleClickSlideButton = function (event: any, type: string) {
    event.stopPropagation()
    if (type === 'prev') {
      swiperRef.current && swiperRef.current.slidePrev()
    } else {
      swiperRef.current && swiperRef.current.slideNext()
    }
  }
  const handleClickCampaign = function (event: any) {
    router.push('/bns/campaign?id=' + campaign.id)
  }
  return (
    <StyledCampaign onClick={handleClickCampaign}>
      <StyledWrapper style={{ width: 320 }}>
        <StyledText $size='32px' $weight='700' $line='120%'>{campaign.name}</StyledText>
        <StyledText $size='14px' $line="150%" style={{ marginTop: 20, marginBottom: 20 }}>{campaign.description}</StyledText>
        <StyledButton
          $width='75px'
          $height='30px'
          $background='rgba(0, 0, 0, 0.30)'
          $borderColor='rgba(255, 255, 255, 0.15)'
          style={{ marginBottom: 19 }}
        >
          <StyledText $size='14px' $weight='500'>{campaign.quests.total} Qusts</StyledText>
        </StyledButton>
        <StyledExplore>
          <StyledFlex $gap='9px'>
            <StyledText $size='16px' $weight='700'>Explore now</StyledText>
            <StyledSvg>{iconRight}</StyledSvg>
          </StyledFlex>
        </StyledExplore>
      </StyledWrapper>
      <StyledWrapper style={{ width: 823 }}>
        <Swiper
          width={402}
          spaceBetween={15}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {
            questList.map((quest: any, index: number) => (
              <SwiperSlide key={index}>
                <QuestItem quest={quest} />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <StyledFlex
          $justify='flex-end'
          $gap='18px'
          style={{ marginTop: 20, position: 'relative', zIndex: 10 }}
        >
          <StyledButton
            $width='36px'
            $height='36px'
            $background='#393A4C'
            onClick={(event) => handleClickSlideButton(event, 'prev')}
          >
            {iconSwiperLeft}
          </StyledButton>
          <StyledButton
            $width='36px'
            $height='36px'
            $background='#393A4C'
            onClick={(event) => handleClickSlideButton(event, 'next')}
          >
            {iconSwiperRight}
          </StyledButton>
        </StyledFlex>
      </StyledWrapper>
    </StyledCampaign>
  )

}
const Narratives = ({ campaigns, loading }: any) => {
  return (
    <StyledContainer>
      <StyledHeader style={{ marginTop: 50, marginBottom: 17 }}>Narratives</StyledHeader>
      {loading ? (
        <StyledLoadingWrapper>
          <Loading size={60} />
        </StyledLoadingWrapper>
      ) : (
        <StyledFlex>
          {
            campaigns.map((campaign: any, index: number) => {
              return (
                <Campaign key={index} campaign={campaign} />
              )
            })
          }
        </StyledFlex>
      )}
    </StyledContainer>
  );
};

export default memo(Narratives);
