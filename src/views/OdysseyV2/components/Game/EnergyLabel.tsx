import styled from 'styled-components';

const StyledContainer = styled.div`
  position: relative;
  width: 161px;
  height: 72px;
`;

const StyledLabelBg = styled.div`
  background-image: url(/images/odyssey/v2/enerty_label.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const StyledContent = styled.div`
  position: relative;
  z-index: 5;
  margin-left: -10px;
`;

const StyledAmount = styled.div`
  color: #000;
  text-align: center;
  font-family: Trans-America;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: -16px;
  margin-top: -3px;
`;

const StyledDesc = styled.div`
  color: #000;
  text-align: center;
  font-family: Trans-America;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

export default function EneryLabel({ amount }: any) {
  return (
    <StyledContainer>
      <StyledLabelBg style={{ zIndex: 3 }} />
      {amount > 1 && <StyledLabelBg style={{ zIndex: 2, right: '-3px', bottom: '-3px' }} />}
      {amount > 2 && <StyledLabelBg style={{ zIndex: 1, right: '-6px', bottom: '-6px' }} />}
      <StyledContent>
        <StyledAmount>{amount}</StyledAmount>
        <StyledDesc>ENERGY</StyledDesc>
      </StyledContent>
    </StyledContainer>
  );
}
