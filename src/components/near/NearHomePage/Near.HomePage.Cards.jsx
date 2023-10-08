import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import NearImage from '@/components/near/NearComponents/NearImage';
import { MEDIUM_SCREEN } from '@/components/near/NearStyleVar';

import nearAsset from '../NearComponents/NearAsset';
import NearCard from '../NearComponents/NearCard';

const NearHomePageCards = () => {
  const router = useRouter();
  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <Wrapper>
      <Swiper
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={'auto'}
        modules={[Autoplay]}
        centeredSlides={isMobile}
      >
        <StyledSwiperSlide canClick={true}>
          <StyledRefCard
            title={'Polygon zkEVM All-in-one'}
            subTitle={'@bluebiu.near'}
            bg={nearAsset.img.polygon_zkevm_all_in_one}
            icon={nearAsset.logo.zkevm}
            avatar={nearAsset.avatar.a}
            // rightText={'436\nCollected'}
            onClick={() => handleClick('/bluebiu.near/widget/ZKEVM-all-in-one')}
          >
            <CardContent tags={['Dexes', 'Bridge', 'Lending', 'Liquidity Manage']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide canClick={true}>
          <StyledRefCard
            title={'NEAR All-in-one'}
            subTitle={'@juaner.near'}
            bg={nearAsset.img.near_all_in_one}
            icon={nearAsset.logo.near_all_in_one}
            avatar={nearAsset.avatar.b}
            // rightText={'130\nCollected'}
            onClick={() => handleClick('/juaner.near/widget/ref-home')}
          >
            <CardContent tags={['Bridge', 'Dexes', 'Lending', 'Staking']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide canClick={false}>
          <StyledRefCard
            title={'BASE All-in-one'}
            subTitle={'@bluebiu.near'}
            bg={nearAsset.img.base_all_in_one}
            icon={nearAsset.logo.base_all_in_one}
            avatar={nearAsset.avatar.c}
            // rightText={'130\nCollected'}
            onClick={null}
          >
            <CardContent tags={['Bridge', 'Dexes', 'Lending']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide canClick={false}>
          <StyledRefCard
            title={'Mantle All-in-one'}
            subTitle={'@bluebiu.near'}
            bg={nearAsset.img.mantle_all_in_one}
            icon={nearAsset.logo.mantle_all_in_one}
            avatar={nearAsset.avatar.d}
            // rightText={'236\nCollected'}
            onClick={null}
          >
            <CardContent tags={['Bridge', 'Dexes', 'Lending']} />
          </StyledRefCard>
        </StyledSwiperSlide>
      </Swiper>
    </Wrapper>
  );
};

const badgetBg = {
  Dexes: '#ACFCED',
  Bridge: '#E3E99D',
  Lending: '#ADFFB5',
  'Liquidity Manage': '#AAD6FF',
  Staking: '#C1BFFF',
};
const CardContent = ({ tags }) => {
  return (
    <StyledCardContent>
      <StyledBadges>
        {tags?.map((d, index) => (
          <Badge
            style={{
              background: badgetBg[d],
            }}
            key={d}
          >
            {d}
          </Badge>
        ))}
      </StyledBadges>
      <StyledFires>
        <_FireIcon length={3} />
      </StyledFires>
    </StyledCardContent>
  );
};

const _FireIcon = ({ length = 1 }) => {
  const node = [];
  for (let i = 0; i < length; i++) {
    node.push(<StyledFireIcon src={nearAsset.img.iconFire} width={14} height={18} key={i} />);
  }

  return node;
};

const Wrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 20px;

  @media (max-width: ${MEDIUM_SCREEN}) {
    margin-top: 20px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: fit-content;
  margin-left: 30px;
  cursor: ${(p) => (p.canClick ? 'pointer' : 'auto')};
  padding: 10px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: ${MEDIUM_SCREEN}) {
    margin-left: 0;
  }
`;

const StyledRefCard = styled(NearCard)`
  //margin-right: 20px;
`;

const StyledCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 0;

  @media (max-width: ${MEDIUM_SCREEN}) {
    display: block;
  }
`;

const StyledBadges = styled.div`
  display: flex;

  @media (max-width: ${MEDIUM_SCREEN}) {
    margin-bottom: 10px;
  }
`;

const StyledFires = styled.div`
  @media (max-width: ${MEDIUM_SCREEN}) {
    display: none;
  }
`;

const StyledFireIcon = styled(NearImage)`
  margin-right: 5px;
`;

const Badge = styled.div`
  border-radius: 30px;
  background: rgba(26, 46, 51, 0.25);
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  padding: 6px 11px;
  margin-right: 5px;
  color: #000000;
  @media (max-width: ${MEDIUM_SCREEN}) {
    font-size: 12px;
  }
`;

export default NearHomePageCards;
