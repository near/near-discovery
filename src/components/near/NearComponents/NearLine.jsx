import { LARGE_SCREEN } from '../NearStyleVar';
import styled from 'styled-components';
import NearGradientBall from '@/components/near/NearComponents/NearGradientBall';

export const HorizontalLine = ({ style, className }) => {
  return <StyledHorizontalLine style={style} className={className} />;
};

export const VerticalLine = ({ style, className }) => {
  return <StyledVerticalLine style={style} className={className} />;
};

export const TopLine = ({ style, ballGradients, className }) => {
  return (
    <div style={{ position: 'relative' }} className={className}>
      <StyledGradientBall gradients={ballGradients} />
      <StyledTopLine style={style} />
    </div>
  );
};

export const BottomLine = ({ style, height, ballGradients, className }) => {
  return (
    <BottomLineWrapper height={height}>
      <StyledBottomGradientBall gradients={ballGradients} />
      <StyledBottomLine style={style} height={height} className={className} />
    </BottomLineWrapper>
  );
};

export const HIDE_LINE_SCREEN = LARGE_SCREEN;
const StyledHorizontalLine = styled.div`
  --size: 1px;
  --color: #494d69;
  height: var(--size);
  background: var(--color);
  z-index: 10;
  pointer-events: none;
  position: absolute;

  @media (max-width: ${HIDE_LINE_SCREEN}) {
    display: none !important;
  }
`;

const StyledVerticalLine = styled.div`
  --size: 1px;
  --color: #494d69;
  width: var(--size);
  background: var(--color);
  z-index: 10;
  pointer-events: none;
  position: absolute;

  @media (max-width: ${HIDE_LINE_SCREEN}) {
    display: none !important;
  }
`;

const StyledGradientBall = styled(NearGradientBall)`
  position: absolute;
  top: -29px;
  left: ${(p) => p.left || '46px'};

  @media (max-width: ${HIDE_LINE_SCREEN}) {
    display: none !important;
  }
`;

const BottomLineWrapper = styled.div`
  position: absolute;
  bottom: -78px;
  left: 71px;
  height: ${(p) => (p.height ? `${p.height}px` : '110px')};
  width: 140px;
`;

const StyledBottomGradientBall = styled(NearGradientBall)`
  position: absolute;
  top: -12px;
  left: -6px;

  @media (max-width: ${HIDE_LINE_SCREEN}) {
    display: none !important;
  }
`;

const StyledTopLine = styled.div`
  --size: 1px;
  --color: #494d69;
  --radius: 15px;
  top: -154px;
  height: 125px;
  width: 170px;
  border-left-width: 0px;
  border: var(--size) solid var(--color);
  z-index: 10;
  pointer-events: none;
  position: absolute;

  border-bottom-width: 0px;

  @media (max-width: ${HIDE_LINE_SCREEN}) {
    display: none !important;
  }
`;

const StyledBottomLine = styled.div`
  --size: 1px;
  --color: #494d69;
  --radius: 15px;
  left: 0px;
  // bottom: -78px;
  bottom: 0px;
  height: ${(p) => (p.height ? `${p.height}px` : '110px')};
  width: 140px;
  border-left-width: 0px;
  border: var(--size) solid var(--color);
  z-index: 10;
  pointer-events: none;
  position: absolute;
  border-top-width: 0px;
  position: absolute;

  @media (max-width: ${HIDE_LINE_SCREEN}) {
    display: none !important;
  }
`;
