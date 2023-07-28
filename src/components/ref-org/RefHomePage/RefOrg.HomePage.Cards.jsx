import refAsset from '../RefComponents/RefAsset';
import styled from 'styled-components';
import RefCard from '../RefComponents/RefCard';
import { Swiper, SwiperSlide } from 'swiper/react';

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
      </Swiper>
    </Wrapper>
  );
};

const CardContent = ({ tags }) => {
  return (
    <div className={'d-flex mt-3 mb-2'}>
      {tags?.map((d) => (
        <Badge key={d}>{d}</Badge>
      ))}
    </div>
  );
};

const Wrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: fit-content;
  margin-left: 60px;
`;

const StyledRefCard = styled(RefCard)`
  //margin-right: 20px;
`;

const Badge = styled.div`
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(26, 46, 51, 0.25);
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  padding: 6px 15px;
  margin-right: 10px;
`;

export default RefOrgHomePageCards;
