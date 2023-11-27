import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`;

export const StyledCoin = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size - 0.5}px;
  background-image: url(/images/quest/coin.png);
  background-size: 100%;
  background-repeat: no-repeat;
`;
