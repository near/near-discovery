import nearAsset from '../NearComponents/NearAsset';
import styled from 'styled-components';
import NearImage from '@/components/near/NearComponents/NearImage';
import NearButton2 from '../NearComponents/NearButton2';
import { StyledT2 } from '@/components/near/NearStyled';
import { LARGE_SCREEN, MEDIUM_SCREEN, SMALL_SCREEN } from '@/components/near/NearStyleVar';

const NearHomePagePowered = () => {
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title>
          Composable DeFi <span style={{ color: '#814DFF' }}>Experience</span>
          <StyledIcon src={nearAsset.img.sweat} width={23} height={28} />
        </Title>
        <Title>Powered by BOS</Title>
      </div>
      <StyledButtonGroup>
        <_Button bgStyle={{ left: 5 }}>Discovery</_Button>
        <_Button>Access Point</_Button>
        <_Button bgStyle={{ left: -5 }}>Decentralized Frontend</_Button>
      </StyledButtonGroup>
    </div>
  );
};

const _Button = ({ children, bgStyle }) => {
  return (
    <WrapperButton>
      <StyledButton>{children}</StyledButton>
      <StyledBgButton style={bgStyle} />
    </WrapperButton>
  );
};

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: ${MEDIUM_SCREEN}) {
    flex-direction: column;
    align-items: center;
  }
`;

const WrapperButton = styled.div`
  position: relative;
  margin: 0 20px;
  z-index: 10;
  display: flex;

  @media (max-width: ${MEDIUM_SCREEN}) {
    margin: 0 10px 20px;
    flex-direction: column;
    min-width: 280px;
  }
`;

const StyledButton = styled(NearButton2)`
  border-radius: 55px;
  border: 1px solid #e9f456;
  background: #1e202f;
  color: #ebf479;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  padding: 15px 35px;
  line-height: 1;

  @media (max-width: ${MEDIUM_SCREEN}) {
    // padding: 10px 20px 11px;
  }
`;

const StyledBgButton = styled(NearButton2)`
  position: absolute;
  border-radius: 55px 55px 47px 47px;
  border: 1px solid #e9f456;
  background: #1e202f;
  color: #ebf479;
  width: 100%;
  height: 110%;
  left: 0;
  top: -10px;
  z-index: -1;
`;

const Title = styled(StyledT2)`
  color: #0f1126;
  font-style: normal;
  font-weight: 700;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

const StyledIcon = styled(NearImage)`
  margin-top: -20px;
  margin-left: -5px;

  @media (max-width: ${SMALL_SCREEN}) {
    display: none;
  }
`;

export default NearHomePagePowered;
