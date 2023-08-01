import { LARGE_SCREEN } from '../RefStyleVar';
import styled from 'styled-components';
import RefGradientBall from '@/components/ref-org/RefComponents/RefGradientBall';

export const HorizontalLine = ({ style }) => {
  return <StyledHorizontalLine style={style} />;
};

export const VerticalLine = ({ style }) => {
  return <StyledVerticalLine style={style} />;
};

export const TopLine = ({ style }) => {
  return (
    <div style={{ position: 'relative' }}>
      <StyledGradientBall />
      <StyledTopLine style={style} />
    </div>
  );
};

export const BottomLine = ({ style, height }) => {
  return (
    <BottomLineWrapper height={height}>
      <StyledBottomGradientBall />
      <StyledBottomLine style={style} height={height} />
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

const StyledGradientBall = styled(RefGradientBall)`
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

const StyledBottomGradientBall = styled(RefGradientBall)`
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
