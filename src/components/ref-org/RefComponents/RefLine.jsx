import { LARGE_SCREEN } from '../RefStyleVar';
import styled from 'styled-components';

export const HorizontalLine = ({ style }) => {
  return <StyledHorizontalLine style={style} />;
};

export const TopLine = ({ style }) => {
  return <StyledTopLine style={style} />;
};

export const BottomLine = ({ style }) => {
  return <StyledBottomLine style={style} />;
};

const HIDE_LINE_SCREEN = LARGE_SCREEN;
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
  bottom: -78px;
  height: 110px;
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
