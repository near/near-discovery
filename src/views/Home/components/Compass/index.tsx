import CompassIcon from '@/components/Icons/Compass';
import Loading from '@/components/Icons/Loading';
import WinPtsIcon from '@/components/Icons/WinPts';
import useToast from '@/hooks/useToast';
import { get } from '@/utils/http';
import { useRouter } from 'next/router';
import { memo, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import odyssey from '@/config/odyssey';
import useCompassList from './hooks/useCompassList';
import { useDebounceFn } from 'ahooks';
import {
  StyledCard,
  StyledCardBackgroundImage,
  StyledCardButton,
  StyledCardDesc,
  StyledCardMainContent,
  StyledCardTitle,
  StyledCompassIcon,
  StyledContainer,
  StyledContent,
  StyledInner,
  StyledLoadingWrapper,
  StyledRadialBg,
  StyledRadialBg2,
  StyledTitle,
  StyledWinPtsIcon,
  StyledSwiperWrapper,
  StyledSwiperPrevButton,
  StyledSwiperNextButton,
  StyledChainsImg,
} from './styles';

const iconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="38" viewBox="0 0 13 38" fill="none">
    <path d="M1 1L11 19L1 37" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
);
const Card = function ({ compass }: any) {
  const toast = useToast();
  const router = useRouter();
  const handleExplore = async function () {
    let status = compass.status;
    if (status === 'un_start') {
      const response = await get('/api/compass?id=' + compass.id);
      status = response.data.status;
    }
    if (status === 'un_start') {
      toast.fail({
        title: 'Odyssey is upcoming...',
      });
      return;
    }
    if (!odyssey[compass.id]) return;
    router.push(odyssey[compass.id].path);
  };
  return (
    <StyledCard>
      <StyledCardBackgroundImage width={646} height={323} src={compass.banner} alt={compass.name} />
      <StyledCardMainContent>
        {odyssey[compass.id]?.chainsImg && (
          <StyledChainsImg src={odyssey[compass.id]?.chainsImg} style={{ height: odyssey[compass.id]?.chainsHeight }} />
        )}
        <StyledCardTitle>{compass.name}</StyledCardTitle>
        <StyledCardDesc>{compass.description}</StyledCardDesc>
      </StyledCardMainContent>
      <StyledCardButton onClick={handleExplore} data-bp="1001-003">
        <div>Explore now</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
          <path
            d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"
            fill="black"
          />
        </svg>
      </StyledCardButton>
    </StyledCard>
  );
};
const Compass = () => {
  const { loading, compassList } = useCompassList();
  const swiperRef = useRef<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const currentCompass = useMemo(() => compassList[activeIndex], [activeIndex, compassList]);
  const { run: changeActiveIndex } = useDebounceFn(
    (activeIndex) => {
      console.log('activeIndex', activeIndex);
      setActiveIndex(activeIndex);
    },
    { wait: 100 },
  );

  return loading ? (
    <StyledLoadingWrapper>
      <Loading size={60} />
    </StyledLoadingWrapper>
  ) : (
    <StyledContainer>
      <StyledContent>
        <StyledRadialBg />
        <StyledRadialBg2 />
        <StyledCompassIcon>
          <CompassIcon />
        </StyledCompassIcon>
        {odyssey[currentCompass?.id]?.showPrizeLabel && (
          <StyledWinPtsIcon>
            <WinPtsIcon num="10,000" />
          </StyledWinPtsIcon>
        )}

        <StyledInner>
          <StyledTitle>Odyssey</StyledTitle>
          <StyledSwiperWrapper>
            <Swiper
              width={1244}
              modules={[Autoplay]}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              speed={1000}
              loop
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                changeActiveIndex(swiper.realIndex);
              }}
            >
              {compassList.map((compass: any, index: number) => (
                <SwiperSlide key={index}>
                  <Card compass={compass} />
                </SwiperSlide>
              ))}
            </Swiper>
            {swiperRef.current && swiperRef.current.activeIndex > 0 && (
              <StyledSwiperPrevButton
                onClick={() => {
                  swiperRef.current && swiperRef.current.slidePrev();
                }}
              >
                {iconRight}
              </StyledSwiperPrevButton>
            )}
            {activeIndex < compassList.length - 1 && (
              <StyledSwiperNextButton
                onClick={() => {
                  swiperRef.current && swiperRef.current.slideNext();
                }}
              >
                {iconRight}
              </StyledSwiperNextButton>
            )}
          </StyledSwiperWrapper>
        </StyledInner>
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Compass);
