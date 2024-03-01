import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  transform: scale(1);
  transform-style: preserve-3d;
  transition: transform 0.5s;
  width: 160px;
  height: 220px;
  &.flip {
    transform: rotateY(180deg);
  }
  .front-face {
    cursor: pointer;
  }

  .back-face {
    transform: rotateY(180deg);
  }

  &:active {
    transform: scale(0.97);
    transition: transform 0.2s;
  }
`;

const StyledImg = styled.img`
  flex-shrink: 0;
  position: absolute;
  border-radius: 5px;
  background: #c2e5e0;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  user-select: none;
  -webkit-user-drag: none;
`;

const Card = ({ flip, index, onClick }: any) => {
  return (
    <StyledContainer className={flip ? 'flip' : ''}>
      <StyledImg onClick={onClick} className="front-face" src="/images/odyssey/v2/default.jpg" />
      <StyledImg className="back-face" src={`/images/odyssey/v2/${index + 1}.jpg`} />
    </StyledContainer>
  );
};

export default memo(Card);
