import refAsset from '../RefComponents/RefAsset';
import styled from 'styled-components';
import RefImage from '@/components/ref-org/RefComponents/RefImage';
import RefButton from '../RefComponents/RefButton';

const RefOrgHomePagePowered = () => {
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <Title>
          Composable DeFi <span style={{ color: '#814DFF' }}>Experience</span>
          <RefImage src={refAsset.img.sweat} width={23} height={28} style={{ marginTop: -20, marginLeft: -11 }} />
        </Title>
        <Title>Powered by BOS</Title>
      </div>
      <div className={'d-flex justify-content-center'}>
        <_Button bgStyle={{ left: 5 }}>Discovery</_Button>
        <_Button>Access Point</_Button>
        <_Button bgStyle={{ left: -5 }}>Decentralized Frontend</_Button>
      </div>
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

const WrapperButton = styled.div`
  position: relative;
  margin: 0 20px;
  z-index: 10;
`;

const StyledButton = styled(RefButton)`
  border-radius: 55px;
  border: 1px solid #e9f456;
  background: #1e202f;
  color: #ebf479;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  padding: 15px 35px;
`;

const StyledBgButton = styled(RefButton)`
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

const Title = styled.div`
  color: #0f1126;
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

export default RefOrgHomePagePowered;
