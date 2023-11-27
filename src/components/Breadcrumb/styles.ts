import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 9px;
  align-items: center;
`;

export const StyledNav = styled.div<{ $active: boolean }>`
  display: flex;
  gap: 9px;
  align-items: center;
  transition: 0.3s;
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.5)')};
  cursor: pointer;
`;
