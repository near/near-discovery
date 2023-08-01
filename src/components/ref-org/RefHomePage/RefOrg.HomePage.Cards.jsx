import refAsset from '../RefComponents/RefAsset';
import styled from 'styled-components';
import RefCard from '../RefComponents/RefCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import RefImage from '@/components/ref-org/RefComponents/RefImage';
import { MEDIUM_SCREEN } from '@/components/ref-org/RefStyleVar';

const RefOrgHomePageCards = () => {
  return (
    <Wrapper>
      <Swiper spaceBetween={0} slidesPerView={'auto'}>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'zkEVM-bridge'}
            subTitle={'@alpha.near'}
            bg={refAsset.img.zkevmbridge}
            icon={refAsset.logo.zkevm}
            avatar={refAsset.avatar.a}
            rightText={'436\nCollected'}
          >
            <CardContent tags={['Bridge', 'Polygon zkEVM', 'Ethereum']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'Polygon zkEVM Dex'}
            subTitle={'@polygonzkevm.near'}
            bg={refAsset.img.dex}
            icon={refAsset.logo.polygon}
            avatar={refAsset.avatar.b}
            rightText={'130\nCollected'}
          >
            <CardContent tags={['Dexes', 'Polygon zkEVM']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'Gamma'}
            subTitle={'@gamma.near'}
            bg={refAsset.img.gamma}
            icon={refAsset.logo.gamma}
            avatar={refAsset.avatar.c}
            rightText={'130\nCollected'}
          >
            <CardContent tags={['Liquidity manager']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'AAVE v3'}
            subTitle={'@aave-v3.near'}
            bg={refAsset.img.aave}
            icon={refAsset.logo.aave}
            avatar={refAsset.avatar.d}
            rightText={'236\nCollected'}
          >
            <CardContent tags={['Lending']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'NEAR All-in-one'}
            subTitle={'@aabbcc.near'}
            bg={refAsset.img.allinone}
            icon={refAsset.logo.near}
            avatar={refAsset.avatar.e}
            rightText={'436\nCollected'}
          >
            <CardContent tags={['Dexes', 'Lending', 'Liquid Staking', 'NEAR']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'NEAR Staking'}
            subTitle={'@aabbcc.near'}
            bg={refAsset.img.nearstaking}
            icon={refAsset.logo.nearstaking}
            avatar={refAsset.avatar.e}
            rightText={'236\nCollected'}
          >
            <CardContent tags={['Liquid Staking', 'NEAR']} />
          </StyledRefCard>
        </StyledSwiperSlide>
      </Swiper>
    </Wrapper>
  );
};

const CardContent = ({ tags }) => {
  return (
    <StyledCardContent>
      <StyledBadges>
        {tags?.map((d) => (
          <Badge key={d}>{d}</Badge>
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
    node.push(<StyledFireIcon src={refAsset.img.iconFire} width={14} height={18} key={i} />);
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
  margin-left: 60px;

  @media (max-width: ${MEDIUM_SCREEN}) {
    margin-left: 20px;
  }
`;

const StyledRefCard = styled(RefCard)`
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

const StyledFireIcon = styled(RefImage)`
  margin-right: 5px;
`;

const Badge = styled.div`
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(26, 46, 51, 0.25);
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  padding: 4px 11px;
  margin-right: 5px;

  @media (max-width: ${MEDIUM_SCREEN}) {
    font-size: 12px;
  }
`;

export default RefOrgHomePageCards;
