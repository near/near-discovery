import styled from 'styled-components';

export const StyledMoreButton = styled.div`
  border-radius: 16px;
  border: 2px solid #21232a;
  background: #16181d;
  width: 118px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  color: #979abe;
  text-align: right;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledArrowIcon = styled.div`
  margin-top: 2px;
  transition: 0.5s;
  transform-origin: center center;
  transform: rotate(0deg);

  &.more {
    transform: rotate(-180deg);
  }
`;
