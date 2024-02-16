import styled from 'styled-components';

export const StyledAddMeta = styled.div`
  width: 135px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: rgba(22, 24, 29, 0.5);
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 9px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
