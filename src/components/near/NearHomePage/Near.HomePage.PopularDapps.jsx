import styled, { css } from 'styled-components';

import { StyledT2, StyledT4 } from '@/components/near/NearStyled';
import { MEDIUM_SCREEN } from '@/components/near/NearStyleVar';

import nearAsset from '../NearComponents/NearAsset';
import NearButton2 from '../NearComponents/NearButton2';
import NearImage from '../NearComponents/NearImage';

const NearHomePagePopularDapps = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>The most popular Dapps</Title>
        <Desc>Make your DeFi actions simple, fast and traceable</Desc>
      </TitleWrapper>
      <AbsoluteWrapper>
        <PCBg src={nearAsset.img.pc_popular_bg} width={871} height={429} />
      </AbsoluteWrapper>

      <PopularDappsWrapper>
        <PCBg src={nearAsset.img.populardapps} width={536} height={90} />

        <MobileBg src={nearAsset.img.mpopulardapps} width={428} height={436} />

        <StyledMoreButton>
          More <ArrowRight />
        </StyledMoreButton>
      </PopularDappsWrapper>

      {/* <MobileBg src={nearAsset.img.mpopulardapps} width={428} height={436} /> */}

      <NearButtonWrapper>
        <PCBg src={nearAsset.img.cand_more_dapps} width={1000} height={229} />

        <MobileBg
          style={{
            position: 'relative',
            bottom: '200px',
          }}
          src={nearAsset.img.mobile_more_dapps}
          width={359}
          height={319}
        />
      </NearButtonWrapper>
    </Wrapper>
  );
};

const PopularDappsWrapper = styled.div`
  display: flex;
  padding-top: 120px;
  padding-bottom: 60px;
  align-items: center;
  gap: 20px;
  justify-content: center;

  @media (max-width: ${MEDIUM_SCREEN}) {
    display: box;
    padding-top: 20px;
  }
`;

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16" fill="none">
    <path
      d="M29.6482 8.77352C30.0388 8.38299 30.0388 7.74983 29.6482 7.3593L23.2843 0.99534C22.8937 0.604816 22.2606 0.604816 21.8701 0.99534C21.4795 1.38586 21.4795 2.01903 21.8701 2.40955L27.5269 8.06641L21.8701 13.7233C21.4795 14.1138 21.4795 14.747 21.8701 15.1375C22.2606 15.528 22.8937 15.528 23.2843 15.1375L29.6482 8.77352ZM0.529297 9.06641L28.9411 9.06641L28.9411 7.06641L0.529297 7.06641L0.529297 9.06641Z"
      fill="white"
    />
  </svg>
);

const BREAK_POINT = '803px';
const Wrapper = styled.div`
  position: relative;
  height: 430px;

  @media (max-width: ${MEDIUM_SCREEN}) {
    height: 436px;
  }
`;

const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: -60px;
  z-index: 3;
`;

const Title = styled(StyledT2)`
  text-transform: capitalize;
  margin-bottom: 13px;
`;

const Desc = styled(StyledT4)``;

const AbsoluteWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const MobileBg = styled(NearImage)`
  @media (min-width: ${MEDIUM_SCREEN}) {
    display: none;
  }
  @media (max-width: ${MEDIUM_SCREEN}) {
    display: block;
  }
`;

const PCBg = styled(NearImage)`
  @media (max-width: ${MEDIUM_SCREEN}) {
    display: none;
  }
`;

const StyledMoreButton = styled.div`
  border-radius: 26px;
  border: 1px solid #fff;
  height: 88px;
  width: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  left: 670px;
  top: 117px;

  @media (max-width: ${MEDIUM_SCREEN}) {
    left: 220px;
    top: 230px;
    width: 72px;
    height: 72px;

    position: absolute;
  }
`;

const NearButtonWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
`;

const NearButtonShared = css`
  border-radius: 20px;
  color: #fff;
  font-size: 24px;
  height: 59px;
  width: 247px;
  position: relative;
  line-height: 1;

  &:hover {
    color: inherit;
  }
`;

const NearButton = styled(NearButton2)`
  ${NearButtonShared}
  background: #1cd7b5;
  top: 261px;
  left: -65px;
  box-shadow: 10px -8px 10px 0px rgba(0, 0, 0, 0.25);
  transform: rotate(-6deg);

  @media (max-width: ${MEDIUM_SCREEN}) {
    font-size: 18px;
    top: 298px;
  }

  @media (max-width: ${BREAK_POINT}) {
    left: -27px;
    font-size: 16px;
  }
`;
const PolygonButton = styled(NearButton2)`
  ${NearButtonShared}
  background: #6f63f5;
  box-shadow: 10px -6px 10px 0px rgba(0, 0, 0, 0.25);
  transform: rotate(6deg);
  top: 321px;
  left: 61px;
  z-index: 3;

  @media (max-width: ${MEDIUM_SCREEN}) {
    font-size: 18px;
    top: 353px;
  }

  @media (max-width: ${BREAK_POINT}) {
    left: 27px;
    top: 353px;
    font-size: 16px;
  }
`;

export default NearHomePagePopularDapps;
