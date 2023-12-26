import styled from 'styled-components';

import type { Align } from './types';

export { StyledCoin } from '@/views/Quest/styles';
export {
  StyledPageBox,
  StyledPageDesc,
  StyledPageButtons,
  StyledPageButton,
} from '@/views/QuestLeaderboard/components/Table/styles';
export { LoadingWrapper, Empty } from '../../styles';

export const StyledContainer = styled.div`
  margin-top: 30px;
`;

export const StyledRow = styled.div`
  border-radius: 20px;
  border: 1px solid #32353f;
  background: #21232a;
  padding-left: 18px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  height: 84px;
  transition: 0.3s;
  margin-bottom: 20px;

  &:hover {
    background: #2c2e3e;
    cursor: pointer;
  }
`;

export const StyledColumn = styled.div<{ $width: number; $align?: Align }>`
  width: ${({ $width }) => $width + '%'};
  text-align: ${({ $align }) => $align};
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding-left: 18px;
  padding-right: 20px;
  color: #979abe;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 14px;
`;

export const StyledBody = styled.div``;

export const StyledCell = styled.div<{ $gap?: number; $width: number; $align?: Align }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap + 'px'};
  width: ${({ $width }) => $width + '%'};
  justify-content: ${({ $align }) => ($align === 'left' ? 'flex-start' : $align === 'right' ? 'flex-end' : 'center')};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const StyledRewards = styled.div`
  color: #ebf479;
`;

export const StyledQuestIconBox = styled.div`
  width: 60px;
  height: 60px;
`;

export const StyledQuestIcon = styled.img`
  max-width: 60px;
  max-height: 60px;
`;

export const StyledQuestTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`;

export const StyledQuestSource = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 8px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
