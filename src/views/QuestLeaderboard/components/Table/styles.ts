import styled from 'styled-components';

import type { Align } from '../../types';

export { LoadingWrapper, Empty } from '@/views/QuestProfile/styles';
export { StyledCoin } from '@/views/Quest/styles';

export const StyledContainer = styled.div`
  padding-top: 20px;
`;

export const StyledRow = styled.div`
  padding-left: 62px;
  padding-right: 80px;
  display: flex;
  align-items: center;
  height: 55px;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    background: rgba(55, 58, 83, 0.2);
  }
`;

export const StyledCell = styled.div<{ $gap: number; $width: number; $align?: Align }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap + 'px'};
  width: ${({ $width }) => $width + '%'};
  justify-content: ${({ $align }) => ($align === 'left' ? 'flex-start' : $align === 'right' ? 'flex-end' : $align)};
`;

export const StyledColumn = styled.div<{ $width: number; $align?: Align }>`
  width: ${({ $width }) => $width + '%'};
  text-align: ${({ $align }) => $align};
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding-left: 62px;
  padding-right: 80px;
  color: #979abe;
  font-size: 18px;
  font-weight: 400;
  height: 55px;
`;

export const StyledBody = styled.div``;

export const StyledRankIcon = styled.div`
  width: 25px;
  height: 25px;
  margin-top: -7px;
`;

export const StyledUserAvatar = styled.img`
  width: 26px;
  height: 26px;
`;

export const StyledPageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 80px;
  gap: 22px;
  margin-top: 20px;
`;

export const StyledPageDesc = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
`;

export const StyledPageButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledPageButton = styled.div<{ $disabled?: boolean }>`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #282d36;
  width: 55px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $disabled }) =>
    $disabled
      ? `
        opacity: 0.4;
      `
      : `cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(55, 58, 83, 0.5);
  }
  &:active {
    opacity: 0.4;
  }`}
`;
