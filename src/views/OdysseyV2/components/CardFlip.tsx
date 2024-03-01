import styled from 'styled-components';

const StyledContainer = styled.div<{ $disabled: boolean }>`
  width: 91px;
  height: 42px;
  flex-shrink: 0;
  text-align: center;
  font-family: Trans-America;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ $disabled }) =>
    $disabled
      ? `
  border-radius: 5px;
  border: 1px dashed #454851;
  background: #1E2026;
  color: #454851;
  `
      : `
      border-radius: 8px;
      background: url(/images/odyssey/v2/card_flip.png);
      color: #000;
      `}
`;

const StyledAmount = styled.div`
  font-size: 20px;
  margin-bottom: -10px;
  margin-top: -3px;
`;

export default function CardFlip({ amount, disabled }: any) {
  return (
    <StyledContainer $disabled={disabled}>
      <StyledAmount>{amount}</StyledAmount>
      <div>ENERGY</div>
    </StyledContainer>
  );
}
