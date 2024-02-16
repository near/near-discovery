import styled from 'styled-components';

export { StyledCoin } from '@/views/Quest/styles';
export { LoadingWrapper, StyledButton } from '../../styles';
export { StyledPanel } from '../InviteCode/styles';

export const StyledContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

export const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const StyledDaysWrapper = styled.div`
  flex-grow: 1;
`;

export const StyledDays = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 14px;
  width: 100%;
`;

export const StyledDay = styled.div`
  flex-grow: 1;
  height: 80px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
`;

export const StyledDayHeader = styled.div`
  height: 26px;
  border-radius: 12px 12px 0px 0px;
  background-color: #ebf479;
  text-align: center;
  color: #1e2028;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 26px;
`;

export const StyledDayIcon = styled.div`
  margin: 7px auto 0px;
  width: 19px;
  height: 18px;
  line-height: 18px;
`;

export const StyledDayValue = styled.div`
  color: #ebf479;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  margin-top: 4px;
`;

export const StyledFists = styled.div`
  width: 164px;
  height: 86px;
  background-image: url(/images/quest/fists.png);
  background-size: 100%;
  background-repeat: no-repeat;
`;

export const StyledTips = styled.div`
  color: #979abe;
  font-size: 12px;
  font-weight: 400;
`;
