import styled from 'styled-components';

// export { StyledCoin } from '@/views/Quest/styles';
// export { StyledFist } from '@/views/QuestLeaderboard/styles';
// export { StyledFavorite } from '../../styles';

export const StyledTabs = styled.div<{ $width: number; $mt: number }>`
  display: flex;
  align-items: center;
  border-radius: 32px;
  border: 1px solid #373a53;
  background: #21242a;
  width: ${({ $width }) => $width}px;
  height: 66px;
  padding: 8px;
  box-sizing: border-box;
  margin: ${({ $mt }) => $mt}px auto 0px;
`;

export const StyledTabWrap = styled.div`
  flex-grow: 1;
  font-size: 18px;
  font-weight: 700;
  height: 50px;
  cursor: pointer;
  position: relative;
`;

export const StyledTab = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: ${({ $active }) => ($active ? '#1e2028' : '#fff')};
  height: 50px;
  position: relative;
  z-index: 10;
`;

export const StyledTabActiveBg = styled.div`
  position: absolute;
  border-radius: 30px;
  height: 50px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  width: 100%;
  top: -50px;
`;

export const StyledTabIcon = styled.img`
  width: 37px;
  height: 24px;
`;
