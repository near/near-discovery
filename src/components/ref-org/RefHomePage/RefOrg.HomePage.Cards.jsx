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
            subTitle={'@reffer.near'}
            bg={refAsset.img.zkevmbridge}
            icon={refAsset.logo.zkevm}
            avatar={refAsset.logo.near}
            rightText={'436\nCollected'}
          >
            <CardContent tags={['Bridge', 'Polygon zkEVM', 'Ethereum']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'Polygon zkEVM Dex'}
            subTitle={'@reffer.near'}
            bg={refAsset.img.dex}
            icon={refAsset.logo.polygon}
            avatar={refAsset.logo.near}
            rightText={'130\nCollected'}
          >
            <CardContent tags={['Dexes', 'Polygon zkEVM']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'Gamma'}
            subTitle={'@reffer.near'}
            bg={refAsset.img.gamma}
            icon={refAsset.logo.gamma}
            avatar={refAsset.logo.near}
            rightText={'130\nCollected'}
          >
            <CardContent tags={['Liquidity manager']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'AAVE v3'}
            subTitle={'@reffer.near'}
            bg={refAsset.img.aave}
            icon={refAsset.logo.aave}
            avatar={refAsset.logo.near}
            rightText={'236\nCollected'}
          >
            <CardContent tags={['Lending']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'NEAR All-in-one'}
            subTitle={'@reffer.near'}
            bg={refAsset.img.allinone}
            icon={refAsset.logo.near}
            avatar={refAsset.logo.near}
            rightText={'436\nCollected'}
          >
            <CardContent tags={['Dexes', 'Lending', 'Liquid Staking', 'NEAR']} />
          </StyledRefCard>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <StyledRefCard
            title={'NEAR Staking'}
            subTitle={'@reffer.near'}
            bg={refAsset.img.nearstaking}
            icon={refAsset.logo.nearstaking}
            avatar={refAsset.logo.near}
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
    <div className={'d-flex ml-1 mt-3 mb-2 align-items-center justify-content-between'}>
      <div className={'d-flex'}>
        {tags?.map((d) => (
          <Badge key={d}>{d}</Badge>
        ))}
      </div>
      <div>
        <_FireIcon length={3} />
      </div>
    </div>
  );
};

const _FireIcon = ({ length = 1 }) => {
  const node = [];
  for (let i = 0; i < length; i++) {
    node.push(<StyledFireIcon src={refAsset.img.iconFire} width={14} height={18} />);
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
`;

const StyledRefCard = styled(RefCard)`
  //margin-right: 20px;
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
`;

export default RefOrgHomePageCards;
