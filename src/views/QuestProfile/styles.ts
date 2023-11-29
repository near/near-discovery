import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`;

export const StyledFavorite = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 0.9189189}px;
  background-image: url(/images/quest/favorite.png);
  background-size: 100%;
  background-repeat: no-repeat;
`;

export const StyledMedal = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 1.31818}px;
  background-image: url(/images/quest/medal.png);
  background-size: 100%;
  background-repeat: no-repeat;
`;

export const StyledSteps = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 0.92}px;
  background-image: url(/images/quest/steps.png);
  background-size: 100%;
  background-repeat: no-repeat;
`;

export const StyledTabsBox = styled.div`
  position: relative;
`;
