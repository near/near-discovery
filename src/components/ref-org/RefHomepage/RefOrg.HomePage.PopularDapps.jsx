import refAsset from '../RefComponents/RefAsset';
import styled from 'styled-components';
import RefImage from '../RefComponents/RefImage';
import RefButton from '../RefComponents/RefButton';

const RefOrgHomePagePopularDapps = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>The most popular Dapps</Title>
        <Desc>Make your DeFi actions simple, fast and traceable</Desc>
      </TitleWrapper>

      <AbsoluteWrapper>
        <StyledMoreButton
          style={{
            position: 'absolute',
            left: 670,
            top: 117,
          }}
        >
          More <ArrowRight />
        </StyledMoreButton>

        <RefImage src={refAsset.img.populardapps} width={871} height={430} />
      </AbsoluteWrapper>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <NearButton>Near</NearButton>
        <PolygonButton>Polygon zkEVM</PolygonButton>
      </div>
    </Wrapper>
  );
};

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16" fill="none">
    <path
      d="M29.6482 8.77352C30.0388 8.38299 30.0388 7.74983 29.6482 7.3593L23.2843 0.99534C22.8937 0.604816 22.2606 0.604816 21.8701 0.99534C21.4795 1.38586 21.4795 2.01903 21.8701 2.40955L27.5269 8.06641L21.8701 13.7233C21.4795 14.1138 21.4795 14.747 21.8701 15.1375C22.2606 15.528 22.8937 15.528 23.2843 15.1375L29.6482 8.77352ZM0.529297 9.06641L28.9411 9.06641L28.9411 7.06641L0.529297 7.06641L0.529297 9.06641Z"
      fill="white"
    />
  </svg>
);

const Wrapper = styled.div`
  position: relative;
  height: 430px;
`;

const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: -60px;
  z-index: 3;
`;

const Title = styled.div`
  color: #fff;
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 1.2;
  margin-bottom: 13px;
`;

const Desc = styled.div`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

const AbsoluteWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
`;

const NearButton = styled(RefButton)`
  border-radius: 20px;
  background: #1cd7b5;
  box-shadow: 10px -8px 10px 0px rgba(0, 0, 0, 0.25);
  transform: rotate(-6deg);
  color: #fff;
  font-size: 24px;
  height: 59px;
  width: 247px;
  position: relative;
  top: 261px;
  left: 172px;
`;
const PolygonButton = styled(RefButton)`
  border-radius: 20px;
  background: #6f63f5;
  box-shadow: 10px -6px 10px 0px rgba(0, 0, 0, 0.25);
  transform: rotate(6deg);
  color: #fff;
  font-size: 24px;
  height: 59px;
  width: 240px;
  position: relative;
  top: 321px;
  left: -186px;
`;

export default RefOrgHomePagePopularDapps;
