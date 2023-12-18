import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1244px;
  max-width: 100%;
  padding-bottom: 100px;
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

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Empty = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

export const StyledPanelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
`;

export const StyledButton = styled.button`
  width: 140px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 10px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  color: #1e2028;
  font-size: 16px;
  font-weight: 500;
  border: none;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
