import styled from 'styled-components';

export { StyledCoin } from '@/views/Quest/styles';
export { StyledFist, StyledPerson } from '@/views/QuestLeaderboard/styles';

export const StyledTotalBox = styled.div`
  display: flex;
  align-items: center;
  gap: 19px;
  margin-top: 28px;
  flex-wrap: nowrap;
  padding: 0px 40px;
`;

export const StyledTotalItem = styled.div`
  flex-grow: 1;
  border-radius: 20px;
  border: 1px solid #373a53;
  background: #2c2e3e;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const StyledTotalLabel = styled.div`
  color: #979abe;
  font-size: 18px;
  font-weight: 400;
`;

export const StyledTotalValue = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;
