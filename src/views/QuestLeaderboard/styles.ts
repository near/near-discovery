import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`;

export const StyledFist = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 0.6486}px;
  background-image: url(/images/quest/fist.png);
  background-size: 100%;
  background-repeat: no-repeat;
`;

export const StyledPerson = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 1.53333}px;
  background-image: url(/images/quest/person.png);
  background-size: 100%;
  background-repeat: no-repeat;
`;
